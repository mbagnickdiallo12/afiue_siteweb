# Politique & Architecture de Sécurité — AFI-L'UE

## 1. Principes Directeurs

La sécurité de la plateforme web **AFI-L'Université de l'Entreprise** est mise en œuvre selon le principe de **défense en profondeur**, couvrant les couches transport, application, base de données et stockage documentaire.

---

## 2. Authentification & Gestion des Droits

### 2.1. Supabase Auth & JWT
- L'authentification des administrateurs et gestionnaires repose sur **Supabase Auth** utilisant des tokens JWT sécurisés signés cryptographiquement.
- Les sessions sont vérifiées côté serveur via des cookies `HttpOnly`, `SameSite=Lax`, `Secure` (en production HTTPS).
- Aucun token ou secret sensible (`SUPABASE_SERVICE_ROLE_KEY`) n'est jamais exposé dans les bundles JavaScript côté navigateur.

### 2.2. Contrôle d'Accès Basé sur les Rôles (RBAC)
La matrice des rôles distingue :
1. **Super Administrateur** (`super_admin`) : Gestion globale de la plateforme, gestion des comptes, configuration du site.
2. **Administrateur Web** (`admin_web`) : Gestion technique, redirections, médias et CMS.
3. **Responsable Académique** (`responsable_academique`) : Gestion des offres de formation, maquettes pédagogiques et filières.
4. **Responsable Admissions** (`responsable_admissions`) : Instruction des dossiers de candidature, changement des statuts d'admission et export des listes.
5. **Responsable Communication** (`responsable_communication`) : Rédaction et publication des articles, actualités et diapositives du slider d'accueil.

---

## 3. Sécurité des Données Candidats & Fichiers

### 3.1. Confidentialité des Candidatures
Les dossiers de candidature contiennent des données à caractère personnel (noms, dates de naissance, téléphones, relevés de notes).
- **Isolation RLS** : Une requête SQL anonyme vers `SELECT * FROM candidatures` retourne un jeu vide (aucun accès anonyme en lecture).
- **Code de suivi non prédictible** : Les références sont générées selon le format `AFI-2026-XXXXX` avec un sel pseudo-aléatoire cryptographique, empêchant toute énumération séquentielle.
- **Notes internes protégées** : Le champ `admin_notes` n'est accessible qu'aux comptes du service des admissions.

### 3.2. Stockage Privé des Pièces Jointes
- Les justificatifs (pièce d'identité, relevé de notes, diplôme) sont stockés dans un bucket Supabase Storage configuré en **mode privé** (`public = false`).
- Aucun fichier de candidat n'est accessible via une URL statique directe. L'accès des instructeurs d'admission nécessite la génération d'une **URL signée à durée de vie limitée** (ex: expiration après 15 minutes).

---

## 4. Protection Applicative (OWASP Top 10)

### 4.1. Injections SQL
Toutes les requêtes passent par le client Supabase paramétré et le pilote PostgreSQL natif. Aucune chaîne SQL n'est concaténée avec des entrées utilisateur.

### 4.2. Validation des Entrées (Zod)
Tous les formulaires (`/candidater`, `/contact`, API routes) valident rigoureusement les données entrantes avec **Zod** côté serveur :
- Format des emails vérifié.
- Tailles maximales des champs textuels contraintes pour éviter les attaques par déni de service de mémoire.
- Nettoyage des chaînes de caractères.

### 4.3. Protection XSS & Assainissement
- Next.js et React échappent par défaut les expressions JSX `{value}`.
- Aucun `dangerouslySetInnerHTML` n'est utilisé sans assainissement strict.

### 4.4. En-têtes HTTP de Sécurité
Dans le cadre du reverse proxy Coolify / Traefik / Nginx, les en-têtes suivants sont configurés :
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 5. Journalisation & Audit

Toute modification sensible effectuée dans le tableau de bord administratif (changement de statut d'un candidat, dépublication d'une formation, modification des paramètres de contact) génère une trace dans les logs applicatifs avec l'identifiant du gestionnaire et l'horodatage UTC.
