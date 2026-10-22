# COMMANDES : quelle commande taper

> Ce fichier est la table de correspondance entre **ce que je veux faire** et **la commande à taper**.
> Jarvis le lit avant de me répondre. Si j'exprime une intention sans taper de commande, propose-moi la commande correspondante en une ligne.

---

## Les 6 commandes

Les 6 commandes existent sur les deux outils, avec le même comportement :
`.opencode/commands/` pour OpenCode, `.claude/commands/` pour Claude Code.

| Ce que je veux | Je tape | Ce que ça fait |
|---|---|---|
| Démarrer une session, recharger mon contexte | `/prime` | Lit AGENTS.md, CONTEXT.md, HISTORY.md, et me résume où j'en suis |
| Voir ma matinée : veille + focus du jour | `/morning` | Veille filtrée sur mes projets, puis un focus pour la journée |
| J'ai avancé, ma situation a changé | `/update` | Met à jour CONTEXT.md et ajoute une entrée dans HISTORY.md |
| Faire ou mettre à jour le rapport d'un projet | `/rapport <projet>` | Met à jour le rapport du projet (historique, décisions, textes validés, objectifs) |
| Analyser un document | `/analyse <fichier>` | Lit un document de `context/import/` et me fait une synthèse |
| Retrouver les commandes | `/commandes` | Affiche cette table |

---

## Détail de chaque commande

### `/prime`

À lancer au début de chaque session. Charge le contexte complet et me dit qui je suis, mes objectifs en cours, mes projets actifs, et ce qu'a donné la dernière session. Ne lance rien de lui-même ensuite, il attend mes instructions.

### `/morning`

Veille du jour, filtrée sur mon contexte (actualités IA + mon secteur), 3 à 4 news maximum, une ligne « pourquoi c'est important pour moi » pour chacune, puis un focus suggéré pour la journée. Un seul écran, pas plus.

### `/update`

Me demande ce qui a changé, me propose un plan de modification, attend ma validation, puis écrit. Ajoute une entrée datée dans `HISTORY.md`. Ne modifie jamais un fichier sans validation.

### `/rapport <projet>`

Crée ou met à jour le rapport de projet (historique, décisions prises, textes validés, objectifs, prochaines étapes). Les rapports de projet sont un document par projet, mis à jour à chaque avancée. Sources utiles : `context/import/`, les fichiers du projet, et `context/guide/` pour la partie technique.

### `/analyse <fichier>`

Analyse un document déposé dans `context/import/` et me rend une synthèse exploitable, plus les points d'attention. Les PDF et documents binaires sont convertis en texte avant lecture.

### `/commandes`

Affiche cette table de correspondance.

---

## Note sur le nom des commandes

Le nom de la commande d'aide est `/commandes`, pas `/jarvis`, volontairement : la commande ne porte pas le nom de l'assistant, pour que le renommage ne casse rien. Le nom de l'assistant est défini dans `context/IDENTITE.md`.

---

## Règles de routage

- Si je tape une commande, on l'exécute, point.
- Si j'exprime une intention sans commande, **propose la commande correspondante en une ligne**, sans la lancer à ma place. Par exemple : « Tape `/rapport Kofira` pour que je mette à jour ton rapport. »
- Une seule proposition par session, sauf si je demande explicitement le rappel des commandes.
- En cas de doute entre deux commandes, propose la plus proche et demande confirmation.

---

## Ce que Jarvis ne fait pas

- Il n'arbitre pas mes décisions business. Pour ça, j'invoque explicitement le conseil `/goat`, qui est un outil séparé, dans un autre dossier.
- Il ne modifie aucun fichier sans me montrer le plan et avoir ma validation.
- Il n'invente pas d'information : si une donnée est incertaine, il me le dit.
