import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  message = '';

  contactInfo = [
    { icon: 'fas fa-envelope', label: 'Email', value: 'erwinalberic99@gmail.com', link: 'mailto:erwinalberic99@gmail.com' },
    { icon: 'fas fa-phone', label: 'Téléphone', value: '(+237) 6 96 13 64 83', link: 'tel:+237696136483' },
    { icon: 'fas fa-map-marker-alt', label: 'Localisation', value: 'Douala, Cameroun', link: null },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'Mon Profil', link: 'https://www.linkedin.com/in/erwin-alberic-asseng' }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.controls[key].markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.message = response.message;
        this.contactForm.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitError = true;
        this.message = 'Une erreur est survenue. Veuillez réessayer plus tard.';

        // Reset error message after 5 seconds
        setTimeout(() => {
          this.submitError = false;
        }, 5000);
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Ce champ est obligatoire';
    }

    if (control.errors['email']) {
      return 'Email invalide';
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }

    return '';
  }
}
