/**
 * Seed script — safe to run multiple times; skips records that already exist.
 *
 * Usage:
 *   pnpm seed
 *
 * Prerequisites:
 *   - DATABASE_URL and PAYLOAD_SECRET set in .env.local
 *   - Database migrated: pnpm payload migrate
 */
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const { getPayload }       = await import('payload');
const { default: config }  = await import('../payload.config.js');

interface SeedProject {
  title: string;
  category: string;
  year: string;
  description: string;
  live?: string;
  github?: string;
  featured?: boolean;
  slug?: string;
}

interface SeedPost {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
  body: object;
}

// ---------------------------------------------------------------------------
// Sample blog posts
// ---------------------------------------------------------------------------
const POSTS: SeedPost[] = [
  {
    title: 'Building a Portfolio with Next.js 15 and Payload CMS',
    slug: 'building-portfolio-nextjs-payload',
    excerpt:
      'A deep dive into the architecture decisions behind this very site — App Router, Payload 3, Cloudflare R2, and a hand-rolled CSS design system.',
    tags: ['Next.js', 'Payload CMS', 'Architecture'],
    publishedAt: '2025-03-10T09:00:00.000Z',
    featured: true,
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Why Payload CMS?' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'When I set out to rebuild my portfolio I had one constraint above all others: I wanted full ownership of the data model with zero vendor lock-in. Payload CMS gives me a Postgres-backed, TypeScript-first CMS that lives inside my own Next.js app — no external service, no per-seat pricing.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'App Router all the way down' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Next.js 15's App Router lets me co-locate the Payload admin panel at /admin and my public site under a (site) route group in the same repo. Server Components handle all data fetching — no API layer, no useEffect waterfalls. The result is a site that feels instant because it mostly is.",
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Cloudflare R2 for media' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Payload's S3-compatible storage plugin made wiring up R2 straightforward. Uploads go straight from the browser to the edge — no origin round-trip, zero egress fees.",
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Skipping Tailwind' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'I chose a hand-rolled CSS design system over Tailwind. One globals.css file with CSS custom properties for tokens, BEM-ish class names, and zero runtime overhead. It forces intentionality — every class has a reason.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  {
    title: 'CSS Custom Properties as a Design Token System',
    slug: 'css-custom-properties-design-tokens',
    excerpt:
      'How to use native CSS variables to build a consistent, themeable design system without any preprocessors or JavaScript-in-CSS overhead.',
    tags: ['CSS', 'Design Systems', 'Frontend'],
    publishedAt: '2025-02-18T09:00:00.000Z',
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Tokens, not magic numbers' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Every colour, spacing step, duration, and easing curve lives in :root as a custom property. When a component references --color-gold rather than #C8A97E, the meaning is self-documenting and the value is changeable in one place.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Layering specificity intentionally' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The cascade is not your enemy — undisciplined specificity is. A flat class system (no nesting beyond one level of BEM modifier) keeps overrides predictable. The browser devtools become readable again.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Responsive type without a library' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "clamp() does the work of a full responsive type scale in a single expression. --text-display: clamp(2.5rem, 6vw, 4rem) scales smoothly between viewport extremes with no media query breakpoints needed.",
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  {
    title: 'GSAP ScrollTrigger Patterns I Actually Use',
    slug: 'gsap-scrolltrigger-patterns',
    excerpt:
      'Three reliable ScrollTrigger patterns — parallax layers, pinned scroll sequences, and staggered reveals — with notes on performance and reduced-motion.',
    tags: ['GSAP', 'Animation', 'JavaScript'],
    publishedAt: '2025-01-22T09:00:00.000Z',
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Parallax that does not hurt performance' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The key is animating only transform and opacity — compositor-only properties. Set will-change: transform on the element before the timeline starts, and remove it in the onComplete callback so the browser can free the layer.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Pinned scroll sequences' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Pin a container, then scrub a timeline against scroll progress. The mental model: the timeline is your storyboard, scroll position is the playhead. Keep each pinned section under 300vh or users on short screens will feel trapped.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Respecting prefers-reduced-motion' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Check window.matchMedia("(prefers-reduced-motion: reduce)").matches before registering any ScrollTrigger. If it matches, skip the animation entirely — do not just make it faster. Instant state changes are always accessible; subtle motion is not always welcome.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  {
    title: 'Type-Safe API Routes in Next.js App Router',
    slug: 'type-safe-api-routes-nextjs-app-router',
    excerpt:
      'Using Zod and TypeScript to validate request bodies, return typed responses, and keep your route handlers from becoming a maintenance burden.',
    tags: ['TypeScript', 'Next.js', 'Zod'],
    publishedAt: '2024-12-05T09:00:00.000Z',
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'The problem with untyped handlers' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Route handlers receive a raw Request. Without validation, req.json() returns unknown and you end up with type assertions scattered everywhere. One bad deploy later and you discover the client sent a string where you expected a number.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Zod at the boundary' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Parse the request body with a Zod schema at the top of every POST handler. If parse fails, return a 400 with the flattened error immediately. Everything below that point is fully typed — no assertions needed.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Typed response helpers' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'A small typed wrapper around NextResponse.json() that accepts a generic enforces the response shape at the call site. When the schema changes, TypeScript tells you every handler that needs updating — no grep required.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function projectExists(payload: Awaited<ReturnType<typeof getPayload>>, slug: string): Promise<boolean> {
  const { totalDocs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return totalDocs > 0;
}

async function postExists(payload: Awaited<ReturnType<typeof getPayload>>, slug: string): Promise<boolean> {
  const { totalDocs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return totalDocs > 0;
}

function makeSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function seed() {
  const payload = await getPayload({ config });

  // ── Projects ──────────────────────────────────────────────
  const dataPath = path.resolve(__dirname, '../public/data/projects.json');
  if (fs.existsSync(dataPath)) {
    const projects: SeedProject[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`\nSeeding ${projects.length} projects…`);

    for (const project of projects) {
      const slug = project.slug || makeSlug(project.title);
      if (await projectExists(payload, slug)) {
        console.log(`  – skip (exists): ${project.title}`);
        continue;
      }
      await payload.create({
        collection: 'projects',
        data: {
          title:       project.title,
          category:    project.category,
          year:        project.year,
          description: project.description,
          live:        project.live   || null,
          github:      project.github || null,
          featured:    project.featured ?? false,
          slug,
          _status:     'published',
        },
      });
      console.log(`  ✓ ${project.title}`);
    }
  } else {
    console.log('\nNo projects.json found — skipping projects.');
  }

  // ── Posts ─────────────────────────────────────────────────
  console.log(`\nSeeding ${POSTS.length} blog posts…`);

  for (const post of POSTS) {
    if (await postExists(payload, post.slug)) {
      console.log(`  – skip (exists): ${post.title}`);
      continue;
    }
    await payload.create({
      collection: 'posts',
      data: {
        title:       post.title,
        slug:        post.slug,
        excerpt:     post.excerpt,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body:        post.body as any,
        tags:        post.tags.map(tag => ({ tag })),
        publishedAt: post.publishedAt,
        featured:    post.featured ?? false,
        _status:     'published',
      },
    });
    console.log(`  ✓ ${post.title}`);
  }

  console.log('\nSeed complete.\n');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
