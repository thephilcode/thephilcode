'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SplitTextProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
}

export default function SplitText({
  children,
  className = '',
  as: Tag = 'span',
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLSpanElement>('.split-char');
    gsap.set(chars, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger,
          delay: delay / 1000,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(chars, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: stagger / 2,
          ease: 'power2.in',
        });
      },
      onEnterBack: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger,
          delay: delay / 1000,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, [delay, stagger]);

  const chars = children.split('').map((char, i) => (
    <span
      key={i}
      className="split-char"
      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
    >
      {char}
    </span>
  ));

  return (
    // @ts-expect-error — dynamic tag with ref
    <Tag ref={containerRef} className={className}>
      {chars}
    </Tag>
  );
}
