---
trigger: always_on
description: Interdiction des fonds semi-transparents ou pastel sur les badges, étiquettes et composants UI (notamment dans le Dashboard Admin). Utiliser uniquement du texte coloré avec icône ou un fond de couleur 100% opaque.
---

# Règle UI : Zéro Fond Transparent ou Pastel sur les Badges & Indicateurs

Dans tout le projet (et particulièrement sur l'ensemble du **Dashboard Admin** `/admin/**`) :

1. **Interdiction des fonds semi-transparents ou teintés clairs (pastel)** :
   - Ne **jamais** utiliser de classes de fond semi-transparentes ou pastel telles que `bg-*-50`, `bg-*-100`, `bg-white/5`, `bg-white/10`, `bg-afi-red/10`, `bg-emerald-50`, `bg-amber-50`, `bg-blue-50`, `bg-red-50`, `bg-emerald-600/90`, etc. pour les badges, pilules de statut, étiquettes, cartes ou boutons.
   - Ne **jamais** combiner un fond clair teinté avec une bordure colorée fine (`border-emerald-200`, `border-amber-200`, `border-blue-200`, `border-red-200`).

2. **Deux seuls styles autorisés pour les statuts, badges, boutons et indicateurs** :
   - **Option A — Texte de couleur + Icône (sans fond ni bordure)** :
     - Exemple : `inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600` avec une icône ou puce colorée (`text-emerald-600` / `bg-emerald-600`).
   - **Option B — Fond de couleur 100% opaque + Texte blanc** :
     - Exemple : `bg-emerald-600 text-white`, `bg-amber-600 text-white`, `bg-blue-600 text-white`, `bg-red-600 text-white`, `bg-afi-navy text-white`, `bg-afi-red text-white`, `bg-slate-800 text-white`.

