'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);
gsap.defaults({ ease: 'power3.out' });
ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <>{children}</>;
}
