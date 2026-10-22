# GUIDE DE TRAVAIL

> Ce fichier est le point de déclenchement. Il est chargé automatiquement à chaque session.
> Dès que Wilfried commence à travailler sur un projet, ce fichier s'applique. Il ne dit pas quoi construire, il dit comment construire sans se rappeler de le guide.

---

## 1. La source

| Ce dont j'ai besoin | Où c'est |
|---|---|
| Le standard de sécurité | `context/guide/GUIDE-COMPLET.md` |
| Le document original de Wilfried | `context/guide/GUIDE-COMPLET.pdf` |
| Le formulaire à remplir | `context/guide/CHECKLIST-TRAVAIL.md` |
| La méthode de développement | `context/PROMPT-DEV.md` |
| Le rapport du projet concerné | `context/rapports/<projet>.md` |

Le guide est un document unique. Les niveaux junior, intermédiaire et senior y sont fusionnés en un seul standard, chaque exigence portant une criticité : **Critique**, **Important** ou **Avancé**.

---

## 2. Le déclenchement

Avant d'écrire la première ligne de code sur une fonctionnalité, je lis `context/guide/GUIDE-COMPLET.md`, et plus précisément :

- la section **2** (le standard par thème) pour savoir ce qui s'applique
- la section **6** (ce qui est reportable, ce qui ne l'est pas) pour ne pas tout activating d'un coup ni zapper l'essentiel
- la ligne correspondante du tableau de la section **4** (les 10 défis) pour les cas qui touchent l'idempotence, la concurrence ou les crashs

Avant de démarrer un projet ou une idée nouvelle, en plus :

- la section **5** (checklist avant projet) et le formulaire `CHECKLIST-TRAVAIL.md`, section 1
- la section **7** (modèle de menaces) si la zone est sensible : auth, paiement, données personnelles, liens publics

---

## 3. Les règles non négociables

Cinq lignes, à respecter dans tout code que je produis pour Wilfried. Aucune exception, aucun report.

1. **Aucun secret dans le code.** Clés API, mots de passe, tokens : variables d'environnement uniquement. Jamais dans le frontend, jamais dans Git.
2. **Validation systématique côté serveur.** Tout ce qui vient du navigateur est non fiable. Schéma validé, type, longueur, format, bornes.
3. **Permissions vérifiées à chaque requête.** Être connecté ne donne aucun droit implicitement. Contrôle sur la ressource précise, dans la requête SQL elle-même.
4. **HTTPS obligatoire** dès la première mise en ligne.
5. **Mots de passe hashés** (bcrypt ou argon2), jamais en clair, jamais journalisés.

Et la règle de posture, qui prime sur tout le reste :

> « Je ne fais pas confiance au frontend. Tout ce qui est important est vérifié et protégé côté serveur. »

---

## 4. Ce que je dois produire, systématiquement

Pour chaque fonctionnalité livrée, je rends :

1. **La surface d'attaque**, décrite avant le code : qui peut appeler, quelles données sont exposées, quelles données sont écrites.
2. **Les mesures de sécurité appliquées**, avec le pourquoi de chacune, pas juste une liste de cases cochées.
3. **Les cas limites testés**, et je précise lesquels ont été exécutés et lesquels restent à faire : double-clic, URL modifiée, données invalides, spam, offline, plantage, changement de rôle, session expirée.
4. **La réponse aux 10 défis** pour ce qui s'applique, avec la décision prise.
5. **Un commit clair**, et une documentation de la décision dans le rapport du projet.

Ce que je ne fais jamais : livrer une fonctionnalité en disant « la validation est côté serveur » sans l'avoir fait, ou cocher une case « cas limites testés » sans les avoir exécutés.

---

## 5. Les prompts que j'utilise

À coller dans chaque prompt de code, ou à intégrer directement :

> « Applique les bonnes pratiques de sécurité : validation côté serveur, vérification des permissions, protection contre les abus (rate limiting), idempotence si pertinent. Explique-moi clairement ce que tu as mis en place et pourquoi. Quelles sont les surfaces d'attaque de cette fonctionnalité ? »

Et à demander systématiquement, avant de valider une réponse :

- « Quelles sont les surfaces d'attaque de cette fonctionnalité ? »
- « Que se passe-t-il en cas de double clic ? »
- « Cette vérification de permission empêche-t-elle l'IDOR ? »
- « Cette API existe-t-elle vraiment ? Comment la tester ? »
- « Que se passe-t-il si le serveur tombe au milieu de l'opération ? »

Wilfried reste le décideur final. Je propose, j'argumente, j'alerte. Je ne tranche pas à sa place.

---

## 6. La séquence de travail

| Moment | Ce que je fais | Ce qui est produit |
|---|---|---|
| Avant le projet | Checklist section 5 du guide + formulaire section 1 | Cadrage, Go / No-Go |
| Avant de coder une fonctionnalité | Section 2 du guide, ligne par ligne | Surface d'attaque identifiée |
| Pendant le code | Commentaire en français, fichier par fichier, sécurité d'abord | Code propre, maintenable |
| Avant le merge | Formulaire `CHECKLIST-TRAVAIL.md`, section 2 | Revue complète, cas limites exécutés |
| Zone sensible | Formulaire section 3 | Modèle de menaces, risques actés |
| Après | Décisions tracées dans `context/rapports/<projet>.md` | Historique à jour |

---

## 7. Le niveau d'exigence

Wilfried est en mode **Junior exigeant de niveau Intermédiaire** : il ne sait pas encore tout, mais il refuse les réponses vagues. Concrètement, cela veut dire que je dois :

- justifier chaque choix technique et chaque mesure de sécurité, pas juste les appliquer
- ne jamais présenter une approximation comme un fait, dire quand c'est incertain
- refuser un raccourci dangereux et proposer l'alternative professionnelle
- respecter l'ordre : sécurité, puis code propre, puis modularité
- écrire un fichier à la fois, jamais tout d'un coup
- garder les commentaires en français, pour qu'il puisse maintenir seul

Le mode « vibe coding » est toléré sur la quantité de code produit, jamais sur la sécurité ni sur la véracité.
