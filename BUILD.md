# BUILD.md

Technical operations for the skhemka.dev curriculum site.

## Stack

- **Astro 4.x** — static site generator
- **MDX** for lesson content
- **Vanilla TypeScript** for widget interactivity (no React, no framework)
- **GitHub Pages** for hosting
- **Cloudflare DNS** in front (DNS only, not proxied)
- **GitHub Actions** for auto-deploy on push to `main`

## Local development

```bash
# One-time setup
npm install

# Dev server with hot reload
npm run dev
# Opens at http://localhost:4321

# Build for production (verify before pushing)
npm run build

# Preview the production build locally
npm run preview
```

The dev server reflects most file changes instantly. CSS and component changes are live; MDX changes hot-reload; manifest (`lessons.ts`) changes need a server restart.

## The 3-step deploy loop

This is the entire workflow for adding a new lesson.

```bash
# 1. Create the lesson MDX
vim src/content/lessons/2-2-firewalls-nat.mdx

# 2. Flip status: 'planned' → 'published' in src/lessons.ts
#    Find the entry with slug '2-2-firewalls-nat'

# 3. Push
git add -A
git commit -m "Lesson 2.2 — Firewalls & Cloud NAT"
git push
```

GitHub Actions kicks off. ~90 seconds later the lesson is live at
`https://skhemka.dev/gcp/infra/2-2-firewalls-nat/`.

## Adding a new component

Components live in `src/components/`. To add a new widget:

```bash
# Create the file
touch src/components/FirewallBuilder.astro
```

Use this skeleton — paying attention to `<style is:global>`:

```astro
---
// Brief description of what this widget does
---

<div class="fw-widget" data-fw-widget>
  <!-- HTML / SVG goes here -->
  <div class="fw-detail-panel" data-fw-panel>
    <p class="fw-prompt">→ Click something to see details</p>
  </div>
</div>

<script>
  document.querySelectorAll<HTMLDivElement>('[data-fw-widget]').forEach((root) => {
    // Vanilla TypeScript — Astro auto-bundles this
    const panel = root.querySelector<HTMLDivElement>('[data-fw-panel]')!;
    // ... event handlers ...
  });
</script>

<style is:global>
  /* CRITICAL: is:global is required for any widget that uses JS to inject HTML.
     Without it, Astro auto-scopes the styles, and JS-injected elements don't
     get the scope attribute, so styles never apply. This bug burned a full day
     of debugging. */

  .fw-widget { margin: 2rem 0; }
  .fw-detail-panel {
    background: #2c2a26;          /* dark slate — see STYLE.md */
    border: 1px solid #4a4a48;
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    color: #f0eee6;
  }
  /* ... more styles, all using widget-prefix classnames ... */
</style>
```

Then import it in your lesson MDX:

```jsx
import FirewallBuilder from '../../components/FirewallBuilder.astro';
```

And use it:

```jsx
<FirewallBuilder />
```

That's it. No registration, no manifest, no config. Just create the file and import.

### Naming conventions for components

- File: `PascalCase.astro` — `FirewallBuilder.astro`
- Class prefix: `lowercase short` — use a 2-3 letter prefix derived from the widget name (`fw-` for FirewallBuilder, `vpc-` for VPCDiagram, etc.)
- Data attributes: `data-<prefix>-<purpose>` — `data-fw-widget`, `data-fw-panel`
- Avoid generic class names like `.widget` or `.panel` — they'll collide

## Manifest — `src/lessons.ts`

This is the source of truth for what shows on the curriculum page. Every lesson has an entry like:

```typescript
{
  lesson: '2.2',
  slug: '2-2-firewalls-nat',
  title: 'Firewalls & Cloud NAT',
  phase: 2,
  phaseTitle: 'Roads & traffic cops',
  description: 'Toll booths and one-way mirrors — what gets in, and how private servers reach the internet.',
  analogy: 'The toll booth and one-way mirror',
  status: 'planned',  // ← change to 'published' when the MDX exists
},
```

