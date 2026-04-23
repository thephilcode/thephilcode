'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0 = no parallax, negative = slower, positive = faster
}

export default function ParallaxSection({
  children,
  className = '',
  speed = -0.15,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.fromTo(
      inner,
      { yPercent: speed * 100 },
      { yPercent: -speed * 100, ease: 'none' },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
