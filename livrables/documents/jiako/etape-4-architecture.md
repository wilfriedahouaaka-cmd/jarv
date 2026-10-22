# Étape 4 : architecture JiaKo

> Le modèle de données, les routes, les fonctions, et la surface d'attaque de chaque brique.
> Rien n'est codé ici. C'est le plan qui décide de la position des murs avant de poser la moindre brique.
> Date : 22 octobre 2026.

---

## 1. La règle qui organise tout

**Deux surfaces, deux niveaux de confiance, et elles ne se touchent jamais.**

```
┌─────────────────────────────────┐        ┌─────────────────────────────────┐
│  SURFACE PRIVÉE                 │        │  SURFACE PUBLIQUE               │
│  authentifiée                   │        │  anonyme                        │
│                                 │        │                                 │
│  /app/etudes        /app/...    │        │  /r/<token>                     │
│  créer, éditer, résultats       │        │  répondre                       │
│                                 │        │                                 │
│  Rôles : anon, authenticated    │        │  Rôle : anon                    │
│  Clé : anon (publique)          │        │  Clé : anon (publique)          │
│  Sécurité : RLS                 │        │  Sécurité : RLS + fonctions RPC │
└─────────────────────────────────┘        └─────────────────────────────────┘
                     │                                    │
                     └───────────────┬────────────────────┘
                                     ▼
                        ┌─────────────────────────┐
                        │  SUPABASE               │
                        │  Auth + Postgres + RLS  │
                        │  + fonctions RPC        │
                        └─────────────────────────┘
```

**Ce que ça implique concrètement** : la page publique **n'a aucun droit** sur les tables par défaut. Elle n'écrit que par deux fonctions RPC qui font elles-mêmes toutes les vérifications. Si j'oubliais une vérification dans le code React, la base refuse quand même.

---

## 2. Le modèle de données

### Les tables

```
auth.users              (gérée par Supabase, hors de mon contrôle)
    │
    ├─── profils                1 par utilisateur
    │
    ├─── etudes                 N par utilisateur
    │       │
    │       ├─── questions      N par étude
    │       │
    │       ├─── reponses       N par étude      (anonyme, insert via RPC)
    │       │       │
    │       │       └─── reponses_items   N par réponse  (anonyme, insert via RPC)
    │       │
    │       └─── compteurs      1 par étude et par mois (quota)
    │
    └─── modeles                3 lignes, en seed, lecture seule
```

### `profils`

Extension de `auth.users`. Supabase crée l'utilisateur dans `auth.users` (email, mot de passe hashé), et un trigger crée la ligne dans `profils`.

| Colonne | Type | Règle |
|---|---|---|
| `id` | uuid | PK, référence `auth.users(id)` |
| `email` | text | Copie de `auth.users.email`, pour l'affichage |
| `plan` | text | `'gratuit'` par défaut. Valeurs : `gratuit`, `starter`, `pro`, `business` |
| `cree_le` | timestamptz | `now()` |

**Pourquoi copier l'email** : la table `auth.users` n'est pas lisible par le rôle `authenticated`. Sans cette copie, je ne peux pas afficher l'email dans le tableau de bord.

**Pourquoi un trigger** : si je faisais la création du profil côté React, un échec réseau laisserait un compte sans profil. Le trigger est dans la même transaction que la création du compte.

### `etudes`

| Colonne | Type | Règle |
|---|---|---|
| `id` | uuid | `gen_random_uuid()` |
| `proprietaire_id` | uuid | FK `profils(id)`, `ON DELETE CASCADE` |
| `titre` | text | `NOT NULL`, longueur 1 à 200 |
| `description` | text | Nullable |
| `modele_id` | uuid | FK `modeles(id)`, nullable (une étude peut être vide au départ) |
| `statut` | text | `brouillon` par défaut. Valeurs : `brouillon`, `publiee`, `fermee` |
| `token_public` | uuid | Nullable, unique. **Généré à la publication**, pas à la création |
| `cree_le` | timestamptz | `now()` |
| `publie_le` | timestamptz | Nullable |

**Le `token_public` est la pièce la plus sensible du schéma.** C'est lui qui donne accès en écriture à la base sans être connecté. Trois choix assumés :

1. **Séparé de `id`.** L'`id` sert au propriétaire dans l'URL privée. Le token sert au répondant. Si l'un fuit, l'autre reste intact.
2. **Généré seulement à la publication.** Une étude en brouillon n'a pas de token, donc pas de lien.
3. **Unique et régénérable.** Si un lien fuite, le propriétaire peut en générer un autre. L'ancien devient invalide. C'est le seul moyen de révoquer un lien déjà partagé.

