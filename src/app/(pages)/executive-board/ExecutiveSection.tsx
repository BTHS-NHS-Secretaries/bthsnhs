'use client';

import { useEffect, useRef, useState } from 'react';
import ExecutiveCard from './ExecutiveCard';

interface Executive {
  id: string;
  role: string;
  name: string;
  major: string;
  image: string;
  favoriteColor: string;
  favoriteFood: string;
  bucketListAnswer: string;
}

interface ExecutiveSectionProps {
  title: string;
  members: Executive[];
  prioritizeImages?: boolean;
}

export default function ExecutiveSection({ title, members, prioritizeImages = false }: ExecutiveSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`mb-24 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`mb-16 transition-all duration-700 ease-expo-out delay-100 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}>
        <h2 className="text-5xl font-bold text-gold mb-3">{title}</h2>
        <div className="w-12 h-2 bg-gold rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {members.map((executive, index) => {
          // Stagger in a diagonal wave keyed off column position (mod max columns)
          // instead of raw index, so large sections don't end with a multi-second tail delay.
          const column = index % 5;
          const row = Math.floor(index / 5);
          const delay = 80 + column * 70 + row * 50;

          return (
            <div
              key={executive.id}
              className={`transition-all duration-[600ms] ease-expo-out ${
                isInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-6 scale-95'
              }`}
              style={{
                transitionDelay: isInView ? `${delay}ms` : '0ms',
              }}
            >
              <ExecutiveCard executive={executive} priority={prioritizeImages && index < 4} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
