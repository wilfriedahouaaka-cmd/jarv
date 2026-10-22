---
description: Analyser un document et produire une synthese exploitable
---

# /analyse

> Analyse un document déposé dans `context/import/` et produit une synthèse exploitable.

---

## Mission

Quand je tape `/analyse <fichier>`, exécute la séquence suivante.

### Étape 1 : Trouver le document

Le fichier indiqué dans `$ARGUMENTS` est normalement dans `context/import/`. S'il n'y est pas, cherche-le dans le workspace. Si tu ne le trouves pas, dis-le clairement et liste ce qui est disponible dans `context/import/`.

### Étape 2 : Extraire le texte

Si le document est un PDF, un Word ou un autre format binaire, convertis-le d'abord en texte. Sur cette machine, Python est disponible à ce chemin :

```
C:\Users\HP KS\AppData\Local\Programs\Python\Python312\python.exe
```

avec la bibliothèque `pypdf` pour les PDF :

```python
from pypdf import PdfReader
reader = PdfReader(r"<chemin>")
texte = "\n".join((p.extract_text() or "") for p in reader.pages)
```

Écris le texte extrait dans un fichier temporaire, puis lis-le. Pour les autres formats (docx, xlsx, images), extrais ce qui est possible et signale ce qui ne l'est pas.

### Étape 3 : Analyser

Produis une synthèse en 4 parties :

```
## Ce que c'est
<en 2-3 lignes : nature du document, auteur s'il est indiqué, date s'il est indiquée>

## Les points importants
<5 à 8 puces maximum, les idées qui comptent, avec les chiffres exacts>

## Ce qui concerne mes projets
<ce que le document change ou éclaire pour Kofira, JiaKo, Sika ou un autre projet. Si rien, dis-le>

## Ce que je devrais faire
<2 ou 3 actions concrètes, ou "rien d'urgent">
```

### Étape 4 : Proposer la suite

Termine par une proposition, à valider :

```
Je peux en faire un rapport de projet (/rapport <projet>), l'ajouter à mon contexte (/update), ou le laisser de côté. Tu veux quoi ?
```

Attends ma réponse avant d'écrire quoi que ce soit.

---

## Règles importantes

- Ne modifie aucun fichier sans validation
- Ne jamais inventer le contenu d'un document : si une partie est illisible, dis-le
- Cite les chiffres et les phrases du document tels quels
- Français, tutoiement, pas de tirets longs
- Maximum 8 puces par partie, c'est une synthèse pas un copier-coller
