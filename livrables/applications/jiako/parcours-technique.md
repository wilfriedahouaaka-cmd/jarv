# Parcours technique JiaKo

> Le chemin complet, de l'état actuel à l'application en production. Chaque étape a un livrable et une condition de passage.
> Sources : rapport de planification du 20 octobre 2026, `context/guide/GUIDE-COMPLET.md`, `context/PROMPT-DEV.md`.

---

## 0. Le principe qu'il ne faut pas perdre

Ton rapport du 20 octobre a rendu un verdict : **Go pour la validation, No-Go pour le développement**. Ce document ne le contourne pas, il l'applique. Le code arrive au moment où il est justifié, pas avant.

Ce qui change par rapport à une lecture naïve du plan, c'est qu'**il y a deux surfaces à construire, pas une**, et qu'elles n'obéissent pas aux mêmes règles.

| Surface | C'est quoi | Quand | Règle de design |
|---|---|---|---|
| **La page d'attente** | Une page publique qui explique le service et recueille les emails | **Maintenant**, c'est du matériel de phase 1 | Motion ouvert, scroll, démonstration |
| **L'application** | Le tableau de bord, la création d'étude, le lien de réponse, les résultats | Après la validation | Sobriété, vitesse, mobile d'abord |

C'est la page d'attente qui répond à ta question sur les animations et les scroll. L'application, elle, a des contraintes opposées, et je vais être franc là-dessus dans `direction-design.md`.

---

## 1. Étape A, maintenant : la page d'attente

**C'est le seul code justifiable aujourd'hui**, parce qu'il sert directement la phase 1 : il faut 20 inscriptions de gens que tu ne connais pas.

### Ce qu'elle doit faire

1. Expliquer en 10 secondes ce que c'est, pour qui
2. Recueillir une inscription email, sans compte, sans friction
3. Being mobile-first, parce que ta cible partage sur WhatsApp
4. Être légère : tes utilisateurs payent leurs données

### Ce qu'elle ne doit pas faire

- Demander un compte pour s'inscrire à une liste d'attente
- Présenter le produit comme s'il existait déjà
- Contenir une démo qui demande du chargement lourd

### Le découpage

```
page-attente/
├── index.html          # le premier écran : titre, promesse, champ email
├── style.css           # design system : variables, typo, couleurs, composants
├── main.js             # soumission email, validation, message de confirmation
└── README.md
```

Pas de build, pas de dépendances, pas de framework. C'est volontaire : une page de 3 fichiers se déploie sur Vercel en une commande, se lit entièrement, et ne casse pas.

### La condition de passage

20 inscriptions. C'est le seuil n°4 de ton rapport, et c'est le seul livrable de l'étape A.

---

## 2. Étape B, l'Outil : la décision qui conditionne tout

**À faire avant la première ligne de code de l'application.**

Le rapport identifie 4 leviers de différenciation possibles : le guidage, l'analyse, le rapport, le contexte local. Le dossier d'origine les avait classé en « fonctionnalités futures », ce qui est une erreur : c'est là que se trouve la valeur.

Il faut que les interviews te disent lequel de ces quatre est le vrai besoin. Sans ça, tu construis un formulaire de plus.

**Ce que je te propose de préparer pendant ce temps, sans le faire** : un comparatif des 3 modèles de guidage possibles, avec pour chacun ce que ça coûte en code et ce que ça suppose sur l'IA.

| Modèle de guidage | Ce que fait l'utilisateur | Coût technique | Risque |
|---|---|---|---|
| **A. Modèles par secteur** | Il part d'un modèle, adapte les questions | Le plus bas. Des questionnaires prêts à l'emploi | Différenciation faible, Tally peut le copier |
| **B. Assistant IA** | Il décrit son projet, l'IA propose les questions | Le plus élevé. Prompt, coût par appel, garde-fous | Dépend du coût de l'IA, dépendance modèle |
| **C. Accompagnement humain** | Tu l'aides, l'outil l'enregistre | Moyen. C'est le pilote manuel devenu produit | Ne se automatise pas, mais c'est ton vrai savoir-faire |

Le modèle B est le meilleur candidat pour te différencier, et c'est celui que ton rapport désigne. Le modèle C est celui que tu exerces déjà dans le pilote manuel. **L'hypothèse à tester en interview est que le client veut un livrable, pas un outil**, et que l'outillage vient en second.

---

## 3. Étape C, le socle technique

**Après l'étape B.** C'est le moment où le code de l'application commence.

### Stack

