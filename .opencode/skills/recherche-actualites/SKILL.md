---
name: recherche-actualites-contextualisees
description: Veille personnalisée pour Wilfried. Quand il demande "fais-moi un point sur les actualités", "donne-moi les news du jour", "qu'est-ce que je dois savoir aujourd'hui", "fais-moi une veille", ou utilise la commande /morning, cette skill effectue une recherche filtrée sur ses projets actifs et ses objectifs, et ne garde que ce qui peut lui servir concrètement à réaliser ses projets.
---

# Veille contextualisée

## Mission

Une veille **dérivée de ses projets**, pas une liste de thèmes. Le filtre n'est pas « l'IA » ou « le business » en général : c'est **« est-ce que ça m'aide à réaliser ce que j'ai en cours »**.

---

## Phase 1 : Charger le contexte

Lire avant toute recherche :

1. `context/CONTEXT.md` (projets actifs, objectifs, pistes, contraintes)
2. `context/HISTORY.md` (ce sur quoi il a travaillé récemment)
3. `context/rapports/` (l'état réel de chaque projet)

Construire à partir de là la liste des **sujets qui servent ses projets en cours**. Par exemple, si Kofira est en phase de vente, la veille porte sur la vente et la demande, pas sur les modèles de langage.

Si une piste est mentionnée dans CONTEXT.md, elle entre dans le filtre, même si elle n'est pas encore démarrée.

---

## Phase 2 : Périmètre

Par défaut : **tout ce qui peut l'aider à réaliser ses projets**. Ne pas demander, sauf s'il le précise lui-même.

Regrouper en 3 angles :

1. **Ce qui débloque un projet en cours** (outil, technique, concurrence, opportunité, pratique)
2. **Ce qui ouvre une piste** (nouveaux modèles, cas d'usage B2B, outils d'automatisation)
3. **Ce qui menace ou change le marché** (réglementation, mobile money, plateformes, tariffs)

---

## Phase 3 : Recherche

3 à 5 recherches ciblées maximum, sources récentes (moins de 48 h si possible).

Requêtes du type : `actu <sujet du projet> 2026`, `nouveau outil <catégorie>`, `<pays> <sujet> marché`.

Langues : français en priorité, anglais si la source est francophone.

---

## Phase 4 : Filtrer

Pour chaque résultat, 3 questions :

1. Est-ce que ça concerne directement un de mes projets ou pistes ?
2. Est-ce que ça change ce que je fais dans les 30 prochains jours ?
3. Est-ce que ça m'évite une erreur, ou m'en fait gagner du temps ?

Trois non → on écarte. Un oui → on garde. **3 à 4 actualités maximum.** Mieux vaut 3 utiles que 10 génériques.

---

## Phase 5 : Restituer

```
Veille du <date>

En lien avec : <projet principal> · <piste> · <objectif>

À FAIRE CETTE SEMAINE
1. <Actualité> — <une ligne : pourquoi c'est important pour moi, concrètement>
   Source : <lien>

À SURVEILLER
- <Actualité> — <une ligne>
   Source : <lien>

ACTION RECOMMANDÉE
<Une seule action, applicable aujourd'hui, sur un de mes projets>
```

Chaque ligne doit dire ce que ça change **pour lui**, pas ce que ça dit en général. Si une actu est interesante mais pas actionnable, elle va en « à surveiller », pas en tête.

---

## Règles

- Ne jamais inventer une actualité ou une source. Si la recherche ne donne rien d'utile, le dire
- Aucun chiffre inventé : si un chiffre n'est pas dans la source, ne pas le citer
- Français, tutoiement, pas de tirets longs
- Court : une seule page
- Le catalogue de 200 outils d'IA est disponible dans `context/import/200-meilleurs-IA.txt` pour orienter les choix d'outils