**Ce qui reste à trancher** : est-ce que régénérer un token doit invalider les réponses déjà collectées ? Je propose **non**, les réponses sont conservées. À valider.

### `questions`

| Colonne | Type | Règle |
|---|---|---|
| `id` | uuid | `gen_random_uuid()` |
| `etude_id` | uuid | FK `etudes(id)`, `ON DELETE CASCADE` |
| `type` | text | Valeurs : `choix_unique`, `choix_multiple`, `echelle`, `texte_court` |
| `libelle` | text | `NOT NULL`, longueur 1 à 500 |
| `options` | jsonb | Nullable. Tableau pour les types à choix |
| `position` | integer | `NOT NULL`, commence à 0 |

**Pourquoi `options` en jsonb et pas une table** : les options n'ont jamais besoin d'être jointes à autre chose, ne sont jamais modifiées individuellement, et sont toujours lues en entier. Une table `options` ajouterait une jointure, une RLS de plus, et un risque de désordre dans les positions. Le jsonb est la bonne forme ici.

**Le type `echelle`** : 1 à 5, avec les libellés stockés dans `options`. C'est l'échelle la plus utilisée pour la satisfaction, et elle tient sur un écran de téléphone sans défilement.

### `reponses`

| Colonne | Type | Règle |
|---|---|---|
| `id` | uuid | `gen_random_uuid()` |
| `etude_id` | uuid | FK `etudes(id)`, `ON DELETE CASCADE` |
| `soumission_cle` | uuid | **Unique par étude.** C'est le mécanisme d'idempotence |
| `soumis_le` | timestamptz | `now()` |

**La `soumission_cle` est générée côté client** au chargement de la page de réponse, une seule fois, et réutilisée si l'utilisateur renvoie le formulaire. C'est ce qui empêche le double-clic et la reprise réseau de créer deux lignes.

### `reponses_items`

| Colonne | Type | Règle |
|---|---|---|
| `id` | uuid | `gen_random_uuid()` |
| `reponse_id` | uuid | FK `reponses(id)`, `ON DELETE CASCADE` |
| `question_id` | uuid | FK `questions(id)`, `ON DELETE CASCADE` |
| `valeur_texte` | text | Pour `texte_court` |
| `valeur_echelle` | integer | Pour `echelle`, contraint 1 à 5 |
| `valeur_options` | uuid[] | Pour `choix_unique` et `choix_multiple` |

**Pourquoi trois colonnes de valeur et pas un jsonb unique** : la contrainte de type se pose **dans la base**, pas dans le code. Une question de type `echelle` ne peut recevoir que `valeur_echelle`, et la contrainte le refuse. Si j'avais un jsonb unique, il faudrait valider dans le code, et une erreur de code deviendrait une donnée corrompue.

**Le tableau `uuid[]` pour les options** : un `choix_unique` est un tableau de 1 élément. Un seul type de colonne pour les deux, et la base peut compter avec `unnest()`.

### `compteurs`

| Colonne | Type | Règle |
|---|---|---|
| `etude_id` | uuid | FK `etudes(id)`, `ON DELETE CASCADE` |
| `mois` | date | Le premier jour du mois |
| `nb_reponses` | integer | `NOT NULL`, `DEFAULT 0` |
| `quota` | integer | `NOT NULL`, `DEFAULT 25` |
| | | PK composite (`etude_id`, `mois`) |

**Pourquoi une table dédiée et pas une colonne sur `etudes`** : le quota est mensuel. Sans cette table, il faudrait recalculer le nombre de réponses du mois à chaque soumission, ce qui est lent et surtout **non atomique**. La table se met à jour en une opération insécable.

---

## 3. Les fonctions RPC

Ce sont les seules portes d'entrée de la page publique. Trois d'entre elles.

### `lire_etude_publique(token)`

Prend le token, rend le titre, la description et les questions d'une étude **publiée uniquement**.

```
Entrée : p_token uuid
Sortie : jsonb  { titre, description, questions: [...] }
```

**Ce qu'elle vérifie** : que le token existe **et** que `statut = 'publiee'`. Une étude en brouillon ou fermée rend un vide, pas une erreur qui confirmerait l'existence du token.

**Ce qu'elle ne rend jamais** : le `proprietaire_id`, le `modele_id`, le `token_public`, ni rien d'une autre étude.

