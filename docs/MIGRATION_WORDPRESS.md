# Stratégie de Migration WordPress vers Next.js — AFI-L'UE

## 1. Inventaire Détaillé du Site Existant (Source : https://afi-ue.sn/)

L'audit technique réalisé via l'API REST WordPress (`/wp-json/wp/v2/`) a permis d'établir l'inventaire exact suivant :

| Type de Contenu | Nombre d'éléments | Statut & Format Source | Destination Next.js / Supabase |
|---|---|---|---|
| **Articles / Actualités** | 71 | `wp_posts` (Divi / Gutenberg) | Table `articles` (PostgreSQL) |
| **Pages Institutionnelles** | 94 | `wp_pages` (Divi Builder) | Pages statiques / Table `formations` |
| **Formations Diplômantes** | 35 (Licences & Masters) | Pages individuelles sous Divi | Table `formations` normalisée |
| **Médias / Images** | 301 attachments | `/wp-content/uploads/` | Supabase Storage (`media-public`) |
| **Catégories d'articles** | 8 | Taxonomie `category` | Table `article_categories` |
| **Tags d'articles** | 49 | Taxonomie `post_tag` | Tableau PostgreSQL `tags TEXT[]` |
| **Formulaires d'inscription**| 3 pays (SN, GA, CG) | Plugin Forminator | Module Candidature Next.js + Supabase |

---

## 2. Défi Technique Majeur : Nettoyage des Shortcodes Divi

### Constat
Les contenus de cours et d'articles dans WordPress contiennent des balises spécifiques au constructeur Divi :
`[et_pb_section][et_pb_row][et_pb_column]...[/et_pb_column][/et_pb_row][/et_pb_section]`

### Solution Préconisée pour la Mission 02
Un script d'extraction automatisé (`scripts/migrate-wp.ts`) exécutera :
1. La récupération paginée des articles et pages via l'API REST `https://afi-ue.sn/wp-json/wp/v2/`.
2. Le nettoyage par regex / parseur AST des balises `[et_pb_*]` pour ne conserver que le texte structuré, les titres H1-H4 et les balises HTML sémantiques.
3. Le parsing spécifique des pages de formations pour extraire :
   - Mention
   - Domaine
   - Objectifs
   - Conditions d'admission
   - Débouchés professionnels
4. Le téléchargement et le réhébergement des médias dans le bucket Supabase Storage, avec mise à jour des URLs dans le corps des articles.

---

## 3. Plan de Redirection SEO (301 Permanent Redirects)

Pour préserver l'historique SEO et le référencement sur Google de l'université AFI-L'UE, toutes les anciennes URLs WordPress sont redirigées dans `next.config.ts` :

Exemples de correspondance :
- `/licence-intelligence-artificielle-et-big-data/` ➔ `/formations/licence-intelligence-artificielle-et-big-data`
- `/master-audit-et-controle-de-gestion/` ➔ `/formations/master-audit-et-controle-de-gestion`
- `/formulaire-dinscription-senegal/` ➔ `/candidature?pays=senegal`
- `/wp-content/uploads/*` ➔ CDN Supabase Storage
