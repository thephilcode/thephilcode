import Image from 'next/image';
import ScrollReveal from './animations/ScrollReveal';
import HeroStagger from './animations/HeroStagger';
import HeroPinned from './animations/HeroPinned';
import GoldGlow from './animations/GoldGlow';
import MagneticButton from './animations/MagneticButton';
import TypingAnimation from './TypingAnimation';
import type { HeroSetting, Media } from '@/payload-types';

interface HeroProps {
  hero?: HeroSetting | null;
}

function getPortraitUrl(portrait: HeroSetting['portrait']): string {
  if (!portrait) return '/images/moi.jpg';
  if (typeof portrait === 'object' && (portrait as Media).url) {
    return (portrait as Media).url!;
  }
  return '/images/moi.jpg';
}

export default function Hero({ hero }: HeroProps) {
  const eyebrow = hero?.eyebrow || 'Freelance Web Developer — Uganda';
  const phrases = hero?.typingPhrases?.map(p => p.phrase).filter(Boolean) as string[] | undefined;
  const portraitUrl = getPortraitUrl(hero?.portrait);
  const portraitAlt = typeof hero?.portrait === 'object' ? (hero.portrait as Media)?.alt || 'Ayo Philip Odongo' : 'Ayo Philip Odongo';
  const primaryLabel = hero?.primaryCta?.label || 'View My Work';
  const primaryHref = hero?.primaryCta?.href || '#work';
  const secondaryLabel = hero?.secondaryCta?.label || 'GitHub';
  const secondaryHref = hero?.secondaryCta?.href || 'https://github.com/thephilcode';

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <HeroPinned>
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <div className="hero__text">
                <ScrollReveal as="p" className="hero__eyebrow">
                  {eyebrow}
                </ScrollReveal>

                <HeroStagger />

                <ScrollReveal className="hero__tagline" delay={160}>
                  <span className="hero__tagline-prompt" aria-hidden="true">&gt;&nbsp;</span>
                  <TypingAnimation phrases={phrases} />
                </ScrollReveal>

                <ScrollReveal className="hero__actions" delay={240}>
                  <MagneticButton href={primaryHref} className="btn btn-primary">
                    {primaryLabel}
                  </MagneticButton>
                  <MagneticButton
                    href={secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    {secondaryLabel}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M1 11L11 1M11 1H4M11 1V8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </MagneticButton>
                </ScrollReveal>
              </div>

              <ScrollReveal className="hero__portrait" delay={120}>
                <GoldGlow
                  pulse
                  size={400}
                  intensity={0.12}
                  className="hero__portrait-glow"
                />
                <Image
                  src={portraitUrl}
                  alt={portraitAlt}
                  width={280}
                  height={280}
                  priority
                  className="hero__portrait-img"
                />
                <span className="hero__portrait-corner hero__portrait-corner--tl" aria-hidden="true" />
                <span className="hero__portrait-corner hero__portrait-corner--br" aria-hidden="true" />
              </ScrollReveal>
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
      </HeroPinned>
    </section>
  );
}
