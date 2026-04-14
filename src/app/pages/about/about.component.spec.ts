import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AboutComponent],
            providers: [
                provideRouter([]),
                provideAnimations()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have teamMembers array', () => {
        expect(component.teamMembers).toBeDefined();
        expect(component.teamMembers.length).toBeGreaterThan(0);
    });

    it('should have values array', () => {
        expect(component.values).toBeDefined();
        expect(component.values.length).toBeGreaterThan(0);
    });

    it('should have education array', () => {
        expect(component.education).toBeDefined();
        expect(component.education.length).toBeGreaterThan(0);
    });

    it('should have storyBlocks array', () => {
        expect(component.storyBlocks).toBeDefined();
        expect(component.storyBlocks.length).toBeGreaterThan(0);
    });

    it('should have quickStats array', () => {
        expect(component.quickStats).toBeDefined();
        expect(component.quickStats.length).toBeGreaterThan(0);
    });

    it('should render hero section with title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const heroTitle = compiled.querySelector('.hero-title');
        expect(heroTitle).toBeTruthy();
    });

    it('should render team members section', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const teamSection = compiled.querySelector('.team-section');
        expect(teamSection).toBeTruthy();
    });

    it('should render values section', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const valuesSection = compiled.querySelector('.values-section');
        expect(valuesSection).toBeTruthy();
    });

    it('should have ngAfterViewInit lifecycle hook', () => {
        expect(component.ngAfterViewInit).toBeDefined();
    });

    it('should have ngOnDestroy lifecycle hook', () => {
        expect(component.ngOnDestroy).toBeDefined();
    });
});
