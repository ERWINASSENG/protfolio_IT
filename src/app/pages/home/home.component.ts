import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  services = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Support IT & Infrastructure',
      description: 'Installation, configuration et maintenance des infrastructures IT. Gestion des postes de travail, réseaux et résolution rapide des incidents pour garantir la continuité des services critiques.',
      features: ['Configuration réseau', 'Gestion des incidents', 'Maintenance préventive']
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Développeur Freelance',
      description: 'Développeur freelance passionné avec plus de 3 ans d\'expérience. Je propose des solutions IT complètes, du développement web aux intégrations système, adaptées aux besoins spécifiques de chaque client.',
      features: ['3+ ans d\'expérience', '15+ projets réalisés', '100% clients satisfaits']
    }
  ];

  projects = [
    {
      title: 'Site entreprise locale',
      description: 'Un site vitrine moderne pour une entreprise locale.',
      link: 'https://propulse-three.vercel.app',
      image: 'assets/images/project1.jpg' // Placeholder or remove if no image
    },
    {
      title: 'Application de Gestion',
      description: 'Une application web pour la gestion des documents personnel.',
      link: 'https://docsecur.vercel.app/',
      image: 'assets/images/project2.jpg'
    },

  ];

  stats = [
    { value: '3+', label: 'Années d\'expérience' },
    { value: '15+', label: 'Projets réalisés' },
    { value: '100%', label: 'Clients satisfaits' },
    { value: '24/7', label: 'Disponibilité' }
  ];
}
