'use client';

import { useEffect, useRef, useState } from 'react';

interface Pillar {
  slug: string;
  title: string;
  description: string;
  details: string;
  accent: string;
  gradient: string;
  span: string;
}

const PILLARS: Pillar[] = [
  {
    slug: 'character',
    title: 'Character',
    description: 'Integrity & Diversity',
    details:
      'We value diverse cultures and build relationships with integrity, honesty, and perseverance. Character is the foundation of all that we do, shaping how we interact with others and contribute to our community.',
    accent: '#DAA520',
    gradient: 'from-amber-500/30 via-darkBlue-900 to-darkBlue-950',
    span: 'md:col-span-5',
  },
  {
    slug: 'leadership',
    title: 'Leadership',
    description: 'Action & Responsibility',
    details:
      'We take ownership of our actions and serve as agents of change. Leadership means inspiring others, making bold decisions, and creating positive momentum in everything we undertake.',
    accent: '#60A5FA',
    gradient: 'from-blue-500/30 via-darkBlue-900 to-darkBlue-950',
    span: 'md:col-span-7',
  },
  {
    slug: 'scholarship',
    title: 'Scholarship',
    description: 'Excellence & Learning',
    details:
      'We are committed to intellectual growth and educational excellence. Through continuous learning and curiosity, we develop the knowledge and skills needed to make informed contributions to society.',
    accent: '#2DD4BF',
    gradient: 'from-teal-500/30 via-darkBlue-900 to-darkBlue-950',
    span: 'md:col-span-7',
  },
  {
    slug: 'service',
    title: 'Service',
    description: 'Impact & Compassion',
    details:
      'We engage in meaningful service with a genuine desire to help others and create lasting positive impact. Service is how we demonstrate our values and make our community stronger.',
    accent: '#FB923C',
    gradient: 'from-orange-500/30 via-darkBlue-900 to-darkBlue-950',
    span: 'md:col-span-5',
  },
];

function PillarTile({ pillar, index, isInView }: { pillar: Pillar; index: number; isInView: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsOpen((v) => !v)}
      aria-expanded={isOpen}
      className={`group relative ${pillar.span} rounded-3xl overflow-hidden text-left ring-1 ring-white/10 hover:ring-2 shadow-lg hover:shadow-2xl transition-all duration-500 ease-expo-out min-h-[300px] md:min-h-[340px] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isInView ? `${index * 120}ms` : '0ms',
        ['--tw-ring-color' as string]: `${pillar.accent}80`,
      }}
    >
      {/* Fallback gradient base layer, always present */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient}`} />

      {/* Optional real photo — drop a file at public/data/images/pillars/{slug}.jpg to replace the gradient */}
      <img
        src={`/data/images/pillars/${pillar.slug}.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-expo-out"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue-950/95 via-darkBlue-950/50 to-darkBlue-950/10" />

      <div className="relative h-full flex flex-col justify-end p-7 md:p-9">
        <span
          className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-1"
          style={{ color: pillar.accent }}
        >
          {pillar.description}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">{pillar.title}</h3>

        <div
          className={`grid transition-all duration-500 ease-expo-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
        >
          <p className="overflow-hidden text-gray-200 text-sm md:text-base leading-relaxed pr-2">
            {pillar.details}
          </p>
        </div>

        <span
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
          style={{ color: pillar.accent }}
        >
          {isOpen ? 'Show less' : 'Learn more'}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </button>
  );
}

export default function PillarShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {PILLARS.map((pillar, index) => (
        <PillarTile key={pillar.slug} pillar={pillar} index={index} isInView={isInView} />
      ))}
    </div>
  );
}