### `soumettre_reponse(token, cle, items)`

C'est la fonction la plus risquée du produit. Elle fait quatre choses dans **une seule transaction**, tout ou rien.

```
Entrée : p_token uuid, p_cle uuid, p_items jsonb
Sortie : uuid  (l'id de la réponse)

Séquence :
  1. Trouver l'étude par token
     └─ inexistante ou non publiée → erreur, transaction annulée

  2. Idempotence : existe-t-il déjà une réponse avec cette clé pour cette étude ?
     └─ OUI → retourner l'id existant, ne rien faire d'autre
     └─ NON → continuer

  3. Quota atomique : incrémenter le compteur du mois
     └─ UPDATE ... RETURNING  → si la limite est atteinte, erreur, transaction annulée

  4. Insérer la réponse et tous ses items
     └─ toute erreur → transaction annulée, le compteur est revenu en arrière aussi
```

**Pourquoi la séquence compte** : si je faisais l'insertion de la réponse avant de vérifier le quota, un quota dépassé laisserait une réponse orpheline. Si je faisais l'incrément du compteur avant l'idempotence, un double-clic consommerait deux quotas. L'ordre ci-dessus est le seul qui soit correct.

**Le point non négociable** : la fonction est `SECURITY DEFINER`, donc elle **contourne la RLS**. C'est un choix assumé, parce que la page publique n'a pas de `auth.uid()`. Mais ça impose trois règles strictes, écrites dans la fonction :

- `SET search_path = ''` et qualification complète (`public.etudes`), sinon un schéma malveillant pourrait intercepter les noms de tables
- `REVOKE EXECUTE ... FROM PUBLIC` et `GRANT EXECUTE ... TO anon` uniquement
- **Toutes** les vérifications écrites dans la fonction, jamais supposées

### `supprimer_reponse(reponse_id)`

Pour le droit d'effacement. Appelée par le propriétaire, et elle vérifie dans la fonction que la réponse appartient bien à une étude du propriétaire. Sinon, c'est un IDOR.

---

## 4. Le rate limiting

**Le besoin** : la page publique est ouverte par nature. Sans limite, un robot peut envoyer 10 000 réponses fausses en une heure et détruire l'utilité de l'étude.

**Le mécanisme** : une fonction **pre-request** de PostgREST, déclarée via `pgrst.db_pre_request`. Elle tourne **avant chaque requête** à l'API de données, voit les en-têtes HTTP, et peut rejeter.

```
Table private.rate_limits :
    ip        inet
    request_at timestamp

Fonction public.check_request() :
    - extraire l'IP depuis l'en-tête x-forwarded-for
    - ignorer les GET et HEAD (lecture seule)
    - compter les requêtes d'écriture de cette IP sur les 5 dernières minutes
    - au-delà du seuil → rejeter avec un code HTTP 420
    - sinon, enregistrer la requête
```

**Pourquoi `private.rate_limits` et pas `public`** : le schéma `private` n'est pas exposé par l'API de données. Sans ça, n'importe qui pourrait lire les adresses IP des répondants, ce qui est une donnée personnelle.

**Pourquoi les GET sont ignorés** : PostgREST sert les lectures via des réplicas en lecture seule, qui ne peuvent pas écrire. Tenter de limiter un GET échouerait silencieusement.

**Le seuil que je propose** : 30 écritures par IP sur 5 minutes. C'est assez pour un humain qui navigue, ça bloque un robot.

**Limite connue et acceptée** : cette protection est au niveau de l'API de données. Les fonctions RPC passent par le même chemin, donc elles sont couvertes. Mais un attaquant qui distribue ses requêtes sur beaucoup d'IP peut contourner. C'est une protection contre les robots, pas contre une attaque ciblée. J'écris ce risque comme accepté, pas résolu.

---

## 5. Les routes

### Surface privée

| Route | Page | Droits |
|---|---|---|
| `/connexion` | Formulaire de connexion | Public |
| `/inscription` | Formulaire d'inscription | Public |
| `/app` | Liste des études du propriétaire | Authentifié |
| `/app/etudes/nouvelle` | Créer depuis un modèle | Authentifié |
| `/app/etudes/:id` | Éditeur de questions | Authentifié **et propriétaire** |
| `/app/etudes/:id/resultats` | Résultats et export | Authentifié **et propriétaire** |

### Surface publique

