# CLAUDE.md

> **Read this first.** Anyone (Claude Code, Claude.ai, or a human collaborator) opening this repo should read this file before doing anything else.

## What this is

This is **skhemka.dev** — an architect-grade GCP learning curriculum by Sunil Khemka. Live at https://skhemka.dev. The first curriculum is **GCP General Infrastructure** (`/gcp/infra/`), 19 lessons across 6 phases.

Each lesson teaches one foundational GCP concept the way a senior architect actually thinks about it — with interactive diagrams, click-through quizzes, and a robot character named **Clanky** asking the questions readers were about to ask.

## Who this is for

The reader is a **senior architect or engineering manager at a Fortune 500-scale company** — think Wells Fargo, PayPal, Amex, Persistent. They:

- Already know "what GCP is" — don't waste time on intro material
- Care about audit conversations, regulatory compliance, defense in depth
- Have probably worked in AWS first — call out GCP differences explicitly
- Are evaluating Sunil for credibility (IEEE Senior Member, UN AI governance contributor)

This is **not** for entry-level cloud learners. We assume the reader has shipped production systems before.

## Voice — read 10 examples before writing one line

Sunil's voice is **direct, slightly punchy, uses specific characters in specific scenarios.** He never hedges with academic phrasing. Concrete details beat abstract principles.

### Examples — what we WRITE

✅ "If the **CEO** of the company logs in with `roles/resourcemanager.organizationAdmin` and tries to build a server in Tokyo, the org policy will physically block them."

✅ "You cannot rely on every developer to perfectly remember this — at 11pm, on their fifth deploy of the day, when the on-call rotation flipped two hours ago. One mistake and you're in front of a regulator."

✅ "This is where you drop the hammer with an org policy."

✅ "Without a VPC, you don't have infrastructure — you have a pile of disconnected boxes."

### Examples — what we DON'T WRITE

❌ "Even users with high-level permissions cannot violate organization-level policy constraints."

❌ "It is important to consider the implications of granting broad permissions to engineers."

❌ "Organization policies are a recommended best practice for governance."

❌ "Cloud networking provides isolation for your resources."

The first set has a person doing a thing in a scenario with stakes. The second set is corporate documentation prose. **Always pick the first style.**

## Pedagogy — the three layers of every lesson

Every lesson hits the same concept from three angles. This redundancy is the whole point — it's how things stick.

**Layer 1: Story / scenario** — open with a concrete person facing a concrete problem.

**Layer 2: Interactive widget** — a clickable diagram or simulator that lets the reader poke at it and see consequences.

**Layer 3: Architect's depth** — the audit conversations, the production patterns, the AWS comparisons, the org-wide implications.

A lesson that has all three works. A lesson missing any one feels off.

## Clanky — the robot sidekick

Clanky is from Sunil's Head First-style book (he's writing it separately). He appears in lessons as a `<Clanky question="..." />` component — a confused robot asking the question the reader was about to ask.

### When to use Clanky (rules, not suggestions)

✅ At a moment where readers naturally get confused — Clanky asks, you answer

✅ To address a common misconception head-on — Clanky voices the misconception, you correct

✅ To make a question feel safe to ask — "Wait, isn't this the same as..." legitimizes the question

### When NOT to use Clanky

❌ For decoration / personality without pedagogical purpose

❌ More than ~3 times per lesson (he becomes noise)

❌ To explain things — Clanky asks; the architect explains

❌ For entry-level "what is cloud?" questions — Clanky is for moments of architect-tier confusion

### Clanky voice

He's curious, slightly self-deprecating, and surfaces real beginner-architect concerns. Examples:

✅ "Wait — why do I even need this? Can't my VMs just... talk to each other?"

✅ "Hold on. My subnet is in us-central1, but the VPC is global. What does 'global' even mean here?"

✅ "Auto mode sounds easier — it's auto! Why wouldn't I want that?"

He never:
- Tells jokes
- Knows things and explains them
- Speaks in tech jargon

## The Head First Lite components

Three components add pedagogical personality without undercutting authority:

### `<Clanky question="..." />`
Used 2-3 times per lesson at confusion points. See above.

