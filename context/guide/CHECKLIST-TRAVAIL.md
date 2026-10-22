# CHECKLIST DE TRAVAIL

> Formulaire unique à remplir. Source : `context/guide/GUIDE-COMPLET.md`.
> **Copie ce fichier dans le dossier du projet ou dans `context/rapports/<projet>.md` avant de le remplir.** Ne le remplis jamais sur place.

**Nom :**
**Projet :**
**Date :**
**Auteur :**

Sections :
1. Avant de démarrer un projet
2. Revue sécurité d'une fonctionnalité
3. Modèle de menaces (zone sensible)

---

# SECTION 1. Avant de démarrer un projet

> À remplir une fois par projet, avant la première ligne de code. Si une étape est vide, le projet n'est pas prêt.

## 1.1 Clarifier l'idée

- [ ] **Problème précis** : quelle difficulté l'application résout-elle ?
- [ ] **Cible exacte** : qui a ce problème le plus souvent ?
- [ ] **Solution actuelle** : comment ces personnes le résolvent-elles aujourd'hui ?
- [ ] **Avantage** : pourquoi ta solution serait-elle meilleure ou plus simple ?
- [ ] **Valeur principale** : qu'est-ce que l'utilisateur gagne ?
- [ ] **Fréquence** : besoin fréquent ou rare ?

**Résumé en 2-3 phrases :**

## 1.2 Recherche sur le problème et le marché

- [ ] Le problème est réellement ressenti par beaucoup de gens
- [ ] Il existe des discussions, plaintes ou demandes sur ce sujet (forums, Reddit, X, groupes Facebook)
- [ ] Taille approximative du marché ou de l'audience estimée
- [ ] Des tendances (croissance, réglementation, nouvelles habitudes) favorisent la solution

**Sources et liens :**

## 1.3 Analyse des concurrents

- [ ] Concurrents identifiés
- [ ] Points forts et faibles de chacun (avis utilisateurs)
- [ ] Ce qu'ils ne font pas, ou font mal, et que tu ferais mieux
- [ ] Différenciation tenue, sans forcer la révolution

| Concurrent | Forces | Faiblesses | Ce que j'améliore |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

## 1.4 Validation de la cible

- [ ] As parlé à de vraies personnes de la cible
- [ ] Intérêt testé (sondage, landing page, précommandes, discussions)
- [ ] Les gens disent « je l'utiliserais » ou « je paierais pour ça », pas seulement « c'est une bonne idée »

**Personnes interrogées, dates et verbatims :**

## 1.5 Faisabilité technique et légale

