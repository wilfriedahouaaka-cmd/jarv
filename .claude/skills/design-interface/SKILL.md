---
name: design-interface
description: Skill de design d'interface pour Wilfried. Sites-cadeaux, sites-musées, capsules temporelles, applications web (plateformes qui vendent un service, étude de marché, gestion de dépenses, tableaux de bord) et interfaces d'automatisations IA. Utilise-la des que Wilfried demande de concevoir, refaire ou améliorer l'interface, la mise en page, la palette, la typographie, les animations, l'identité visuelle ou l'expérience d'un site ou d'une application. Contient une méthode en 4 étapes, deux familles de design, la liste noire des signes qui trahissent un design généré par IA, et la checklist de livraison.
---

# Design d'interface

## Mission

Produire des interfaces qui ont **une identité reconnaissable**, au niveau des meilleurs sites et applications actuels, et qui ne ressemblent pas à un site généré par IA.

Trois Facts que je ne conteste pas et qui commandent tout :

1. **Wilfried est en CI, ses utilisateurs consultent sur téléphone, parfois en connexion lente.** Le mobile d'abord n'est pas une option. La performance est une question d'éthique, pas de finition.
2. **Chaque projet a son univers.** Un site cadeau pour un couple de 50 ans n'a rien à voir avec un tableau de bord de gestion de dépenses. L'identité vient du projet, pas d'un template.
3. **Wilfried reste le décideur.** Je propose une direction, j'attends son accord avant de construire. Je ne tranche pas l'ambiance à sa place.

Stack habituelle : React, Vite, Tailwind, déploiement Vercel. Je ne rajoute pas de dépendance d'animation sans raison, et je vérifie les versions avant de les citer.

---

## 1. Méthode en 4 étapes

Je suis ces étapes **dans l'ordre**. Je ne passe pas à l'étape 2 sans avoir posé les questions, et je ne construis rien avant l'accord sur la direction artistique.

### Étape 1. Cadrage : 3 à 5 questions, maximum

Je pose ces questions **avant de coder**, et seulement celles qui ne sont pas déjà répondues. Si Wilfried a déjà tout donné dans sa demande ou dans le dossier du projet, **je passe directement à l'étape 2**, sans question rituelle.

Les 4 axes, dans cet ordre de priorité :

1. **Qui est le public exact ?** Pas « les jeunes », mais « un étudiant en master qui prépare son mémoire, ou un petit commerçant d'Abidjan ». La précision décide de tout le reste.
2. **Quelle émotion ou sensation doit provoquer l'interface ?** Pour un cadeau : l'émerveillement, la nostalgia, la gênance douce. Pour une application : la clarté, la maîtrise, la méfiance envers les frais cachés.
3. **Quelles références lui plaisent ?** Il peut m'envoyer des liens, des captures, ou décrire un site qu'il a vu. Je note ce qu'il aime **précisément** (le dégradé, le rythme, les contrastes de taille) et aussi ce qu'il n'aime pas.
4. **Quelles contraintes ?** Contenu réel disponible (photos, textes, logo), contraintes techniques, pages à livrer, ce qui doit absolument fonctionner.

Si un point manque vraiment et que les options ont des conséquences différentes, je pose **une seule question ciblée**. Sinon, je prends la décision la plus raisonnable, j'écris, et je signale l'hypothèse.

### Étape 2. Direction artistique : 5 lignes, et j'attends

Je résume la direction en **exactement 5 lignes**, dans cet ordre :

```
Ambiance      : [3 mots maximum. L'émotion visée, pas un adjectif vague]
Palette       : [couleur dominante + accent net + 2 neutres]
Typographies  : [2 maximum. Une display, une texte. Nom et rôle]
Images        : [traitement, cadrage, format. Photos perso, 3D, illustration ?]
Animations    : [intensité, technique, déclencheur. Sobre ou expressif ?]
```

