import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Accueil - Portfolio Professionnel'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'À Propos - Portfolio Professionnel'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact - Portfolio Professionnel'
  },
  {
    path: 'career',
    children: [
      {
        path: '',
        redirectTo: 'it-support',
        pathMatch: 'full'
      },
      {
        path: 'it-support',
        loadComponent: () => import('./pages/career/it-support/it-support.component').then(m => m.ItSupportComponent),
        title: 'IT Support - Carrière'
      },

      {
        path: 'freelance-dev',
        loadComponent: () => import('./pages/career/freelance-dev/freelance-dev.component').then(m => m.FreelanceDevComponent),
        title: 'Développement Freelance - Carrière'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
