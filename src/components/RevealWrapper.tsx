'use client';

import { useEffect, useRef } from 'react';

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  as?: keyof React.JSX.IntrinsicElements;
}

export default function RevealWrapper({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: RevealWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Honour the delay before adding visible
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

  return (
    // @ts-expect-error — dynamic tag with ref is intentional
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
