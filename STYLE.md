# STYLE.md

Visual design reference for skhemka.dev. Read this before creating any new component or visual treatment.

## Design philosophy in one sentence

**Architect-grade content with personality, never personality at the cost of authority.**

The site should feel like reading a really sharp colleague's notes — clean, dark-mode-aware, occasionally playful, never corporate, never silly.

## Color palette

The site uses CSS variables defined in `src/styles/global.css`. Use them — never hardcode colors except in widgets where you specifically need a dark-panel/light-panel pair (see "Dark slate panel" below).

### Light mode tokens
```css
--color-bg: #faf9f5;          /* page background, warm cream */
--color-bg-secondary: #f0eee6; /* cards, callouts */
--color-bg-card: #ffffff;      /* elevated surfaces */
--color-text-primary: #1f1e1d; /* body text */
--color-text-secondary: #5e5d59;
--color-text-tertiary: #888780;
--color-accent: #c96442;       /* warm coral, links/CTAs */
```

### Dark mode tokens (auto-applied via `prefers-color-scheme`)
```css
--color-bg: #1a1815;
--color-bg-secondary: #262320;
--color-bg-card: #221f1c;
--color-text-primary: #f0eee6;
--color-text-secondary: #b4b2a9;
--color-accent: #e8a384;
```

### Semantic colors (used for quiz feedback, callouts, tags)

| Purpose | Light bg | Dark bg | Light text | Dark text |
|---------|----------|---------|------------|-----------|
| Info (blue) | `#E6F1FB` | `#0f2a44` | `#185fa5` | `#5ba3e5` |
| Success (teal) | `#E1F5EE` | `#1a3a30` | `#0f6e56` | `#5dcaa5` |
| Warning (amber) | `#FAEEDA` | `#3a2c10` | `#854f0b` | `#efad4e` |
| Danger (red) | `#fcebeb` | `#3a1818` | `#a32d2d` | `#e08585` |

These are also CSS variables: `--color-info`, `--color-info-bg`, etc.

## The 9-ramp diagram palette

Diagrams in widgets use a fixed 9-ramp palette. Each ramp has a light fill, a stroke, a body color, and a deep title color. This palette stays the same across all lessons for visual consistency.

| Ramp | Use for | Fill | Stroke | Body | Deep |
|------|---------|------|--------|------|------|
| Blue | Identity / "who" / Org node primary | `#E6F1FB` | `#185FA5` | `#185FA5` | `#0C447C` |
| Teal | Roles / "what" / Folders | `#E1F5EE` | `#0F6E56` | `#0F6E56` | `#085041` |
| Amber | Scope / "where" / Projects | `#FAEEDA` | `#854F0B` | `#854F0B` | `#633806` |
| Purple | Resources | `#EEEDFE` | `#3C3489` | `#3C3489` | `#26215C` |
| Pink | Organization itself | `#FBEAF0` | `#993556` | `#993556` | `#621D38` |

Pattern: when introducing a new concept that has 3-5 sub-elements, assign each a ramp from this palette in order. The reader builds visual memory across lessons (Blue is always identity, Amber is always scope, etc.).

### Accent colors for inside dark panels

When using a colored title/border inside a dark slate panel (see "Dark slate panel" below), use the **brighter dark-mode** version of each ramp so it pops against `#2c2a26`:

```js
const accents = {
  blue:   '#7eb6f0',   // sky blue
  teal:   '#5dcaa5',   // mint
  amber:  '#efad4e',   // gold
  purple: '#b09ce8',   // lavender
  pink:   '#e88aab',   // rose
};
```

## The dark slate panel — the key pattern

This is the single most important visual pattern. Every interactive widget has one of these as its "explanation panel":

```css
.xxx-detail-panel {
  background: #2c2a26;          /* fixed dark slate, mode-independent */
  border: 1px solid #4a4a48;
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  margin: 1rem 0 1.5rem;
  min-height: 100px;
  transition: border-color 0.2s; /* lights up when a level is clicked */
}

.xxx-detail-body {
  font-size: 14px;
  line-height: 1.65;
  color: #f0eee6;               /* warm white */
}

.xxx-detail-body strong { color: #ffffff; font-weight: 500; }
.xxx-detail-body em     { color: #d3d1c7; font-style: italic; }
.xxx-detail-body code {
  background: #1a1815;
  color: #efad4e;               /* amber for inline code */
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}
```

### Why a fixed-color panel?

Earlier iterations tried to make the panel background match the host page's mode (light bg in light mode, dark bg in dark mode). This kept breaking — because the JS that injects content can't know the host page mode reliably, and Astro's CSS scoping made dynamic styling unreliable. The fix: **always dark slate.** Works in both modes because the contrast is built into the panel itself.

### Why these specific colors?

The slate (`#2c2a26`) is warm, not cold blue-gray. It harmonizes with the cream page background in light mode and the dark amber-tinted page background in dark mode. The body text (`#f0eee6`) is a warm off-white that matches the dark-mode primary text — same color, intentionally.

