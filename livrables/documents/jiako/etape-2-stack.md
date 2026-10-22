# Étape 2 : comparatif de stack

> Comparaison des choix techniques, tenant compte de ton niveau, de ton absence de budget et de l'hébergement gratuit possible.
> Tarifs et conditions vérifiés en ligne le 22 octobre 2026.

---

## 1. Ce qui n'est pas un vrai débat

Le rapport du 20 octobre a déjà tranché : React, TypeScript, Vite, Tailwind, Supabase, Recharts, shadcn/ui. Je suis d'accord sur l'essentiel, et je ne relance pas le débat. Je justifie en une phrase chacun, puis je traite **le seul vrai point de décision : l'hébergement**.

| Choix | Pourquoi c'est le bon | Ce que ça t'apporte |
|---|---|---|
| **React + Vite** (pas Next.js) | Next.js ajoute le rendu serveur, les server components, le routage fichier, et une facture Vercel plus haute. Pour JiaKo, l'app est derrière un compte, le SEO ne sert à rien | Un projet qui se lance en une commande, que tu comprends en entier |
| **TypeScript** | Sur un produit avec des données de répondants, un type qui ment casse au compilation, pas en production | Moins de bugs de type, et un code que tu relis plus facilement |
| **Tailwind** | Tokens de design en variables, utilitaires lisibles, zéro CSS mort | La direction artistique passe directement dans le code |
| **Supabase** | Auth + PostgreSQL + RLS + tableau de bord admin, sans écrire de serveur | Tu ne code ni la sécurité des mots de passe, ni les sessions, ni les permissions |
| **Recharts** | Barres et courbes, pas de camembert (interdit par ton guide) | Graphiques en 10 lignes, adaptés au mobile |
| **shadcn/ui** | Composants copiés dans ton projet, pas une dépendance. Tu les modifies librement | Boutons, champs, dialogues sans les réinventer |

**Le coût que ça te coûte, honnêtement** : Supabase impose la RLS, et tu ne connais pas encore la RLS. C'est le concept qui te prendra le plus de temps. Je l'ai estimé à 2-3 jours dans l'ordre de construction. Si tu bloques, on consacre une session entière à un cas concret.

---

## 2. Le vrai point : où héberger, et combien ça coûte

C'est ici que le rapport du 20 octobre se trompe, ou plutôt qu'il s'arrête trop tôt. Il chiffre ~45 $/mois (Supabase Pro + Vercel Pro) et conclut que tu dois attendre de payer tes premiers clients. **C'est plus compliqué que ça, et de ton côté.**

### Ce que j'ai vérifié aujourd'hui

**Supabase** (supabase.com/pricing, 22 oct. 2026) :

| Plan | Prix | Base | Pause | Sauvegardes |
|---|---|---|---|---|
| Free | 0 $ | 500 Mo | **Pause après 1 semaine d'inactivité** | Aucune |
| Pro | **25 $/mois** | 8 Go | Jamais | Quotidiennes, 7 jours |

Point important : la facturation est maintenant **par organisation**, pas par projet. Un projet Pro = 25 $/mois + 10 $ de compute, mais le compute Micro est couvert par les crédits inclus. Le 25 $ est bien le vrai prix.

**Vercel** (vercel.com/docs/limits/fair-use-guidelines, 22 oct. 2026) — et c'est la découverte importante :

> « Hobby teams are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan. »

Et la définition de l'usage commercial inclut explicitement :

> « Advertising the sale of a product or service »
> « Receiving payment to create, update, or host the site »

**Conséquence directe, et elle te concerne** : la page d'attente de JiaKo annonce un produit payant. C'est de la publicité pour une vente. Sur le plan Hobby, Vercel **peut mettre le déploiement en pause**, et les visiteurs voient une erreur 503. Ce n'est pas une menace théorique, c'est une fonctionnalité du service.

### ⚠️ Alerte sur Kofira

Kofira tourne sur `kofira.vercel.app`, et Kofira vend des sites-cadeaux à 6 000, 12 000 et 35 000 FCFA. **C'est déjà de l'usage commercial sur un plan Hobby.** Ton site peut être mis en pause à tout moment, sans préavis.

Ce n'est pas urgent au sens où tu ne perds pas de données. Mais si un client te contacte et que le lien ne marche pas, tu perds la vente. À surveiller, et à corriger avant que Kofira ne prenne de la traction.

### Les hébergeurs gratuits qui autorisent le commercial

| Hébergeur | Usage commercial gratuit | Bande passante gratuite | Limite réelle |
|---|---|---|---|
| **Cloudflare Pages** | Aucune restriction dans les conditions | **Illimitée** | 500 builds/mois, 1 build à la fois |
| Netlify Free | Oui, mais via des réponses de forum, pas dans les conditions | 300 crédits/mois (~15 Go) | Crédits épuisés = site suspendu |
| Vercel Hobby | **Non, explicitement interdit** | 100 Go | Risque de pause |

