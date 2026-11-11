# Plateforme Universitaire AFI-L'UE (Nouvelle Plateforme Officielle)

Nouvelle plateforme web officielle pour **AFI-L'Université de l'Entreprise** (Dakar & Thiès, Sénégal), remplaçant l'ancien site WordPress Divi : [https://afi-ue.sn/](https://afi-ue.sn/).

---

## 🚀 Stack Technique

- **Framework Web** : [Next.js](https://nextjs.org/) (App Router, Server Components par défaut, Turbopack)
- **Langage** : [TypeScript](https://www.typescriptlang.org/) en mode strict
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) avec les codes couleur officiels AFI (Bleu Marine `#191D38`, Rouge Cardinal `#AD1B18`, Or `#D4AF37`) et typographie Montserrat & Inter
- **Base de données & Auth** : PostgreSQL 15+ & [Supabase](https://supabase.com/) autohébergé
- **Sécurité** : Row Level Security (RLS) sur toutes les tables, cookies HttpOnly, stockage privé pour les dossiers candidats
- **Conteneurisation & Déploiement** : Docker multi-stage optimisé pour **Coolify** sur VPS Contabo
- **Qualité & Tests** : Vitest, ESLint (0 avertissements), TypeScript strict sans casts aveugles

---

## 🏛️ Fonctionnalités Réalisées & Structure des Routes

### 1. Espace Public
- **Accueil (`/`)** : Hero section avec slider administrable, recherche instantanée, domaines d'excellence, formations phares, badges CAMES / ANAQ-Sup, campus et partenaires.
- **Catalogue des Formations (`/formations`)** : Filtrage dynamique combiné par domaine académique, cycle d'études (Licence, Master), modalités d'enseignement et recherche textuelle.
- **Fiches Formations Détaillées (`/formations/[slug]`)** : Présentation complète, maquette pédagogique, débouchés métiers, conditions d'accès, tarifs annuels en FCFA, bouton direct « Candidater ».
- **Pôles & Domaines Scientifiques (`/domaines` & `/domaines/[slug]`)** : Les 4 grands domaines académiques (Sciences & Technologies, Économie & Gestion, Droit & Administration, Sciences Humaines).
- **Executive Education (`/executive-education`)** : Cours du soir, formations continues et certifications professionnelles pour cadres.
- **Présentation Institutionnelle (`/universite`)** : Mot de la Direction, Vision & Valeurs (`/universite/vision-et-valeurs`), Accréditations officielles (`/universite/accreditations`), Campus de Dakar Point E & Thiès (`/universite/campus`).
- **Actualités & Événements (`/actualites` & `/actualites/[slug]`)** : Publications et communiqués officiels.
- **Candidatures en Ligne (`/candidater` & `/candidater/[slug]`)** : Parcours d'admission complet en ligne générant un code de référence sécurisé non prédictible (`AFI-2026-XXXXX`).
- **Contact & Plan d'accès (`/contact`)** : Coordonnées des campus et formulaire de demande d'information relié à l'API.
- **Recherche Instantanée Globale** : Raccourci clavier universel `⌘K` / `Ctrl+K` avec suggestions en direct.
- **Pages Légales & SEO** : `/mentions-legales`, `/politique-confidentialite`, `/sitemap.xml`, `/robots.txt` et page 404 sur mesure.

### 2. Tableau de Bord Administratif (`/admin`)
- **Vue d'Ensemble (`/admin`)** : Statistiques opérationnelles réelles (formations publiées, candidatures reçues, articles).
- **Gestion des Formations (`/admin/formations`)** : Création, modification, accréditations CAMES/ANAQ-Sup, débouchés et statuts.
- **Instruction des Candidatures (`/admin/candidatures`)** : Suivi des dossiers, examen des pièces, mise à jour des statuts et export CSV.
- **Gestion du Slider (`/admin/slides`)** : Bannières hero, textes, liens d'action et ordre d'affichage.
- **Actualités & Blog (`/admin/articles`)** : Modération et publication d'articles.
- **Paramètres Généraux (`/admin/settings`)** : Contacts officiels, emails et réseaux sociaux.

### 3. Migration WordPress & Redirections
- Script idempotent d'extraction et nettoyage Divi : `scripts/migrate-wp.ts` (testé sur l'API live `https://afi-ue.sn/wp-json/wp/v2/`).
- Mappage des anciennes URL vers les nouvelles routes avec redirections permanentes 301 dans `next.config.ts`.

---

## 📁 Documentation Détaillée

- [`docs/architecture.md`](docs/architecture.md) : Architecture logicielle, flux de données et Server Components.
- [`docs/database.md`](docs/database.md) : Schéma relationnel complet, dictionnaire des données et politiques RLS.
- [`docs/security.md`](docs/security.md) : Authentification, RBAC, protection des dossiers candidats et en-têtes HTTP.
- [`docs/DEPLOYMENT_COOLIFY.md`](docs/DEPLOYMENT_COOLIFY.md) : Procédure pas à pas de déploiement Coolify sur Contabo.
- [`docs/backups-and-restore.md`](docs/backups-and-restore.md) : Stratégie de sauvegarde PostgreSQL / S3 et restauration testée.
- [`docs/admin-guide.md`](docs/admin-guide.md) : Manuel d'utilisation du tableau de bord pour les équipes universitaires.
- [`docs/MIGRATION_WORDPRESS.md`](docs/MIGRATION_WORDPRESS.md) : Rapport d'analyse et nettoyage des shortcodes Divi.

---

## 🛠️ Installation et Démarrage Local

### 1. Prérequis
- Node.js 20 LTS ou supérieure
- npm 10+
- Git

### 2. Cloner et installer les dépendances
```bash
git clone <url-du-depot>
cd AFI_Website
npm install
```

### 3. Variables d'environnement
```bash
cp .env.example .env.local
```

### 4. Démarrer le serveur de développement
```bash
npm run dev
```
Accessible sur [http://localhost:3000](http://localhost:3000) (Dashboard admin sur [http://localhost:3000/admin](http://localhost:3000/admin)).

---

## 🧪 Tests et Contrôles Qualité

```bash
# Lancer les tests automatisés (14 tests unitaires & d'intégration)
npm test

# Lancer la vérification ESLint (0 erreur, 0 avertissement)
npm run lint

# Compiler l'application pour la production (build Next.js Turbopack)
npm run build
```
Toutes les 27 routes statiques et dynamiques sont compilées et vérifiées avec succès.
