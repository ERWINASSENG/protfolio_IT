import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { ErrorNotificationService } from '../../services/error-notification.service';

/**
 * Intercepteur HTTP pour gérer les erreurs de manière globale
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorNotificationService = inject(ErrorNotificationService);

    return next(req).pipe(
        // Retry automatique pour certaines erreurs (max 2 fois)
        retry({
            count: 2,
            delay: (error: HttpErrorResponse) => {
                // Ne retry que pour les erreurs serveur (5xx) ou timeout
                if (error.status >= 500 || error.status === 0) {
                    console.log(`Retry de la requête: ${req.url}`);
                    return throwError(() => error);
                }
                // Ne pas retry pour les autres erreurs
                throw error;
            }
        }),

        // Gestion des erreurs
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
                // Erreur côté client
                errorMessage = `Erreur client: ${error.error.message}`;
                console.error('Erreur côté client:', error.error.message);
            } else {
                // Erreur côté serveur
                errorMessage = `Erreur serveur (${error.status}): ${error.message}`;
                console.error(`Erreur HTTP ${error.status}:`, error.message);

                // Afficher une notification selon le code d'erreur
                errorNotificationService.showHttpError(error.status, getCustomErrorMessage(error));
            }

            // Log détaillé en développement
            console.group('🌐 Erreur HTTP Détaillée');
            console.error('URL:', req.url);
            console.error('Méthode:', req.method);
            console.error('Status:', error.status);
            console.error('Message:', error.message);
            console.error('Body:', error.error);
            console.groupEnd();

            return throwError(() => error);
        })
    );
};

/**
 * Retourne un message d'erreur personnalisé selon le type d'erreur HTTP
 */
function getCustomErrorMessage(error: HttpErrorResponse): string | undefined {
    // Si le serveur retourne un message d'erreur personnalisé
    if (error.error?.message) {
        return error.error.message;
    }

    // Messages personnalisés selon le code d'erreur
    switch (error.status) {
        case 0:
            return 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        case 400:
            return 'Les données envoyées sont invalides.';
        case 401:
            return 'Vous devez vous connecter pour accéder à cette ressource.';
        case 403:
            return 'Vous n\'avez pas les permissions nécessaires.';
        case 404:
            return 'La ressource demandée est introuvable.';
        case 408:
            return 'La requête a pris trop de temps. Veuillez réessayer.';
        case 429:
            return 'Trop de requêtes. Veuillez patienter quelques instants.';
        case 500:
            return 'Une erreur serveur est survenue. Nos équipes ont été notifiées.';
        case 502:
            return 'Le serveur est temporairement indisponible.';
        case 503:
            return 'Service en maintenance. Veuillez réessayer dans quelques minutes.';
        default:
            return undefined; // Utiliser le message par défaut du service
    }
}
