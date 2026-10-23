# Plateforme Universitaire AFI-L'UE (Refonte 2026)

Nouvelle plateforme web pour l'université **AFI-L'UE** (L'Université de l'Entreprise, Dakar, Sénégal), remplaçant l'ancien site WordPress : [https://afi-ue.sn/](https://afi-ue.sn/).

---

## 🚀 Stack Technique

- **Framework Web** : [Next.js](https://nextjs.org/) (App Router, Server Actions, SSR / ISR)
- **Langage** : [TypeScript](https://www.typescriptlang.org/) en mode strict
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) avec design tokens de l'identité AFI (Rouge `#AD1B18`, Bleu Marine `#191D38`, Or `#D4AF37`)
- **Base de données & Auth** : PostgreSQL via [Supabase](https://supabase.com/) autohébergé
- **Sécurité** : Row Level Security (RLS) native sur toutes les tables
- **Conteneurisation & Déploiement** : Docker multi-stage & [Coolify](https://coolify.io/) sur VPS Contabo
- **Qualité & Tests** : ESLint, Vitest, Turbopack

---

## 📁 Arborescence du Projet

```text
├── Dockerfile                   # Build multi-stage optimisé pour Coolify
├── .dockerignore
├── .env.example                 # Modèle des variables d'environnement (sans secrets)
├── .gitignore
├── eslint.config.mjs            # Configuration ESLint (TypeScript strict)
├── next.config.ts               # Configuration Next.js (standalone, headers de sécurité)
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts           # Design system tokens AFI-L'UE
├── tsconfig.json                # TypeScript strict mode
├── vitest.config.mts            # Configuration Vitest
├── docs/                        # Documentation détaillée
│   ├── DEPLOYMENT_COOLIFY.md    # Guide de déploiement Coolify & Contabo
│   └── MIGRATION_WORDPRESS.md   # Inventaire & stratégie de migration WP
├── supabase/
│   └── migrations/
│       └── 20261023000001_initial_schema.sql # Schéma PostgreSQL & politiques RLS
├── tests/                       # Tests unitaires et d'intégration
│   ├── health.test.ts           # Test de l'endpoint /api/health
│   └── supabase-clients.test.ts # Test d'isolation des clients Supabase
└── src/
    ├── app/
    │   ├── api/
    │   │   └── health/route.ts  # Endpoint de surveillance santé pour Coolify
    │   ├── globals.css          # Styles globaux & polices
    │   ├── layout.tsx           # Layout racine avec métadonnées SEO
    │   └── page.tsx             # Page d'accueil moderne institutionnelle
    ├── lib/
    │   ├── supabase/
    │   │   ├── admin.ts         # Client privilégié service_role (serveur uniquement)
    │   │   ├── client.ts        # Client navigateur (anonyme RLS)
    │   │   ├── middleware.ts    # Gestion de session et protection des routes
    │   │   └── server.ts        # Client serveur (SSR / Server Actions)
    │   └── utils.ts             # Fonctions utilitaires (cn, formatage monétaire)
    ├── middleware.ts            # Middleware Edge Next.js
    └── types/
        └── database.ts          # Définitions TypeScript du schéma de données
```

---

## 🛠️ Installation et Démarrage Local

### 1. Prérequis
- Node.js version 20 LTS ou supérieure (22 ou 24 supportés)
- npm version 10+
- Git

### 2. Cloner le projet et installer les dépendances
```bash
git clone <url-du-depot>
cd AFI_Website
npm install
```

### 3. Configurer les variables d'environnement
Copiez le fichier `.env.example` en `.env.local` et complétez les valeurs selon votre environnement :
```bash
cp .env.example .env.local
```

### 4. Démarrer le serveur de développement
```bash
npm run dev
```
L'application est accessible sur : [http://localhost:3000](http://localhost:3000)
L'endpoint de santé est accessible sur : [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 🧪 Tests et Contrôles Qualité

```bash
# Lancer les tests unitaires avec Vitest
npm test

# Lancer la vérification du code avec ESLint
npm run lint

# Compiler l'application pour la production (vérification TypeScript stricte)
npm run build
```

---

## 🚢 Déploiement

Consultez le guide complet dans [`docs/DEPLOYMENT_COOLIFY.md`](docs/DEPLOYMENT_COOLIFY.md).
