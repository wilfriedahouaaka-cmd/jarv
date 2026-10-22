# GUIDE DE SÉCURITÉ

> Référence permanente pour développeur (Junior → Senior).
> **Document unique.** Les niveaux junior, intermédiaire et senior sont fusionnés en un seul standard : chaque exigence porte un niveau de criticité, et tu sais toujours où tu en es.

| Champ | Valeur |
|---|---|
| Objetif | Rester capable de sécuriser, maintenir et faire évoluer soi-même |
| Contenu | Standard de sécurité unifié, attaques courantes, 10 défis d'ingénierie, checklist avant projet, posture permanente |
| Document original | `GUIDE-COMPLET.pdf` (archive, non modifié) |
| Protocole d'application | `GUIDE-TRAVAIL.md` (à la racine du workspace) |
| Formulaire à remplir | `CHECKLIST-TRAVAIL.md` (dans ce dossier) |
| À utiliser pour | JiaKo, Kofira et tout futur projet web ou mobile |

Règle d'or : **la sécurité et la solidité technique ne sont pas des fonctionnalités qu'on ajoute à la fin. Ce sont des contraintes présentes dès le premier jour.**

---

## 0. Comment lire ce guide

### 0.1 Les trois niveaux sont devenu une seule exigence

Avant, le guide était coupé en trois blocs : niveau junior, niveau intermédiaire, niveau senior. Ça marchait mais ça mentait un peu, parce qu'un développeur qui ne fait que du niveau junior peut croire qu'il "a fait la partie junior" alors que la partie intermédiaire est celle qui évite les mauvaises surprises en production.

Ici, chaque exigence porte une criticité. Tu n'as plus trois documents à empiler, tu as une liste unique où tu vois ce qui est obligatoire maintenant et ce qui peut attendre.

| Criticité | Signification | Quand elle s'applique |
|---|---|---|
| **Critique** | Aucune exception. Ne se reporte jamais. | Dès la première version, même en local, même pour un prototype |
| **Important** | Obligatoire dès que le projet est accessible à un tiers | Dès la mise en ligne avec de vrais utilisateurs, ou dès que la donnée a de la valeur |
| **Avancé** | Obligatoire quand le projet grandit | Mise à l'échelle, production, données sensibles, concurrence réelle |

### 0.2 L'équivalence avec les anciens niveaux

| Ancien niveau | Ce que ça devient ici |
|---|---|
| Junior / débutant | Les exigences **Critiques** de ce guide, sans exception ni report |
| Intermédiaire | Les exigences **Critiques** + **Importantes** |
| Senior / Pro | Les exigences **Critiques** + **Importantes** + **Avancées**, plus le modèle de menaces |

Autrement dit : **tu ne peux pas être « niveau junior intermittent »**. Toute exigence critique s'applique, même si tu débutes. Le reste, tu l'actives quand le projet le justifie.

### 0.3 La règle qui départage tout

> « Je ne fais pas confiance au frontend. Tout ce qui est important est vérifié et protégé côté serveur. »

Si tu as le doute sur une exigence, cette phrase tranche. Le frontend est une commodité, il est sous le contrôle de l'utilisateur. Le serveur, c'est ton territory.

---

## 1. Les 5 règles qui ne se négocient pas

Ce sont les cinq exigences qui, si elles sont respectées, évitent la majorité des incidents. Toutes sont de criticité **Critique**.

1. **Aucun secret dans le code.** Clés API, mots de passe de base, tokens : tout vit dans des variables d'environnement, jamais dans le frontend, jamais dans Git.
2. **Validation systématique côté serveur.** Le navigateur envoie ce qu'il veut, y compris des données forgées. Tout est revérifié, typé et borné côté serveur.
3. **Permissions vérifiées à chaque requête.** Être connecté ne donne aucun droit implicitement. Chaque accès est contrôlé sur la ressource précise.
4. **HTTPS obligatoire**, sans exception, y compris en test.
5. **Mots de passe hashés** (bcrypt ou argon2), jamais stockés ni journalisés en clair.

Le reste du guide est du détail par rapport à ces cinq lignes. Si tu ne retiens qu'une chose, retiens-les.

---

## 2. Le standard de sécurité, thème par thème

