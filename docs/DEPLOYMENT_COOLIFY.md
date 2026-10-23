# Procédure de Déploiement Coolify — Université AFI-L'UE

## 1. Contexte d'hébergement
- **Fournisseur VPS** : Contabo (Linux x86_64, Ubuntu 22.04 / Debian 12 recommandé).
- **Gestionnaire PaaS** : Coolify v4 (autohébergé).
- **Reverse Proxy & SSL** : Traefik / Caddy managé par Coolify avec génération automatique de certificats Let's Encrypt.
- **Base de données** : Supabase autohébergé (PostgreSQL 15+, Auth/GoTrue, Storage MinIO/S3).

---

## 2. Configuration de l'Application dans Coolify

### Étape A : Création du Service Next.js
1. Dans le tableau de bord Coolify, accéder au projet **AFI-L'UE** et choisir l'environnement (**Production** ou **Staging**).
2. Cliquer sur **+ New Resource** > **Public / Private Git Repository**.
3. Renseigner l'URL du dépôt Git (ex: GitHub / GitLab) et sélectionner la branche `main` (ou `staging`).
4. Type de build : **Dockerfile** (le `Dockerfile` multi-stage à la racine du projet est automatiquement détecté).

### Étape B : Configuration des Ports et Domaines
- **FQDN (Domaine)** :
  - Préproduction : `https://preprod.afi-ue.sn`
  - Production : `https://afi-ue.sn` (avec redirection de `https://www.afi-ue.sn`)
- **Port interne du conteneur** : `3000`
- **Healthcheck URL** : `/api/health`
  - Intervalle : `30s`
  - Timeout : `5s`
  - Retries : `3`

### Étape C : Variables d'Environnement
Définir les variables d'environnement dans l'interface Coolify (sans guillemets) :

| Variable | Type | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public / Build | URL complète du site (ex: `https://afi-ue.sn`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Build | URL du Kong Gateway Supabase (ex: `https://supabase.afi-ue.sn`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Build | Clé anonyme publique pour requêtes RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret / Runtime | Clé de service Supabase (**strictement secrète**, réservée au serveur) |
| `DATABASE_URL` | Secret / Runtime | Chaîne de connexion PostgreSQL directe (migrations/seed) |
| `NODE_ENV` | Runtime | `production` |

---

## 3. Stratégie de Déploiement Zéro-Downtime & Rollback

1. **Déploiement Continu (CI/CD)** :
   - Coolify écoute le webhook Git push sur la branche cible.
   - Le build Docker multi-stage s'exécute isolément (`builder` -> `runner`).
2. **Contrôle de Santé (Healthcheck Probe)** :
   - Le nouveau conteneur démarre sur un port dynamique.
   - Coolify interroge `http://nouveau-conteneur:3000/api/health`.
   - Si la réponse HTTP est `200 OK`, Coolify met à jour les règles Traefik pour basculer le trafic.
   - L'ancien conteneur est arrêté après un délai de grâce de 10 secondes.
3. **Rollback Immédiat** :
   - En cas d'échec du build ou du healthcheck, le déploiement est interrompu et l'ancien conteneur reste en ligne sans interruption.
   - Pour revenir à une version antérieure : Dans Coolify > **Deployments**, cliquer sur le déploiement précédent > **Rollback**.

---

## 4. Sauvegardes et Sécurité des Données
- **Sauvegarde PostgreSQL** : Activer les sauvegardes automatisées quotidiennes dans Coolify (Database > Automated Backups) vers un stockage distant S3 / SFTP.
- **Sauvegarde Volumes Storage** : Les documents de candidatures et médias Supabase doivent faire l'objet d'un snapshot régulier des volumes Docker (`/var/lib/docker/volumes/...`).
