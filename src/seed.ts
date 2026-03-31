/**
 * Seed script — run once after setting up your database.
 * Inserts the projects from public/data/projects.json into Payload.
 *
 * Usage:
 *   npm run seed
 *
 * Prerequisites:
 *   - DATABASE_URL and PAYLOAD_SECRET set in .env.local
 *   - Database migrated: npm run payload migrate
 */
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Dynamically import payload so env vars are loaded first
const { getPayload }  = await import('payload');
const { default: config } = await import('../payload.config.js');

interface SeedProject {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  live: string;
  github: string;
  featured: boolean;
}

async function seed() {
  const payload = await getPayload({ config });

  const dataPath = path.resolve(__dirname, '../public/data/projects.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const projects: SeedProject[] = JSON.parse(raw);

  console.log(`Seeding ${projects.length} projects…`);

  for (const project of projects) {
    await payload.create({
      collection: 'projects',
      data: {
        title:       project.title,
        category:    project.category,
        year:        project.year,
        description: project.description,
        live:        project.live   || null,
        github:      project.github || null,
        featured:    project.featured,
      },
    });
    console.log(`  ✓ ${project.title}`);
  }

  console.log('Done. You can now remove public/data/projects.json if you like.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
