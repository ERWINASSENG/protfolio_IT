import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactService } from '../../services/contact.service';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;
    let contactService: ContactService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactComponent, ReactiveFormsModule],
            providers: [
                provideRouter([]),
                ContactService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        contactService = TestBed.inject(ContactService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a contact form', () => {
        expect(component.contactForm).toBeDefined();
    });

    it('should have required form fields', () => {
        expect(component.contactForm.get('name')).toBeDefined();
        expect(component.contactForm.get('email')).toBeDefined();
        expect(component.contactForm.get('subject')).toBeDefined();
        expect(component.contactForm.get('message')).toBeDefined();
    });

    it('should mark form as invalid when empty', () => {
        expect(component.contactForm.valid).toBeFalsy();
    });

    it('should validate email format', () => {
        const emailControl = component.contactForm.get('email');

        emailControl?.setValue('invalid-email');
        expect(emailControl?.valid).toBeFalsy();

        emailControl?.setValue('valid@email.com');
        expect(emailControl?.valid).toBeTruthy();
    });

    it('should validate required fields', () => {
        const nameControl = component.contactForm.get('name');
        const emailControl = component.contactForm.get('email');

        expect(nameControl?.hasError('required')).toBeTruthy();
        expect(emailControl?.hasError('required')).toBeTruthy();
    });

    it('should mark form as valid when all fields are filled correctly', () => {
        component.contactForm.patchValue({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Test message content'
        });

        expect(component.contactForm.valid).toBeTruthy();
    });

    it('should have submit button disabled when form is invalid', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

        expect(submitButton.disabled).toBeTruthy();
    });

    it('should render contact form in template', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const form = compiled.querySelector('form');
        expect(form).toBeTruthy();
    });
});
