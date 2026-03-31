import type { Project } from '@/types/project';
import RevealWrapper from './RevealWrapper';

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M1 11L11 1M11 1H4M11 1V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function CardLinks({ live, github }: { live: string; github: string }) {
  if (!live && !github) return null;
  return (
    <div className="card__links">
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" className="card__link card__link--live">
          <ArrowIcon /> Live Site
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="card__link">
          <GithubIcon /> GitHub
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <RevealWrapper className="card--featured">
      <span className="corner corner--tl" aria-hidden="true" />
      <span className="corner corner--tr" aria-hidden="true" />
      <span className="corner corner--bl" aria-hidden="true" />
      <span className="corner corner--br" aria-hidden="true" />

      <div>
        <p className="card__badge">Featured Project</p>
        <h3 className="card__title card__title--lg">{project.title}</h3>
        <p className="card__meta">
          {project.category} &middot; {project.year}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p className="card__description">{project.description}</p>
        <CardLinks live={project.live} github={project.github} />
      </div>
    </RevealWrapper>
  );
}

function StandardCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <RevealWrapper className="card" delay={delay}>
      <div>
        <p className="card__meta">
          {project.category} &middot; {project.year}
        </p>
        <h3 className="card__title">{project.title}</h3>
      </div>
      <p className="card__description">{project.description}</p>
      <CardLinks live={project.live} github={project.github} />
    </RevealWrapper>
  );
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const featured = projects.find(p => p.featured) ?? null;
  const rest     = projects.filter(p => !p.featured);

  return (
    <section id="work" className="section" aria-label="Work">
      <div className="container">
        <header className="section__header">
          <p className="section-label">// Work</p>
          <div className="divider" />
          <h2 className="section-title">Selected Projects</h2>
        </header>

        {featured && <FeaturedCard project={featured} />}

        {rest.length > 0 && (
          <div className="cards-grid" style={{ marginTop: '1.5px' }}>
            {rest.map((project, i) => (
              <StandardCard key={project.id} project={project} delay={i * 80} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
