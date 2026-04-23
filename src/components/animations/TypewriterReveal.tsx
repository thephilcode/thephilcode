'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TypewriterRevealProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function TypewriterReveal({
  text,
  className = '',
  speed = 50,
}: TypewriterRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState('');
  const hasPlayed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasPlayed.current) return;
        hasPlayed.current = true;

        let i = 0;
        const interval = setInterval(() => {
          i++;
          setDisplayed(text.slice(0, i));
          if (i >= text.length) clearInterval(interval);
        }, speed);
      },
    });

    return () => trigger.kill();
  }, [text, speed]);

  return (
    <p ref={ref} className={className} style={{ minHeight: '1.2em' }}>
      {displayed}
      {displayed.length < text.length && displayed.length > 0 && (
        <span className="typewriter-cursor" aria-hidden="true" />
      )}
    </p>
  );
}
