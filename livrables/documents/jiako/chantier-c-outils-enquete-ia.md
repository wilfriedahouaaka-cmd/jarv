# Chantier C : les outils d'enquête assistés par IA

> Recherche demandée par le rapport du 20 octobre, qualifiée de « plus urgent et plus négligé ».
> Recherche effectuée le **22 octobre 2026**, sources : pages officielles des éditeurs et comparatifs indépendants.
> Principe : je note pour chacun **ce qu'il fait, son prix, ce qu'il ne fait pas**. Les prix bougent vite, ils sont datés.
> Fichier : `livrables/documents/jiako/chantier-c-outils-enquete-ia.md`

---

## 1. La réponse courte à la question du rapport

> « Si un acteur international fait déjà le guidage IA gratuitement, il faut le savoir maintenant. »

**Oui, il en existe, et plusieurs.** La réponse est sans ambiguïté :

- **Tally AI** génère un formulaire complet à partir d'une description en langage naturel, **gratuit sur tous les plans, y compris le plan gratuit, sans limite d'usage IA**.
- **Jotform** génère des enquêtes par prompt ou par fichier, gratuit jusqu'à 5 formulaires et 100 soumissions/mois.
- **SurveyMonkey** génère des enquêtes et détecte les biais, gratuit avec plafond (10 questions, 25 réponses par enquête).
- **Google Forms + Gemini** génère des formulaires, mais **l'IA exige un plan Workspace ou Google AI payant**.

**Conséquence directe pour JiaKo : « un outil qui écrit ton questionnaire avec l'IA » n'est plus une différence.** C'est un ticket d'entrée que tout le monde a déjà. Si la promesse de JiaKo s'arrête là, elle est morte avant d'être construite.

---

## 2. Les générateurs de questionnaires (ce que JiaKo ferait aussi)

| Outil | Ce qu'il fait | Prix (vérifié oct. 2026) | Ce qu'il ne fait **pas** |
|---|---|---|---|
| **Tally AI** | Formulaire complet depuis un prompt : questions, logique, formules, types de champs. Édition par conversation (⌘+J). Recrée un formulaire depuis une capture ou un PDF. Débogue la logique cassée. Fonctionne en toutes langues | **Gratuit, tout compris** (fair use ~50 000 saisies/mois). Pro 29 $/mois, Business 89 $/mois | Ne publie ni ne partage pas le formulaire. **Ne lit ni n'exporte pas les réponses.** Aucune analyse de fond |
| **Jotform AI** | Génération par prompt, PDF ou URL. Report Builder (graphiques), Jotform Tables, AI Data Assistant (questions en langage naturel sur les données), 150+ intégrations | Gratuit : 5 formulaires, 100 saisies/mois. Payant dès **34 $/mois** (annuel) | Pas de statistiques avancées. Modère sur le volume, pas sur la méthode |
| **SurveyMonkey AI** | Génération depuis un objectif, conseils de formulation et **détection des biais**, analyse de texte (thématiques, sentiment), 400+ modèles, panel rémunéré à 0,15 $/réponse | Gratuit : 10 questions, 25 réponses. Payant : **39 $/mois** individuel (annuel), équipes 30 $/user/mois avec 3 users minimum. **Abonnement annuel obligatoire depuis sept. 2026**, dépassement facturé 0,15 $/réponse | Analyse de texte « fine ». Pas de personnalisation poussée. Trustpilot 2,7 sur les pratiques commerciales (auto-renouvellement) |
| **Typeform** | Formulaires conversationnels, meilleure expérience répondant du lot, génération IA depuis un prompt | Gratuit : 10 réponses/mois. Payant dès **28 $/mois** (annuel) | **Presque aucune analyse de texte.** Outil de collecte, pas d'analyse |
| **Google Forms + Gemini** | Génération depuis un prompt ou un fichier Drive, suggestions de questions, résumés de réponses en texte libre (3 à 200 réponses) | Formulaire **gratuit, illimité**. **IA : plan payant uniquement** (Workspace Business ou Google AI). Sans IA, add-on tiers « AI Form Builder » | Pas de multi-sections, **aucune logique conditionnelle générée**, création sur desktop seulement |
| **Fillout** | Génération IA, import PDF, style Notion | Gratuit : 1 000 réponses/mois, **10 messages IA/jour** (plafond rapide) | Plafond IA journalier |
| **Paperform** | Formulaires documentaires, calculs | Gratuit limité, payant dès 24 $/mois | AI Calculations et AI Insights **réservés aux plans payants** |