## The "architect's why" footer in SVG diagrams

Every SVG diagram in a widget ends with a dark amber-bordered footer at the bottom containing a one-sentence architect insight:

```html
<g>
  <rect x="..." y="..." width="..." height="..." rx="10"
        fill="#3c2820" stroke="#854F0B" stroke-width="0.5"/>
  <text ... font-weight="500" font-size="14" fill="#efad4e">
    The architect's "why"
  </text>
  <text ... font-size="12" fill="#d3d1c7">
    [the one-line insight]
  </text>
</g>
```

This is the visual signature that says "this is architect content." Always include one in any new diagram.

## Typography

```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-mono: "SF Mono", Menlo, Monaco, Consolas, monospace;
```

System fonts only. No web font loading. Performance matters — most readers will be on company Wi-Fi or mobile, and the curriculum should load instantly.

### Font sizes

| Element | Size | Weight |
|---------|------|--------|
| Page H1 (lesson title) | 32px | 500 |
| Section H2 | 24px | 500 |
| Section H3 | 18px | 500 |
| Body | 16px | 400 |
| Widget body text | 14px | 400 |
| Widget caption / small label | 12-13px | 400 or 500 |

We use `font-weight: 500` (medium) for headings, never `bold` (700). It's softer and more architectural.

### The handwritten font (sticky notes only)

```css
font-family: 'Marker Felt', 'Bradley Hand', Chalkduster, cursive;
```

Used ONLY in `<StickyNote>`. Don't use cursive fonts anywhere else.

## Spacing & layout

```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--content-width: 760px; /* max width of the lesson body */
```

The 760px content width is intentional — comfortable reading line length on desktop, and components can extend slightly wider when they need to (the SVG diagrams use `viewBox`, so they scale to their container regardless).

### Vertical rhythm

- 2rem margin around widgets
- 1.5rem margin around sticky notes
- 1.75rem margin around Clanky cameos
- 2.5rem above H2 sections
- 1rem between paragraphs

## Component-specific patterns

### `<Clanky>` cameo

- Robot emoji (🤖), 28px, on the left
- Name label "Clanky asks" in amber (`#efad4e`), uppercase, letter-spaced
- Italic question text in warm white (`#f0eee6`)
- Background `#2c2a26` (matches dark slate panel)
- Left border 3px amber accent

### `<StickyNote>`

- Yellow gradient background (`#fff8c4` to `#fff1a8`)
- Slight rotation (`-1.2deg`)
- Cursive font (Marker Felt et al)
- Tape strip across the top using `::before` pseudo-element
- Box shadow for depth

### Comic-strip widget (e.g., `<PacketJourney>`)

- Outer container is a dark slate card (matches panel pattern)
- Header has title (amber) and "Panel N of N" counter (gray)
- Active panel fades in (`@keyframes fadeIn`)
- Caption beneath each panel is a darker inset (`#1a1815`)
- Bottom controls: Previous / dots / Next, with dots clickable for direct navigation

### Quiz feedback

- Success: green background, green text
- Warning (incorrect): amber background, amber text
- Multi-issue feedback uses `<ul>` with one `<li>` per issue
- Each issue should explain WHY it's wrong, not just THAT it's wrong

## Accessibility minimums

- All SVGs have `<title>` and `<desc>` elements
- All clickable elements have `cursor: pointer`
- Color is never the only signal (use icons, borders, text labels alongside)
- Dark mode is auto-applied via `prefers-color-scheme: dark`
- Tap targets are at least 44px tall on mobile (buttons, dots)
- The site should be usable with JavaScript disabled (SVG renders, even if interactivity is gone)

## Don't do these things

❌ **Don't use bright red anywhere.** Only `#a32d2d` (light) / `#e08585` (dark) for errors, and only when something genuinely failed. Red without a real error feels alarming.

❌ **Don't use emojis except for Clanky's robot icon and quiz options.** No 🚀 in body text. We're not a marketing site.

❌ **Don't add gradients.** Sticky note has a subtle one for paper texture. Everything else is flat.

❌ **Don't use shadow on text.** No text-shadow ever.

❌ **Don't introduce new color ramps.** If you need a new color, ask whether one of the 9 existing ramps would work first. They almost always do.

❌ **Don't use CSS frameworks.** No Tailwind, no Bootstrap. Hand-written CSS in component `<style>` blocks (with `is:global` — see CLAUDE.md).

❌ **Don't load external fonts.** System fonts only.

❌ **Don't add animations except for the comic-strip fadeIn.** No bouncing, no jiggling, no parallax. Every motion should serve content delivery.

## Light vs dark mode — the quick rule

If something uses `var(--color-...)` tokens, it adapts automatically to the user's mode preference.

If something uses hardcoded colors (the dark slate panel, the comic strip stage, the sticky notes), it stays the same in both modes — which is fine when the contrast is built into the component.

Test every new component in both light and dark mode before considering it done.
