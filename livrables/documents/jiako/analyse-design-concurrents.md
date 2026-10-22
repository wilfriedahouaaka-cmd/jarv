# Analyse du design des concurrents de JiaKo

> Mission : nourrir le design de JiaKo à partir de 5 plateformes, sans rien copier.
> Rédigé le 22 octobre 2026. Aucune ligne de code n'a été écrite dans cette mission.

> **Mise à jour du 22 octobre 2026 (même jour).** L'analyse reste valable sur le fond : le vert en dominante face à l'orange d'Alchemer, le papier chaud, le test d'identité. En revanche, **le design system « Warm Editorial Rigor » fourni ensuite par Wilfried a remplacé Fraunces par Newsreader** et changé l'encre `#14171A` en `#192823`. Les mentions de Fraunces plus bas décrivent la direction d'origine, pas ce qui est en place.

---

## 0. Ce que j'ai observé, et ce que je n'ai pas vu

C'est le point le plus important du document. Toute la suite doit se lire à l'aune de cette limite.

**Ce qui a été observé réellement :**
- Le texte intégral des pages d'accueil et des pages tarifs des 5 sites (rendu HTML servi par le serveur).
- L'ordre exact des titres de section (h1/h2/h3), les libellés des boutons d'action.
- Les polices et les couleurs, extraites des feuilles de style réelles de chaque site.
- Les pages tarifs : structure des formules, volumes, conditions visibles dans le HTML.

**Ce qui n'a PAS été vu, et sur quoi je ne dis rien :**
- **Les images rendues** : les captures d'écran de produit, les illustrations, les photos. Je n'ai que les textes alternatifs.
- **L'interface connectée des 5 outils** (création d'un questionnaire, tableau de bord, graphiques, export). Tout est derrière une authentification. **Je te demande des captures d'écran si tu veux que j'analyse cette partie.**
- **Les prix exacts de SurveySparrow et Similarweb** : ils sont calculés côté client (JavaScript), absents du HTML servi.
- **La typographie de Qualtrics** : non résolue dans les CSS que j'ai pu récupérer.

Conséquence directe : mes recommandations sur le **tableau de bord** s'appuient sur les principes de simplicité et sur les maquettes JiaKo existantes, **pas** sur une observation d'interface concurrente. Je le signale à chaque fois que c'est pertinent.

---

## 1. Alchemer — alchemer.com

**Accueil, ordre des sections (observé) :** h1 « See every signal. Focus where it matters. » → section problème (« Finding feedback? Easy. Finding clarity? Not so much. ») → centralisation des signaux → preuve sociale (« Trusted by customer-obsessed teams everywhere ») → section IA (Alchemer Iris) → support humain (« Real humans. Real help. No extra charge. ») → la plateforme → segmentation par type d'organisation → 4 raisons de choisir → les chiffres → ressources.

**Navigation (observé) :** mega-menu de 4 piliers, **12 produits distincts** listés (Listings Management, Local Pages, Survey, Digital Experience, Reputation Management, Social Media Management, Integrations, Dashboard, AI Sentiment Analysis, Competitive Intelligence, Iris, Research Solutions, Panel Services). Un prospect doit comprendre la différence entre « Collect » et « Clarity » avant de savoir ce que ça fait.

**Style (observé, extrait du CSS) :** police **Nunito Sans** (ronde, chaleureuse). Fond **#F0F0ED** (gris chaud, très légèrement teinté), accent orange **#F7941D**, vert foncé **#1E352F** en secondaire, gris **#858580**. Densité d'espace blanc élevée.

**Tarifs (observé) :** titre « Premium Feedback Tools (Without the Premium Price) ». Formules à partir de **$55/mois** (équivalents €50 / £40), jusqu'à $385/mois. Volume de réponses comme variable d'échelle : 75k, 100k, 125k réponses/an. Remises affichées (jusqu'à 52%). Un **questionnaire de recommandation** (« Find Your Perfect Plan ») pose 7 questions (nombre d'accès, réponses/mois, branding, types de questions, analyse, support, sécurité) puis recommande une formule. Pas de formule gratuite visible dans les prix extraits.

**Preuves (observé) :** « 11 000+ clients dans 80+ pays, 30+ industries » et « temps d'attente support moyen sous 2 minutes ».

