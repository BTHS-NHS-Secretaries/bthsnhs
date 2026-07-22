'use client';

import { useEffect, useRef, useState } from 'react';

interface TypeOnViewProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}

export default function TypeOnView({ text, className = '', speed = 55, startDelay = 0 }: TypeOnViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setVisibleChars(charIndex);
        if (charIndex >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [started, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{text.slice(0, visibleChars)}</span>
      <span className="sr-only">{text}</span>
      <span
        className={`inline-block w-[2px] md:w-[3px] h-[0.85em] -mb-0.5 ml-0.5 bg-current align-middle transition-opacity duration-500 ${
          started && !done ? 'opacity-100 animate-blinkCursor' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </span>
  );
}
