import Image from 'next/image';
import RevealWrapper from './RevealWrapper';
import TypingAnimation from './TypingAnimation';

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__text">
              <RevealWrapper as="p" className="hero__eyebrow">
                Freelance Web Developer &mdash; Uganda
              </RevealWrapper>

              <RevealWrapper as="h1" className="hero__name" delay={80}>
                Ayo <span className="hero__name--accent">Philip</span>
                <br />
                Odongo.
              </RevealWrapper>

              <RevealWrapper className="hero__tagline" delay={160}>
                <span className="hero__tagline-prompt" aria-hidden="true">&gt;&nbsp;</span>
                <TypingAnimation />
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

            <RevealWrapper className="hero__portrait" delay={120}>
              <Image
                src="/images/moi.jpg"
                alt="Ayo Philip Odongo"
                width={280}
                height={280}
                priority
                className="hero__portrait-img"
              />
              {/* Gold corner brackets on the photo */}
              <span className="hero__portrait-corner hero__portrait-corner--tl" aria-hidden="true" />
              <span className="hero__portrait-corner hero__portrait-corner--br" aria-hidden="true" />
            </RevealWrapper>
          </div>
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
