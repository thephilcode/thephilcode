import RevealWrapper from './RevealWrapper';

const STACK: Record<string, string[]> = {
  Languages:  ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'],
  Frameworks: ['React', 'Next.js', 'Django', 'React Native', 'Bootstrap'],
  Databases:  ['PostgreSQL'],
  Tools:      ['Git', 'GitHub'],
};

export default function About() {
  return (
    <section id="about" className="section" aria-label="About">
      <div className="container">
        <header className="section__header">
          <p className="section-label">// About</p>
          <div className="divider" />
          <h2 className="section-title">Who I Am</h2>
        </header>

        <div className="about__inner">
          {/* Bio */}
          <RevealWrapper className="about__bio">
            <p>
              I&apos;m a freelance web developer based in Lira, Uganda. I create digital
              experiences that range from bold and expressive to clean and precise — whatever
              the project calls for. Whether it&apos;s a vibrant landing page that demands
              attention or a structured platform built for clarity, I shape the work to fit
              the story.
            </p>
            <p>
              Much of my work is done through{' '}
              <a
                href="https://github.com/KaKebe-Technologies"
                target="_blank"
                rel="noopener noreferrer"
              >
                KaKebe Technologies
              </a>
              , where I collaborate on web projects for clients across Northern Uganda and beyond.
              I also take on freelance engagements independently.
            </p>
            <p>
              I work primarily with JavaScript and Python, and I&apos;ve grown especially fond
              of React and Next.js for bringing ideas to life on the web. I care about craft —
              the details that make something feel considered, not just functional. If a thing
              is worth building, it&apos;s worth building with intention.
            </p>
          </RevealWrapper>

          {/* Stack */}
          <RevealWrapper delay={100}>
            <p className="stack-label">Stack</p>
            {Object.entries(STACK).map(([group, tags]) => (
              <div key={group} className="stack-group">
                <p className="stack-group__name">{group}</p>
                <ul className="skill-tags" role="list">
                  {tags.map(tag => (
                    <li key={tag} className="skill-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