Vue d'ensemble. Chaque ligne de ce tableau est expanded en détail juste après.

| # | Thème | Ce qu'on fait | Critère de vérification | Criticité |
|---|---|---|---|---|
| 2.1 | Mots de passe | Hash bcrypt ou argon2, sel automatique, jamais en clair | La base ne contient aucun mot de passe lisible | Critique |
| 2.2 | Sessions | Cookies httpOnly + Secure + SameSite, durée limitée, invalidation au logout | Un cookie volé ne donne pas une session lasting | Critique |
| 2.3 | Validation des entrées | Schéma validé côté serveur, type + longueur + format + bornes | Injecter une valeur invalide est refusé, pas interprété | Critique |
| 2.4 | Autorisation | Contrôle du propriétaire de la ressource à chaque requête | Changer un ID dans l'URL ne change rien | Critique |
| 2.5 | Injection SQL | Requêtes paramétrées ou ORM, jamais de concaténation | Aucune chaîne SQL construite à partir d'une saisie | Critique |
| 2.6 | XSS | Échappement à l'affichage + Content Security Policy | Un `<script>` stocké s'affiche comme texte | Critique |
| 2.7 | CSRF | Token anti-CSRF ou cookie SameSite sur les actions sensibles | Un site tiers ne peut pas déclencher une action | Important |
| 2.8 | Secrets et config | `.env` non commité, `.env.example` fourni, clés au moindre privilège | `git grep` ne trouve aucun secret réel | Critique |
| 2.9 | Rate limiting | Seuil par action, par IP ou utilisateur, par fenêtre | 10 tentatives de login échouent, la 11e est bloquée | Important |
| 2.10 | Fichiers et liens publics | Type et taille validés, nom serveur, expiration des liens | Un `.exe` ou un fichier de 2 Go est refusé | Important |
| 2.11 | Logs et audit | Actions sensibles journalisées, journal non exposé au public | Une tentative échouée est retrouvable dans les logs | Important |
| 2.12 | Infrastructure | HTTPS, en-têtes de sécurité, sauvegardes, migration sans downtime | Le site reste accessible pendant une mise à jour | Important / Avancé |
| 2.13 | Règles base de données | RLS activée sur les tables cloisonnées | Un utilisateur ne peut pas lire la table d'un autre | Important |
| 2.14 | Fiabilité de l'IA | Vérifier avant d'appliquer, jamais de confiance aveugle | Chaque choix technique est justifié et testé | Critique |

---

### 2.1 Mots de passe

**Règle.** On ne stocke jamais un mot de passe. On stocke un hash salé. bcrypt ou argon2, jamais MD5 ou SHA1 seul.

**Pourquoi.** Une fuite de base de données est une question de temps. Avec des hashes bcrypt, l'attaquant doit casser chaque mot de passe séparément, ce qui rend le vol massively plus cher. Avec des mots de passe en clair, la fuite est une perte totale, immédiate et définitive.

**Implémentation.**
- bcrypt avec un coût de 10 minimum (argon2id est encore mieux si ta lib le gère)
- Sel automatique, fourni par la lib, jamais par toi
- Comparaison par fonction `compare`, jamais par égalité de chaînes
- Réinitialisation de mot de passe par token à usage unique et à expiration, jamais par un lien permanent

**Test.** Connecte-toi avec le mauvais mot de passe 5 fois, ça doit échouer proprement. Cherche le mot de passe dans la base, il ne doit pas être lisible.

**Criticité : Critique.**

---

### 2.2 Sessions et cookies

**Règle.** Un cookie de session porte `httpOnly`, `Secure` et `SameSite`. Il expire. Le logout invalide réellement la session côté serveur.

**Pourquoi.** `httpOnly` empêche le JavaScript de la page de lire le cookie, ce qui coupe le vol de session par XSS. `Secure` interdit l'envoi en clair. `SameSite` coupe le CSRF sur la plupart des cas. Sans invalidation serveur, un token volé reste valable jusqu'à expiration, ce qui peut faire des semaines.

