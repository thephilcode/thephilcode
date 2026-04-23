'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    if (!bar || !glow) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
        gsap.to(glow, { scaleX: self.progress, duration: 0.15, ease: 'power2.out' });
      },
    });

    return () => trigger.kill();
  }, []);

  const shared: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    zIndex: 200,
    pointerEvents: 'none',
  };

  return (
    <>
      <div
        ref={barRef}
        style={{
          ...shared,
          height: '2px',
          background: 'var(--color-gold)',
        }}
      />
      <div
        ref={glowRef}
        style={{
          ...shared,
          height: '6px',
          background: 'rgba(200, 169, 126, 0.4)',
          filter: 'blur(4px)',
          zIndex: 199,
        }}
      />
    </>
  );
}
