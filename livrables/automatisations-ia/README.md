# Automatisations IA

> Automatisations, scripts et agents IA conçus pour des entreprises. Sans interface principale pour l'utilisateur final.

## Ce qui va ici

- Agents IA qui travaillent pour une entreprise (traitement de documents, réponses, synthèse, triage)
- Scripts d'automatisation (envois, relances, exports, synchronisations)
- Intégrations entre outils (Notion, Google, WhatsApp, e-mail, CRM)
- Pipelines de traitement de données
- Assistants internes utilisés par une équipe, via un outil existant

**Le critère** : il n'y a pas d'application web ou mobile à laquelle un utilisateur final se connecte et clique. L'automatisation travaille en arrière-plan, ou via un canal qui existe déjà (WhatsApp, e-mail, Notion).

## Ce qui n'est pas ici

| Besoin | Destination |
|---|---|
| Utilisateur qui se connecte à une plateforme | `applications/` |
| Site vitrine ou pages de contenu | `sites-web/` |
| Documentation de l'automatisation pour un client | `documents/` |

La frontière est nette et elle se pose rarement : si l'utilisateur final ouvre une page web et clique, c'est une application.

## Nommage

Minuscules, tirets, pas d'espace ni d'accent. Le nom décrit l'action, pas l'outil.

```
relance-impayes-whatsapp/
agent-reponse-email-client/
sync-notion-google-sheets/
```

## Dans chaque dossier

```
relance-impayes-whatsapp/
├── README.md      # ce que ça fait, pour qui, déclencheur, ce que ça fait pas
└── (le code)
```

Le `README.md` couvre :

- l'action automatisée, en une phrase
- le déclencheur (schedule, événement, commande manuelle)
- les systèmes entrées et sorties (quelles APIs, quels fichiers)
- ce que ça fait en cas d'échec, et comment le relancer
- le coût estimé d'exécution (appels API, volume traité)
- les secrets nécessaires, sans les valeurs

## Sécurité

Les automatisations manipulent souvent des données d'entreprise et des accès API. Elles sont donc sujettes aux mêmes règles que les applications : validation des entrées, limitation de périmètre, gestion des erreurs, et traçabilité des actions.

Les secrets vont dans le `.env` du dossier de projet. Si le projet devient un dépôt Git séparé, il lui faut son propre `.gitignore` : un `.gitignore` ne s'applique qu'au dépôt où il se trouve.
