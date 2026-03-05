# 🚀 Guide Git Complet - Dr Serge Chaussé Website

## Table des matières
1. [Installation des outils](#1-installation-des-outils)
2. [Configuration initiale](#2-configuration-initiale)
3. [Créer le dépôt GitHub](#3-créer-le-dépôt-github)
4. [Cloner et travailler en local](#4-cloner-et-travailler-en-local)
5. [Workflow quotidien](#5-workflow-quotidien)
6. [Connecter à Vercel](#6-connecter-à-vercel)
7. [Commandes Git essentielles](#7-commandes-git-essentielles)
8. [Résolution de problèmes](#8-résolution-de-problèmes)

---

## 1. Installation des outils

### Sur Windows :

**A) Installer Git :**
1. Téléchargez Git : https://git-scm.com/download/windows
2. Lancez l'installateur
3. Acceptez les options par défaut (cliquez "Next" jusqu'à la fin)
4. Redémarrez votre terminal/ordinateur

**B) Installer Node.js :**
1. Téléchargez Node.js LTS : https://nodejs.org/
2. Lancez l'installateur
3. Acceptez les options par défaut

**C) Installer VS Code (recommandé) :**
1. Téléchargez : https://code.visualstudio.com/
2. Installez avec les options par défaut
3. Extensions recommandées :
   - "GitLens" (pour visualiser l'historique Git)
   - "ES7+ React/Redux/React-Native snippets"
   - "Tailwind CSS IntelliSense"

### Sur Mac :

```bash
# Installer Homebrew (si pas déjà fait)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Git
brew install git

# Installer Node.js
brew install node

# Installer VS Code
brew install --cask visual-studio-code
```

### Vérifier les installations :

Ouvrez un terminal (ou PowerShell sur Windows) et tapez :

```bash
git --version
# Devrait afficher : git version 2.x.x

node --version
# Devrait afficher : v20.x.x ou v18.x.x

npm --version
# Devrait afficher : 10.x.x ou 9.x.x
```

---

## 2. Configuration initiale

Configurez votre identité Git (une seule fois) :

```bash
# Remplacez par vos informations
git config --global user.name "Serge Chaussé"
git config --global user.email "votre-email@exemple.com"

# Configuration recommandée
git config --global init.defaultBranch main
git config --global core.autocrlf true  # Windows seulement
git config --global pull.rebase false
```

### Configurer l'authentification GitHub

**Option A : HTTPS avec Token (Plus simple)**

1. Allez sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Cliquez "Generate new token (classic)"
3. Nom : "Mon PC"
4. Expiration : "No expiration" (ou 1 an)
5. Cochez : `repo` (accès complet aux dépôts)
6. Cliquez "Generate token"
7. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)

Quand Git vous demandera un mot de passe, utilisez ce token.

**Option B : Clé SSH (Plus sécurisé)**

```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "votre-email@exemple.com"
# Appuyez Entrée pour accepter l'emplacement par défaut
# Entrez une phrase de passe (optionnel)

# Afficher la clé publique
cat ~/.ssh/id_ed25519.pub
```

Copiez le résultat, puis :
1. GitHub → Settings → SSH and GPG keys → New SSH key
2. Collez votre clé
3. Cliquez "Add SSH key"

---

## 3. Créer le dépôt GitHub

### Étape par étape :

1. Connectez-vous à https://github.com

2. Cliquez le bouton vert **"New"** (ou allez sur https://github.com/new)

3. Remplissez :
   - **Repository name** : `dr-chausse-website`
   - **Description** : `Site web professionnel du Dr Serge Chaussé`
   - **Visibility** : Private (recommandé) ou Public
   - ❌ Ne cochez PAS "Add a README file"
   - ❌ Ne cochez PAS "Add .gitignore"

4. Cliquez **"Create repository"**

5. Gardez cette page ouverte, vous aurez besoin de l'URL

---

## 4. Cloner et travailler en local

### Première fois - Initialiser le projet :

```bash
# 1. Créez un dossier pour vos projets web (une seule fois)
mkdir ~/Sites
cd ~/Sites

# 2. Décompressez le fichier dr-chausse-website.zip dans ce dossier
# Vous devriez avoir : ~/Sites/dr-chausse-website/

# 3. Entrez dans le dossier du projet
cd dr-chausse-website

# 4. Initialisez Git
git init

# 5. Ajoutez tous les fichiers
git add .

# 6. Créez le premier commit
git commit -m "🎉 Initial commit - Site Dr Serge Chaussé"

# 7. Connectez au dépôt GitHub (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/dr-chausse-website.git

# 8. Envoyez le code vers GitHub
git branch -M main
git push -u origin main
```

### Installer les dépendances et tester :

```bash
# Installer les packages Node.js
npm install

# Lancer le site en local
npm run dev
```

Ouvrez votre navigateur à : **http://localhost:3000**

🎉 Votre site tourne maintenant en local !

---

## 5. Workflow quotidien

### Avant de commencer à travailler :

```bash
# Toujours récupérer les dernières modifications
git pull origin main
```

### Cycle de travail typique :

```bash
# 1. Faites vos modifications dans VS Code

# 2. Vérifiez ce qui a changé
git status

# 3. Visualisez les différences (optionnel)
git diff

# 4. Ajoutez les fichiers modifiés
git add .

# 5. Créez un commit avec un message descriptif
git commit -m "✏️ Mise à jour des heures d'ouverture"

# 6. Envoyez vers GitHub (et Vercel déploie automatiquement)
git push
```

### Messages de commit recommandés :

Utilisez des emojis pour catégoriser vos commits :

| Emoji | Type | Exemple |
|-------|------|---------|
| 🎉 | Initial | `🎉 Initial commit` |
| ✨ | Nouvelle fonctionnalité | `✨ Ajout section témoignages` |
| ✏️ | Modification texte | `✏️ Correction numéro téléphone` |
| 🎨 | Style/Design | `🎨 Nouvelle couleur boutons` |
| 🐛 | Correction bug | `🐛 Fix menu mobile` |
| 📸 | Images | `📸 Ajout photo Dr Chaussé` |
| 🔧 | Configuration | `🔧 Mise à jour package.json` |

---

## 6. Connecter à Vercel

### Configuration initiale :

1. Allez sur https://vercel.com
2. Cliquez **"Sign Up"** → **"Continue with GitHub"**
3. Autorisez Vercel à accéder à vos dépôts
4. Cliquez **"Add New..."** → **"Project"**
5. Sélectionnez **`dr-chausse-website`**
6. Vercel détecte automatiquement Next.js
7. Cliquez **"Deploy"**

### Résultat :

- URL temporaire : `https://dr-chausse-website-xxx.vercel.app`
- Chaque `git push` déclenche un nouveau déploiement
- Historique des déploiements visible dans Vercel

### Ajouter votre domaine personnalisé :

1. Dans Vercel, allez dans votre projet
2. Settings → Domains
3. Entrez : `www.dentiste.com`
4. Suivez les instructions pour configurer vos DNS

---

## 7. Commandes Git essentielles

### Commandes de base :

```bash
# Voir l'état des fichiers
git status

# Voir l'historique des commits
git log --oneline

# Voir les modifications non commitées
git diff

# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add nom-du-fichier.js

# Créer un commit
git commit -m "Votre message"

# Envoyer vers GitHub
git push

# Récupérer les modifications de GitHub
git pull
```

### Commandes utiles :

```bash
# Annuler les modifications d'un fichier (avant add)
git checkout -- nom-du-fichier.js

# Annuler le dernier commit (garde les modifications)
git reset --soft HEAD~1

# Voir les branches
git branch

# Créer une nouvelle branche
git checkout -b nouvelle-fonctionnalite

# Revenir à main
git checkout main

# Fusionner une branche
git merge nouvelle-fonctionnalite
```

### Travailler avec les branches (avancé) :

```bash
# Créer une branche pour une nouvelle fonctionnalité
git checkout -b ajout-temoignages

# Travailler, puis commit
git add .
git commit -m "✨ Ajout section témoignages"

# Pousser la branche
git push -u origin ajout-temoignages

# Revenir à main et fusionner
git checkout main
git merge ajout-temoignages
git push

# Supprimer la branche
git branch -d ajout-temoignages
```

---

## 8. Résolution de problèmes

### "Permission denied" lors du push :

```bash
# Vérifiez votre configuration
git remote -v

# Si nécessaire, reconfigurez l'URL
git remote set-url origin https://github.com/VOTRE_USERNAME/dr-chausse-website.git
```

### Conflit lors du pull :

```bash
# Git vous indiquera les fichiers en conflit
# Ouvrez-les dans VS Code
# Cherchez les marqueurs <<<<<<<, =======, >>>>>>>
# Choisissez la version à garder
# Puis :
git add .
git commit -m "🔀 Résolution conflit"
git push
```

### Annuler tout et recommencer :

```bash
# ⚠️ ATTENTION : Perd toutes les modifications non commitées
git reset --hard HEAD
git clean -fd
```

### Le site ne se met pas à jour sur Vercel :

1. Vérifiez que le push a fonctionné : `git log --oneline`
2. Allez sur Vercel → Deployments
3. Vérifiez s'il y a une erreur de build
4. Cliquez sur le déploiement pour voir les logs

---

## 📞 Aide supplémentaire

- **Documentation Git** : https://git-scm.com/doc
- **GitHub Guides** : https://guides.github.com
- **Vercel Docs** : https://vercel.com/docs

---

*Guide créé pour Dr Serge Chaussé - Janvier 2025*
