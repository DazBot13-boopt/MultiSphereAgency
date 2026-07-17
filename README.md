# MultiSphere Agency — Site Web Professionnel

Site web moderne, léger et professionnel pour **MultiSphere Agency**, agence pluridisciplinaire basée à Abomey-Calavi, Bénin.

> « L'union des expertises, la force de vos projets. »

## Aperçu

Site single-page responsive avec dark mode, animations fluides, formulaire de devis fonctionnel et 14 sections riches :

1. **Header** sticky avec navigation responsive + scrollspy
2. **Hero** animé avec orbe 360° et statistiques
3. **Partenaires** (marquee défilant)
4. **À propos** avec photo d'équipe
5. **Services** — 5 expertises avec modales détaillées
6. **Pourquoi nous choisir** — 6 atouts
7. **Processus** en 4 étapes
8. **Réalisations** avec filtres par catégorie
9. **Témoignages** carrousel auto
10. **Équipe** — 4 membres
11. **FAQ** accordéon
12. **CTA** devis gratuit
13. **Contact** formulaire (API + base de données)
14. **Footer** complet avec newsletter

## Stack technique

- **Framework** : Next.js 16 (App Router) + TypeScript 5
- **Styling** : Tailwind CSS 4 + shadcn/ui (New York)
- **Animations** : Framer Motion
- **Base de données** : Prisma ORM (SQLite)
- **Thème** : next-themes (light/dark)
- **Forms** : React Hook Form + Zod
- **Notifications** : Sonner

## Installation

```bash
# 1. Installer les dépendances
bun install

# 2. Configurer la base de données
cp .env.example .env   # si .env manquant, créer avec DATABASE_URL="file:./db/custom.db"
bun run db:push

# 3. Démarrer le serveur de développement
bun run dev
```

Le site est accessible sur `http://localhost:3000`.

## Structure du projet

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # POST/GET — demandes de devis
│   │   └── newsletter/route.ts   # POST — inscriptions newsletter
│   ├── globals.css               # Thème émeraude/ambre + utilitaires
│   ├── layout.tsx                # Layout racine + métadonnées SEO
│   └── page.tsx                  # Page principale (single-page)
├── components/
│   ├── sections/                 # 14 sections du site
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/                       # Composants shadcn/ui
└── lib/
    ├── site-config.ts            # Contenu centralisé (services, témoignages, etc.)
    ├── db.ts                     # Client Prisma
    └── utils.ts

prisma/
└── schema.prisma                 # Modèles ContactRequest + Newsletter

public/images/                    # 8 images générées par IA
```

## Personnalisation

Tout le contenu (services, témoignages, équipe, FAQ, coordonnées) est centralisé dans **`src/lib/site-config.ts`**. Modifiez ce fichier pour adapter le site sans toucher aux composants.

## Coordonnées (à ajuster)

- 📞 +229 01 63 91 88 96
- ✉️ multisphere.agency@gmail.com
- 📍 Abomey-Calavi, Bénin

## Build production

```bash
bun run build
bun run start
```

---

© MultiSphere Agency. Tous droits réservés.
