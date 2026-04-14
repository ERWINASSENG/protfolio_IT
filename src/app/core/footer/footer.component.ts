import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/erwin-alberic-asseng',
      icon: 'fab fa-linkedin',
      image: '/téléchargement.png',
      ariaLabel: 'Visitez mon profil LinkedIn'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/237696136483',
      icon: 'fab fa-whatsapp',
      image: '/téléchargement (1).png',
      ariaLabel: 'Contactez-moi sur WhatsApp'
    }
  ];

  quickLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'À Propos', path: '/about' },
    { label: 'Carrière', path: '/career' },
    { label: 'Contact', path: '/contact' }
  ];
}
