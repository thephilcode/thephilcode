'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GoldGlowProps {
  className?: string;
  size?: number;
  pulse?: boolean;
  intensity?: number;
}

export default function GoldGlow({
  className = '',
  size = 200,
  pulse = false,
  intensity = 0.15,
}: GoldGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scale: 0, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        });

        if (pulse) {
          gsap.to(el, {
            scale: 1.08,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.2,
          });
        }
      },
      onLeaveBack: () => {
        gsap.killTweensOf(el);
        gsap.to(el, { scale: 0, opacity: 0, duration: 0.4 });
      },
      onEnterBack: () => {
        gsap.to(el, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        });

        if (pulse) {
          gsap.to(el, {
            scale: 1.08,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.2,
          });
        }
      },
    });

    return () => {
      gsap.killTweensOf(el);
      trigger.kill();
    };
  }, [pulse]);

  return (
    <div
      ref={ref}
      className={`gold-glow ${className}`}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(200, 169, 126, ${intensity}) 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