Puis j'**attends son accord**. Je ne construis pas en attendant. S'il valide, je note la direction validée dans le `README.md` du projet, pour qu'elle reste la référence.

Une direction qui ne pourrait pas s'appliquer à un autre projet est trop générique. Je me relis là-dessus.

### Étape 3. Les fondations avant les pages

Je construis les **design tokens d'abord**, en variables CSS, dans un fichier dédié. Aucune page avant que les fondations existent.

```css
:root {
  /* Couleurs : une dominante forte, un accent net */
  --c-primary: #...;
  --c-primary-ink: #...;      /* texte posé sur primary */
  --c-accent: #...;
  --c-accent-ink: #...;

  /* Neutres : 6 nuances suffisent */
  --c-bg: #...;
  --c-surface: #...;
  --c-surface-2: #...;
  --c-border: #...;
  --c-text: #...;
  --c-text-muted: #...;

  /* Etats */
  --c-success: #...;
  --c-warning: #...;
  --c-danger: #...;
  --c-info: #...;

  /* Typographie : 2 familles maximum */
  --font-display: "...";
  --font-text: "...";
  --fs-xs: 0.75rem;
  --fs-sm: 0.875rem;
  --fs-base: 1rem;
  --fs-lg: 1.125rem;
  --fs-xl: 1.375rem;
  --fs-2xl: 1.75rem;
  --fs-3xl: 2.25rem;
  --fs-4xl: 3rem;
  --fs-5xl: 4rem;
  --lh-tight: 1.05;
  --lh-normal: 1.6;
  --tracking-tight: -0.02em;

  /* Espacements : echelle de 4px */
  --sp-1: 0.25rem;
  --sp-2: 0.5rem;
  --sp-3: 0.75rem;
  --sp-4: 1rem;
  --sp-6: 1.5rem;
  --sp-8: 2rem;
  --sp-12: 3rem;
  --sp-16: 4rem;
  --sp-24: 6rem;
  --sp-32: 8rem;

  /* Rayons : peu de valeurs, pas de coins partout */
  --r-sm: 6px;
  --r-md: 12px;
  --r-lg: 20px;
  --r-full: 999px;

  /* Ombres : utiliser la couleur du projet, pas du noir pur */
  --shadow-sm: 0 1px 2px rgb(20 20 20 / 0.06);
  --shadow-md: 0 4px 12px rgb(20 20 20 / 0.08);
  --shadow-lg: 0 18px 48px rgb(20 20 20 / 0.12);

  /* Mouvement */
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Règles sur les fondations :

- **Tokens sémantiques**, jamais de couleur brute dans un composant. `var(--c-surface)`, pas `#ffffff`. C'est ce qui permet le mode sombre et les variantes sans toucher aux pages.
- **Échelle typographique** fondée sur un ratio de 1.25 (interface) ou 1.333 (marketing), la plus grande valeur servant au titre principal. Pas d'échelle arbitraire avec des valeurs inventées au cas par cas.
- **Un seul rayon dominant** par projet. Si tout est arrondi, rien ne l'est. Je choisis 2 ou 3 valeurs et je les tiens.
- **Ombres teintées** par la couleur du projet, pas du noir transparent.
- Le fichier de tokens est **le seul endroit** où une valeur brute apparaît. Le reste du code référence les variables.

### Étape 4. Construction, puis auto-relecture

Je construis en composants réutilisables. Puis je passe la **checklist du point 4** moi-même, sans lui demander de le faire. Ce que je ne peux pas vérifier, je le dis explicitement au lieu de le cocher.

---

## 2. Les deux familles de design

Je détecte la famille avant de commencer, parce que les règles ne sont pas les mêmes.

### 2.1 Sites émotionnels (cadeaux, musées, capsules temporelles)

**Le but** : créer une expérience, pas informer. Le visiteur est ici pour une émotion (surprise, nostalgie, amour), pas pour trouver une information.

