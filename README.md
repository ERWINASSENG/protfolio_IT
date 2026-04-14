# Portfolio Professionnel Angular

Un portfolio moderne et responsive développé avec Angular 20.3.0, suivant les meilleures pratiques et les principes d'architecture moderne.

## 🚀 Fonctionnalités

- **Architecture Moderne**: Composants standalone avec lazy loading
- **Design Responsive**: Optimisé pour mobile, tablette et desktop
- **Sections Multiples**: Home, À propos, Carrière (IT Support, Freelance Dev), Contact
- **Formulaire de Contact**: Avec validation et gestion d'erreurs
- **Accessibilité**: Normes WCAG respectées
- **SEO Optimisé**: Meta tags et structure sémantique
- **Animations Fluides**: Transitions et effets visuels subtils

## 📦 Installation

```bash
npm install
```

## 🔧 Développement

Lancer le serveur de développement:

```bash
npm start
```

Naviguer vers `http://localhost:4200/`

## 🏗️ Build

Build pour la production:

```bash
npm run build
```

Les fichiers seront générés dans le répertoire `dist/`

## 🧪 Tests

Lancer les tests unitaires:

```bash
npm test
```

## 📁 Structure du Projet

```
src/
├── app/
│   ├── core/                 # Composants fondamentaux
│   │   ├── header/
│   │   └── footer/
│   ├── pages/                # Pages principales
│   │   ├── home/
│   │   ├── about/
│   │   ├── contact/
│   │   └── career/
│   │       ├── it-support/
│   │       └── freelance-dev/
│   ├── services/             # Services métier
│   └── models/               # Interfaces et types
├── styles/                   # Styles globaux SCSS
└── assets/                   # Images et ressources statiques
```

## 🎨 Technologies

- Angular 20.3.0
- TypeScript 5.6.2
- SCSS
- RxJS 7.8.0
- Angular Router (Standalone)

## 📝 Conventions

- Composants: PascalCase avec suffix `.component.ts`
- Services: PascalCase avec suffix `.service.ts`
- Variables: camelCase
- Fichiers: kebab-case
- Classes CSS: kebab-case

## 🌐 Déploiement

Le projet est optimisé pour être déployé sur:
- Vercel
- Netlify
- Firebase Hosting

## 📄 Licence

MIT
