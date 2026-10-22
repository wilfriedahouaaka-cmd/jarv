# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par l'IA.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, l'IA ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-10-22

### JiaKo : étape 0, les 7 documents lus et le dossier de cadrage débloqué
- Wilfried a lancé le travail sur JiaKo avec une méthode en 6 phases (compréhension, plan du MVP, stack, direction artistique, architecture, développement), avec son accord entre chaque phase
- **Blocage technique levé** : l'assistant ne lit pas les PDF. J'ai installé `pdfjs-dist` dans un dossier temporaire et écrit un script d'extraction (`extract.mjs`) qui convertit les PDF en texte en préservant les positions. Les 4 PDF de `context/import/` (CV, SIKA, Task Flow, JiaKo) et le dossier de cadrage JiaKo ont été convertis
- **Le dossier de cadrage JiaKo du 16 octobre a été lu pour la première fois.** Il n'avait jamais été extrait dans ce workspace. C'est le document qui contient l'étymologie du nom, les 5 rôles, l'architecture ouverte et le tableau des risques
- Compte rendu de lecture produit : `livrables/documents/jiako/etape-0-comprehension.md`, avec 8 contradictions et 6 points flous
- **Contradictions majeures** : périmètre du MVP (cadrage 16 : 5 types de questions, camemberts, Excel + PDF ; rapport 20 : 4 types, barres, CSV seul), cible (6 ou 7 segments, aucun retenu dans les deux), modèle économique (4 offres par abonnement contre la réserve du rapport 20 sur un besoin ponctuel), nom (« validé » dans le cadrage contre « provisoire » dans le rapport), rôles (5 contre 2), cadre légal (RGPD seul contre RGPD + loi 2013-450)
- **Point le plus important** : le brief de Wilfried du 22 octobre décrit le périmètre du cadrage du 16 octobre (export Excel/CSV, rapport PDF, 6 segments, 4 offres), pas celui du rapport du 20 octobre. Et il demande d'enchaîner directement sur le plan du MVP, la stack et les maquettes, alors que le rapport du 20 et le CONTEXT.md disent tous les deux No-Go pour le développement avant 10 à 15 interviews
- Position retenue : l'étape 0 est faite, les étapes 1 à 4 (plan, stack, direction artistique, architecture) sont de la planification et ne violent pas le No-Go, qui porte sur le code de production. La landing page et les maquettes sont explicitement prévues par le cadrage du 16 avant le développement
- Documents rangés : `livrables/documents/jiako/` (2 PDF + 2 versions texte + le compte rendu), `livrables/documents/` (CV, SIKA, Task Flow en texte)

