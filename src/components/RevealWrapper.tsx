'use client';

import { useEffect, useRef } from 'react';

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  as?: keyof React.JSX.IntrinsicElements;
  direction?: 'up' | 'left' | 'right';
}

export default function RevealWrapper({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  direction,
}: RevealWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass = direction ? `reveal--${direction}` : '';

  return (
    // @ts-expect-error — dynamic tag with ref is intentional
    <Tag ref={ref} className={`reveal ${dirClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