**Points faibles pour JiaKo :** la navigation est un empilement de produits. Un étudiant ou un commerçant débutant ne saura jamais par où commencer. Le questionnaire de recommandation est bien pensé mais suppose déjà de comprendre son besoin.

**Ce qui ne convient pas à ton public :** tout. Alchemer vend à des chaînes multi-points de vente et à des organisations à mission. C'est l'opposé d'un commerçant de Koumassi qui vend sur WhatsApp.

---

## 2. Qualtrics — qualtrics.com/fr

**Accueil, ordre des sections (observé) :** h1 « Le leader en gestion de l'expérience » → section plateforme (« Faites de l'expérience votre point fort ») → 3 bénéfices (« Anticipez les variations du marché », « Transformez les moments en résultats mesurables », « Agissez où cela compte vraiment »), chacune suivie d'un encadré « Comment Qualtrics se distingue » → cas clients (« Découvrez comment nous avons aidé de grandes organisations ») → section confiance (« La confiance n'est pas une option. C'est notre historique. ») → 3 piliers (Écoute / Comprendre / Agir) → un livre blanc (« Tendances mondiales 2026 de l'expérience collaborateur ») → appel final.

**Navigation et CTA (observé) :** **un seul CTA répété sur toute la page : « Demander une démo ».** Aucun essai gratuit, aucun « Commencer », aucun prix. La page tarifs (`/fr/pricing/`) est un formulaire (prénom, nom, société, fonction, email pro, téléphone, pays) suivi de « Nous vous contacterons très prochainement ». Les 3 suites (Customer Experience, Employee Experience, Strategy & Research) sont présentées sans aucun chiffre. Une FAQ tarification explique ce qu'est « une interaction ».

**Style (observé) :** accent **#20FFC1** (vert menthe électrique) repéré dans le code. Typographie non résolue de mon côté. Photographie lifestyle (femme, smartphone, café) sur le hero. **[Supposé]** le reste de la palette, non vérifié.

**Preuves (observé) :** logos de grandes marques (« Les plus grandes marques nous font confiance »), section confiance dédiée, cas clients chiffrés.

**Points faibles pour JiaKo :** c'est le cas extrême. Le prospect ne peut **rien** faire sans parler à un commercial. Le jargon (« expérience », « signal », « moment », « programme XM ») décrit une discipline, pas un besoin.

**Ce qui ne convient pas à ton public :** tout, sans exception. Qualtrics n'a pas de client de moins de 100 personnes. C'est un bon exemple de **ce qu'il ne faut surtout pas devenir** : une page qui ne laisse aucune porte ouverte à quelqu'un qui veut juste essayer.

**Le seul élément à retenir :** le principe d'une section « ce qui nous distingue » attachée à chaque bénéfice, plutôt qu'un bloc général. C'est propre, mais c'est du texte, pas du design.

---

## 3. QuestionPro — questionpro.com

**Accueil, ordre des sections (observé) :** h1 « AI-Powered insights, backed by real experts. » → « All your insights, one platform » présentant **4 produits** (Surveys & Research, Market Research, Customer Experience, Employee Experience) → preuve sociale → section IA détaillée en 5 capacités (valider une recherche en minutes, réponses vidéo + sentiment, rapport résumé en un clic, sondage complet en 60 secondes, questions générées par IA) → panel de répondants (« Real people. Real answers. Always. ») → « Proven at scale » → « Stop waiting weeks for insights » → prix et certifications.

**Navigation et CTA (observé) :** CTA multiples et clairs : « SIGN UP FREE », « Start for free », « Try for free », « Book a demo ». Le gratuit est le chemin par défaut.

**Tarifs (observé) :** 4 formules.
- **Essentials — gratuit** : 1 utilisateur, **200 réponses par sondage**, 30 types de questions, support chat et email 24/7, « Upgrade any time! »
- **Advanced — « Most popular » — $99/utilisateur/mois** facturé annuellement : 25 000 réponses/an, 38 types de questions, branding, essai gratuit 10 jours
- **Team Edition — $83/utilisateur/mois** : 5+ utilisateurs, 100 000 réponses/an, 46 types de questions, data centers régionaux, account manager dédié
- **Research Suite — sur demande** : 10+ utilisateurs, panel de **22 millions de répondants**

**Style (observé, extrait du CSS) :** **Fira Sans** (texte) et **Fira Code** (chiffres/technique). Bleu **#1B87E6**, bleu marine **#1B3380**, **jaune vif #FFE303**, gris **#545E6B**. C'est la palette la plus criarde des 5.

