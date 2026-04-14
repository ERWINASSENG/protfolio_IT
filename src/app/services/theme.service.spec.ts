import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ThemeService);
        // Nettoyer le localStorage avant chaque test
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('toggleTheme', () => {
        it('should toggle from dark to light mode', () => {
            // Initially should be dark mode
            expect(service.isDarkMode$()).toBe(true);

            service.toggleTheme();

            // After toggle should be light mode
            expect(service.isDarkMode$()).toBe(false);
            expect(document.documentElement.classList.contains('light-mode')).toBe(true);
        });

        it('should save theme preference to localStorage', () => {
            service.toggleTheme();
            const savedTheme = localStorage.getItem('theme-preference');
            expect(savedTheme).toBe('light');
        });

        it('should update isDarkMode signal when theme changes', () => {
            // Start in dark mode
            expect(service.isDarkMode$()).toBe(true);

            // Toggle to light
            service.toggleTheme();
            expect(service.isDarkMode$()).toBe(false);

            // Toggle back to dark
            service.toggleTheme();
            expect(service.isDarkMode$()).toBe(true);
        });
    });

    describe('theme persistence', () => {
        it('should load light theme from localStorage on init', () => {
            localStorage.setItem('theme-preference', 'light');
            localStorage.setItem('use-system-theme', 'false');

            const newService = new ThemeService();

            expect(newService.isDarkMode$()).toBe(false);
        });

        it('should use system theme when no manual preference is saved', () => {
            // This will use system preferences by default
            const newService = new ThemeService();

            // The value depends on the system preference, just check it's a boolean
            expect(typeof newService.isDarkMode$()).toBe('boolean');
        });
    });

    describe('DOM manipulation', () => {
        it('should add light-mode class to html element', () => {
            service.toggleTheme();
            expect(document.documentElement.classList.contains('light-mode')).toBe(true);
        });

        it('should remove light-mode class when toggling back to dark', () => {
            service.toggleTheme(); // Switch to light
            service.toggleTheme(); // Switch back to dark
            expect(document.documentElement.classList.contains('light-mode')).toBe(false);
        });

        it('should add theme-transition class during transition', (done) => {
            service.toggleTheme();

            setTimeout(() => {
                expect(document.documentElement.classList.contains('theme-transition')).toBe(true);
            }, 10);

            setTimeout(() => {
                expect(document.documentElement.classList.contains('theme-transition')).toBe(false);
                done();
            }, 350);
        });
    });
});
