import { Injectable, effect, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Type pour représenter les thèmes disponibles
 */
export type Theme = 'light' | 'dark';

/**
 * Clé pour le stockage local de la préférence de thème
 */
const THEME_STORAGE_KEY = 'theme-preference';

/**
 * Clé pour le stockage de la préférence d'utilisation du thème système
 */
const SYSTEM_PREFERENCE_KEY = 'use-system-theme';

/**
 * Service de gestion des thèmes clair/sombre avec support
 * des préférences système et persistance locale
 * 
 * @example
 * constructor(private themeService: ThemeService) {}
 * 
 * toggleTheme() {
 *   this.themeService.toggleTheme();
 * }
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Signal interne pour le thème actuel
   */
  private themeSignal = signal<Theme>(this.getInitialTheme());

  /**
   * Signal read-only exposé publiquement
   */
  public theme$ = this.themeSignal.asReadonly();

  /**
   * Signal computed pour vérifier si le mode sombre est actif
   */
  public isDarkMode$ = computed(() => this.themeSignal() === 'dark');

  /**
   * MediaQueryList pour écouter les changements de préférences système
   */
  private systemThemeQuery?: MediaQueryList;

  /**
   * Signal pour savoir si on suit les préférences système
   */
  private useSystemPreferenceSignal = signal<boolean>(this.shouldUseSystemPreference());

  constructor() {
    // Seulement côté navigateur
    if (this.isBrowser) {
      // Appliquer le thème initial
      this.applyTheme(this.themeSignal());

      // Écouter les changements du signal de thème
      effect(() => {
        this.applyThemeWithTransition(this.themeSignal());
      });

      // Initialiser l'écoute des préférences système si nécessaire
      if (this.useSystemPreferenceSignal()) {
        this.initSystemThemeListener();
      }
    }
  }

  /**
   * Récupère le thème initial depuis localStorage, préférence système ou par défaut
   */
  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark'; // Par défaut côté serveur
    }

    // Si l'utilisateur a désactivé les préférences système et a une préférence enregistrée
    const useSystemPreference = this.shouldUseSystemPreference();

    if (!useSystemPreference) {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }

    // Utiliser les préférences système
    return this.getSystemTheme();
  }

  /**
   * Vérifie si on doit utiliser les préférences système
   */
  private shouldUseSystemPreference(): boolean {
    if (!this.isBrowser) {
      return true;
    }

    const useSystemPref = localStorage.getItem(SYSTEM_PREFERENCE_KEY);
    // Par défaut, on utilise les préférences système si aucune préférence manuelle
    return useSystemPref === null || useSystemPref === 'true';
  }

  /**
   * Récupère le thème préféré du système
   */
  private getSystemTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark';
    }

    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch (error) {
      console.warn('Impossible de détecter les préférences système:', error);
      return 'dark'; // Fallback
    }
  }

  /**
   * Initialise l'écoute des changements de préférences système
   */
  private initSystemThemeListener(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Écouter les changements
      this.systemThemeQuery.addEventListener('change', (e) => {
        // Seulement si on suit les préférences système
        if (this.useSystemPreferenceSignal()) {
          const newTheme: Theme = e.matches ? 'dark' : 'light';
          this.themeSignal.set(newTheme);
        }
      });
    } catch (error) {
      console.warn('Impossible d\'initialiser l\'écoute des préférences système:', error);
    }
  }

  /**
   * Bascule entre dark et light mode
   * Désactive automatiquement le suivi des préférences système
   */
  toggleTheme(): void {
    const newTheme: Theme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme, false); // false = on désactive le suivi système
  }

  /**
   * Définit le thème manuellement
   * @param theme Le thème à appliquer
   * @param useSystemPreference Si true, réactive le suivi des préférences système
   */
  setTheme(theme: Theme, useSystemPreference: boolean = false): void {
    this.themeSignal.set(theme);
    this.useSystemPreferenceSignal.set(useSystemPreference);

    if (!useSystemPreference) {
      this.saveThemePreference(theme);
      this.saveSystemPreference(false);
    } else {
      // Si on réactive les préférences système, on supprime la préférence manuelle
      this.clearThemePreference();
      this.saveSystemPreference(true);

      // Réinitialiser l'écoute si nécessaire
      if (!this.systemThemeQuery) {
        this.initSystemThemeListener();
      }
    }
  }

  /**
   * Active le suivi des préférences système
   */
  enableSystemPreference(): void {
    const systemTheme = this.getSystemTheme();
    this.setTheme(systemTheme, true);
  }

  /**
   * Désactive le suivi des préférences système
   */
  disableSystemPreference(): void {
    const currentTheme = this.themeSignal();
    this.setTheme(currentTheme, false);
  }

  /**
   * Retourne si le suivi des préférences système est actif
   */
  isSystemPreferenceEnabled(): boolean {
    return this.useSystemPreferenceSignal();
  }

  /**
   * Retourne le thème actuel
   */
  getCurrentTheme(): Theme {
    return this.themeSignal();
  }

  /**
   * Retourne si le mode sombre est actif
   */
  isDarkMode(): boolean {
    return this.themeSignal() === 'dark';
  }

  /**
   * Applique le thème au DOM avec une transition fluide
   */
  private applyThemeWithTransition(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const htmlElement = document.documentElement;

      // Ajouter la classe de transition temporairement
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        htmlElement.classList.add('theme-transition');
      }

      // Appliquer le thème
      this.applyTheme(theme);

      // Retirer la classe de transition après l'animation
      if (!prefersReducedMotion) {
        setTimeout(() => {
          htmlElement.classList.remove('theme-transition');
        }, 300);
      }
    } catch (error) {
      // Fallback silencieux: appliquer sans transition
      this.applyTheme(theme);
    }
  }

  /**
   * Applique le thème au DOM
   */
  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const htmlElement = document.documentElement;

      // Définir l'attribut data-theme
      htmlElement.setAttribute('data-theme', theme);

      // Gérer les classes pour compatibilité avec les styles existants
      if (theme === 'dark') {
        htmlElement.classList.remove('light-mode');
        htmlElement.classList.add('dark-mode');
      } else {
        htmlElement.classList.remove('dark-mode');
        htmlElement.classList.add('light-mode');
      }
    } catch (error) {
      // Erreur silencieuse - le thème par défaut reste appliqué
    }
  }

  /**
   * Sauvegarde la préférence de thème dans localStorage
   */
  private saveThemePreference(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Erreur silencieuse lors de la sauvegarde
    }
  }

  /**
   * Supprime la préférence de thème du localStorage
   */
  private clearThemePreference(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch (error) {
      // Erreur silencieuse lors de la suppression
    }
  }

  /**
   * Sauvegarde la préférence d'utilisation du thème système
   */
  private saveSystemPreference(useSystem: boolean): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(SYSTEM_PREFERENCE_KEY, useSystem.toString());
    } catch (error) {
      // Erreur silencieuse lors de la sauvegarde système
    }
  }

  /**
   * Nettoie les ressources lors de la destruction du service
   */
  ngOnDestroy(): void {
    // Retirer l'écouteur de media query si présent
    if (this.systemThemeQuery && this.isBrowser) {
      try {
        this.systemThemeQuery.removeEventListener('change', () => { });
      } catch (error) {
        console.warn('Erreur lors du nettoyage de l\'écouteur:', error);
      }
    }
  }
}