**Preuves (observé) :** logos de marques, « Trusted by Market Research, CX, and HR teams », awards et certifications.

**Points faibles pour JiaKo :** 4 produits empilés dès l'accueil, jargon (VoC, CX, HR) et tableau tarifaire dense à 4 colonnes. Le gratuit est généreux mais l'offre payante saute de 0 à $99/mois : il n'y a rien entre les deux pour un petit commerce.

**C'est ton concurrent le plus direct sur le gratuit.** À connaître.

---

## 4. SurveySparrow — surveysparrow.com

**Accueil, ordre des sections (observé) :** h1 « Stop guessing why customers are unhappy », sous-titre « Let AI uncover the truth » → « Every response becomes a conversation » → taux de réponse → « Capture feedback at the exact moment it happens » → « See patterns. Not spreadsheets. » → « Ask your data anything. Get answers instantly. » → automatisation des réponses ouvertes → 4 cas d'usage (Market Research, Customer Feedback, Forms, Pulse surveys) → « Reach customers where they are » → « Go from zero to insight in minutes » → section IA (Echo AI) → preuves → intégrations.

**Navigation et CTA (observé) :** « Start free » et « Book a demo » côte à côte. Le menu tarifs s'appelle « Pricing » et pointe vers `/pricing-get-quote/`, c'est-à-dire une page de **devis**.

**Tarifs (observé) :** 4 formules, et c'est la chose la plus utile de mon analyse pour toi. **Chaque formule nomme explicitement sa cible** :
- **Basic — « For students, freelancers, and personal projects »** : 2 500 réponses, 1 utilisateur
- **Starter — « For solo creators, blogs, and early-stage founders »** : 15 000 réponses, 1 utilisateur
- **Business** et **Enterprise** : sans cible écrite dans le HTML
- Essai gratuit 14 jours **sur toutes les fonctionnalités**, bascule trimestriel/annuel avec remise jusqu'à 40 %
- **[Non observé]** les montants exacts : rendus côté client, absents du HTML servi.

**Style (observé, extrait du CSS) :** police **Tenon** (via Adobe Typekit). Indigo **#4F46E5**, turquoise **#99F6E4**, fonds pastel **#F0FDFA / #ECFEFF / #EEF2FF**. Palette pastel déclinée en dégradés doux.

**Preuves (observé) :** « 2k+ avis », « Up to 40% higher response rates », « 92% completion rate », intégrations Slack/HubSpot/Zendesk/PowerBI, traduction en 130+ langues.

**Points faibles pour JiaKo :** hero chargé d'images en parallax (arrière-plan, premier plan, fond — trois calques d'images). Mauvais sur un forfait mobile. La page tarifs redirige vers un formulaire de devis pour certaines formules. Jargon NPS/CSAT/CES.

**Ce qui ne convient pas à ton public :** les 130 langues et les intégrations Zendesk sont hors sujet. En revanche **la nomination de la cible sous chaque formule est exactement ce qu'il te faut**.

---

## 5. Similarweb — similarweb.com (uniquement présentation des données)

**Accueil (observé) :** h1 « Win Your Market with AI-Powered Digital Data », promesse « All your digital channels. One holistic view. ». Le CTA principal n'est pas un bouton mais **un champ de saisie** (« Website / Get insights ») : on entre une URL et on obtient de la donnée. La page contient aussi des pages de classement générées automatiquement (« Ranking Analysis: Most Visited Websites in %country% in %month_year% », « Top 5 »), avec des variables de gabarit.

**Mode sombre (observé, extrait du CSS) :** la page d'accueil utilise un fichier CSS nommé **`DarkHomePage.min.css`**, fond quasi noir bleuté **#000921**, bleu vif **#195AFE**, et une palette d'accents saturés : **#FF492C, #C343FF, #FF326F, #FF7A1A**. Polices **DM Sans** (titres) et **Roboto** (texte).

**Tarifs (observé) :** « Web Intelligence Plans and Pricing », CTA « Talk to sales » et « Get our free extension ». Chiffres affichés : « 100+ country-level coverage », « Add up to 37 months of data », « Trusted by 200+ of the Fortune 500 Companies », « over 10,000 customers ». **[Non observé]** les montants exacts des formules.

