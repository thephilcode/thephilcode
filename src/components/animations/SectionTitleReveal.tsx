'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsTouchDevice, useReducedMotion } from './useReducedMotion';

interface SectionTitleRevealProps {
  children: string;
  className?: string;
}

export default function SectionTitleReveal({ children, className = '' }: SectionTitleRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    if (isTouch) {
      // Simpler animation on touch
      gsap.set(el, { opacity: 0, y: 20 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6 }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, y: 20, duration: 0.3 }),
        onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6 }),
      });
      return () => trigger.kill();
    }

    gsap.set(el, {
      scale: 1.4,
      clipPath: 'inset(0 50% 0 50%)',
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 0.5,
      },
    });

    tl.to(el, {
      scale: 1,
      clipPath: 'inset(0 0% 0 0%)',
      opacity: 1,
      ease: 'none',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isTouch, reducedMotion]);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
