# Dossier `guide/`

> Référence permanente de Wilfried : sécurité, checklist d'idée, défis d'ingénierie.
> Source : `GUIDE-COMPLET.pdf` (document original). Version texte lisible et unifiée : `GUIDE-COMPLET.md`.
> Point de déclenchement : `GUIDE-TRAVAIL.md` à la racine du workspace.

## Contenu

| Fichier | Rôle | Quand l'utiliser |
|---|---|---|
| `GUIDE-COMPLET.md` | Le standard de sécurité unifié (thèmes, criticités, 10 défis, checklist projet, posture) | Référence permanente. À relire avant chaque nouvelle idée ou fonctionnalité sensible |
| `GUIDE-COMPLET.pdf` | Document original de Wilfried | Archive, ne pas modifier |
| `CHECKLIST-TRAVAIL.md` | Formulaire unique à remplir : section 1 avant projet, section 2 avant merge, section 3 zone sensible | Une copie par projet et par fonctionnalité |
| `README.md` | Mode d'emploi du dossier | Rarement, quand un usage n'est pas clair |

## Règles d'usage

1. **Ne jamais modifier `GUIDE-COMPLET.md` ni `GUIDE-COMPLET.pdf` sans l'accord de Wilfried.** Ce sont des documents de référence. Toute amélioration se propose, se valide, puis se trace dans `context/HISTORY.md`.
2. **`CHECKLIST-TRAVAIL.md` est un gabarit.** On le copie dans le dossier du projet ou dans `context/rapports/<projet>.md` avant de le remplir, on ne le remplit jamais sur place.
3. **Les niveaux junior, intermédiaire et senior sont fusionnés.** Le guide attribue à chaque exigence une criticité : Critique, Important ou Avancé. La section 6 du guide dit ce qui est reportable et ce qui ne l'est jamais.
4. **La sécurité prime sur le confort de développement.** Si un point n'est pas traité, ce n'est pas un détail, c'est une décision à acter et documenter.
5. **Wilfried reste le décideur final.** L'IA propose, Wilfried valide. Aucune modification de fichier de contexte sans validation.

## Ce que ce dossier change concrètement

- Chaque idée passe par la section 1 de `CHECKLIST-TRAVAIL.md` avant une ligne de code.
- Chaque fonctionnalité passe par la section 2 avant merge, avec les cas limites réellement exécutés.
- Chaque zone sensible (auth, paiement, données personnelles, liens publics) passe par la section 3 avant conception.
- Les cas limites (double-clic, URL modifiée, données invalides, spam, offline, plantage, changement de rôle, session expirée) sont testés, pas supposés traités.