Status values:
- `'planned'` — lesson appears greyed out on curriculum page (visible but not clickable)
- `'published'` — lesson is live and clickable

The matching MDX file must exist at `src/content/lessons/<slug>.mdx` for `'published'` to actually work — otherwise the build will fail.

### Adding a brand new lesson to the manifest

If you're adding a lesson that isn't already in the manifest, add a new entry in the right phase position. The order in the manifest determines the order on the curriculum page.

### Phase metadata

Phases 1-6 with their titles:
1. **Blueprint & bouncers** — Resource hierarchy, IAM, Org policies
2. **Roads & traffic cops** — VPCs, firewalls, load balancing, PSC
3. **The workhorses** — Compute Engine, GKE, Cloud Run, choosing compute
4. **Vaults & filing cabinets** — Storage, SQL/Spanner, Bigtable/Firestore, BigQuery
5. **Security cameras** — Logging, Security Command Center, KMS/Secrets
6. **The magic wand** — Terraform, IaC pipelines

## Verifying a deploy worked

Browser caching will lie to you. Always verify with curl, then test in incognito.

```bash
# Did the new keyword make it to the live site?
curl -s https://skhemka.dev/gcp/infra/<slug>/ | grep -c "<keyword-from-your-change>"

# Should return ≥ 1 if your fix is live.
# If it returns 0, the deploy hasn't picked up your change yet, OR the build
# failed. Check the Actions tab.

# What JS file is the page loading?
curl -s https://skhemka.dev/gcp/infra/<slug>/ | grep -oE "<WidgetName>[^\"' ]*\.js" | head -1
```

Then open the URL in a fresh incognito window (`Cmd+Shift+N`). If you don't, your regular browser will show you cached old content and you'll waste an hour debugging a non-bug.

## Common bugs and their fixes

### Bug: "I clicked a thing in the widget and the text is unreadable"

**Cause:** The widget's `<style>` block isn't `<style is:global>`. Astro is scoping the CSS rules to elements that exist at build time, but your JS is injecting new elements at runtime that don't match the scoped selector.

**Fix:** Change `<style>` to `<style is:global>` in the widget. Push.

### Bug: "I pushed but nothing changed on the live site"

Run through this checklist:

```bash
# 1. Did the commit actually have changes?
git log --oneline -3
git show HEAD --stat   # must show files changed, not just a commit message

# 2. Did the push actually land?
git status   # must say "Your branch is up to date with 'origin/main'"

# 3. Did the Action run succeed?
# Visit https://github.com/skhemka07/skhemka-dev/actions
# Most recent run for HEAD commit should be green

# 4. Did the new code make it into the deployed HTML?
curl -s https://skhemka.dev/gcp/infra/<slug>/ | grep -c "<some-keyword>"

# 5. Is your browser caching?
# Open in incognito (Cmd+Shift+N)
```

### Bug: "Empty commit somehow"

Cause: `cp -r somefolder/* somewhere/` ran from the wrong directory and silently failed. Then `git add -A && git commit -m "fix"` happily made an empty commit because there were no actual file changes.

Fix: Always run `git diff --cached --stat` between `git add` and `git commit`. If it shows nothing, the files didn't change. Investigate before committing.

### Bug: "GitHub PAT push rejected"

Error: `refusing to allow a Personal Access Token to create or update workflow .github/workflows/deploy.yml without 'workflow' scope`

Fix: The PAT needs both `repo` AND `workflow` scopes. Either edit the existing token at https://github.com/settings/tokens to add `workflow`, or generate a new one with both scopes.

### Bug: ".dev domain says 'not secure' even after SSL setup"

Cause: `.dev` TLDs are HSTS-preloaded by Chrome — every `.dev` domain MUST be served over HTTPS. If GitHub Pages hasn't finished issuing the Let's Encrypt cert yet, `https://` doesn't work and Chrome refuses to fall back to `http://`. The site looks broken.

