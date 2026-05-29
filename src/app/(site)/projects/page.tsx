import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import type { Project } from '@/payload-types';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Work — thephilcode',
  description: 'A full archive of projects by Philip Ayo — web development, mobile apps, and open-source work.',
};

export default async function ProjectsPage() {
  const payload = await getPayload({ config });

  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 200,
    sort: '-createdAt',
    depth: 1,
    where: { _status: { equals: 'published' } },
  });

  // Featured first, then the rest sorted by date
  const sorted = [
    ...projects.filter(p => p.featured),
    ...projects.filter(p => !p.featured),
  ] as Project[];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container">
          <header className="projects-page-head">
            <p className="section-label">Work</p>
            <div className="divider" />
            <h1 className="projects-page-title">All Projects</h1>
            <p className="projects-page-count">{sorted.length} project{sorted.length !== 1 ? 's' : ''}</p>
          </header>

          <ProjectsGrid projects={sorted} />
        </div>
      </main>
      <Footer />
    </>
  );
}
