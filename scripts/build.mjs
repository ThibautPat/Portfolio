import { mkdir, copyFile, cp, readFile, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML IDs');
for (const [, target] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(target)) continue;
  if (target.startsWith('#')) {
    if (!ids.includes(target.slice(1))) throw new Error(`Missing anchor: ${target}`);
  } else await access(path.join(root, target));
}
await mkdir(path.join(root, 'dist'), { recursive: true });
await copyFile(path.join(root, 'index.html'), path.join(root, 'dist/index.html'));
for (const directory of ['assets', 'images']) await cp(path.join(root, directory), path.join(root, 'dist', directory), { recursive: true });
console.log('Static build ready. Local links, anchors and assets verified.');
