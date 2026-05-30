# Roadmap

## Pre-Deploy

- [x] Fix Payload admin panel (layout, CSS, serverFunction)
- [x] Multiple featured projects with responsive card grid (capped at 3)
- [x] Hero: add profile picture, improve name layout, adjust nav spacing
- [x] Hero: typing animation (type/erase loop with cursor)
- [x] Quick animations: directional card reveals (left/right), card hover lift + shadow
- [x] Site-wide animations overhaul (GSAP + ScrollTrigger):
  - [x] Parallax section component (ready for use, subtle approach)
  - [x] Hero text: per-character stagger entrance
  - [x] Section header typewriter reveals ("// Work", "// About", "// Contact")
  - [x] Card hover: 3D perspective tilt toward cursor
  - [x] Button hover: magnetic pull micro-interaction
  - [x] Background: subtle film grain texture
  - [x] Scroll progress indicator (thin gold bar)
  - [x] Reverse animations when scrolling back up (re-trigger on re-entry)
- [x] About section: rewrite copy to reflect creative + structured identity
- [x] Configure Formspree form ID for contact form
- [x] Bold visual overhaul (leonardo.ai-inspired):
  - [x] Hero pin-and-shrink with parallax depth layers
  - [x] Section transition reveals (clip-path curtain, scale-up, circle reveal)
  - [x] Scroll-driven background color shifts + ambient gold glow
  - [x] Large-scale typography motion (section title clip+scale, hero char dissolve)
  - [x] Luminous gold accents (portrait glow, button glow, card light sweep)
  - [x] Horizontal scroll for featured projects
  - [x] Scroll progress bar with glow trail
  - [x] prefers-reduced-motion and touch device degradation
  - [x] Footer reveal animation

## Post-Deploy

### Phase A — Content & Media
- [x] Make all site content editable from Payload dashboard (hero text, about copy, social links, etc.)
- [x] ~~Email adapter for admin~~ — skipped; unnecessary for single-user portfolio
- [x] Image uploads via Payload (project thumbnails, media collection)
- [x] Project card previews (images/thumbnails in top half of cards)

### Phase B — Animation polish (brand bible v3 compliance)
- [x] Hero: Particle Net canvas animation (sparse gold/white node drift + line draw, 10–20% opacity, continuous loop — brand bible specified, currently missing)
- [x] Hero text: refine to word-by-word slam-in (scale + Y-translate + opacity per word, 0.6–0.9s total) — brand bible calls for slam not per-char ripple
- [x] Audit and replace --ease-spring usage in animations (cubic-bezier overshoot is explicitly non-compliant per motion rules — ease-out or precision cubic-bezier only)

### Phase C — Payload admin customisation
- [x] Custom dashboard root view (welcome message, quick stats: published projects count, last updated)
- [x] Branded admin theme (dark background matching public site, gold accents)
- [x] Tidy sidebar (surface only relevant collections: Projects, Site Settings/Globals)
- [x] Dashboard redesign — mission control aesthetic (Direction C layout, corner brackets, recent projects list, analytics placeholder, functional status indicators)
- [x] Replace all Payload branding — favicon, nav icon, login logo (custom SVG icon + thephilcode logotype)

### Phase D — Growth
- [x] SEO improvements (dynamic OG images, per-project pages)
- [x] Custom 404 page (global `app/not-found.tsx`; imports design system CSS directly)
- [x] Analytics integration (dashboard analytics card — placeholder reserved in Phase C redesign)
- [x] Cloudflare Turnstile CAPTCHA on contact form (testable on live domain only — skipped on localhost)
- [x] Media cloud storage — swap local filesystem adapter for S3/Cloudflare R2 (`@payloadcms/storage-s3`); required before any deployment to an ephemeral filesystem (Vercel, etc.)
- [x] Migrate contact form from Formspree → Resend + Payload (`/api/contact` Route Handler; Turnstile verified server-side; submissions saved to Payload `Submissions` collection; notification email via Resend)

### Phase E — Projects expansion
- [x] Add optional `body` richText field to Projects collection — full write-up for bigger projects (case study format); project detail page shows `body` if present, falls back to `description`
- [x] `description` stays as `textarea` (plain text) — used on cards and as SEO meta description
- [x] Dedicated `/projects` page — full grid of all projects, "Load More" (show 9, reveal more client-side; all content in DOM for SEO)
- [x] Move non-featured project grid off homepage; homepage shows featured horizontal scroll only + "See all projects →" link to `/projects`
- [x] Update "Work" nav link from `#work` anchor to `/projects` route
- [x] Auto-generate slugs on project creation (`beforeChange` hook in Projects collection)

### Phase F — Blog
- [x] `Posts` Payload collection: title, slug (auto-generated), body (richText/Lexical), excerpt (textarea), coverImage (upload), tags (array of text), publishedAt (date), status (draft/published)
- [x] `/blog` listing page — card grid, sorted by date, "Load More" pattern (same as `/projects`)
- [x] `/blog/[slug]` detail page — cover image hero, reading time estimate, richText body rendered via `LexicalContent` component, back link
- [x] "Blog" nav link (alongside Work, About, Contact)
- [x] RSS feed at `/feed.xml` — auto-generated from published posts
- [x] OG image + metadata per post (title, excerpt as description)

### Future additions
- [x] **Self-hosted fonts** — download Satoshi woff2 files locally (`public/fonts/satoshi/`); add `@font-face` to globals.css; remove Fontshare CDN link (Space Grotesk + Space Mono already self-hosted via `next/font/google`)
- [ ] **Project category filtering** — filter bar on `/projects` page; single `useState` + CSS show/hide; no new pages
- [ ] **Availability badge** — "Open to work / Currently busy" toggle in Payload globals; rendered in hero or nav
- [ ] **Resume PDF download** — link in nav or hero; PDF hosted in R2 or as a static asset
- [ ] **Newsletter** — email capture form using Resend audience/broadcasts; one new Route Handler, one new component
- [x] **Reading time** — word-count estimate shown on blog post cards and detail pages
