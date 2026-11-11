# Schéma & Architecture de la Base de Données — AFI-L'UE

## 1. Vue d'ensemble

La base de données principale de la plateforme web **AFI-L'Université de l'Entreprise** repose sur **PostgreSQL 15+** avec l'extension **UUID** (`pgcrypto` / `uuid-ossp`) et le moteur de politiques de sécurité au niveau des lignes (**Row Level Security - RLS**).

L'architecture des données est structurée en plusieurs sous-systèmes relationnels étanches :
1. **Identité & Profils** : Gestion des utilisateurs, permissions et rôles académiques/administratifs.
2. **Structure Académique** : Domaines scientifiques, départements universitaires, filières diplômantes (formations), programmes semestriels et accréditations officielles (CAMES / ANAQ-Sup).
3. **Admissions & Candidatures** : Dossiers de candidature en ligne, statuts de traitement, documents justificatifs et historique d'audit.
4. **CMS & Contenus Institutionnels** : Bannières hero (slider), actualités, catégories éditoriales, témoignages, partenaires et réglages globaux du site.
5. **SEO & Redirections** : Table de redirections 301 permanentes pour préserver le référencement naturel du site WordPress existant (`afi-ue.sn`).

---

## 2. Dictionnaire des Tables

### 2.1. Structure Académique

#### `domains` (Pôles & Domaines Scientifiques)
Représente les 4 grands domaines d'enseignement de l'AFI-L'UE :
- `id` (UUID, PK) : Identifiant unique.
- `code` (VARCHAR, UNIQUE) : Code institutionnel (`ST`, `SEG`, `SJPA`, `SHS`).
- `name` (VARCHAR) : Intitulé complet (ex : *Sciences et Technologies*).
- `slug` (VARCHAR, UNIQUE) : Identifiant URL canonique (ex : `sciences-et-technologies`).
- `description` (TEXT) : Présentation académique du pôle.
- `color_hex` (VARCHAR) : Couleur thématique du pôle.
- `order_index` (INT) : Ordre d'affichage.
- `is_active` (BOOLEAN) : Activation publique.

#### `departments` (Départements d'enseignement)
Rattachés aux domaines :
- `id` (UUID, PK)
- `domain_id` (UUID, FK -> `domains.id`)
- `name` (VARCHAR) : Ex: *Informatique & Télécoms*, *Comptabilité & Finance*, *Management & Stratégie*.
- `slug` (VARCHAR, UNIQUE)
- `description` (TEXT)
- `order_index` (INT)

