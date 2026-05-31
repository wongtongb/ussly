# Product

## Register

brand

## Users

Owners of small, local, character-driven businesses — restaurants, barbers, shops — mostly around Lynnwood / Seattle, WA. They arrive skeptical of web design after seeing template clones and overpriced agency work. Non-technical, time-poor, proud of their business and its specificity. The job: find someone who will build them a real, hand-coded site that looks like *them*, not like everyone else's, and start a project without a sales gauntlet.

A secondary internal user — the studio owner — uses the `/admin` surface to triage briefs, manage portfolio and testimonials, and set availability. That surface is a product tool serving a workflow, not the brand.

## Product Purpose

Ussly is a small independent web design studio site. It exists to win the right projects: it shows the studio's taste through the site itself (the site is the portfolio piece), states a point of view, and converts interested owners into briefs via a low-friction contact form backed by Supabase + Resend. Success is a qualified brief from a business that wants craft over templates. The site must out-design the competition on first glance, because for a design studio the medium is the proof.

## Brand Personality

Small, sharp, independent. Editorial and typographic — a print-magazine sensibility on the web. Confident without shouting; opinionated without being precious. Voice: lowercase mono kickers tracked wide (`/ now live`), Fraunces display with an italic accent on the last word or punctuation, plain specific sentences. No emoji clutter, no hashtags in copy, one directional arrow (↓ / →) at most. Three words: **crafted, opinionated, unhurried.** Emotional goal: the visitor feels they've found a real practice with taste, not a vendor running a funnel.

## Anti-references

- **Corporate agency.** Big stock photography, "we deliver solutions / drive results" buzzword copy, soulless we-team tone, identical case-study templates. The opposite of a point of view.
- **Loud / maximalist.** Overdesigned, heavy animation, neon, vibe-coded maximalism. Ornament-for-ornament's-sake reads as trying too hard and undercuts the craft claim. Default to refined restraint: fewer elements, deliberate motion, let type and space carry it.
- **Template / builder look.** Wix / Squarespace / Framer-template hero + feature-card grids; the literal thing the brand promises *not* to be ("websites that don't look like everyone else's").
- **Generic SaaS landing.** Cool-gray, navy-and-blue, gradient hero, three identical icon cards.

## Design Principles

1. **The site is the proof.** Every section is a live demonstration of the craft being sold. Nothing ships at template quality; the work argues for the work.
2. **Editorial restraint over ornament.** Hierarchy through type scale, weight, and space — not decoration. When in doubt, remove. One deliberate motion beats five reflexive ones.
3. **Have a point of view.** Opinionated copy and committed design choices over safe, hedged, agency-neutral defaults. Specific nouns and verbs, never buzzwords.
4. **Identity is fixed; preserve it.** The paper / ink / terracotta palette and Fraunces + Geist pairing are the brand. Branch on layout and interaction, never drift the core identity.
5. **Low-friction to the brief.** The whole site bends toward one easy, human next step — start a project — without a sales gauntlet.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1 against the warm paper background (watch `--color-ink-muted` #5C544A on paper/cream — verify it clears 4.5:1 wherever used for body copy; bump toward ink if close). Large/display text ≥3:1. Full keyboard navigation and visible focus on all interactive elements, including the contact form and admin. Honor `prefers-reduced-motion` (already wired in `globals.css`) for every animation. Maintain meaning without relying on the terracotta accent alone (color-blind safe).
