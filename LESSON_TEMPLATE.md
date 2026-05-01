# LESSON_TEMPLATE.md

How to write a lesson in the same voice and structure as the existing four.

## TL;DR

A lesson is one MDX file in `src/content/lessons/<slug>.mdx`. It has frontmatter, prose, 2-3 Clanky cameos, an interactive widget or two, and an architect's-note callout. Aim for 800-1500 words of prose plus components.

## The frontmatter (required)

```yaml
---
title: "Firewalls & Cloud NAT"           # Display title — sentence case
phase: 2                                  # Which phase (1-6)
lesson: "2.2"                             # Display number (e.g., "2.2")
curriculum: "infra"                       # Always "infra" for now
track: "gcp"                              # Always "gcp" for now
description: "One-line summary for SEO and the curriculum index."
analogy: "The toll booth and one-way mirror"  # The lesson's organizing metaphor
publishedAt: 2026-05-15
---
```

Then the imports:

```jsx
import SomeWidget from '../../components/SomeWidget.astro';
import Clanky from '../../components/Clanky.astro';
import StickyNote from '../../components/StickyNote.astro';
```

Only import what you use.

## The structure — 11 beats

Use this skeleton. Skip beats only with a reason.

### Beat 1 — Hook (1-2 paragraphs)

Open with a concrete situation that makes the reader care. **Reference previous lessons for continuity** — the curriculum is a story, not isolated articles.

```markdown
If Lesson 2.1 was the **streets** of your private cloud city, this lesson is
about the **traffic cops**. The streets are useless if anything can drive on
them — you need rules.

Right now, every VM in your VPC can talk to every other VM, on any port,
in any direction. That's a VPC working "out of the box" — and it's also
the first thing your security team will flag in their audit.
```

Reference what came before. Set up what's coming. Do it in 2-3 sentences max.

### Beat 2 — Clanky's first cameo

The motivating question — what readers were about to ask.

```jsx
<Clanky question="Wait, doesn't 'private VPC' already mean it's secure? Why do I need firewalls on top of that?" />
```

Then your answer immediately after, in 1-2 paragraphs.

### Beat 3 — Concept introduction

Set up the concept and what the widget will show. Don't go deep yet — that comes after.

```markdown
A **VPC firewall rule** is a single line of policy that says: "allow [or
deny] traffic [from these sources] [to these targets] [on these ports]."

Click through the firewall rule builder below to see how a real production
ruleset comes together.
```

### Beat 4 — The interactive widget

```jsx
<FirewallBuilder />
```

The widget should let the reader poke at the concept and see consequences. Not just a static diagram.

### Beat 5 — Architect insight section

The "why this matters" that justifies the architect-tier framing. This is where you separate from a tutorial.

```markdown
## The deny-all default and why everyone gets it wrong

Out of the box, GCP applies two implicit rules to every VPC:

1. Deny all ingress (incoming traffic from outside the VPC)
2. Allow all egress (outgoing traffic to anywhere)

Read that again. Egress is wide open by default. Most architects
coming from on-prem networking assume both directions are denied
by default — they're not. And that asymmetry is exactly how
data exfiltration attacks succeed in cloud environments.
```

This section is where the reader learns something they didn't know — not just the mechanics, but the *implication*.

### Beat 6 — Clanky's second cameo

The "dumb question that's secretly smart" — usually a comparison or edge case.

```jsx
<Clanky question="If egress is wide open by default, can my compromised VM phone home to anywhere on the internet?" />
```

Yes, Clanky. That's exactly the point. Then explain.

### Beat 7 — Deeper section

The architect-grade depth: AWS comparison, decision criteria, planning patterns. This is the part that proves to the reader you've done this for real, not just read the documentation.

Examples of what fits here:
- AWS comparison ("In AWS, security groups are stateful, network ACLs are stateless. GCP firewall rules are always stateful — different mental model.")
- Planning patterns ("Use **target tags** in dev/staging, **service accounts** in production. Tags are easier; service accounts are auditable.")
- Decision criteria ("Outbound to the internet? Force it through Cloud NAT. Inbound from the internet? Force it through a load balancer. Anything else, deny.")

### Beat 8 — Optional comic-strip widget

Only if there's a process with sequential steps that's genuinely better told as a story. Don't force it.

```jsx
<RuleEvaluation />
```

A good comic-strip widget for firewalls might walk through how a packet hits the firewall, gets evaluated against rules in priority order, and either passes or gets dropped — Clanky as the packet again.

### Beat 9 — Sticky note(s)

1-3 sticky notes scattered throughout, often near the deeper section.

```jsx
<StickyNote>
  <strong>Coming from AWS?</strong> No security groups here.
  GCP uses VPC-wide firewall rules with target tags. Your old
  "create a SG per workload" reflex doesn't apply.
</StickyNote>
```

Use them for AWS asides, future-pain warnings, or "everyone gets this wrong" callouts.

### Beat 10 — Architect's note callout

The production pattern. Use this exact HTML structure (it has its own CSS class):