### `<StickyNote>...</StickyNote>`
Slightly-rotated yellow sticky note with handwritten font. Use for:
- AWS-comparison asides ("Coming from AWS? This is the single biggest mental model shift...")
- Architect warnings ("Once your VPC has running workloads, changing IP ranges is **painful**")
- "You'll thank yourself later" tips

Use 1-3 per lesson. They're seasoning, not main course.

### Comic-strip widgets (e.g., `<PacketJourney />`)
Multi-panel click-through stories for processes that have a sequence (a packet flowing through a network, a request going through IAM evaluation, etc.). Use ONE per lesson at most, only when the process has 3-5 distinct steps that are inherently sequential. Don't force it.

## The lesson template — concrete pattern

See `LESSON_TEMPLATE.md` for the full skeleton. The shape is always:

1. **Hook (1-2 paragraphs)** — concrete person, concrete stake. Reference previous lessons for continuity.
2. **Clanky #1** — asks the motivating question
3. **Concept introduction** — answer Clanky, set up the widget
4. **Interactive diagram widget** — `<XxxWidget />`
5. **Architect insight section** — the "why this matters" that justifies the architect-tier framing
6. **Clanky #2** — asks the dumb question that's secretly smart (often a comparison or edge case)
7. **Deeper section** — AWS comparison, CIDR planning, decision criteria, etc.
8. **Optional comic-strip widget** — for processes with sequential steps
9. **Sticky note(s)** — AWS asides or future-pain warnings
10. **Architect's note callout** — the production pattern (shared VPC, deny-by-default, audit conversation)
11. **Clanky #3** (optional) — the auto-vs-custom-mode style trap
12. **Coming up** — one-line teaser for next lesson

A lesson is roughly 800-1500 words of prose + the components. Don't pad. Don't truncate.

## Technical conventions — the things that broke before

### CSS scoping — USE `<style is:global>`

Every widget that uses JavaScript to inject HTML at runtime (i.e., every widget we have) MUST use `<style is:global>` instead of `<style>`. Reason: Astro auto-scopes regular `<style>` blocks, but JS-injected elements don't get the scope attribute, so styles don't apply to them. This bug burned a full day of debugging — don't repeat it.

### Manifest is the source of truth

`src/lessons.ts` controls what shows on the curriculum page. To publish a lesson, you must:
1. Create the MDX in `src/content/lessons/<slug>.mdx`
2. Set `status: 'published'` for that slug in `lessons.ts`
3. Push

If status is `'planned'`, the lesson is greyed out on the curriculum page (visible but not clickable). This is a feature — readers see what's coming.

### Deploy is `git push`

GitHub Actions auto-deploys on every push to `main`. ~90 seconds from push to live. There's no separate build step you run manually for production.

### Browser cache will lie to you

After every push, **always test in a fresh incognito window** (`Cmd+Shift+N`). Regular browser caches HTML and JS aggressively. If you "fix" something and don't see the change, 90% of the time it's cache. Use:

```bash
curl -s https://skhemka.dev/gcp/infra/<lesson>/ | grep -c "<some-keyword-from-the-fix>"
```

…to confirm the new code is actually deployed before blaming yourself.

## Common gotchas (verified, not theoretical)

### Empty git commits with no actual changes

If you `git add -A && git commit -m "fix"` but there were no actual file changes, git happily creates an empty commit. The push succeeds. Nothing changes on the live site. Always run `git diff --cached --stat` before committing to confirm there are real changes.

### `cp` from external folders silently failing

If you unzip a fix folder into `~/Downloads/` and run `cp -r contrast-fix/src/* src/` from the project root, `cp` looks for `contrast-fix/` *relative to your current directory*. If it doesn't exist there, `cp` fails — but if `set -e` isn't in your script, the next commands run anyway. Use absolute paths or use the base64-embedded approach (see `BUILD.md`).

### GitHub PAT scopes

A new Personal Access Token needs both `repo` AND `workflow` scopes to push code that includes a `.github/workflows/*.yml` file. Without `workflow`, the push gets rejected with "refusing to allow a Personal Access Token to create or update workflow."

