import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have stats array', () => {
        expect(component.stats).toBeDefined();
        expect(component.stats.length).toBeGreaterThan(0);
    });

    it('should have services array', () => {
        expect(component.services).toBeDefined();
        expect(component.services.length).toBeGreaterThan(0);
    });

    it('should display stats in template', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const statsSection = compiled.querySelector('.stats-section');
        expect(statsSection).toBeTruthy();
    });

    it('should display services in template', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const servicesSection = compiled.querySelector('.services-section');
        expect(servicesSection).toBeTruthy();
    });

    it('should render hero section', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const heroSection = compiled.querySelector('.hero-section');
        expect(heroSection).toBeTruthy();
    });

    it('should have CTA buttons', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const ctaButtons = compiled.querySelectorAll('.btn');
        expect(ctaButtons.length).toBeGreaterThanOrEqual(2);
    });
});
