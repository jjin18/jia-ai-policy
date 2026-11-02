import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(resolve(directory, entry.name)) : resolve(directory, entry.name)));
  return files.flat();
}
const files = await walk(root);
const errors = [];
let checked = 0;
for (const file of files.filter(path => path.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  if (!/<html lang="en">/.test(html)) errors.push(`${relative(root, file)}: missing page language`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${relative(root, file)}: missing title`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${relative(root, file)}: duplicate element IDs`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(value)) continue;
    if (file.endsWith('404.html') && value.startsWith('/')) continue;
    checked++;
    if (value.startsWith('/')) { errors.push(`${relative(root, file)}: root-relative URL would break a project Pages site: ${value}`); continue; }
    const [local, fragment] = value.split('#');
    let target = local ? resolve(dirname(file), local) : file;
    try {
      if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
      const content = await readFile(target, 'utf8');
      if (fragment && !content.includes(`id="${fragment}"`)) errors.push(`${relative(root, file)}: missing fragment ${value}`);
    } catch { errors.push(`${relative(root, file)}: broken local link ${value}`); }
  }
}
if (errors.length) { process.stderr.write(errors.join('\n') + '\n'); process.exitCode = 1; }
else process.stdout.write(`Checked ${files.length} site files and ${checked} local references: all passed.\n`);
