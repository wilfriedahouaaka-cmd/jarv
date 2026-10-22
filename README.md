# Jarvis Starter Kit

> Votre assistant personnel, propulsé par OpenCode, prêt en 15 minutes.

---

## Bienvenue

Ce dossier contient tout ce qu'il faut pour transformer un modèle IA en assistant personnel. Installation déjà faite, contexte déjà rempli : ce workspace est opérationnel.

---

## Comment l'utiliser

### Étape 1 : Ouvrir ce dossier

Ouvre ce dossier comme projet de travail dans OpenCode (ou Claude Code).

### Étape 2 : C'est tout

L'installation est déjà faite. Le contexte est chargé automatiquement à chaque session, tu n'as rien à taper.

Si tu veux un résumé de l'état du workspace en début de session, tape `/prime`.

---

## Tes commandes

Tape `/` seul dans OpenCode pour les voir en autocomplétion.

| Tu veux | Tu tapes |
|---|---|
| Démarrer une session, recharger ton contexte | `/prime` |
| Ta matinée : veille + focus | `/morning` |
| Tu as avancé, ta situation a changé | `/update` |
| Le rapport d'un projet | `/rapport <projet>` |
| Analyser un document | `/analyse <fichier>` |
| Retrouver les commandes | `/commandes` |

---

## Structure du dossier

```
jarvis-starter-kit/
├── AGENTS.md                    # Fondation pour OpenCode, chargée à chaque session
├── CLAUDE.md                    # Équivalent pour Claude Code
├── GUIDE-TRAVAIL.md             # Point de déclenchement : comment travailler avec le guide
├── .env                         # Tes clés d'API. JAMAIS commité, JAMAIS lu par l'IA
├── .env.example                 # Template public des variables, sans valeurs
├── .gitignore                   # Protection des secrets, builds, éditeurs
├── livrables/                   # Tout ce que je produis pour toi
│   ├── sites-web/               # Sites internet de contenu, sans comptes
│   ├── applications/            # Apps avec comptes, données, paiement, calculs
│   ├── automatisations-ia/      # Scripts et agents IA pour entreprises
│   └── documents/               # Cahiers des charges, rapports, propositions
├── opencode.jsonc               # Config OpenCode : agent par défaut, chargement auto du contexte
├── context/
│   ├── IDENTITE.md              # Nom, ton, façon de t'adresser à l'assistant
│   ├── CONTEXT.md               # Qui tu es, ce que tu fais, tes objectifs
│   ├── HISTORY.md               # Historique évolutif de tes sessions
│   ├── COMMANDES.md             # Quelle commande taper pour quoi
│   ├── GUIDE-COMPLET.md         # Point d'entrée vers le dossier guide/
│   ├── PROMPT-DEV.md            # Méthode de développement logiciel
│   ├── guide/                   # Standard de sécurité unifié + formulaire à remplir
│   ├── rapports/                # Un rapport par projet
│   └── import/                  # Dépose ici les documents à analyser
├── .opencode/
│   ├── agents/jarvis.md         # Profil de l'agent, lancé par défaut
│   ├── commands/                # Tes commandes, pour OpenCode
│   └── skills/                  # Skills (super-pouvoirs)
│       └── recherche-actualites/# Veille personnalisée
├── .claude/                     # Les mêmes choses, pour Claude Code
└── module-installs/             # Modules d'installation
```

---

## Les fichiers clés à comprendre

### AGENTS.md
La fondation pour OpenCode. Il est lu automatiquement au début de chaque session. `CLAUDE.md` fait le même travail pour Claude Code, les deux restent synchronisés.

### context/CONTEXT.md
Ta carte d'identité. Qui tu es, ce que tu fais, tes objectifs, tes projets en cours.

### context/IDENTITE.md
Le nom, le ton et la façon dont l'assistant s'adresse à toi. **C'est le seul fichier à modifier pour le renommer.**

### context/HISTORY.md
Ton journal de bord vivant. L'assistant le met à jour automatiquement après chaque session significative.

### context/COMMANDES.md
La table de correspondance entre ce que tu veux faire et la commande à taper.

### GUIDE-TRAVAIL.md
Le point de déclenchement quand tu commences à travailler sur un projet. Chargé automatiquement. Il dit quand lire le guide de sécurité, quelles règles ne se négocient pas, et ce qui doit être produit systématiquement.

### context/guide/
Le standard de sécurité, en un seul document. Les niveaux junior, intermédiaire et senior sont fusionnés en un standard unique, chaque exigence portant une criticité (Critique, Important, Avancé). Contient aussi le formulaire à remplir avant un projet, avant un merge, ou avant une zone sensible.

---

## Bonnes pratiques

- **Le contexte se charge tout seul** dans OpenCode, via le champ `instructions` de `opencode.jsonc`. `/prime` reste utile pour un résumé rapide
- **Sois honnête dans tes réponses** lors d'une mise à jour de contexte
- **Mets à jour régulièrement** tes fichiers quand ta situation évolue
- **Utilise `context/import/`** pour déposer des documents externes que l'assistant doit analyser (PDFs, exports, etc.)
- **Valide toujours** les modifications proposées sur tes fichiers

---

## Sauvegarde GitHub

Le workspace est versionné et sauvegardé sur GitHub.

| | |
|---|---|
| Dépôt | `https://github.com/wilfriedahouaaka-cmd/jarv.git` |
| Branche | `main` |
| Authentification | Git Credential Manager, via le navigateur au premier push |

### Sauvegarder après une session de travail

```bash
git add -A
git status --porcelain    # VÉRIFIER que .env n'apparaît pas
git commit -m "description claire du travail fait"
git push
```

Si `git status --porcelain` affiche `.env`, **ne commit pas**. C'est le seul contrôle à faire, et il prend deux secondes.

### Ce qui n'est jamais sauvegardé

| Élément | Pourquoi |
|---|---|
| `.env` | Tes clés d'API. C'est le but du `.gitignore` |
| `context/import/` | Tes documents personnels (CV, rapports importés) |

Si tu ajoutes un jour un fichier sensible, ajoute son pattern au `.gitignore` **avant** de commiter, pas après.

---

## Bon à savoir

### Changer le nom de l'assistant

Trois étapes, deux minutes, détaillées dans `context/IDENTITE.md` :

1. Modifier le nom dans `context/IDENTITE.md`
2. Renommer `.opencode/agents/jarvis.md` avec le nouveau nom
3. Mettre à jour `default_agent` dans `opencode.jsonc`

Puis demander à l'assistant de remplacer les occurrences de l'ancien nom dans `AGENTS.md` et `CLAUDE.md`.

### Le conseil `/goat` est séparé

Le conseil d'administration IA est installé **hors de ce workspace**, dans `C:\Users\HP KS\Apps\goat`. Il ne se déclenche jamais tout seul : il faut l'appeler explicitement.

---

## Crédits

Créé par Yassine SDIRI, exclusivement pour les membres de la **Communauté IA** sur Skool. Ce starter kit est réservé à un usage personnel.

Pour aller plus loin dans votre apprentissage et maîtriser l'IA en profondeur, découvrez **IAPreneur Académie**, l'école dédiée aux entrepreneurs et professionnels qui veulent passer à un niveau supérieur : https://www.iapreneurs.com/
