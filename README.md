# skhemka.learn

Architect-grade engineering tutorials. Lessons distilled from real Fortune 500 GCP engagements, packaged as a static site with interactive widgets.

Live: `https://skhemka07.github.io/gcp/` (after first deploy)

---

## What's here

A multi-curriculum learning site built with [Astro](https://astro.build). The first curriculum is **GCP General Infrastructure** — 19 lessons across 6 phases.

Each lesson is a single MDX file under `src/content/lessons/`. Interactive components (clickable diagrams, quizzes, decision trees) live in `src/components/` and drop into any lesson with one import line.

## Quick start

```bash
# Install dependencies
npm install

# Run locally on http://localhost:4321
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project structure

```
src/
├── pages/              # Routes
│   ├── index.astro     # Homepage
│   └── gcp/infra/      # GCP infra curriculum
│       ├── index.astro # Curriculum overview
│       └── [...slug].astro  # Dynamic lesson page
├── content/
│   ├── config.ts       # Content collection schema
│   └── lessons/        # 👈 Add new lessons here
├── components/         # 👈 Reusable interactive widgets
├── layouts/            # Page wrappers
├── styles/             # Global CSS
└── lessons.ts          # 👈 Lesson manifest (titles, order, status)
```

## Adding a new lesson

Three steps:

**1. Update `src/lessons.ts`** — find the lesson in the manifest and change `status: 'planned'` to `status: 'published'`. (Or add a new entry.)

**2. Create the MDX file** at `src/content/lessons/<slug>.mdx`:

```mdx
---
title: "Your lesson title"
phase: 2
lesson: "2.1"
curriculum: "infra"
track: "gcp"
description: "One-sentence summary for SEO and curriculum index."
analogy: "City planning"
publishedAt: 2026-05-15
---

import SomeWidget from '../../components/SomeWidget.astro';

Your lesson content here. Markdown works. <SomeWidget /> drops in.
```

**3. (Optional) Build a custom widget.** Copy `src/components/IAMWidget.astro` as a template — it shows the pattern: SVG diagram + clickable elements + a quiz with feedback.

Commit and push. The GitHub Action builds and deploys automatically.

## Deploying to GitHub Pages

One-time setup:

1. Create a public repo on GitHub. Push this code to the `main` branch.
2. In repo Settings → Pages, set Source to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` runs on every push to `main`.

If the repo isn't named `gcp`, update `base` and `site` in `astro.config.mjs`:

```js
// For repo named "learn" on user "skhemka07":
site: 'https://skhemka07.github.io',
base: '/learn',

// For a custom domain like "skhemka.dev":
site: 'https://skhemka.dev',
// (remove the `base` line entirely)
```

## Custom domain (optional)

1. Buy a domain (Namecheap, Cloudflare Registrar, Google Domains).
2. In GitHub → repo Settings → Pages → Custom domain, enter your domain.
3. Add a CNAME record at your DNS provider pointing to `skhemka07.github.io`.
4. Update `astro.config.mjs` as shown above.

## Design notes

- The visual style matches claude.ai aesthetics — flat, generous whitespace, dark mode aware.
- Color ramps for diagrams come from a 9-ramp palette (blue, teal, amber, purple, coral, pink, gray, green, red). Each ramp has 7 stops from lightest fill to darkest text.
- Interactive widgets are vanilla TypeScript — no React, no framework. They work even if JavaScript is disabled (the SVG renders, just without click handlers).
- Lessons are designed to take ~15 minutes each. Quizzes use feedback loops that explain *why* wrong answers are wrong, not just whether they're wrong.

## License

Lessons © Sunil Khemka. Code MIT.
