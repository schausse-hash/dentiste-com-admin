# 📧 Guide Configuration Formspree

## Qu'est-ce que Formspree ?

Formspree est un service gratuit qui permet de recevoir les soumissions de formulaire directement par email, sans avoir besoin d'un serveur backend ou d'une base de données.

**Avantages :**
- ✅ Gratuit jusqu'à 50 soumissions/mois
- ✅ Aucune configuration serveur
- ✅ Protection anti-spam intégrée
- ✅ Notifications par email instantanées
- ✅ Interface pour voir l'historique des messages

---

## Étape 1 : Créer un compte Formspree

1. Allez sur **https://formspree.io**
2. Cliquez **"Get Started"** ou **"Sign Up"**
3. Créez un compte avec votre email (ou connectez-vous avec Google/GitHub)
4. Confirmez votre adresse email

---

## Étape 2 : Créer un nouveau formulaire

1. Une fois connecté, cliquez **"+ New Form"**
2. Donnez un nom : `Contact Dr Chaussé`
3. Entrez l'email où vous voulez recevoir les messages : `info@drchausse.com`
4. Cliquez **"Create Form"**

---

## Étape 3 : Récupérer votre Form ID

Après création, vous verrez une page avec votre endpoint :

```
https://formspree.io/f/xyzabcde
                       ^^^^^^^^
                       Votre Form ID
```

**Copiez ce Form ID** (la partie après `/f/`)

---

## Étape 4 : Configurer votre site

### Option A : Si vous utilisez le projet Next.js

Ouvrez le fichier `app/page.js` et trouvez cette ligne :

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

Remplacez `YOUR_FORM_ID` par votre vrai Form ID :

```javascript
const response = await fetch('https://formspree.io/f/xyzabcde', {
```

### Option B : Si vous utilisez la version HTML simple

Ouvrez `preview-dr-chausse.html` et modifiez le formulaire :

```html
<form action="https://formspree.io/f/xyzabcde" method="POST">
```

---

## Étape 5 : Tester le formulaire

1. Déployez votre site (ou testez en local avec `npm run dev`)
2. Remplissez le formulaire de contact
3. Cliquez "Envoyer"
4. Vérifiez votre boîte email

**Note :** Le premier envoi depuis un nouveau domaine nécessite une confirmation. Formspree vous enverra un email pour valider votre site.

---

## Configuration avancée (optionnel)

### Personnaliser l'email de confirmation

Dans Formspree Dashboard :
1. Allez dans votre formulaire
2. Settings → Autoresponse
3. Activez et personnalisez le message automatique envoyé au patient

**Exemple de message :**

```
Objet : Confirmation de votre demande - Dr Serge Chaussé

Bonjour {{Prénom}},

Nous avons bien reçu votre demande de rendez-vous.

Notre équipe vous contactera dans les 24 à 48 heures ouvrables.

Pour toute urgence, n'hésitez pas à nous appeler au 514.521.4141.

Cordialement,
L'équipe du Dr Serge Chaussé
```

### Protection anti-spam

Formspree inclut automatiquement :
- reCAPTCHA invisible
- Honeypot (champ caché anti-bot)
- Limitation de débit

### Ajouter un honeypot personnalisé (optionnel)

Dans votre formulaire, ajoutez ce champ caché :

```html
<input type="text" name="_gotcha" style="display:none" />
```

Les bots remplissent ce champ, les humains non. Formspree rejettera les soumissions avec ce champ rempli.

---

## Plan gratuit vs payant

| Fonctionnalité | Gratuit | Pro ($10/mois) |
|----------------|---------|----------------|
| Soumissions/mois | 50 | 1,000 |
| Formulaires | 1 | Illimité |
| Pièces jointes | ❌ | ✅ |
| Domaine personnalisé | ❌ | ✅ |
| Autoréponse | Basique | Personnalisée |
| Support | Communauté | Prioritaire |

**Pour un cabinet dentaire, le plan gratuit est généralement suffisant** pour commencer. Vous pourrez passer au plan Pro si vous dépassez 50 messages par mois.

---

## Alternatives à Formspree

Si Formspree ne vous convient pas, voici d'autres options :

| Service | Gratuit | Avantages |
|---------|---------|-----------|
| **Netlify Forms** | 100/mois | Intégré si hébergé sur Netlify |
| **Getform** | 50/mois | Interface moderne |
| **FormSubmit** | Illimité | Très simple, pas de compte requis |
| **Basin** | 100/mois | Intégrations Zapier |

---

## Dépannage

### "Le formulaire ne s'envoie pas"

1. Vérifiez que le Form ID est correct
2. Ouvrez la console du navigateur (F12 → Console) pour voir les erreurs
3. Vérifiez que vous n'êtes pas bloqué par un ad-blocker

### "Je ne reçois pas les emails"

1. Vérifiez votre dossier spam
2. Connectez-vous à Formspree Dashboard pour voir les soumissions
3. Vérifiez que l'email configuré est correct

### "Message d'erreur CORS"

Cela arrive si vous testez depuis `file://`. Utilisez plutôt :
```bash
npm run dev
# Puis ouvrez http://localhost:3000
```

---

## Récapitulatif

1. ✅ Créer compte Formspree
2. ✅ Créer un formulaire
3. ✅ Copier le Form ID
4. ✅ Remplacer `YOUR_FORM_ID` dans le code
5. ✅ Tester l'envoi
6. ✅ Confirmer le domaine (premier envoi)

**Temps estimé : 10 minutes**

---

*Guide créé pour Dr Serge Chaussé - Janvier 2025*
