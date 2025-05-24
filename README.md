# HackStore – Mini Site E-Commerce

<img src="images/logo.png" alt="Logo HackStore" width="150" />

Bienvenue sur **HackStore**, un projet front-end de boutique en ligne dédiée aux gadgets de cybersécurité. Ce projet a été réalisé dans le cadre du module de Développement d'Applications Web à l'Université Mouloud Mammeri de Tizi-Ouzou.

### Réalisé par:
- **TEZKRATT Anis**  
- **MEZIOUD Islem**  
- **MEZAOUR Mokrane**

[Voir le site en ligne](https://anistezkratt.github.io/index.html)

[Valider avec W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2Fanistezkratt.github.io%2Findex.html)

## Objectif

Créer un site e-commerce responsive, moderne, et optimisé SEO (référencement), en utilisant uniquement HTML, CSS et JavaScript, sans back-end.

## Fonctionnalités

- Design responsive (mobile, tablette, desktop)
- Thème sombre avec des couleurs inspirées de la cybersécurité
- Chargement dynamique des produits (via JSON) – les produits ne sont pas codés en dur (hard-coded) dans le HTML, mais injectés dynamiquement dans la page via javascript
- Filtrage et tri (par catégorie, prix, nom)
- Panier avec stockage local (localStorage)
- Authentification utilisateur (front-end uniquement)
- Formulaire d’inscription avec validation
- Validation côté client via **expressions régulières** dans `auth.js`
- Mini blog
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

## Navigation dynamique entre les pages

Des pages comme `product-details.html` récupèrent un ID via l’URL (ex : ?id=2) avec javascript pour afficher dynamiquement les données correspondantes depuis les fichiers JSON.

## Bonnes pratiques SEO et d'accessibilité

- Utilisation de noms de fichiers **simples, sans majuscules, ni espaces, ni chiffres** (pour les images et ressources)
- Structure de dossiers claire et hiérarchique
- Meta balises et mots-clés SEO dans chaque page
- Balises sémantiques : `<header>`, `<main>`, `<section>`, `<footer>`
- Des attributs alt pertinents ajoutés sur les images
- Et d’autres bonnes pratiques SEO et d’accessibilité

---

> Actuellement, ce projet est entièrement front-end. L'intégration d'un back-end pourra se faire ultérieurement en remplaçant les sources JSON locales par une API.
