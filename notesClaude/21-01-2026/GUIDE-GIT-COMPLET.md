# 🚀 Guide Complet : Travailler en Local avec Git & GitHub

## Table des matières
1. [Installation](#1-installation)
2. [Configuration initiale](#2-configuration-initiale)
3. [Créer votre projet](#3-créer-votre-projet)
4. [Comprendre les branches](#4-comprendre-les-branches)
5. [Workflow quotidien](#5-workflow-quotidien)
6. [Conserver les anciennes versions](#6-conserver-les-anciennes-versions)
7. [Déployer sur Vercel](#7-déployer-sur-vercel)
8. [Commandes essentielles](#8-commandes-essentielles)
9. [Scénarios pratiques](#9-scénarios-pratiques)

---

## 1. Installation

### Windows
1. **Git** : https://git-scm.com/download/windows
2. **Node.js** : https://nodejs.org/ (version LTS)
3. **VS Code** : https://code.visualstudio.com/

### Mac
```bash
# Installer Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Git et Node
brew install git node

# Installer VS Code
brew install --cask visual-studio-code
```

### Vérifier les installations
```bash
git --version      # git version 2.x.x
node --version     # v20.x.x
npm --version      # 10.x.x
```

---

## 2. Configuration initiale

### Configurer votre identité (une seule fois)
```bash
git config --global user.name "Serge Chaussé"
git config --global user.email "votre@email.com"
git config --global init.defaultBranch main
```

### Créer un compte GitHub
1. Allez sur https://github.com
2. Créez un compte gratuit
3. Créez un "Personal Access Token" :
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token → Cochez "repo" → Generate
   - **COPIEZ LE TOKEN** (vous ne le reverrez plus!)

---

## 3. Créer votre projet

### Étape 1 : Créer le dossier local
```bash
# Créer un dossier pour vos projets
mkdir ~/Sites
cd ~/Sites

# Décompresser le ZIP du site (faites-le manuellement ou avec unzip)
# Vous devriez avoir : ~/Sites/dr-chausse-website-v2/

# Entrer dans le dossier
cd dr-chausse-website-v2
```

### Étape 2 : Initialiser Git
```bash
# Initialiser le dépôt Git local
git init

# Vérifier le statut
git status
```

### Étape 3 : Premier commit
```bash
# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "🎉 Version initiale du site Dr Chaussé"
```

### Étape 4 : Créer le dépôt GitHub
1. Allez sur https://github.com/new
2. Nom : `dr-chausse-website`
3. Private (recommandé)
4. **NE PAS** cocher "Add README" ou ".gitignore"
5. Cliquez "Create repository"

### Étape 5 : Connecter local → GitHub
```bash
# Ajouter le remote (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/dr-chausse-website.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

---

## 4. Comprendre les branches

### 🌳 Qu'est-ce qu'une branche ?

```
main (production)
  │
  ├── v1.0 ← Version en ligne
  │
  └── develop (développement)
        │
        ├── feature/galerie-photos ← Nouvelle fonctionnalité
        │
        └── feature/nouveau-design ← Autre fonctionnalité
```

### Pourquoi utiliser des branches ?

| Branche | Usage |
|---------|-------|
| `main` | Version **en production** (en ligne sur Vercel) |
| `develop` | Version de **développement** (tests) |
| `feature/xxx` | Nouvelles **fonctionnalités** en cours |
| `hotfix/xxx` | Corrections **urgentes** |

### Créer et utiliser des branches

```bash
# Voir toutes les branches
git branch

# Créer une nouvelle branche
git branch develop

# Basculer vers une branche
git checkout develop

# OU créer + basculer en une commande
git checkout -b feature/galerie-photos

# Revenir à main
git checkout main
```

---

## 5. Workflow quotidien

### 🔄 Le cycle de travail recommandé

```
1. Créer une branche pour votre travail
         ↓
2. Faire vos modifications
         ↓
3. Tester en local (npm run dev)
         ↓
4. Commit vos changements
         ↓
5. Fusionner dans develop (pour tester)
         ↓
6. Fusionner dans main (pour mettre en ligne)
         ↓
7. Push vers GitHub → Vercel déploie automatiquement
```

### Exemple concret : Ajouter une galerie photos

```bash
# 1. S'assurer d'être sur main et à jour
git checkout main
git pull origin main

# 2. Créer une branche pour la fonctionnalité
git checkout -b feature/galerie-photos

# 3. Faire vos modifications dans VS Code...
#    (ajouter des fichiers, modifier le code, etc.)

# 4. Voir ce qui a changé
git status
git diff

# 5. Ajouter et commiter
git add .
git commit -m "✨ Ajout de la galerie photos famille"

# 6. Pousser la branche vers GitHub
git push -u origin feature/galerie-photos

# 7. Quand c'est prêt, fusionner dans main
git checkout main
git merge feature/galerie-photos
git push origin main

# 8. Supprimer la branche (optionnel)
git branch -d feature/galerie-photos
```

---

## 6. Conserver les anciennes versions

### 📌 Méthode 1 : Les Tags (Recommandé)

Les tags marquent des versions importantes.

```bash
# Créer un tag pour la version actuelle
git tag -a v1.0 -m "Version 1.0 - Site initial"

# Créer un tag pour une mise à jour
git tag -a v1.1 -m "Version 1.1 - Ajout galerie photos"

# Voir tous les tags
git tag

# Pousser les tags vers GitHub
git push origin --tags

# Revenir à une ancienne version (pour voir)
git checkout v1.0

# Revenir à la version actuelle
git checkout main
```

### 📌 Méthode 2 : Voir l'historique

```bash
# Voir l'historique des commits
git log --oneline

# Exemple de résultat :
# a1b2c3d ✨ Ajout galerie photos
# e4f5g6h 🎨 Changement couleurs
# i7j8k9l 🎉 Version initiale

# Voir un ancien commit
git checkout e4f5g6h

# Revenir au présent
git checkout main
```

### 📌 Méthode 3 : Créer une branche de sauvegarde

```bash
# Avant de faire des gros changements, sauvegarder
git checkout -b backup/avant-refonte-2025-01

# Revenir à main pour travailler
git checkout main

# La sauvegarde existe toujours si besoin
git branch
# * main
#   backup/avant-refonte-2025-01
```

---

## 7. Déployer sur Vercel

### Configuration initiale

1. Allez sur https://vercel.com
2. "Sign Up" → "Continue with GitHub"
3. Autorisez Vercel
4. "Add New Project" → Sélectionnez `dr-chausse-website`
5. Vercel détecte Next.js automatiquement
6. Cliquez "Deploy"

### Déploiement automatique

```
Vous faites: git push origin main
     ↓
GitHub reçoit le code
     ↓
Vercel détecte le changement
     ↓
Vercel rebuild le site
     ↓
Site mis à jour en ~1 minute! 🎉
```

### Prévisualisation des branches

Vercel crée automatiquement des URLs de preview pour chaque branche :
- `main` → https://votre-site.vercel.app (production)
- `feature/galerie` → https://votre-site-git-feature-galerie.vercel.app (preview)

---

## 8. Commandes essentielles

### Commandes de base

| Commande | Description |
|----------|-------------|
| `git status` | Voir l'état actuel |
| `git add .` | Ajouter tous les fichiers modifiés |
| `git commit -m "message"` | Créer un commit |
| `git push` | Envoyer vers GitHub |
| `git pull` | Récupérer depuis GitHub |

### Commandes de branches

| Commande | Description |
|----------|-------------|
| `git branch` | Lister les branches |
| `git branch nom` | Créer une branche |
| `git checkout nom` | Basculer vers une branche |
| `git checkout -b nom` | Créer + basculer |
| `git merge nom` | Fusionner une branche |
| `git branch -d nom` | Supprimer une branche |

### Commandes de versioning

| Commande | Description |
|----------|-------------|
| `git log --oneline` | Historique compact |
| `git tag -a v1.0 -m "msg"` | Créer un tag |
| `git tag` | Lister les tags |
| `git checkout v1.0` | Aller à un tag |
| `git checkout abc123` | Aller à un commit |

### Commandes de récupération

| Commande | Description |
|----------|-------------|
| `git checkout -- fichier` | Annuler les modifs d'un fichier |
| `git reset --soft HEAD~1` | Annuler le dernier commit (garde les fichiers) |
| `git reset --hard HEAD~1` | Annuler le dernier commit (supprime tout) |
| `git stash` | Mettre de côté temporairement |
| `git stash pop` | Récupérer ce qui était de côté |

---

## 9. Scénarios pratiques

### 🎯 Scénario 1 : Modifier le site en sécurité

```bash
# 1. Créer une branche de travail
git checkout -b modification/nouveau-texte

# 2. Faire les modifications dans VS Code

# 3. Tester en local
npm run dev
# Ouvrir http://localhost:3000

# 4. Si satisfait, commit
git add .
git commit -m "✏️ Mise à jour texte page d'accueil"

# 5. Fusionner dans main
git checkout main
git merge modification/nouveau-texte

# 6. Mettre en ligne
git push origin main
```

### 🎯 Scénario 2 : Revenir en arrière après une erreur

```bash
# Voir l'historique
git log --oneline

# Résultat :
# abc123 ❌ Modification qui a cassé le site
# def456 ✅ Dernière version qui marchait

# Option A : Revenir au commit précédent (supprime le mauvais commit)
git reset --hard def456
git push --force origin main

# Option B : Créer un nouveau commit qui annule (plus sûr)
git revert abc123
git push origin main
```

### 🎯 Scénario 3 : Travailler sur 2 fonctionnalités en parallèle

```bash
# Fonctionnalité 1 : Galerie photos
git checkout -b feature/galerie
# ... travailler ...
git add .
git commit -m "✨ Galerie photos en cours"

# Mettre de côté et passer à autre chose
git checkout main

# Fonctionnalité 2 : Nouveau formulaire
git checkout -b feature/formulaire
# ... travailler ...
git add .
git commit -m "✨ Nouveau formulaire contact"

# Revenir à la galerie
git checkout feature/galerie
# ... continuer le travail ...
```

### 🎯 Scénario 4 : Quelqu'un d'autre a modifié le site

```bash
# Récupérer les changements de GitHub
git pull origin main

# S'il y a des conflits, Git vous le dira
# Ouvrez les fichiers en conflit dans VS Code
# Cherchez les marqueurs <<<<<<< ======= >>>>>>>
# Choisissez quelle version garder
# Puis :
git add .
git commit -m "🔀 Résolution des conflits"
git push origin main
```

---

## 📋 Checklist avant de mettre en ligne

- [ ] Tester en local (`npm run dev`)
- [ ] Vérifier sur mobile (responsive)
- [ ] Commit avec un message clair
- [ ] Créer un tag si c'est une version importante
- [ ] Push vers GitHub
- [ ] Vérifier le déploiement sur Vercel

---

## 🆘 En cas de problème

### "J'ai tout cassé, au secours !"
```bash
# Revenir à la dernière version sur GitHub
git fetch origin
git reset --hard origin/main
```

### "Je veux annuler ce que je viens de faire"
```bash
# Si pas encore commit
git checkout -- .

# Si déjà commit mais pas push
git reset --soft HEAD~1
```

### "Git me demande un mot de passe"
Utilisez votre Personal Access Token (pas votre mot de passe GitHub).

---

## 🎓 Résumé du workflow idéal

```
┌─────────────────────────────────────────────────────────────┐
│                    VOTRE WORKFLOW GIT                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. git checkout -b feature/ma-modification                │
│                          ↓                                  │
│   2. Modifier les fichiers dans VS Code                     │
│                          ↓                                  │
│   3. npm run dev (tester en local)                          │
│                          ↓                                  │
│   4. git add . && git commit -m "Mon message"               │
│                          ↓                                  │
│   5. git checkout main && git merge feature/ma-modification │
│                          ↓                                  │
│   6. git tag -a v1.x -m "Description" (si version majeure)  │
│                          ↓                                  │
│   7. git push origin main --tags                            │
│                          ↓                                  │
│   8. Vercel déploie automatiquement! 🚀                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

*Guide créé pour Dr Serge Chaussé - Janvier 2025*
