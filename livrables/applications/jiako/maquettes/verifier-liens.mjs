/**
 * Vérifie la navigation des maquettes JiaKo.
 *
 * Ce que ça contrôle :
 *  1. chaque href local pointe vers un fichier qui existe dans le dossier ;
 *  2. chaque ancre (#id) existe réellement dans la page visée ;
 *  3. chaque page du parcours contient au moins un lien vers index.html
 *     (règle : aucun écran n'est une impasse).
 *
 * `index.html` EST la page d'accueil du site. La galerie (`galerie.html`)
 * est un outil de travail, volontairement hors navigation : elle n'est
 * listée ni dans les pieds de page, ni dans la règle des impasses.
 *
 * Usage : node verifier-liens.mjs
 * Sortie code 0 = tout est bon, code 1 = au moins un problème.
 * Aucune dépendance, aucune écriture de fichier.
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));

// Les pages qui doivent pouvoir renvoyer à l'accueil. Ça concerne aussi 03 :
// le répondant anonyme n'a pas la navigation de l'application, mais il doit
// pouvoir remonter vers JiaKo (c'est le pied `.pied-publique`).
const pagesDuParcours = [
  '01-etudes.html',
  '01b-etudes-vide.html',
  '02-editeur.html',
  '03-reponse-mobile.html',
  '04-resultats.html',
  '05-confidentialite.html',
  '06-contact.html',
  '07-etats.html',
  'index.html',
];

// Hors navigation assumée : la galerie n'est liée par aucune page, et c'est
// voulu. On l'exclut du contrôle des pages orphelines.
const horsNavigation = ['galerie.html'];

const fichiers = (await readdir(dossier)).filter((f) => f.endsWith('.html'));

// Index des ids et des liens, une passe par fichier
const ids = new Map();
const liens = new Map();

for (const f of fichiers) {
  const html = await readFile(path.join(dossier, f), 'utf8');
  ids.set(
    f,
    new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  );
  liens.set(
    f,
    [...html.matchAll(/\shref="([^"]+)"/g)].map((m) => m[1]),
  );
}

const problemes = [];
let totalLiens = 0;

for (const [source, hrefs] of liens) {
  // Contrôle 3 : retour à l'accueil possible
  if (pagesDuParcours.includes(source)) {
    const versAccueil = hrefs.some(
      (h) => h === 'index.html' || h.startsWith('index.html#'),
    );
    if (!versAccueil) {
      problemes.push(`${source} : aucun lien vers index.html (impasse)`);
    }
  }

  for (const href of hrefs) {
    totalLiens++;

    // Liens externes : vérifiés à la main, hors périmètre du script
    if (/^(https?:|mailto:|tel:|javascript:)/.test(href)) continue;

    const [fichierCible, ancre] = href.split('#');

    // Ancre locale : href="#carte"
    if (!fichierCible) {
      if (ancre && !ids.get(source)?.has(ancre)) {
        problemes.push(`${source} : ancre #${ancre} introuvable dans cette page`);
      }
      continue;
    }

    // Contrôle 1 : le fichier existe
    if (!existsSync(path.join(dossier, fichierCible))) {
      problemes.push(`${source} → ${fichierCible} : fichier introuvable`);
      continue;
    }

    // Contrôle 2 : l'ancre existe dans la page cible
    if (ancre && fichierCible.endsWith('.html')) {
      const cible = ids.get(fichierCible);
      if (cible && !cible.has(ancre)) {
        problemes.push(`${source} → ${fichierCible}#${ancre} : id introuvable`);
      }
    }
  }
}

// Pages orphelines : un fichier HTML que personne ne lie
const toutesCibles = new Set();
for (const hrefs of liens.values()) {
  for (const href of hrefs) {
    const cible = href.split('#')[0];
    if (cible.endsWith('.html')) toutesCibles.add(cible);
  }
}
for (const f of fichiers) {
  if (horsNavigation.includes(f)) continue;
  if (!toutesCibles.has(f)) {
    problemes.push(`${f} : aucune page ne pointe vers ce fichier (orphelin)`);
  }
}

console.log(`Pages analysées : ${fichiers.length}`);
console.log(`Liens analysés  : ${totalLiens}`);

if (problemes.length === 0) {
  console.log('OK : navigation complète, aucune impasse, aucune cible manquante.');
  process.exit(0);
}

console.log(`\n${problemes.length} problème(s) :`);
for (const p of problemes) console.log(`  ✗ ${p}`);
process.exit(1);
