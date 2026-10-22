---
description: Créer ou mettre à jour le rapport d'un projet
argument-hint: [projet]
---

# /rapport

> Crée ou met à jour le rapport de projet : historique, décisions, textes validés, objectifs.

---

## Mission

Quand je tape `/rapport <projet>`, exécute la séquence suivante.

### Étape 1 : Identifier le projet

Si `$ARGUMENTS` est vide, liste les projets de `context/CONTEXT.md` et demande lequel. Si un nom est donné, trouve le projet correspondant.

Emplacement des rapports, par défaut : `context/rapports/<projet>.md`. Si un rapport existe déjà pour ce projet, mets-le à jour au lieu d'en créer un second.

### Étape 2 : Collecter la matière

Rassemble, sans rien inventer :

- Le rapport existant, s'il y en a un
- Les fichiers du projet : documents de cadrage, notes, textes validés, décisions prises
- Les documents déposés dans `context/import/` qui concernent ce projet
- La section « Mes projets en cours » de `context/CONTEXT.md`
- Pour la partie technique : `context/guide/` (sécurité, checklist avant de démarrer, 10 défis d'ingénierie)

Si une information est incertaine ou absente, écris-le explicitement comme « à confirmer » plutôt que d'inventer.

### Étape 3 : Rédiger le rapport

Structure du rapport :

```markdown
# Rapport de projet : <nom du projet>

Dernière mise à jour : <AAAA-MM-JJ>

## 1. En une phrase
<Ce que c'est, pour qui, et ce que ça doit rapporter>

## 2. Où j'en suis
<État d'avancement factuel, ce qui est fait, ce qui reste>

## 3. Décisions prises
<- Décision> : <Pourquoi> (date)

## 4. Textes validés
<Les textes/messages/prix validés, réutilisables tels quels>

## 5. Objectifs
< court terme, long terme, avec les chiffres quand ils existent >

## 6. Prochaines étapes
1. <action> (avant <date>)

## 7. Points de vigilance
<Ce qui bloque, ce qui n'est pas clair, les risques identifiés>
```

### Étape 4 : Valider

Présente le rapport complet à l'écran, puis demande :

```
C'est le rapport à jour. Tu valides, ou tu veux que je modifie quelque chose ?
```

Attends ma validation avant d'écrire le fichier.

### Étape 5 : Écrire et tracer

Une fois validé :
1. Écris `context/rapports/<projet>.md`
2. Ajoute une entrée datée dans `context/HISTORY.md` :

```
## <AAAA-MM-JJ>

### Rapport de projet mis à jour : <projet>
- <Ce qui a changé dans le projet>
- <Décisions nouvellement consignées>
```

---

## Règles importantes

- Un rapport par projet, jamais deux
- Jamais de modification de `CONTEXT.md` ou `HISTORY.md` sans validation
- Une information incertaine est marquée « à confirmer », jamais inventée
- Français, tutoiement, pas de tirets longs
- Cite les sources (fichier, dossier) quand tu tires une affirmation d'un document
