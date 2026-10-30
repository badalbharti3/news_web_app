// GitHub Pages has no SPA rewrite rules: it serves 404.html for unknown paths.
// Copying index.html to 404.html lets React Router handle deep links such as
// /news_web_app/signin. Harmless on Netlify, which uses public/_redirects.
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const index = resolve(dist, 'index.html');

if (!existsSync(index)) {
  console.error('dist/index.html not found - run `vite build` first.');
  process.exit(1);
}

copyFileSync(index, resolve(dist, '404.html'));
console.log('Created dist/404.html for GitHub Pages deep links.');
