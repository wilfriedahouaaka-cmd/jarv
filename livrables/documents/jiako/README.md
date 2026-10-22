# Documents JiaKo

> Les documents produits pour le projet JiaKo. Ils sont séparés du dossier applicatif parce qu'ils sont des livrables de fond, pas du code.

## Contenu

| Fichier | Date | Nature |
|---|---|---|
| `cadrage-et-identite.pdf` | 16 octobre 2026 | Le dossier de cadrage d'origine : l'identité du nom, le problème, les rôles, l'architecture envisagée, les risques |
| `rapport-de-planification.pdf` | 20 octobre 2026 | Le rapport de planification, 12 sections. **Le document de référence pour le MVP** |
| `cadrage-et-identite-texte.txt` | 16 octobre 2026 | Version texte du dossier de cadrage, extraite automatiquement |
| `rapport-de-planification-texte.txt` | 20 octobre 2026 | Version texte du rapport, extraite automatiquement |
| `etape-0-comprehension.md` | 22 octobre 2026 | Le compte rendu de lecture, les 8 contradictions et les 6 points flous |
| `etape-1-plan-mvp.md` | 22 octobre 2026 | **Le plan du MVP** : 5 indispensables, 11 reportés, ordre de construction en 11 étapes, cas limites, données de répondants et loi ivoirienne |
| `etape-2-stack.md` | 22 octobre 2026 | Le comparatif de stack, les tarifs vérifiés, et la décision d'hébergement qui lève un blocage |
| `etape-3-direction-artistique.md` | 22 octobre 2026 | La direction artistique en 5 lignes, en attente d'accord |

## Décisions validées le 22 octobre 2026

| Décision | Choix retenu |
|---|---|
| Périmètre | Celui du rapport du 20 octobre : 5 must-have, CSV seul, pas de PDF ni d'Excel |
| Cible | **Petits entrepreneurs** (et non étudiants). Hypothèse posée à partir de la recommandation, à confirmer avec les interviews |
| Modèle | Freemium 4 offres, mais le MVP n'a aucun paiement |
| Nom | **JiaKo** confirmé |
| Stack | React + TypeScript + Vite + Tailwind + Supabase + Recharts + shadcn/ui, sans changement |
| Hébergement | **Cloudflare Pages** (gratuit, autorise le commercial) + Supabase Free pendant le dev, Supabase Pro à 25 $/mois au premier client |
| Direction artistique | Proposée, **en attente de l'accord de Wilfried** |

## Versions texte

Les PDF de `context/import/` ne sont pas lisibles par l'assistant, qui ne lit pas les PDF. Ils ont été convertis en texte avec `pdfjs-dist`, et les versions `.txt` sont ici pour pouvoir les relire et les chercher sans dépendre de l'outil.

Le dossier de cadrage du 16 octobre n'avait jamais été lu dans ce workspace avant le 22 octobre 2026. Il l'est maintenant.

## Règle de préséance

En cas de conflit entre les deux PDF, **le rapport de planification du 20 octobre prévaut pour le périmètre du MVP**. Il est postérieur et le dit explicitement.

Mais le dossier du 16 octobre reste la source pour l'identité du nom, son étymologie, et l'historique de la réflexion. Les points de désaccord sont listés dans `etape-0-comprehension.md`.

## Où trouver le reste

| Ce que tu cherches | Où |
|---|---|
| Le dossier de travail, le plan d'action | `livrables/applications/jiako/` |
| Le rapport de suivi interne, en texte | `context/rapports/JiaKo.md` |
| Le standard de sécurité | `context/guide/GUIDE-COMPLET.md` |