```html
<div class="architect-note">
  <div class="architect-note-label">Architect's note — the audit conversation</div>

  When a SOC 2 auditor asks "show me how you control egress," you
  cannot say "we trust our developers to write good firewall rules."
  You need a story like:

  - **Default deny on all egress** (org policy `compute.vmExternalIpAccess`)
  - **Cloud NAT** for any outbound internet (logged centrally)
  - **Private Google Access** for GCP service traffic (Lesson 2.4)

  Three controls, all enforced by architecture not policy. That's the
  conversation auditors want to have.
</div>
```

The `architect-note` class is defined in `src/styles/global.css` — don't restyle it per lesson.

### Beat 11 — "Coming up" closer

One paragraph, max. Tease the next lesson.

```markdown
## Coming up

In Lesson 2.3 we cover **Cloud Load Balancing** — the front door through which
internet traffic actually reaches your private VPC. Where firewalls control
what's allowed, load balancers control where it goes.
```

## Worked example — a complete fictional lesson

Here's what an entire lesson file looks like, end to end. This is the level of detail to match.

```mdx
---
title: "Firewalls & Cloud NAT"
phase: 2
lesson: "2.2"
curriculum: "infra"
track: "gcp"
description: "Toll booths and one-way mirrors — what gets in, and how private servers reach the internet."
analogy: "The toll booth and one-way mirror"
publishedAt: 2026-05-15
---

import FirewallBuilder from '../../components/FirewallBuilder.astro';
import Clanky from '../../components/Clanky.astro';
import StickyNote from '../../components/StickyNote.astro';

If Lesson 2.1 was the **streets** of your private cloud city, this is the
**traffic cops**. The streets are useless if anything can drive on them.

<Clanky question="Wait — doesn't 'private VPC' already mean it's secure? Why do I need firewalls on top of that?" />

A VPC isolates your network from the public internet, yes. But inside the VPC,
every VM can still talk to every other VM, on any port, in any direction. That's
fine for a hobby project. For Wells Fargo, it's an audit finding waiting to happen.

A **VPC firewall rule** is a single line of policy that says: "allow [or deny]
traffic [from these sources] [to these targets] [on these ports]." Build a few
below and see what happens.

<FirewallBuilder />

## The deny-all default — and why everyone gets it wrong

GCP applies two implicit firewall rules to every new VPC:

1. **Deny all ingress** — nothing from outside the VPC can reach in
2. **Allow all egress** — anything inside the VPC can reach anywhere

Read that twice. *Egress is wide open by default.* Most architects coming from
on-prem networking assume both directions are denied — they're not. That
asymmetry is exactly how data exfiltration attacks succeed in cloud environments.

<Clanky question="So if my VM gets compromised, it can phone home to anywhere on the internet by default?" />

Yes. Exactly that. Which is why the first thing you do in any new VPC is set
up egress firewall rules to deny outbound traffic to anything except known-good
destinations — and route the legitimate outbound traffic through Cloud NAT so
it's all logged in one place.

## Cloud NAT — the one-way mirror

Cloud NAT lets your private VMs (no external IP) reach the internet without
the internet being able to reach them. Outbound only. Heavily logged.

[... more depth here ...]

<StickyNote>
  <strong>Coming from AWS?</strong> Same idea as a NAT gateway, but cheaper
  and easier — Cloud NAT is a regional managed service, not a per-AZ resource
  you size and pay for.
</StickyNote>

<div class="architect-note">
  <div class="architect-note-label">Architect's note — the audit conversation</div>

  When SOC 2 auditors ask "show me how you control egress," the architect
  answer is three controls stacked:

  - Deny default egress (firewall rule with priority 65535 set to deny)
  - All legitimate outbound goes through Cloud NAT (logged, IP-restricted)
  - GCP service traffic uses Private Google Access (Lesson 2.4)

  Three controls, all enforced by architecture not policy.
</div>

## Coming up

In Lesson 2.3, **Cloud Load Balancing** — the front door through which
internet traffic actually reaches your VPC. Where firewalls control what's
allowed, load balancers control where it goes.
```

## What to avoid

❌ **Don't write "In this lesson, we will cover..."** — start with the hook directly

❌ **Don't write a TL;DR or summary at the start** — readers will figure out what the lesson is about by reading it

❌ **Don't list "Learning objectives"** — too academic

❌ **Don't write more than ~1500 words of prose** — trim until it fits

❌ **Don't repeat what the widget shows** — the widget IS the explanation for that concept; let it do its job

❌ **Don't end with "I hope this was helpful"** — end with the "Coming up" teaser

❌ **Don't use Clanky for entry-level questions** — he's for architect-tier confusion

## When in doubt — read the existing lessons

The four existing lessons (`1-1`, `1-2`, `1-3`, `2-1`) are the ground truth. If you're unsure how to structure something, find a similar moment in one of those lessons and match the pattern.

## Word count rule

If the lesson body is under 800 words, you're probably under-explaining. Add a real-world example or a deeper architect insight.

If it's over 1500 words, you're padding or covering too much. Cut the section that's least architect-tier, or split into two lessons.
