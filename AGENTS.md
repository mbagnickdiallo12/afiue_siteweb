<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Règle de Design UI (Dashboard Admin & Composants) — Zéro Fond Transparent

- **Interdiction des fonds semi-transparents ou pastel** : Sur toute la partie Dashboard Admin (`/admin/**`) et les composants associés, ne jamais utiliser de fonds transparents, semi-transparents (`bg-white/5`, `bg-white/10`, `bg-*/10`, `bg-*/20`, `backdrop-blur`) ou de fonds pastel teintés (`bg-emerald-50`, `bg-amber-50`, `bg-blue-50`, `bg-red-50`, `bg-*-100`) avec contour.
- **Styles autorisés uniquement** :
  1. **Texte en couleur + icône** (sans fond ni bordure de pilule).
  2. **Fond couleur à 100% opaque** avec texte contrasté blanc (`bg-emerald-600 text-white`, `bg-amber-600 text-white`, `bg-blue-600 text-white`, `bg-red-600 text-white`, `bg-afi-navy text-white`, `bg-afi-red text-white`, `bg-slate-800 text-white`).
