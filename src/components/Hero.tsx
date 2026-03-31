import RevealWrapper from './RevealWrapper';

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Gold corner bracket — decorative brand motif */}
      <div className="hero__corner" aria-hidden="true" />

      <div className="container">
        <div className="hero__inner">
          <RevealWrapper as="p" className="hero__eyebrow">
            Freelance Web Developer &mdash; Uganda
          </RevealWrapper>

          <RevealWrapper as="h1" className="hero__name" delay={80}>
            Ayo
            <br />
            <span className="hero__name--accent">Philip Odongo.</span>
          </RevealWrapper>

          <RevealWrapper className="hero__tagline" delay={160}>
            <span className="hero__tagline-prompt" aria-hidden="true">&gt;&nbsp;</span>
            Converting Coffee to Code
          </RevealWrapper>

          <RevealWrapper className="hero__actions" delay={240}>
            <a href="#work" className="btn btn-primary">
              View My Work
            </a>
            <a
              href="https://github.com/thephilcode"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              GitHub
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M1 11L11 1M11 1H4M11 1V8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </RevealWrapper>
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#work" className="hero__scroll-hint" aria-label="Scroll to work">
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1" />
          <circle cx="7" cy="6" r="1.5" fill="currentColor">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;0 6;0 0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        Scroll
      </a>
    </section>
  );
}