#### `formations` (Filières & Offres de Formation)
Cœur de l'offre universitaire :
- `id` (UUID, PK)
- `domain_id` (UUID, FK -> `domains.id`)
- `department_id` (UUID, FK -> `departments.id`, Nullable)
- `title` (VARCHAR) : Titre officiel du diplôme (ex: *Licence Informatique de Gestion (Génie Logiciel & IA)*).
- `slug` (VARCHAR, UNIQUE) : URL pérenne (`/formations/[slug]`).
- `short_title` (VARCHAR) : Sigle ou titre abrégé.
- `level` (VARCHAR) : Cycle d'études (`licence`, `master`, `doctorat`, `certification`, `executive`).
- `degree_awarded` (VARCHAR) : Intitulé exact du diplôme délivré (ex: *Diplôme de Licence d'État*).
- `duration_years` (INT) : Durée officielle en années.
- `duration_semesters` (INT) : Nombre de semestres (LMD : 6 semestres en Licence, 4 en Master).
- `study_mode` (VARCHAR) : Modalité (`jour`, `soir`, `en_ligne`, `hybride`).
- `tuition_fee_annual` (NUMERIC) : Montant des frais de scolarité annuels en FCFA.
- `registration_fee` (NUMERIC) : Frais d'inscription initiale.
- `summary` (TEXT) : Résumé exécutif.
- `presentation` (TEXT) : Description détaillée des objectifs.
- `career_opportunities` (TEXT[]) : Débouchés professionnels et métiers cibles.
- `admission_requirements` (TEXT[]) : Conditions d'accès académiques (bac requis, prérequis).
- `cames_recognized` (BOOLEAN) : Indicateur d'accréditation CAMES.
- `anaq_sup_accredited` (BOOLEAN) : Indicateur d'habilitation ANAQ-Sup.
- `is_featured` (BOOLEAN) : Mise en avant en page d'accueil.
- `is_active` (BOOLEAN) : Visibilité publique.
- `meta_title`, `meta_description` (VARCHAR) : Balises SEO dédiées.

---

### 2.2. Admissions & Candidatures

#### `candidatures`
Table sécurisée stockant les dossiers de candidature :
- `id` (UUID, PK)
- `formation_id` (UUID, FK -> `formations.id`)
- `reference_code` (VARCHAR, UNIQUE) : Code de suivi non prédictible (format `AFI-2026-XXXXX`).
- `first_name` (VARCHAR) : Prénom du candidat.
- `last_name` (VARCHAR) : Nom de famille.
- `email` (VARCHAR) : Adresse email de contact.
- `phone` (VARCHAR) : Téléphone (avec indicatif international).
- `country` (VARCHAR) : Pays d'origine/résidence.
- `city` (VARCHAR) : Ville.
- `birth_date` (DATE) : Date de naissance.
- `birth_place` (VARCHAR) : Lieu de naissance.
- `last_diploma` (VARCHAR) : Dernier diplôme obtenu (ex: *Baccalauréat S2*, *Licence 3 Informatique*).
- `previous_school` (VARCHAR) : Dernier établissement fréquenté.
- `session_academic_year` (VARCHAR) : Rentrée ciblée (ex: `2026-2027`).
- `status` (VARCHAR) : Workflow d'admission (`soumis`, `a_examiner`, `dossier_incomplet`, `accepte`, `refuse`).
- `admin_notes` (TEXT) : Commentaires internes réservés au service des admissions.
- `created_at`, `updated_at` (TIMESTAMPTZ).

#### `candidature_documents`
Pièces justificatives des candidats (bulletins, pièces d'identité, diplômes) :
- `id` (UUID, PK)
- `candidature_id` (UUID, FK -> `candidatures.id`, ON DELETE CASCADE)
- `document_type` (VARCHAR) : `piece_identite`, `diplome_bac`, `releve_notes`, `cv`, `lettre_motivation`.
- `storage_path` (VARCHAR) : Chemin sécurisé dans le bucket privé Supabase Storage.
- `file_size_bytes` (INT)
- `mime_type` (VARCHAR)

---

### 2.3. CMS & Communication

#### `homepage_slides`
- `id` (UUID, PK)
- `title` (VARCHAR) : Titre principal de la diapositive.
- `subtitle` (TEXT) : Sous-titre ou description.
- `badge` (VARCHAR) : Étiquette supérieure (ex: *Admissions Ouvertes 2026-2027*).
- `image_url` (VARCHAR) : Image haute résolution optimisée.
- `cta_primary_text`, `cta_primary_url` (VARCHAR)
- `cta_secondary_text`, `cta_secondary_url` (VARCHAR)
- `order_index` (INT)
- `is_active` (BOOLEAN)

#### `articles` & `article_categories`
- Actualités institutionnelles, communiqués et articles scientifiques avec catégories, tags, dates de publication et SEO.

#### `redirects`
- Table de redirection 301 pour préserver les URL historiques du site WordPress Divi (`source_url` -> `target_url`).

---

## 3. Sécurité des Données & RLS (Row Level Security)

Toutes les tables intègrent la sécurité au niveau de la ligne :
```sql
ALTER TABLE candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
```

### Règles appliquées :
1. **Contenu public** (`formations`, `domains`, `departments`, `articles`, `homepage_slides`) :
   - Lecture autorisée pour tous (`anon` & `authenticated`) uniquement si `is_active = true` (ou `status = 'published'`).
   - Écriture / modification réservée aux rôles administratifs (`super_admin`, `admin_web`, `responsable_academique`).
2. **Données de candidature** (`candidatures`, `candidature_documents`) :
   - Insertion autorisée au public (dépôt du formulaire de candidature).
   - **Lecture et mise à jour strictement interdites aux utilisateurs anonymes**.
   - Accès en lecture / modification exclusivement réservé au personnel habilité (`responsable_admissions`, `super_admin`).

---

## 4. Migrations & Versioning

Les migrations sont versionnées dans le dossier `supabase/migrations/` :
- `20261023000001_initial_schema.sql` : Schéma initial de base.
- `20261026000002_complete_academic_cms_schema.sql` : Schéma académique complet, domaines, slider, admissions, RLS et index.
- `supabase/seed.sql` : Données de démarrage officielles (4 domaines, 8 formations de référence, partenaires, diapositives).
