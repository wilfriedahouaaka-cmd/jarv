# Rapport de projet : JiaKo

> Rapport de suivi interne. En cas de conflit, le rapport de planification du 20 octobre prévaut sur le périmètre du MVP.
> Version texte du rapport de planification : `livrables/documents/jiako/rapport-de-planification.md` (le PDF est dans le même dossier).

Dernière mise à jour : 2026-10-22

---

## 1. En une phrase

JiaKo est une application web d'étude de marché guidée pour les petits entrepreneurs de Côte d'Ivoire : on part d'un modèle pré-rempli, on écrit son questionnaire en dix minutes, on partage un lien sur WhatsApp, on reçoit les réponses et un résultat lisible sans savoir en faire une. L'objectif chiffré est celui du portefeuille : 500 000 FCFA de chiffre d'affaires par mois d'ici 6 mois, avec 3 à 5 premiers clients payants.

---

## 2. Où j'en suis

**La planification est terminée. La validation terrain n'a pas commencé.**

**Fait le 20 octobre** : le rapport de planification, 12 sections. Verdict : Go pour la validation, No-Go pour le développement.

**Fait le 22 octobre** :

- Les étapes 0 à 4 de cadrage, produites dans `livrables/documents/jiako/` : compte rendu de lecture avec 8 contradictions (`etape-0-comprehension.md`), plan du MVP avec 5 indispensables et 11 reportés (`etape-1-plan-mvp.md`), comparatif de stack avec tarifs vérifiés et décision d'hébergement (`etape-2-stack.md`), direction artistique (`etape-3-direction-artistique.md`), architecture (`etape-4-architecture.md`)
- La direction artistique, validée
- L'architecture proposée, en attente d'accord
- **10 maquettes HTML/CSS interliées** dans `livrables/applications/jiako/maquettes/`, et **`index.html` est la page d'accueil du site**, pas une galerie. L'ancien `00-accueil.html` a été supprimé, son contenu déplacé dans `index.html`, et les liens des 9 autres pages réécrits. La galerie existe encore sous le nom `galerie.html`, mais **aucune page ne la lie** : elle s'ouvre en tapant l'adresse. Contrôle automatique des liens : **10 pages, 261 liens, aucune impasse, aucune cible manquante**
- **Les pages présentent JiaKo comme un produit, pas comme un dossier de travail** : les huit notices « Maquette statique » ont été retirées (contenu transféré dans `galerie.html`), les titres d'onglet nettoyés, la mention « Page de travail, octobre 2026 » du pied remplacée par « © 2026 JiaKo ». La classe CSS correspondante est renommée `.notice-travail`
- **Deux bandeaux conservés et reformulés**, parce qu'ils portent un vrai risque et pas une trace de maquette : sur `05-confidentialite.html`, l'avertissement « à relire avant publication, un juriste doit valider » (loi 2013-450, texte légal non vérifié) ; sur `06-contact.html`, le fait qu'aucun formulaire d'envoi n'existe encore
- **La direction de style du secteur appliquée aux maquettes** (22 octobre, dans la foulée) : boutons en pilule au rayon `--r-full` pour les distinguer des cartes, hero retravaillé (sous-titre court et direct, CTA secondaire « Voir les modèles »), et **les 5 états d'un écran dessinés** sur la page `07-etats.html` : chargement, vide, erreur, accès refusé, quota. Point de sécurité porté par le texte de l'accès refusé : il est formulé comme une page inexistante, pour ne jamais confirmer l'existence d'une étude chez quelqu'un d'autre
- **Le design system de Wilfried appliqué aux maquettes** (22 octobre, dernière opération) : `context/import/jiako-design-system.md` (« Warm Editorial Rigor », fourni dans ses Téléchargements), appliqué tel quel sur décision de lui. **Newsreader remplace Fraunces**, le **bouton primaire devient vert** et l'ambre passe en action d'accent/WhatsApp, l'échelle typographie est recalée (12/14/16/18/20/24/32/40), la largeur de page à 1040 px, boutons à 48 px, champs en pilule sur une ligne et 12 px en zone de texte, pastilles à 28 px sur fonds pastel, barres de résultat à 8 px. `tokens.css` réécrit, `composants.css` et `accueil.css` alignés. Contrôle automatique étendu : **151 classes toutes définies, 57 tokens tous utilisés, 0 style en ligne, 0 dégradé**
- **Trois bugs trouvés et corrigés pendant l'application** : le bouton primaire, devenu vert, serait passé fond vert sur fond vert dans la barre publique et l'appel final (passés en ambre, et règle de couleur de la barre réécrite en `:not(.bouton)` pour que le problème ne revienne pas) ; la classe `.pied-colonne`, utilisée dans les 9 pages sans exister dans le CSS (elle reçoit `min-width: 0`, qui empêche une adresse email longue de faire déborder le pied) ; 4 tokens morts supprimés (`--c-success`, `--lh-title`, `--r-lg`, `--shadow-lg`). Nouveau script de contrôle : `verifier-classes.mjs`
- **Deux barres collantes reçoivent l'ombre portée** : le design system prévoit une ombre pour elles, sans quoi la barre se confond avec le contenu qui défile dessous
- **L'analyse des 5 concurrents de design** (`analyse-design-concurrents.md`) : Alchemer, Qualtrics, QuestionPro, SurveySparrow, Similarweb
- **L'outil de suivi des interviews** (`suivi-interviews.md` et `.csv`) : les 6 questions, les verdicts définis à l'avance, les seuils, la procédure de saisie depuis un téléphone
- **Le chantier C, la recherche sur les outils d'enquête assistés par IA** (`chantier-c-outils-enquete-ia.md`), qualifié de « plus urgent et plus négligé » par le rapport du 20 octobre. Constat principal : **Tally AI génère déjà un formulaire complet à partir d'une description, gratuitement, sur tous les plans, sans limite d'usage IA**. Jotform et SurveyMonkey font de même avec des plafonds