**Lecture rapide** : côté génération, Tally a gagné la guerre des prix en rendant l'IA gratuite et illimitée. Côté analyse, tout se paie (Jotform 34 $/mois, SurveyMonkey 39 $/mois et plus, BlockSurvey 49 $/mois, Qualtrics sur devis).

---

## 3. L'analyse et le rapport (la vraie valeur de JiaKo)

| Outil | Analyse des textes ouverts | Rapport | Prix |
|---|---|---|---|
| **Jotform** | AI Data Assistant, requêtes en langage naturel | Report Builder inclus | Gratuit basique, payant dès 34 $/mois |
| **SurveyMonkey** | Thématiques, sentiment, résumés IA | Tableaux de bord standard | Payant dès 39 $/mois (les bons outils planqués plus haut) |
| **BlockSurvey** | Analyse thématique + sentiment **complets**, import CSV d'autres outils, chiffrement de bout en bout | Exportable | **49 $/mois**, pas de plan gratuit selon la page tarifs |
| **SurveySparrow** | CogniVue : sentiment, sujets, suivi | Oui | Dès 19 $/mois |
| **Survicate** | Sentiment, sujets | Tableaux de bord | Dès 49-53 $/mois |
| **Qualtrics** | Text iQ, le plus profumé du marché | Entreprise, très poussé | Devis, réservé aux grandes organisations |
| **Typeform** | Quasi rien sur l'analyse | Basique | Dès 25-28 $/mois |

**Ce que ça dit** : l'analyse sérieuse des réponses coûte **entre 19 et 55 $/mois**, soit **11 000 à 32 000 FCFA/mois**. Personne ne vend ça à un petit entrepreneur ivoirien pour une étude ponctuelle. C'est précisément la zone que JiaKo peut occuper : **le rapport, au forfait, en FCFA, pas en abonnement.**

---

## 4. La menace locale : la recherche d'enquête sur WhatsApp en Afrique

C'est la découverte la plus importante de cette recherche. **Trois acteurs attaquent déjà le terrain africain, et deux font exactement ce que JiaKo promet.**

| Outil | Ce qu'il fait | Pour qui | Prix |
|---|---|---|---|
| **Yazi** (askyazi.com) | Enquêtes, **interviews IA modérées** et diaries **nativement dans WhatsApp**. Réponses par note vocale dans la langue du répondant. Panel de 1,8 million de personnes, 25+ pays dont Nigeria, Afrique du Sud, Kenya, Ghana. L'IA transcrit, regroupe par thèmes et **écrit le rapport en PDF ou PowerPoint en 24 h**. Taux de complétion 70-90 % | Agences et grandes entreprises (Delta, cas Yoco avec 200 PME) | **Sur devis**, pas de tarif public. Positionnement haut de gamme |
| **Surveyr** (surveyr.africa) | Enquêtes, quiz et sondages **sur WhatsApp**. L'IA rédige à partir d'une description ou d'un document, puis **relance, note et détecte les thèmes** à mesure que les réponses arrivent. Tableaux de bord en direct | Organisations africaines, écoles, ONG | Non publié |
| **Wyza** (wyza.ai) | Tests de concept, trackers de marque, **interviews IA** en texte, voix ou vidéo (pidgin, swahili, yoruba, haoussa...), 40+ langues, **rapport livré en 48 h** | Marques et agences, 12+ pays africains | Devis, panel inclus |
| **Tada** | Collecte terrain dans l'économie informelle africaine, questionnaires générés par IA, tableau de bord temps réel, export PPT/XLS/CSV | Décideurs et entrepreneurs solo | Formules par paliers, formule d'essai gratuite |
| **mooyi** (Nigeria) | Panel consommateur africain, enquêtes auto-portées avec rédaction IA, exports méthodologisés. **Boucle de feedback gratuite** via QR + digest WhatsApp quotidien | Marques, agences | Panel : 200k-300k ₦/mois. Feedback : gratuit |
| **GeoPoll, SurveyCTO, KoboToolbox** | Enquêtes par téléphone/SMS ou terrain professionnel | Chercheurs, ONG, monde de l'aide | SurveyCTO dès 225 $/mois |

**Pourquoi c'est grave** : Yazi fait déjà « WhatsApp + IA + rapport clair », avec un panel, et il est payé par des entreprises comme Yoco. Surveyr le fait aussi, en plus accessible. Ce n'est plus une promesse, c'est un marché en train d'être pris.

