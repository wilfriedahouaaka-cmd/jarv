# JiaKo

> Étude de marché guidée : planification de A à Z.
> Un étudiant ou petit entrepreneur crée une étude guidée à partir d'un modèle, partage un lien, reçoit des réponses et voit des résultats simples.

## Statut

| | |
|---|---|
| **Phase actuelle** | Phase 1, validation sans code |
| **Décision du 20 octobre 2026** | Go pour la validation, No-Go pour le développement |
| **Prochaine action** | Choisir le segment cible unique, puis lancer les interviews |
| **Blocage principal** | Décision n°1 : étudiants ou petits entrepreneurs ? |
| **Objectif de la phase** | Atteindre les seuils de la section 5 du rapport de planification, ou pivoter |

**Aucune ligne de code avant le bilan de la phase 1.** Ce n'est pas une posture théorique : JiaKo manipule des comptes et des données de tiers, donc le coût de construire correctement est élevé. Valider d'abord évite de payer ce coût pour un produit que personne ne veut.

## Documents de référence

| Document | Où | Contenu |
|---|---|---|
| Rapport de planification (20 octobre 2026) | `livrables/documents/jiako/rapport-de-planification.pdf` | Le document de référence. 12 sections : idée, marché, concurrents, validation, faisabilité, MVP, préparation, plan d'exécution, risques, décisions, sources |
| Dossier de cadrage et identité (16 octobre 2026) | `livrables/documents/jiako/cadrage-et-identite.pdf` | Le dossier de cadrage d'origine, repris par le rapport du 20 octobre |
| Rapport de suivi (interne) | `context/rapports/JiaKo.md` | Version texte du rapport de planification, lisible sans PDF |

**En cas de conflit**, le rapport de planification du 20 octobre prévaut : il est postérieur et reprend explicitement le dossier du 16 octobre.

## Le raisonnement, en une page

**Le problème** est crédible : les gens jonglent entre Google Forms, Excel, WhatsApp et Word, et n'obtiennent jamais de rapport exploitable. Le besoin est **ponctuel**, pas récurrent. C'est un lancement, un mémoire, une étude avant d'ouvrir.

**La collecte est gratuite.** Tally et Google Forms offrent des formulaires et des réponses illimités. JiaKo ne peut pas gagner sur la collecte, et ne doit pas essayer.

**La valeur possible est ailleurs** : le guidage (quoi demander, à qui), l'analyse (comprendre les réponses), le livrable (un rapport présentable) et le contexte local (français, exemples, prix, paiement mobile money). C'est exactement là que ton savoir-faire en IA et automatisation sert. Le dossier d'origine plaçait ça dans les « fonctionnalités futures », ce qui est une erreur : c'est le cœur.

**La question centrale non répondue** : comment le guidage fonctionne-t-il sans intervention humaine ? Des modèles par secteur ? Un assistant IA qui propose les questions ? Un accompagnement humain ? Le rapport du 20 octobre a isolé ce point comme le manque n°1 à combler.

**Le risque n°1 n'est pas technique, c'est la dispersion.** Tu es seul, Kofira n'a pas encore de client, et tu as 35 h par semaine. Lancer un produit multi-utilisateurs en parallèle de Kofira est le meilleur moyen de ne rien finir.

## Les 5 phases

| Phase | Contenu | Critère de sortie | Durée |
|---|---|---|---|
| 0. Cible et phrase | Un segment, la phrase de départ, les hypothèses | Segment et phrase écrits | 2 à 3 jours |
| 1. Validation sans code | 10 à 15 interviews, recherche de demandes, recherche des outils IA, liste d'attente | Seuils atteints, ou pivot assumé | 3 à 4 semaines |
| 2. Pilote manuel | 3 à 5 études clé en main, heures et prix notés | 3 clients payants, ou enseignements clairs | 3 à 6 semaines |
| 3. Bilan Go / No-Go | MVP, modèle de prix, rôle de l'IA | Décision écrite | 1 jour |
| 4. MVP | Les 5 must-have | Test d'accès croisé réussi, test sur téléphone | 6 à 10 semaines à temps partiel |
| 5. Bêta fermée | 10 à 20 utilisateurs réels | Pas de faille connue, retours intégrés | 3 à 4 semaines |
| 6. Lancement payant | Paiement mobile money, CGU, ARTCI, CEPICI | Conditions légales vérifiées | À estimer |

