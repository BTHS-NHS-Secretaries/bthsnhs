'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Pillar {
  title: string;
  tagline: string;
  description: string;
  accent: string;
  glow: string;
  tilt: number;
}

const PILLARS: Pillar[] = [
  {
    title: 'Character',
    tagline: 'Integrity & Diversity',
    description:
      'Character is the foundation every NHS member is chosen for — students who lead with integrity, honesty, and respect for the diverse community around them. From the moment members take part in our Induction Ceremony, they commit to upholding these values in everything they do.',
    accent: 'text-gold',
    glow: 'rgba(218,165,32,0.5)',
    tilt: -7,
  },
  {
    title: 'Leadership',
    tagline: 'Action & Responsibility',
    description:
      'Leadership means taking initiative and owning the direction of our chapter. Members can pursue one of over 40 executive positions, planning and running major events from Freshman Orientation to our year-end Installation Ceremony.',
    accent: 'text-blue-400',
    glow: 'rgba(96,165,250,0.5)',
    tilt: 5,
  },
  {
    title: 'Scholarship',
    tagline: 'Excellence & Learning',
    description:
      'Scholarship reflects our members’ commitment to academic excellence, holding themselves to some of the highest standards at Brooklyn Tech — proof that service and leadership go hand-in-hand with a dedication to learning.',
    accent: 'text-teal-400',
    glow: 'rgba(45,212,191,0.5)',
    tilt: -4,
  },
  {
    title: 'Service',
    tagline: 'Impact & Compassion',
    description:
      'Service is where NHS shows up for our school and community — tutoring students, mentoring newcomers, and assisting faculty at events like Open House, Homecoming, and Parent-Teacher Conferences, plus book, food, and clothing drives throughout the year.',
    accent: 'text-violet-400',
    glow: 'rgba(167,139,250,0.5)',
    tilt: 6,
  },
];

export default function PillarColumns() {
  // Hover previews on desktop; a click/tap locks a pillar open independent of
  // hover, so a tap on mobile doesn't get cancelled by the synthetic
  // mouseleave that touch browsers fire alongside touch events.
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const activeIndex = lockedIndex ?? hoverIndex;
  const active = activeIndex !== null ? PILLARS[activeIndex] : null;

  return (
    <div className="relative">
      <div className="relative flex items-center justify-center" onMouseLeave={() => setHoverIndex(null)}>
        <div
          className={`absolute -inset-x-12 -inset-y-10 rounded-[3rem] backdrop-blur-sm transition-opacity duration-500 pointer-events-none ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative h-[240px] sm:h-[290px] md:h-[340px] w-full flex items-end justify-center gap-6 sm:gap-10 md:gap-16">
          {/* Resting prompt — sits where a lifted pillar rises into, so it's
              visually covered as well as faded out once something's active. */}
          <p
            className={`absolute -top-2 sm:-top-1 left-1/2 -translate-x-1/2 z-[5] text-base sm:text-lg text-gray-500 transition-opacity duration-500 pointer-events-none ${
              active ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Hover or tap a pillar to see what it means to us.
          </p>

          {active && (
            <div
              className="absolute left-1/2 top-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
              style={{ background: active.glow, opacity: 0.3 }}
            />
          )}

          {PILLARS.map((pillar, index) => {
            const isActive = index === activeIndex;
            const isDimmed = active !== null && !isActive;
            const textOnRight = index < 2;

            return (
              <div key={pillar.title} className="relative" style={{ zIndex: isActive ? 20 : 1 }}>
                <button
                  type="button"
                  onMouseEnter={() => setHoverIndex(index)}
                  onFocus={() => setHoverIndex(index)}
                  onClick={() => setLockedIndex((cur) => (cur === index ? null : index))}
                  aria-label={`${pillar.title} — ${pillar.tagline}`}
                  className="relative flex flex-col items-center transition-all duration-500 ease-expo-out"
                  style={{
                    transform: isActive
                      ? `translateY(-20px) rotate(${pillar.tilt}deg) scale(1.08)`
                      : 'translateY(24px) rotate(0deg) scale(1)',
                    filter: isDimmed ? 'blur(3px)' : 'blur(0px)',
                    opacity: isDimmed ? 0.45 : 1,
                  }}
                >
                  <div className="relative">
                    <div
                      className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-darkBlue-950 transition-opacity duration-500 pointer-events-none"
                      style={{ opacity: isActive ? 0 : 1 }}
                    />
                    <Image
                      src="/data/images/pillar.png"
                      alt=""
                      width={120}
                      height={464}
                      className="w-11 sm:w-14 md:w-20 h-auto drop-shadow-[0_20px_16px_rgba(0,0,0,0.5)]"
                      priority={index === 0}
                    />
                  </div>
                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? pillar.accent : 'text-gray-500'
                    }`}
                  >
                    {pillar.title}
                  </span>
                </button>

                {/* Side description — tied to this specific pillar, not the
                    transformed image, so it never tilts/scales with it. */}
                <div
                  className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-60 pointer-events-none transition-all duration-500 ease-expo-out ${
                    textOnRight ? 'left-full ml-6' : 'right-full mr-6'
                  } ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : `opacity-0 ${textOnRight ? '-translate-x-3' : 'translate-x-3'}`
                  }`}
                >
                  <p className={`text-sm font-bold uppercase tracking-[0.2em] mb-1.5 ${pillar.accent}`}>
                    {pillar.tagline}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{pillar.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed drop-shadow-lg">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/tablet: description takes normal flow below the columns instead
          of floating beside them, so it doesn't overlap whatever comes next. */}
      <div className="lg:hidden px-4">
        <div
          className={`grid transition-all duration-500 ease-expo-out ${
            active ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
        >
          <div className="overflow-hidden text-center">
            {active && (
              <>
                <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-2 ${active.accent}`}>
                  {active.tagline}
                </p>
                <h3 className="text-2xl font-bold text-white mb-2">{active.title}</h3>
                <p className="text-gray-300 leading-relaxed max-w-md mx-auto pb-1">{active.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
