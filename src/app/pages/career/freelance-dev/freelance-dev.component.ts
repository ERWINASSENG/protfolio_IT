import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelance-dev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './freelance-dev.component.html',
  styleUrls: ['./freelance-dev.component.scss']
})
export class FreelanceDevComponent {
  projects = [
    {
      title: 'Agents IA pour l\'automatisation',
      client: 'Projet personnel',
      period: '2024',
      description: 'Développement d\'agents IA pour automatiser divers processus métiers.',
      technologies: ['Python', 'n8n', 'API REST', 'Automatisation'],
      achievements: [
        'Réponses automatiques aux emails',
        'Système de prospection automatisée',
        'Attribution automatique des tâches',
        'Amélioration de l\'efficacité opérationnelle'
      ]
    },
    {
      title: 'Plateforme de Gestion des Dossiers Médicaux',
      client: 'Projet de fin d\'études',
      period: '2023',
      description: 'Conception et développement d\'une plateforme numérique sécurisée pour la gestion des dossiers médicaux.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'JWT'],
      achievements: [
        'Système de gestion des dossiers patients',
        'Interface sécurisée pour les professionnels de santé',
        'Gestion des rendez-vous en ligne',
        'Stockage et partage sécurisé des documents médicaux'
      ]
    },
    {
      title: 'Logiciel de Gestion du Personnel',
      client: 'Ets EBANDA',
      period: '2023',
      description: 'Solution sur mesure pour la gestion du personnel et des ressources humaines.',
      technologies: ['Odoo', 'Python', 'PostgreSQL', 'XML-RPC'],
      achievements: [
        'Gestion des fiches de paie',
        'Suivi des congés et absences',
        'Évaluation des performances',
        'Tableaux de bord RH personnalisés'
      ]
    }
  ];

  skills = [
    { name: 'Développement Web', icon: 'fas fa-code' },
    { name: 'Automatisation (Python, n8n)', icon: 'fas fa-robot' },
    { name: 'ERP Odoo', icon: 'fas fa-cogs' },
    { name: 'Gestion de Bases de Données', icon: 'fas fa-database' },
    { name: 'Développement d\'API REST', icon: 'fas fa-plug' },
    { name: 'Scripting (PowerShell, Bash)', icon: 'fas fa-terminal' },
    { name: 'Gestion de Projet', icon: 'fas fa-tasks' },
    { name: 'Déploiement & DevOps', icon: 'fas fa-server' }
  ];
}
