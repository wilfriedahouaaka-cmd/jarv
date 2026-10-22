# Direction design JiaKo

> Ce qu'il faut savoir faire en 2026, ce que je recommande pour JiaKo, et ce que tu m'envoies comme références.
> Sources vérifiées le 22 octobre 2026.

---

## 1. L'état réel du design web en 2026

J'ai vérifié les tendances réelles, pas ce que j'ai en mémoire. Voici l'essentiel, avec les chiffres.

### Le mouvement a basculé : le scroll natif est arrivé

La vraie nouveauté 2026, ce n'est pas une nouvelle librairie. C'est que **le CSS gère nativement les animations au scroll**. La propriété `animation-timeline` (avec `view-timeline` et `scroll-timeline`) permet de lier une animation à la position du défilement, **sans JavaScript**. Le navigateur fait le travail sur le thread de rendu, pas sur le thread principal.

Safari a ajouté le support en septembre 2025, et `animation-timeline` fait partie des priorités d'interopérabilité 2026. Le support navigateur est d'environ 85 %.

Concrètement, ça veut dire qu'une grande partie des effets « scroll » qu'on voit sur les sites primés 2026 ne demande plus une seule ligne de JavaScript. Le CSS couvre environ 80 % des cas simples, GSAP garde les 20 % complexes (pinning, scrub, séquences coordonnées).

**Pour toi, c'est une bonne nouvelle** : moins de JavaScript, donc moins de poids, donc plus rapide sur un téléphone avec un forfait limited. Ce qui compte pour ta cible.

### GSAP est gratuit depuis avril 2025

Webflow a racheté GreenSock en 2024, et depuis le 30 avril 2025, **toute la bibliothèque GSAP est gratuite**, y compris les plugins auparavant payants : ScrollTrigger, SplitText, ScrollSmoother, MorphSVG. Et la licence standard couvre l'usage commercial. Donc plus de licence à payer, pas de frein à l'utiliser si tu en as besoin.

### Le juge de paix, c'est INP

Le mouvement s'est inversé : le design 2026 est jugé sur les Core Web Vitals, en particulier l'**INP** (Interaction to Next Paint), la métrique de réactivité.

Les chiffres sont frappants :
- **43 % des sites** échouent au seuil INP de 200 ms
- Sur mobile, INP n'est bon que sur **77 %** des sites, contre 97 % sur desktop
- Seuls **48 %** des origines mobiles** passent les trois Core Web Vitals

L'animation lourde en JavaScript est un contributeur direct à l'INP. Une animation qui bloque le thread principal pendant une interaction coûte des conversions et du référencement.

### Le balancement a gagné

C'est la tendance la plus nette, et c'est celle qui compte pour un produit. L'exigence d'accessibilité est devenue la norme, pas un supplément. `prefers-reduced-motion` est une tableur de base.

Le critère de qualité en 2026 n'est plus « est-ce que ça impressionne » mais « est-ce que ça sert à quelque chose et est-ce que ça reste fluide ».

### Les 10 tendances classées, avec la technique et la difficulté

| # | Tendance | Technique | Difficulté |
|---|---|---|---|
| 1 | Scrollytelling, sections épinglées | ScrollTrigger pin + scrub | Moyenne |
| 2 | Typographie cinétique et variable | SplitText + polices variables | Moyenne |
| 3 | Animations CSS au scroll, natives | `animation-timeline` | Facile |
| 4 | Performance d'abord, INP | transform/opacity seulement, lazy load | Moyenne |
| 5 | Révélations en grille bento | ScrollTrigger avec stagger | Facile |
| 6 | Touches 3D et WebGL | WebGL / Three.js + GSAP | Difficile |
| 7 | Curseur et micro-interactions | tweens GSAP pilotés par le pointeur | Facile |
| 8 | Défilement fluide fait proprement | ScrollSmoother | Facile |
| 9 | Animation de tracé SVG | DrawSVG + MotionPath | Moyenne |
| 10 | Retenue et accessibilité | `prefers-reduced-motion` | Facile |

### Ce que disent les sites primés

Trois rules qui reviennent partout chez les primés Awwwards :

**Le scroll-triggered et le scroll-linked ne sont pas la même chose.** Le premier déclenche une animation à un seuil, qui joue son propre temps. Le second lie la progression au scroll, dans les deux sens. Se tromper produit un décalage visible : un lecteur rapide arrive sur une section déjà dépassée pendant que l'animation rattrape, ça se lit comme du lag.

**Le contenu ne doit jamais être derrière un loader.** Le titre doit arriver en HTML d'abord, la scène charge derrière. Plusieurs sites primés mettaient tout derrière un bouton « Start », aucun n'a fait la liste.

**La couleur a reculé, la profondeur a gagné.** Sur les sites primés, « beaucoup de couleurs à la fois » est passé de 28 % à 20 % en un an, pendant que « vraie profondeur » est monté de 34 % à 41 %. Et un vrai footer est passé de 6 % à 11 %.

