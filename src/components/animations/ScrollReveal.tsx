'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  direction?: 'up' | 'left' | 'right';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = {
      opacity: 1,
      duration: 0.6,
      delay: delay / 1000,
      ease: 'power2.out',
    };

    switch (direction) {
      case 'left':
        from.x = -40;
        to.x = 0;
        break;
      case 'right':
        from.x = 40;
        to.x = 0;
        break;
      default: // 'up'
        from.y = 20;
        to.y = 0;
        break;
    }

    gsap.set(el, from);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      end: 'top 10%',
      onEnter: () => gsap.to(el, to),
      onLeaveBack: () => gsap.to(el, { ...from, duration: 0.3, ease: 'power2.in' }),
      onEnterBack: () => gsap.to(el, to),
    });

    return () => {
      trigger.kill();
    };
  }, [delay, direction]);

  return (
    // @ts-expect-error — dynamic tag with ref is intentional
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
