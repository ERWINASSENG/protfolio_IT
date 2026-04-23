import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// ============================================
// INTERFACES
// ============================================

interface QuickStat {
  icon: string;
  value: string;
  label: string;
  animationState: 'hidden' | 'visible';
}

interface Value {
  icon: string;
  title: string;
  description: string;
  animationState: 'hidden' | 'visible';
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
  animationState: 'hidden' | 'visible';
}

interface StoryBlock {
  animationState: 'hidden' | 'visible';
}

interface DigitalParticle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
  opacity: number;
  connectionRadius: number;
}

// ============================================
// COMPOSANT
// ============================================

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('heroSlideIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(80px) scale(0.95)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate('1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('contentAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-60px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', [
        animate('1000ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ]),
    trigger('visualAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(60px) scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate('1000ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ]),
    trigger('statAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px) scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ]),
    trigger('sectionSlideIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(60px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('blockAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-40px) scale(0.95)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate('700ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ]),
    trigger('cardAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(40px) scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate('800ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ]),
    trigger('memberAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(50px) scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate('700ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('digitalCanvas', { static: false }) digitalCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('storySection', { static: false }) storySection!: ElementRef;
  @ViewChild('valuesSection', { static: false }) valuesSection!: ElementRef;
  @ViewChild('teamSection', { static: false }) teamSection!: ElementRef;
  @ViewChild('ctaSection', { static: false }) ctaSection!: ElementRef;

  // ============================================
  // ÉTATS D'ANIMATION
  // ============================================

  heroAnimationState: 'hidden' | 'visible' = 'hidden';
  contentAnimationState: 'hidden' | 'visible' = 'hidden';
  storyAnimationState: 'hidden' | 'visible' = 'hidden';
  valuesAnimationState: 'hidden' | 'visible' = 'hidden';
  teamAnimationState: 'hidden' | 'visible' = 'hidden';
  ctaAnimationState: 'hidden' | 'visible' = 'hidden';
  freelanceProfileState: 'hidden' | 'visible' = 'hidden';

  // ============================================
  // DONNÉES
  // ============================================

  quickStats: QuickStat[] = [
    {
      icon: 'fas fa-trophy',
      value: '3+',
      label: 'Années d\'Expérience',
      animationState: 'hidden'
    },
    {
      icon: 'fas fa-code',
      value: '10+',
      label: 'Projets IT',
      animationState: 'hidden'
    },
    {
      icon: 'fas fa-calculator',
      value: '5+',
      label: 'Projets Comptables',
      animationState: 'hidden'
    }
  ];

  storyBlocks: StoryBlock[] = [
    { animationState: 'hidden' },
    { animationState: 'hidden' }
  ];

  values: Value[] = [
    {
      icon: 'fas fa-bullseye',
      title: 'Excellence',
      description: "Je vise l'excellence dans tout ce que j'entreprends, avec une attention méticuleuse aux détails et un engagement total envers la qualité.",
      animationState: 'hidden'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'Toujours à la recherche de nouvelles idées et approches créatives pour développer des solutions modernes et efficaces.',
      animationState: 'hidden'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Collaboration',
      description: 'Je travaille en étroite collaboration avec mes clients, créant une relation de confiance basée sur l\'écoute et la transparence.',
      animationState: 'hidden'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Résultats',
      description: 'Mon approche orientée résultats garantit des solutions concrètes et mesurables qui répondent aux besoins spécifiques.',
      animationState: 'hidden'
    }
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Erwin Alberic Asseng',
      role: 'Gestionnaire Polyvalent',
      bio: 'Avec plus de 3 ans d\'expérience professionnelle, je propose mes compétences aux entreprises dynamiques et ambitieuses. Mon objectif est de mettre mon expertise au service de la croissance et de la pérennité de ces organisations, en contribuant à leur succès durable.',
      skills: [
        'Développement Web',
        'Support IT',
        'Comptabilité',
        'ERP Odoo',
        'Automatisation',
        'Gestion de projets',
        'Administration système',
        'Audit IT'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/erwin-alberic-asseng',
        github: 'https://github.com/erwin-asseng',
        email: 'erwinalberic99@gmail.com'
      },
      animationState: 'hidden'
    }
  ];

  education = [
    {
      degree: 'Inspecteur des postes et Télécommunications',
      school: 'SUP\'PTIC',
      location: 'Yaoundé, Cameroun',
      year: '2023',
      description: 'Formation complète en gestion d\'entreprise avec focus sur la gestion administrative et systèmes d\'information.'
    },
    {
      degree: 'Formation Professionnelle - Gestion des Entreprises',
      school: 'SUP\'PTIC',
      location: 'Yaoundé, Cameroun',
      year: '2023',
      description: 'Spécialisation en gestion administrative et comptabilité.'
    },
    {
      degree: 'Formation Professionnelle - Comptabilité et Fiscalité',
      school: 'Les Ateliers Pratiques',
      location: 'Douala, Cameroun',
      year: '2021',
      description: 'Maîtrise des principes comptables, déclarations fiscales et gestion budgétaire.'
    },
    {
      degree: 'Baccalauréat A4ALL',
      school: 'Collège Joseph Stintzi',
      location: 'Obala, Cameroun',
      year: '2020',
      description: 'Diplôme d\'études secondaires.'
    }
  ];

  // ============================================
  // VARIABLES PRIVÉES
  // ============================================

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;
  private particles: DigitalParticle[] = [];
  private animationId: number | null = null;
  private observers: IntersectionObserver[] = [];
  private animationTimeouts: any[] = [];
  private resizeTimeout: any;

  // Configuration des couleurs
  private readonly PARTICLE_COLORS = ['#19520d', '#b58e49', '#2d7a1a', '#d4a867'];
  private readonly PARTICLE_MIN_RADIUS = 1;
  private readonly PARTICLE_MAX_RADIUS = 3;
  private readonly CONNECTION_RADIUS_MIN = 80;
  private readonly CONNECTION_RADIUS_MAX = 100;

  constructor(private cdr: ChangeDetectorRef) { }

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  ngOnInit(): void {
    this.initializeAnimationStates();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeDigitalCanvas();
      this.setupScrollAnimations();
      this.setupResizeListener();
    }, 100);
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  // ============================================
  // MÉTHODES PUBLIQUES
  // ============================================

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getExpertiseIcon(index: number): string {
    return index === 0 ? 'fas fa-laptop-code' : 'fas fa-chart-line';
  }

  getExpertiseTitle(index: number): string {
    return index === 0 ? 'Support IT & Infrastructure' : 'Gestion Comptable & Administrative';
  }

  getExpertiseDescription(index: number): string {
    const descriptions = [
      'Installation, configuration et maintenance des infrastructures IT. Gestion des postes de travail, réseaux et résolution rapide des incidents pour garantir la continuité des services critiques.',
      'Expertise en gestion comptable avec Odoo, déclarations fiscales et gestion administrative. Maîtrise des processus comptables et optimisation fiscale pour tous types d\'organisations.'
    ];
    return descriptions[index];
  }

  getExpertiseFeatures(index: number): string[] {
    const features = [
      ['Configuration réseau', 'Gestion des incidents', 'Maintenance préventive'],
      ['Comptabilité Odoo', 'Déclarations fiscales', 'Suivi budgétaire']
    ];
    return features[index];
  }

  getCarriereLink(index: number): string {
    return index === 0 ? '/career/it-support' : '/career/admin-accounting';
  }

  // ============================================
  // MÉTHODES PRIVÉES - INITIALISATION
  // ============================================

  private initializeAnimationStates(): void {
    this.quickStats.forEach(stat => stat.animationState = 'hidden');
    this.values.forEach(value => value.animationState = 'hidden');
    this.teamMembers.forEach(member => member.animationState = 'hidden');
    this.storyBlocks.forEach(block => block.animationState = 'hidden');
  }

  private initializeDigitalCanvas(): void {
    if (!this.digitalCanvas?.nativeElement) return;

    this.canvas = this.digitalCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) return;

    this.resizeCanvas();
    this.createParticles();
    this.animate();
  }

  private resizeCanvas(): void {
    if (!this.canvas || !this.ctx) return;

    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    // Adapter les particules aux nouvelles dimensions
    this.particles.forEach(particle => {
      if (particle.x > this.canvas.width) particle.x = this.canvas.width - 50;
      if (particle.y > this.canvas.height) particle.y = this.canvas.height - 50;
    });
  }

  private createParticles(): void {
    if (!this.canvas) return;

    const particleCount = Math.min(
      80,
      Math.floor((this.canvas.width * this.canvas.height) / 8000)
    );

    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * (this.PARTICLE_MAX_RADIUS - this.PARTICLE_MIN_RADIUS) + this.PARTICLE_MIN_RADIUS,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        color: this.PARTICLE_COLORS[Math.floor(Math.random() * this.PARTICLE_COLORS.length)],
        opacity: Math.random() * 0.6 + 0.2,
        connectionRadius: Math.random() * (this.CONNECTION_RADIUS_MAX - this.CONNECTION_RADIUS_MIN) + this.CONNECTION_RADIUS_MIN
      });
    }
  }

  // ============================================
  // MÉTHODES PRIVÉES - ANIMATION DU CANVAS
  // ============================================

  private animate = (): void => {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Mettre à jour et dessiner les particules
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });

    // Dessiner les connexions
    this.drawConnections();

    this.animationId = requestAnimationFrame(this.animate);
  };

  private updateParticle(particle: DigitalParticle): void {
    particle.x += particle.dx;
    particle.y += particle.dy;

    // Rebond sur les bords
    if (particle.x < 0 || particle.x > this.canvas.width) {
      particle.dx *= -1;
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    }
    if (particle.y < 0 || particle.y > this.canvas.height) {
      particle.dy *= -1;
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }
  }

  private drawParticle(particle: DigitalParticle): void {
    if (!this.ctx) return;

    // Corps de la particule
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
    this.ctx.fill();

    // Brillance
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.3})`;
    this.ctx.fill();
  }

  private drawConnections(): void {
    if (!this.ctx) return;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );

        const maxDistance = Math.min(p1.connectionRadius, p2.connectionRadius);

        if (distance < maxDistance) {
          const opacity = (1 - distance / p1.connectionRadius) * 0.2;

          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(185, 142, 73, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  // ============================================
  // MÉTHODES PRIVÉES - SCROLL ANIMATIONS
  // ============================================

  private setupScrollAnimations(): void {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    this.setupSectionObserver(this.heroSection, () => this.animateHeroSection(), observerOptions);
    this.setupSectionObserver(this.storySection, () => this.animateStorySection(), observerOptions);
    this.setupSectionObserver(this.valuesSection, () => this.animateValuesSection(), observerOptions);
    this.setupSectionObserver(this.teamSection, () => this.animateTeamSection(), observerOptions);
    this.setupSectionObserver(this.ctaSection, () => this.animateCtaSection(), observerOptions);
  }

  private setupSectionObserver(
    section: ElementRef | undefined,
    callback: () => void,
    options: IntersectionObserverInit
  ): void {
    if (!section?.nativeElement) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(section.nativeElement);
    this.observers.push(observer);
  }

  private animateHeroSection(): void {
    this.heroAnimationState = 'visible';

    this.scheduleAnimation(() => {
      this.contentAnimationState = 'visible';
      this.cdr.markForCheck();
    }, 200);

    this.quickStats.forEach((stat, index) => {
      this.scheduleAnimation(() => {
        stat.animationState = 'visible';
        this.cdr.markForCheck();
      }, 600 + index * 200);
    });

    this.cdr.markForCheck();
  }

  private animateStorySection(): void {
    this.storyAnimationState = 'visible';

    this.storyBlocks.forEach((block, index) => {
      this.scheduleAnimation(() => {
        block.animationState = 'visible';
        this.cdr.markForCheck();
      }, index * 300);
    });

    // Animer la carte freelance après les cartes d'expertise
    this.scheduleAnimation(() => {
      this.freelanceProfileState = 'visible';
      this.cdr.markForCheck();
    }, this.storyBlocks.length * 300);

    this.cdr.markForCheck();
  }

  private animateValuesSection(): void {
    this.valuesAnimationState = 'visible';

    this.values.forEach((value, index) => {
      this.scheduleAnimation(() => {
        value.animationState = 'visible';
        this.cdr.markForCheck();
      }, index * 150);
    });

    this.cdr.markForCheck();
  }

  private animateTeamSection(): void {
    this.teamAnimationState = 'visible';

    this.teamMembers.forEach((member, index) => {
      this.scheduleAnimation(() => {
        member.animationState = 'visible';
        this.cdr.markForCheck();
      }, index * 200);
    });

    this.cdr.markForCheck();
  }

  private animateCtaSection(): void {
    this.ctaAnimationState = 'visible';
    this.cdr.markForCheck();
  }

  private scheduleAnimation(callback: () => void, delay: number): void {
    const timeout = setTimeout(callback, delay);
    this.animationTimeouts.push(timeout);
  }

  // ============================================
  // MÉTHODES PRIVÉES - EVENT LISTENERS
  // ============================================

  private setupResizeListener(): void {
    window.addEventListener('resize', () => this.handleResize());
  }

  private handleResize(): void {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resizeCanvas();
    }, 250);
  }

  // ============================================
  // NETTOYAGE
  // ============================================

  private cleanup(): void {
    // Arrêter l'animation du canvas
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    // Déconnecter les observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Effacer les timeouts
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];

    // Effacer le timeout de redimensionnement
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    window.removeEventListener('resize', () => this.handleResize());
  }
}