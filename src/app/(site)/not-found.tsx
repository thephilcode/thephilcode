'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import MagneticButton from '@/components/animations/MagneticButton';

const PARTICLES = [
  { left: '12%', top: '18%', dur: 3.0, delay: 0.0 },
  { left: '78%', top: '32%', dur: 3.5, delay: 0.4 },
  { left: '55%', top: '72%', dur: 3.2, delay: 0.8 },
  { left: '25%', top: '61%', dur: 4.0, delay: 0.2 },
  { left: '88%', top: '80%', dur: 3.8, delay: 1.0 },
];

export default function NotFound() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nf-digit', {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.9, ease: 'power3.out',
      });
      gsap.from('.nf-message', {
        opacity: 0, y: 24, duration: 0.8, delay: 0.45, ease: 'power3.out',
      });
      gsap.from('.nf-actions', {
        opacity: 0, scale: 0.92, duration: 0.6, delay: 0.8, ease: 'back.out(1.2)',
      });
    }, bodyRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="not-found">
      <header className="not-found__header">
        <Link href="/" className="not-found__logo">THEPHILCODE</Link>
      </header>

      <div className="not-found__grid" />

      <div ref={bodyRef} className="not-found__body">
        <div className="not-found__particles">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="not-found__particle"
              style={{
                left: p.left,
                top: p.top,
                animation: `nf-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="not-found__digits">
          <span className="not-found__digit nf-digit">4</span>
          <div className="not-found__zero nf-digit">
            <div className="not-found__zero-ring" />
            <div className="not-found__zero-inner" />
            <div className="not-found__zero-dot" />
          </div>
          <span className="not-found__digit nf-digit">4</span>
        </div>

        <div className="not-found__message nf-message">
          <h1 className="not-found__heading">Lost in the Void</h1>
          <p className="not-found__subtext">
            This page doesn&rsquo;t exist. But the work does &mdash; it&rsquo;s one click away.
          </p>
          <p className="not-found__code">Error 404 &middot; Page Not Found</p>
        </div>

        <div className="not-found__actions nf-actions">
          <MagneticButton as="a" href="/" className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </MagneticButton>
          <MagneticButton as="a" href="/projects" className="btn btn-outline">
            View Work
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
