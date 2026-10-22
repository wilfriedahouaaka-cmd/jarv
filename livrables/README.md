# Livrables

> Tout ce que je produis pour Wilfried vit ici. Les documents qu'il me fournit vivent dans `context/import/`.

## La règle d'or

| Sens | Destination |
|---|---|
| **Inputs** : les documents que Wilfried me fournit (PDF, exports, CV, photos, briefs) | `context/import/` |
| **Outputs** : tout ce que je produis pour lui (sites, applications, automatisations, documents) | `livrables/` |

Rien ne se dépose automatiquement dans `livrables/` sans validation. Voir la règle de rangement plus bas.

---

## Les quatre dossiers

| Dossier | Ce qui y va | Ce qui n'y va pas |
|---|---|---|
| `sites-web/` | Sites internet livrés, sous forme de pages de contenu. Sites-cadeaux personnalisés, sites-musées, sites vitrines, landing pages, pages de présentation. **Pas de comptes utilisateurs, pas de fonctionnalités métier complexes.** | Tout ce qui a une base de données, une authentification, un paiement ou des calculs métier : ça part dans `applications/` |
| `applications/` | Applications web ou mobiles avec des fonctionnalités. Comptes utilisateurs, base de données, formulaires de commande, paiement, calculs, tableaux de bord. Plateformes qui vendent un service, outils métier. | Les pages purement éditoriales ou promotionnelles : ça part dans `sites-web/` |
| `automatisations-ia/` | Automatisations, scripts et agents IA conçus pour des entreprises. **Pas d'interface principale pour l'utilisateur final.** | Tout produit auquel un utilisateur final se connecte et clique : ça part dans `applications/` |
| `documents/` | Documents non techniques : dossiers de cadrage, fiches projet, rapports, propositions commerciales, supports de présentation | Le code, qui va dans le dossier du projet correspondant |

## La distinction qui évite les doublons

| | `context/rapports/<projet>.md` | `livrables/documents/<projet>/` |
|---|---|---|
| **Nature** | Mon rapport de suivi interne | Les documents produits pour le projet ou le client |
| **Destinataire** | Wilfried, pour la gestion | Wilfried et/ou le client, transmissible |
| **Contenu type** | Historique, décisions prises, prochaines étapes, état d'avancement | Cahier des charges, proposition commerciale, dossier de présentation, rapport de livraison |
| **Producteur** | Moi, automatiquement | Nous deux, à la demande |

Si un document doit être envoyé à un client, il vit dans `livrables/`. S'il sert à Wilfried à piloter le projet, il vit dans `context/rapports/`.

---

## La règle de rangement : jamais automatique

**Je ne range jamais un projet tout seul.**

Avant de créer le dossier d'un projet nouveau, la séquence est obligatory :

1. **Wilfried décrit** ce que c'est.
2. **Je propose un classement** avec une courte justification : quel dossier, quel nom, pourquoi.
3. **J'attends sa validation.**
4. **Seulement alors**, je crée le dossier.

### Cas où je dois poser la question plutôt que trancher

- **Projet mixte.** Un site avec une automatisation derrière, une application qui vend aussi des contenus, un outil qui génère des documents pour ses clients. Je ne choisis pas seul, je pose une seule question ciblée.
- **Doute sur la catégorie.** Quand deux dossiers peuvent plausibly recevoir le projet, je pose la question.
- **Frontière sites-web / applications.** Un site vitrine avec un formulaire de contact qui enregistre en base, est-ce encore un site ? Je demande.

### Pourquoi cette règle

Le classement n'est pas cosmétique. Un site et une application ne se maintiennent pas de la même façon, ne se vendent pas de la même façon, et n'ont pas les mêmes exigences de sécurité. Un mauvais classement disperse le code et casse la logique de suivi. Le bon classement, c'est une décision rapide une fois, pas un débat à chaque fichier.

---

## Convention de nommage

**Minuscules, tirets, pas d'espace ni d'accent.**

| Type | Format | Exemple |
|---|---|---|
| Site | `site-<type>-<nom>` | `site-cadeau-marie-dupont` |
| Site | `site-vitrine-<nom>` | `site-vitrine-atelier-kone` |
| Application | `<nom-du-projet>` | `kofira` |
| Automatisation | `<nom-de-lautomatisation>` | `relance-impayes-whatsapp` |
| Dossier de documents | `<nom-du-projet>` | `kofira` |

### Structure d'un dossier de projet

Le minimum attendu, dans chaque sous-dossier de projet :

```
livrables/applications/mon-projet/
├── README.md        # ce que c'est, le statut, la stack, comment lancer
├── code/            # le code source (ou le dossier à la racine, si un seul composant)
└── ...
```

Le `README.md` du projet reprend l'information du dossier `context/rapports/<projet>.md`, et y renvoie. Il est le point d'entrée pour quelqu'un qui découvre le projet sans connaître l'historique.

---

## Ce que je range où, concrètement

| Situation | Destination |
|---|---|
| Un site cadeau commissioned pour un client | `livrables/sites-web/site-cadeau-<client>/` |
| Une plateforme web avec comptes et tableau de bord | `livrables/applications/<projet>/` |
| Un agent IA qui tourne pour une entreprise, sans interface | `livrables/automatisations-ia/<nom>/` |
| Un cahier des charges pour un projet précis | `livrables/documents/<projet>/cahier-des-charges.md` |
| Une proposition commerciale pour un client | `livrables/documents/<projet>/proposition-commercial.md` |
| Un document qui ne concerne aucun projet précis | `livrables/documents/<sujet>/` |
| Un rapport de suivi que je tiens pour Wilfried | `context/rapports/<projet>.md` |

---

## Les secrets

Tout projet avec des clés d'API a son **propre `.env`** à la racine de son dossier de projet.

Le `.gitignore` de la racine du workspace couvre automatiquement les sous-dossiers **si le workspace est un dépôt Git unique**. Si un projet devient un dépôt Git séparé (son propre `git init` avec sa propre remote), il faut lui copier un `.gitignore` : le `.gitignore` d'un dépôt ne s'applique qu'à ce dépôt, jamais à un dépôt imbriqué.

Le `.env` et le `.env.example` de la racine du workspace servent au workspace lui-même : outils, scripts, tests, et accès aux API que j'utilise pour produire les livrables.

Ne jamais afficher la valeur d'une clé dans une réponse, ne jamais la coller dans un fichier de code, et ne jamais la partager dans une conversation.
