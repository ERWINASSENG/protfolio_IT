import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorNotificationService } from './error-notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private errorNotificationService: ErrorNotificationService) { }

    handleError(error: Error | any): void {
        // Logger l'erreur dans la console pour le débogage
        console.error('Global Error Handler:', error);

        // Extraire le message d'erreur
        let errorMessage = 'Une erreur inattendue s\'est produite.';

        if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error?.message) {
            errorMessage = error.message;
        }

        // Afficher la notification à l'utilisateur
        this.errorNotificationService.showError(errorMessage, 'error');

        // En environnement de développement, afficher plus de détails
        if (!this.isProduction()) {
            console.group('Détails de l\'erreur');
            console.error('Message:', errorMessage);
            console.error('Stack:', error?.stack);
            console.error('Objet complet:', error);
            console.groupEnd();
        }

        // Ici, vous pouvez ajouter un service de logging externe
        // Par exemple: Sentry, LogRocket, etc.
        // this.logToExternalService(error);
    }

    /**
     * Vérifie si l'application est en mode production
     */
    private isProduction(): boolean {
        return false; // Changer selon votre configuration
        // return environment.production;
    }

    /**
     * Envoie l'erreur à un service externe de logging
     * @param error L'erreur à logger
     */
    private logToExternalService(error: any): void {
        // Exemple d'intégration avec un service externe
        // Sentry.captureException(error);
        // LogRocket.captureException(error);
    }
}
