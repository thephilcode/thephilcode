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
              I&apos;m a freelance web developer based in Lira, Uganda. I build clean, fast, and
              purposeful digital experiences for organisations, schools, and businesses — work
              that earns attention through structure and precision, not noise.
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
              I take on freelance engagements independently as well.
            </p>
            <p>
              Particularly comfortable with Python and JavaScript, and recently taken a shine to
              React and Next.js. I care about the quality of what I ship. If a thing is worth
              building, it is worth building well.
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
