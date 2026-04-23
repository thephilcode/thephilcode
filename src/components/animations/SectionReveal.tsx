'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsTouchDevice, useReducedMotion } from './useReducedMotion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  mode?: 'clip-up' | 'clip-circle' | 'scale-up';
}

export default function SectionReveal({
  children,
  className = '',
  mode = 'scale-up',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    // Touch devices get simpler animation (no scrub)
    const useScrub = !isTouch && mode !== 'scale-up';

    const from: gsap.TweenVars = {};
    const to: gsap.TweenVars = { duration: 1, ease: 'power2.out' };

    switch (mode) {
      case 'clip-up':
        from.clipPath = 'inset(100% 0 0 0)';
        to.clipPath = 'inset(0% 0 0 0)';
        break;
      case 'clip-circle':
        from.clipPath = 'circle(0% at 50% 50%)';
        to.clipPath = 'circle(75% at 50% 50%)';
        break;
      case 'scale-up':
        from.scale = 0.92;
        from.opacity = 0;
        to.scale = 1;
        to.opacity = 1;
        break;
    }

    gsap.set(el, from);

    if (useScrub) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to(el, { ...to, ease: 'none' });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    } else {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => gsap.to(el, to),
        onLeaveBack: () => gsap.to(el, { ...from, duration: 0.4, ease: 'power2.in' }),
        onEnterBack: () => gsap.to(el, to),
        onRefresh: (self) => {
          // If already past the start point (e.g. after hydration), reveal immediately
          if (self.progress > 0) gsap.set(el, to);
        },
      });

      return () => trigger.kill();
    }
  }, [mode, isTouch, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
