# skhemka.dev — architect-grade GCP curriculum

Live: **https://skhemka.dev**

A multi-curriculum learning site built by **Sunil Khemka**. The first curriculum is **GCP General Infrastructure** — 19 lessons across 6 phases, written for senior architects at Fortune 500 scale.

Each lesson is a single MDX file under `src/content/lessons/`. Interactive components (clickable diagrams, quizzes, click-through comic strips) live in `src/components/` and drop into any lesson with one import line.

## For Claude / collaborators — read these first

If you're a new contributor (Claude Code session, fresh Claude.ai chat, or a human collaborator), **read these context files in this order before editing anything**:

1. **[CLAUDE.md](./CLAUDE.md)** — Master context. Voice, audience, pedagogy, conventions, common gotchas. Required reading.
2. **[STYLE.md](./STYLE.md)** — Visual design tokens, color palette, panel patterns. Required if creating new components.
3. **[LESSON_TEMPLATE.md](./LESSON_TEMPLATE.md)** — Concrete skeleton with worked example for writing new lessons.
4. **[BUILD.md](./BUILD.md)** — Technical operations, deploy workflow, debugging guide, common bugs.

These files exist so that the curriculum maintains consistent voice, design, and quality across many sessions and many months. Don't skip them.

## Quick start (developers)

```bash
# Install
npm install

# Dev server with hot reload (http://localhost:4321)
npm run dev

# Production build (verify before pushing)
npm run build
```

## Quick start (adding a lesson)

```bash
# 1. Write the lesson MDX
vim src/content/lessons/2-2-firewalls-nat.mdx

# 2. Flip status: 'planned' → 'published' in src/lessons.ts

# 3. Push — auto-deploys in 90 seconds
git add -A
git commit -m "Lesson 2.2 — Firewalls & Cloud NAT"
git push
```

See `BUILD.md` for the full operations guide.

## Stack

- **Astro 4.x** — static site generator
- **MDX** for lesson content
- **Vanilla TypeScript** for widget interactivity (no React, no framework)
- **GitHub Pages** + **Cloudflare DNS** for hosting
- **GitHub Actions** for auto-deploy on push to `main`

## License

Lessons © Sunil Khemka. Code MIT.
