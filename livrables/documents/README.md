# Documents

> Documents non techniques : dossiers de cadrage, fiches projet, rapports, propositions commerciales.

## Ce qui va ici

- Dossiers de cadrage et cahiers des charges
- Fiches projet
- Rapports de livraison, bilans, retours client
- Propositions commerciales, devis, contrats
- Supports de présentation
- Tout document destiné à être lu par un client ou transmis

**Le critère** : c'est du texte destiné à être lu par un humain, pas du code. Aucun fichier source dans ce dossier.

## Ce qui n'est pas ici

| Besoin | Destination |
|---|---|
| Le code d'un projet | Le dossier du projet, dans `sites-web/`, `applications/` ou `automatisations-ia/` |
| Mon rapport de suivi interne | `context/rapports/<projet>.md` |

## Nommage

Minuscules, tirets, pas d'espace ni d'accent.

Un document qui concerne un projet précis vit dans un sous-dossier portant le nom du projet :

```
documents/
├── kofira/
│   ├── cahier-des-charges.md
│   ├── proposition-commercial.md
│   └── rapport-livraison.md
├── jiako/
│   └── dossier-cadrage.md
└── maintenance-site-trustbank/
    └── contrat-annuel.md
```

Un document qui ne concerne aucun projet précis vit directement à la racine de `documents/` :

```
documents/
└── presentation-perso/
    └── deck-2026.pdf
```

## Dans chaque dossier de documents

```
kofira/
├── README.md      # ce que contient le dossier, la date, la version, le destinataire
└── (les documents)
```

Le `README.md` du dossier de documents liste chaque document avec sa date, sa version et son destinataire. Ça évite de retrouver six fichiers nommés `v2-final.pdf` sans savoir lequel est le bon.