- **Typographies expressives.** Une police display avec du caractère (serif humaniste, script, slab) pour les titres, une police texte très lisible pour le corps. Les deux sont un choix, jamais un défaut.
- **Mise en scène du contenu.** Les photos et vidéos sont au premier plan, pas en illustration de second plan. Le texte se pose sur l'image quand le contraste le permet. Masques, cadres, décalages.
- **Rythme de lecture.** J'alterne les formats : plein écran, section serrée, section aérée, détail. Un site émotionnel qui a 12 sections de hauteur identique est mort.
- **Animations au défilement qui racontent une histoire.** Elles doivent avoir un rôle narratif : une capsule qui s'ouvre, un souvenir qui apparaît, un compteur qui s'incrémente. Chaque animation doit correspondre à un moment du récit.
- **Ambiance propre à chaque projet.** Un cadeau de mariage n'a pas la même palette qu'un site de musée, et aucun des deux n'a la même qu'un site d'entreprise. Je construis l'ambiance à partir du contenu réel, pas d'un preset.

**Sur les animations de scroll, l'état de l'art 2026** :

- Le **CSS natif** suffit pour 80 % des cas : `animation-timeline: view()` ou `scroll()`, avec `animation-range` pour délimiter. Zéro JavaScript, ça tourne hors du thread principal. Support d'environ 85 %, Safari depuis septembre 2025. **C'est mon premier choix.**
- **GSAP** (100 % gratuit depuis avril 2025, racheté par Webflow, usage commercial inclus) quand il faut du pinning, du scrub, une séquence coordonnée ou du SplitText.
- **Motion** (ex Framer Motion) pour les animations React declaratives : entrees, sorties, gestures.
- Je respecte la différence entre **scroll-triggered** (se déclenche à un seuil et joue son temps) et **scroll-linked** (progression liée au scroll, dans les deux sens). Se tromper se voit : un lecteur rapide arrive sur une section déjà dépassée pendant que l'animation rattrape.
- Le **contenu n'est jamais derrière un loader**. Le titre arrive en HTML d'abord, la scene charge derrière.
- `prefers-reduced-motion` respecte, avec en plus `@supports` pour le scroll natif. C'est une exigence WCAG 2.3.3, pas une option.

### 2.2 Applications fonctionnelles (ventes, étude de marché, dépenses, tableaux de bord)

**Le but** : que la tache soit faite sans friction. L'utilisateur est ici pour travailler, pas pour admirer.

- **Clarté avant tout.** Une décision par écran. Si je ne sais pas dire quelle action principale l'utilisateur vient faire, l'écran est mal conçu.
- **Hiérarchie d'information nette.** Le motif de lecture humain est en F : le coin haut-gauche porte le plus de poids. Le KPI qui declenche une action va la, pas le plus flatteur.
- **5 metriques principales maximum.** Au-dela, aucune n'est vraiment principale. Le reste passe en progressive disclosure (clic, survol, panneau).
- **Formulaires simples.** Un champ, une question. Le label au-dessus, jamais en placeholder. Erreur sous le champ, en clair. Le bouton de validation dit ce qu'il fait ("Creer l'etude"), pas "Envoyer".
- **Tous les etats, pas seulement le cas nominal.** C'est la que 90 % des tableaux de bord ratent :
  - **Chargement** : squelettes a la forme du contenu final, pas un spinner
  - **Vide** : expliquer pourquoi c'est vide et quoi faire maintenant
  - **Partiel** : echec gracieux par composant, pas de page blanche
  - **Erreur** : dire ce qui a casse et ce que l'utilisateur peut faire
  - **Pas les droits** : expliquer comment obtenir l'acces
  - **Donnees perimees** : horodatage de derniere mise a jour
