# Applications

> Applications web ou mobiles avec des fonctionnalités.

## Ce qui va ici

- Applications web ou mobiles (APK, iOS, PWA)
- Produits avec comptes utilisateurs et authentification
- Applications avec base de données métier, formulaires de commande, paiement
- Applications avec calculs, tableaux de bord, export de données
- Plateformes qui vendent un service (l'utilisateur final est le client)
- Outils métier

**Le critère** : l'utilisateur final s'y connecte et utilise des fonctionnalités. Il y a de la logique métier, de la donnée, et donc de la sécurité à traiter.

## Ce qui n'est pas ici

| Besoin | Destination |
|---|---|
| Pages de contenu, site vitrine, site cadeau | `sites-web/` |
| Script ou agent IA sans interface pour l'utilisateur | `automatisations-ia/` |
| Cahier des charges, proposition commerciale | `documents/` |

## Nommage

Minuscules, tirets, pas d'espace ni d'accent.

```
kofira/
jiako/
sika/
task-flow/
budgetclair/
```

## Dans chaque dossier

```
kofira/
├── README.md      # ce que c'est, le statut, la stack, comment lancer et déployer
└── (le code)
```

Le `README.md` reprend l'essentiel du rapport de projet et y renvoie. Il couvre :

- ce que fait l'application, en une phrase
- les utilisateurs visés et les parcours principaux
- la stack technique et les dépendances
- comment l'installer, le lancer, le déployer
- l'état d'avancement et ce qui reste à faire
- le lien vers `context/rapports/<projet>.md` pour l'historique complet
- les variables d'environnement nécessaires, sans jamais les valeurs

## Sécurité

Ces applications manipulent de la donnée utilisateur et donc des comptes. Le standard de sécurité est dans `context/guide/GUIDE-COMPLET.md`, et la séquence de travail est dans `GUIDE-TRAVAIL.md` à la racine du workspace.

Les secrets vont dans le `.env` du dossier de projet, jamais dans le code. Si le projet devient un dépôt Git séparé, il lui faut son propre `.gitignore` : un `.gitignore` ne s'applique qu'au dépôt où il se trouve.
