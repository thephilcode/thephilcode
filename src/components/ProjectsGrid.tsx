'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project, Media } from '@/payload-types';

const PAGE_SIZE = 9;

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

interface Props {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const hasMore = visibleCount < projects.length;

  return (
    <>
      <div className="cards-grid">
        {projects.map((project, i) => {
          const media = project.thumbnail && typeof project.thumbnail !== 'number'
            ? (project.thumbnail as Media)
            : null;

          return (
            <div key={project.id} style={i >= visibleCount ? { display: 'none' } : undefined}>
              <div className="card" style={{ height: '100%' }}>
                {media?.url && (
                  <div className="card__thumbnail">
                    <Image
                      src={media.url}
                      alt={media.alt || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="card__thumbnail-img"
                    />
                  </div>
                )}
                <div>
                  <p className="card__meta">{project.category} &middot; {project.year}</p>
                  <h2 className="card__title">
                    {project.slug ? (
                      <Link href={`/projects/${project.slug}`} className="card__title-link">
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h2>
                </div>
                <p className="card__description">{project.description}</p>
                {(project.live || project.github) && (
                  <div className="card__links">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="card__link card__link--live">
                        <ArrowIcon /> Live Site
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="card__link">
                        <GithubIcon /> GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="btn btn-outline load-more-btn"
            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
          >
            Load More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
