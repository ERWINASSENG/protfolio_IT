import { Injectable } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import emailjs from '@emailjs/browser';
import { ContactForm, ContactResponse } from '../models/contact.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private publicKey = environment.emailjs.publicKey;
  private serviceId = environment.emailjs.serviceId;
  private templateId = environment.emailjs.templateId;

  constructor() {
    // Initialize EmailJS with the public key
    emailjs.init(this.publicKey);
  }

  sendMessage(formData: ContactForm): Observable<ContactResponse> {
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'Nouveau message depuis le portfolio',
      message: formData.message,
      to_email: 'erwinalberic99@gmail.com' // Your email address
    };

    console.log('Envoi EmailJS avec params:', templateParams); // Debug log

    // Send email using EmailJS and convert Promise to Observable
    // Explicitly passing public key as 4th argument to ensure it is used
    return from(
      emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey)
    ).pipe(
      map((response) => {
        console.log('Email envoyé avec succès!', response);
        return {
          success: true,
          message: 'Votre message a été envoyé avec succès! Je vous répondrai dans les plus brefs délais.'
        };
      }),
      catchError((error) => {
        console.error('Erreur DÉTAILLÉE EmailJS:', JSON.stringify(error));
        if (error.text) console.error('Error text:', error.text);

        throw {
          success: false,
          message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
        };
      })
    );
  }
}
