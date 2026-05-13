import { getPayload } from 'payload';
import config from '@payload-config';
import type { Project } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const projects = await payload.find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    limit: 100,
  });

  return projects.docs
    .filter((p): p is Project & { slug: string } => !!p.slug)
    .map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const project = result.docs[0] as Project | undefined;
  if (!project) notFound();

  const thumbnail = project.thumbnail
    ? (project.thumbnail as { url?: string; alt?: string })
    : null;

  const projectDescription = (() => {
    const extractText = (node: unknown): string => {
      if (typeof node === 'string') return node;
      if (node == null) return '';
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (typeof node === 'object') {
        const n = node as Record<string, unknown>;
        if (typeof n.text === 'string') return n.text;
        if (Array.isArray(n.children)) return n.children.map(extractText).join('');
      }
      return '';
    };
    return extractText(project.description);
  })();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* Hero image */}
        <div className="project-hero">
          {thumbnail?.url ? (
            <>
              <Image
                src={thumbnail.url}
                alt={thumbnail.alt || project.title}
                fill
                className="project-hero__img"
                priority
              />
              <div className="project-hero__overlay" />
            </>
          ) : (
            <div className="project-hero__placeholder" />
          )}
        </div>

        {/* Content */}
        <div className="container">
          <div className="project-content">
            <Link href="/" className="project-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <p className="project-meta">
              {project.category} &middot; {project.year}
            </p>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{projectDescription}</p>

            <div className="project-actions">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
