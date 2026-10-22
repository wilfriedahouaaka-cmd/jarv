# Étape 3 : direction artistique JiaKo

> Application de la méthode en 4 étapes de la skill `design-interface`.
> Le cadrage (étape 1 de la skill) est déjà fait : le public est connu, les contraintes aussi. Je propose donc directement la direction artistique (étape 2), et **j'attends ton accord avant de construire quoi que ce soit**.

> **Mise à jour du 22 octobre 2026.** Ce document est la décision d'origine. Il a été complété le même jour par un **design system fourni par Wilfried : « Warm Editorial Rigor »** (source : `context/import/jiako-design-system.md`). Ce que ce document dit de Fraunces, de l'encre `#14171A`, du gris `#6B7268` et du rôle de l'ambre ne fait plus foi : **le design system gagne**. Il impose Newsreader, l'encre `#192823`, le gris `#707975`, et inverse les rôles (vert primaire, ambre en accent WhatsApp). Le reste de l'analyse, notamment le cadrage et les deux budgets de mouvement, reste valable.

---

## 1. Le cadrage, ce que je sais déjà

| Axe | Réponse | Conséquence sur le design |
|---|---|---|
| **Public** | Petit entrepreneur ivoirien, sur téléphone Android milieu de gamme, en forfait | 360 px de large, 16 px de corps, contraste AA, zéro défilement lissé |
| **Émotion visée** | Confiance et clarté. Il doit croire que l'outil lui dira la vérité, et oser montrer le questionnaire à ses propres clients | Design sobre et crédible, pas ludique. Un rapport de recherche, pas une app de divertissement |
| **Références** | **Non fournies** | Je prends la décision la plus raisonnable et je la signale (voir §4) |
| **Contraintes** | Deux surfaces : page d'attente persuasive, application fonctionnelle. Budget de mouvement différent pour chacune | Même identité, deux budgets d'animation. Pas deux designs |

**Le point qui guide tout** : JiaKo est un outil que l'entrepreneur **montre à ses propres clients**. Le design doit donner envie d'envoyer le lien. Un questionnaire qui a l'air bricolé décrédibilise celui qui l'envoie. C'est la vraie contrainte, plus que n'importe quelle règle de mise en page.

---

## 2. La direction artistique — 5 lignes

```
Ambiance      : Confiance sobre, vérité de terrain. Un outil sérieux qui parle aux gens, pas un rapport de consultant

Palette       : Vert bouteille profond #124A3D (dominant) + ambre marigold #E8A33D (accent unique)
                + papier chaud #FAF6EF (surface) + encre #14171A (texte) + gris chaud #6B7268 (texte secondaire)

Typographies  : Fraunces, en display seulement (titres, chiffres clés) — ser variable éditoriale, crédibilité de recherche
                Public Sans, pour tout le reste — lisible à 16 px sur écran bon marché, conçu pour la lisibilité

Images        : Aucune photo de banque. L'interface elle-même est l'image, plus une carte de résultat
                conçue pour être capturée et partagée sur WhatsApp — c'est ton canal de distribution

Animations    : Application quasi nulle, 150-250 ms, transform et opacity seulement
                Page d'attente ouverte : révélations au scroll en CSS natif, zéro JavaScript, 400 ms
```

---

## 3. Pourquoi ces choix, et pas d'autres

### La palette : pourquoi pas un dégradé violet-bleu

Le violet-bleu est la signature par défaut d'un design généré par IA. Il est partout, il ne dit rien, et il est illisible sur un écran bon marché en plein soleil à Abidjan.

Le **vert bouteille** dit trois choses utiles en même temps : l'argent, la croissance, et la validation. C'est une couleur que l'on voit dans le commerce ivoirien sans être clichédique. L'**ambre marigold** est la seule couleur vive du projet, et elle est réservée à **l'action principale**. Une seule couleur d'accent, c'est ce qui crée la hiérarchie.

