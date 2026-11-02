import { readFile, writeFile } from 'node:fs/promises';

// GitHub's configure-pages action supplies the deployed repository base path.
// Only the 404 page needs an absolute home link, since it can appear at any URL.
const base = process.env.PAGES_BASE_PATH || '';
if (!/^[A-Za-z0-9_/%.~-]*$/.test(base) || (base && !base.startsWith('/'))) {
  throw new Error('Unexpected GitHub Pages base path');
}
const home = base.replace(/\/+$/, '') + '/';
const file = new URL('../dist/404.html', import.meta.url);
const source = await readFile(file, 'utf8');
if (!source.includes('id="home-link"')) throw new Error('404 page home link not found');
await writeFile(file, source.replace(/id="home-link" href="[^"]*"/, `id="home-link" href="${home}"`));
process.stdout.write(`404 page home link configured for ${home}\n`);