- [ ] Compétences disponibles (ou accès à l'IA + capacité de valider le résultat)
- [ ] Contraintes légales fortes (santé, finance, enfants, données personnelles)
- [ ] Conditions d'utilisation et politique de confidentialité nécessaires
- [ ] Réglementations sectorielles (RGPD, etc.)
- [ ] Bases de sécurité prévues : auth, HTTPS, validation, permissions, rate limiting

**Contraintes identifiées :**

## 1.6 Définition du MVP

- [ ] MVP décrit en une phrase claire
- [ ] 3 à 5 fonctionnalités indispensables (must-have) listées
- [ ] Must-have séparé de nice-to-have
- [ ] Parcours utilisateur principal décrit étape par étape

**MVP en une phrase :**

**Must-have :**
1.
2.
3.

**Nice-to-have (plus tard) :**

## 1.7 Préparation avant de coder

- [ ] Cahier des charges ou document de cadrage rédigé
- [ ] Stack technique choisie et justifiée
- [ ] Outils d'organisation prêts (GitHub, Trello, etc.)
- [ ] Guide de sécurité relu, exigences critiques identifiées pour ce projet
- [ ] Les 10 défis d'ingénierie parcourus : lesquels s'appliquent déjà au MVP ?

| # | Défi | S'applique au MVP ? | Décision |
|---|---|---|---|
| 01 | Concurrence / race conditions |  |  |
| 02 | Idempotence |  |  |
| 03 | Résilience et atomicité |  |  |
| 04 | Scalabilité |  |  |
| 05 | Autorisation et IDOR |  |  |
| 06 | Cohérence multi-services |  |  |
| 07 | Déploiement sans downtime |  |  |
| 08 | Synchronisation offline et conflits |  |  |
| 09 | Fiabilité de l'IA |  |  |
| 10 | Systèmes distribués et CAP |  |  |

## 1.8 Verdict

- [ ] Étapes 1.1 à 1.7 remplies
- [ ] Cadrage rédigé et sauvegardé

**Décision :** Go / No-Go

**Justification :**

**Première action concrète :**

---

# SECTION 2. Revue sécurité d'une fonctionnalité

> À remplir avant chaque merge. Cocher uniquement ce qui a été exécuté, pas ce qui est supposé fonctionner.

## 2.1 Identité de la fonctionnalité

- **Fonctionnalité :**
- **Projet :**
- **Date :**
- **Auteur :**

## 2.2 Surface d'attaque

Décrire ce que la fonctionnalité expose. C'est la première question, pas la dernière.

- **Qui peut l'appeler ?** (public, authentifié, admin, propriétaire)
- **Quelles données sont exposées ?**
- **Quelles données sont écrites ou modifiées ?**
- **Quels sont les endpoints, formulaires, actions concernées ?**
- **Y a-t-il un lien public ou partageable ?**

| Endpoint / action | Accessible par | Données exposées | Données écrites |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

## 2.3 Les 5 règles non négociables

- [ ] Aucun secret dans le code, le frontend ou Git (2.8)
- [ ] Validation côté serveur systématique (2.3)
- [ ] Permissions vérifiées à chaque requête (2.4)
- [ ] HTTPS actif (2.12)
- [ ] Mots de passe hashés (2.1)

**Preuves :** (fichiers, lignes, captures)

## 2.4 Les exigences Important, activées selon le contexte

- [ ] **Rate limiting** (2.9) sur les actions abusables
- [ ] **CSRF** (2.7) sur les actions sensibles
- [ ] **Injection SQL** (2.5) : requêtes paramétrées ou ORM partout
- [ ] **XSS** (2.6) : échappement + CSP
- [ ] **Fichiers et liens publics** (2.10) : type, taille, expiration
- [ ] **Logs et audit** (2.11) sur les actions sensibles
- [ ] **RLS** (2.13) sur les tables cloisonnées
- [ ] **Infrastructure** (2.12) : en-têtes, sauvegardes, migration sans downtime
- [ ] **Fiabilité de l'IA** (2.14) : chaque choix vérifié

**Seuils de rate limiting retenus :**

| Action | Limite | Fenêtre | Clé (IP / user / device) |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |

## 2.5 Les exigences Avancées, si la zone le justifie

- [ ] Threat modeling fait (section 3 de ce formulaire)
- [ ] Idempotence sur les actions critiques (défi 02)
- [ ] Atomicité ou compensation (défi 03)
- [ ] Concurrence gérée sur les ressources limitées (défi 01)
- [ ] Migrations backward-compatible, retour arrière possible (défi 07)
- [ ] Tests de charge si l'audience grossit (défi 04)

## 2.6 Les 10 défis, revue point par point

| # | Défi | S'applique ici ? | Ce qui a été fait |
|---|---|---|---|
| 01 | Concurrence / race conditions |  |  |
| 02 | Idempotence |  |  |
| 03 | Résilience et atomicité |  |  |
| 04 | Scalabilité |  |  |
| 05 | Autorisation et IDOR |  |  |
| 06 | Cohérence multi-services |  |  |
| 07 | Déploiement sans downtime |  |  |
| 08 | Synchronisation offline et conflits |  |  |
| 09 | Fiabilité de l'IA |  |  |
| 10 | Systèmes distribués et CAP |  |  |

## 2.7 Cas limites testés

Exécutés, pas supposés.

- [ ] Double-clic sur le bouton d'action (double soumission)
- [ ] URL modifiée : changer un ID dans l'URL ou un paramètre de requête
- [ ] Données invalides : champs vides, types incorrects, valeurs aberrantes, très longues
- [ ] Spam : envoi en masse, robot, honeypot
- [ ] Offline : perte de réseau en cours d'action
- [ ] Plantage : le serveur tombe au milieu de l'opération
- [ ] Rôle modifié : un utilisateur normal tente d'accéder à une ressource d'un autre ou à une fonction admin
- [ ] Session expirée ou cookie volé

| Cas testé | Résultat attendu | Résultat obtenu | Statut |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |

## 2.8 Secrets et dépendances

- [ ] Aucun secret dans le code, le frontend ou l'historique Git
- [ ] `.env.example` à jour, sans valeurs réelles
- [ ] Clés API avec le moindre privilège possible
- [ ] Dépendances à jour, pas de vulnérabilité critique connue
- [ ] Variables d'environnement de production documentées

## 2.9 Engagement

- [ ] Commit avec un message clair
- [ ] Les décisions importantes sont documentées dans le rapport du projet
- [ ] Aucune modification de fichier de contexte sans validation de Wilfried

**Décision :** Mergeable / À corriger avant merge

**Points restants :**

---

# SECTION 3. Modèle de menaces

> À remplir avant de coder une zone sensible : authentification, paiement, données personnelles, liens publics.

**Zone concernée :**
**Projet :**
**Date :**

## 3.1 Acteurs et surfaces d'attaque

| Acteur | Ce qu'il peut faire | Ce qu'il ne peut pas faire | Menace associée |
|---|---|---|---|
| Visiteur |  |  |  |
| Utilisateur authentifié |  |  |  |
| Administrateur |  |  |  |
| Bots / robots |  |  |  |
| Attaquant externe |  |  |  |

## 3.2 Données sensibles

| Donnée | Stockée où | Accès | Chiffrée ? | Durée de conservation | RGPD |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 3.3 Parcours d'attaque

| Surface | Tentative d'attaque | Impact | Contre-mesure | Statut |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## 3.4 Contrôles de sécurité en place

| Couche | Contrôle | Couvre |
|---|---|---|
| Frontend | Validation de confort (non suffisante) |  |
| Backend | Validation réelle, permissions, rate limiting |  |
| Base de données | RLS, requêtes paramétrées |  |
| Infrastructure | HTTPS, secrets, en-têtes de sécurité |  |
| Supervision | Logs, alertes |  |

## 3.5 Risques acceptés

Aucun risque ignoré. Soit il est traité, soit il est accepté en connaissance de cause, avec une décision datée.

| Risque | Traitement | Décideur | Date |
|---|---|---|---|
|  | Traité / Accepté / Transféré |  |  |

## 3.6 Suite à donner

- [ ] Menaces couvertes par des tests
- [ ] Points de surveillance en place
- [ ] Risques acceptés documentés
- [ ] Ce modèle mis à jour quand la fonctionnalité change

---

> Phrase de référence : « Je ne fais pas confiance au frontend. Tout ce qui est important est vérifié et protégé côté serveur. »
> Sécurité + Solidité technique = responsabilité du développeur, pas de l'IA.
