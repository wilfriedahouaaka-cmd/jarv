# JiaKo

> Étude de marché guidée : planification de A à Z.
> Un étudiant ou petit entrepreneur crée une étude guidée à partir d'un modèle, partage un lien, reçoit des réponses et voit des résultats simples.

## Statut

| | |
|---|---|
| **Phase actuelle** | Phase 1, validation sans code. Cadrage terminé, maquettes produites |
| **Décision du 20 octobre 2026** | Go pour la validation, No-Go pour le développement |
| **Décisions validées le 22 octobre 2026** | Périmètre (rapport du 20), cible (petits entrepreneurs), modèle (freemium), nom (JiaKo), stack, hébergement, direction artistique |
| **Prochaine action** | **Lancer les interviews.** L'outil de suivi est prêt (`suivi-interviews.csv`), il ne reste qu'à lister 10 noms |
| **Blocage principal** | **0 interview sur 10 à 15.** C'est le seul vrai blocage, tout le reste est outillé |
| **Objectif de la phase** | Atteindre les seuils de la section 5 du rapport de planification, ou pivoter |

**Aucune ligne de code avant le bilan de la phase 1.** Ce n'est pas une posture théorique : JiaKo manipule des comptes et des données de tiers, donc le coût de construire correctement est élevé. Valider d'abord évite de payer ce coût pour un produit que personne ne veut.

**Précision sur ce qui a été produit le 22 octobre** : les documents de planification (étapes 1 à 3) ne sont **pas** du code. Ils préparent la phase 4 pour qu'elle soit rapide quand elle sera autorisée. C'est cohérent avec le No-Go, qui porte sur la production.

## Documents de référence

| Document | Où | Contenu |
|---|---|---|
| Rapport de planification (20 octobre 2026) | `livrables/documents/jiako/rapport-de-planification.pdf` | Le document de référence. 12 sections : idée, marché, concurrents, validation, faisabilité, MVP, préparation, plan d'exécution, risques, décisions, sources |
| Dossier de cadrage et identité (16 octobre 2026) | `livrables/documents/jiako/cadrage-et-identite.pdf` | Le dossier de cadrage d'origine, repris par le rapport du 20 octobre |
| Rapport de suivi (interne) | `context/rapports/JiaKo.md` | Le rapport de suivi, mis à jour à chaque avancée |
| Version texte du rapport de planification | `livrables/documents/jiako/rapport-de-planification.md` | La version texte du PDF du 20 octobre, lisible sans PDF |

**En cas de conflit**, le rapport de planification du 20 octobre prévaut : il est postérieur et reprend explicitement le dossier du 16 octobre.

## Le raisonnement, en une page

**Le problème** est crédible : les gens jonglent entre Google Forms, Excel, WhatsApp et Word, et n'obtiennent jamais de rapport exploitable. Le besoin est **ponctuel**, pas récurrent. C'est un lancement, un mémoire, une étude avant d'ouvrir.

**La collecte est gratuite.** Tally et Google Forms offrent des formulaires et des réponses illimités. JiaKo ne peut pas gagner sur la collecte, et ne doit pas essayer.

**La valeur possible est ailleurs** : le guidage (quoi demander, à qui), l'analyse (comprendre les réponses), le livrable (un rapport présentable) et le contexte local (français, exemples, prix, paiement mobile money). C'est exactement là que ton savoir-faire en IA et automatisation sert. Le dossier d'origine plaçait ça dans les « fonctionnalités futures », ce qui est une erreur : c'est le cœur.

**La question centrale non répondue** : comment le guidage fonctionne-t-il sans intervention humaine ? Des modèles par secteur ? Un assistant IA qui propose les questions ? Un accompagnement humain ? Le rapport du 20 octobre a isolé ce point comme le manque n°1 à combler.

**Le risque n°1 n'est pas technique, c'est la dispersion.** Tu es seul, Kofira n'a pas encore de client, et tu as 35 h par semaine. Lancer un produit multi-utilisateurs en parallèle de Kofira est le meilleur moyen de ne rien finir.

## Les 5 phases