Et un chiffre qui devrait te faire réfléchir pour ta page d'attente : **78 % des titres des primés ne s'adressent à personne**. Ni « vous », ni « nous ». L'inverse de toutes les consignes habituelles sur l'écriture web.

---

## 2. Ce que je recommande pour JiaKo

### La règle qui tranche tout

Deux surfaces, deux budgets de mouvement différents.

| Surface | Budget de mouvement | Pourquoi |
|---|---|---|
| **Page d'attente** | Ouvert. Scroll, révélations, démonstration | Une page de vente qui doit convaincre. Elle est visitée une fois |
| **Application** | Quasi nul. Transitions courtes, < 300 ms | Un outil qu'on utilise des heures. Chaque animation est une friction |

Et la règle de fond, applicable aux deux : **une animation qui n'explique rien ne mérite pas d'exister**. Si tu ne peux pas dire ce que l'animation apprend au visiteur, elle coupe.

### Pour la page d'attente

**Le premier écran, avant toute animation.** Le titre en HTML, la promesse, le champ email. Puis le scroll commence.

**Ce que je propose comme palette d'effets, dans cet ordre** :
1. Révélation à l'entrée dans le viewport, en fondu + translation de 16 px. 400 ms, ease-out. Via `animation-timeline: view()`, donc 0 Ko de JavaScript
2. Les cartes de « ce que vous obtenez » qui apparaissent en cascade (stagger de 60 ms)
3. Une barre de progression de lecture en haut de page, liée au scroll
4. Un compteur qui s'incrémente quand la section entre dans l'écran, pour le chiffre qui porte la promesse
5. Léger parallaxe sur l'illustration, maximum 10 % de décalage

**Ce que je ne propose pas** : le WebGL, le 3D, le curseur personnalisé, le défilement lissé (ScrollSmoother) sur mobile, le bruit de film. Ce sont des techniques de sites vitrine sur laptop. Tes utilisateurs sont sur téléphone, sur forfait, et la page doit se charger vite. Si la page d'attente part sur un mobile milieu de gamme en 4G, avec le scroll fluide activé et la 3D activée, tu perds la moitié des visiteurs avant le premier mot.

**Le choix technique** : CSS natif pour les 1 à 4, Motion pour le React de l'application. GSAP seulement si tu veux du SplitText sur les titres, et il est gratuit maintenant.

### Pour l'application

**Sur mobile d'abord, Desktop ensuite.** Pas l'inverse. Tes répondants remplissent sur téléphone, et une création sur desktop ne sert qu'à l'étudiant qui prépare son mémoire.

**Budget de mouvement** : 150 à 250 ms pour toute transition d'interface. Au-delà, ça devient un délai perçu. Les durées de 400 ms et plus sont réservées aux transitions de page, jamais aux interactions.

**Les règles techniques non négociables** :
- On n'anime que `transform` et `opacity`. `width`, `height`, `top`, `left` déclenchent un recalcul de mise en page à chaque frame, c'est exactement ce qui casse l'INP
- `will-change: transform` uniquement **pendant** l'animation, pas en permanence. Appliqué en permanence, il sature la mémoire GPU et peut faire crasher les navigateurs mobiles
- `prefers-reduced-motion` respecté dès le premier jour, avec en plus un `@supports` pour vérifier le support du scroll natif. C'est la WCAG 2.3.3
- Les animations de chargement du code de la bibliothèque d'animation, pour ne pas payer le poids sur les pages qui n'en ont pas besoin
- Un contrôle « Pause animations » accessible, comme le fait Graza

**Le modèle de données avant l'écran.** Un tableau de bord se conçoit à partir des questions que l'utilisateur doit se poser, pas en partant d'une grille. Pour JiaKo, ça veut dire : quelles informations le créateur doit voir en premier, quelles questions la recherche doit répondre.

**Les règles de lisibilité de la donnée** :
- La lecture humaine suit un motif en F. Le coin haut-gauche porte le plus de poids. Le KPI qui déclenche l'action va en haut à gauche, pas le plus flatteur
- **5 métriques principales maximum**. Au-delà, aucune n'est vraiment principale
- Grille de 12 colonnes, gouttière fixe. Les cartes s'alignent
- Barres et courbes, jamais de camembert pour comparer, jamais de 3D
- La couleur code les catégories, pas les quantités
- Les filtres toujours au même endroit, jamais à la fois en haut et à gauche, visibles sous forme de puces
- Le ratio data-ink : virer les grilles, les bordures de carte, les dégradés de fond

