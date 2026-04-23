import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-it-support',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './it-support.component.html',
  styleUrls: ['./it-support.component.scss']
})
export class ItSupportComponent {
  experiences = [
    {
      title: 'Informaticien',
      company: 'Transimex S.A',
      period: 'Juin 2025 - Présent',
      description: 'Gestion des infrastructures IT et support technique avancé.',
      achievements: [
        'Installation, configuration et maintenance des postes de travail (PC, imprimantes, périphériques)',
        'Gestion des licences logicielles et des mises à jour',
        'Maintenance préventive et curative du matériel',
        'Assurance de la disponibilité des services (messagerie, partage de fichiers, intranet)',
        'Supervision des performances et résolution des incidents réseau',
        'Diagnostic et résolution des pannes logicielles et matérielles',
        'Création de scripts pour automatiser des tâches (batch, PowerShell, Python, n8n)',
        'Participation au développement d\'applications internes et à la personnalisation de logiciels',
        'Intégration d\'outils métiers (ERP)',
        'Proposition d\'améliorations continues du système d\'information'
      ]
    },
    {
      title: 'Support IT Freelance',
      company: 'Freelance',
      period: '2023 - 2025',
      description: 'Support technique et assistance IT pour divers clients et entreprises.',
      achievements: [
        'Support technique à distance et sur site pour les PME',
        'Installation et configuration de postes de travail et périphériques',
        'Maintenance préventive et corrective des équipements informatiques',
        'Assistance aux utilisateurs pour la résolution de problèmes logiciels',
        'Configuration et dépannage des réseaux (WiFi, LAN)',
        'Formation des utilisateurs aux outils bureautiques et logiciels métiers',
        'Gestion des sauvegardes et récupération de données',
        'Mise en place de solutions de sécurité (antivirus, pare-feu)',
        'Conseil et recommandations pour l\'optimisation des infrastructures IT'
      ]
    }
  ];

  skills = [
    { name: 'Support IT', icon: 'fas fa-headset' },
    { name: 'Gestion de parc informatique', icon: 'fas fa-desktop' },
    { name: 'Réseaux informatiques', icon: 'fas fa-network-wired' },
    { name: 'Automatisation (PowerShell, Python)', icon: 'fas fa-robot' },
    { name: 'ERP Odoo', icon: 'fas fa-cogs' },
    { name: 'Création d\'agents IA', icon: 'fas fa-brain' },
    { name: 'Gestion administrative', icon: 'fas fa-file-invoice' },
    { name: 'Développement web', icon: 'fas fa-code' }
  ];

  certifications = [
    'Cisco CCNA (En cours)'
  ];

  projects = [
    {
      title: 'Scripts d\'Automatisation IT',
      description: 'Création de scripts pour automatiser les tâches IT et améliorer la gestion du parc informatique.',
      technologies: ['Python', 'n8n'],
      achievements: [
        'Déploiement automatisé de logiciels',
        'Gestion des licences automatisée',
        'Sauvegarde et récupération automatisées',
        'Monitoring et alertes automatisés'
      ],
    },
    {
      title: 'Agents IA pour l\'automatisation',
      description: 'Développement d\'agents IA pour automatiser les processus métiers et améliorer l\'efficacité opérationnelle.',
      technologies: ['Python', 'n8n', 'API REST',],
      achievements: [
        'Réponses automatiques aux emails',
        'Système de prospection automatisée',
        'Attribution automatique des tâches',
        'Amélioration de l\'efficacité opérationnelle'
      ],

    }
  ];

  tools = [
    'Windows Server',
    'Python',
    'n8n',
    'Git & GitHub',
    'Docker',
    'Linux',
    'Cisco Networking',
    'ERP Odoo',
    'Microsoft Office & Office 365',
    'PowerShell',
    'Visual Studio Code',
    'Antivirus & Sécurité',
  ];
}
