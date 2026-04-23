'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SECTION_COLORS: { id: string; bg: string; glowOpacity: number }[] = [
  { id: 'hero',    bg: '#0A0A0A', glowOpacity: 0 },
  { id: 'work',    bg: '#0C0B09', glowOpacity: 0.03 },
  { id: 'about',   bg: '#0A0A0E', glowOpacity: 0.02 },
  { id: 'contact', bg: '#0D0A07', glowOpacity: 0.05 },
];

export default function ScrollColorShift() {
  useEffect(() => {
    const root = document.documentElement;
    const triggers: ScrollTrigger[] = [];

    SECTION_COLORS.forEach(({ id, bg, glowOpacity }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const proxy = { r: 0, g: 0, b: 0, glow: 0 };

      // Parse hex to rgb
      const r = parseInt(bg.slice(1, 3), 16);
      const g = parseInt(bg.slice(3, 5), 16);
      const b = parseInt(bg.slice(5, 7), 16);

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(proxy, {
            r, g, b, glow: glowOpacity,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              root.style.setProperty(
                '--color-bg-current',
                `rgb(${Math.round(proxy.r)}, ${Math.round(proxy.g)}, ${Math.round(proxy.b)})`,
              );
              root.style.setProperty('--glow-opacity', String(proxy.glow));
            },
          });
        },
        onEnterBack: () => {
          gsap.to(proxy, {
            r, g, b, glow: glowOpacity,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              root.style.setProperty(
                '--color-bg-current',
                `rgb(${Math.round(proxy.r)}, ${Math.round(proxy.g)}, ${Math.round(proxy.b)})`,
              );
              root.style.setProperty('--glow-opacity', String(proxy.glow));
            },
          });
        },
      });

      triggers.push(trigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  return null;
}