**Contrainte de contraste que j'applique** : l'ambre (#E8A33D) sur le papier (#FAF6EF) est trop faible pour du texte. Il sert uniquement de fond de boutons, de soulignement, de marque. Le texte est toujours encre sur papier, ou papier sur vert. Je le dis maintenant pour que personne ne bricole un texte ambre plus tard.

### Pourquoi Fraunces et pas Inter, Roboto ou Poppins

Inter est dans la liste noire, et pas pour une raison esthétique : c'est une absence de choix. Poppins et Montserrat sont les polices par défaut de tout site généré par IA.

**Fraunces** est une serif variable avec un axe de taille optique : la même police fonctionne à 18 px dans un sous-titre et à 64 px dans un titre principal, sans perdre en lisibilité. C'est ce qui donne le ton « étude sérieuse » sans avoir à écrire le mot « étude ». Configurée sobre (axes `SOFT` et `WONK` au minimum), elle ne devient pas boutique.

**Public Sans** est conçue pour la lisibilité gouvernementale, c'est-à-dire pour être lue par tout le monde sur un écran mediocre. C'est exactement ton cas. Elle est gratuite, sous-ensembliable, et auto-hébergeable — donc pas d'appel à Google Fonts, donc pas de perte de temps au chargement sur une connexion lente.

Les deux sont sur Google Fonts et peuvent être **auto-hébergées** avec un sous-ensemble limité aux caractères français. Deux polices, pas quatre.

### Pourquoi l'application est quasiment sans animation

Ton utilisateur crée une étude, y passe 20 minutes, et consulte des résultats. Ce n'est pas une page visitée une fois. Chaque animation est une attente. Le budget de 150 à 250 ms n'est pas une préférence, c'est le seuil au-delà duquel le cerveau perçoit un délai.

Ce que j'anime : l'apparition d'un résultat, le remplissage d'une barre, la transition d'étape. Ce que je n'anime jamais : le chargement de la page, le scroll de l'application, les tableaux.

### Pourquoi la page d'attente, elle, peut être ouverte

Elle est visitée une fois, elle doit convaincre, et elle n'a pas de données à manipuler. Les révélations au scroll en CSS natif (`animation-timeline`) coûtent **0 Ko de JavaScript**, tournent hors du thread principal, et ne pénalisent pas l'INP. C'est le meilleur rapport effet/poids possible pour ta cible.

### La carte de résultat partageable, l'idée la moins évidente

Le partage WhatsApp est ta distribution. Le format partageable le plus efficace sur WhatsApp n'est pas le lien, c'est **l'image**. Je prévois donc une carte conçue dès le départ pour être capturée en écran et envoyée : le nom de l'étude, le nombre de réponses, un ou deux résultats marquants, en format 1080×1080.

Ce n'est pas une fonctionnalité du MVP. C'est une décision de design prise maintenant, pour que les couleurs, les typographies et les proportions soient pensées dès le départ. Sinon ce sera bricolé à la hâte plus tard, et ça ne sera pas envoyable.

---

## 4. Ce que je signale, et ce que je ne décide pas

**L'hypothèse que je pose** : tu ne m'as donné aucune référence. J'ai donc construit la direction à partir du public et de l'usage, pas à partir de sites que tu admires. C'est la bonne méthode par défaut, mais c'est une hypothèse.

**Ce qui la modifierait** : si tu m'envoies un ou deux sites que tu trouves beaux, avec une phrase sur ce que tu aimes précisément, je peux ajuster la direction **avant** de construire. Pas après. Une fois les tokens posés et les composants écrits, changer la direction c'est refaire tout le projet.

**Ce que je ne fais pas** : je ne construis pas la page d'attente ni l'application maintenant. La skill est formelle, et je suis d'accord avec elle : pas de code avant l'accord sur la direction artistique. C'est le seul point où je m'arrête volontairement.

---

## 5. Le test d'identité

Avant de livrer, je me pose la question : **si je collais le logo de Kofira ou de Sika sur une page JiaKo, est-ce qu'on verrait la différence ?**

Avec cette direction, oui. Kofira est un site émotionnel (un cadeau, un couple, une histoire). JiaKo est un outil de vérité (des chiffres, un entrepreneur, une décision). Vert bouteille et ambre marigold contre la palette de Kofira, Fraunces contre une serif de cadeau : ce sont deux univers. Si à l'usage la réponse était non, je retravaillerais.

---

## 6. Ce que je produis après ton accord

Dans cet ordre, et **un fichier à la fois** :

1. **Les fondations** : `tokens.css` avec les variables de design (couleurs, typographies, espacements, rayons, ombres, durées). Aucune valeur brute n'apparaîtra ailleurs dans le code.
2. **Les composants de base** : bouton, champ, carte, barre de progression, état vide, squelette de chargement. Chacun avec ses états.
3. **Puis les pages**, une par une.

Et je note la direction validée dans `livrables/applications/jiako/README.md` pour qu'elle reste la référence du projet.

---

## 7. Récapitulatif

**Ce qui est proposé** : une identité sobre et crédifiable, vert bouteille et ambre marigold, Fraunces et Public Sans, aucune photo de banque, et une carte de résultat pensée pour le partage WhatsApp. Deux budgets d'animation : quasi nul dans l'application, ouvert sur la page d'attente en CSS natif.

**Ce que j'attends de toi** : **un accord ou un refus** sur ces 5 lignes. Un refus est utile, un oui tiède ne l'est pas. Si tu as des références, envoie-les maintenant, pas après.

**Ce que je ne fais pas** : aucun fichier de code avant ton accord. Le reste du projet (architecture, puis développement) suit dans l'ordre de construction de l'étape 1.
