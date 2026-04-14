import { Injectable } from '@angular/core';

export interface ErrorNotification {
    message: string;
    type: 'error' | 'warning' | 'info';
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ErrorNotificationService {
    private errorQueue: ErrorNotification[] = [];
    private currentError: ErrorNotification | null = null;

    constructor() { }

    /**
     * Affiche une notification d'erreur
     * @param message Message à afficher
     * @param type Type de notification (error, warning, info)
     * @param duration Durée d'affichage en millisecondes (par défaut 5000)
     */
    showError(message: string, type: 'error' | 'warning' | 'info' = 'error', duration: number = 5000): void {
        const error: ErrorNotification = {
            message,
            type,
            duration
        };

        this.errorQueue.push(error);
        this.displayNextError();
    }

    /**
     * Affiche une erreur HTTP avec un message personnalisé
     * @param statusCode Code d'erreur HTTP
     * @param message Message personnalisé (optionnel)
     */
    showHttpError(statusCode: number, message?: string): void {
        let errorMessage = message || this.getDefaultHttpErrorMessage(statusCode);

        this.showError(errorMessage, 'error');
    }

    /**
     * Affiche la prochaine erreur dans la queue
     */
    private displayNextError(): void {
        if (this.currentError || this.errorQueue.length === 0) {
            return;
        }

        this.currentError = this.errorQueue.shift() || null;

        if (this.currentError) {
            console.error(`[${this.currentError.type.toUpperCase()}]`, this.currentError.message);

            // Créer et afficher une notification visuelle
            this.createNotificationElement(this.currentError);

            // Supprimer l'erreur après la durée spécifiée
            setTimeout(() => {
                this.currentError = null;
                this.displayNextError();
            }, this.currentError.duration || 5000);
        }
    }

    /**
     * Crée un élément de notification dans le DOM
     */
    private createNotificationElement(error: ErrorNotification): void {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.error-notification');
        existingNotifications.forEach(notif => notif.remove());

        // Créer la notification
        const notification = document.createElement('div');
        notification.className = `error-notification error-notification-${error.type}`;
        notification.textContent = error.message;

        // Ajouter les styles inline
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: error.type === 'error' ? '#ef4444' : error.type === 'warning' ? '#f59e0b' : '#3b82f6',
            color: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            zIndex: '9999',
            maxWidth: '400px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            animation: 'slideInRight 0.3s ease-out'
        });

        // Ajouter l'animation
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);

        // Ajouter au DOM
        document.body.appendChild(notification);

        // Animation de sortie
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, (error.duration || 5000) - 300);
    }

    /**
     * Obtient un message d'erreur par défaut selon le code HTTP
     */
    private getDefaultHttpErrorMessage(statusCode: number): string {
        switch (statusCode) {
            case 400:
                return 'Requête invalide. Veuillez vérifier les données saisies.';
            case 401:
                return 'Non autorisé. Veuillez vous connecter.';
            case 403:
                return 'Accès interdit. Vous n\'avez pas les permissions nécessaires.';
            case 404:
                return 'Ressource introuvable. La page ou les données demandées n\'existent pas.';
            case 500:
                return 'Erreur serveur. Veuillez réessayer plus tard.';
            case 503:
                return 'Service temporairement indisponible. Veuillez réessayer dans quelques instants.';
            default:
                return `Une erreur est survenue (Code: ${statusCode}). Veuillez réessayer.`;
        }
    }

    /**
     * Efface toutes les notifications en attente
     */
    clearAll(): void {
        this.errorQueue = [];
        this.currentError = null;
        const notifications = document.querySelectorAll('.error-notification');
        notifications.forEach(notif => notif.remove());
    }
}
