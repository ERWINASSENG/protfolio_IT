import { Component, HostListener, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  activeDropdown: string | null = null;

  // Computed signals pour le thème
  isDarkMode = computed(() => this.themeService.isDarkMode$());
  currentTheme = computed(() => this.themeService.getCurrentTheme());
  themeLabel = computed(() =>
    this.isDarkMode() ? 'Passer au mode clair' : 'Passer au mode sombre'
  );

  private routerSubscription?: Subscription;

  navItems = [
    { label: 'Accueil', path: '/', exact: true },
    { label: 'À Propos', path: '/about', exact: false },
    {
      label: 'Carrière',
      path: '/career',
      exact: false,
      children: [
        { label: 'IT Support', path: '/career/it-support' },
        { label: 'Admin & Comptabilité', path: '/career/admin-accounting' },
        { label: 'Développement Freelance', path: '/career/freelance-dev' }
      ]
    },
    { label: 'Contact', path: '/contact', exact: false }
  ];

  constructor(
    private router: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    // Fermer le menu lors de la navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.activeDropdown = null;
    this.updateBodyScroll();
  }

  toggleDropdown(label: string): void {
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  private updateBodyScroll(): void {
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
