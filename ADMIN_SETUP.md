# dentiste.com — Admin + Supabase

## 1) Créer le projet Supabase
- Crée un projet Supabase (Postgres).
- Va dans **Project Settings → API** et copie:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2) Activer Auth
- Supabase → **Authentication**
- Ajoute un utilisateur (Email + Password) ou "Invite user".
- (Optionnel) Désactive l'inscription publique si tu veux.

## 3) Créer la table + policies
- Supabase → **SQL Editor**
- Exécute `supabase.sql` (à la racine du projet).

## 4) Configurer le projet local
```bash
npm install
cp .env.example .env.local
# colle tes valeurs Supabase dans .env.local
npm run dev
```

- Admin: `http://localhost:3000/admin`
- Login: `http://localhost:3000/admin/login`

## 5) Production (Vercel)
- Ajoute les mêmes variables dans Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Pages
Les pages publiques sont disponibles à:
- `/{slug}`
Exemple: si tu crées une page `traitements`, elle sera visible sur `/traitements`.