| Phase | Contenu | Critère de sortie | Durée |
|---|---|---|---|
| 0. Cible et phrase | Un segment, la phrase de départ, les hypothèses | Segment et phrase écrits | 2 à 3 jours |
| 1. Validation sans code | 10 à 15 interviews, recherche de demandes, recherche des outils IA, liste d'attente | Seuils atteints, ou pivot assumé | 3 à 4 semaines |
| 2. Pilote manuel | 3 à 5 études clé en main, heures et prix notés | 3 clients payants, ou enseignements clairs | 3 à 6 semaines |
| 3. Bilan Go / No-Go | MVP, modèle de prix, rôle de l'IA | Décision écrite | 1 jour |
| 4. MVP | Les 5 must-have | Test d'accès croisé réussi, test sur téléphone | 6 à 10 semaines à temps partiel |
| 5. Bêta fermée | 10 à 20 utilisateurs réels | Pas de faille connue, retours intégrés | 3 à 4 semaines |
| 6. Lancement payant | Paiement mobile money, CGU, ARTCI, CEPICI | Conditions légales vérifiées | À estimer |

**Phases 0 et 1 en premier, et elles ne demandent aucune ligne de code.** C'est pour ça qu'elles peuvent avancer pendant que Kofira cherche ses premiers clients. Mais la phase 4 ne commence pas avant le bilan de Kofira.

## Le MVP, en une phrase

Un étudiant ou petit entrepreneur crée une étude guidée à partir d'un modèle, partage un lien, reçoit des réponses et voit des résultats simples.

**Indispensable :** un compte (auth fournie par la plateforme), créer une étude depuis 3 modèles maximum avec 4 types de questions, un lien public de réponse pensé pour le téléphone avec partage WhatsApp, des résultats simples (comptages, barres, liste des réponses), un export CSV sécurisé.

**Peut attendre :** rapport PDF, export Excel, abonnements, rôles et collaboration, panel de répondants, intégrations, application mobile.

**Stack :** React, TypeScript, Vite, Tailwind, Supabase (auth, PostgreSQL, RLS), Recharts, shadcn/ui. Rien de nouveau à apprendre, pas de serveur Node séparé à sécuriser. Next.js n'est pas nécessaire, le SEO ne sert à rien derrière un compte.

**Hébergement :** **Vercel gratuit pendant le développement** (outil connu, 0 $/mois), avec une règle écrite : **migration obligatoire vers Cloudflare Pages** avant la mise en ligne de la page qui annonce les prix, ou avant le premier client payant. Vérifié le 22 octobre : le plan Hobby de Vercel interdit explicitement l'usage commercial et peut mettre un déploiement en pause sans préavis. Cloudflare Pages n'interdit pas le commercial et offre une bande passante illimitée. Détail dans `livrables/documents/jiako/etape-2-stack.md`.

## Modèle de données du MVP

| Entité | Champs clés | Règle d'accès |
|---|---|---|
| Utilisateur | Géré par l'authentification | Chacun voit son compte |
| Étude | id (UUID), propriétaire, titre, description, statut (brouillon, publiée, fermée) | Le propriétaire lit et écrit |
| Question | id, étude, type, libellé, options, position | Lecture publique si l'étude est publiée, écriture par le propriétaire |
| Réponse | id, étude, date, clé unique de soumission | Insertion publique via une fonction contrôlée, lecture par le propriétaire seulement |
| Réponse à une question | id, réponse, question, valeur | Comme la réponse |

**Règle d'or :** personne d'autre que le propriétaire de l'étude ne peut lire ses réponses. À tester avec deux comptes différents avant toute bêta.

## Sécurité, points spécifiques à JiaKo

Le standard général est dans `context/guide/GUIDE-COMPLET.md`. Voici ce qui est propre à JiaKo et ne se trouve pas ailleurs.

| Menace | Où dans JiaKo | Protection |
|---|---|---|
| **Injection de formules dans les exports** | Un répondant écrit `=...` ou `+...` et l'export CSV l'exécute dans Excel | Neutraliser les cellules qui commencent par `=`, `+`, `-`, `@` à l'export. Ce point n'est pas dans le guide, il est réel |
| IDOR | Changer l'identifiant d'une étude dans l'URL | UUID, RLS, vérification du propriétaire à chaque requête |
| XSS | Réponses en texte libre affichées dans le tableau de bord | Échapper tout texte de répondant, CSP |
| Spam et bots | Lien public de réponse | Honeypot, limitation par appareil ou adresse, limite de réponses par étude, captcha si besoin |
| Force brute | Connexion | Authentification fournie par la plateforme, ne pas écrire son propre hachage, vérifier les limites de débit |
| Secrets | Clés d'API | Clé `service_role` jamais dans le navigateur, `.env` non commité |
| Données des répondants | Base de données | Minimiser, anonymat par défaut, aucune donnée sensible inutile |
| Abus du plan gratuit | Création massive de comptes ou d'études | Limites par compte, vérification d'email |

