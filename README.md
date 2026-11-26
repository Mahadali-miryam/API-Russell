# API Russell – Port de plaisance

## Présentation du projet

Ce projet consiste à développer une API REST pour la gestion du port de plaisance Russell.

L'application permet de gérer les catways, les réservations et les utilisateurs grâce à une interface web et une base de données MongoDB.

## Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- HTML / CSS
- JWT pour l'authentification

## Fonctionnalités

### Gestion des catways
- Consulter la liste des catways.
- Consulter les informations d'un catway.
- Ajouter un catway.
- Modifier un catway.
- Supprimer un catway.

### Gestion des réservations
- Consulter les réservations.
- Consulter les détails d'une réservation.
- Ajouter une réservation.
- Supprimer une réservation.

### Authentification
- Connexion des utilisateurs.
- Protection des routes de l'API.

### Interface web
- Page d'accueil avec connexion.
- Tableau de bord.
- Gestion des catways et des réservations.
- Page de documentation de l'API.

## Installation du projet

Cloner le dépôt GitHub :

```bash
git clone https://github.com/Mahadali-miryam/API-Russell.git
```

Accéder au dossier :

```bash
cd API-Russell
```

Installer les dépendances :

```bash
npm install
```

## Configuration

Créer un fichier `.env` à la racine du projet et y renseigner les variables d'environnement nécessaires :


```env
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_cle_secrete
```

Ne jamais publier les informations secrètes du fichier `.env`.

## Lancement de l'application

Après configuration du script de démarrage dans `package.json` :

```bash
npm start
```

L'application sera accessible localement à l'adresse :

http://localhost:3000

## Lancer les tests

```bash
npm test
```

## Documentation

La documentation de l'API est accessible depuis la page d'accueil de l'application.

