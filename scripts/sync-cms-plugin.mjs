// Copie les fiches du site (data/realisations.json) dans l'extension WordPress,
// pour que le bouton « Importer les fiches » du CMS crée les mêmes réalisations.
// Usage : npm run cms:sync
import { copyFileSync } from 'node:fs';

const from = new URL('../data/realisations.json', import.meta.url);
const to = new URL('../cms/samatech-realisations/realisations.json', import.meta.url);

copyFileSync(from, to);
console.log('Fiches copiées dans cms/samatech-realisations/realisations.json');
