# Étape 1 : plan du MVP

> Périmètre validé : celui du rapport de planification du 20 octobre. Cible validée : petits entrepreneurs. Modèle validé : freemium 4 offres. Nom validé : JiaKo.
> Date : 22 octobre 2026.

---

## 1. Le principe

Un MVP doit rester petit. Il ne doit contenir que ce qui est nécessaire pour que le produit **existe en entier** et soit utilisable, pas ce qui est joli mais pas essentiel.

Le test que j'applique à chaque fonctionnalité : *est-ce que sans elle, le parcours principal est-il cassé ?* Si non, elle sort.

Le parcours principal de JiaKo, c'est deux rôles :

```
Créateur    1. S'inscrit  2. Décrit son projet  3. Choisit un modèle  4. Adapte
            les questions  5. Publie  6. Partage le lien  7. Suit les réponses  8. Exporte

Répondant   1. Ouvre le lien sur son téléphone  2. Répond sans compte  3. Voit merci
```

Tout ce qui n'est pas sur ces deux lignes sort du MVP.

---

## 2. Les indispensables

Cinq fonctionnalités, les 5 must-have du rapport du 20 octobre. Dans l'ordre de construction.

### F1. Un compte

Authentification fournie par la plateforme, pas écrite par moi. Inscription, connexion, déconnexion, session persistante, protection des routes privées.

**Ce que ça implique** : la RLS de la base ne peut s'appuyer que sur `auth.uid()`, donc l'authentification est posée avant toute donnée.

### F2. Créer une étude depuis un modèle guidé

3 modèles maximum. 4 types de questions : choix unique, choix multiple, échelle, texte court.

Ce que l'écran doit faire : le créateur décrit son projet en une phrase, choisit un modèle, adapte les questions (ajouter, retirer, reformuler, réordonner), donne un titre à son étude.

**Les 3 modèles, pour des petits entrepreneurs** (à valider avec les interviews) :

| Modèle | Le moment de vie | Ce qu'il cherche |
|---|---|---|
| **Je lance un produit** | Avant lancement | Qui est mon client, quel problème il a, ce qu'il accepte de payer |
| **Je fixe mes prix** | Avant lancement ou après | Combien il est prêt à payer, ce qui le freine |
| **Mes clients sont-ils satisfaits** | Après lancement | Ce qui va, ce qui casse, ce qu'il recommande |

**Ce que ça n'est pas** : un constructeur libre de questionnaires. On ne commence pas par une page blanche avec 20 types de questions, on commence par un modèle.

### F3. Un lien public de réponse

Le point le plus difficile et le plus fragile du produit. Un lien `wa.me` qui s'ouvre sur le téléphone, un formulaire sans compte, un message de remerciement à la fin.

C'est là que se concentrent 4 des 10 défis d'ingénierie : idempotence, atomicité, concurrence, scalabilité.

### F4. Des résultats simples

Comptages, graphiques en barres, liste des réponses en texte libre. Rien d'autre.

**Pas de camembert.** Le camembert est interdit par le guide de sécurité, pas par goût : avec peu de catégories, il est moins lisible que la barre, et Recharts le gère mal en petit format sur mobile.

### F5. Un export CSV sécurisé

Export des réponses brutes. Chaque cellule qui commence par `=`, `+`, `-` ou `@` est neutralisée, sinon la formule s'exécute dans Excel au lieu de s'afficher.

---

## 3. Ce qui est reporté, et pourquoi

| Reporté | Raison |
|---|---|
| Rapport PDF | Coût d'IA ou de génération, format non défini. Le cadrage du 16 le prévoyait, le rapport du 20 l'a retiré. On ne le sait pas encore faire |
| Export Excel | Le CSV fait le travail. Excel est un confort, pas une fonction |
| Abonnements et paiement en ligne | Le paiement mobile money doit passer par un service local à identifier, avec des frais et des exigences. Et on n'a pas encore de client à faire payer |
| Les 4 offres Starter, Pro, Business | Le modèle validé, mais l'implémentation attend d'avoir un utilisateur réel et des prix testés |
| Rôles Administrateur, Support, Analyste | Tu es seul. L'administration se fait dans le tableau de bord Supabase. La gestion des comptes et des suppressions s'y fait aussi |
| Collaboration en équipe | Personne ne collabore sur une étude pour l'instant |
| Panel de répondants | Distribuer à un panel de répondants, c'est un autre produit |
| Intégrations WhatsApp, email, réseaux | Le partage se fait par un simple lien `wa.me`, pas par une intégration |
| Application mobile | Le responsive suffit. Une PWA peut venir plus tard |
| L'IA dans le produit | Le rôle de l'IA se décide après les interviews. C'est ta différenciation potentielle, donc on ne la bricole pas à l'aveugle |
| La page d'attente | Elle est dans le lot, mais c'est du contenu, pas du produit |

