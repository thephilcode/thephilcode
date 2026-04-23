'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_PHRASES = [
  'Converting Coffee to Code',
  'Building Digital Experiences',
  'Crafting Pixel-Perfect UIs',
  'Turning Ideas into Interfaces',
];

const TYPING_SPEED = 60;
const ERASING_SPEED = 35;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_ERASING = 400;

interface TypingAnimationProps {
  phrases?: string[];
}

export default function TypingAnimation({ phrases }: TypingAnimationProps) {
  const PHRASES = phrases && phrases.length > 0 ? phrases : DEFAULT_PHRASES;

  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function tick() {
      const currentPhrase = PHRASES[phraseIndex.current];

      if (isTyping) {
        if (charIndex.current < currentPhrase.length) {
          charIndex.current++;
          setDisplayed(currentPhrase.slice(0, charIndex.current));
          timeoutRef.current = setTimeout(tick, TYPING_SPEED);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            tick();
          }, PAUSE_AFTER_TYPING);
        }
      } else {
        if (charIndex.current > 0) {
          charIndex.current--;
          setDisplayed(currentPhrase.slice(0, charIndex.current));
          timeoutRef.current = setTimeout(tick, ERASING_SPEED);
        } else {
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
          timeoutRef.current = setTimeout(() => {
            setIsTyping(true);
            tick();
          }, PAUSE_AFTER_ERASING);
        }
      }
    }

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  return (
    <span className="typing">
      <span className="typing__text">{displayed}</span>
      <span className="typing__cursor" aria-hidden="true" />
    </span>
  );
}