**Cloudflare Pages est le plus sûr des trois.** Non pas parce qu'autoriser est écrit, mais parce qu'**interdire n'est écrit nulle part** dans ses conditions. Et la bande passante illimitée compte pour toi : un lien de questionnaire envoyé sur WhatsApp peut être ouvert 500 fois en une heure, et là un plafond te coûte des réponses.

### La question du nom de domaine

Un lien `jiako.pages.dev` ne fera pas sérieux devant un client. Il te faut un nom de domaine.

- **.com** : 10 à 15 $/an, achat direct chez n'importe quel registrar. C'est ce que je recommande maintenant.
- **.ci** : beaucoup plus cher et plus lent à obtenir, réservé aux entités ivoiriennes. Je n'ai pas vérifié les tarifs actuels, donc je ne te chiffre pas. À voir quand tu auras des revenus.

Un domaine s'achète une fois pour ~12 $/an, et Cloudflare en vend sans marge (prix coûtant). Ce n'est pas un coût mensuel.

---

## 3. Ma recommandation

### Pendant le développement et la bêta (maintenant)

**Cloudflare Pages (0 $) + Supabase Free (0 $) = 0 $/mois.**

Pourquoi ça tient :

- **Pas de violation de conditions.** Cloudflare n'interdit pas le commercial, contrairement à Vercel.
- **La pause Supabase après 1 semaine d'inactivité ne te concerne pas encore.** Tant que tu développes et testes, tu touches à la base tous les jours. Le projet reste actif. Le risque n'existe que quand la base est silencieuse pendant 7 jours, c'est-à-dire quand tu n'as plus d'utilisateurs.
- **Pas de serveur Node à maintenir.** Cloudflare Pages sert des fichiers statiques, et Supabase fait tout le reste (auth, base, RPC). Le fichier `_redirects` avec `/* /index.html 200` gère le routage React. C'est une ligne.

**Ce que ça te coûte en temps** : la connexion du dépôt Git à Cloudflare prend 10 minutes. Tu connais déjà le principe avec Vercel, c'est le même geste.

### Dès que tu as un vrai utilisateur (premier client payant)

**Supabase Pro (25 $/mois), Cloudflare Pages reste gratuit.**

Le moment exact : quand quelqu'un d'autre que toi dépend de la disponibilité du service. Tant que c'est une bêta entre connaissances, la pause manuelle après inactivité te convient (2 clics pour reprendre). Dès qu'un client a partagé un lien à ses propres clients, un downtime te coûte de la crédibilité que tu ne peux pas racheter.

**Total : 25 $/mois, pas 45 $.** Tu économises le prix d'un déjeuner par semaine pendant des mois.

### Ce que je ne recommande pas

**Vercel Hobby**, même gratuitement. Ce n'est pas une question de générosité de leur part, c'est un risque opérationnel : une mise en pause arrive sans préavis, au pire moment, et tu ne peux pas la débloquer toi-même sans payer.

**Netlify Free** pour la même raison structurelle : les crédits partagent un même pot entre déploiements et trafic. Un mois où tu déploies beaucoup mange ta bande passante. Cloudflare n'a pas ce problème.

---

## 4. Ce que ça change dans le plan

| Avant (rapport du 20 oct.) | Après (ce document) |
|---|---|
| Vercel Pro dès le départ (20 $/mois) | Cloudflare Pages gratuit |
| Budget de 45 $/mois avant tout revenu | 0 $/mois pendant le développement |
| Blocage « attendre les premiers clients payants » | Levé, tu peux construire tout de suite |
| Pas de vérification des conditions d'usage | Vérifié : Vercel interdit le commercial en gratuit |

**L'effet le plus important** n'est pas l'économie de 20 $/mois. C'est que le rapport du 20 octobre en faisait un blocage : il fallait attendre de facturer pour héberger légalement. Avec Cloudflare Pages, **ce blocage n'existe plus**. Tu peux mettre JiaKo en ligne demain sans rien payer et sans violer aucune condition.

---

## 5. Récapitulatif

**Ce qui est tranché** : React + TypeScript + Vite + Tailwind + Supabase + Recharts + shadcn/ui, tel que prévu. Je ne change rien.

**Ce que j'ajoute** : Cloudflare Pages comme hébergeur, à la place de Vercel Pro. Gratuit, autorise le commercial, bande passante illimitée. Supabase Free pendant le développement, Supabase Pro à 25 $/mois dès le premier vrai client.

**Ce que je signale** : Kofira est déjà sur Vercel Hobby en train de vendre, ce qui est hors conditions. À corriger avant qu'il ne prenne de la traction.

**Ce qui reste à faire de ton côté** : acheter un nom de domaine .com (~12 $/an) quand tu seras prêt à mettre le lien en ligne. Je peux te guider, mais l'achat passe par toi.