### `.dev` domains force HTTPS

Browsers require HTTPS for any `.dev` domain via HSTS preload. You cannot test the site on `http://` — Chrome auto-redirects to `https://`. So if SSL isn't provisioned yet, the site appears completely broken even though HTTP would work fine.

## How to add a new lesson — the 3-step loop

```bash
# 1. Create the lesson MDX
vim src/content/lessons/<slug>.mdx

# 2. Flip status: 'planned' → 'published' in src/lessons.ts
# (find the matching slug entry)

# 3. Commit and push
git add -A
git commit -m "Lesson X.Y — <title>"
git push
```

That's it. 90 seconds later, the lesson is live at `https://skhemka.dev/gcp/infra/<slug>/`.

For a full walkthrough including new component creation, see `BUILD.md`.

## Where things live

```
skhemka07-learn/
├── CLAUDE.md                    ← you are here
├── STYLE.md                     ← visual design tokens, color palette, panel patterns
├── LESSON_TEMPLATE.md           ← skeleton for new lessons with worked example
├── BUILD.md                     ← technical setup, common operations, gotchas
├── README.md                    ← public-facing project description
├── src/
│   ├── lessons.ts               ← lesson manifest (source of truth)
│   ├── content/lessons/         ← MDX files (one per lesson)
│   ├── components/              ← reusable widgets
│   ├── pages/                   ← Astro routes
│   ├── layouts/                 ← page wrappers
│   └── styles/global.css        ← design tokens
├── public/
│   ├── CNAME                    ← skhemka.dev
│   └── favicon.svg
└── .github/workflows/deploy.yml ← auto-deploy on push to main
```

## Curriculum roadmap

The 19 lessons are tracked in `src/lessons.ts`. As of writing, this is the state:

| Phase | # | Title | Status |
|-------|---|-------|--------|
| 1 | 1.1 | Resource hierarchy | ✓ published |
| 1 | 1.2 | IAM | ✓ published |
| 1 | 1.3 | Organization policies | ✓ published |
| 2 | 2.1 | VPCs & subnets | ✓ published |
| 2 | 2.2 | Firewalls & Cloud NAT | planned |
| 2 | 2.3 | Cloud Load Balancing | planned |
| 2 | 2.4 | Private Google Access & PSC | planned |
| 3 | 3.1 | Compute Engine | planned |
| 3 | 3.2 | GKE | planned |
| 3 | 3.3 | Cloud Run | planned |
| 3 | 3.4 | Choosing your compute | planned |
| 4 | 4.1 | Cloud Storage & disks | planned |
| 4 | 4.2 | Cloud SQL & Spanner | planned |
| 4 | 4.3 | Bigtable & Firestore | planned |
| 4 | 4.4 | BigQuery | planned |
| 5 | 5.1 | Logging & Monitoring | planned |
| 5 | 5.2 | Security Command Center | planned |
| 5 | 5.3 | KMS & Secret Manager | planned |
| 6 | 6.1 | Terraform | planned |
| 6 | 6.2 | IaC pipelines & policy-as-code | planned |

The current state may differ — check `src/lessons.ts` for ground truth.

## When you're stuck

If something doesn't render correctly:

1. Check the build output — `npm run build` and look for errors
2. Check what's in the deployed HTML — `curl -s <url> | grep <keyword>`
3. Check browser cache — try in incognito
4. Check Astro CSS scoping — `<style>` should be `<style is:global>` for any widget that uses JS
5. Check git — `git log --oneline -5` to confirm your commits actually exist on origin/main

## Sunil's broader context

Sunil is an Engineering Manager / Senior AI Architect at Persistent Systems, working with Fortune 500 clients (Wells Fargo, PayPal, Amex, Intuit). He's an IEEE Senior Member, UN Global Dialogue on AI Governance contributor, and is writing a Head First-style AI/ML book featuring Clanky. This curriculum doubles as a portfolio piece — the writing should reflect that he's a peer to senior architects, not a tutorial-writer.

When you're making decisions about depth, audience, or framing, default to **architect-tier** every time.
