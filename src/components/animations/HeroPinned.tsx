'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsTouchDevice, useReducedMotion } from './useReducedMotion';

interface HeroPinnedProps {
  children: React.ReactNode;
}

export default function HeroPinned({ children }: HeroPinnedProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content || isTouch || reducedMotion) return;

    const floats = wrapper.querySelectorAll<HTMLElement>('.hero__float');
    const grid = wrapper.querySelector<HTMLElement>('.hero__grid');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        start: 'top top',
        end: '+=100%',
        scrub: 0.8,
        pinSpacing: true,
      },
    });

    // Scale down and fade the main content
    tl.to(content, {
      scale: 0.85,
      opacity: 0.3,
      y: -40,
      filter: 'blur(4px)',
      ease: 'none',
    }, 0);

    // Parallax the grid
    if (grid) {
      tl.to(grid, { y: -80, ease: 'none' }, 0);
    }

    // Parallax floating elements at different speeds
    floats.forEach((el, i) => {
      const speed = [50, 120, 80, 150][i % 4];
      tl.to(el, { y: -speed, ease: 'none' }, 0);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isTouch, reducedMotion]);

  return (
    <div ref={wrapperRef} className="hero-pinned">
      {/* Architectural grid — now a real element for parallax */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Radial vignette */}
      <div className="hero__vignette" aria-hidden="true" />

      {/* Floating gold decorative elements */}
      <div className="hero__float hero__float--ring" aria-hidden="true" />
      <div className="hero__float hero__float--bracket-tl" aria-hidden="true" />
      <div className="hero__float hero__float--bracket-br" aria-hidden="true" />
      <div className="hero__float hero__float--dot" aria-hidden="true" />

      <div ref={contentRef} className="hero__pinned-content">
        {children}
      </div>
    </div>
  );
}