**Les 10 défis d'ingénierie, appliqués :** concurrence (quota de réponses, compteur atomique), idempotence (clé unique par soumission), atomicité (réponse et réponses aux questions ensemble via fonction RPC), scalabilité (la route publique de réponse est le point fragile), autorisation (critique, tests d'accès croisés avant bêta), multi-services (plus tard, clés d'idempotence sur les notifications de paiement), migrations (compatibles avec l'ancienne version, retour arrière possible), hors ligne (réessai sans doublon), fiabilité de l'IA (afficher les sources, ne pas laisser l'IA inventer des chiffres), CAP (non applicable, une seule base).

## Légal, à confirmer

Ce n'est pas un avis juridique, c'est la liste des points à faire confirmer.

- **Côte d'Ivoire** : la loi n° 2013-450 du 19 juin 2013 sur les données personnelles s'applique, avec l'ARTCI comme autorité. Tout traitement doit faire l'objet d'une déclaration préalable ou d'une autorisation.
- **RGPD** : ne s'applique que si des répondants se trouvent dans l'Union européenne.
- **Rôles** : tes utilisateurs collectent les réponses de leurs répondants, tu héberges. Qui est responsable de quoi doit être clarifié avec un juriste puis écrit dans les CGU.
- **Consentement** : informer les répondants de l'usage de leurs réponses, interdire la collecte de données sensibles (santé, opinions politiques, religion), définir la durée de conservation et la suppression.
- **Transferts à l'étranger** : Supabase et Vercel hébergent hors du pays, ce point est encadré par la loi.
- **Paiement** : le mobile money passera par un service local, à identifier, avec ses frais et ses exigences. Entreprise enregistrée au CEPICI probablement nécessaire.

## Coûts fixes

**0 $ par mois pendant le développement.** Décision du 22 octobre, après vérification des tarifs et des conditions d'usage : Cloudflare Pages est gratuit et n'interdit pas le commercial, Supabase Free suffit tant que tu touches à la base régulièrement.

| Moment | Coût | Quand payer |
|---|---|---|
| Développement et bêta | **0 $** | — |
| Premier client payant | **25 $/mois** (Supabase Pro) | Quand un utilisateur dépend de la disponibilité |
| Nom de domaine | ~12 $/an | Une fois, avant de publier le lien |

**Pourquoi Supabase Pro à ce moment-là et pas avant** : le plan gratuit met le projet en pause après une semaine d'inactivité. Tant que tu développes, tu touches à la base, donc rien ne se passe. Dès qu'un client a partagé un lien à ses propres clients, un downtime te coûte de la crédibilité irrécupérable. C'est là que les 25 $/mois se justifient.

**Comparaison avec l'estimation initiale** : le rapport du 20 octobre prévoyait ~45 $/mois (Supabase Pro + Vercel Pro) et en faisait un blocage : il fallait attendre de facturer. Avec Cloudflare Pages, ce blocage n'existe plus.

### Couverture par prix de vente

À 25 $/mois de coûts fixes, hors frais de paiement mobile, e-mails transactionnels, domaine et IA :

| Prix par étude | Études pour couvrir les coûts |
|---|---|
| 2 000 FCFA | 13 |
| 5 000 FCFA | 5 |
| 10 000 FCFA | 3 |

Le coût de l'IA est variable : il faut l'estimer avant de promettre une analyse IA dans le plan gratuit.

## Direction artistique et design system

**Direction artistique validée par Wilfried le 22 octobre 2026**, puis complétée le même jour par un **design system fourni par lui : « Warm Editorial Rigor »**. La source est conservée dans `context/import/jiako-design-system.md`. Quand le design system et la direction écrite divergent, **le design system gagne** : c'est Wilfried qui a tranché.

