# Muhammad Adeel Iqbal — WordPress Developer Portfolio

Premium static portfolio built with Next.js and deployed on GitHub Pages.

## Included improvements

- Clear WordPress developer positioning
- Services, proof, workflow, CV, and contact sections
- Stronger project links and case-study entry points
- Static mailto contact flow for free GitHub Pages hosting
- SEO metadata, robots.txt, sitemap.xml, and JSON-LD profile schema
- GitHub Pages deployment workflow

## Run locally

```bash
npm install
npm run dev
```

## Build static export

```bash
npm run build
```

This project uses `output: 'export'` in `next.config.mjs`, so it can be hosted free on GitHub Pages.

## Contact form note

GitHub Pages cannot run PHP, MySQL, or backend email handlers. The contact form opens a pre-filled email draft. If you later add hosting or a form provider, replace the mailto handler in `app/page.tsx`.