**Tous les états, pas seulement le cas nominal.** C'est là que 90 % des tableaux de bord ratent, et ça se voit dans la première semaine :
- Chargement (squelettes, pas spinner)
- Vide (expliquer pourquoi c'est vide et quoi faire)
- Partiel (échec gracieux par composant)
- Erreur (dire ce qui a cassé et ce que l'utilisateur peut faire)
- Pas les droits
- Données périmées, avec l'horodatage de dernière mise à jour

**Accessibilité** : contraste WCAG AA, 4,5:1 pour le texte courant, 3:1 pour le grand texte. Navigation clavier complète avec focus visible. Jamais le statut par la couleur seule. Cibles tactiles de 44×44 px minimum.

---

## 3. Ce que tu m'envoies comme références

**Oui, envoie-moi des liens.** C'est utile, mais il faut les envoyer d'une certaine façon pour que ça serve.

### Ce qui est le plus utile

**Pour la page d'attente**, ces sources classées par utilité pour ton cas :

| Source | Ce que j'y cherche | Lien |
|---|---|---|
| Awwwards, section landing page | La structure des premiers écrans | awwwards.com/inspiration/landing-page |
| Exhibit a | L'analyse mesurée des primés, dont la section « Landings » | exhibita.design |
| Site of the Year | Le niveau haut de gamme, pour voir le plafond | awwwards.com/websites/sites_of_the_year |
| Landbook | Des sites plus proches de ton registre | landbook.com |
| SaaS Frame | Des landing pages SaaS, la copie et la structure | saasframe.io |
| Godly | Une sélection resserrée | godly.website |

**Pour l'application**, l'interface compte plus que la page :

| Source | Ce que j'y cherche | Lien |
|---|---|---|
| Mobbin | Les parcours réels d'applications, l'inscription, les formulaires | mobbin.com |
| Refero | Les patterns UI classés par type d'écran | refero.design |
| Onboarding Love | Les flux d'inscription, c'est ton parcours critique | onboardinglove.com |
| Screenlane | Les patterns mobiles | screenlane.com |
| Dashboard Design Patterns | Les structures de tableau de bord | dashboarddesignpatterns.github.io |

### Comment les envoyer

Pour chaque site, trois choses, pas plus :

1. **Le lien**
2. **Une phrase** : ce que tu aimes précisément. « Le dégradé du hero », « la façon dont le scroll s'enchaîne », « les cartes qui apparaissent en cascade », « la lisibilité des couleurs »
3. **Une capture d'écran** de ce que tu aimes, en entier si possible

**Et ce qui compte autant : ce que tu n'aimes pas.** Un site que tu trouves moche, avec la raison, vaut mieux qu'un site que tu trouves bien sans explication. Ça me donne la direction, pas juste des exemples.

### Ce que je n'ai pas besoin que tu cherches

- Des polices. Je te propose une liste, tu choisis dans la liste
- Des couleurs. Je te propose une palette
- Des composants. shadcn/ui couvre l'essentiel, je l'adapte
- Des tutoriels GSAP ou Framer Motion. Je sais faire

### Ce qui est plus urgent que le design

Le rapport du 20 octobre signale un chantier que tu n'as pas fait et qui conditionne ta différenciation : **les outils d'enquête assistés par IA**. C'est ce qui te dira si ton guidage IA est original ou si un acteur international le fait déjà gratuitement.

Si tu trouves ça, c'est plus important que n'importe quelle page d'attente. Envoie-moi ça en priorité.

---

## 4. La checklist de fin de chantier design

À passer sur la page d'attente avant de la publier :

- [ ] Le titre et la promesse sont en HTML, visibles sans JavaScript, sans scroller
- [ ] Le champ email est au-dessus de la ligne de flottaison
- [ ] Le bouton est atteignable au pouce, 44 px minimum
- [ ] `prefers-reduced-motion` respecté, testé en activant l'option système
- [ ] Testé sur un vrai téléphone Android milieu de gamme, en 4G
- [ ] Testé avec la JavaScript désactivé : le contenu et le formulaire marchent
- [ ] Contrastes vérifiés, 4,5:1 minimum
- [ ] Navigation clavier complète, focus visible
- [ ] Le formulaire a un message d'erreur, pas juste un message de succès
- [ ] Lighthouse mobile : Performance 90+, Accessibilité 95+, Best Practices 95+
- [ ] Le poids total de la page tient sous 500 Ko, images comprises
- [ ] Le lien de partage WhatsApp fonctionne sur mobile
- [ ] Un vrai footer, pas un pied de page générique
- [ ] Les titres s'adressent à quelqu'un, pas à personne

---

## 5. Ce que je fais maintenant, ou pas

**Je ne construis pas la page d'attente tant que tu n'as pas tranché la décision n°1** (le segment cible). Pas parce que c'est une règle rigide, mais pour une raison concrète : le titre de la page, la promesse et les trois modèles de questions que tu présentes dépendent du segment. « Pour les étudiants » et « pour les entrepreneurs » ne sont pas la même page, et le changer après, c'est refaire le design.

En revanche, dès que tu me donnes le segment, l'étape A prend une demi-journée, et j'applique tout ce qui est au-dessus.

Et si tu veux avancer sur le design **en même temps** que les interviews, dis-le : je peux poser la structure et le design system (variables, typo, couleurs, composants) avec un contenu provisoire que tu remplaces ensuite. Ça te fait gagner du temps, mais ça suppose que tu acceptes de jeter et refaire la copie si le segment change.