Fix: Wait. SSL provisioning takes 10-30 minutes after DNS resolves correctly. Then check "Enforce HTTPS" in GitHub Settings → Pages.

### Bug: "DNS check unsuccessful in GitHub Pages"

Cause: GitHub checked DNS at one moment in time. If you saved the custom domain field before DNS records propagated, the check ran too early and is stuck.

Fix: In Settings → Pages, Remove the custom domain, wait 60 seconds, re-add it. Forces a re-check.

### Bug: "Build fails locally"

Common causes:
- Missing import in MDX file (you used a component but forgot to `import` it)
- Lesson manifest entry says `published` but the MDX file doesn't exist
- Syntax error in component (TypeScript will tell you in the build output)

Run `npm run build` and read the full error. Astro errors are usually clear about which file and line.

## DNS configuration (for reference)

The site is on Cloudflare DNS pointing to GitHub Pages. The 5 records:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `skhemka07.github.io` | DNS only |

Do not proxy these (orange cloud) until you have a specific reason. Proxying interferes with GitHub's SSL cert issuance.

## When passing a fix between Claude and the user

If you (Claude) need to give Sunil a multi-file fix to apply to his local machine, the most reliable pattern is a **single self-contained shell script with files embedded as base64**. This pattern survived multiple "the fix didn't apply" debugging sessions:

```bash
# Generate base64 of each file
base64 -w0 src/components/Widget.astro > widget.b64

# In the apply script, use Python to decode and write:
python3 -c "
import base64
with open('$PROJECT_DIR/src/components/Widget.astro', 'wb') as f:
    f.write(base64.b64decode('<base64-content-here>'))
"
```

Don't use `cp -r` from a separately-unzipped folder. It silently fails when the cwd is wrong.

The script must:
1. Find the project folder (look for `astro.config.mjs`)
2. Write all files using Python decode
3. Verify each file landed (check size, grep for new keyword)
4. Show `git diff --cached --stat` before committing
5. Refuse to commit if 0 files changed (`if [ "$CHANGES" -lt 1 ]; then exit 1; fi`)
6. Tell user the exact `curl` command to verify deploy after 90s

## Repository structure reference

```
skhemka07-learn/
├── CLAUDE.md                    ← read first
├── STYLE.md                     ← visual design tokens
├── LESSON_TEMPLATE.md           ← how to write a lesson
├── BUILD.md                     ← this file (technical ops)
├── README.md                    ← public project description
├── package.json
├── astro.config.mjs             ← site URL config
├── tsconfig.json
├── public/
│   ├── CNAME                    ← skhemka.dev
│   └── favicon.svg
├── src/
│   ├── lessons.ts               ← lesson manifest (source of truth)
│   ├── env.d.ts
│   ├── content/
│   │   ├── config.ts            ← collection schema
│   │   └── lessons/
│   │       ├── 1-1-resource-hierarchy.mdx
│   │       ├── 1-2-iam.mdx
│   │       ├── 1-3-org-policies.mdx
│   │       └── 2-1-vpc-subnets.mdx
│   ├── components/
│   │   ├── Clanky.astro
│   │   ├── StickyNote.astro
│   │   ├── ResourceHierarchy.astro
│   │   ├── IAMWidget.astro
│   │   ├── OrgPoliciesWidget.astro
│   │   ├── VPCDiagram.astro
│   │   └── PacketJourney.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── LessonLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── gcp/
│   │       ├── index.astro      (redirects to /gcp/infra/)
│   │       └── infra/
│   │           ├── index.astro  (curriculum hub)
│   │           └── [...slug].astro  (dynamic lesson page)
│   └── styles/
│       └── global.css           ← design tokens, base typography
└── .github/
    └── workflows/
        └── deploy.yml           ← auto-deploys on push to main
```
