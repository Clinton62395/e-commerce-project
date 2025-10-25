# E-commerce Project

Une application de démonstration de boutique en ligne construite avec React et Vite. Ce dépôt contient une base front-end moderne (Vite + React 19), Tailwind CSS pour le style, composants MUI pour certains éléments et des utilitaires courants (axios, react-hook-form, react-router).

Ce README explique comment installer, lancer et contribuer au projet, ainsi que la structure principale et quelques recommandations pour la production.

---

## Aperçu

- Stack principale : React 19, Vite, Tailwind CSS, Material UI (@mui), Framer Motion, Swiper
- Outils : eslint, postcss, tailwindcss
- Fonctionnalités présentes : pages d'auth, listing produits, fiches produits, composant carousel, contexte utilisateur, panier basique et layout responsive.

## Scripts utiles

Les scripts disponibles dans `package.json` :

- `npm run dev` — démarre le serveur de développement Vite (HMR)
- `npm run build` — construit l'application pour la production
- `npm run preview` — prévisualise le build de production localement
- `npm run lint` — lance ESLint sur le code

Exemple :

```sh
npm install
npm run dev
```

## Installation et démarrage

Prérequis : Node.js 18+ recommandé et npm (ou yarn/pnpm).

1. Clonez le dépôt :

```sh
git clone <url-du-depot>
cd E-commerce-project
```

2. Installez les dépendances :

```sh
npm install
```

3. Lancez en développement :

```sh
npm run dev
```

Ouvrez ensuite http://localhost:5173/ (ou l'URL indiquée par Vite).

## Structure du projet

Principaux dossiers et fichiers :

- `src/` — code source React
	- `components/` — composants réutilisables (navbar, slides, etc.)
	- `pages/` — pages de l'application (home, products, sign_in, sign_up, etc.)
	- `landing_pages/` — pages de landing spécifiques
	- `services/` — providers et context (user_context, provider)
	- `assets/` — images et icônes locales
- `public/` — fichiers statiques servis directement (images visibles par src `/image.png`)
- `index.html` — point d'entrée Vite
- `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — configs d'outil

Fichiers d'exemple à regarder :
- `src/main.jsx` — bootstrapping React + Router
- `src/App.jsx` — routes principales
- `src/components/slides-components/` — composants de carrousel et sections (timer, pagination)

## Composants et patterns notables

- Utilisation de Tailwind pour la mise en page et la réactivité
- Contexte React (`user_context.jsx`) pour la gestion d'utilisateur
- `react-hook-form` + `yup` pour les formulaires (auth, reset password)
- Intégration MUI pour certains composants (LinearProgress, etc.)
- Swiper pour les carrousels

## Configuration / Variables d'environnement

Actuellement le front ne fourni pas de `.env` example dans le dépôt. Si vous connectez des services externes (API, Firebase, Paystack), créez un fichier `.env` à la racine et ajoutez les clés nécessaires (ne commitez jamais les secrets).

Exemples :

```
VITE_API_URL=https://api.example.com
VITE_PAYSTACK_KEY=pk_test_xxx
```

## Déploiement

1. Générez le build : `npm run build`
2. Déployez le contenu du dossier `dist/` sur votre hébergeur (Netlify, Vercel, Firebase Hosting, etc.).

Pour Vercel/Netlify, connectez le dépôt et configurez la commande de build (`npm run build`) et le dossier de sortie (`dist`).

## Contribuer

1. Forkez le dépôt
2. Créez une branche feature : `git checkout -b feat/ma-fonction`
3. Faites vos modifications et tests
4. Soumettez une Pull Request avec une description claire

Merci d'ajouter des tests ou au moins de vérifier la responsive sur mobile/tablette pour toute PR touchant l'UI.

## Recommandations rapides / next steps

1. Ajouter un fichier `.env.example` et documenter les variables d'environnement
2. Ajouter des tests unitaires basiques (Jest / React Testing Library) pour les composants critiques
3. Ajouter un pipeline CI (GitHub Actions) pour lint + tests
4. Configurer ESLint/Prettier partagés et vérifier les règles de style
5. Ajouter des checklists de déploiement (tracking d'assets et caches)

## Aide / Contacts

Si vous avez besoin d'aide rapide, fournissez :
- la commande que vous avez exécutée
- le message d'erreur complet
- la version Node.js

Vous pouvez aussi ouvrir une issue dans le dépôt avec ces informations.

---

Bonne continuation — dites-moi si vous voulez que je :
- ajoute un `.env.example` et un guide d'intégration Paystack/Firebase
- écrive des scripts de build/déploiement (GitHub Actions)
- améliore la page `checkout.jsx` ou un composant précis (je peux l'éditer directement)