| Route | Page | Droits |
|---|---|---|
| `/` | Page d'attente | Public |
| `/r/:token` | Page de réponse | Public, token valide |

**La vérification du propriétaire** se fait à deux niveaux : la garde de route côté React (confort), et la RLS côté base (réelle). La garde de route empêche l'utilisateur de voir une page qui va échouer. La RLS empêche la donnée de fuir. **Ce sont deux choses différentes**, et seule la seconde compte.

---

## 6. La RLS, table par table

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `profils` | Propriétaire | Trigger uniquement | Propriétaire | Interdit |
| `etudes` | Propriétaire | Propriétaire | Propriétaire | Propriétaire |
| `questions` | Propriétaire | Propriétaire | Propriétaire | Propriétaire |
| `reponses` | Propriétaire de l'étude | **RPC uniquement** | Interdit | Propriétaire de l'étude |
| `reponses_items` | Via la réponse | **RPC uniquement** | Interdit | Propriétaire de l'étude |
| `compteurs` | Propriétaire | RPC uniquement | RPC uniquement | Propriétaire |
| `modeles` | Tout le monde | Interdit | Interdit | Interdit |

**Le point à comprendre** : `reponses` et `reponses_items` n'ont **aucune policy INSERT**. Le droit d'insert n'existe que dans la fonction RPC. C'est ce qui rend la page publique sûre : même en fabriquant une requête à la main, le rôle `anon` ne peut pas insérer directement.

**La subtilité sur `reponses`** : la policy SELECT utilise une sous-requête sur `etudes` pour vérifier que l'étude appartient à l'utilisateur. Sans ça, la policy ne saurait pas à qui appartient la réponse.

---

## 7. La surface d'attaque, fonctionnalité par fonctionnalité

### F1. Authentification

| Surface | Menace | Traitement |
|---|---|---|
| Force brute sur `/connexion` | Un robot devine le mot de passe | Géré par Supabase (limitation native) |
| Fuite de session | Le jeton est volé | Supabase gère l'expiration et le rafraîchissement |
| Route privée sans session | On accède à `/app` sans être connecté | Garde de route React + RLS |
| **Clé `service_role` dans le navigateur** | Lecture et écriture totale, sans restriction | **Jamais dans le code.** Elle ne doit pas apparaître dans le bundle |

**Le risque n°1 ici** est la clé `service_role`. Si elle est dans `.env` sans préfixe `VITE_`, elle ne sera pas embarquée. Si quelqu'un la met avec `VITE_`, elle sera visible dans le JavaScript livré au navigateur. Je vérifie ça explicitement au premier commit.

### F2. Édition des questions

| Surface | Menace | Traitement |
|---|---|---|
| Question sans libellé | Étude inutilisable | Contrainte `NOT NULL` et longueur |
| Trop de questions | Une étude de 500 questions | Limite posée à la création, testée |
| Question sensible (santé, religion) | Donnée sensible collectée | **Aucune protection technique possible.** C'est une limite assumée, documentée dans l'interface |
| Modification pendant la collecte | Le répondant voit une question différente de celle du résultat | La page publique lit au chargement. À tester |

### F3. Page publique de réponse, la zone critique

| Surface | Menace | Traitement |
|---|---|---|
| Double clic | Deux réponses identiques | `soumission_cle` unique, l'insertion échoue silencieusement |
| Reprise réseau | Le répondant renvoie après une coupure | Même clé, même résultat : une seule réponse |
| Crash au milieu | Réponse sans items | Transaction unique, tout ou rien |
| Quota dépassé | Plus de 25 réponses | Compteur atomique dans la base |
| Attaquant en forgeant des requêtes | Écriture directe dans les tables | Aucune policy INSERT, RPC obligatoire |
| Injection SQL | Exécution de code dans la base | Supabase paramètre toutes les requêtes |
| Token deviné | Accès à une étude | UUID, 122 bits d'entropie, non devinable |
| Envoi en masse | 10 000 réponses factices | Rate limiting par IP, honeypot |
| Question hors sujet | `valeur_echelle = 999` | Contrainte 1 à 5 dans la base |
| Question d'une autre étude | L'attaquant passe un `question_id` d'une autre étude | **Vérification dans la RPC** que la question appartient à l'étude du token |

**Le dernier point mérite une insistance** : sans cette vérification, un attaquant pourrait écrire des réponses dans l'étude A en passant les questions de l'étude B. Les données seraient fausses et corrompues, sans erreur visible. C'est le cas limite le plus facile à oublier et le plus coûteux.

