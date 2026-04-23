import ScrollReveal from './animations/ScrollReveal';
import SectionReveal from './animations/SectionReveal';
import SectionTitleReveal from './animations/SectionTitleReveal';
import TypewriterReveal from './animations/TypewriterReveal';
import type { AboutSetting } from '@/payload-types';

const DEFAULT_STACK: Record<string, string[]> = {
  Languages:  ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'],
  Frameworks: ['React', 'Next.js', 'Django', 'React Native', 'Bootstrap'],
  Databases:  ['PostgreSQL'],
  Tools:      ['Git', 'GitHub'],
};

interface AboutProps {
  about?: AboutSetting | null;
}

function renderCompanyParagraph(
  template: string,
  companyName: string,
  companyUrl: string,
) {
  const parts = template.split('[COMPANY]');
  if (parts.length === 1) return <p>{template}</p>;
  return (
    <p>
      {parts[0]}
      <a href={companyUrl} target="_blank" rel="noopener noreferrer">
        {companyName}
      </a>
      {parts[1]}
    </p>
  );
}

export default function About({ about }: AboutProps) {
  const bioIntro =
    about?.bioIntro ??
    "I'm a freelance web developer based in Lira, Uganda. I create digital experiences that range from bold and expressive to clean and precise — whatever the project calls for. Whether it's a vibrant landing page that demands attention or a structured platform built for clarity, I shape the work to fit the story.";

  const bioCompanyContext =
    about?.bioCompanyContext ??
    'Much of my work is done through [COMPANY], where I collaborate on web projects for clients across Northern Uganda and beyond. I also take on freelance engagements independently.';

  const companyName = about?.companyName ?? 'KaKebe Technologies';
  const companyUrl = about?.companyUrl ?? 'https://github.com/KaKebe-Technologies-Limited';

  const bioClosing =
    about?.bioClosing ??
    "I work primarily with JavaScript and Python, and I've grown especially fond of React and Next.js for bringing ideas to life on the web. I care about craft — the details that make something feel considered, not just functional. If a thing is worth building, it's worth building with intention.";

  const stackGroups =
    about?.stack && about.stack.length > 0
      ? about.stack.map(g => ({
          group: g.group,
          tags: g.items?.map(i => i.tag).filter(Boolean) ?? [],
        }))
      : Object.entries(DEFAULT_STACK).map(([group, tags]) => ({ group, tags }));

  return (
    <section id="about" className="section" aria-label="About">
      <SectionReveal mode="scale-up">
      <div className="container">
        <header className="section__header">
          <TypewriterReveal text="// About" className="section-label" />
          <div className="divider" />
          <SectionTitleReveal className="section-title">Who I Am</SectionTitleReveal>
        </header>

        <div className="about__inner">
          {/* Bio */}
          <ScrollReveal className="about__bio">
            <p>{bioIntro}</p>
            {renderCompanyParagraph(bioCompanyContext, companyName, companyUrl)}
            <p>{bioClosing}</p>
          </ScrollReveal>

          {/* Stack */}
          <ScrollReveal delay={100}>
            <p className="stack-label">Stack</p>
            {stackGroups.map(({ group, tags }) => (
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
          </ScrollReveal>
        </div>
      </div>
      </SectionReveal>
    </section>
  );
}