**Ce que je ne reporte pas, malgré la tentation** : la gestion des quotas et le rate limiting. Ils sont dans le MVP parce que le lien public est ouvert par nature, donc c'est là que l'abus arrive. Le quota du plan gratuit en particulier, parce que c'est lui qui définit l'offre gratuite.

---

## 4. Ordre de construction

L'ordre n'est pas un choix esthétique. Chaque étape dépend de la précédente, et l'ordre est calé pour que **chaque étape soit testable seule**.

| # | Étape | Contenu | Pourquoi à cette place | Est. |
|---|---|---|---|---|
| 0 | Socle | Vite + TypeScript + Tailwind, structure, `.env`, `.gitignore`, client Supabase | Rien ne marche sans ça | 1 j |
| 1 | Base + RLS | Tables, relations, RLS activée, policies, 3 modèles en seed | La RLS est la protection principale. Elle se pose avant les données, pas après | 2-3 j |
| 2 | Auth | Inscription, connexion, déconnexion, redirection | `auth.uid()` est la base de toutes les policies | 1-1,5 j |
| 3 | Études | Liste, création, modification, suppression, Statut brouillon/publiée/fermée | Le CRUD de base, le reste en dépend | 2 j |
| 4 | Questions | Les 4 types, ajout, retrait, réordonnancement | Le contenu de l'étude | 2-3 j |
| 5 | Publication + lien | Passage en publiée, génération du token, copie du lien, partage WhatsApp | Nécessaire avant de pouvoir tester la collecte | 1-1,5 j |
| 6 | Page de réponse | Route publique, 4 types de questions, idempotence, atomicité, quota, honeypot | **Le cœur du produit.** Le plus long | 3-4 j |
| 7 | Résultats | Comptages, barres, liste des réponses, échappement XSS | La valeur promise | 1,5-2 j |
| 8 | Export CSV | Génération + neutralisation des formules | Court, et vérifiable tout de suite | 0,5-1 j |
| 9 | Tests sécurité | Accès croisé entre 2 comptes, tentative XSS, tentative IDOR, double soumission, spam, quota | Non négociable | 2 j |
| 10 | Déploiement | Vercel, variables d'environnement, en-têtes de sécurité, test sur vrai téléphone | La mise en ligne | 1 j |
| — | Landing page | En parallèle, à n'importe quel moment | Indépendante du reste | 1-2 j |

**Total : 16 à 22 jours de travail effectif**, hors landing page.

### Pourquoi cet ordre et pas un autre

**La RLS avant l'authentification.** C'est contre-intuitif. Mais si tu écris l'interface avant les policies, tu vas coder des requêtes en ayant le sentiment que la base est déjà protégée, et tu découvriras le trou au moment des tests. En posant la RLS d'abord, chaque écriture de code est déjà contrainte par la base, et l'interface n'a plus qu'à respecter ce qui existe.

**Les quotas avec la page de réponse, pas après.** Le quota du plan gratuit est une décision produit, mais son implémentation est une fonction SQL atomique. Je l'écris dans la même migration que la soumission de réponse, sinon tu auras deux chemins de code qui peuvent diverger.

**Les tests sécurité à la fin mais pas trop à la fin.** Ils sont regroupés pour éviter de casser le rythme de construction, mais le test d'accès croisé doit être fait **avant** la première bêta, pas avant le déploiement public.

### Ce que je n'estime pas

Le temps d'apprentissage de la RLS. C'est le concept que tu ne connais pas encore, et c'est celui qui peut faire déborder l'étape 1. Si tu bloques dessus, on passe une session entière à comprendre les policies sur un cas concret, et je te préviens quand c'est le cas.

---

## 5. Les risques et cas limites, fonctionnalité par fonctionnalité

### F1. Auth

| Risque | Traitement |
|---|---|
| Un utilisateur connecté lit les données d'un autre | Impossible par construction : la RLS filtre sur `auth.uid()` |
| Session persistante non invalidée | La déconnexion invalide le token côté serveur |
| Route privée accessible sans session | Garde de route côté client **et** la RLS refuse de toute façon |
| Rate limiting sur le login | Fourni par la plateforme, à vérifier dans sa documentation |

### F2. Études et questions

| Risque | Traitement |
|---|---|
| Un client modifie une étude publiée pendant la collecte | Statut `publiee` en lecture seule pour le propriétaire, modification seulement en `brouillon` |
| Texte libre avec `<script>` stocké | Échappement à l'affichage, jamais à l'insertion. Un stockage brut et un rendu échappé |
| Étude sans nom, étude vide | Validation côté serveur, refus explicite |
| Trop de questions, réponses sur un seul écran | Le lien public affiche une question par écran, sinon le taux de complétion chute |

### F3. Page de réponse, le point critique

