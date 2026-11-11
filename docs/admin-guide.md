# Guide d'Administration de la Plateforme — AFI-L'UE

Bienvenue dans le guide d'utilisation du tableau de bord administratif de **AFI-L'Université de l'Entreprise**.
Accès au tableau de bord : `/admin`

---

## 1. Vue d'Ensemble & Indicateurs Clés (`/admin`)

Le tableau de bord centralise en temps réel :
- **Formations Publiées** : Nombre de filières actives et visibles sur le catalogue en ligne.
- **Dossiers de Candidature** : Volume global et répartition par statut (`soumis`, `a_examiner`, `accepte`).
- **Articles & Actualités** : Articles publiés et communiqués institutionnels.
- **Taux de traitement** : Proportion de dossiers de candidature ayant reçu un premier avis de la commission d'admission.

---

## 2. Gestion de l'Offre de Formation (`/admin/formations`)

### 2.1. Créer ou Modifier une Formation
Chaque formation comporte les données suivantes administrables sans modifier une ligne de code :
1. **Intitulé officiel du diplôme** (ex: *Master Audit et Contrôle de Gestion*).
2. **Cycle & Niveau LMD** : Licence (Bac+3), Master (Bac+5), Executive Education.
3. **Pôle scientifique de rattachement** :
   - Sciences & Technologies
   - Sciences Économiques & Gestion
   - Sciences Juridiques, Politiques & Administration
   - Sciences de l'Homme & de la Société
4. **Modalités d'enseignement** : Cours du jour, Cours du soir (Executive), Formation en ligne.
5. **Reconnaissances officielles** : Cocher *Diplôme reconnu CAMES* ou *Habilité ANAQ-Sup*.
6. **Frais de scolarité** : Frais d'inscription et mensualités/frais annuels en FCFA.
7. **Programme semestriel & Débouchés** : Liste des métiers cibles et compétences acquises.
8. **Statut** : Actif (visible au public) ou Brouillon.

---

## 3. Traitement des Candidatures (`/admin/candidatures`)

Le service des admissions dispose d'un outil complet de traitement :
1. **Filtrage des dossiers** : Recherche par nom de candidat, référence (`AFI-2026-XXXXX`), statut ou formation ciblée.
2. **Instruction du dossier** : Clic sur *Examiner* pour consulter l'ensemble des informations académiques déclarées.
3. **Mise à jour du statut** :
   - `soumis` : Dossier fraîchement reçu.
   - `a_examiner` : Dossier assigné à un conseiller d'admission.
   - `dossier_incomplet` : Notification de pièces manquantes au candidat.
   - `accepte` : Admissibilité validée pour la rentrée.
   - `refuse` : Rejet motivé de la candidature.
4. **Export CSV** : Bouton *Exporter la liste (CSV)* pour extraire la cohorte d'étudiants vers le logiciel de scolarité universitaire.

---

## 4. Slider de la Page d'Accueil (`/admin/slides`)

Permet de mettre en avant les temps forts de l'université sans intervention technique :
- **Titre & Sous-titre percutants** (ex: *Rentrée Académique 2026-2027*).
- **Badge supérieur** (ex: *Inscriptions en cours*).
- **Double appel à l'action (CTA)** :
  - Bouton 1 : Lien vers le formulaire de candidature (`/candidater`) ou catalogue (`/formations`).
  - Bouton 2 : Lien vers la présentation de l'université (`/universite`).
- **Ordre d'affichage** : Numérotation prioritaire de 1 à N.
- **Activation** : Possibilité de masquer temporairement une diapositive sans la supprimer.

---

## 5. Actualités & Vie du Campus (`/admin/articles`)

- Rédaction d'articles avec titre, résumé, image de couverture, tags et catégorie (Académique, Recherche, Vie Étudiante, Événement).
- Gestion des brouillons et programmation de publication.
- Optimisation des balises de référencement naturel (méta-titre et méta-description).

---

## 6. Paramètres Généraux (`/admin/settings`)

Centralise les coordonnées de l'université affichées sur l'ensemble du site :
- Téléphones d'accueil et des admissions.
- Emails institutionnels (`contact@afi-ue.sn`, `admission@afi-ue.sn`).
- Adresses des campus (Point E Dakar & Antenne de Thiès).
- Liens des réseaux sociaux officiels (LinkedIn, Facebook, Instagram, X).