**Non fait : 0 interview sur les 10 à 15 prévues.** Le fichier `suivi-interviews.csv` ne contient que l'en-tête. Le cadrage est solide sur papier, mais aucune personne de la cible n'a été interrogée et aucun pilote payé n'a été vendu.

---

## 3. Décisions prises

- **Go pour la validation, No-Go pour le développement** : ne rien coder avant 10 à 15 interviews et le bilan (20 octobre)
- **Périmètre = les 5 must-have du rapport du 20** : compte, étude guidée depuis 3 modèles avec 4 types de questions, lien public mobile avec partage WhatsApp, résultats simples, export CSV sécurisé. Pas de PDF, pas d'Excel (22 octobre)
- **Cible = petits entrepreneurs** : hypothèse retenue par défaut à partir de la recommandation, à confirmer par les interviews (22 octobre)
- **Modèle = freemium, 4 offres**, mais le MVP n'a aucun paiement (22 octobre)
- **Nom = JiaKo**, confirmé comme nom de travail (22 octobre)
- **Stack = React, TypeScript, Vite, Tailwind, Supabase, Recharts, shadcn/ui** (22 octobre)
- **Hébergement = Vercel gratuit pendant le développement, migration obligatoire vers Cloudflare Pages** avant la page de vente ou le premier client payant. Vérifié : le plan Hobby interdit l'usage commercial et peut suspendre un déploiement sans préavis (22 octobre)
- **Coûts = 0 $/mois** pendant le développement, 25 $/mois au premier client payant (Supabase Pro) (22 octobre)
- **Direction artistique validée** (22 octobre), puis **complétée le même jour par le design system « Warm Editorial Rigor » fourni par Wilfried**, appliqué tel quel : Newsreader en display, primaire vert #124A3D, ambre #E8A33D en action d'accent et partage WhatsApp, encre #192823, gris chaud #707975, papier chaud #FAF6EF, animations quasi nulles dans l'application. **Quand le design system et la direction écrite divergent, le design system gagne** : c'est lui qui a tranché. Source conservée dans `context/import/jiako-design-system.md`
- **Palette retenue dans la section « Colors » du document, pas dans son bloc YAML.** Le YAML annonce `#003228` en primaire et `#feb64e`, alors que les ombres et le halo de focus du même document utilisent `rgba(18, 74, 61, …)`, c'est-à-dire `#124A3D`. Le texte et les composants concordent, le YAML est incohérent avec eux
- **L'ambre ne sert plus de couleur de bouton principal.** Elle est réservée au partage WhatsApp et aux conversions posées sur fond vert, où un bouton vert serait invisible. Cas relevés et corrigés : barre publique, appel final de l'accueil, lien WhatsApp du contact, partage de carte des résultats
- **h3 en poids 500 là où h1 et h2 restent en 600**, pour suivre la hiérarchie du document (headline-md et headline-sm à 500) sans affaiblir les titres porteurs
- **`--c-success` supprimé des tokens** : plus aucun écran ne l'utilise après le passage des pastilles aux fonds pastel. À recréer dès qu'un état « succès » sera dessiné, plutôt que le laisser pourrir
- **Boutons en pilule, cartes en 12 px** : le rayon `--r-full` est réservé aux boutons, `--r-md` reste le rayon dominant des surfaces. La distinction dit à l'œil ce qui est cliquable (22 octobre)
- **Les 5 états d'un écran sont conçus avant d'être urgents** : chargement (squelette à la forme du contenu), vide, erreur, accès refusé, quota. L'accès refusé est formulé comme une page inexistante, jamais comme « cette étude appartient à quelqu'un d'autre », qui confirmerait l'existence de la ressource (22 octobre)
- **`index.html` est la page d'accueil du site, pas une galerie** : le fichier d'entrée porte le nom qu'aurait un hébergement réel. La galerie des maquettes (`galerie.html`) n'est liée par aucune page et ne figure dans aucune navigation (22 octobre)
- **Aucune trace visible de maquette dans les pages du parcours** : notices retirées (contenu conservé dans `galerie.html`), titres d'onglet nettoyés, mention « Page de travail » du pied remplacée par « © 2026 JiaKo ». Exception assumée : les deux bandeaux qui portent un vrai risque (texte légal à faire relire, formulaire inexistant) sont conservés, reformulés (22 octobre)
- **Architecture à deux surfaces de confiance distincte** : aucune policy INSERT sur `reponses` et `reponses_items`, tout passe par `soumettre_reponse()`, une fonction SECURITY DEFINER qui vérifie le token, le statut publié, l'idempotence, le quota et l'appartenance des questions à l'étude. En attente d'accord (22 octobre)
- **Maquettes : navigation dupliquée en HTML dans chaque fichier, source de vérité dans `navigation.md`**, aucun JavaScript pour la navigation (22 octobre)
- **3 surfaces de navigation** : barre publique (accueil, confidentialité, contact), barre d'application (4 écrans connectés), pied discret pour la page de réponse du répondant anonyme, qui n'a jamais accès à la navigation de l'application (22 octobre)
- **Pas de page Tarifs ni À propos** : aucun prix n'a été testé et rien n'est validé à raconter. Le lien Tarifs pointe vers la FAQ de l'accueil (22 octobre)
- **Identité confirmée face aux concurrents** : le papier chaud et le vert bouteille ne sont utilisés par aucun des 5 plateformes analysées. La direction validée est défendable, aucun ajustement n'est nécessaire (22 octobre)