| Risque | Traitement |
|---|---|
| Double clic ou réseau lent crée 2 réponses | Clé unique de soumission, la 2e insertion est ignorée |
| Crash au milieu : la réponse existe mais pas les réponses aux questions | Une seule fonction RPC : tout ou rien |
| Deux réponses simultanées dépassent le quota | Compteur atomique en base, jamais un `if quota > 0` en JavaScript |
| Spam et bots | Honeypot, limite par appareil ou adresse, limite de réponses par étude |
| Quelqu'un modifie l'ID de l'étude dans l'URL | UUID, jamais un numéro séquentiel |
| Un répondant enchaîne 500 études | Rate limiting sur la route publique |

### F4. Résultats

| Risque | Traitement |
|---|---|
| XSS via les réponses en texte libre | Échappement systématique à l'affichage + CSP |
| Un répondant injecte une formule dans l'export | Neutralisation à l'export, pas à l'affichage |
| Un graphique qui casse sur 3 réponses ou 300 | Testé sur les deux extrêmes |
### F5. Export

| Risque | Traitement |
|---|---|
| Injection de formule CSV | Préfixe sur toute cellule commençant par `=`, `+`, `-`, `@` |
| Fichier UTF-8 mal lu par Excel en français | BOM UTF-8, séparateur point-virgule (Excel en locale française) |
| Export de 50 000 réponses qui fige l'onglet | Pagination ou export plafonné pour le MVP |

---

## 6. La donnée des répondants : précautions de base

C'est la partie la plus sérieuse du produit, parce que JiaKo ne collecte pas ses propres données. **Tes utilisateurs collectent les réponses de leurs répondants, et toi tu héberges.** Tu es donc responsable de stockage de données de tiers.

### Ce que la loi ivoirienne exige

**Loi n° 2013-450 du 19 juin 2013**, autorité : l'ARTCI. Points qui s'appliquent à JiaKo :

- **Déclaration préalable** auprès de l'ARTCI pour tout traitement de données personnelles. C'est une démarche administrative à faire **avant** la bêta, pas pendant.
- **Information des personnes** : le répondant doit savoir qui collecte, pourquoi, et combien de temps.
- **Finalité** : les réponses collectées pour une étude de satisfaction ne peuvent pas servir à autre chose.
- **Durée de conservation** : elle doit être définie et appliquée. Suppression réelle à l'échéance, pas seulement une intention.
- **Droits des personnes** : accès, rectification, suppression. Concrètement, il faut pouvoir supprimer les réponses d'un répondant qui le demande. Le modèle de données doit donc permettre de retrouver toutes les réponses d'un répondant, ce qui suppose de garder son identité (ou son contact) séparée de ses réponses.
- **Données sensibles** : santé, opinions politiques, religion, convictions. Leur collecte doit être interdite ou avertie.

**Le RGPD** ne s'applique que si des répondants se trouvent dans l'Union européenne. Il s'applique à ce titre, mais ce n'est pas ta référence principale.

**Les transferts hors du pays** : Supabase et Vercel hébergent à l'étranger. C'est encadré par la loi ivoirienne, ce n'est pas interdit, mais ça doit être déclaré.

### Ce que ça implique concrètement dans le MVP

1. **Un texte de consentement sur la page de réponse**, clair, en français, avant la première question. Trois lignes : qui collecte, pourquoi, combien de temps.
2. **Une case à cocher « J'accepte que mes réponses soient utilisées pour cette étude »**, non pré-cochée.
3. **Un avertissement visible** si le questionnaire contient une question sensible, et la recommandation de ne pas en poser.
4. **Un moyen de suppression** : le propriétaire d'une étude peut supprimer une réponse. Et un droit d'accès pour l'utilisateur.
5. **Une durée de conservation affichée** dans les paramètres du compte, avec suppression automatique.
6. **Dans l'export, l'identité du répondant est séparée** de la réponse, ou clairement optionnelle.

### Le point que je veux te faire comprendre

Ton utilisateur, le petit entrepreneur, va présenter JiaKo à **ses** clients. Il va leur dire « répondez à ce questionnaire de mon entreprise ». C'est ton client qui est responsable de l'information de ses répondants, pas toi. **Mais c'est toi qui héberges les données**, et ça veut dire que ta platforme doit être en mesure d'effacer, de tracer, et de prouver ce qu'elle conserve.

C'est pour ça que la minimisation est un critère de sécurité, pas une élégance : **une donnée que tu ne collectes pas, tu n'as pas à la protéger, ni à la déclarer, ni à supprimer.**

---

## 7. Récapitulatif

**Ce qui est fait** : le plan du MVP est posé. 5 indispensables, 11 reportés avec leur raison, un ordre de construction en 11 étapes estimé à 16-22 jours, les risques et cas limites de chaque fonctionnalité, et les précautions légales de base sur les données de répondants.

**Ce que je propose pour la suite** : l'étape 2, le comparatif de stack, qui conditionne tout le reste. Les tarifs Supabase et Vercel sont vérifiés en ligne, et il y a un point important sur le budget que le rapport du 20 octobre avait identifié sans le chiffrer assez précisément.