Le document YAML du design system annonce une palette différente (`#003228` en primaire). On retient la palette décrite en clair dans la section « Colors », parce que les composants du même document (ombres, halo de focus) utilisent bien `rgba(18, 74, 61, …)`, c'est-à-dire `#124A3D`.

```
Ambiance      : Confiance sobre, vérité de terrain. Un outil sérieux qui parle aux gens,
                pas un rapport de consultant

Palette       : Vert bouteille profond #124A3D (primaire, action principale)
                + ambre marigold #E8A33D (accent, partage WhatsApp)
                + papier chaud #FAF6EF (surface) + encre #192823 (texte)
                + gris chaud #707975 (secondaire)

Typographies  : Newsreader, en display seulement (titres, chiffres clés)
                Public Sans, pour tout le reste

Images        : Aucune photo de banque. L'interface elle-même est l'image, plus une carte de
                résultat conçue pour être capturée et partagée sur WhatsApp

Animations    : Application quasi nulle, 150-250 ms, transform et opacity seulement
                Page d'attente ouverte : révélations au scroll en CSS natif, 0 Ko de JavaScript
```

**Les règles du design system appliquées aux maquettes** :

- **Le primaire est le vert**, l'ambre devient l'action d'accent (partage WhatsApp, conversion sur fond vert). Rôle inversé par rapport à la direction écrite du 22/10, sur décision de Wilfried.
- Boutons en pilule, **48 px de zone tactile**, fond vert pour le primaire, ambre pour l'accent, contour 1,5 px pour le secondaire.
- Cartes à 12 px, padding 16 px en mobile et 24 px au-delà de 640 px, largeur de page 1040 px.
- Champs : **pilule sur une ligne, 12 px pour les zones de texte**, halo de focus vert.
- Pastilles de statut : 28 px, fond pastel et encre foncée (jamais la couleur seule).
- Barres de résultat : 8 px de haut, rayon 4 px, piste sable.
- Grand chiffre : Newsreader 28 px, chiffres tabulaires.
- Ombres teintées de vert, deux niveaux seulement : légère pour les cartes, portée pour ce qui flotte.

**Les règles de couleur qui vont avec** :

- L'ambre #E8A33D est **trop faible en contraste sur le papier #FAF6EF** pour porter du texte. Il sert uniquement de fond de boutons, de soulignement, de marque.
- Le texte est toujours encre sur papier, ou papier sur vert. Jamais d'ambre en texte courant.
- Contraste exigé : 4,5:1 pour le texte courant, 3:1 pour le grand texte.

**Le test d'identité** : si je collais le logo de Kofira ou de Sika sur une page JiaKo, est-ce qu'on verrait la différence ? Oui : Kofira est un site émotionnel, JiaKo est un outil de vérité. Deux univers.

**À retenir pour la suite** : deux budgets de mouvement (quasi nul dans l'application, ouvert sur la page d'attente) ; la carte de résultat partageable n'est pas dans le MVP mais ses proportions sont pensées dès maintenant ; `prefers-reduced-motion` respecté dès le premier jour, c'est une exigence WCAG.

## L'architecture

**Document : `livrables/documents/jiako/etape-4-architecture.md`** (22 octobre 2026)

L'architecture sépare **deux surfaces à niveau de confiance distinct**, et c'est le principe qui organise tout le reste :

| Surface | Routes | Sécurité |
|---|---|---|
| **Privée** | `/app/*`, authentifiée | RLS, policy sur chaque table |
| **Publique** | `/r/:token`, anonyme | Aucune policy INSERT, tout passe par des fonctions RPC |

**Le cœur du dispositif** : `reponses` et `reponses_items` n'ont **aucune policy INSERT**. Le droit d'écriture n'existe que dans `soumettre_reponse()`, une fonction `SECURITY DEFINER` qui vérifie tout : le token, que l'étude est publiée, l'idempotence (clé unique), le quota (compteur atomique), et **que chaque question appartient bien à l'étude du token**.

Résultat : si le code React contient un bug, **la base refuse quand même**.