Ce qui est décidé dans le rapport, et que je reprends sans changement :

| Couche | Choix | Pourquoi |
|---|---|---|
| Langage | TypeScript | Tu le connais déjà, et les types protègent les schémas de validation |
| Build | Vite | Rapide, tu l'as déjà utilisé |
| Framework | React 19 | Tu le connais, et c'est ce que le rapport retient |
| Styles | Tailwind | Tu le connais, cohérent avec ton expérience |
| Base + Auth | Supabase | Auth gérée, PostgreSQL, RLS. Pas de serveur Node à sécuriser |
| Hébergement | Vercel | Tu l'as déjà, un seul endroit à surveiller |
| Graphiques | Recharts | Léger, suffisant pour des barres et des comptages |
| Composants UI | shadcn/ui | Les composants sont dans ton dépôt, tu les possèdes |

Next.js n'est pas nécessaire. Un serveur Node séparé n'est pas nécessaire. Moins de pièces, moins de surface d'attaque.

**Je vérifie les versions exactes au moment de l'implémentation**, pas avant. Les versions bougent vite et je ne veux pas écrire dans le document un numéro périmé.

### Structure du projet

```
jiako/
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # client unique, importé partout
│   │   ├── validation.ts        # schémas zod, un par endpoint
│   │   └── csv.ts               # export CSV + neutralisation des formules
│   ├── components/
│   │   └── ui/                  # composants shadcn, modifiés à la main
│   ├── features/
│   │   ├── etudes/              # création, publication, liste
│   │   ├── questions/           # édition, 4 types
│   │   ├── reponses/            # saisie publique, résultats
│   │   └── export/              # CSV sécurisé
│   ├── routes/
│   │   ├── /                    # tableau de bord
│   │   ├── /etudes/[id]         # une étude
│   │   ├── /repondre/[token]    # route publique, aucune auth
│   │   └── /connexion
│   └── main.tsx
├── supabase/
│   ├── migrations/              # SQL versionné, dans l'ordre
│   └── functions/               # fonctions RPC
├── .env.example
└── .gitignore
```

Le découpage par `features` plutôt que par type de composant, parce que chaque fonctionnalité du MVP est un parcours complet, du schéma à l'écran. Et `supabase/migrations/` versionné, parce que c'est la seule façon de pouvoir revenir en arrière.

### Les migrations, dans cet ordre

1. `001_extensions.sql` : `pgcrypto` pour les UUID
2. `002_tables.sql` : `etudes`, `questions`, `reponses`, `reponses_questions`
3. `003_indexes.sql` : index sur `etudes.proprietaire_id`, `questions.etude_id`, `reponses.etude_id`
4. `004_rls.sql` : activation RLS + policies
5. `005_fonctions.sql` : RPC de soumission de réponse, quota, idempotence
6. `006_seed.sql` : les 3 modèles de questions

**Les politiques RLS s'écrivent avant les policies d'accès dans l'application, et les deux sont revues ensemble.** Si une règle vit à un seul endroit, c'est une faille qui attend.

---

## 4. Étape D, les 5 must-have

**Un par un, dans cet ordre.** ChaqueMust-have se termine par sa revue sécurité (`context/guide/CHECKLIST-TRAVAIL.md`, section 2) avant de passer au suivant.

### 1. Le compte

Supabase Auth. Tu n'écris pas ton propre hachage, tu ne gères pas les mots de passe, tu profites de la limitation de débit et de la vérification email.

**Porte de sortie** : inscription, connexion, déconnexion, et la session survit au rechargement de page.

### 2. Créer une étude depuis un modèle

3 modèles maximum, 4 types de questions (choix unique, choix multiple, échelle, texte court).

**Porte de sortie** : on crée une étude, on adapte les questions, on enregistre. La validation est côté serveur, avec un schéma par type de question.

### 3. Le lien public de réponse

Le point le plus difficile et le plus fragile du produit. Un lien `wa.me` qui s'ouvre sur le téléphone, un formulaire sans compte, un message de remerciement à la fin.

C'est ici que se concentrent les 4 défis d'ingénierie :
- **Idempotence** : une clé unique par soumission, un double clic ne crée pas deux réponses
- **Atomicité** : la réponse et ses réponses aux questions s'enregistrent ensemble, via une fonction RPC, jamais en deux requêtes
- **Concurrence** : le quota du plan gratuit est un compteur atomique, jamais un `if quota > 0`
- **Scalabilité** : c'est la route publique, elle encaisse des centaines de personnes d'un coup

