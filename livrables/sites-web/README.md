# Sites web

> Sites internet livrés, sous forme de pages de contenu.

## Ce qui va ici

- Sites-cadeaux personnalisés (anniversaire, mariage, naissance, entreprise)
- Sites-musées, sites de parcours interactif, sites-vitrines
- Landing pages, pages de présentation, sites événementiels
- Pages de contenu statique ou légèrement dynamiques, sans comptes utilisateurs

**Le critère** : un site-web présente du contenu. Il n'a ni comptes utilisateurs, ni base de données métier, ni fonctionnalités métier complexes (paiement, calculs, workflow de commande).

## Ce qui n'est pas ici

| Besoin | Destination |
|---|---|
| Utilisateurs qui se connectent | `applications/` |
| Formulaire de commande avec paiement | `applications/` |
| Tableau de bord, calculs métier | `applications/` |
| Agent ou script qui tourne sans interface | `automatisations-ia/` |

En cas de doute, ce n'est pas tranché seul : la proposition de classement passe par Wilfried avant création du dossier.

## Nommage

Minuscules, tirets, pas d'espace ni d'accent.

```
site-cadeau-marie-dupont/
site-vitrine-atelier-kone/
site-musee-musee-civique/
```

Le préfixe `site-` sert à distinguer visuellement un site d'une application dans une arborescence. Il n'est pas obligatoire, mais il évite l'ambiguïté quand on regarde une liste de dossiers.

## Dans chaque dossier

```
site-cadeau-marie-dupont/
├── README.md      # client, occasion, contenu, tech stack, état de livraison
└── (le code)
```

Le `README.md` indique qui est le destinataire, l'occasion, les contenus intégrés, la stack technique, et où est le site en ligne s'il est déployé.