| | |
|---|---|
| **7 tables** | `profils`, `etudes`, `questions`, `reponses`, `reponses_items`, `compteurs`, `modeles` |
| **3 fonctions RPC** | `lire_etude_publique`, `soumettre_reponse`, `supprimer_reponse` |
| **Rate limiting** | Fonction `check_request()` déclarée via `pgrst.db_pre_request`, qui tourne avant chaque requête, lit l'IP dans `x-forwarded-for`, et rejette au-delà du seuil. Table dans le schéma `private` pour que les IP ne soient pas lisibles |

**3 points restés ouverts** (section 9 du document) : l'effet de la régénération de token sur les réponses existantes, le honeypot, et le droit d'effacement du répondant anonyme.

## Le nom

JiaKo reste un **nom de travail**. Le sens « interroger le marché » est une construction personnelle, et les sens agni ne sont pas vérifiés.

| Constat | Conséquence |
|---|---|
| `jiako.com` en vente à 8 255 $ (renouvellement 18,48 $ par an) | Trop cher, ne pas acheter |
| `jiako.co` déjà enregistré depuis 2023 | Non disponible |
| `jiako.org` 8,48 $ puis 14,48 $ | Optionnel, à revoir |
| `jiako.io` 29,98 $ puis 65,98 $ | Cher |
| `jiako.ai` 89,98 $ | Trop cher |
| « Jako » est une entreprise allemande d'articles de sport, phonétiquement très proche | Risque de confusion |
| Jiahao (chinois) et Aiko (japonais) | Le nom mélange des influences sans en assumer une |

Décide du nom définitif avant d'acheter un domaine ou de publier une page. Fais valider les sens agni par des locuteurs, et vérifie les marques (OAPI, WIPO) et les comptes de réseaux sociaux.

## Le dossier du projet

```
jiako/
├── README.md                    # ce fichier
├── plan-de-travail.md           # le plan d'action détaillé, phase par phase
├── parcours-technique.md        # le chemin de construction, étape par étape
├── direction-design.md          # le design 2026, et les références à m'envoyer
├── maquettes/                   # 10 pages HTML/CSS interliées. index.html EST l'accueil du site, galerie.html est hors navigation. navigation.md + verifier-liens.mjs
└── (le code, plus tard)
```

| Document | Ce qu'il contient |
|---|---|
| `plan-de-travail.md` | Les 6 phases de validation, les 5 chantiers de la phase 1, les seuils Go, ce qu'il ne faut pas faire, les 8 décisions |
| `parcours-technique.md` | Le chemin jusqu'à l'application en production : la page d'attente, la décision sur le guidage, le socle technique, les 5 must-have, la bêta. Chaque étape a un livrable et une condition de passage |
| `direction-design.md` | L'état réel du design web 2026, vérifié avec les chiffres. Le budget de mouvement par surface, la checklist de fin de chantier, et la liste des références à m'envoyer |

**Les documents produits le 22 octobre 2026** sont dans `livrables/documents/jiako/` :

| Document | Ce qu'il contient |
|---|---|
| `etape-0-comprehension.md` | Le compte rendu de lecture des deux PDF, 8 contradictions, 6 points flous |
| `etape-1-plan-mvp.md` | **Le plan du MVP** : 5 indispensables, 11 reportés, ordre de construction en 11 étapes estimé à 16-22 jours, cas limites par fonctionnalité, et les précautions légales sur les données de répondants |
| `etape-2-stack.md` | Le comparatif de stack, les tarifs vérifiés le 22 octobre, et la décision d'hébergement qui lève le blocage budgétaire |
| `etape-3-direction-artistique.md` | **La direction artistique en 5 lignes**, validée par Wilfried le 22 octobre |
| `etape-4-architecture.md` | **L'architecture** : 2 surfaces de confiance distincte, 7 tables, 3 fonctions RPC, RLS, rate limiting |
| `chantier-c-outils-enquete-ia.md` | La recherche sur les outils d'enquête assistés par IA. Constat principal : **Tally AI fait déjà le guidage IA, gratuitement et sans limite** |
| `analyse-design-concurrents.md` | L'analyse du design de 5 plateformes, les standards du secteur, les 5 différenciateurs de JiaKo, les recommandations |
| `suivi-interviews.md` + `.csv` | L'outil de suivi des interviews. **Le CSV est vide : 0 interview faite** |

Le rapport de suivi interne est dans `context/rapports/JiaKo.md`, mis à jour le 22 octobre 2026.
