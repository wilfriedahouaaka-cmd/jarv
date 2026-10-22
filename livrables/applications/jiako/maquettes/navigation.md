# JiaKo — Arborescence et navigation des maquettes

> C'est l'équivalent de `App.tsx` + `nav.ts` de Kofira, mais en statique.
> **Toute modification de navigation commence ici**, puis se recopie dans les fichiers HTML listés plus bas.
> Contrôle automatique : `verifier-liens.mjs` (à lancer avec `node verifier-liens.mjs`).

---

## 1. L'arbre des pages

```
index.html                    Page d'accueil du site : le point d'entrée
├── #etapes                  Comment ça marche (ancre sur l'accueil)
├── #modeles                 Les 3 modèles (ancre sur l'accueil)
├── #faq                     Questions fréquentes (ancre sur l'accueil)
├── 06-contact.html          Nous écrire : WhatsApp + email
│   └── #whatsapp            Raccourci vers le canal principal
├── 05-confidentialite.html  Qui voit les réponses, et selon quelle loi
├── 01-etudes.html           Espace connecté : liste des études
│   ├── 01b-etudes-vide.html État vide (compte neuf)
│   ├── 02-editeur.html      Éditeur de questions
│   │   └── 03-reponse-mobile.html  Ce que voit le répondant (surface publique)
│   └── 04-resultats.html    Résultats + carte WhatsApp
├── 07-etats.html            Référence de conception : les 5 états d'un écran
│                            (chargement, vide, erreur, accès refusé, quota)

Hors navigation assumée :
- 03-reponse-mobile.html n'a que le pied vers l'accueil et la confidentialité,
  jamais la navigation de l'application.
- galerie.html est un outil de travail, lié par aucune page. On y accède en
  tapant l'adresse. C'est volontaire : la page d'entrée est l'accueil du site,
  pas une présentation de maquettes.
```

**`index.html` EST la page d'accueil du site.** Il n'y a pas de `00-accueil.html` :
le fichier d'accueil s'appelle `index.html`, comme sur un hébergement réel, pour
que le dossier s'ouvre directement sur la bonne page.

## 2. Les trois barres de navigation

Il y a **trois** surfaces, pas une seule. C'est la règle des deux surfaces du cadrage :
le répondant anonyme ne voit jamais la navigation de l'application.

### A. Barre publique — utilisée dans `index`, `05`, `06`

```html
<header class="accueil-nav">
  <div class="accueil-contenu accueil-nav-interieur">
    <a class="nav-marque nav-marque-lien" href="index.html">JiaKo</a>
    <nav aria-label="Navigation du site">
      <ul class="accueil-liens">
        <li><a href="#etapes">Comment ça marche</a></li>   <!-- index.html#etapes hors accueil -->
        <li><a href="#modeles">Les modèles</a></li>
        <li><a href="#faq">Questions</a></li>
        <li><a href="06-contact.html">Contact</a></li>
        <li><a href="01-etudes.html">Se connecter</a></li>
        <li><a class="bouton bouton-primaire" href="02-editeur.html">Créer une étude</a></li>
      </ul>
    </nav>
  </div>
</header>
```

Sur `index`, les ancres sont locales (`#etapes`). Sur `05` et `06`, elles sont préfixées (`index.html#etapes`).

### B. Barre de l'application — utilisée dans `01`, `01b`, `02`, `04`, `07`

```html
<nav class="nav" aria-label="Navigation principale">
  <a class="nav-marque nav-marque-lien" href="index.html">JiaKo</a>
  <ul class="nav-liens">
    <li><a href="01-etudes.html" aria-current="page">Mes études</a></li>
    <li><a href="02-editeur.html">Nouvelle</a></li>
    <li><a href="index.html">Accueil du site</a></li>
  </ul>
  <span class="nav-compte">wilfried@…</span>
</nav>
```

`aria-current` :
- `page` = c'est cette page (`01`, `01b` qui est la même route, `02`)
- `location` = on est dans cette section mais sur un autre écran (`04-resultats`)

### C. Pied de page public de `03`

Un seul bloc discret, pas de colonnes : le répondant n'a pas de compte, il n'a
pas besoin d'une navigation. Juste le retour vers JiaKo et la confidentialité.

## 3. Le pied de page commun (`.pied`)

Présent dans **toutes** les pages sauf `03`. Il porte la navigation longue,
pour que la barre du haut reste lisible à 360 px.

| Colonne | Liens |
|---|---|
| Le produit | Comment ça marche, Les modèles, Questions fréquentes |
| Ton espace | Se connecter, Créer une étude, Un compte tout juste créé |
| Voir aussi | Ce que voient tes clients, Un exemple de résultats, Les états d'un écran, Nous écrire |
| JiaKo | Nous écrire, Confidentialité, WhatsApp |
| Bas de page | JiaKo · Abidjan, Côte d'Ivoire / © 2026 JiaKo |

Le pied ne contient **aucun lien vers la galerie** : une page de travail ne
figure pas dans la navigation d'un produit. `galerie.html` s'ouvre en tapant
l'adresse. `03-reponse-mobile.html` garde son pied discret : le répondant
n'a pas accès à la navigation de l'application.

## 4. Comment on met à jour la navigation

1. On change l'arbre dans **ce fichier** d'abord.
2. On recopie le bloc correspondant (A, B ou le pied) dans **chaque** fichier concerné.
3. On lance `node verifier-liens.mjs` : il vérifie que chaque `href` pointe vers
   un fichier qui existe et que chaque page du parcours contient bien un lien
   vers `index.html`.

Pourquoi pas un JavaScript qui injecte la nav ? Parce que la navigation doit
être dans le HTML : le lien doit marcher sans JS, être vu par un moteur de
recherche et par un lecteur d'écran avant toute interaction. Quand le projet
passera en React, ce tableau devient `nav.ts` et les blocs deviennent des
composants, la structure des liens ne bouge pas.

## 5. Pages prévues mais pas encore construites

| Page | État | Raison |
|---|---|---|
| Tarifs | **pas de page** | aucun prix n'a été testé : le lien pointe vers `index.html#faq`, qui dit exactement cela |
| À propos | **pas de page** | rien à raconter qui soit validé ; une page vide mentirait |
| Connexion / Inscription | **pas de maquette** | écran à produire quand le parcours d'authentification sera cadré |
