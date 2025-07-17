# ParisJanitor Backoffice

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.


## 📚 Table des matières
1. [Présentation](#présentation)
2. [Fonctionnalités principales](#fonctionnalités-principales)
3. [Structure du projet](#structure-du-projet)
4. [Installation](#)
5. [Lancement de l'application](#)
6. [Scripts disponibles](#)
7. [Technologies utilisées](#technos)
8. [Bonnes pratiques](#)
9. [Screenshots (optionnel)](#)
10. [Contribuer (si open source ou travail d'équipe)](#)
11. [Licence](#)

### Présentation

Le **backoffice Angular** de l’application Paris Janitor centralise la gestion de l’ensemble de la plateforme de conciergerie. Il est destiné aux administrateurs et gestionnaires de PJ afin de suivre, valider et administrer les utilisateurs (clients-bailleurs, voyageurs, prestataires), les biens, les prestations, les réservations, les paiements et les statistiques globales.
Cette interface est conçue pour offrir une vision d’ensemble de l’activité, permettre un contrôle précis des flux, et garantir un service fluide et sécurisé.

### Fonctionnalités principales

### 🎯 Gestion des clients-bailleurs
- CRUD des comptes bailleurs
- Validation des nouveaux biens proposés
- Visualisation du calendrier d’occupation des biens
- Suivi des paiements hors location
- Accès aux documents (états des lieux, contrats)
- Synthèse des revenus et dépenses par bien


### Structure du projet

- SPA Angular (Single Page Application)
- Découpage modulaire par profil utilisateur
- Intégration d’un backend via API REST (Spring Boot)
- Authentification JWT avec rôles
- Responsive Design (PC, tablette, mobile)

### Technologies utilisées

- Application Angular CLI (15.x+) - TypeScript
- Appels vers les microservices (API REST avec RxJs)
- Authentification JWT avec rôles (admin, gestionnaire)
- Intégration de composants UI (PrimeNG, Bootstrap/CSS)
- Responsive design (consultation tablette possible)
- Modularisation par espaces fonctionnels
