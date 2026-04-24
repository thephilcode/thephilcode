'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { useReducedMotion, useIsTouchDevice } from './useReducedMotion';

export default function HeroStagger() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>('.split-word');
    const totalWords = words.length;

    if (reducedMotion) {
      gsap.set(words, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(words, { opacity: 0, y: 40, scale: 0.85 });

    gsap.to(words, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.1,
      ease: 'power4.out',
    });

    if (!isTouch) {
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

      const centerIndex = (totalWords - 1) / 2;

      words.forEach((word, i) => {
        const offset = (i - centerIndex) * 30;
        tl.to(word, {
          x: offset,
          opacity: 0,
          ease: 'none',
        }, 0);
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }

    return undefined;
  }, [reducedMotion, isTouch]);

  const line1 = [
    { text: 'Ayo', accent: false },
    { text: 'Philip', accent: true },
  ];
  const line2 = 'Odongo.';

  function renderWord(text: string, accent: boolean, wordIndex: number) {
    return (
      <span
        key={wordIndex}
        className="split-word"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          marginRight: '0.3em',
          paddingBottom: '0.15em',
        }}
      >
        <span
          className={accent ? 'hero__name--accent' : undefined}
          style={{
            display: 'inline-block',
          }}
        >
          {text}
        </span>
      </span>
    );
  }

  let wordIndex = 0;

  return (
    <h1 ref={ref} className="hero__name" style={{ perspective: '600px' }}>
      {line1.map((seg) => renderWord(seg.text, seg.accent, wordIndex++))}
      <br />
      {renderWord(line2, false, wordIndex++)}
    </h1>
  );
}
