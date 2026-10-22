# Rapport du projet Kofira (anciennement Memora)

*Document de référence — mis à jour au 14 octobre 2026*

> **Lecture rapide (14 octobre 2026)** : Kofira vend des **sites-cadeaux sur mesure** que le client choisit parmi **trois univers affichés** (musée, parcours interactif, jardin) ou en sur-mesure. Il n'y a **pas encore de clients** (les capsules existantes sont des attentions pour des proches). Le plan est découpé en **3 lancements** : (1) site complet sans back-end (code terminé, reste P19, adresse Vercel, Lighthouse et push), (2) Supabase après 3 à 5 clients, (3) modèles réutilisables et compte client. Les sections **21 à 32** contiennent tout ce qui a été décidé depuis le 7 octobre ; les sections 5, 15, 16 et 19 sont **remplacées** par les sections 26 et 27 (état au 14 octobre : voir §27 et §30). Les documents de cadrage officiels sont dans `docs/` (01 à 06) : **en cas de conflit, ils prévalent sur ce rapport**.

---

## 1. Présentation du projet

Kofira vend des **sites-cadeaux personnalisés** : une expérience web sur mesure (musée interactif, livre numérique, capsule de souvenirs...) offerte à quelqu'un pour une occasion importante. Le destinataire reçoit un **lien privé** qui s'ouvre à la date choisie par le client.

Le projet vise d'abord la Côte d'Ivoire, puis l'international. Objectif de lancement complet (front-end + back-end) : **novembre 2026**, avant la période des fêtes.

L'idée vient de deux réalisations de Wilfried : une page musée personnalisée (photos, vidéos, message final) et un livre interactif d'anniversaire (livre 3D, pages qui se tournent).

### Parcours client (6 étapes)
1. Le visiteur arrive sur le site.
2. Il regarde les inspirations (projets déjà réalisés).
3. Il choisit : s'inspirer, commander, créer lui-même ou proposer son idée.
4. Il envoie ses photos, textes et musiques.
5. Kofira prépare la surprise.
6. Un lien privé est envoyé, à ouvrir à la date choisie.

---

## 2. Historique du projet

- Première version du site pleine d'erreurs et de code non maîtrisé → tout reconstruit depuis zéro.
- Site vitrine actuel : **React 19 + TypeScript + Vite + Tailwind + react-router-dom**, déployé sur **Vercel**.
- Dépôt GitHub : `github.com/wilfriedahouaaka-cmd/Memora`.
- Fichiers de travail actuellement sur l'ordinateur de sa grande sœur (l'ancien portable HP sous Windows 10 s'éteint seul, évité).
- Retours de testeurs : la page d'accueil n'explique pas assez clairement ce qu'est le service, pour qui, et comment ça marche ; la galerie Inspirations est jugée "fade" (icônes génériques au lieu de vraies images) ; "Le Jardin Secret" évoque plus une constellation qu'un jardin.
- Problème repéré : le lien "À propos" n'existe que dans le footer (pas dans la navbar) et ne mène pas vers une vraie page dédiée.

---

## 3. Changement de nom : Memora → Kofira

"Memora" a été abandonné car déjà utilisé à l'étranger (Memora Solutions, Memora Health, une marque déposée aux États-Unis).

Nouveau nom choisi en s'inspirant de la culture akan/agni : le symbole Adinkra **Sankofa** (retourner chercher son passé et ses souvenirs pour avancer) a inspiré **Kofira**, un mot inventé à la sonorité akan, qui n'existe dans aucune langue (peu de risque de conflit de marque). Cette histoire sera racontée sur la page "À propos".

**Nom de domaine :** kofira.com et sanoka.com (alternative testée) étaient déjà pris → **kofira.co** choisi et à acheter (environ 20 $ la 1ère année, ~38 $ au renouvellement). **kofira.ci** gardé comme piste future (plus cher, ~148-211 €/an, demande une pièce justificative), pertinent une fois l'entreprise enregistrée au CEPICI.

---

## 4. Décisions techniques

| Sujet | Décision | Raison |
|---|---|---|
| Hébergement | Rester sur React + Vercel, passer au plan payant progressivement | Permet de grandir et de travailler à plusieurs développeurs plus tard |
| Back-end / Base de données | **Supabase (confirmé, pas de Node.js séparé)** | Authentification, base de données et stockage de fichiers déjà prêts ; beaucoup moins de travail qu'un serveur Node.js à construire soi-même ; tient le délai de novembre |
| Modèle économique | Plans gratuits au maximum, payants seulement quand les revenus arrivent | Éviter de payer des mois d'outils sans revenus en face |
| Marque (OAPI) | Vérification officielle reportée (~145 000 FCFA) | Coût, à faire plus tard |

*Note : un futur projet (après Kofira) sera l'occasion de construire un vrai back-end Node.js de zéro, pour comprendre la logique en profondeur — pas pour Kofira, où le délai et le niveau débutant imposent Supabase.*

**Neon (base de données) évalué et écarté pour Kofira** : plus de projets gratuits (100 vs 2 chez Supabase) mais authentification/stockage encore en bêta ; gardé en tête pour de futurs projets d'expérimentation, pas pour Kofira qui a besoin d'un outil éprouvé.