- **Tableaux et graphiques lisibles.** Barres et courbes, jamais de camembert pour comparer, jamais de 3D. La couleur code les categories, pas les quantites. Chiffres alignes a droite, meme nombre de decimales dans une colonne. Au-dela de 5 colonnes, le tableau devient illisible : je masque et je laisse l'utilisateur activer.
- **Navigation evidente.** Le filtre toujours au meme endroit, jamais a la fois en haut et a gauche, visible sous forme de puces. Un reset visible. LaWire de drill-down explicite : si rien n'est cliquable, l'utilisateur croit l'ecran mort.
- **Le style reste distinctif, mais il ne gene jamais l'usage.** L'identite passe par la palette, la typographie, les micro-details, l'illustration. **Pas** par des animations dans un tableau de bord.

**Budget de mouvement en application** : 150 a 250 ms pour toute transition d'interface. Au-dela, ca devient un delai percu. Les durees de 400 ms et plus sont reservees aux transitions de page, jamais a une interaction.

---

## 3. Liste noire

Ces signes trahissent un design genere par IA. **Je m'interdis de les produire.** Si je m'apercois que j'en ai mis un, je le retire.

- [ ] **Degrade violet-bleu partout**, ou fond sombre avec des taches de lumiere floues. C'est la signature par defaut d'une IA generatrice d'interfaces.
- [ ] **Meme police par defaut sur tout le site** (Inter, Roboto, Arial) sans choix typographique reflechi. Aucune exception : Inter n'est pas un choix, c'est une absence de choix.
- [ ] **Page d'accueil standard** : titre centre, sous-titre, deux boutons, puis trois cartes identiques avec une icone.
- [ ] **Grilles de cartes toutes pareilles**, coins tres arrondis partout, ombres generiques.
- [ ] **Emojis utilises comme icones**, illustrations generiques, photos de banque d'images sans coherence.
- [ ] **Textes creux** : "revolutionnez", "solution innovante", "propulsez votre business". Les textes sont ecrits pour le vrai public, avec ses mots, pas pour un jury.
- [ ] **Mise en page symetrique et previsible sur toute la page**, sans variation de rythme.

### A la place, des choix assumes

- **Une couleur dominante forte et un accent net.** Pas une palette de 6 couleurs saturées. Le dominant fait 80 % du travail, l'accent attire l'oeil sur l'action principale.
- **Des contrastes de taille typographique marques.** L'ecart entre le titre et le corps est visible. Un site ou tout est a la meme taille n'a pas de hierarchie.
- **Des compositions asymetriques.** Le contenu n'est pas centre systematiquement. Decalages, grilles qui cassent, un element volontairement hors cadre.
- **Des espaces blancs generosa.** Le vide est un materiau de design, pas un manque de contenu.
- **Des details propres au projet.** Un motif visuel tire du contenu reel, une date qui compte, un numero, un lieu, une typographie qui evoque l'occasion.

### Verifier que l'identite existe

Avant de livrer, je me pose la question : **si je collais le logo d'un autre projet sur cette page, est-ce qu'on verrait la différence ?** Si la réponse est non, l'identité n'existe pas encore et je dois retravailler la direction.

---

## 4. Checklist avant livraison

Je passe cette liste **moi-même** avant de présenter le résultat. Ce que je n'ai pas pu tester, je le dis au lieu de cocher.

### Identité
- [ ] Le design a une identite reconnaissable qui ne ressemble pas a aucun autre de mes projets
- [ ] La direction artistique validee en etape 2 est respectee
- [ ] Aucun element de la liste noire du point 3
- [ ] Les textes sont concrets, ecrits pour le vrai public, sans placeholder

### Mobile et accessibilité
- [ ] Tout est confortable sur un petit ecran, notamment a 360 px de large
- [ ] Boutons et cibles tactiles d'au moins 44 x 44 px
- [ ] Texte lisible, taille de base de 16 px minimum pour le corps
- [ ] Contrastes suffisants : 4,5:1 pour le texte courant, 3:1 pour le grand texte
- [ ] Navigation clavier complete, focus visible
- [ ] Le statut n'est jamais signale par la couleur seule
- [ ] La preference "reduire les animations" est respectee, et testee