**Présentation des données : ce que j'ai réellement pu voir.** Les pages de classement lisibles en texte montrent un principe simple : **un chiffre énorme, son unité, une phrase d'explication, puis un classement numéroté (1. 2. 3. 4. 5.)**. C'est tout ce que je peux affirmer. **Je n'ai pas vu un seul graphique réel, ni un seul tableau de bord** : ils sont en images ou derrière un compte. **Si tu veux que je t'analyse leur rendu de données, envoie-moi des captures d'écran.**

**Ce qui est transposable à JiaKo :** le principe « un chiffre + unité + phrase », et le champ de saisie comme action principale. Le reste (mode sombre, palette arc-en-ciel, 37 mois de données) ne l'est pas.

---

## 6. Tableau comparatif

| | **Alchemer** | **Qualtrics** | **QuestionPro** | **SurveySparrow** | **Similarweb** |
|---|---|---|---|---|---|
| **Police (CSS)** | Nunito Sans | non résolue | Fira Sans + Fira Code | Tenon | DM Sans + Roboto |
| **Couleurs dominantes** | #F0F0ED / #F7941D / #1E352F | #20FFC1 (accent) | #1B87E6 / #1B3380 / #FFE303 | #4F46E5 / #99F6E4 | #000921 / #195AFE (sombre) |
| **CTA principal** | Démo + formulaire | **Démo uniquement** | **Inscription gratuite** | Essai 14 j + démo | Champ de saisie + Talk to sales |
| **Formule gratuite** | Non visible | Non | **Oui, 200 réponses/sondage** | Essai 14 j, toutes fonctions | Extension gratuite |
| **Prix affiché** | Oui, dès $55/mois | **Aucun** | Oui, $99 et $83/user/mois | Masqués (JS) | Masqués (devis) |
| **Variable d'échelle** | Réponses/an (75k-125k) | Sur demande | Réponses/an (25k-100k) | Réponses (2,5k-15k) | Pays, mois de données |
| **Cible nommée par formule** | Non | Non | Partiellement | **Oui, explicitement** | Non |
| **Nombre de produits à l'accueil** | 12 | 3 suites | 4 | 4 cas d'usage | 5+ |
| **IA mise en avant** | Oui (Iris) | Oui (« intelligence connectée ») | Oui (5 capacités) | Oui (Echo AI) | Oui (« AI-Powered ») |
| **Preuve sociale** | 11 000+ clients, 80+ pays | Logos marques | Logos, awards | 2 000+ avis, 92% complétion | 200+ Fortune 500 |
| **Jargon** | Élevé | **Très élevé** | Élevé | Élevé | Élevé |
| **Accès à l'interface sans compte** | Non | Non | Non | Non | Non |

---

## 7. Les 5 standards du secteur

Ce que les 5 font, indépendamment de leur identité. Ce sont des conventions attendues : si JiaKo les ignore sans raison, le visiteur sentira que quelque chose ne va pas.

1. **Un hero en 3 temps** : une promesse courte, deux actions (commencer / voir une démo), un visuel produit. Les 5 le font, avec des variations.
2. **La preuve sociale très haut**, dans le premier écran après le hero : logos clients, chiffres de clients, certifications. Les 5 y ont une section dédiée avant toute explication de fonctionnalité.
3. **Une section « problème → solution »** juste après le hero. Alchemer (« Finding clarity? Not so much. »), SurveySparrow (« Stop guessing »), Qualtrics (« La plupart des entreprises utilisent des outils cloisonnés »). C'est un standard, pas une idée géniale : tout le monde le fait parce que ça fonctionne.
4. **L'IA en argument central.** Les 5 la mettent en avant en 2026 (Iris, « intelligence connectée », 5 capacités, Echo AI, « AI-Powered »). C'est devenu un signal de modernité, presque une case à cocher.
5. **Des formules segmentées par taille de client**, avec la variable de volume (réponses/an) comme axe principal, une remise pour l'engagement annuel, et la formule la plus chère renvoyant à un commercial.

---

## 8. Les 5 différenciateurs de JiaKo

Ce que JiaKo peut faire et que **aucun** des 5 ne fait aujourd'hui. Chaque point est vérifié contre les accueils observés.