**Outils évalués et jugés non pertinents actuellement** (hors sujet ou trop tôt) : Docker (pas de serveur propre à gérer, Vercel/Supabase s'en occupent), Grafana (pas de serveur à superviser), Hotjar (pas encore de trafic réel à analyser), reconnaissance faciale type Fokevani (hors sujet, données biométriques sensibles).

---

## 5. Périmètre du back-end (pour le lancement de novembre)

> ⚠️ **Mis à jour le 10 octobre 2026** : le back-end n'est plus prévu pour novembre. Il est déplacé au **lancement 2**, après 3 à 5 clients réels (voir sections 26 et 27 et `docs/05-Backend-Schema.md`).

- Commandes et formules.
- Capsules avec **lien privé** (adresse longue et aléatoire, pas de numéro deviné facilement) et **date d'ouverture**.
- Contenus envoyés par les clients : photos, textes, musiques.
- Dashboard admin : liste des commandes, statuts, création de capsule et de lien privé.
- Site piloté par la base de données : chaque commande est classée par type d'événement ; un champ enregistre l'autorisation du client à publier son projet ; si accepté, le projet apparaît automatiquement dans la galerie Inspirations, classé par catégorie.
- Le compte client (inscription/connexion) est **reporté après le lancement**.

### Dashboard admin "vivant"
Style glassmorphism (effet verre dépoli). Briques : Framer Motion (animations), Tailwind avec backdrop-blur, Lucide React, Recharts ou Chart.js. Structure : sidebar + navbar + grille de cartes type bento. Effets : cartes qui lévitent au survol, compteurs animés, graphiques avec infobulles, micro-animations au changement de statut.

---

## 6. Les formules

| Formule | Idée | Prix |
|---|---|---|
| Discutons | Premier échange pour préciser le besoin | Gratuit |
| Rapide | Surprise simple, livrée rapidement | 6 000 FCFA |
| Essentiel | Surprise plus complète | 12 000 FCFA |
| Capsule Kofira (ex-Memora) | Le grand format : capsule complète, lien privé, date d'ouverture | 35 000 FCFA |

*Formule "Inspiration" (gratuite, découverte des projets) prévue dans la fiche initiale mais pas présente comme formule distincte dans le code actuel — c'est la page Inspirations elle-même qui joue ce rôle.*

**Base commune à toutes les formules** (à dire une seule fois, jamais répétée dans chaque formule) : le client envoie ses photos, vidéos, et une musique s'il le souhaite, et on discute ensemble de ce qu'il veut transmettre.

**Textes `explanation` finaux, différenciés (lot 2, prompt 1 — à coder dans `src/data/formulas.ts`) :**
- `discutons` → "Cet échange constitue toute la formule : on prend le temps de clarifier votre idée avant toute création."
- `rapide` → "La plus rapide des trois : vos souvenirs sont mis en ligne en priorité, sans étape supplémentaire."
- `essentiel` → "Une histoire racontée avec une vraie structure — introduction, cœur du récit, conclusion."
- `capsule-kofira` → "La plus complète : plusieurs sections ou étapes, un univers que vous décrivez vous-même, et un accompagnement sur mesure du début à la fin."

**À quoi sert chaque formule (pour que Wilfried puisse l'expliquer à un client) :**
- *Discutons* : porte d'entrée sans risque pour les hésitants. Ce n'est pas une capsule mais un premier échange, pas fait pour être répété gratuitement.
- *Rapide* : convertir à bas prix quelqu'un de pressé ou au budget serré.
- *Essentiel* : le client sérieux qui veut du travaillé sans sur-mesure complet.
- *Capsule Kofira* : la vitrine, celle qui alimente la galerie Inspirations et la rentabilité.

---

## 7. Charte visuelle et logo

- **Couleurs :** or, crème, brun, terracotta.
- **Polices :** Cormorant Garamond (titres), Inter (textes).
- **Ambiance :** chaleureuse, précieuse, élégante — évoque le souvenir et l'émotion.
- **Logo choisi :** "KOFIRA" en brun avec un oiseau intégré dans le K, baseline "L'art d'offrir l'essence", fond crème.
- **Favicon choisi :** monogramme K seul avec l'oiseau, sans fond ajouté.
- **État actuel :** la version générée par Gemini contient encore la faute "L'art **de** offrir l'essence" (non corrigée) et le favicon est trop détaillé pour rester lisible en 16x16/32x32. Un nouveau prompt corrigé a été préparé pour Grok (en attente de la réinitialisation de sa limite de génération).

---

## 8. Checklist avant lancement

### Robustesse et fonctionnement
- Tous les liens et boutons fonctionnent ; page 404 personnalisée ; pas d'écran blanc.
- Formulaires validés, anti-spam, blocage du double clic et du double paiement.
- Message clair en cas de plantage, chargement affiché, gestion des erreurs d'API.
- Limiter les requêtes par visiteur, plafonner les appels/dépenses d'API.
- Performance : charger seulement les données affichées, index, pagination, cache, compression.
- Alerte en cas de panne, journal des erreurs, test multi-visiteurs, sauvegarde restaurable.

### Référencement et conformité
- Page RGPD, CGU, CGV, mentions légales, bannière cookies, HTTPS forcé, API hors front-end.
- Titres et méta-descriptions uniques, image de partage, favicon, sitemap, robots.txt, alt text.
- Vitesse de page, contraste, responsive, outil d'analyse (analytics).

### Confiance et conversion
- Un seul CTA clair par page, visible sur mobile.
- Bons liens internes, page de remerciement après commande.
- FAQ de 5 questions, délai de livraison annoncé clairement.
- Vrais avis clients dès que possible, photo et histoire personnelle (Sankofa) sur "À propos".

---

## 9. Statut légal et sécurité (Côte d'Ivoire)

### Statut légal (démarche administrative, pas du code)
Statut recommandé : **Entreprise Individuelle (EI)**, via le **CEPICI** et le portail **225invest.ci**. Étapes : vérifier le nom, remplir le formulaire "Personne Physique", déposer au guichet CEPICI, obtenir RCCM/DFE/IDU, créer un compte E-Impôt. Délai réaliste : environ un mois. **À faire avant d'encaisser du vrai argent de clients**, pas urgent avant.

### Sécurité technique à prévoir
- Liens privés des capsules difficiles à deviner (pas de numéros séquentiels).
- Dashboard admin protégé par mot de passe (authentification Supabase).
- Anti-spam sur les formulaires (reCAPTCHA ou honeypot).
- HTTPS (déjà automatique sur Vercel).
- Clés API secrètes jamais exposées dans le code public (variables d'environnement sur Vercel), à distinguer des clés publiques.

### Confidentialité des données clients
Politique de confidentialité claire (quelles données, où stockées, durée de conservation, qui y a accès), consentement explicite pour publication dans la galerie, suppression des données sur demande, règles d'accès strictes à Supabase.

---

## 10. Pistes explorées, mises de côté pour plus tard

- **QR code** à la place du lien (ou en complément) pour l'envoi des capsules — renforcé par l'exemple de Fokevani (habitude qui marche en Côte d'Ivoire). Pas encore tranché entre option ou mode principal.
- **Effet visuel "cadeau emballé"** qui se déballe au clic avant d'accéder au contenu réel de la capsule — idée de différenciation forte face aux concurrents, à développer techniquement.
- Sources de revenus additionnelles : options payantes (musique personnalisée, livraison accélérée, domaine personnalisé), packs entreprises, système de parrainage.
- kofira.ci, une fois l'entreprise enregistrée.
- Hotjar, une fois le site lancé avec du vrai trafic.
- Système d'ajout automatique de projets à la galerie, génération automatique de pages clients, nouveaux formats de capsules (frise chronologique, lettre qui se déplie, calendrier à cases, chasse au trésor, capsule verrouillée par date, capsule qui grandit dans le temps), compte client.

---

## 11. Règles de travail retenues pour la reprise

À la récupération de l'ordinateur, posture de **développeur senior rigoureux** adoptée pour chaque modification :
1. **Sécurité** : validation des données, sécurité Supabase/back-end, alerte sur les risques.
2. **Propreté et structure** : expliquer où va le code et pourquoi, commentaires en français.
3. **Code modulaire**, prêt pour la production sur Vercel.
4. **Pas de raccourci dangereux** : proposer l'alternative professionnelle à la place.

**Workflow design :** maquettes/composants créés ou récupérés sur CodePen (HTML/CSS/JS), partagés, puis transformés en composants React/Tailwind dans le projet.

### Ordre de priorité à la reprise
1. Refonte de la page d'accueil (ce qu'est Kofira, pour qui, comment ça marche).
2. Vraie page "À propos" (navbar + footer, histoire de Sankofa).
3. Refonte SEO / RGPD / UX (selon le prompt de diagnostic préparé).
4. Galerie Inspirations avec de vraies captures des projets.
5. Logo corrigé et favicon simplifié.
6. Cahier des charges détaillé du back-end, puis le plan en 5 semaines.

---

## 12. Textes validés — page d'accueil et page "À propos"

> ⚠️ **Note du 10 octobre 2026** : plusieurs textes ci-dessous sont à corriger avant publication : les formules « œuvre tangible » et « matériaux nobles… traversent les siècles » (le produit est numérique), le mélange « tu / nous / je » (la règle est vouvoiement + « je »), la FAQ (voir sections 22 et 28).

### Page d'accueil — version finale (remplace la proposition initiale en 5 blocs)

La page a été entièrement reconstruite avec un nouveau design (police Playfair Display / Plus Jakarta Sans, voir section 14 pour le bug de polices non chargées à corriger). Structure finale validée :

1. **Hero** : "La surprise qui grandit avec vos souvenirs" + 2 boutons ("Découvrir l'univers" → Inspirations, "Nous contacter" → Contact)
2. **Concept** : "Plus qu'un site, une capsule temporelle" + 4 points (Confidentialité, Temporalité, Émotion, Héritage)
3. **Pour qui ?** *(nouvelle section à ajouter)* — 4 cartes, même style que le point 2 :
   > **Un anniversaire surprise** — Immortaliser l'instant, livré avant le jour J.
   > **Un mariage à célébrer** — Une histoire racontée pour durer toute une vie.
   > **Dire merci, sans occasion particulière** — Parce que certains mots méritent plus qu'un message.
   > **Toute autre occasion qui compte pour vous** — Baptême, départ, retrouvailles, réconciliation... si le moment compte, il mérite sa capsule.
4. **L'Esprit Kofira** : Passion / Pureté / Héritage
5. **CTA final** : "Prêt à immortaliser vos instants ?"

**Textes corrigés "nous" → "je"** (cohérence avec la décision solo, section 11) :
- Sous-titre hero : "**Je** conçois des pièces d'exception qui capturent l'essence de vos moments les plus précieux pour les transformer en héritages intemporels."
- CTA final : "Laissez-**moi** transformer vos émotions en une œuvre tangible."
- Section Passion : "**J'**insuffle l'âme de vos récits dans chaque détail."
- Section Héritage : "**J'**utilise des matériaux nobles pour que vos souvenirs traversent les siècles sans faiblir."

### Page "Services" — textes validés

**En-tête de page**
> **Nos formules**
> Chaque souvenir mérite la bonne mise en scène. Choisis la formule qui correspond à ton histoire — ou discute avec nous si tu hésites encore.

| Formule | Prix | Description |
|---|---|---|
| Discutons de votre projet | Gratuit | Racontez-nous votre idée, votre histoire ou votre projet particulier. Nous discutons ensemble pour trouver la meilleure façon de la réaliser. |
| Rapide | 6 000 FCFA | Vous nous envoyez vos photos et vos mots, nous les mettons en forme rapidement dans une présentation simple et soignée. |
| Essentiel | 12 000 FCFA | Un concept simple mais pensé pour raconter votre histoire avec clarté, dans le format qui lui correspond le mieux. *(reformulé pour ne pas enfermer la formule dans le seul format "livre")* |
| **Capsule Kofira** *(recommandé)* | 35 000 FCFA | Nous réfléchissons avec vous à la meilleure mise en scène, sur plusieurs sections ou étapes, pour un résultat qui vous ressemble vraiment. |

*Prix confirmés tels quels après discussion (pas de baisse) — voir section "Décisions techniques".*

### Page "Inspirations" — refonte complète validée

**En-tête**
> **Galerie d'Inspirations**
> Chaque capsule est unique, pensée pour une histoire précise. Voici quelques créations déjà réalisées.

**Filtres par catégorie — dynamiques, pas fixes**
Une catégorie (`Célébration`, `Souvenirs`, `Famille`, `Romance`...) n'apparaît dans les onglets de filtre que si elle contient **au moins 2 projets**. Pas de liste codée en dur : les filtres suivent les vraies données, cohérent avec la catégorisation automatique prévue côté dashboard admin (section 5).

**Cartes — confidentialité des clients**
Important : **jamais le nom réel du client** affiché publiquement (ni "Ruth", ni "Grace Yasmin", etc.). À la place :
- un **titre générique par catégorie** (ambiance, pas identité)
- une **image représentative de l'ambiance** de la catégorie (pas une vraie photo du client)

| Catégorie | Titre affiché (générique) | Description |
|---|---|---|
| Célébration | Une capsule de célébration | Une chasse aux souvenirs où chaque indice révèle un moment précieux, jusqu'à la surprise finale. |
| Souvenirs | Un musée de souvenirs | Une galerie intime, pensée comme un vrai musée, pour revivre une histoire qui mérite d'être racontée. |
| Famille | Un livre de famille | Un livre qu'on feuillette page après page, pour retracer toute une vie en images et en mots. |
| Romance | Un jardin secret | Une déclaration cachée dans un univers poétique, à découvrir pas à pas. |

Le clic sur la carte / le bouton **"Découvrir cette capsule →"** mène toujours vers le vrai site de la capsule (champ `link` déjà existant dans le code, conservé).

**Bas de page — nouveau CTA**
> **Envie de créer la tienne ?**
> [Commander ma capsule]

### Page "Comment ça marche" (déjà bien construite — renommage + passage au "je")

Cette page existait déjà et est bien faite (timeline visuelle, 6 étapes) — pas de refonte nécessaire, juste deux ajustements :
- Titre : "Le Voyage Memora" → **"Le Voyage Kofira"**
- Texte passé au **"je"** plutôt que "nous/nos artisans", pour rester fidèle à la situation réelle (travail solo). Pourra repasser à "nous/artisans" plus tard s'il recrute.

| # | Titre | Texte |
|---|---|---|
| 01 | L'histoire | Tout commence par vos mots. Vous me racontez vos souvenirs, vos émotions et l'essence de ce que vous voulez transmettre. |
| 02 | L'imaginaire | Je traduis vos récits en concepts visuels et matériels. J'imagine avec vous la forme la plus juste pour votre mémoire. |
| 03 | Le Choix | Vous sélectionnez la formule qui correspond le mieux à vos attentes, de l'essentiel au sur-mesure. |
| 04 | Le Façonnage | Je mets tout mon soin à créer votre surprise, avec patience et précision. |
| 05 | L'Attente | La capsule grandit. Pendant que le temps fait son œuvre, l'émotion s'accumule et la surprise prend tout son sens. |
| 06 | L'Éclosion | Le jour venu, la capsule s'ouvre. Un moment d'émotion pure où le souvenir reprend vie. |

### Page "Proposer mon idée" (déjà bien construite — renommage + passage au "je")

Déjà bien construite : validation présente (`required` sur nom, email, idée), vraie page de remerciement après envoi. Deux ajustements :
- Message WhatsApp : "Bonjour Memora" → **"Bonjour Kofira"**
- Sous-titre : "Confiez-nous vos inspirations, nous en ferons une œuvre." → **"Confiez-moi vos inspirations, j'en ferai une œuvre."**
- Remerciement : "Nous reviendrons vers vous très prochainement." → **"Je reviendrai vers vous très prochainement."**

### Politique de confidentialité — texte validé

> **Politique de confidentialité**
>
> Chez Kofira, les souvenirs que vous me confiez sont précieux et personnels.
>
> **Ce que je collecte** : votre nom, vos coordonnées, ainsi que les photos, textes et musiques que vous m'envoyez pour créer votre capsule.
>
> **Comment c'est utilisé** : uniquement pour créer la capsule que vous avez commandée. Rien n'est partagé avec un tiers, ni vendu, ni utilisé à d'autres fins.
>
> **Publication dans la galerie** : votre projet n'apparaît dans la galerie Inspirations que si vous donnez explicitement votre accord. Dans ce cas, votre nom reste privé — seule une description générale de l'ambiance est montrée.
>
> **Durée de conservation** : vos fichiers sont conservés le temps nécessaire à la création et à la livraison de votre capsule. Vous pouvez demander leur suppression à tout moment en m'écrivant.
>
> **Vos droits** : vous pouvez me demander à tout moment ce que je conserve sur vous, ou demander la suppression de vos données.

### Choix de publication — à ajouter au formulaire de commande

> **Autorisez-vous la publication de votre projet dans notre galerie Inspirations ?**
> ○ Oui, j'autorise (mon identité reste privée, seule l'ambiance est montrée)
> ○ Non, je préfère que mon projet reste privé

Cette réponse alimente le champ d'autorisation déjà prévu côté dashboard/base de données (section 5).

### Avis clients — reste dans le plan du back-end (pas un texte à préparer maintenant)

Nécessite Supabase : lien unique envoyé après livraison, formulaire d'avis relié à la base, validation par Wilfried avant publication (anti-faux avis). Rentre dans les semaines 2-4 du plan en 5 semaines, pas une action à préparer avant l'ordinateur. **Précision ajoutée** (suggestion d'un proche) : notation par étoiles (5 étoiles) en plus du témoignage écrit.

### Retour d'un proche sur la scalabilité ("100 commandes en une semaine")

Suggestion reçue d'intégrer une IA pour gérer automatiquement un afflux de commandes — jugée trop vague pour être actionnable. Le vrai goulot d'étranglement identifié : chaque capsule est faite à la main (pas la réception des commandes, déjà gérée par Supabase). Vraies pistes d'automatisation utiles, déjà notées en pistes futures : un modèle de capsule réutilisable, des emails automatiques de confirmation.

### Compte client ("Mon espace") — confirmé pour après le lancement

Reste reporté après novembre (pas dans le MVP). Décisions prises par anticipation :
- Ne **jamais cacher** l'accès à la galerie Inspirations, même pour un client connecté qui sait déjà ce qu'il veut.
- "Mon espace" prioriserait : raccourci "Commander à nouveau", historique des commandes/capsules, navigation classique toujours accessible.

### Formulaire de commande — enrichissement validé

Remplacer le champ unique "Message secret / Instructions" par deux champs guidés (valable pour tout client, connecté ou non) :

> **L'univers que vous imaginez**
> *Décrivez l'ambiance, les couleurs, le style que vous aimeriez retrouver (ex : doux et nostalgique, festif et coloré, élégant et sobre...)*

> **L'émotion à transmettre**
> *Qu'est-ce que la personne doit ressentir en découvrant sa capsule ?*

À corriger en même temps que la validation manquante (`required`) sur ce formulaire, déjà notée dans l'audit technique (section 13).

### FAQ (5 questions) — validée

1. **Qu'est-ce qu'une capsule Kofira ?** Une capsule, c'est un site-cadeau personnalisé : vos photos, vos mots et votre musique, mis en scène dans une expérience unique, accessible par un lien privé que vous offrez à la personne de votre choix.
2. **Combien de temps faut-il pour recevoir ma capsule ?** Le délai varie selon la formule choisie : généralement entre 3 et 7 jours ouvrés après réception de vos photos et informations. Pour les demandes urgentes, contactez-nous directement.
3. **Comment se passe le paiement ?** Après avoir rempli le formulaire de commande, vous êtes redirigé vers WhatsApp pour finaliser les détails et le paiement (Wave, Orange Money, ou autre mobile money).
4. **Mes photos et mes informations sont-elles en sécurité ?** Oui. Vos fichiers sont utilisés uniquement pour créer votre capsule et ne sont jamais partagés ni vendus. Voir notre politique de confidentialité pour plus de détails.
5. **Puis-je demander des modifications après avoir reçu ma capsule ?** Une première série de petites retouches (texte, ordre des photos) est incluse gratuitement dans les 48h suivant la livraison. Au-delà, ou pour des changements plus importants, nous en discutons ensemble selon la demande.

### Page "À propos" — ajout entre "L'histoire de Memora/Kofira" et "Nos valeurs"

> **D'où vient le nom Kofira**
> Kofira s'inspire du symbole Sankofa, originaire de la culture akan : l'idée qu'il faut parfois se retourner vers son passé pour mieux construire l'avenir. C'est exactement l'esprit de chaque capsule — retenir ce qui compte, pour continuer à avancer.

*Le reste du texte déjà existant sur "À propos" (histoire, valeurs, citation finale) est conservé tel quel.*

---

## 13. Audit technique du code (1er octobre 2026)

Analyse du ZIP complet du projet (`Memora-master.zip`), toutes les pages et composants.

**Sécurité :** aucun risque de piratage actuel — le site est entièrement statique, aucune clé API ni secret exposé dans le code, aucun back-end à ce stade. Le risque réel arrivera avec Supabase (dashboard admin), et sera traité avec les règles déjà fixées (section 11).

**Bugs et manques confirmés :**
- Lien "À propos" absent de la **navbar** (présent seulement au footer) ; la page `AboutPage.tsx` existe bel et bien et est déjà bien écrite.
- Pas de page 404 personnalisée.
- Formulaire **Commander** sans validation (`required` absent) — contrairement au formulaire **Contact**, qui a déjà `required` sur ses champs et une vraie page de remerciement après envoi.
- SEO quasi inexistant : un seul titre/description pour tout le site (pas un par page), aucune balise Open Graph, pas de `robots.txt`, pas de `sitemap.xml`.
- Aucune page CGU, politique de confidentialité ou mentions légales ; pas de bannière cookies.
- Le monogramme "W.A." (initiales de Wilfried) utilisé dans la navbar et le footer, à remplacer par le logo Kofira.
- Le nom "Memora" est encore partout dans le code (titre, navbar, footer) — renommage en "Kofira" entièrement à faire.
- `memora-fiche-v2.pdf` présent dans le dépôt GitHub — à sortir du code source.

**Ce qui est déjà bon, à ne pas refaire :**
- Prix des formules déjà définis dans `data/formulas.ts` (voir section 6) — pas besoin de les fixer, juste de les reporter sur le site en "Kofira".
- Structure du code propre et cohérente (components / pages / data bien séparés).
- Formulaire Contact déjà complet (validation + page de remerciement).
- Galerie Inspirations fonctionnelle avec les 4 projets déjà liés (confirmé : icônes génériques à remplacer par de vraies captures, comme déjà noté).

---

## 14. Audit technique — version 2 du code (2 octobre 2026, après travail sur l'ordinateur d'un ami)

Bon progrès constaté : navbar corrigée ("À propos" ajouté), logo Kofira intégré, renommage Kofira dans config/footer, formulaire Commander enrichi avec les champs "univers"/"émotion" et le choix de publication (exactement comme validé en section 12).

**Bugs critiques trouvés — à corriger avant mise en ligne :**
1. **Liens cassés** dans `InspirationsPage.tsx` : les boutons "Commander" et "Discuter du projet" pointent vers `/order` et `/propose-idea`, qui n'existent pas. Les vraies routes sont `/commander` et `/proposer-mon-idee`. → page blanche au clic.
2. **`OrderPage.tsx` sans balise `<form>`** : les attributs `required` ne bloquent rien réellement sans form + bouton submit. Un client peut commander avec des champs vides malgré le `required` visible dans le code.
3. **Toujours pas de route 404** (`path="*"` dans `App.tsx`) — aggrave le bug n°1 (page blanche au lieu d'un message clair).
4. **Pas de `vercel.json`** pour les rewrites SPA — risque qu'un rafraîchissement sur une sous-page (`/services`, etc.) tombe sur la vraie page 404 de Vercel plutôt que sur le site.

**Bugs moyens :**
5. **Polices manquantes** : `HomePage.tsx` et `InspirationsPage.tsx` utilisent "Playfair Display" et "Plus Jakarta Sans", jamais chargées dans `index.html` (seules Cormorant Garamond et Inter le sont) → rendu avec police générique du navigateur.
6. **Logo en `.jpeg` non transparent**, recadré dans un cercle de 40px qui coupe le mot "KOFIRA" dans la navbar et le footer.

**Point ouvert à trancher** : `HomePage.tsx` a été entièrement réécrit avec un texte différent de celui validé en section 12 (pas de section "pour qui" en 3 cas d'usage, encore au "nous" au lieu du "je" décidé en section 11) — à clarifier si volontaire (nouvelle direction) ou à remettre en cohérence avec les textes validés.

---

## 15. Ordre de travail final, avant d'attaquer le back-end

> ⚠️ **Remplacé le 10 octobre 2026** par la section 27 et `docs/06-Implementation-Plan.md`. Le point 7 (acheter kofira.co) et le point 8 (Search Console) sont **reportés** (pas de moyens pour le domaine) ; le point 9 (back-end Supabase) passe au lancement 2.

1. **Corriger les 3 bugs critiques** : liens cassés (`/order`, `/propose-idea` → `/commander`, `/proposer-mon-idee`), formulaire Commander sans `<form>`, route 404 manquante.
2. **`vercel.json`** (rewrite SPA) + **`robots.txt`** + **`sitemap.xml`**.
3. **Meta tags Kofira + Open Graph + titres uniques par page** (nécessite `react-helmet-async` ou `document.title` par page — pas juste du texte, une vraie tâche de code).
4. **Compresser les images** (9,6 Mo actuellement pour seulement 4 images dans `/public/inspirations/`).
5. **Corriger logo/favicon** : les repasser en `.png` transparent, corriger le recadrage dans la navbar/footer.
6. **Rebuild + redéployer.**
7. **Acheter et connecter kofira.co** (avant Search Console, pas après, pour ne pas vérifier la mauvaise adresse).
8. **Google Search Console** + soumission du sitemap.
9. **Back-end Supabase.**

*Schéma JSON-LD retenu : **Organization** seulement — **LocalBusiness écarté**, Kofira n'a pas de local physique (décision déjà prise en section 4).*

## 16. Suivi des prompts Claude Code (front-end)

> ⚠️ **Remplacé le 10 octobre 2026** : le lot 2 est abandonné au profit des étapes P0 à P10 (section 27). La page `/decouvrir` et la détection de première visite sortent du lancement 1.

Méthode : un prompt à la fois, jamais mélangés. Wilfried les envoie à Claude Code (agent dans VS Code), dit "terminé", puis reçoit le suivant. Un seul ZIP est renvoyé à la fin pour une analyse complète.

### Lot 1 — Corrections critiques et SEO (TERMINÉ et validé)

- [x] Prompt 1 — Liens cassés dans `InspirationsPage.tsx` (`/order` → `/commander`, `/propose-idea` → `/proposer-mon-idee`)
- [x] Prompt 2 — `NotFoundPage.tsx` + route 404 (`path="*"`) dans `App.tsx`
- [x] Prompt 3 — `OrderPage.tsx` : vraie balise `<form>` pour que `required` fonctionne
- [x] Prompt 4 — `vercel.json` (rewrite SPA)
- [x] Prompt 5 — `public/robots.txt` + `public/sitemap.xml`
- [x] Prompt 6 — Balises Open Graph dans `index.html`
- [x] Prompt 7 — Titres et meta-descriptions uniques par page (`react-helmet-async`)
- [x] Prompt 8 — Images de `public/inspirations/` compressées en `.webp` (9,6 Mo → 416 Ko)
- [x] Prompt 9 — Logo/favicon corrigés (rond noir avec K doré validé tel quel par Wilfried)

Bonus constaté dans le code : page `/confidentialite` créée avec le texte de politique de confidentialité validé ; section "Pour qui ?" (4 cartes cliquables vers `/commander`) présente dans `HomePage.tsx` ; texte d'"Essentiel" corrigé ; `ServicesPage.tsx` vérifié propre ; dépôt renommé `Kofira-master`, aucun bug de régression.

### Lot 2 — Fondations de la partie visible (EN COURS)

| # | Prompt | Statut |
|---|---|---|
| 1 | `formulas.ts` : 4 textes `explanation` différenciés (voir section 6) | **Envoyé** — en attente du "terminé" de Wilfried |
| 2 | Phrase "Concrètement..." sur `HomePage.tsx` + phrase d'intro sur `HowItWorksPage.tsx` | Prompt rédigé, **pas encore envoyé** |
| 3 | Page `/decouvrir` (texte v5, section 17) | À préparer — **2 points à trancher** (section 17) |
| 4 | Détection "1ère visite" via `localStorage` → redirection vers `/decouvrir` | À préparer après le prompt 3 |
| 5 | Page FAQ (texte validé en section 12) | Texte prêt, jamais codée |
| 6 | Rebuild + vérifier que tout est poussé sur GitHub/Vercel | Après les prompts ci-dessus |

---

## 17. Page d'intro `/decouvrir` — texte v5 (validé par Wilfried)

Usage : première page vue par quelqu'un qui ne connaît pas Kofira, avant la page d'accueil. Pas un onboarding multi-pages : une seule page, avec un bouton vers l'accueil.

> **Il y a des maisons qui ne vendent pas des objets.**
> **Elles créent des émotions.**
> **Kofira est de celles-là.**
>
> Ici, on ne fabrique pas des pages web. On sculpte des capsules temporelles. Des œuvres numériques qui renferment vos photos, vos messages, vos musiques… et qui ne s'ouvrent qu'au moment parfait.
>
> Parce que certains souvenirs méritent plus qu'un simple message.
>
> On a tous, un jour, voulu offrir quelque chose qui sorte vraiment de l'ordinaire. Un geste qui dise ce qu'on ressent… qui marque… et qui reste.
>
> Mais souvent, les cadeaux classiques s'oublient vite. Une carte se perd, un message se noie dans les conversations…
>
> C'est ainsi qu'est née l'idée de Kofira : transformer vos souvenirs les plus précieux — photos, vidéos, musique — en une expérience unique, pensée pour les personnes qui comptent le plus pour vous.
>
> Pas un simple message. Une vraie surprise numérique, que vous offrez par un lien, et qui s'ouvre au moment que vous choisissez.
>
> Un premier échange gratuit pour clarifier votre idée, puis des formules adaptées :
> la capsule Rapide (6 000 FCFA),
> la capsule Essentiel (12 000 FCFA),
> ou la Capsule Kofira (35 000 FCFA) — entièrement sur mesure (recommandée).
>
> Une idée en tête ? Un doute sur la formule à choisir ? Un simple échange suffit pour poser les bases.
>
> Chaque capsule est faite avec le même soin. Parce que ce n'est pas juste une création numérique… c'est une émotion que vous offrez. Un univers que vous partagez.
>
> **Bienvenue chez Kofira.**
>
> **[Découvrir Kofira →]** *(bouton vers la page d'accueil "/")*

**Décision de Wilfried, prise en connaissance de cause** : la phrase "Ici, on ne fabrique pas des pages web. On sculpte des capsules temporelles." est **conservée telle quelle**. Point de vigilance noté (sans le remettre en cause) : ce choix va dans le sens inverse de la clarté "c'est concrètement une page web avec vos photos", demandée par plusieurs testeurs ; la clarté concrète reste portée par la phrase "Concrètement..." de l'accueil (lot 2, prompt 2) et par la page Services.

**Deux points encore à trancher avant de coder cette page :**
1. La répétition de l'échange gratuit ("Un premier échange gratuit..." puis "Un simple échange suffit pour poser les bases") : en garder une seule, ou les deux volontairement ?
2. Ce texte ne contient que les noms et prix des formules, sans leurs différences fonctionnelles (celles-ci se trouvent sur `/services`, dans la fenêtre de détail de chaque formule) : à confirmer que c'est voulu.

**Multi-destinataires** (famille, entreprise, plusieurs personnes, capsules identiques ou différentes) : confirmé **pour après le lancement**, pas pour novembre. À garder en tête dès le schéma Supabase pour que la base puisse évoluer sans tout reconstruire. La formule "pensée pour les personnes qui comptent le plus pour vous" reste vraie avant et après cette évolution.

---

## 18. Comportement du site pour un visiteur

### Détection "première visite" (sans back-end)
Via `localStorage` (mémoire du navigateur du visiteur), **pas besoin de Supabase**. Case pas cochée → redirection automatique vers `/decouvrir` ; clic sur "Découvrir Kofira" → la case se coche, puis accueil ; visites suivantes (même navigateur) → accueil directement. Limite connue et sans gravité : réinitialisé si la personne change d'appareil ou vide son historique.

### Parcours client finalisé
1. Nouveau visiteur → `/decouvrir` → bouton vers l'accueil.
2. Accueil → le bouton principal du hero ("Découvrir l'univers") mène en priorité vers `/inspirations`. Les cartes "Pour qui ?" (vers `/commander`) restent en option plus bas : **on ne bloque jamais un clic**.
3. `/inspirations` → bouton en bas "Envie de créer la tienne ? → Commander".
4. `/services` pour comparer les formules.
5. `/commander` → formulaire (univers, émotion, consentement de publication) → confirmation par WhatsApp.
6. Wilfried envoie un lien de **prévisualisation** au client ; le client valide ; c'est **le client lui-même** qui envoie le lien final au destinataire.
7. Visiteur habitué → va directement à l'accueil.

### Liens des capsules
Aujourd'hui : GitHub Pages. Plus tard avec Supabase : `kofira.co/capsule/xxxxx` avec un code aléatoire difficile à deviner, **jamais le prénom du destinataire** dans l'adresse (sécurité et confidentialité).

### Script de la vidéo d'introduction (validé, hébergement non tranché)
> **Introduction** — On a tous, un jour, voulu offrir quelque chose qui sorte vraiment de l'ordinaire. Un geste qui dise ce qu'on ressent... qui marque... et qui reste.
>
> **Développement** — Mais les cadeaux classiques s'oublient vite. Alors j'ai créé Kofira : je transforme vos photos, vidéos et musiques en une expérience web unique, pensée pour les personnes qui comptent le plus pour vous. Un premier échange gratuit pour clarifier votre idée, puis des formules adaptées à chaque envie — d'une mise en forme rapide à une capsule entièrement sur mesure, avec plusieurs sections et un univers pensé avec vous.
>
> **Conclusion** — Chaque capsule est faite avec le même soin. Parce que ce n'est pas juste un site... c'est une émotion que vous offrez. Bienvenue sur Kofira.

Sous la vidéo : bouton **[Découvrir Kofira →]**. Hébergement (fichier dans `public/` ou plateforme externe) : encore en réflexion. Vigilance : si le texte du site change plus tard, penser à garder la vidéo cohérente.

### Idée mise de côté
Question "As-tu déjà vu la présentation ?" (Oui/Non) sur `/decouvrir` + liens différenciés par plateforme (`kofira.co?src=tiktok`). Sans back-end, seule la partie liens différenciés est réellement traçable.

### Domaine, hébergement et dépôt
- On peut payer **uniquement** le nom de domaine kofira.co et rester gratuit sur Vercel/Supabase tant qu'il n'y a pas de revenus. Connexion : ajouter le domaine dans Vercel, copier les enregistrements DNS chez Namecheap, attendre la propagation (quelques minutes à 48 h). L'ancienne adresse Vercel continue d'exister en parallèle.
- Dépôt GitHub `Kofira-master` en **privé** : protège le code source et son historique, pas le design visible (copiable par nature sur le web). Vercel continue de redéployer normalement.

---

## 19. Résumé — ce qu'il reste à faire (à jour)

> ⚠️ **Remplacé le 10 octobre 2026** par la section 27. Ce tableau est conservé comme historique.

| # | Tâche | Statut |
|---|---|---|
| 1 | Confirmer que le prompt `formulas.ts` (lot 2, n°1) est exécuté | En attente de Wilfried |
| 2 | Envoyer le prompt "Concrètement..." (accueil + Comment ça marche) | Prêt, pas envoyé |
| 3 | Trancher les 2 points sur `/decouvrir` puis coder la page | À faire |
| 4 | Détection "1ère visite" (`localStorage`) | Après la page `/decouvrir` |
| 5 | Page FAQ | Texte prêt, à coder |
| 6 | Décider de l'hébergement de la vidéo d'intro | En réflexion |
| 7 | Rebuild + vérifier GitHub/Vercel | Après les prompts |
| 8 | Acheter et connecter kofira.co | Pas fait |
| 9 | Google Search Console (après le domaine) | Pas fait |
| 10 | Back-end Supabase (prévoir l'extension multi-destinataires dès le schéma) | Plan en 5 semaines |
| 11 | Enregistrer l'entreprise individuelle au CEPICI avant d'encaisser du vrai argent | Pas fait |
| 12 | Vérification officielle de la marque (OAPI, ~145 000 FCFA) | Reportée (coût) |
| 13 | Avis clients avec étoiles, compte client, multi-destinataires | Après le lancement |
| 14 | Projet "Del & Esther" (rapport séparé) | En pause, attend les réponses de Del |

---

## 20. Étude de marché rapide (7 octobre 2026)

*Recherche web limitée : les réseaux sociaux (TikTok, Instagram, WhatsApp) sont mal indexés par les moteurs de recherche, donc l'absence de résultat ne prouve pas l'absence de concurrents locaux.*

**Conclusion** : le concept (page web personnalisée avec photos, musique, lien privé, date d'ouverture, QR code) **existe déjà**. La place de Kofira ne viendra pas de l'idée, mais de l'exécution, du local et de la confiance.

### Concurrents trouvés (en ligne, surtout étrangers)
- **QLovy** (qlovy.com) : plateforme de pages-cadeaux avec option gratuite limitée et formules payantes, lien exclusif, QR code, dates d'ouverture, jusqu'à 10 photos et une vidéo YouTube.
- **Unveil.day** : cadeau qui se dévoile jour après jour, paiement unique.
- **LoveUnlocked** (Product Hunt) : cadeau interactif partagé par QR code privé et code d'accès.
- **Forevermore** (fondé en juillet 2026, Kosovo) : 8 $ ou 30 $ par cadeau, 25 modèles ; revenu total affiché sur TrustMRR : 233 $.
- **Un freelance sur ComeUp** (vendeur depuis mai 2026) : "page web personnalisée accessible par un lien", dès environ 18 $ (≈ 11 000 FCFA), 0 vente affichée.

### Local (Abidjan, Cameroun)
- Scène active de cadeaux surprise sur TikTok/Instagram, mais surtout **physique** : box mariage personnalisée dès 15 000 F à Abidjan, pack gâteau + panier surprise à 20 000 FCFA à Douala/Yaoundé, compte "Surprise Box Abidjan" (≈ 2 900 abonnés).
- **Aucun vendeur local de pages-cadeaux interactives trouvé** dans cette recherche — à vérifier à la main.

### Ce que ça implique
1. Impossible d'être "le premier" : la vraie défense est la qualité, la réputation et la proximité (français, FCFA, WhatsApp, sur-mesure, identité Sankofa). Le dépôt GitHub privé ne protège pas l'idée.
2. Les prix de Kofira (6 000 à 35 000 FCFA) sont dans la zone de ce que les gens paient déjà pour un cadeau surprise physique.
3. Signaux de demande faibles chez les concurrents numériques (Forevermore 233 $ en quelques mois, 0 vente pour le freelance ComeUp) : un point de donnée chacun, pas une preuve, mais à ne pas ignorer.
4. Piste à tester : **partenariat avec les vendeurs de box/cadeaux physiques** (le QR code Kofira comme supplément numérique dans une box) plutôt que les voir comme concurrents.
5. Validation : viser **10 clients payants** et mesurer le temps passé par capsule.

### Vérification manuelle à faire (30 minutes)
Chercher sur TikTok, Instagram et Facebook : "cadeau digital", "surprise digitale", "site cadeau", "capsule souvenir", "page anniversaire personnalisée", avec "Abidjan" / "Côte d'Ivoire" / "CI".

---

## 21. Étude de marché — compléments (octobre 2026)

*Complète la section 20. Mêmes limites : les réseaux sociaux sont mal indexés, l'absence de résultat ne prouve rien. Les chiffres d'usage sont ceux annoncés par les sites eux-mêmes.*

### Cinq familles de concurrents
1. **Constructeurs en libre-service** (QLovy, LoveUnlocked, LoveQR) : le client construit lui-même sa page. QLovy annonce plus de 75 000 pages créées (chiffre non vérifié), 10 photos et une vidéo YouTube par page, trois durées de vie (24 h gratuit, 6 mois, à vie), un mot de passe, un historique des visites du destinataire, une livraison de la lettre par WhatsApp. Paiements par Stripe et Mercado Pago (pas de mobile money).
2. **Calendriers jour par jour** (Unveil.day, Prelune) : une surprise par jour derrière un seul lien.
3. **Applis de capsule temporelle** (Capsule, Timeless) : contenu verrouillé jusqu'à une date ; Timeless mise sur une cérémonie d'ouverture.
4. **Sur-mesure par un freelance** : ex. vidéo personnalisée + QR code imprimable à partir de 14,99 $ (Gumroad), vendeur ComeUp.
5. **Local (Abidjan)** : cadeaux **physiques** (page « Cadeaux personnalisés » Cocody, paniers livrés à l'étranger). Aucun vendeur local de pages-cadeaux numériques trouvé (à vérifier à la main, voir §20).

### Ce que les concurrents ont et que Kofira n'a pas encore
Date d'ouverture réellement verrouillée avec compte à rebours · code d'accès · message WhatsApp qui prévient le destinataire · notification « il a ouvert » · durée de vie annoncée · QR code imprimable.

### La place de Kofira
Sur-mesure humain (pas un modèle à remplir) · français, FCFA, WhatsApp, mobile money · accompagnement · des mises en scène différentes (musée, jardin, livre, parcours) · histoire et nom (Sankofa). Piste à tester : la **diaspora** (un cadeau numérique n'a pas de frontière).

### À prendre à notre façon / à ne pas prendre
- **Prendre** : date d'ouverture avec compte à rebours (lancement 2, vrai verrou serveur), code d'accès, message WhatsApp au destinataire (à la main au début), durée d'hébergement annoncée, QR code et carte imprimable (partenariat box).
- **Ne pas prendre** : constructeur en libre-service (détruit la valeur sur-mesure, impossible avant novembre), plan gratuit de 24 h (« Discutons » est déjà l'offre gratuite).

### Limites assumées
Idée déjà existante : la chance vient de l'exécution et de la confiance. Le plan **Rapide à 6 000 FCFA** (≈ 10 $, taux approximatif) est face à des outils gratuits ou presque : l'avantage ne peut être ni le prix ni les fonctions, seulement le service. **Le vrai risque est le temps de production** (chaque capsule est faite à la main) : le mesurer sur les 10 premiers clients.

---

## 22. Audit complet du code (ZIP du 3 octobre 2026)

*Méthode : lecture des fichiers de `src`, de la config et de `public` ; `npm run build`, lint et audit npm ; tests dans un vrai navigateur (10 routes × 9 largeurs de 320 à 2560 px, clics, formulaires). Limites : Google Fonts bloquées dans l'environnement de test (typographie réelle non jugée), pas de lecteur d'écran.*

### Verdict
Techniquement propre, mais **pas prêt à recevoir du trafic** : le chemin de commande est bogué, la galerie ouvre deux onglets, l'accueil ne dit pas ce qu'on vend. Design élégant mais **interchangeable** (« ni maison de luxe, ni vraiment laid ») ; rien n'y montre le produit. Ce ZIP ne contenait pas le lot 2 (anciens textes dans `formulas.ts`, ni `/decouvrir`, ni FAQ, ni détection de première visite).

### Points forts (à ne pas refaire)
Build propre, 0 vulnérabilité npm, 0 erreur de lint, aucun secret exposé · responsive de base solide (un seul débordement sur 90 combinaisons) · prix, noms de formules, texte Sankofa, page de confidentialité, consentement « privé par défaut » conformes · logo corrigé (« D'OFFRIR »), image de partage propre, images en webp avec chargement différé · formules centralisées dans `data/formulas.ts`, formule transmise à la commande · formulaire de commande avec vraie balise `<form>`.

### Bugs confirmés par test
| # | Problème | Où |
|---|---|---|
| B1 | `window.open(..., 'noopener')` renvoie toujours `null` : le « plan B » s'exécute à chaque fois, un onglet s'ouvre **et** l'onglet courant quitte le site ; les écrans « Merci » ne sont jamais vus et affirment « message transmis » alors que rien n'est envoyé | `utils/whatsapp.ts`, `ContactPage`, `ProposeIdeaPage` |
| B2 | Clic sur la carte **et** sur un lien interne : « Découvrir l'œuvre » ouvre 2 onglets ; « Je veux un projet similaire » ouvre la capsule **et** va vers `/services` | `InspirationsPage` |
| B3 | Débordement horizontal à 768 px sur la galerie (801 px), navbar tendue (nom collé, « À propos » sur 2 lignes) | `InspirationsPage`, `Navbar` |
| B4 | Page Services entre 1024 et ~1150 px : texte qui touche le bouton (hauteur fixe `h-12`), boutons non alignés | `ServicesPage` |
| B5 | Bouton « Commander » de la galerie mène à `/services` ; classe parasite `st` | `InspirationsPage` |
| B6 | Image de partage, `og:url`, sitemap et robots pointent vers `kofira.co` (non connecté) | `index.html`, `public/` |
| B7 | 10 `<label>` sans `htmlFor` ; cliquer sur le texte des radios ne coche rien ; date sans `min` (date passée acceptée) ; pas de verrou anti double envoi ; récapitulatif sans prix ; formule stockée par son titre | `OrderPage`, `ProposeIdeaPage` |
| B8 | Fenêtre de détail des formules : pas de `role="dialog"`, Échap ne la ferme pas | `ServicesPage` |
| B9 | Page 404 sans `Helmet` (titre du site conservé) ni `noindex` | `NotFoundPage` |

### Autres constats
- **Contrastes** : blanc sur or `#C9A86A` = 2,26:1 (norme 4,5) sur le bouton « Confirmer via WhatsApp », la navbar et les labels ; textes en `opacity-60` à 3,2:1.
- **Accessibilité** : bouton Commander de la navbar réduit à une icône sans nom accessible ; burger sans `aria-label` ; aucun style `focus-visible` ; aucune prise en charge de `prefers-reduced-motion` ; animations infinies (`animate-bounce`, `animate-ping`).
- **Poids** : un seul bundle JS de 494 Ko (151 Ko gzip), sans chargement par page ; `favicon-icon.png` de 302 Ko pour une icône de 40 px ; dix variantes de Cormorant chargées ; boutons du hero visibles seulement après ~1,3 s.
- **Design** : deux systèmes de couleurs (jetons Tailwind sur Commander/Proposer, ~290 couleurs en dur ailleurs), terracotta jamais utilisée, même recette répétée sur toutes les pages, visuel « capsule » = disque sombre avec icône cadeau qui rebondit, hero sans aucune image du produit, photos de stock dans la galerie (dont un bandeau « HAPPY BIRTHDAY »).
- **Textes** : anciens textes `explanation` ; promesses trompeuses pour un produit numérique (« œuvre tangible », « reliques palpables », « matériaux nobles… traversent les siècles ») ; « Fondée à Abidjan, 2024 » (le projet date de 2026) ; « nos capsules » vs « je » ; « Studio » vs « Maison » ; trois noms pour la page « Comment ça marche » ; numéro de téléphone brut (2250715383096) affiché deux fois.
- **Structure** : bonne arborescence, mais `PROJECTS`, étapes et liens dupliqués dans les pages ; numéro WhatsApp en dur (3 endroits) ; code mort ; commentaires quasi absents (11 fichiers sur 20 sans aucun) et parfois en anglais ; 8 scripts d'agent à la racine ; `stich-reference/` et `.claude/` suivis par git malgré le `.gitignore` ; `public/favicon.svg` affiche encore un « M » (Memora).
- **SEO restant** : pas de canonical ni de JSON-LD Organization, site rendu côté navigateur, aucun en-tête de sécurité dans `vercel.json`.

---

## 23. Les quatre capsules existantes (analysé en octobre 2026)

| Capsule | Univers | Ce que fait la capsule | Constats |
|---|---|---|---|
| `/suprice/` | **Musée** | Enveloppe à ouvrir, chargement, visite guidée, 4 salles, œuvres légendées, 3 vidéos, musique | Excellente structure. Accord de Grace Yasmine obtenu |
| `/Pourtoi/` | **Jardin Secret** | Portail, graine qui pousse, jardin de 12 fleurs (6 photos, 6 vidéos) avec phrase poétique ; le message final se débloque une fois toutes les fleurs ouvertes | Contenu écrit dans `script.js` ; message final signé « — Wilfried ». Accord de Grace Yasmine obtenu |
| `/nouv/` | **Parcours interactif** (anniversaire de Ruth) | Question OUI/NON, carrousel de photos, cartes « Tes univers & passions » (artistes, animés, séries), message d'anniversaire, champ pour répondre | Accord de Ruth **à confirmer** |
| `/Jean/` | **Livre 3D** (Jean-Jacques) | Livre dont on tourne les pages, 6 chapitres de vie | **Exemple pas terminé** : photos Unsplash, textes génériques ; pied de page « Créé avec ♥ en HTML, CSS & JavaScript » et « Ton ami développeur » ; la carte de la galerie dit « livre de famille » alors que c'est un anniversaire pour un ami |

**Ce que ça montre** : le format et le ton s'adaptent à la personne et le contenu vient de ce qu'elle aime (cartes, animés, séries, œuvres légendées). C'est la vraie signature de Kofira.

**Constats communs**
1. **Aucun verrou par date.** Le « déblocage » du jardin se fait par l'effort (ouvrir toutes les fleurs), pas par une date. La promesse « s'ouvre à la date choisie » n'est tenue par aucune capsule.
2. **Prénoms réels** dans les titres et descriptions de pages, ou dans les noms de fichiers ; l'orthographe diffère entre les deux capsules (« Grace Yasmin » / « Grâce Yasmine »).
3. **Musique commerciale** hébergée en public (dont un fichier extrait d'un clip YouTube) : risque de droits pour une démo d'un produit vendu.
4. **Noms de fichiers fragiles** (« WhatsApp Image … (1).jpeg »).
5. **Contenu mélangé au code** : chaque nouveau client oblige à modifier du JavaScript (ne tient pas à 6 000 FCFA).
6. **Dépôts publics** : le code du Jardin Secret a pu être lu sans compte. Les fichiers (photos, vidéos) d'un vrai client y seraient accessibles à quiconque trouve le dépôt. **À régler avant de recevoir de vrais clients** : héberger leurs capsules depuis des dépôts **privés** déployés sur Vercel (gratuit pour un compte personnel), et ne plus promettre « jamais partagés » sans cette précaution.
7. Les pages n'ont ni `noindex` ni retour vers le site.

---

## 24. Cadrage : ce que vend Kofira, origine honnête, validation

### Ce que vend Kofira (décidé)
Kofira conçoit des **sites-cadeaux personnalisés** (capsules). **Le client choisit l'univers (le format) et son contenu**, Wilfried place le contenu dans l'univers choisi et livre un lien privé que le client offre. Produit **numérique**, aucun objet physique.

**Phrase de base proposée (à confirmer par Wilfried)** : « Kofira crée des sites-cadeaux sur mesure : vous m'envoyez vos photos, vidéos et musiques, je les transforme en une expérience unique pour la personne que vous aimez, et vous la lui offrez par un simple lien. »
Ne **pas** écrire « s'ouvre à la date choisie » tant que le verrou par date n'existe pas.

**Univers** (noms provisoires) : Musée · Parcours interactif · Livre en 3D · Jardin · Sur mesure (mélange).

### Origine honnête (décidé)
Les capsules existantes (musée et Jardin Secret pour Grace Yasmine, parcours pour Ruth, livre pour Jean-Jacques) sont de **petites attentions faites à des proches**, pas des commandes. Quelqu'un à qui Wilfried les a montrées lui a dit que cela pouvait plaire et se vendre : Kofira est né de là. **Il n'y a pas encore de clients ni d'avis.** À raconter tel quel (page À propos, vidéo) ; ne pas laisser croire à une clientèle (« portfolio de clients », « fondée en 2024 », « nos clients »).

### Ce que ça implique
Prix, temps de production et déroulé réel d'une commande ne sont **pas testés** : ce sont des hypothèses. On les teste avec **3 à 5 clients pilotes** (tarif de lancement, témoignage et autorisation de publier en échange). Le site peut être amélioré en parallèle ; les premières commandes n'ont pas besoin qu'il soit parfait.

### Preuves réelles disponibles
Les personnes qui ont reçu les capsules : demander à **Grace Yasmine** et à **Ruth** ce qu'elles ont ressenti (question ouverte, mots exacts conservés, permission de publier, mention honnête « Reçu par … »). Une proche paiera une nouvelle capsule **musée + jardin** (prix non fixé, probablement inférieur au prix du site) : noter prix payé et temps passé.

---

## 25. Journal des décisions (8–14 octobre 2026)

| Décision |
|---|
| Le client choisit l'univers ; Wilfried place le contenu et fabrique |
| Origine honnête : attentions pour des proches, pas de clients pour l'instant |
| Découpage en **3 lancements** validé ; **pas de back-end ni de dashboard au lancement 1** (remplace le « plan en 5 semaines pour novembre ») |
| **kofira.co reporté** faute de moyens ; adresse Vercel gratuite, `SITE_URL` unique, projet Vercel à renommer si le nom est libre |
| **Vidéo promotionnelle après le site**, pas avant (voir §29) |
| **Appli mobile native reportée** ; version installable (PWA) possible au lancement 3 |
| Objectif : un site complet, professionnel, qui ne ressemble pas à un site « vibe codé » ; référencement visé de façon **réaliste** (d'abord « Kofira », puis requêtes précises ; pas de promesse de classement) |
| Accord de Grace Yasmine obtenu ; Ruth à confirmer ; Jean-Jacques = exemple pas terminé |
| Ajouter un lien discret **« Créé par Kofira → »** sur l'écran final de chaque capsule ; nettoyer les anciennes capsules (voir §27, piste C) |
| Mots interdits sur le site : tangible, palpable, matériaux nobles, traversent les siècles, nos clients, studio |
| Vouvoiement du visiteur et voix « je » partout (Wilfried est seul) ; vocabulaire fixe : capsule, univers, formule, Comment ça marche, Maison Kofira |
| **Trois univers affichés** sur le site : Musée, Parcours interactif, Jardin (Livre en 3D et Sur mesure ne sont plus des cartes ; le Livre en 3D n'est plus proposé dans la commande) — 14 octobre |
| **Captures vidéo des capsules pour la galerie reportées** après le lancement 1 ; la galerie garde ses photos d'ambiance, le bouton « Essayer une vraie capsule » sert de preuve |
| Les corrections du site sont désormais appliquées par de **petits scripts Node testés sur une copie du code** (`apply-p15`, `apply-p17`, `apply-p18`, `apply-p19`), car l'outil d'édition de Claude Code échouait sans le signaler |
| **Durée en ligne d'une capsule : 12 mois** (proposition, déjà codée dans `APP_CONFIG.hosting.months` ; un seul chiffre à changer) |
| Capsules de **vrais clients** : dépôt **privé** `kofira-capsules`, un dossier au nom aléatoire par capsule, balise `noindex`, à créer **avant la première capsule client** ; le plan gratuit de Vercel est réservé à un usage non commercial : plan payant ou hébergeur autorisé dès le premier encaissement |

---

## 26. Les trois lancements et les documents de cadrage

| Lancement | Contenu | Déclencheur |
|---|---|---|
| **1** | Site complet **sans back-end**, commandes par WhatsApp (écran « Votre message est prêt »), vraies captures de capsules, FAQ, À propos honnête | maintenant |
| **2** | Supabase : enregistrement des commandes, dashboard simple, **lien privé avec verrou par date côté serveur**, confirmation automatique, vrais avis | après 3 à 5 clients réels |
| **3** | Modèles réutilisables par univers (contenu séparé du code), avis avec étoiles, compte client, QR code, plusieurs destinataires, PWA | quand le lancement 2 tourne |

**Documents de cadrage (dossier `docs/`)** : `01-PRD.md` (produit) · `02-TRD.md` (technique, consigne standard pour l'agent) · `03-AppFlow.md` (routes, parcours, écrans) · `04-UX-UI-Design-Brief.md` (jetons de couleurs, polices, composants, mouvement) · `05-Backend-Schema.md` (lancement 2 uniquement, **à ne pas implémenter avant les premiers clients**) · `06-Implementation-Plan.md` (étapes P0 à P10). **En cas de conflit, ces documents prévalent sur ce rapport**, qui reste l'historique.

**Jetons de couleurs** : crème `#FDFBF7`, sable `#F5EDE0`, brun `#3D2B1F`, brun doux `#6B5848`, bronze `#7A5913` (boutons), or `#C9A86A` (sur fond brun seulement), terracotta `#C17B5A` (élément graphique) et `#9A4F32` (si du texte).

---

## 27. Suivi des étapes (état au 14 octobre 2026)

*Les sections 15, 16 et 19 sont remplacées par ce suivi. Méthode depuis le 10 octobre : chaque lot est appliqué par un **petit script Node testé sur une copie du code**, puis vérifié par build, lint et tests dans un vrai navigateur. Raison : l'outil d'édition de Claude Code échouait sur plusieurs fichiers sans le dire (le ZIP du 12 octobre était identique au précédent).*

### Lancement 1 : le site
| Lot | Contenu | Statut |
|---|---|---|
| P0 à P2 | Fondations, envoi de messages (WhatsApp), données et textes validés | Fait et vérifié |
| P3 à P9 | Composants UI, navigation, formules, univers, accueil, pages de texte, FAQ, chargement par page, JSON-LD, en-têtes de sécurité | Fait (vérifié dans les ZIP du 10 octobre) |
| P11 | Bug critique (champ « univers » qui faisait planter la page), labels liés, canonical par page, sitemap complet (10 adresses), classes inexistantes | Fait et vérifié |
| P12 | Titre de l'accueil, textes trop forts retirés, page de confidentialité aux jetons de couleur, `favicon.svg` supprimé | Fait |
| P13 / P14 | Menu en burger sous 1280 px, bug d'affichage des boutons de la page Formules, avertissements du lint | Fait en grande partie |
| **P15** | Lisibilité : boutons, titres dorés, paragraphes pâles, petits textes | **Appliqué par `apply-p15.mjs` : 22 corrections** (capture reçue) ; mesure : 27 textes sous la norme → 0 sur 10 pages |
| **P17** | FAQ (6e question, réponse « sécurité » plus précise), durée en ligne (12 mois) dans la configuration et dans « Comment ça marche » | **Appliqué par `apply-p17.mjs` : 6 modifications** (capture reçue) |
| Contrôle | `npm run build` : réussi en 6,2 s ; `npm run lint` : 0 avertissement, 0 erreur | Fait (captures reçues) |
| Tests locaux | Les 6 tests de Wilfried | Bons, sauf l'incohérence des univers entre accueil et galerie |
| P18 | `apply-p18.mjs` : cartes d'univers 3 + 2 centrées | Script fourni ; application non confirmée (le vrai problème était la cohérence, voir §32) |
| **P19** | `apply-p19.mjs` : accueil, galerie et commande sur les mêmes 3 univers | Script fourni (version A sans Ruth, version B `--ruth-ok`) ; **en attente du choix de Wilfried** |

### Avant le push (dans l'ordre)
1. Choisir la version de P19 (accord de Ruth), l'appliquer, puis `npm run build` et `npm run lint`.
2. Renommer le projet Vercel en `kofira…vercel.app` si le nom est libre, puis mettre l'adresse dans `site.config.json`.
3. Lighthouse mobile (objectif : 90 ou plus partout).
4. Dernier ZIP (sans `node_modules`, `dist`, `stich-reference`, `.claude`) pour le verdict final.
5. Push sur Vercel, seulement après le feu vert.

### Juste après le push
Tester la commande sur un vrai téléphone · créer le dépôt privé `kofira-capsules` **avant la première capsule client** (c'est ce qui rend vraie la réponse « sécurité » de la FAQ) · montrer le site à 5 personnes · envoyer l'offre de lancement à 3 à 5 personnes avec un tableau de suivi (date, formule, univers, prix payé, heures passées, accord de publication, témoignage).

### Piste parallèle : capsules et premiers clients
| Étape | Statut |
|---|---|
| C1 renommer le projet Vercel | À faire (avant tout lien « Créé par Kofira → ») |
| C2 nettoyer les capsules | Musée et jardin faits (voir §31) ; publication et test sur téléphone à confirmer |
| C3 « Créé par Kofira → » sur l'écran final | Reporté jusqu'à l'adresse finale |
| C4 Jean-Jacques : finir ou retirer ; orthographe de Grace Yasmine | En attente |
| C5 demander leurs impressions à Grace Yasmine et à Ruth | À faire (aussi : accord pour que le prénom apparaisse dans une vidéo partagée) |
| C6 capsule musée + jardin pour la proche | À faire ; noter prix payé et temps passé |
| C7 offre de lancement | Message à rédiger dès que le prix de lancement est fixé |
| C8 témoignages | À collecter |

### Reporté après le lancement 1
Captures vidéo pour la galerie (prompt P16) · vidéo promotionnelle (§29) · champ « Ouverture souhaitée » (paquet cadeau, enveloppe, portail) · appli mobile (PWA au lancement 3) · domaine `kofira.co` · back-end Supabase (lancement 2).

### Hors site
Enregistrer l'entreprise individuelle au CEPICI avant d'encaisser · vérification officielle de la marque (OAPI) · Del & Esther : en pause.

### Définition de « Terminé » du lancement 1
☑ Build et lint propres · ☑ aucun débordement d'écran de 320 à 2560 px (mesuré) · ☑ lisibilité mesurée sans défaut sur 10 pages · ☑ aucun texte interdit (grep) · ☐ aucun projet sans accord (dépend de Ruth) · ☐ aucun lien cassé (à vérifier à la main) · ☐ Lighthouse mobile ≥ 90 · ☐ parcours Commander testé sur un vrai téléphone · ☐ un testeur sur 5 sait dire ce que vend Kofira en moins de 10 s · ☐ aucun fichier parasite (`stich-reference` et `.claude` encore présents dans le dossier) · ☐ vraies captures à la place des photos de stock (**reporté**) · ☐ au moins une capsule pilote vendue ou en cours, avec prix et temps notés.

---

## 28. Questions ouvertes et points d'attention

**Décisions attendues de Wilfried**
1. **Ruth** : accord pour apparaître publiquement ? Elle détermine la version A ou B de `apply-p19.mjs`.
2. **Jean-Jacques** : finir la capsule (vraies photos, vrais textes) ou la retirer ?
3. **Prix de lancement** des 3 à 5 premiers clients (il ne figure pas dans le code, il s'envoie par WhatsApp).
4. **Nom du projet Vercel** (`kofira…vercel.app` si libre).
5. **Durée en ligne : 12 mois**, ma proposition déjà codée, à confirmer ou modifier (un seul chiffre dans `src/config/index.ts`).
6. **Musique** : le musée et le jardin utilisent un morceau commercial ; règle à fixer pour les démos publiques (musique libre de droits) et pour les musiques choisies par les clients.
7. Confirmer la **phrase de base** de l'accueil, les noms (provisoires) des univers, et « je prends le temps » dans la formule « Discutons ».

**Points d'attention**
- **Confidentialité des capsules clients** : les capsules actuelles sont dans des dépôts GitHub publics (celui du jardin a été lu sans compte). La réponse « sécurité » de la FAQ ne sera vraie qu'avec le dépôt privé `kofira-capsules` (dossiers au nom aléatoire, `noindex`). À mettre en place avant le premier client.
- **Plan gratuit de Vercel** : réservé à un usage non commercial. Dès le premier encaissement, plan payant ou hébergeur gratuit qui l'autorise (par exemple Cloudflare Pages) ; vérifier leurs conditions au moment venu.
- **Verrou par date** : n'existe nulle part ; ne pas le promettre avant le lancement 2.
- **Accord de Grace Yasmine** : il couvre la présentation de ses capsules ; demander s'il couvre aussi une vidéo partagée sur les réseaux (son prénom apparaît à l'écran de chargement du musée).
- **Message final du jardin** : intime, lisible dans le code d'un dépôt public.
- **Capacité** : sur 6 000 FCFA, la marge dépend du temps réel par capsule (inconnu).
- **Comptes rendus de l'agent** : ne pas se fier à « terminé » sans vérification (le ZIP du 12 octobre n'avait aucune des corrections annoncées).
- Les ZIP envoyés contenaient encore `node_modules`, `dist`, `stich-reference` et `.claude` : les retirer.

---

## 29. Vidéo promotionnelle (reportée après le lancement 1)

**Décision** : la vidéo vient **après** le site. Elle doit faire la même promesse, avec les mêmes images (captures réelles des univers) et la même phrase que le site.

**Constat sur le script validé** (≈ 190 mots, 75 à 90 secondes) : le ton est bon, mais ce qu'on vend n'est dit qu'à moitié ; c'est l'image qui doit le rendre concret. Prévoir une **version courte de 45 secondes** (de « Il y a des maisons… » à « …au moment que vous choisissez », puis « Bienvenue chez Kofira ») pour TikTok, statuts WhatsApp et Instagram, et une version longue pour le site. L'échange gratuit n'est cité qu'une fois ; les prix restent sur le site, pas dans la vidéo.

**Plans à l'image** : logo qui apparaît sur fond sombre · message WhatsApp qui se perd dans une longue liste · capsule scellée · photos, messages et musique qui entrent dans la capsule · le lien qui arrive dans WhatsApp · la capsule qui s'ouvre sur une **vraie capsule** (enregistrement d'écran) · « Bienvenue chez Kofira » avec le logo.

**Ce qu'il faut apprendre, dans l'ordre** : les bases du mouvement (rythme, une idée à la fois, storyboard sur papier) · le montage (DaVinci Resolve gratuit ou CapCut) · le son (voix enregistrée au téléphone dans une pièce calme, nettoyage avec Audacity, musique dont la licence est vérifiée) · l'animation de textes et de formes · plus tard seulement After Effects ou Blender. Option : **Remotion** (vidéo avec du code React ; vérifier sa licence pour un usage commercial).

**Conseil** : une vidéo de 45 secondes avec de vrais enregistrements d'écran et quelques titres animés aux couleurs du site vaudra mieux qu'une animation parfaite livrée trop tard.

> **Mise à jour du 14 octobre 2026** : les captures vidéo des capsules pour la galerie sont reportées après le lancement 1 (prompt P16 à préparer à ce moment-là). Le bouton « Essayer une vraie capsule » reste la preuve disponible.

---

## 30. Vérifications successives du code (ZIP du 10 au 12 octobre 2026)

*Pour chaque ZIP reçu : installation propre, build, lint, audit npm, puis tests dans un vrai navigateur (jusqu'à 11 pages × 9 largeurs d'écran, clics, formulaires, mesure automatique des contrastes).*

| ZIP | Ce qui était corrigé | Ce qui restait |
|---|---|---|
| 10 octobre (P0 à P9) | Parcours WhatsApp (un seul onglet, écran « Votre message est prêt »), double onglet de la galerie, modale accessible, aucun débordement, hero avec la phrase de base, À propos honnête, FAQ, JSON-LD, en-têtes de sécurité | **Bug critique** : taper dans « L'univers que vous imaginez » faisait planter la page ; labels non liés ; canonical de toutes les pages = accueil ; sitemap à une seule adresse ; classes inexistantes (`bg-beige`) ; contrastes ; navbar serrée à 1024 px |
| 11 octobre (P11) | Les cinq points ci-dessus corrigés et vérifiés (message WhatsApp avec le texte libre, labels liés, canonical par page, sitemap à 10 adresses) | Titre de l'accueil « Kofira \| Kofira » |
| 12 octobre (P12, P13) | Titre de l'accueil, textes trop forts, menu en burger, 1 seul avertissement de lint | **Bug visible** : sur 3 cartes de la page Formules, les boutons affichaient des noms de classes CSS ; numéro brut sur Contact |
| 12 octobre (P14) | Boutons Formules corrigés (vrais boutons, accessibles au clavier), numéro formaté, « immortaliser » retiré | Contrastes (27 textes sous la norme) |
| 12 octobre (second ZIP) | **Identique au précédent** : aucune correction de P15 n'avait été appliquée | Voir §27 : corrigé par `apply-p15.mjs` |

**Leçons** : (1) vérifier chaque lot dans un navigateur, pas seulement par le compte rendu de l'agent ; (2) pour les fichiers où l'outil d'édition échoue, passer par un script Node qui affiche pour chaque correction « fait », « déjà fait » ou « introuvable » ; (3) envoyer un ZIP sans `node_modules`, `dist`, `stich-reference` ni `.claude`.

---

## 31. Les capsules musée et jardin : nettoyage (octobre 2026)

**Musée de Grace Yasmine**
- Fait : balise `noindex` et description sans nom ; les 25 médias et la musique renommés en minuscules avec tirets (`musique.mp3`), références vérifiées ; vibration de l'enveloppe (±1,5°, cycle de 4 s) ; `100svh` en plus de `100vh` ; textes de 12 px minimum.
- Constaté : sur téléphone (≤ 768 px), les points de navigation des salles repassaient à 26 px et 10,4 px (la correction de 44 px ne valait que pour l'écran large) ; correctif CSS proposé : 40 px et 12 px, ajouté **à la fin** de `style.css` (statut à confirmer).
- Constaté, non traité : la barre « Chargement du musée… » est **fictive** (une minuterie, environ 2 secondes, sans lien avec le chargement réel) ; le prénom de Grace Yasmine est visible à l'écran de chargement ; musique commerciale.

**Jardin Secret**
- Fait : `noindex` et description générique ; 13 fichiers renommés (`image-1` à `image-7`, `video-1` à `video-5`, `musique.mp3`) ; les deux fonds hébergés dans le dossier (`bg-1.jpg` 54 Ko, `bg-2.jpg` 82 Ko) au lieu de liens Google temporaires ; pulsation du bouton d'ouverture (arrêtée en « mouvement réduit ») ; zones tactiles ; `100svh` ; 20 lucioles sur mobile (40 ailleurs).
- Bugs corrigés et vérifiés dans un navigateur : au second passage, les fleurs ne s'empilent plus (12 à chaque fois) ; **« Recommencer le voyage »** coupe la musique et la remet à zéro (le bouton son aussi) ; erreur `timer is not defined` à la fin du texte final (137 erreurs en 26 secondes) : **0 erreur** après correction.
- Reste : bouton « × » de la fenêtre sans `aria-label` (mineur) ; message final intime lisible dans le code d'un dépôt public ; musique commerciale ; publication par `git push` et test sur téléphone à confirmer.

**Capsules de Ruth et de Jean-Jacques** : non touchées. Les deux capsules nettoyées servent de démos publiques (accord de Grace Yasmine) ; les capsules de futurs clients iront dans le dépôt privé (§28).

---

## 32. Les trois univers affichés (décision du 14 octobre 2026)

**Constat de Wilfried** : l'accueil affichait 5 univers (Musée, Parcours interactif, Livre en 3D, Jardin, Sur mesure) alors que la galerie n'en montrait que 2 (Musée, Jardin). Ce qui avait été décidé : **trois univers**, dans l'ordre **Musée, Parcours, Jardin**.

**Correction** : `apply-p19.mjs`
- Nouveau champ `available` dans `src/data/universes.ts` (proposé dans la commande) en plus de `showInGallery` (affiché sur l'accueil et dans la galerie). Musée, Parcours, Jardin : affichés et commandables ; Sur mesure et « Je ne sais pas encore » : commandables, pas affichés en cartes ; Livre en 3D : ni l'un ni l'autre.
- Formulaire de commande : la liste « Format souhaité » ne propose que les formats disponibles.
- Avec l'option `--ruth-ok` : la carte de la capsule de Ruth devient « Un parcours interactif » (son ancien texte parlait d'une « chasse aux souvenirs », ce qui ne correspond pas à la capsule), elle est publiable et la galerie suit l'ordre Musée, Parcours, Jardin. Sans cette option, la galerie reste à 2 cartes tant que Ruth n'a pas donné son accord.
- Testé sur une copie : les deux versions, 0 introuvable, build et lint propres, aucune erreur dans le navigateur ; relancer le script ne change plus rien.

**Défaut qui reste** : la photo de la carte « Parcours » montre un bandeau « HAPPY BIRTHDAY » en anglais ; elle sera remplacée avec les vidéos.