### Performance
- [ ] Images optimisees, au format moderne (WebP ou AVIF), avec `width`/`height` et `loading="lazy"` sous la ligne de flottaison
- [ ] Polices limitees a 2, subset, et prechargees seulement si elles servent au premier ecran
- [ ] Animations legeres : `transform` et `opacity` uniquement, jamais `width`, `height`, `top` ou `left`
- [ ] `will-change` pose uniquement pendant l'animation active, pas en permanence
- [ ] Pense pour une connexion lente : page d'accueil sous 500 Ko, images comprises
- [ ] La bibliotheque d'animation n'est chargee que sur les pages qui en ont besoin
- [ ] Lighthouse mobile : Performance 90+, Accessibilite 95+, Best Practices 95+

### Fonctionnel
- [ ] Tous les etats sont prevus : chargement, vide, erreur, pas les droits, donnees perimees
- [ ] Le parcours principal fonctionne au doigt, sur un vrai telephone
- [ ] Aucune dependance a un service externe qui peut tomber

### Cohérence
- [ ] Tout vient des variables de design definies en etape 3
- [ ] Aucune couleur, taille ou espace en dur hors du fichier de tokens
- [ ] Les composants sont reutilisables, pas dupliquees a chaque ecran

---

## 5. Consignes techniques

### React

- Composants **reutilisables** et **petits**. Un composant qui fait deux choses est deux composants.
- Les styles s'appuient sur les **variables de design**, jamais sur des valeurs en dur.
- Un composant par fichier, ou par famille logique. Je ne disperse pas 40 composants dans 3 fichiers.
- Les donnees viennent d'un hook ou d'un service, pas de fetch dans le composant.
- Les etats de chargement, d'erreur et de vide sont geres explicitement, pas laisses au hasard.
- Pas de bibliotheque d'animation ajoutee sans raison. CSS natif d'abord.

### Commentaires

- **Commentaires courts, en francais**, sur les **choix de design importants**, pas sur la syntaxe.
- Le but : que Wilfried puisse **modifier lui-meme** sans avoir a redécouvrir pourquoi c'est fait ainsi.
- Exemple utile : `/* Rythme volontairement irregulier : chaque souvenir a sa propre densite, ca evite l'effet diaporama */`
- Exemple inutile : `// boucle sur le tableau` ou `// style du bouton`

### Images et illustrations

**Quand une image ou une illustration est necessaire, je ne l'invente pas et je ne recourse pas a une banque d'images generique.** Je demande a Wilfried exactement ce qu'il me faut, avec un format exploitable :

```
Pour ce projet, j'ai besoin de :
1. Photo principale (le cadeau / le lieu) : 2400 px de large minimum,
   ratio 3:2 ou 4:5, WebP ou JPEG, sous 400 Ko
2. 6 a 8 photos de souvenirs : 1600 px de large, memes proportions
   pour un rendu homogene
3. Un logo ou monogramme : SVG si possible, sinon PNG 512x512
```

Et si une image manque vraiment, je **conçois la mise en page pour qu'elle soit remplacable** : un cadre vide avec la bonne proportion, un placeholder qui a l'air voulu, et la liste de ce qui manque. Un site qui attend des photos montre des emplacements propres, pas des images de stock.

### Ce que je ne fais pas

- Je ne livre pas de composants sans design tokens definis
- Je ne livre pas une page avec du texte placeholder, meme temporairement visible
- Je ne melange pas deux familles de design dans un meme projet
- Je n'ajoute pas de WebGL, de 3D ou de cursor personnalise dans un projet destine aux telephones CI
- Je ne presente pas un rendu comme "fini" si je n'ai pas teste le scroll, le clavier et le petit ecran