---

## 4. Textes validés

- **La phrase de départ**, avec la cible mise à jour : « JiaKo aide les petits entrepreneurs à réaliser une vraie étude de marché sans connaître la méthode : il les guide pour écrire le questionnaire, collecte les réponses et produit un rapport clair. »
- **La direction artistique en 5 lignes** (ambiance, palette, typographies, images, animations), validée le 22 octobre, puis **le design system complet qui la complète le même jour** : palette, typographie, échelle, rayons, hauteurs, composants. Les deux documents sont conservés, avec les notes qui disent lequel fait foi
- **La source du design system** : `context/import/jiako-design-system.md`, copie du `design.md` fourni par Wilfried dans ses Téléchargements
- **Les coordonnées de contact** : WhatsApp 07 15 38 30 96 et wilfriedahouaaka@gmail.com, reprises du fichier de configuration et utilisées sur la page Contact

---

## 5. Objectifs

**Court terme (phase 1, validation sans code)** : 10 à 15 interviews avec un seul segment, en remplissant `suivi-interviews.csv` au fur et à mesure.

Seuils Go proposés dans le rapport du 20 octobre, à confirmer :

| Seuil | Cible |
|---|---|
| Ont réalisé ou prévoient une étude dans les 6 mois | 6 sur 10 ou plus |
| Ont déjà payé quelqu'un ou perdu beaucoup de temps | 4 sur 10 ou plus |
| Acceptent un prix précis, une précommande ou un pilote | 3 sur 10 ou plus |
| Inscriptions liste d'attente de personnes inconnues | 20 ou plus |

