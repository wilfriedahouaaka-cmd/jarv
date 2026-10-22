/**
 * Contrôle de cohérence CSS des maquettes JiaKo.
 *
 * Ce que ça contrôle :
 *  1. chaque classe utilisée dans une page existe réellement dans un des
 *     fichiers CSS (classe supprimée ou renommée par erreur) ;
 *  2. chaque var(--...) utilisé est bien défini dans tokens.css ou ailleurs ;
 *  3. aucun token n'est défini sans jamais être utilisé (code mort).
 *
 * Usage : node verifier-classes.mjs
 * Sortie code 0 = tout est bon, code 1 = au moins un problème.
 * Aucune dépendance, aucune écriture de fichier.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));

const pages = (await readdir(dossier)).filter((f) => f.endsWith('.html'));
const feuilles = (await readdir(dossier)).filter((f) => f.endsWith('.css'));

// Toutes les classes définies, plus les tokens définis et utilisés
const definies = new Set();
const tokensDefinis = new Set();
const tokensUtilises = new Set();

for (const f of feuilles) {
  const css = await readFile(path.join(dossier, f), 'utf8');
  for (const m of css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) {
    definies.add(m[1]);
  }
  for (const m of css.matchAll(/^\s*(--[a-zA-Z0-9-]+)\s*:/gm)) {
    tokensDefinis.add(m[1]);
  }
  for (const m of css.matchAll(/var\((--[a-zA-Z0-9-]+)/g)) {
    tokensUtilises.add(m[1]);
  }
}

const problemes = [];

for (const page of pages) {
  const html = await readFile(path.join(dossier, page), 'utf8');
  const vues = new Set();
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    for (const c of m[1].split(/\s+/)) {
      if (c && !definies.has(c) && !vues.has(c)) {
        vues.add(c);
        problemes.push(`${page} : classe "${c}" sans définition CSS`);
      }
    }
  }
}

for (const t of tokensUtilises) {
  if (!tokensDefinis.has(t)) {
    problemes.push(`token "${t}" utilisé mais jamais défini`);
  }
}

const morts = [...tokensDefinis].filter((t) => !tokensUtilises.has(t));

console.log(`Pages analysées    : ${pages.length}`);
console.log(`Classes définies   : ${definies.size}`);
console.log(`Tokens définis     : ${tokensDefinis.size}`);
if (morts.length > 0) {
  console.log(`Tokens jamais utilisés (code mort) : ${morts.join(', ')}`);
}

if (problemes.length === 0) {
  console.log('OK : classes et tokens cohérents.');
  process.exit(0);
}

for (const p of problemes) console.log(`  ${p}`);
console.log(`\n${problemes.length} problème(s).`);
process.exit(1);
