import { defineConfig } from 'vite';

// Social previews (LinkedIn, WhatsApp) need absolute image URLs.
// On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set at build time (e.g. my-app.vercel.app).
// Set SITE_URL yourself to use a custom domain.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');

export default defineConfig({
  plugins: [
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },
  ],
});