**Pourquoi ce n'est pas fatal non plus** :
1. **Ils sont chers et en devis.** Ils vendent à des agences et des marques, pas à un entrepreneur d'Abidjan qui veut valider un prix à 15 000 FCFA.
2. **Ils vendent du panel** (les répondants). JiaKo, dans sa version actuelle, **ne fournit pas de panel** : le propriétaire partage son propre lien. Ce n'est pas le même produit.
3. **Aucun ne prend le mobile money au détail**, aucun n'est pensé pour un forfait à quelques milliers de FCFA.
4. Ils n'ont pas la **guidance de début à fin pour non-initiés** : eux instrumentent la recherche, JiaKo promet de guider quelqu'un qui n'a jamais fait d'étude.

---

## 5. Ce que je retiens pour JiaKo

### Ce qui ne marche plus comme promesse

- « Notre IA écrit ton questionnaire » → **Tally le fait gratuitement**, Jotform et SurveyMonkey aussi. Zéro valeur différenciante.
- « Un outil d'enquête » en soi → le marché est saturé d'outils gratuits.

### Ce qui reste défendable, à vérifier par les interviews

1. **Le rapport clair**, pas la génération. Générer est gratuit, **conclure coûte cher** (11 000 à 32 000 FCFA/mois chez les concurrents). Si JiaKo livre un rapport compréhensible au forfait, il est sur un terrain que personne n'occupe à ce prix.
2. **Le prix et le paiement** : forfait en FCFA, mobile money, pas d'abonnement annuel en dollars (SurveyMonkey impose l'annuel depuis septembre 2026, ça joue contre lui côté confiance).
3. **L'accompagnement du non-initié** : les concurrents donnent un outil à quelqu'un qui sait ce qu'il cherche. JiaKo promet à quelqu'un qui ne sait même pas quelles questions poser. **C'est là que se joue la différence, et c'est exactement ce que les interviews doivent confirmer.**
4. **Le pilote manuel (phase 2) est conforté** : Tally (gratuit, illimité) est l'outil qu'il faut utiliser pour servir les 3 à 5 premiers clients sans écrire une ligne de code.

### Ce qui doit faire peur, et qu'on ne résoudra pas par du code

Yazi, Surveyr et Wyza prouvent que **la recherche guidée par IA sur WhatsApp existe déjà en Afrique**. Si leur positionnement descend vers le petit entrepreneur, JiaKo perd son angle. Deux questions à poser **pendant les interviews** :

- « Tu fais tes enquêtes comment aujourd'hui ? Tu connais Yazi / Surveyr ? » (si la réponse est oui, la menace est réelle)
- « Si une entreprise te faisait ça pour 30 000 FCFA, tu paierais, ou tu préfères un logiciel à 5 000 ? » (mesure le réflexe "je paie quelqu'un" contre "je paie un outil")

---

## 6. Limites de cette recherche

- **Les prix changent souvent** : ils datent d'octobre 2026 et viennent des pages éditeurs ou de comparatifs tiers. À revérifier avant tout achat.
- **Certains comparatifs sont écrits par les éditeurs eux-mêmes** (le « top 5 » de Jotform, les classements BlockSurvey) : ils classent toujours leur produit premier. J'ai retenu les faits vérifiables (prix, plafonds, fonctionnalités), pas les verdicts.
- **Les tarifs de Yazi, Surveyr, Wyza et Tada ne sont pas publics** : ils sont sur devis, donc potentiellement très au-dessus de la cible JiaKo, mais je ne l'affirme pas comme un fait. **À confirmer en leur demandant un devis, ou en lisant leurs pages tarifs si elles en ont.**
- **Je n'ai pas testé ces outils**, je n'ai lu que leur documentation publique.

---

## 7. Prochaine étape sur ce chantier

Le chantier C est **couvert en tant que veille**. Ce qui reste à faire, et qui demande toi :

1. **Ouvrir Tally, Jotform et SurveyMonkey** et générer un vrai questionnaire en 10 minutes pour voir la qualité réelle du guidage. Un tableau de 3 lignes suffit : ce que ça a produit, ce qui manquait, est-ce que tu l'aurais utilisé.
2. **Reporter ce que tu constates** dans `suivi-interviews.csv`, colonne `Notes`, quand un interviewé mentionne un de ces outils.
3. **Garder la question Yazi/Surveyr pour les interviews** : c'est le seul endroit où tu peux mesurer si la menace locale existe vraiment.
