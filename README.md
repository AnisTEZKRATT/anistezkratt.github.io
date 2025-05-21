# HackStore – Mini Site E-Commerce Éthique

Bienvenue sur **HackStore**, un projet front-end de boutique en ligne dédiée aux gadgets de cybersécurité. Ce projet a été réalisé dans le cadre du module de Développement d'Applications Web à l'Université Mouloud Mammeri de Tizi-Ouzou.

## Objectif

Créer un site e-commerce responsive, moderne, et optimisé SEO (référencement), en utilisant uniquement HTML, CSS et JavaScript, sans back-end.

## Fonctionnalités

- Design responsive (mobile, tablette, desktop)
- Thème sombre avec des couleurs inspirées de la cybersécurité
- Chargement dynamique des produits (via JSON)
- Filtrage et tri (par catégorie, prix, nom)
- Panier avec stockage local (localStorage)
- Authentification utilisateur (front-end uniquement)
- Formulaire d’inscription avec validation
- Validation côté client via **expressions régulières** dans `auth.js`
- Blog intégré
- Transitions modernes et animations douces
- Structure et balises sémantiques SEO-friendly
- Chargement rapide grâce à un seul fichier CSS pour tout le site

## Détails Techniques

### Technologies utilisées

- HTML5 + CSS3 (avec variables CSS)
- JavaScript (Vanilla, ES6+)
- LocalStorage
- Fichiers `.json` simulant le backend (ex: `products.json`, `articles.json`)

> Le site est entièrement en **anglais**, car le dataset utilisé est en anglais.

## Simulations Backend

Les données sont chargées dynamiquement via `fetch()` depuis des fichiers `.json`. Pour que cela fonctionne :
**Utiliser un live server local** (sinon le chargement `fetch()` échoue à cause des restrictions CORS).

## Bonnes pratiques SEO et d'accessibilité

- Utilisation de noms de fichiers **simples, sans majuscules, ni espaces, ni chiffres** (pour les images et ressources)
- Structure de dossiers claire et hiérarchique
- Meta balises et mots-clés SEO dans chaque page
- Balises sémantiques : `<header>`, `<main>`, `<section>`, `<footer>`

---

> Ce projet est uniquement en **front-end**. Le backend peut être ajouté ultérieurement en remplaçant les fichiers JSON par une API réelle.
