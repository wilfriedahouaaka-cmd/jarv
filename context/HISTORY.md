# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par l'IA.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, l'IA ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-10-22

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
