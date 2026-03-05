# 🦷 Site Web Dr Serge Chaussé - Version 2.0

Site web moderne et professionnel pour **Dr Serge Chaussé**, dentiste travailleur autonome et formateur international en implantologie.

## ✨ Caractéristiques

- **Design moderne** bleu professionnel avec accents dorés
- **Responsive** (mobile, tablette, desktop)
- **6 vidéos YouTube intégrées** (professionnelles + personnelles)
- **Formulaire de contact fonctionnel** (via Formspree)
- **Prêt pour Vercel** (déploiement automatique)

## 📄 Sections du site

1. **Accueil** - Vidéo de présentation, statistiques clés
2. **À propos** - Parcours, philosophie, entrevue vidéo
3. **Certifications** - Formation académique, 2000h+ éducation continue
4. **Services cliniques** - Implants, CEREC, orthodontie, laser, etc.
5. **Formation/Tutorat** - Cours hands-on, Trinon, République Dominicaine
6. **Emplacements** - 2 bureaux (Montréal + St-Jean-sur-Richelieu)
7. **Ma vie, mes passions** - Famille, plongée, aventures
8. **Témoignages** - Lien RateMDs, cas avant/après
9. **Contact** - Formulaire + coordonnées

## 🎬 Vidéos intégrées

| Vidéo | Section |
|-------|---------|
| Vidéo publicitaire | Hero (Accueil) |
| Entrevue implantologie | À propos |
| Cours Rép. Dominicaine | Formation |
| Formation implant | Formation |
| Plongée famille #1 | Ma vie |
| Plongée famille #2 | Ma vie |

## 🚀 Déploiement

### 1. Configuration Formspree

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire
3. Copiez votre Form ID
4. Remplacez `YOUR_FORM_ID` dans `app/page.js`

### 2. Déploiement sur Vercel

```bash
# Installer les dépendances
npm install

# Tester en local
npm run dev

# Le site sera sur http://localhost:3000
```

Puis :
1. Créez un repo GitHub
2. Poussez le code
3. Importez dans Vercel
4. Déployé automatiquement !

## 📁 Structure

```
dr-chausse-website-v2/
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.js        # Layout + métadonnées SEO
│   └── page.js          # Page principale (tous les composants)
├── public/
│   └── images/          # Vos photos à ajouter
├── GUIDE-GIT.md         # Instructions Git détaillées
├── GUIDE-FORMSPREE.md   # Configuration formulaire
└── README.md            # Ce fichier
```

## 📸 Photos à ajouter

Placez vos photos dans `/public/images/` :
- Photo professionnelle de vous
- Photos de la famille
- Photos avant/après (cas cliniques)
- Logo si disponible

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.js` pour changer les couleurs :
```javascript
colors: {
  'primary': {
    600: '#2563eb', // Bleu principal
    // ...
  },
  'accent': {
    500: '#eab308', // Doré
  }
}
```

### Textes
Tous les textes sont dans `app/page.js` - modifiez directement.

---

**Dr Serge Chaussé** © 2025