**Phases 0 et 1 en premier, et elles ne demandent aucune ligne de code.** C'est pour ça qu'elles peuvent avancer pendant que Kofira cherche ses premiers clients. Mais la phase 4 ne commence pas avant le bilan de Kofira.

## Le MVP, en une phrase

Un étudiant ou petit entrepreneur crée une étude guidée à partir d'un modèle, partage un lien, reçoit des réponses et voit des résultats simples.

**Indispensable :** un compte (auth fournie par la plateforme), créer une étude depuis 3 modèles maximum avec 4 types de questions, un lien public de réponse pensé pour le téléphone avec partage WhatsApp, des résultats simples (comptages, barres, liste des réponses), un export CSV sécurisé.

**Peut attendre :** rapport PDF, export Excel, abonnements, rôles et collaboration, panel de répondants, intégrations, application mobile.

**Stack :** React, TypeScript, Vite, Tailwind, Supabase (auth, PostgreSQL, RLS), Vercel Pro, Recharts. Rien de nouveau à apprendre, pas de serveur Node séparé à sécuriser. Next.js n'est pas nécessaire.

## Modèle de données du MVP

| Entité | Champs clés | Règle d'accès |
|---|---|---|
| Utilisateur | Géré par l'authentification | Chacun voit son compte |
| Étude | id (UUID), propriétaire, titre, description, statut (brouillon, publiée, fermée) | Le propriétaire lit et écrit |
| Question | id, étude, type, libellé, options, position | Lecture publique si l'étude est publiée, écriture par le propriétaire |
| Réponse | id, étude, date, clé unique de soumission | Insertion publique via une fonction contrôlée, lecture par le propriétaire seulement |
| Réponse à une question | id, réponse, question, valeur | Comme la réponse |

**Règle d'or :** personne d'autre que le propriétaire de l'étude ne peut lire ses réponses. À tester avec deux comptes différents avant toute bêta.

## Sécurité, points spécifiques à JiaKo

Le standard général est dans `context/guide/GUIDE-COMPLET.md`. Voici ce qui est propre à JiaKo et ne se trouve pas ailleurs.

| Menace | Où dans JiaKo | Protection |
|---|---|---|
| **Injection de formules dans les exports** | Un répondant écrit `=...` ou `+...` et l'export CSV l'exécute dans Excel | Neutraliser les cellules qui commencent par `=`, `+`, `-`, `@` à l'export. Ce point n'est pas dans le guide, il est réel |
| IDOR | Changer l'identifiant d'une étude dans l'URL | UUID, RLS, vérification du propriétaire à chaque requête |
| XSS | Réponses en texte libre affichées dans le tableau de bord | Échapper tout texte de répondant, CSP |
| Spam et bots | Lien public de réponse | Honeypot, limitation par appareil ou adresse, limite de réponses par étude, captcha si besoin |
| Force brute | Connexion | Authentification fournie par la plateforme, ne pas écrire son propre hachage, vérifier les limites de débit |
| Secrets | Clés d'API | Clé `service_role` jamais dans le navigateur, `.env` non commité |
| Données des répondants | Base de données | Minimiser, anonymat par défaut, aucune donnée sensible inutile |
| Abus du plan gratuit | Création massive de comptes ou d'études | Limites par compte, vérification d'email |

**Les 10 défis d'ingénierie, appliqués :** concurrence (quota de réponses, compteur atomique), idempotence (clé unique par soumission), atomicité (réponse et réponses aux questions ensemble via fonction RPC), scalabilité (la route publique de réponse est le point fragile), autorisation (critique, tests d'accès croisés avant bêta), multi-services (plus tard, clés d'idempotence sur les notifications de paiement), migrations (compatibles avec l'ancienne version, retour arrière possible), hors ligne (réessai sans doublon), fiabilité de l'IA (afficher les sources, ne pas laisser l'IA inventer des chiffres), CAP (non applicable, une seule base).

