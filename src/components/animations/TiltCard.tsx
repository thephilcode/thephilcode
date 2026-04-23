'use client';

import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: x * maxTilt,
        rotateX: -y * maxTilt,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    [maxTilt],
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div style={{ perspective: '800px' }}>
      <div
        ref={ref}
        className={className}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </div>
    </div>
  );
}