### Skill de design d'interface créée
- Demande de Wilfried : une skill à appliquer automatiquement dès qu'il demande de concevoir ou d'améliorer l'interface d'un site ou d'une application, pour que le résultat ne ressemble pas à un site généré par IA
- Fichier canonique : `.opencode/skills/design-interface/SKILL.md`. Miroir Claude Code : `.claude/skills/design-interface/SKILL.md` (empreinte MD5 identique). Version globale : `~/.config/opencode/skills/design-interface/SKILL.md`, pointeur qui renvoie au canonique, pour que la skill s'applique aussi dans les dossiers projet (Kofira, JiaKo, site client) et pas seulement dans le workspace
- Contenu : méthode en 4 étapes (cadrage avec 3 à 5 questions max, direction artistique en 5 lignes avec accord attendu, fondations avant pages, auto-relecture), 2 familles de design (sites émotionnels / applications fonctionnelles), liste noire des 7 signes IA, checklist de livraison en 5 blocs, consignes techniques React
- Éléments ajoutés par rapport à la demande initiale, pour l'adapter au contexte réel de Wilfried : palette dominante + accent unique avec 6 neutres, tokens sémantiques plutôt que couleurs brutes, un seul rayon dominant par projet, ombres teintées, échelle typographique à ratio 1.25 ou 1.333, budget de mouvement differentiated (page d'attente ouverte, application 150-250 ms), et l'état de l'art 2026 vérifié (CSS `animation-timeline` natif en premier choix, GSAP gratuit depuis avril 2025, `prefers-reduced-motion` en WCAG 2.3.3, `transform` et `opacity` uniquement, `will-change` pendant l'animation active seulement)
- Points d'attention inscrits dans la skill : le public est ivoirien sur téléphone en connexion lente, donc la performance passe avant le spectaculaire. WebGL, 3D et curseur personnalisé sont explicitement exclus pour cette cible
- Test de non-identité ajouté : « si je collais le logo d'un autre projet sur cette page, verrait-on la différence ? ». Si non, l'identité n'existe pas
- Rappel inscrit : quand une image manque, demander à Wilfried exactement ce qu'il faut fournir (dimensions, ratio, format, poids), et concevoir la mise en page pour qu'elle soit remplaçable, plutôt que d'utiliser une banque d'images générique
- `AGENTS.md` et `CLAUDE.md` mis à jour : la skill est listée dans les skills disponibles, et je dois l'appliquer sans avoir à la citer

### Parcours technique et direction design JiaKo
- Wilfried a collé le PDF du rapport de planification : c'est **exactement le même document** que celui déjà lu et utilisé pour le plan de travail. Aucune information nouvelle, le dossier n'a pas changé
- Deux nouveaux documents produits dans `livrables/applications/jiako/` : `parcours-technique.md` (le chemin de construction) et `direction-design.md` (le design 2026)
- **Parcours technique** : 2 surfaces distinctes (page d'attente, puis application), 5 étapes avec livrable et condition de passage. Étape A = la page d'attente, seul code justifiable maintenant, 3 fichiers sans build. Étape B = la décision sur le modèle de guidage (A modèles par secteur / B assistant IA / C accompagnement humain). Étape C = socle technique, stack React/TS/Vite/Tailwind/Supabase/Vercel/Recharts/shadcn, structure par features, 6 migrations dans l'ordre. Étape D = les 5 must-have un par un, chacun avec sa porte de sortie. Étape E = la bêta fermée, avec le dossier ARTCI à lancer en amont
- **Direction design** : état réel du design 2026 vérifié en ligne, pas de mémoire. Points clés retenus : le CSS gère nativement les animations au scroll (`animation-timeline`, support ~85 %, Safari depuis septembre 2025, priorité interop 2026), GSAP est 100 % gratuit depuis le 30 avril 2025 (racheté par Webflow, licence commerciale incluse), INP est le juge de paix (43 % des sites échouent au seuil 200 ms, INP bon sur 77 % du mobile contre 97 % du desktop, 48 % des origines mobiles passent les 3 Core Web Vitals), le balancement a gagné, `prefers-reduced-motion` est une tableur de base
- Décision de design recommandée : **deux budgets de mouvement distincts**. Page d'attente ouverte (scroll, révélations, CSS natif sans JS). Application quasi nulle (150-250 ms, transform/opacity seulement, `will-change` uniquement pendant l'animation). Refus explicite du WebGL, du 3D, du curseur personnalisé et du défilement lissé sur mobile, pour la cible sur forfait
- Règle de design fondatrice retenue : « une animation qui n'explique rien ne mérite pas d'exister »
- Sources de références à envoyer par Wilfried : Awwwards (landing page, Site of the Year), Exhibit a, Landbook, SaaS Frame, Godly pour la page d'attente ; Mobbin, Refero, Onboarding Love, Screenlane, Dashboard Design Patterns pour l'application. Format demandé : lien + une phrase sur ce qu'il aime + capture d'écran, et aussi ce qu'il n'aime pas
- Point signalé : le chantier « outils d'enquête assistés par IA » du rapport du 20 octobre reste non fait et conditionne la différenciation. Plus prioritaire que le design
- Décision d'attente : la page d'attente n'est pas construite avant que le segment cible soit tranché (décision n°1), parce que le titre, la promesse et les 3 modèles présentés en dépendent

### Dossier de travail JiaKo créé
- Deux PDF récupérés dans `C:\Users\HP KS\Downloads` : `Dossier de Cadrage et Identite - JiaKo.pdf` (16 octobre 2026) et `JiaKo_Rapport_de_Planification.pdf` (20 octobre 2026), copiés dans `livrables/documents/jiako/`
- Le rapport du 20 octobre a été lu **intégralement** (12 sections) et a servi de base à la planification. Le dossier de cadrage du 16 octobre n'a pas pu être converti en texte : le modèle ne lit pas les PDF, et l'extracteur PowerShell écrit pour l'occasion n'a pas abouti (polices à table ToUnicode par police, flux mal délimités). Wilfried a demandé d'arrêter. Le dossier du 16 octobre est donc **non lu**
- Classement : JiaKo est une **application** (comptes, base de données, questionnaires, export, modèle freemium), pas un site de contenu. Dossier dans `livrables/applications/jiako/`, documents dans `livrables/documents/jiako/`
- Contenu produit : `livrables/applications/jiako/README.md` (statut, raisonnement, phases, MVP, modèle de données, sécurité spécifique à JiaKo, légal, coûts, nom) et `plan-de-travail.md` (les 6 phases détaillées, les 5 chantiers de la phase 1, les seuils Go, ce qu'il ne faut pas faire, les 8 décisions, le premier pas concret)
- Point de sécurité propre à JiaKo retenu : **injection de formules dans les exports CSV** (une réponse commençant par `=`, `+`, `-` ou `@` s'exécute dans Excel). Ce point n'est pas dans le guide, il est réel
- Statut acté : phase 1, validation sans code. Décisions bloquantes n°1 (cible unique : étudiants ou petits entrepreneurs) et n°2 (priorité Kofira d'abord)
- Repère important : le rapport du 20 octobre prévaut sur le dossier du 16 octobre en cas de conflit, il le reprend explicitement

### Sauvegarde GitHub activée
- Décision : le workspace est maintenant versionné et sauvegardé sur GitHub, dépôt `https://github.com/wilfriedahouaaka-cmd/jarv.git` (compte `wilfriedahouaaka-cmd`), branche `main`
- Premier commit : `9d5e962` « Sauvegarde initiale du workspace Jarvis », 43 fichiers
- Contenu versionné : `AGENTS.md`, `CLAUDE.md`, `GUIDE-TRAVAIL.md`, `opencode.jsonc`, `context/` (hors `import/`), `livrables/` (les 5 README), `.env.example`, `.gitignore`
- Non versionné, volontairement : `.env` (secrets), `context/import/` (CV, rapports et documents personnels fournis par Wilfried)
- Authentification : Git Credential Manager (installe avec Git for Windows) est configuré comme `credential.helper`, le push s'authentifie via le navigateur. Pas de token en clair sur le disque
- Vérifications faites avant push : `.env` absent de l'index, `context/import/` absent, `.env.example` sans aucune valeur, aucun `*.key`/`*.pem`/`credentials.json` dans l'index, et relecture de la liste des fichiers distants via l'API GitHub
- **Point de vigilance** : le dépôt est **public** (`"visibility":"public"`). `context/CONTEXT.md` contient le téléphone et l'email de Wilfried, donc ces informations sont visibles par quiconque. Si le dépôt doit rester confidentiel, il faut le passer en privé sur GitHub (Settings > General > Danger Zone > Change visibility) ou retirer ces données du fichier
- Procédure de sauvegarde documentée dans `README.md` : `git add -A`, vérifier `git status --porcelain` que `.env` n'apparaît pas, `git commit`, `git push`

### Dossier `livrables/` + gestion des secrets
- Décision : deux dispositifs mis en place à la racine du workspace, le 22 octobre 2026
- **1. `livrables/`** : dossier pour tout ce que l'IA produit. 4 sous-dossiers : `sites-web/` (sites internet de contenu, sans comptes ni fonctionnalités métier), `applications/` (apps avec comptes, base de données, formulaires de commande, paiement, calculs, tableaux de bord, plateformes qui vendent un service, outils métier), `automatisations-ia/` (scripts et agents IA pour entreprises, sans interface pour l'utilisateur final), `documents/` (cahiers des charges, fiches projet, rapports, propositions commerciales, supports)
- **Règle de rangement prioritaire** : l'IA ne range JAMAIS un projet automatiquement. Séquence imposée : Wilfried décrit, l'IA propose un classement avec justification courte, l'IA attend la validation, puis seulement elle crée le dossier. Projet mixte ou doute sur la catégorie : une seule question ciblée, jamais de arbitrage seul
- Convention : sous-dossier par projet, minuscules avec tirets (`livrables/applications/kofira/`). Document lié à un projet précis dans `livrables/documents/<nom-du-projet>/`
- Distinction explicitée pour éviter les doublons : `context/rapports/<projet>.md` = rapport de suivi interne pour Wilfried, `livrables/documents/<projet>/` = documents produits, transmissibles au client
- Règle d'or documentée : les **inputs** (documents fournis par Wilfried) vont dans `context/import/`, les **outputs** (produits par l'IA) vont dans `livrables/`
- Un README par dossier : `livrables/README.md` (organisation, définitions, nommage, règle de rangement) + un README court dans chacun des 4 sous-dossiers
- **2. Secrets** : `.env` à la racine avec emplacements pré-remplis (Anthropic, OpenAI, Notion, Google, YouTube, Vercel, GitHub, Stripe, plus Supabase), `.env.example` avec les mêmes variables sans valeurs, `.gitignore` complet
- `.gitignore` exclut : `.env` et variantes (avec exception pour `.env.example`), `node_modules/`, `dist/`, `build/`, `.next/`, `.vercel/`, caches, logs, fichiers temporaires, éditeurs (`.vscode/`, `.idea/`), et tous les patterns de secret (`*.key`, `*.pem`, `*.p12`, `credentials.json`, `service-account*.json`, `id_rsa*`...). `context/import/` est aussi ignoré (documents personnels de Wilfried)
- Règle inscrite dans `AGENTS.md` et `CLAUDE.md` : l'IA ne lit jamais un `.env` et n'affiche jamais la valeur d'une clé, seulement sa présence ou son absence
- Point technique vérifié : OpenCode ne charge PAS automatiquement les `.env` (le comportement par défaut de Bun a été désactivé côté OpenCode en septembre 2025). Le risque réel n'est donc pas l'override d'authentification, mais la fuite par lecture de fichier ou par un sous-processus (Bun, Vite, Next.js, Supabase CLI). L'en-tête du `.env` a été corrigé en conséquence
- Documentation de référence pour un blindage technique ultérieur : plugin `env protection` d'OpenCode, https://opencode.ai/docs/plugins/
- Références mises à jour : `AGENTS.md`, `CLAUDE.md`, `README.md`, `context/CONTEXT.md`

### Guide de sécurité refondu en un seul document + fichier racine de déclenchement
- Correction de Wilfried : « regrouper tout en un au lieu de tout séparer ». Les 3 niveaux (junior, intermédiaire, senior) ne sont plus des blocs séparés, ils sont **fusionnés en un standard unique**
- Nouveau système de criticité à la place des niveaux : **Critique** (jamais reportable), **Important** (dès qu'un tiers est exposé), **Avancé** (quand le projet grandit). Le guide indique explicitement l'équivalence avec les anciens niveaux
- `context/guide/GUIDE-COMPLET.md` réécrit : 5 règles non négociables, 14 thèmes avec exigence + implémentation + test, tableau des 10 attaques, 10 défis avec criticité et question à poser à l'IA, checklist avant projet, **section 6 « ce qui est reportable et ce qui ne l'est jamais »**, modèle de menaces, posture permanente
- Nouveau fichier racine `GUIDE-TRAVAIL.md` : point de déclenchement, chargé automatiquement via `opencode.jsonc`. Il dit quand lire quoi, les 5 règles, ce qui doit être produit systématiquement, les prompts à utiliser, la séquence de travail
- Les 3 checklists séparées (`CHECKLIST-IDEES.md`, `REVUE-SECURITE-FEATURE.md`, `MODELE-MENACES.md`) fusionnées en un seul formulaire `context/guide/CHECKLIST-TRAVAIL.md` (3 sections). Les 3 anciens fichiers ont été supprimés
- Références mises à jour : `AGENTS.md`, `CLAUDE.md` (section « Pour le code » ajoutée, elle manquait), `README.md`, `context/CONTEXT.md`, `opencode.jsonc`
- Effet concret : un seul standard à lire, un seul formulaire à remplir, et un déclencheur chargé automatiquement qui oblige à passer par le guide avant de coder

### Dossier dédié pour le Guide Complet
- Décision : le Guide Complet ne vit plus dans un fichier unique. Il a son propre dossier `context/guide/`, avec ses déclinaisons opérationnelles
- Contenu : `GUIDE-COMPLET.md` (version texte intégrale des 4 parties), `GUIDE-COMPLET.pdf` (document original, déplacé depuis `context/import/`), `CHECKLIST-IDEES.md` (checklist universelle en 8 étapes, version à remplir), `REVUE-SECURITE-FEATURE.md` (revue sécurité avant merge, version à remplir), `MODELE-MENACES.md` (threat modeling, version à remplir), `README.md` (mode d'emploi)
- Les 3 checklists sont des **gabarits** : on les copie dans le dossier du projet ou dans le rapport avant de les remplir, on ne les remplit jamais sur place. `GUIDE-COMPLET.md` et `GUIDE-COMPLET.pdf` sont des références, à ne pas modifier
- `context/GUIDE-COMPLET.md` est conservé comme point d'entrée stable vers le dossier, pour que les références existantes restent valides
- Références mises à jour : `AGENTS.md`, `CLAUDE.md`, `README.md`, `context/CONTEXT.md`, `context/COMMANDES.md`, `.opencode/commands/rapport.md`, `.claude/commands/rapport.md`
- Effet concret : chaque idée passe par `CHECKLIST-IDEES.md` avant une ligne de code, chaque fonctionnalité par `REVUE-SECURITE-FEATURE.md` avant merge, chaque zone sensible par `MODELE-MENACES.md` avant conception

### Règle de méthode : remplir d'abord, ne pas demander avant
- Correction de Wilfried : **arrêter de poser des questions avant de remplir les lacunes**. La règle est écrite dans `context/IDENTITE.md`, `AGENTS.md`, `CLAUDE.md` et dans les instructions globales (`~/.config/opencode/AGENTS.md`)
- La règle retenue : quand une lacune bloque, je prends la décision la plus raisonnable, j'écris, et je signale l'hypothèse posée. Une question ne se pose que si les options ont des conséquences réellement différentes, et alors une seule question ciblée
- L'ancienne formulation (« pose une question de clarification avant d'exécuter ») a été retirée, elle contredisait la nouvelle règle

### Parité Claude Code / OpenCode
- `.claude/commands/` est passé de 3 commandes du kit à **les 6 mêmes commandes** qu'OpenCode : `/prime`, `/morning`, `/update`, `/rapport`, `/analyse`, `/commandes`. Les 3 du kit ont été réécrites (frontmatter `description`, tutoiement, lecture de `context/IDENTITE.md`, synchronisation `CLAUDE.md` / `AGENTS.md`)
- `.claude/skills/recherche-actualites/SKILL.md` a été aligné sur la version `.opencode/` : **la veille est maintenant dérivée de mes projets en cours** dans Claude Code aussi, au lieu de la liste de thèmes fixe du kit d'origine. Les deux fichiers sont désormais identiques (empreinte MD5 vérifiée)
- `context/COMMANDES.md` précise que les 6 commandes existent sur les deux outils, avec le même comportement

### Migration du Jarvis vers `C:\Users\HP KS\Pictures\jarvis-starter-kit`
- Décision : **un seul workspace Jarvis**, dans le dossier `Pictures`. L'ancienne copie (`Documents\jarvis-starter-kit`) devient une archive, pour éviter deux contextes qui divergent
- Contexte rapatrié tel quel : `CONTEXT.md`, `HISTORY.md`, `COMMANDES.md`, `GUIDE-COMPLET.md`, `PROMPT-DEV.md`, les 4 rapports de projet (`Kofira`, `JiaKo`, `Sika`, `Task_Flow`) et les 8 documents de `context/import/`
- Ajout de `context/IDENTITE.md` : nom, ton, façon de s'adresser à moi. **Point unique de renommage** : le nom n'est plus écrit en dur dans les commandes ni dans les rapports
- Ajout de `opencode.jsonc` : `default_agent: jarvis` + `instructions` qui charge automatiquement `IDENTITE.md`, `CONTEXT.md` et `HISTORY.md` à chaque session. **Le contexte est désormais lu sans avoir à taper `/prime`**
- Ajout de `.opencode/agents/jarvis.md` : mon profil d'agent, lancé par défaut. Le nom s'affiche dans l'interface OpenCode
- La commande `/jarvis` devient `/commandes`, volontairement : une commande d'aide ne porte pas le nom de l'assistant, pour que le renommage ne casse rien
- `AGENTS.md` et `CLAUDE.md` réécrits et synchronisés, avec la structure réelle du workspace

### Installation initiale du Jarvis
- Workspace personnalisé pour Wilfried Ahoua Aka, basé à Abidjan (Côte d'Ivoire)
- Profil principal : mix (étudiant en informatique + constructeur de projets numériques), travaille seul
- Activité : création de solutions numériques (sites, applications, automatisations) pour entreprises et particuliers, Côte d'Ivoire d'abord puis international
- Objectifs court terme : 500 000 FCFA de CA par mois d'ici 6 mois, 3 à 5 premiers clients payants, un canal de vente sans budget, monter en compétence back-end et sécurité
- Vision long terme : enchaîner plusieurs produits scalables, plus de 1 000 utilisateurs, forte automatisation IA
- Projets actifs au démarrage : Kofira, JiaKo, Sika, BudgetClair, Task Flow, DevToolbox Studio, sites livrés pour des clients, bootcamp
- Domaine d'aide prioritaire pour Jarvis : productivité, organisation, suivi de projets, veille et code
- Style de communication : pédagogique avec le pourquoi, objectivité à 100 %, pas de flatterie

### Installation du conseil GOAT, à côté de Jarvis
- Un conseil d'administration IA (Bezos, Hormozi, Gary Vee, Buffett) a été installé **en dehors** de ce workspace, dans `C:\Users\HP KS\Apps\goat`
- Les deux outils sont volontairement séparés : **Jarvis assiste et suit**, le **conseil arbitre et priorise**. Le conseil ne se déclenche pas tout seul ici, uniquement sur appel explicite de la commande `/goat`
- Le contexte business chiffré du conseil vit dans `C:\Users\HP KS\Apps\goat\mon-business.md`, hors de ce workspace

### Jarvis complété pour OpenCode et pour l'usage réel
- Ajout de `AGENTS.md` (OpenCode ne lit pas `CLAUDE.md`) et de `.opencode/commands/` (OpenCode ne découvre pas `.claude/commands/`). Les 3 commandes d'origine du kit restent intactes à l'identique
- Ajout de `context/COMMANDES.md` : la table de correspondance intention → commande, et la règle de routage (proposer la commande, ne pas la lancer tout seul)
- Ajout de deux commandes qui manquaient pour ma méthode de travail : `/rapport <projet>` (un rapport par projet) et `/analyse <fichier>` (documents de `context/import/`)
- Ajout de `context/GUIDE-COMPLET.md` : la version texte de mon Guide Complet (sécurité, rate limiting, 10 défis d'ingénierie, checklist en 8 étapes), avec l'original copié dans `context/import/`
- Formation suivie : « Deviens un Expert IA avec Claude en 2026 » (Yassine Sdiri). Ce workspace est le cas d'usage n°1 de la formation, l'Assistant IA

### Contexte complété à partir de mes documents personnels
- Écoles et niveau complétés depuis mon CV : **Pigier Côte d'Ivoire (Abidjan), Informatique Développement d'Applications, 2e année (2024-2026)**
- CV, catalogue des 200 meilleurs outils d'IA, Guide Complet et rapports de projet importés dans `context/import/`
- `context/PROMPT-DEV.md` : mon prompt de développement logiciel professionnel, désormais la méthode de référence pour tout le code
- Les 4 rapports de projet importés et convertis en texte dans `context/rapports/` : Kofira, JiaKo, Sika, Task Flow
- Ma direction à moyen terme est précisée : **des outils pour les entreprises** (automatisations, agents IA), Côte d'Ivoire d'abord puis international
- Temps disponible confirmé : **plus de 35 h par semaine** sur mes projets, l'école passe au second plan
- La veille est maintenant dérivée de mes projets en cours et de mes pistes, au lieu d'une liste de thèmes fixe (skill surchargée dans `.opencode/skills/`, le fichier d'origine du kit reste intact)
