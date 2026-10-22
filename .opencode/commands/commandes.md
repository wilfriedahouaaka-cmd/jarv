---
description: Afficher quelle commande taper
---

# /commandes

> Affiche la table de correspondance : ce que je veux faire, et la commande à taper.

---

## Mission

Quand je tape `/commandes`, affiche-moi la table des commandes disponibles dans ce workspace.

### Étape 1 : Charger la table

Lis `context/COMMANDES.md` en entier. C'est la source de vérité.

### Étape 2 : Afficher

Présente-moi la table, en français, en tutoiement, sous cette forme :

```
Voici tes commandes, Wilfried. Tape / seul pour les voir en autocomplétion.

Tu veux                              → Tape
Démarrer une session, recharger      → /prime
Ma matinée : veille + focus          → /morning
J'ai avancé, ma situation a changé  → /update
Le rapport d'un projet               → /rapport <projet>
Analyser un document                 → /analyse <fichier>
Retrouver les commandes              → /commandes
```

Puis, si un projet est clairement actif d'après `context/CONTEXT.md`, ajoute une ligne :

```
Projet actif en ce moment : <projet>. Tape /rapport <projet> pour le mettre à jour.
```

### Étape 3 : Attendre

Ne lance rien d'autre. Attends ma prochaine instruction.

---

## Règles importantes

- Français, tutoiement, pas de tirets longs
- Reste court : c'est un aide-mémoire, pas un rapport
- Si `context/COMMANDES.md` a été modifié, affiche la nouvelle version
- Ne lance aucune autre commande sans que je la demande
