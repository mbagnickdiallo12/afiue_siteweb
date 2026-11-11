# Architecture Technique — Nouvelle Plateforme Web AFI-L'UE

## 1. Vue d'Ensemble
La plateforme web officielle de l'Université AFI-L'UE (AFI-L'Université de l'Entreprise) est conçue sur une architecture moderne **Next.js (App Router)** et **PostgreSQL / Supabase**, remplaçant l'ancien site sous WordPress / Divi 4.

L'objectif architectural fondamental est d'offrir :
- Une vitrine institutionnelle réactive, accessible et optimisée SEO.
- Un catalogue de formations entièrement dynamique généré depuis la base de données relationnelle.
- Un système de candidatures en ligne direct avec génération de références uniques (`AFI-2026-XXXXX`).
- Un tableau de bord d'administration unifié pour la scolarité, la communication et la direction.
- Une résilience totale : le site peut pré-rendre les pages de manière autonome grâce au jeu de données vérifié, tout en synchronisant les données en direct avec PostgreSQL dès la connexion de Supabase.

---

## 2. Piles Technologiques & Rôles

| Composant | Technologie | Rôle & Justification |
|---|---|---|
| **Framework Web** | Next.js 16 (Turbopack) | Rendu hybride (Server Components par défaut, Client Components ciblés pour l'interactivité). |
| **Langage** | TypeScript (mode strict) | Typage intégral de la base de données et des contrats d'API. |
| **Styling** | Tailwind CSS v3 | Design system institutionnel, palettes officielles AFI (Navy `#191D38`, Red `#AD1B18`, Gold `#D4AF37`). |
| **Typographie** | Montserrat & Inter | Titres expressifs institutionnels et corps de texte à haute lisibilité. |
| **Icônes** | Lucide React | Icônes vectorielles légères et accessibles. |
| **Validation** | Zod | Schémas de validation serveur stricts pour les formulaires de candidature et de contact. |
| **Base de Données** | PostgreSQL 15+ (Supabase) | Relations normalisées, contraintes d'intégrité, Row Level Security (RLS) et triggers d'horodatage. |
| **Tests** | Vitest | Tests unitaires et d'intégration automatisés. |
| **Conteneurisation** | Docker multi-stage | Image légère et sécurisée (`standalone`) prête pour Coolify. |

---

## 3. Arborescence du Projet

```
src/
├── app/                              # Next.js App Router
│   ├── (public)
│   │   ├── page.tsx                  # Accueil (Slider administrable, domaines, formations phares, actualités)
│   │   ├── formations/               # Catalogue complet avec filtres réactifs
│   │   │   └── [slug]/               # Fiche détaillée de formation (syllabus, admission, brochure)
│   │   ├── domaines/                 # Pôles d'enseignement scientifiques (SEG, ST, SJPA, SHS)
│   │   │   └── [slug]/               # Détail du pôle et filières associées
│   │   ├── admissions/               # Modalités d'admission et calendrier
│   │   ├── candidater/               # Portail de candidature en ligne
│   │   │   └── [slug]/               # Candidature avec filière pré-sélectionnée
│   │   ├── executive-education/      # Pôle formation continue et cours du soir
│   │   ├── universite/               # Pages institutionnelles (Présentation, Vision, Accréditations, Campus)
│   │   ├── actualites/               # Actualités et blog scientifique
│   │   │   └── [slug]/               # Article complet
│   │   ├── contact/                  # Coordonnées des campus et formulaire
│   │   ├── mentions-legales/         # Mentions légales
│   │   ├── politique-confidentialite/# Protection des données (CDP Sénégal)
│   │   ├── sitemap.ts                # Sitemap XML dynamique
│   │   └── robots.ts                 # Robots.txt
│   ├── admin/                        # Tableau de bord administratif
│   │   ├── page.tsx                  # Vue d'ensemble et KPIs
│   │   ├── formations/               # Gestion des formations
│   │   ├── candidatures/             # Traitement des dossiers d'admission
│   │   ├── articles/                 # Modération des actualités
│   │   ├── slides/                   # Gestion du hero slider
│   │   └── settings/                 # Paramètres généraux
│   └── api/
│       ├── health/                   # Sonde de santé pour Coolify
│       ├── search/                   # Moteur de suggestions instantanées
│       ├── candidatures/             # Réception sécurisée des candidatures
│       └── contact/                  # Formulaire de contact
├── components/
│   ├── layout/                       # Header institutionnel & Footer
│   ├── home/                         # HeroSlider accessible
│   ├── formations/                   # FormationCard, CatalogFilterBar
│   ├── candidature/                  # CandidatureForm
│   ├── search/                       # SearchModal instantané (⌘K)
│   └── ui/                           # Logo officiel vectoriel
├── lib/
│   ├── data/                         # Jeu de données vérifié et fallbacks
│   ├── services/                     # Couche d'accès aux données (formations, domaines, articles, search)
│   └── supabase/                     # Clients Supabase (client, server, middleware)
└── types/
    └── database.ts                   # Modèles TypeScript complets
```
