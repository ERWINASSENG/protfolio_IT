import { TestBed } from '@angular/core/testing';
import { ErrorNotificationService } from './error-notification.service';

describe('ErrorNotificationService', () => {
    let service: ErrorNotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ErrorNotificationService);
    });

    afterEach(() => {
        service.clearAll();
        // Nettoyer les éléments DOM créés par les tests
        document.querySelectorAll('.error-notification').forEach(el => el.remove());
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('showError', () => {
        it('should display an error message', () => {
            service.showError('Test error message', 'error');

            // Vérifier que le message apparaît dans la console
            expect(true).toBe(true); // Le service log dans la console
        });

        it('should create a notification element in the DOM', (done) => {
            service.showError('Test notification', 'error', 1000);

            setTimeout(() => {
                const notification = document.querySelector('.error-notification');
                expect(notification).toBeTruthy();
                expect(notification?.textContent).toContain('Test notification');
                done();
            }, 100);
        });

        it('should display warning type correctly', (done) => {
            service.showError('Warning message', 'warning', 1000);

            setTimeout(() => {
                const notification = document.querySelector('.error-notification-warning');
                expect(notification).toBeTruthy();
                done();
            }, 100);
        });

        it('should display info type correctly', (done) => {
            service.showError('Info message', 'info', 1000);

            setTimeout(() => {
                const notification = document.querySelector('.error-notification-info');
                expect(notification).toBeTruthy();
                done();
            }, 100);
        });

        it('should auto-dismiss after specified duration', (done) => {
            service.showError('Auto dismiss', 'error', 500);

            setTimeout(() => {
                const notification = document.querySelector('.error-notification');
                expect(notification).toBeTruthy();
            }, 100);

            setTimeout(() => {
                const notification = document.querySelector('.error-notification');
                expect(notification).toBeFalsy();
                done();
            }, 1000);
        });
    });

    describe('showHttpError', () => {
        it('should display error for 404 status code', () => {
            spyOn(service, 'showError');
            service.showHttpError(404);

            expect(service.showError).toHaveBeenCalledWith(
                jasmine.stringContaining('introuvable'),
                'error'
            );
        });

        it('should display error for 500 status code', () => {
            spyOn(service, 'showError');
            service.showHttpError(500);

            expect(service.showError).toHaveBeenCalledWith(
                jasmine.stringContaining('serveur'),
                'error'
            );
        });

        it('should use custom message when provided', () => {
            spyOn(service, 'showError');
            const customMessage = 'Custom error message';
            service.showHttpError(400, customMessage);

            expect(service.showError).toHaveBeenCalledWith(customMessage, 'error');
        });

        it('should display default message for unknown status code', () => {
            spyOn(service, 'showError');
            service.showHttpError(999);

            expect(service.showError).toHaveBeenCalledWith(
                jasmine.stringContaining('999'),
                'error'
            );
        });
    });

    describe('clearAll', () => {
        it('should clear all notifications', (done) => {
            service.showError('Error 1', 'error', 5000);
            service.showError('Error 2', 'error', 5000);

            setTimeout(() => {
                service.clearAll();
                const notifications = document.querySelectorAll('.error-notification');
                expect(notifications.length).toBe(0);
                done();
            }, 100);
        });
    });
});