1. **Commencer par la situation de l'utilisateur, pas par la plateforme.** Aucun des 5 n'organise son accueil autour de « tu es dans ce cas précis ». Ils vendent tous un ensemble de fonctionnalités (12 produits, 3 suites, 4 produits, 4 cas d'usage). JiaKo commence par 3 situations concrètes : lancer, fixer ses prix, satisfaire. **C'est votre plus gros levier, et c'est gratuit.**
2. **Le WhatsApp comme canal réel, pas comme intégration.** SurveySparrow liste Slack, HubSpot, Zendesk, PowerBI. Aucun des 5 ne parle de WhatsApp comme lieu où vit l'enquête. Chez toi, c'est le canal de distribution, le moyen de paiement et le canal de support. C'est une particularité ivoirienne, pas une fonctionnalité.
3. **Des prix en FCFA, visibles, sans démo, sans carte bancaire.** Qualtrics et Similarweb masquent tout. SurveySparrow redirige vers un devis. QuestionPro affiche en dollars par utilisateur par mois, facturé annuellement, ce qui suppose une carte bancaire. Aucun ne peut servir un commerçant qui paie en Wave.
4. **Une carte de résultat partageable (1080×1080).** C'est un objet social, pas un export. Aucun des 5 ne produit quelque chose qui se transmet d'un interlocuteur à l'autre sur WhatsApp en un message. C'est une fonctionnalité qui n'existe que parce que ton public vit sur ce canal.
5. **Un accompagnement, pas un outil.** Les 5 vendent un logiciel et laissent le prospect se débrouiller (ou appeler un commercial). JiaKo vend le guidage lui-même : les questions pré-remplies, la page expliquée, le résultat interprété en une phrase. C'est la seule défense viable face à un QuestionPro qui donne 200 réponses gratuites.

---

## 9. Recommandations concrètes pour JiaKo

### 9.1 Structure de la landing page

**Ordre recommandé** (chacun de ces points est justifié par une observation ci-dessus) :

1. **Hero** : une phrase qui nomme la situation, pas la plateforme. Deux actions : l'action principale (créer) et l'action secondaire (voir ce que reçoit le client). **Le visuel du hero doit être la page de réponse (03) telle qu'un client la voit sur son téléphone**, pas un dashboard. Aucun des 5 ne montre le point de vue du répondant : chez toi, c'est la démonstration la plus parlante.
2. **Pas de section preuve sociale au lancement.** Les 5 mettent des logos. Tu n'en as pas. **N'en invente pas.** Un logo faux se voit immédiatement et coûte plus cher que le vide. À la place, une ligne honnête quand elle sera vraie (« X études créées pendant la bêta ») ou rien du tout.
3. **Les 3 situations (modèles)** : les garder telles quelles. C'est ce qui te distingue structurellement. Chaque situation doit avoir un lien direct vers l'éditeur.
4. **La page de réponse (03) et l'exemple de résultats (04)** montrés comme des objets visibles immédiatement, pas cachés dans une section « Fonctionnalités ».
5. **Comment ça marche** en 3 étapes : garder, mais le présenter comme la suite logique des situations, pas comme un bloc isolé.
6. **Tarifs** : 4 formules nommées par usage. Voir 9.2.
7. **FAQ** : y mettre les vraies objections de ton public (« et si mes clients n'ont pas de data ? », « et si je n'ai pas d'ordinateur ? », « qui voit mes réponses ? »). Les 5 ont une FAQ, mais aucune ne répond à ces questions-là.
8. **Contact WhatsApp** visible dans la navbar ET le footer. C'est ce qui te rend accessible là où les 5 te rendent dépendant d'un formulaire.

**À ne surtout pas faire** (leçon des 5) : le mega-menu. 12 produits chez Alchemer, 4 chez QuestionPro. Ta navbar tient en 5 liens. Ne la déborde jamais.

**Sur l'IA** : les 5 la mettent en avant. **Toi, tu ne peux pas, honnêtement.** Le MVP n'a pas d'IA (le chantier « outils d'enquête assistés par IA » n'est pas fait). Écrire « IA » dans le hero sans l'avoir, c'est le meilleur moyen de perdre la confiance d'un prospect qui teste pendant 5 minutes. Ne copie pas ce standard maintenant.

### 9.2 Présentation des formules (Gratuit / Starter / Pro / Business)

**Ce qu'il faut emprunter, à SurveySparrow** : **nommer la cible sous chaque formule.** Leur « For students, freelancers, and personal projects » sous Basic est exactement ce qu'il te faut. Ta formule Gratuit ne doit pas s'appeler « Gratuit », elle doit dire pour qui et pour quoi.

**Ce qu'il faut emprunter, à QuestionPro** : **une ligne = une capacité limitée et chiffrable** (utilisateurs, réponses, types de questions). Leur tableau tient en 7 lignes par colonne.

**Ce qu'il ne faut surtout pas faire :**
- **Pas de badge « La plus populaire ».** QuestionPro le met sur Advanced ($99). Toi, tu n'as aucun recul pour l'affirmer. Un badge sans donnée derrière, c'est un mensonge visible.
- **Pas de « par utilisateur / par mois, facturé annuellement ».** C'est la formule des 5, et elle suppose une carte bancaire. Chez toi : un prix par mois, un seul compte, payé en mobile money. Dis-le explicitement dans la grille.
- **Pas de 30 lignes de fonctionnalités.** Sur un téléphone, la comparaison doit tenir en **4 lignes**. Le reste est dans une page détaillée.

**Format recommandé pour chaque colonne :** nom de la formule → une phrase de cible → le prix en FCFA → 4 lignes de capacité → un bouton. Rien d'autre.

### 9.3 Organisation du tableau de bord

**Limite d'honnêteté : je n'ai vu aucun tableau de bord concurrent.** Ce qui suit vient du principe de simplicité et de l'observation de Similarweb en texte, pas d'une observation d'interface.

1. **Garder 2 entrées dans la barre (Mes études / Nouvelle).** C'est moins que les 12 modules d'Alchemer, et c'est la bonne quantité. N'en ajoutez pas une troisième sans une raison de produit, pas une raison de design.
2. **Un chiffre, son unité, une phrase.** C'est le principe le plus lisible que j'ai observé, sur les pages de classement de Similarweb. Exemple : « 24 réponses » + « reçues cette semaine » + « La dernière est arrivée hier soir ». Jamais 8 widgets sur la même ligne.
3. **Le résultat principal avant le détail.** La carte de résultat et le lien WhatsApp doivent être visibles depuis la liste des études, pas trois clics plus loin.
4. **L'état vide est un écran à part entière** (01b), pas un message d'erreur. Les 5 le font mal ou ne le font pas.
5. **Aucune animation décorative dans l'application.** Le budget de mouvement est de 150-250 ms sur `transform` et `opacity`, conformément à la direction validée.

### 9.4 Ton visuel

**Ce que tu as et que personne des 5 n'a : le papier chaud.** #FAF6EF n'est utilisé par aucun d'entre eux. Alchemer est le plus proche avec #F0F0ED, mais c'est un gris, pas un papier. **Ce fond est un différenciant réel : ne l'abandonne pas.**

**Un risque à connaître, pas un problème à résoudre :** Alchemer utilise un fond chaud + un accent orange (#F7941D) + une police ronde (Nunito Sans). Ta direction (papier chaud + ambre #E8A33D + Fraunces) est dans la même famille chromatique. **La différence est que tu mets le VERT en dominante de page et que l'ambre n'est qu'un accent**, alors qu'Alchemer met l'orange partout. C'est suffisamment distinctif. On garde la direction validée, elle est défendable.

**Ce qui trahit un design générique, à éviter** (vérifié sur les 5) :
- **Le fond dégradé/parallax du hero** (SurveySparrow utilise trois calques d'images, Similarweb un mode sombre saturé). Sur un forfait mobile, c'est du poids pour rien.
- **Les cartes arrondies avec ombre douce sur fond blanc pur** : c'est le template par défaut de 2025-2026. Ton papier chaud + filets ambre en guise de puces n'ont rien à voir.
- **Les dégradés indigo/violet** (#4F46E5 de SurveySparrow est devenu une signature SaaS générique, au même titre que le bleu #1B87E6 de QuestionPro).
- **Le hero « AI-powered »** en titre : présent sur 3 des 5, et vide de sens pour un prospect qui veut juste tester.

**Le test d'identité** (de la skill) : si je posais le logo d'Alchemer ou de QuestionPro sur ta page d'accueil, verrais-tu la différence ? **Oui**, grâce au papier chaud, au vert bouteille en dominante et à Fraunces. C'est un vrai identifiant. Aucun ajustement n'est nécessaire sur ce point.

**Contraste et accessibilité** : rien à corriger. Les valeurs validées (vert #124A3D sur papier #FAF6EF, ambre #E8A33D en fond de bouton avec encre #14171A) passent les seuils. La seule vigilance, déjà traitée dans les maquettes : l'ambre ne sert jamais de couleur de texte sur papier.

---

## 10. Là où une idée de JiaKo est faible

Je te dois trois constats francs.

**1. Le gratuit de JiaKo est objectivement faible face à QuestionPro.** Leur formule Essentials offre **200 réponses par sondage, 30 types de questions, support 24/7, gratuitement, à vie**. Ta formule gratuite, telle qu'elle est cadrée aujourd'hui, ne passera pas une comparaison chiffrée. **La réponse n'est pas d'aligner les quotas** (tu ne peux pas financer 200 réponses gratuites). La réponse est de **changer l'argument** : ton gratuit n'est pas « un outil gratuit », c'est « un accompagnement gratuit ». Le chiffre ne doit jamais être mis en avant seul, toujours accompagné de ce que la personne reçoit avec (les questions pré-remplies, la page expliquée, le résultat interprété). **Si ta landing met « 30 réponses » en gros et rien d'autre, tu perds face à QuestionPro.**

**2. La section « Comment ça marche » est un cliché, et tu n'as aucun moyen de la crédibiliser.** Les 5 ont une variante de cette section. Aucun n'a de chiffre de conversion à afficher. Toi non plus. La section 3 étapes, si elle est banale, devient du bruit décoratif. **La preuve doit venir de la maquette visible (03 et 04), pas d'une promesse écrite.** C'est pour ça que je recommande de les montrer dès le hero.

**3. Le hero en IA, que les 5 utilisent, tu ne peux pas le suivre.** Je le répète parce que c'est la tentation la plus forte : copier le standard du secteur. Tu n'as pas d'IA dans le MVP. Un prospect qui teste découvrira l'absence en 5 minutes, et le coût de la déception est bien plus élevé que le gain de conformité vis-à-vis du secteur.

---

## 11. Résumé

Les 5 concurrents partagent le même squelette : hero en 3 temps, preuve sociale haute, section problème-solution, IA en argument, formules par taille de client. Aucun ne parle à un débutant sur téléphone en Côte d'Ivoire : la démo ou le devis sont la porte d'entrée chez Qualtrics, SurveySparrow et Similarweb, et QuestionPro affiche des prix en dollars par utilisateur, facturés annuellement. **JiaKo a 5 leviers qu'aucun d'eux n'a : la situation plutôt que la plateforme, le WhatsApp comme canal réel, les prix en FCFA visibles, la carte partageable, et l'accompagnement plutôt que l'outil.** Le papier chaud et le vert bouteille sont une identité réelle, distincte des 5. Deux faiblesses à assumer : le gratuit est faible face aux 200 réponses de QuestionPro (à compenser par l'argument, pas par le chiffre), et tu n'as aucune preuve sociale au lancement (à ne surtout pas inventer). Restent deux arbitrages : les prix visibles dès la landing ou derrière WhatsApp, et le visuel du hero (03 ou 01).

---

## 12. Questions avant la phase de maquettes

1. **Le gratuit de JiaKo : 30 réponses une seule fois, ou illimité mais une étude à la fois ?** QuestionPro offre 200 réponses par sondage, gratuitement. Il faut trancher en connaissance de cet adversaire.
2. **Est-ce qu'on affiche les prix en FCFA dès la landing, ou est-ce qu'on renvoie vers WhatsApp pour en parler ?** Afficher est cohérent avec ton positionnement self-serve ; renvoyer vers WhatsApp est plus souple si les prix ne sont pas encore testés.
3. **Le visuel du hero : la page de réponse (03) ou la liste des études (01) ?** Ma recommandation est 03, parce que c'est la démonstration la plus immédiate et que personne ne le fait. Mais c'est un choix de promesse, pas de design.
4. **Faut-il une section « Exemple d'étude » (un cas réel, avec ses questions et ses résultats) plutôt qu'une section « Comment ça marche » ?** Un cas vaut mieux qu'une promesse, mais il suppose d'avoir déjà un exemple à montrer.
5. **Est-ce qu'on garde le badge « La plus populaire » sur une formule ?** Je recommande de ne pas l'afficher au lancement, faute de donnée derrière. À confirmer.
6. **Est-ce qu'on met le WhatsApp dans la navbar de la page d'accueil, ou seulement dans le footer ?** Le voir partout renforce l'accessibilité, mais alourdit la barre sur petit écran.
