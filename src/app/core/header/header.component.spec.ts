import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../services/theme.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let themeService: ThemeService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                provideRouter([]),
                ThemeService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        themeService = TestBed.inject(ThemeService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have navigation links', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const navLinks = compiled.querySelectorAll('a[routerLink]');
        expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should have theme toggle button', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const themeButton = compiled.querySelector('.theme-toggle');
        expect(themeButton).toBeTruthy();
    });

    it('should toggle theme when theme button is clicked', () => {
        spyOn(component, 'toggleTheme');

        const compiled = fixture.nativeElement as HTMLElement;
        const themeButton = compiled.querySelector('.theme-toggle') as HTMLButtonElement;
        themeButton?.click();

        expect(component.toggleTheme).toHaveBeenCalled();
    });

    it('should subscribe to dark mode changes', () => {
        expect(component.isDarkMode).toBeDefined();
    });

    it('should have mobile menu toggle', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const mobileMenuButton = compiled.querySelector('.mobile-menu-toggle');
        expect(mobileMenuButton).toBeTruthy();
    });
});