### F4. Résultats

| Surface | Menace | Traitement |
|---|---|---|
| XSS via texte libre | `<script>` stocké et affiché | React échappe par défaut. **Aucun `dangerouslySetInnerHTML`** |
| Graphique sur 3 réponses | Rendu cassé | Testé aux extrêmes, 0 et 500 |
| Lecteur non propriétaire | Lecture des résultats d'autrui | RLS sur la jointure `reponses` → `etudes` |

### F5. Export CSV

| Surface | Menace | Traitement |
|---|---|---|
| Injection de formule | Un répondant écrit `=cmd|calc` | Préfixe `'` sur toute cellule commençant par `=`, `+`, `-`, `@` |
| Mauvais encodage | Accents cassés dans Excel | BOM UTF-8 en tête de fichier |
| Séparateur | Point-virgule attendu en locale française | Séparateur `;` |
| Export massif | 50 000 lignes qui figent l'onglet | Plafonné, pagination annoncée |

---

## 8. Le plan de construction

L'architecture donne l'ordre, et l'ordre est le même que celui de l'étape 1, mais avec les dépendances rendues explicites.

| # | Ce que je construis | Ça dépend de | Livrable testable |
|---|---|---|---|
| 0 | Projet Vite, tokens de design, `.env`, `.gitignore` | Rien | Le projet tourne |
| 1 | Migrations : tables + RLS + policies + seed des 3 modèles | Étape 0 | Les tables existent, la RLS refuse |
| 2 | Fonction `check_request`, rate limiting | Étape 1 | Une requête au-delà du seuil est rejetée |
| 3 | Inscription, connexion, session, garde de route | Étape 1 | On peut se connecter |
| 4 | Trigger `profils` | Étape 1 et 3 | Un compte crée son profil |
| 5 | CRUD études | Étape 1 et 3 | Créer, lister, supprimer |
| 6 | Éditeur de questions, 4 types | Étape 5 | Écrire les 4 types |
| 7 | Publication, génération du `token_public` | Étape 5 | Le lien existe |
| 8 | RPC `lire_etude_publique` | Étape 1 | La page publique affiche les questions |
| 9 | RPC `soumettre_reponse` | Étape 1 | Une réponse s'enregistre, le quota bloque |
| 10 | Page de réponse, mobile d'abord | Étape 8 et 9 | Un vrai téléphone répond |
| 11 | Résultats : comptages, barres, texte | Étape 9 | Voir les réponses |
| 12 | Export CSV sécurisé | Étape 11 | Ouvrir dans Excel, pas de formule |
| 13 | Tests sécurité : accès croisé, XSS, IDOR, double soumission, spam | Tout | **Avant toute bêta** |
| 14 | Déploiement, en-têtes de sécurité | Tout | En ligne |

**Le test d'accès croisé à l'étape 13 est non négociable.** Deux comptes, deux études, et la tentative de lecture des réponses de l'autre. S'il passe, la RLS tient. S'il échoue, rien d'autre ne compte.

---

## 9. Ce que je n'ai pas résolu

Trois points restent ouverts, et je les écris plutôt que de faire semblant qu'ils sont réglés.

| Point | Ce qui manque | Quand le trancher |
|---|---|---|
| Régénérer un token invalide-t-il les réponses ? | Je propose non, mais c'est une décision produit | Avant l'étape 7 |
| Honeypot : quel champ, quelle logique ? | Une décision simple, mais elle doit être décidée avant l'étape 10 | Avant l'étape 10 |
| Suppression d'une réponse par le répondant lui-même ? | La loi exige un droit d'accès et d'effacement. Le propriétaire peut supprimer. Le répondant, anonyme, n'a pas d'identifiant | À trancher avec le juriste |

---

## 10. Récapitulatif

**Ce qui est posé** : deux surfaces à niveau de confiance séparé, 7 tables avec leurs contraintes, 3 fonctions RPC dont la plus risquée est décrite séquence par séquence, une protection par IP qui tourne avant chaque requête, la RLS table par table, et la surface d'attaque de chaque fonctionnalité.

**Le cœur du dispositif** est en trois mots : **aucune policy INSERT sur les tables de réponse**. Tout écrit par la page publique passe par une fonction qui vérifie tout. Si le code React contient un bug, la base refuse quand même.

**Ce que je fais maintenant** : j'attends ton accord sur l'architecture, puis je construis l'étape 0, un fichier à la fois.
