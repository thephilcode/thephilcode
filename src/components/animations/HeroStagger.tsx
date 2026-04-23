'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroStagger() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLSpanElement>('.split-char');
    const totalChars = chars.length;
    const centerIndex = totalChars / 2;

    gsap.set(chars, { opacity: 0, y: 30, rotateX: -40 });

    // Initial entrance stagger
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      stagger: 0.035,
      delay: 0.15,
      ease: 'power3.out',
    });

    // Dissolve on scroll (during hero pin)
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: '+=100%',
        scrub: 0.8,
      },
    });

    chars.forEach((char, i) => {
      const offset = (i - centerIndex) * 4;
      tl.to(char, {
        x: offset,
        opacity: 0,
        letterSpacing: '0.15em',
        ease: 'none',
      }, 0);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const line1 = [
    { text: 'Ayo ', accent: false },
    { text: 'Philip', accent: true },
  ];
  const line2 = 'Odongo.';

  let charIndex = 0;

  function renderChars(text: string, accent: boolean) {
    return text.split('').map((char) => {
      const idx = charIndex++;
      return (
        <span
          key={idx}
          className={`split-char${accent ? ' hero__name--accent' : ''}`}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char}
        </span>
      );
    });
  }

  return (
    <h1 ref={ref} className="hero__name" style={{ perspective: '600px' }}>
      {line1.map((seg) => renderChars(seg.text, seg.accent))}
      <br />
      {renderChars(line2, false)}
    </h1>
  );
}