## Légal, à confirmer

Ce n'est pas un avis juridique, c'est la liste des points à faire confirmer.

- **Côte d'Ivoire** : la loi n° 2013-450 du 19 juin 2013 sur les données personnelles s'applique, avec l'ARTCI comme autorité. Tout traitement doit faire l'objet d'une déclaration préalable ou d'une autorisation.
- **RGPD** : ne s'applique que si des répondants se trouvent dans l'Union européenne.
- **Rôles** : tes utilisateurs collectent les réponses de leurs répondants, tu héberges. Qui est responsable de quoi doit être clarifié avec un juriste puis écrit dans les CGU.
- **Consentement** : informer les répondants de l'usage de leurs réponses, interdire la collecte de données sensibles (santé, opinions politiques, religion), définir la durée de conservation et la suppression.
- **Transferts à l'étranger** : Supabase et Vercel hébergent hors du pays, ce point est encadré par la loi.
- **Paiement** : le mobile money passera par un service local, à identifier, avec ses frais et ses exigences. Entreprise enregistrée au CEPICI probablement nécessaire.

## Coûts fixes

Environ 45 $ par mois, soit 25 000 à 29 000 FCFA au taux variable du jour, à recalculer. Supabase Pro 25 $ (requis dès la bêta, le plan gratuit met en pause après 7 jours d'inactivité), Vercel Pro environ 20 $ (requis dès qu'un abonnement existe).

| Prix par utilisateur | Utilisateurs payants pour couvrir les coûts fixes |
|---|---|
| 2 000 FCFA | 13 à 15 |
| 5 000 FCFA | 5 à 6 |
| 10 000 FCFA | 3 |

Hors frais de paiement mobile, e-mails transactionnels, domaine et coût de l'IA. Le coût de l'IA est variable, il faut l'estimer avant de promettre une analyse IA dans le plan gratuit.

## Le nom

JiaKo reste un **nom de travail**. Le sens « interroger le marché » est une construction personnelle, et les sens agni ne sont pas vérifiés.

| Constat | Conséquence |
|---|---|
| `jiako.com` en vente à 8 255 $ (renouvellement 18,48 $ par an) | Trop cher, ne pas acheter |
| `jiako.co` déjà enregistré depuis 2023 | Non disponible |
| `jiako.org` 8,48 $ puis 14,48 $ | Optionnel, à revoir |
| `jiako.io` 29,98 $ puis 65,98 $ | Cher |
| `jiako.ai` 89,98 $ | Trop cher |
| « Jako » est une entreprise allemande d'articles de sport, phonétiquement très proche | Risque de confusion |
| Jiahao (chinois) et Aiko (japonais) | Le nom mélange des influences sans en assumer une |

Décide du nom définitif avant d'acheter un domaine ou de publier une page. Fais valider les sens agni par des locuteurs, et vérifie les marques (OAPI, WIPO) et les comptes de réseaux sociaux.

## Le dossier du projet

```
jiako/
├── README.md              # ce fichier
├── plan-de-travail.md     # le plan d'action détaillé, phase par phase
├── parcours-technique.md  # le chemin de construction, étape par étape
├── direction-design.md    # le design 2026, et les références à m'envoyer
└── (le code, plus tard)
```

| Document | Ce qu'il contient |
|---|---|
| `plan-de-travail.md` | Les 6 phases de validation, les 5 chantiers de la phase 1, les seuils Go, ce qu'il ne faut pas faire, les 8 décisions |
| `parcours-technique.md` | Le chemin jusqu'à l'application en production : la page d'attente, la décision sur le guidage, le socle technique, les 5 must-have, la bêta. Chaque étape a un livrable et une condition de passage |
| `direction-design.md` | L'état réel du design web 2026, vérifié avec les chiffres. Le budget de mouvement par surface, la checklist de fin de chantier, et la liste des références à m'envoyer |

Les documents du projet sont dans `livrables/documents/jiako/`. Le rapport de suivi interne est dans `context/rapports/JiaKo.md`.