**Porte de sortie** : soumission depuis un téléphone, réseau lent, double clic. Trois tests, pas trois suppositions.

### 4. Les résultats simples

Comptages, graphiques en barres, liste des réponses en texte.

Les réponses en texte libre sont la source de deux risques : le **XSS** (échappement obligatoire à l'affichage) et l'**injection de formules** (neutralisation à l'export).

**Porte de sortie** : une réponse contenant `<script>alert(1)</script>` s'affiche comme texte. Une réponse contenant `=cmd|'/c calc'!A1` n'exécute rien dans Excel.

### 5. L'export CSV sécurisé

Chaque cellule qui commence par `=`, `+`, `-` ou `@` est préfixée d'une apostrophe ou neutralisée. C'est un point qui n'existe pas dans ton guide et qu'il faut quand même traiter.

**Porte de sortie** : l'export s'ouvre dans Excel sans exécuter quoi que ce soit.

---

## 5. Étape E, la bêta fermée

10 à 20 utilisateurs réels. Avant ça, trois dossiers à traiter :

**Légal**, et c'est le point que tu peux traiter le plus tôt parce qu'il a un délai administratif :
- Déclaration préalable ARTCI au titre de la loi n° 2013-450. C'est un formulaire à déposer, donc ça se lance en amont
- CGU avec la répartition des rôles : tes utilisateurs collectent les réponses de leurs répondants, tu héberges
- Politique de conservation et de suppression
- Règle d'interdiction de collecte de données sensibles (santé, opinions politiques, religion)

**Sécurité**, le test qui ne se négocie pas :
- Deux comptes différents, l'un ne peut pas lire les réponses de l'autre. Ce test passe **avant** toute bêta, pas pendant
- Vérifier que la clé `service_role` n'apparaît jamais dans le bundle du navigateur
- Limitation de débit sur login, création d'étude, soumission de réponse

**Opérationnel** : le plan Supabase Pro (25 $), le plan Vercel Pro (environ 20 $), l'alerte de quota, la procédure de restauration d'une sauvegarde testée.

---

## 6. Ce que je fais à chaque étape

Le protocole est dans `GUIDE-TRAVAIL.md` à la racine du workspace, il est chargé automatiquement. En résumé, à chaque fonctionnalité :

1. Je décris la **surface d'attaque** avant le code
2. J'applique le standard de `context/guide/GUIDE-COMPLET.md`, thème par thème, en tenant compte de la criticité
3. Je livre la fonctionnalité **avec ses cas limites testés**, pas « supposés fonctionnels »
4. Je réponds aux 10 défis pour ce qui s'applique
5. Je fais la revue sécurité avant que tu merges

Et je respecte `context/PROMPT-DEV.md` : comprendre, analyser, définir l'architecture, puis implémenter **fichier par fichier**, en français dans les commentaires.

---

## 7. Le calendrier, et son conditionnement

Le rapport donne des durées indicatives. Elles ne valent que si tu ne les contournes pas.

| Étape | Dépend de | Durée | Ne démarre pas si |
|---|---|---|---|
| A. Page d'attente | Rien. Maintenant | 2 à 3 jours | Tu as choisi la cible unique (décision n°1) |
| B. Décision sur le guidage | Les interviews | 1 jour | Tu n'as pas 10 entretiens |
| C. Socle technique | B | 1 semaine | Le bilan Go/No-Go n'est pas écrit |
| D. Les 5 must-have | C | 6 à 10 semaines | Le bilan de Kofira n'est pas fait |
| E. Bêta fermée | D | 3 à 4 semaines | L'ARTCI n'est pas déposé |

**La ligne la plus importante du tableau est la dernière colonne.** Le rapport est explicite : ne commence pas la phase 4 avant le bilan de Kofira, sinon tu dilues ton temps sur deux produits sans client.

---

## 8. Le premier pas, cette semaine

Sans matériel supplémentaire, sans code :

1. **Choisis le segment** et écris-le. C'est la décision n°1, elle bloque tout
2. **Écris la phrase de départ** avec ce segment
3. **Liste 10 personnes** à interroger. Si tu n'arrives pas à en lister 10, c'est un signal
4. **Ouvre l'onglet de recherche** sur les outils d'enquête assistés par IA. C'est le chantier le plus négligé et le plus bloquant pour ta différenciation
5. **Pendant que tu fais ça**, je peux poser la page d'attente (étape A). Elle te sert pour la liste d'attente, et elle me sert à valider la direction design avec toi sur du vrai code

Dis-moi quand tu as le segment, et on démarre l'étape A.
