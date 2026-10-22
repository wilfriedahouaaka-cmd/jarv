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

### Point de vigilance reporté

Un autre projet de Wilfried est hébergé sur le plan gratuit de Vercel et vend déjà. Ce n'est pas traité ici, c'est noté pour plus tard. Voir `livrables/applications/kofira/` si besoin.

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

### Décision actée le 22 octobre : Vercel pendant le développement

Le développement se fait sur **Vercel**, outil connu de Wilfried et gratuit. C'est défendable : la familiarité de l'outil a de la valeur quand on débute, et le risque d'application des conditions sur un projet privé en développement est faible en pratique.

**La règle qui va avec, non négociable** : migration obligatoire vers **Cloudflare Pages** (gratuit lui aussi, autorise le commercial, bande passante illimitée) **avant** la mise en ligne d'une page qui annonce les prix, ou **avant le premier client payant**. Je la pose ici pour qu'elle ne soit pas oubliée au pire moment.

**Honnêteté sur le risque** : la définition de l'usage commercial de Vercel est large (« any Deployment used for the purpose of financial gain of anyone involved in any part of the production of the project »), donc elle couvre théoriquement le développement d'un produit commercial, même privé. Le risque est faible en pratique, il n'est pas nul. C'est pour ça que la migration est écrite comme obligatoire et pas comme optionnelle.

**Coût** : 0 $/mois. Vercel et Cloudflare sont tous deux gratuits. Le choix ne change rien au budget, seulement au moment de la migration.

### Ce que je ne recommande pas

**Netlify Free** : les crédits partagent un même pot entre déploiements et trafic. Un mois où tu déploies beaucoup mange ta bande passante. Cloudflare n'a pas ce problème.

**Vercel Hobby une fois que JiaKo vend quelque chose.** Le risque n'est pas théorique : Vercel peut mettre le déploiement en pause sans préavis, et tu ne peux pas le débloquer toi-même sans payer. La migration est écrite pour arriver avant ce moment-là, pas après.

---

## 4. Ce que ça change dans le plan

| Avant (rapport du 20 oct.) | Décision actuelle |
|---|---|
| Vercel Pro dès le départ (20 $/mois) | **Vercel gratuit pendant le développement** |
| Budget de 45 $/mois avant tout revenu | **0 $/mois pendant le développement** |
| Blocage « attendre les premiers clients payants » | **Levé**, tu peux construire tout de suite |
| Pas de vérification des conditions d'usage | Vérifié : Vercel interdit le commercial en gratuit |
| — | Migration vers Cloudflare Pages obligatoire avant la page de vente ou le premier client payant |

**L'effet le plus important** n'est pas l'économie de 20 $/mois. C'est que le rapport du 20 octobre en faisait un blocage : il fallait attendre de facturer pour héberger. Avec le plan gratuit de Vercel pendant le développement, **ce blocage n'existe plus**. Tu peux construire dès maintenant sans rien payer.

---

## 5. Récapitulatif

**Ce qui est tranché** : React + TypeScript + Vite + Tailwind + Supabase + Recharts + shadcn/ui, tel que prévu. Je ne change rien.

**Ce qui est acté** : hébergement Vercel gratuit pendant le développement, Supabase Free. **0 $/mois.** Migration vers Cloudflare Pages obligatoire avant la page qui annonce les prix, ou avant le premier client payant. Supabase Pro à 25 $/mois à ce même moment-là.

**Ce qui reste à faire de ton côté** : acheter un nom de domaine .com (~12 $/an) quand tu seras prêt à mettre le lien en ligne. L'achat passe par toi, je peux te guider.
