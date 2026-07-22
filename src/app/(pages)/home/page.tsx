'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import PillarShowcase from '@/components/PillarShowcase';
import TypeOnView from '@/components/TypeOnView';

type FadeDirection = 'up' | 'left' | 'right';

function FadeInSection({
  children,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: FadeDirection;
}) {
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

  const hiddenTransform =
    direction === 'left' ? '-translate-x-12' : direction === 'right' ? 'translate-x-12' : 'translate-y-8';

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-700 ease-expo-out ${
        isInView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hiddenTransform}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  number,
  label,
  description,
  accentClass,
}: {
  number: string;
  label: string;
  description: string;
  accentClass: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-7 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300">
      <div className={`text-4xl font-bold mb-3 ${accentClass}`}>{number}</div>
      <h3 className="text-lg font-bold mb-2 text-white">{label}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

const COMMITTEES = [
  'Leadership & Service Committee — Drive organizational strategy and community impact',
  'Mentorship & Tutoring — Support fellow students in their academic journey',
  'Event Coordination — Plan and execute meaningful school and community events',
  'Community Service — Volunteer with local organizations and initiatives',
  '12+ Active Committees — Join a team aligned with your passions and interests',
];

const EVENTS = [
  {
    id: 'orientation',
    title: 'Freshman Orientation',
    description:
      'Welcome new students to the BTHS community with an engaging orientation event. Learn about NHS, our mission, and how to get involved in making a difference.',
    accent: {
      text: 'text-gold',
      ring: 'ring-gold/40',
      from: 'from-gold/25',
      glow: 'rgba(218,165,32,0.35)',
    },
  },
  {
    id: 'openhouse',
    title: 'Fall Open House',
    description:
      'Join us for an exciting open house where you can meet our executive board, explore our committees, and discover ways to get involved in our community.',
    accent: {
      text: 'text-blue-400',
      ring: 'ring-blue-400/40',
      from: 'from-blue-500/25',
      glow: 'rgba(96,165,250,0.35)',
    },
  },
  {
    id: 'homecoming',
    title: 'Homecoming',
    description:
      'Reconnect with NHS alumni and celebrate school spirit at our annual Homecoming celebration, filled with games, community, and Brooklyn Tech pride.',
    accent: {
      text: 'text-teal-400',
      ring: 'ring-teal-400/40',
      from: 'from-teal-500/25',
      glow: 'rgba(45,212,191,0.35)',
    },
  },
];

export default function Home() {
  return (
    <div>
      <Carousel />

      {/* About + Get Involved — one layered section instead of two disconnected blocks */}
      <FadeInSection className="relative overflow-hidden bg-gradient-to-b from-darkBlue-900 to-darkBlue-950">
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] translate-y-1/4 -translate-x-1/4 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-24">
          <h2 className="text-6xl font-bold mb-6 text-center text-white">
            <TypeOnView text="About" className="text-gold" /> BTHS NHS
          </h2>
          <div className="w-32 h-1 bg-gold mx-auto rounded-full mb-16" />

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <p className="text-2xl leading-relaxed mb-10 text-gray-200">
                Brooklyn Technical High School National Honor Society is a prestigious organization of{' '}
                <span className="font-bold text-gold">600+ members</span> dedicated to serving our school and
                community. We foster excellence in scholarship, leadership, character, and service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <StatCard
                  number="12"
                  label="Active Committees"
                  description="Each committee dedicates itself to making meaningful contributions across different aspects of school and community life."
                  accentClass="text-gold"
                />
                <StatCard
                  number="300+"
                  label="Annual Volunteer Hours"
                  description="Members contribute countless hours of service through volunteering, tutoring, mentoring, and event assistance."
                  accentClass="text-blue-400"
                />
                <StatCard
                  number="NYC"
                  label="Community Impact"
                  description="Serving beyond BTHS to make a positive impact on Brooklyn and New York City communities."
                  accentClass="text-teal-400"
                />
              </div>
            </div>

            {/* Layered "Get Involved" card — overlaps into the About column on large screens */}
            <div className="lg:col-span-2 relative lg:-ml-6 lg:mt-6">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-blue-500/10 to-transparent blur-2xl rounded-[2.5rem] pointer-events-none" />
              <div className="relative bg-gradient-to-br from-darkBlue-800/95 to-darkBlue-950/95 backdrop-blur-sm rounded-3xl p-10 border border-gold/30 shadow-2xl lg:rotate-1 hover:rotate-0 transition-transform duration-500 ease-expo-out">
                <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-gold/40 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-gold/40 rounded-bl-3xl" />

                <h3 className="text-4xl font-bold mb-8 text-white">
                  <TypeOnView text="Get Involved" />
                </h3>

                <div className="space-y-2 mb-9">
                  {COMMITTEES.map((committee) => (
                    <div
                      key={committee}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors duration-200"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-sm text-gray-200 leading-snug">{committee}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-gold text-darkBlue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(218,165,32,0.5)] transition-all duration-300"
                >
                  Learn More
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Featured Events */}
      <section className="bg-darkBlue-950 py-24">
        <FadeInSection className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-6xl font-bold mb-6 text-center text-white">
            <TypeOnView text="Featured" className="text-gold" /> Events
          </h2>
          <div className="w-32 h-1 bg-gold mx-auto rounded-full" />
        </FadeInSection>

        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {EVENTS.map((event, i) => (
            <FadeInSection key={event.id} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className={`inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4 ${event.accent.text}`}>
                    Event {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-5xl font-bold text-white mb-6">{event.title}</h3>
                  <div className={`w-16 h-1 rounded-full mb-6 bg-current ${event.accent.text}`} />
                  <p className="text-gray-300 text-xl leading-relaxed">{event.description}</p>
                </div>

                <div
                  className={`relative rounded-3xl overflow-hidden min-h-80 ring-1 ${event.accent.ring} bg-gradient-to-br ${event.accent.from} via-darkBlue-900 to-darkBlue-950 group ${
                    i % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <span
                    className={`absolute -top-8 -right-4 text-[11rem] font-black leading-none opacity-[0.08] select-none ${event.accent.text}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: event.accent.glow }}
                  />

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-6 p-16">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-4xl font-black ring-1 ${event.accent.ring} ${event.accent.text} group-hover:scale-110 transition-transform duration-500 ease-expo-out`}
                    >
                      {event.title.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Our Pillars */}
      <section className="bg-gradient-to-b from-darkBlue-950 to-darkBlue-900 py-24">
        <FadeInSection className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-6xl font-bold mb-6 text-white">
              Our <TypeOnView text="Pillars" className="text-gold" />
            </h2>
            <div className="w-32 h-1 bg-gold mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tap a pillar to explore what it means to us — and how it shows up in everything we do.
            </p>
          </div>

          <PillarShowcase />
        </FadeInSection>
      </section>

      <div className="pb-8" />
    </div>
  );
}