**Phase 2** : vendre à la main 3 à 5 études clé en main, noter les heures et le prix.

**Long terme** : 500 000 FCFA de chiffre d'affaires mensuel dans le portefeuille, dont JiaKo est un moteur possible.

---

## 6. Prochaines étapes

1. **Lancer les interviews**, c'est le seul vrai blocage. L'outil est prêt (`suivi-interviews.md`), il ne reste qu'à lister 10 noms
2. **Trancher les 6 questions ouvertes** : gratuit (30 réponses une fois ou illimité sur une étude), prix visibles ou renvoi WhatsApp, visuel du hero (page de réponse ou liste des études), section exemple réel, badge « la plus populaire », WhatsApp dans la navbar. Elles étaient prévues « avant la phase de maquettes » : les maquettes sont maintenant construites et avancent sans elles, donc le retard se paie sur les pages concernées (prix, hero, section exemple)
3. **Donner un avis sur l'architecture** proposée le 22 octobre
4. **Trancher les 3 points ouverts de l'architecture** : effet de la régénération de token sur les réponses existantes, design du honeypot, droit d'effacement du répondant anonyme
5. **Estimer le coût de l'IA** avant de promettre une analyse IA dans le plan gratuit
6. **Choisir le nom définitif** avant d'acheter un domaine ou de publier une page

---

## 7. Points de vigilance

- **Le No-Go et les maquettes.** Le rapport du 20 octobre dit « aucune ligne de code avant le bilan ». Les maquettes HTML/CSS ne sont pas du code de production : pas de build, pas de base de données, pas de serveur. Techniquement la règle tient. Mais le risque réel n'est pas juridique, il est temporel : on construit une interface sans avoir interrogé un seul prospect. Si les interviews disent que le besoin n'est pas là, tout le travail de design sera à refaire.
- **Aucune interview faite.** 0 ligne dans le CSV, sur 10 à 15 prévues. C'est le seul point qui bloque réellement le projet.
- **Le gratuit est faible face à QuestionPro**, qui offre 200 réponses par sondage et 30 types de questions gratuitement, à vie. La défense n'est pas le chiffre, c'est l'accompagnement. Si la page d'accueil met « 30 réponses » en gros et rien d'autre, la comparaison se perd.
- **Le différenciant IA est déjà pris.** Le rapport du 20 octobre recommandait de tester une seule fonction IA dans le MVP, et le chantier C du 22 octobre répond : **Tally AI génère un questionnaire complet à partir d'une description, gratuitement et sans limite**. Jotform et SurveyMonkey font pareil avec des plafonds. Une fonction « IA qui propose les questions » n'est donc plus un argument de vente, c'est un minimum attendu. La différenciation de JiaKo doit porter ailleurs : le contexte ivoirien, le français, le WhatsApp, le prix en mobile money, le livrable partageable.
- **Aucune preuve sociale au lancement.** Les 5 concurrents affichent des logos clients dans le premier écran. Aucun logo n'est disponible, et il ne faut surtout pas en inventer.
- **Nom provisoire** : jiako.com en vente à 8 255 $, jiako.co déjà enregistré, « Jako » est une entreprise allemande d'articles de sport phonétiquement très proche.
- **Légal** : la loi n° 2013-450 du 19 juin 2013 et l'ARTCI s'appliquent, avec une déclaration préalable à faire avant la bêta. Trois points restent à trancher avec un juriste.
- **Vercel Hobby interdit l'usage commercial** et peut mettre un déploiement en pause sans préavis. La migration vers Cloudflare Pages est obligatoire avant toute page de prix.
