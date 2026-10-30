import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path is host specific:
//   Netlify / local dev -> '/' (default)
//   GitHub Pages        -> BASE_PATH=/news_web_app/ (set in .github/workflows/deploy.yml)
// React Router picks the same value up via import.meta.env.BASE_URL.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
});
