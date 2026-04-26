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
- [ ] SEO improvements (dynamic OG images, per-project pages)
- [ ] Analytics integration (dashboard analytics card — placeholder reserved in Phase C redesign)
- [ ] Formspree CAPTCHA (contact form UX polish)
- [ ] Media cloud storage — swap local filesystem adapter for S3/Cloudflare R2 (`@payloadcms/storage-s3`); required before any deployment to an ephemeral filesystem (Vercel, etc.)
