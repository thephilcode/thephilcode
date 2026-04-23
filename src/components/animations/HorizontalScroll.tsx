'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsTouchDevice, useReducedMotion } from './useReducedMotion';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || isTouch || reducedMotion) return;

    const totalScroll = track.scrollWidth - window.innerWidth;
    if (totalScroll <= 0) return;

    const panels = track.querySelectorAll<HTMLElement>('.hscroll__panel');
    const panelCount = panels.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top 15%',
        end: () => `+=${totalScroll}`,
        snap: panelCount > 1 ? { snapTo: 1 / (panelCount - 1), duration: 0.4, ease: 'power2.inOut' } : undefined,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: -totalScroll,
      ease: 'none',
    });

    // Scale-in each panel as it enters center
    panels.forEach((panel, i) => {
      if (i === 0) return; // First panel is already visible
      gsap.set(panel, { scale: 0.95, opacity: 0.7 });

      ScrollTrigger.create({
        trigger: panel,
        containerAnimation: tl,
        start: 'left 80%',
        end: 'left 20%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(panel, {
            scale: 0.95 + p * 0.05,
            opacity: 0.7 + p * 0.3,
          });
        },
      });
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isTouch, reducedMotion]);

  // Touch devices: native horizontal scroll
  if (isTouch) {
    return (
      <div className={`hscroll hscroll--native ${className}`}>
        <div className="hscroll__track hscroll__track--native">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`hscroll ${className}`}>
      <div ref={trackRef} className="hscroll__track">
        {children}
      </div>
    </div>
  );
}