**Implémentation.**
- `httpOnly: true`, `secure: true` en production, `sameSite: 'lax'` ou `'strict'` selon le besoin
- Durée de vie courte, avec renouvellement (rotation de l'ID de session) après connexion
- Le logout supprime le cookie **et** invalide l'entrée en base, pas seulement le cookie
- Stocke l'ID de session en base ou dans un store, jamais les détails sensibles dedans

**Test.** Ouvre les outils de développement, le cookie de session ne doit pas être lisible en JavaScript. Connecte-toi, déconnecte-toi, utilise l'URL de la page protégée avec l'ancien cookie : accès refusé.

**Criticité : Critique.**

---

### 2.3 Validation des entrées

**Règle.** Toute donnée qui arrive du client est traitée comme non fiable. Elle est validée par un schéma côté serveur : type, longueur, format, bornes, valeurs autorisées.

**Pourquoi.** Le validation côté client est du confort, pas de la sécurité. Elle se contourne en une ligne dans la console du navigateur. Le serveur est le seul endroit où la validation a du sens, parce que c'est le seul endroit que l'utilisateur ne contrôle pas.

**Implémentation.**
- Un schéma de validation par endpoint (zod, valibot, ou equivalent côté serveur)
- Refuser avec un message d'erreur explicite, jamais un 500 opaque
- Longueurs maximales pour éviter les abus de mémoire et les payloads géants
- Échappement systématique avant affichage, en plus de la validation
- Ne jamais valider uniquement le format, valider aussi le sens (une quantité négative, un ID qui n'existe pas)

**Test.** Envoie `{"email": "pas-un-email"}`, `{"prix": -50}`, `{"nom": "x".repeat(100000)}`, un tableau au lieu d'un objet. Chaque cas doit être refusé proprement.

**Criticité : Critique.**

---

### 2.4 Autorisation et accès aux données

**Règle.** À chaque requête qui lit ou écrit une ressource, on vérifie que l'utilisateur courant a le droit sur **cette ressource précise**. « L'utilisateur est connecté » ne veut rien dire.

**Pourquoi.** C'est la faille IDOR, la plus fréquente en pratique. L'utilisateur manipule un identifiant dans l'URL ou dans le corps de la requête et accède aux données d'un autre. La validation passe, l'authentification passe, et tu as une fuite de données personnelles.

**Implémentation.**
- Toutes les requêtes de données filtrées par `user_id`, dans la requête SQL elle-même, pas en JavaScript après coup
- Les ressources d'un autre ne doivent jamais être renvoyées, même pas un "404" qui confirme leur existence si elle est sensible
- Contrôle de rôle vérifié côté serveur à chaque action d'administration
- Cas particulier : un accès "public" (lien de partage) doit être un jeton opaque, devinable impossible, avec expiration et révocation possible

**Test.** Connecté en user A, remplace l'ID de l'URL par un ID de user B. Tu dois obtenir un refus, jamais la donnée de B. Teste aussi avec un token d'admin forgé.

**Criticité : Critique.**

---

### 2.5 Injection SQL

**Règle.** Jamais de concaténation de chaîne pour construire une requête. Requêtes paramétrées ou ORM, systématiquement.

**Pourquoi.** L'injection SQL est la faille la plus destructive en volume de données volées, parce qu'elle contourne l'authentification et l'autorisation en une seule requête.

**Implémentation.**
- Requêtes paramétrées (`$1`, `?`) ou ORM (Prisma, Drizzle, Knex)
- Tri et nom de colonne par liste blanche, jamais par valeur utilisateur directe
- Le compte de base de données de l'application a le minimum de droits, pas `superuser`
- Aucun message d'erreur technique exposé au client, on journalise côté serveur

**Test.** Tape `'; DROP TABLE users; --` dans un champ de recherche. La recherche doit échouer ou ne rien trouver, et la table doit être intacte.

**Criticité : Critique.**

---

### 2.6 XSS et rendu du contenu

**Règle.** Tout contenu qui vient d'un utilisateur est échappé à l'affichage. Une Content Security Policy est définie.

**Pourquoi.** Un XSS permet de voler une session, de rediriger vers une page de phishing, ou d'exécuter des actions au nom de l'utilisateur, dans son navigateur.

**Implémentation.**
- Échappement par défaut dans le framework, désactivé explicitement et uniquement quand nécessaire
- CSP stricte, sans `unsafe-inline` si on peut l'éviter
- `rel="noopener noreferrer"` sur les liens `target="_blank"`
- Sanitisation avec une lib éprouvée (DOMPurify) quand on doit autoriser du HTML riche
- Les URL fournies par l'utilisateur sont validées (protocole `http` ou `https` uniquement, pas `javascript:`)

**Test.** Stocke `<script>alert(1)</script>` dans un champ texte. Il doit s'afficher comme texte. Vérifie ensuite que la console du navigateur ne signale aucune violation CSP sur tes pages réelles.

**Criticité : Critique.**

---

### 2.7 CSRF

**Règle.** Les actions sensibles (changement d'état) sont protégées par un token anti-CSRF ou par un cookie `SameSite` strict.

**Pourquoi.** Le CSRF exploite le fait que le navigateur envoie automatiquement les cookies. Une page tierce peut donc déclencher une action en ton nom sans que tu t'en rendes compte.

**Implémentation.**
- Token synchronizer ou double submit cookie, comparé côté serveur
- `SameSite: 'strict'` sur les cookies qui portent l'état d'authentification, quand l'application le permet
- Les requêtes de modification ne sont jamais acceptées en GET
- Ne pas se contenter du header `Origin` seul, c'est une défense complémentaire et non suffisante

**Criticité : Important.** Elle monte à **Critique** dès qu'il y a des actions sensibles sans authentification forte (paiement, changement d'email, suppression).

---

### 2.8 Secrets et configuration

**Règle.** Aucun secret dans le code, dans le frontend, dans l'historique Git. Tout passe par des variables d'environnement.

**Pourquoi.** Un secret commité est un secret perdu, même si tu le supprimes ensuite, parce que l'historique Git le conserve. Et un secret dans le frontend est un secret public, puisque le navigateur reçoit le bundle.

**Implémentation.**
- `.env` local, jamais commité, `.env.example` avec les clés vides
- Les secrets vivent chez l'hébergeur (Vercel, Supabase, Netlify), dans les variables d'environnement de production
- Clés API avec le moindre privilège, une clé par usage et par environnement
- Rotation possible, donc jamais de secret codé en dur qui ne pourrait pas être remplacé
- `.gitignore` vérifié, et un scan de l'historique fait avant toute mise en ligne

**Test.** `git grep -i "secret\|api_key\|password"` sur l'ensemble du dépôt. Tout ce qui sort doit être un exemple ou une variable.

**Criticité : Critique.**

---

### 2.9 Rate limiting

**Règle.** Toute action susceptible d'être abusée a un plafond. Par IP, par utilisateur, ou les deux, sur une fenêtre de temps définie.

**Pourquoi.** Sans plafond, un bot peut envoyer des milliers de requêtes par seconde. Ça coûte de l'argent, ça dégrade le service pour les vrais utilisateurs, et ça ouvre la porte au spam, au brute force et au DDoS.

**Implémentation.**
- Plafonds sur : login, inscription, mot de passe oublié, formulaires publics, génération de liens de partage, endpoints d'API coûteux
- Exemples de départ : 5 tentatives de login par minute et par IP, 10 créations de formulaire par heure et par utilisateur, 100 requêtes API par minute
- Solution : middleware Vercel, Nginx, Cloudflare, ou une lib type `rate-limiter-flexible`
- Réponse claire et courte quand le plafond est atteint, jamais un plantage serveur
- Le plafond ne doit pas pouvoir être contourné par simple rotation d'IP, d'où l'intérêt du double comptage IP + utilisateur

**Test.** Boucle 10 tentatives de login en une minute, la suite doit être bloquée avec un message clair.

**Criticité : Important.** Elle monte à **Critique** sur l'authentification et sur tout endpoint qui crée de la donnée ou déclenche un coût.

---

### 2.10 Fichiers, uploads et liens publics

**Règle.** Type, taille et contenu des fichiers sont validés côté serveur. Les liens publics sont des jetons opaques, expirables et révocables.

**Pourquoi.** Un upload non contrôlé permet d'héberger un script malveillant sous ton domaine. Un lien public permanent et devinable, c'est une donnée privée exposée en permanence.

**Implémentation.**
- Liste blanche des types MIME et des extensions, vérifiée sur le contenu et pas seulement sur le nom
- Taille maximale, et limitation du nombre de fichiers
- Nom de fichier.regénéré par le serveur, le nom d'origine ne sert qu'à l'affichage
- Stockage hors du dossier servi publiquement quand c'est possible
- Liens de partage : identifiant aléatoire long, expiration, révocation, et pas d'indexation

**Criticité : Important.**

---

### 2.11 Logs, supervision et audit

**Règle.** Les actions sensibles sont journalisées, et on sait reconnaître un comportement anormal.

**Pourquoi.** Sans journal, tu ne peux pas détecter une attaque en cours, ni comprendre ce qui s'est passé après un incident. Tu l'apprends de l'attaquant, ou du client.

**Implémentation.**
- Journaliser : connexions réussies et échouées, changements de mot de passe, actions d'administration, suppressions, refus de permission
- Ne jamais journaliser de secret ni de mot de passe en clair, y compris dans les erreurs
- Seuils d'alerte : pic de tentatives échouées, pic de créations, usage anormal d'un endpoint
- Conservation définie, et accès aux logs réservé

**Criticité : Important.**

---

### 2.12 Infrastructure et déploiement

**Règle.** HTTPS, en-têtes de sécurité, sauvegardes, et mises à jour qui ne cassent pas l'application.

**Implémentation.**
- HTTPS automatique chez Vercel et Netlify, redirection forcée
- En-têtes : `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options` ou CSP `frame-ancestors`
- Sauvegardes de la base testées au moins une fois, pas seulement configurées
- Migrations backward-compatible : on ajoute avant de supprimer, on déploie en deux temps
- Capacité de retour arrière immédiate (feature flag ou rollback de version)
- Surveillance du taux d'erreur et des temps de réponse en production

**Criticité : Important.** Le zero-downtime et le déploiement progressif sont **Avancés** (point 7 des 10 défis).

---

### 2.13 Règles de base de données (RLS)

**Règle.** Quand tu cloisonnes des données par utilisateur, la base elle-même refuse les accès non autorisés.

**Pourquoi.** Une RLS active est une défense qui ne dépend pas de ton code. Même si tu oublies un filtre dans une requête, la base refuse quand même. C'est le filet de sécurité sous l'application.

**Implémentation.**
- RLS activée sur chaque table contenant des données personnelles ou métier cloisonnées
- Les policies reflètent exactement les règles d'autorisation de l'application, et les deux sont revues ensemble
- Le rôle de l'application n'est pas `superuser` ni `service_role` pour les requêtes utilisateur
- Tests qui ESSAIENT de contourner la RLS, pour prouver qu'elle tient

**Criticité : Important.**

---

### 2.14 Fiabilité de l'IA dans le code

**Règle.** L'IA est un accélérateur, pas une source de vérité. Chaque choix technique et chaque mesure de sécurité est vérifié avant d'être livré.

**Pourquoi.** L'IA invente des API qui n'existent pas, des meilleures pratiques qui ne sont pas réelles, et peut produire un code qui a l'air sécurisé sans l'être. Le code peut être elegant, documenté, et néanmoins avoir une faille qu'aucune relecture rapide ne verrait.

**Implémentation.**
- Demander systématiquement : « Quelles sont les surfaces d'attaque de cette fonctionnalité ? » et « Explique les mesures de sécurité mises en place et pourquoi. »
- Vérifier que chaque API, chaque option de config et chaque dépendance existe réellement, dans la documentation officielle
- Tester soi-même les cas limites, ne pas se contenter du « ça marche chez moi »
- Aucun commit d'un bloc généré sans l'avoir lu, compris et testé
- Pour les domaines sensibles (financier, légal, médical), une vérification humaine supplementaire obligatoire

**Criticité : Critique.** C'est le seul point qui s'applique même quand tu écris tout le code toi-même.

---

## 3. Les attaques les plus courantes

| Attaque | Ce que c'est | Comment se protéger | Renvoi |
|---|---|---|---|
| XSS | Injection de code JavaScript malveillant | Échappement à l'affichage + CSP | 2.6 |
| CSRF | Forcer une action à l'insu de l'utilisateur | Tokens anti-CSRF / SameSite | 2.7 |
| Injection SQL | Modifier les requêtes base de données | ORM ou requêtes paramétrées | 2.5 |
| Brute force | Tester des milliers de mots de passe | Rate limiting + blocage temporaire | 2.9 |
| IDOR | Accéder aux données d'un autre en changeant un ID | Permissions vérifiées à chaque requête | 2.4 |
| Spam / Bots | Remplir un formulaire en masse | Rate limiting + honeypot / captcha | 2.9 |
| Vol de session | Récupérer le token de connexion | httpOnly + Secure, durée limitée | 2.2 |
| DoS / DDoS | Saturer le serveur avec trop de requêtes | Rate limiting + reverse proxy + CDN | 2.9, 2.12 |
| Clickjacking | Superposer une page invisible à une vraie page | `X-Frame-Options` / CSP `frame-ancestors` | 2.12 |
| Fuite de secret | Clé API ou token exposé publiquement | Variables d'environnement, scan avant mise en ligne | 2.8 |

---

## 4. Les 10 défis d'ingénierie logicielle critiques

Ils arrivent dans les applications réelles. Les connaître te permet d'anticiper au lieu de les découvrir en production. Pour chacun : le niveau d'application, et la question à poser à l'IA.

| # | Défi | Problème et risque | Ce qu'il faut faire | Criticité | Question à poser à l'IA |
|---|---|---|---|---|---|
| 01 | Concurrence / race conditions | Deux utilisateurs cliquent en même temps sur la dernière place. Les deux paient, un seul devrait l'avoir. Risque : survente, double attribution | Verrouillage optimiste ou pessimiste, transactions atomiques, file d'attente, ou claim avec expiration. Jamais un simple `if stock > 0` | Important si concurrence réelle, sinon Avancé | « Que se passe-t-il si deux personnes valident en même temps ? » |
| 02 | Idempotence | Double clic, timeout réseau, client qui réessaie. Risque : double facturation, litiges | Clé d'idempotence sur chaque action critique. Si la même clé revient, on retourne le résultat connu sans ré-exécuter | Critique sur paiement et création | « Cette action peut-elle être rejouée sans effet de bord ? » |
| 03 | Résilience et atomicité | Crash au milieu d'un transfert ou d'une opération multi-étapes. Risque : argent débité d'un côté, pas crédité de l'autre | Transactions ACID, Saga, Outbox, compensation (rollback métier), ou at-least-once + idempotence | Important dès multi-étapes | « Que se passe-t-il si le serveur tombe au milieu ? » |
| 04 | Scalabilité | L'app marche à 1 000 utilisateurs, un pic la multiplie par 100. Risque : base saturée, timeouts, site inaccessible | Scale horizontal stateless, cache, CDN, rate limiting, files d'attente, tests de charge. Anticiper le goulot, souvent la base | Avancé | « Quel est le goulot d'étranglement si le trafic x100 ? » |
| 05 | Autorisation et IDOR | L'utilisateur change un ID et accède aux données d'un autre ou à une fonction admin. Risque : fuite de données | Vérifier à CHAQUE requête que l'utilisateur a le droit sur cette ressource précise | Critique | « Cette vérification empêche-t-elle l'IDOR ? » |
| 06 | Cohérence multi-services | Une commande implique paiement + stock + commande. Un service plante au milieu | Éviter les transactions distribuées fragiles. Orchestrateur, Saga, Outbox, messages idempotents. Cohérence eventual assumée | Avancé | « Quelle est la source de vérité si deux services divergent ? » |
| 07 | Déploiement sans downtime et migrations | Changement de schéma ou de version pendant que des utilisateurs sont connectés. Risque : erreurs 500, données corrompues | Migrations backward-compatible, dual-write, feature flags, blue/green ou rolling deploy. Toujours pouvoir revenir en arrière | Important | « Cette migration casse-t-elle l'app en production ? » |
| 08 | Synchronisation offline et conflits | Même donnée modifiée sur deux appareils ou en offline. Risque : écrasement silencieux | Stratégie de résolution claire (last-write-wins, merge, ou intervention utilisateur), timestamps, versioning, tests de scénarios de conflit | Avancé | « Que se passe-t-il si la donnée a été modifiée ailleurs ? » |
| 09 | Fiabilité de l'IA | L'IA invente des API, des comportements, des bonnes pratiques. Risque : code incorrect, failles | Toujours vérifier. Demander des sources et des exemples testables. Tester soi-même. Jamais de confiance aveugle | Critique | « Cette API existe-t-elle vraiment ? Comment la tester ? » |
| 10 | Systèmes distribués et CAP | Deux serveurs divergent. Risque : deux vérités différentes | On ne peut pas avoir Cohérence + Disponibilité + Tolérance aux partitions à la fois. Choisir explicitement et documenter | Avancé | « Quelle garantie de cohérence est-ce que je choisis et pourquoi ? » |

---

## 5. Avant de démarrer un projet

Web ou mobile, idée trouvée sur un réseau, projet perso ou business. Ces étapes sont obligatoires pour ne pas partir dans le vide.

### 5.1 Clarifier l'idée

- Quel problème précis l'application résout-elle ?
- Qui a ce problème le plus souvent (cible exacte) ?
- Comment ces personnes le résolvent-elles aujourd'hui ?
- Pourquoi ta solution serait-elle meilleure ou plus simple ?
- Quelle valeur principale l'utilisateur gagne-t-il ?
- Est-ce un besoin fréquent ou rare ?

Si tu ne peux pas répondre en 2-3 phrases claires, l'idée est encore trop vague.

### 5.2 Recherche sur le problème et le marché

- Le problème est-il réellement ressenti par beaucoup de gens ?
- Existe-t-il des discussions, plaintes ou demandes sur ce sujet (forums, Reddit, X, groupes Facebook) ?
- Quelle est la taille approximative du marché ou de l'audience ?
- Y a-t-il des tendances (croissance, réglementation, nouvelles habitudes) qui favorisent la solution ?

### 5.3 Analyse des concurrents

- Qui propose déjà une solution, même imparfaite ?
- Leurs points forts et faibles (avis utilisateurs)
- Ce qu'ils ne font pas, ou font mal, et que tu ferais mieux
- Comment te différencier sans révolutionner le marché

### 5.4 Validation de la cible

- As-tu parlé à de vraies personnes de ta cible ?
- As-tu testé l'intérêt (sondage, landing page, précommandes, discussions) ?
- Les gens disent-ils « je l'utiliserais » ou « je paierais pour ça », pas seulement « c'est une bonne idée » ?

### 5.5 Faisabilité technique et légale

- As-tu les compétences (ou l'accès à l'IA et la capacité de valider) pour construire le MVP ?
- Contraintes légales fortes (santé, finance, enfants, données personnelles) ?
- Conditions d'utilisation et politique de confidentialité nécessaires ?
- Réglementations sectorielles (RGPD, etc.) ?
- Bases de sécurité prévues : auth, HTTPS, validation, permissions, rate limiting

### 5.6 Définition du MVP

- MVP décrit en une phrase claire
- 3 à 5 fonctionnalités vraiment indispensables (must-have), séparées des nice-to-have
- Parcours utilisateur principal décrit étape par étape

### 5.7 Préparation avant de coder

- Cahier des charges ou document de cadrage rédigé
- Stack technique choisie et justifiée
- Outils d'organisation prêts
- Ce guide relu, et le formulaire `CHECKLIST-TRAVAIL.md` rempli pour le projet
- Les 10 défis parcourus : lesquels s'appliquent déjà au MVP ?

### 5.8 L'ordre qui évite de perdre du temps

| Étape | Action | Résultat attendu |
|---|---|---|
| 1 | Clarifier l'idée par écrit | Problème, cible et valeur clairs |
| 2 | Rechercher le problème et le marché | Preuve que le besoin existe |
| 3 | Analyser les concurrents | Écart ou opportunité identifiée |
| 4 | Parler à la cible | Validation humaine |
| 5 | Définir le MVP | Liste courte de fonctionnalités |
| 6 | Vérifier faisabilité, légal et sécurité | Go / No-Go réaliste |
| 7 | Rédiger le cadrage | Document de référence |
| 8 | Seulement ensuite, développer | Construction utile |

Règle finale : une idée qui n'a pas passé ces étapes a de fortes chances de faire perdre du temps.

---

## 6. Ce que tu peux reporter, et ce que tu ne peux jamais reporter

La partie la plus utile en pratique, parce qu'elle évite deux erreurs symétriques : coder sans sécurité, et coder tout en même temps.

### 6.1 Jamais reportable, même sur un prototype local

- Aucun secret en clair dans le code (2.8)
- Validation côté serveur présente dès le premier écran (2.3)
- Permissions vérifiées, même si un seul utilisateur (2.4)
- HTTPS dès la première mise en ligne (2.12)
- Mots de passe hashés (2.1)
- Requêtes paramétrées, jamais de concaténation (2.5)
- Échappement à l'affichage (2.6)
- Vérification de ce que l'IA a produit (2.14)

### 6.2 Reportable tant qu'aucun vrai utilisateur n'est exposé

- Rate limiting sur les endpoints non sensibles (2.9)
- RLS sur les tables non sensibles (2.13)
- Journalisation d'audit complète (2.11)
- En-têtes de sécurité avancés (2.12)
- Modèle de menaces (section 7)

### 6.3 À traiter dès que le projet a de la traction

- Rate limiting sur l'authentification et la création de données (2.9)
- RLS activée partout où c'est cloisonné (2.13)
- Idempotence sur paiement et création (défi 02)
- Concurrence sur les ressources limitées (défi 01)
- Tests de charge si l'audience grossit (défi 04)

### 6.4 Reportable sans regret tant que le projet ne grossit pas

- Zero-downtime et migrations backward-compatible (défi 07)
- Saga / Outbox et cohérence distribuée (défis 03 et 06)
- Stratégie de conflits offline (défi 08)
- Documentation des choix CAP (défi 10)

---

## 7. Le modèle de menaces, quand c'est une zone sensible

À faire avant de coder une zone qui touche l'authentification, le paiement, les données personnelles, ou les liens publics.

1. **Acteurs et surfaces.** Qui peut faire quoi, avec quelles données. Le visiteur, l'utilisateur authentifié, l'admin, le bot, l'attaquant.
2. **Données sensibles.** Ce qui est stocké, où, qui y accède, si c'est chiffré, combien de temps on le garde, si RGPD s'applique.
3. **Parcours d'attaque.** Pour chaque surface : la tentative, l'impact, la contre-mesure, ce qui reste à traiter.
4. **Contrôles par couche.** Frontend, backend, base, infrastructure, supervision. La défense en profondeur, c'est plusieurs couches, pas une.
5. **Risques acceptés.** Aucun risque ignoré. Soit il est traité, soit il est accepté en connaissance de cause, avec une décision datée.

Le formulaire à remplir est dans `CHECKLIST-TRAVAIL.md`, section 3.

---

## 8. Posture permanente

1. **Sécurité dès le jour 1**, pas à la fin.
2. **Validation côté serveur et permissions**, jamais confiance au frontend.
3. **Rate limiting** sur tout ce qui peut être abusé.
4. **Idempotence** sur les actions critiques.
5. **Tester les cas limites** : double-clic, URL modifiée, données invalides, offline, plantage.
6. **L'IA accélère, mais ne remplace pas ton jugement**, surtout sur la sécurité et les cas limites.
7. **Documenter les décisions importantes** pour pouvoir maintenir plus tard.
8. **Relire ce guide** avant chaque fonctionnalité sensible ou chaque nouvelle idée.

### La phrase à retenir

> « Je ne fais pas confiance au frontend. Tout ce qui est important est vérifié et protégé côté serveur. Je demande à l'IA d'expliquer les mesures de sécurité et les cas limites. Je reste le décideur final. »

### Et la phrase à mettre dans tous tes prompts

> « Applique les bonnes pratiques de sécurité : validation côté serveur, vérification des permissions, protection contre les abus (rate limiting), idempotence si pertinent. Explique-moi clairement ce que tu as mis en place et pourquoi. Quelles sont les surfaces d'attaque de cette fonctionnalité ? »

---

**Sécurité + Solidité technique = responsabilité du développeur, pas de l'IA.**

*Ce guide est une référence. Il se modifie seulement avec l'accord de Wilfried, et toute évolution est tracée dans `context/HISTORY.md`.*
