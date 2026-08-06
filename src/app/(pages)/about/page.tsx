'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import CommitteeGrid from '@/components/CommitteeGrid';
import PillarColumns from '@/components/PillarColumns';
import TypeOnView from '@/components/TypeOnView';

function ImageLightbox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-darkBlue-950/90 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors duration-200"
      >
        ×
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[90vw] sm:w-[75vw] h-[80vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gold/30"
        >
          <Image
            src="/data/images/flowchart.jpg"
            alt="NHS Application Process"
            fill
            sizes="75vw"
            className="object-contain bg-darkBlue-950"
          />
        </div>
      )}
    </div>,
    document.body
  );
}

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

export default function About() {
  const [isFlowchartOpen, setIsFlowchartOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash !== '#get-involved') return;
    const target = document.getElementById('get-involved');
    if (!target) return;

    const timeoutId = setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-darkBlue-900 to-darkBlue-950 text-white">
      <div className="absolute top-[6%] right-0 w-[34rem] h-[34rem] translate-x-1/3 rounded-full bg-blue-500/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute top-[48%] left-0 w-[36rem] h-[36rem] -translate-x-1/3 rounded-full bg-gold/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[6%] right-[8%] w-[30rem] h-[30rem] rounded-full bg-teal-500/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative">
        <FadeInSection className="max-w-7xl mx-auto px-4 pt-32">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 text-center text-white">
              <TypeOnView text="About" /> <span className="text-blue-400">NHS</span>
            </h1>
            <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full mb-6"></div>

            <div className="max-w-4xl mx-auto space-y-5">
              <p className="text-xl leading-relaxed text-gray-300">
                The National Honor Society is one of the nation&apos;s most respected student organizations,
                recognizing students who exemplify excellence in the four NHS pillars:{' '}
                <span className="font-bold text-gold">scholarship</span>,{' '}
                <span className="font-bold text-blue-400">leadership</span>,{' '}
                <span className="font-bold text-teal-400">character</span>, and{' '}
                <span className="font-bold text-gold">service</span>. The Brooklyn Technical High School
                chapter is proud to carry on that tradition, with{' '}
                <span className="font-bold text-white">600+ active members</span> dedicated to serving our
                school and the greater community.
              </p>

              <p className="text-xl leading-relaxed text-gray-300">
                Our purpose is simple: to serve both Brooklyn Tech and the wider community, whether that
                means volunteering with local organizations, tutoring and mentoring fellow students,
                supporting school faculty, or contributing to major events throughout the year. Whenever our
                school has needed a hand, our members have consistently stepped up — and that commitment is
                what continues to define who we are.
              </p>
            </div>
          </div>
        </FadeInSection>

        <section className="pt-8 pb-10">
          <FadeInSection className="max-w-7xl mx-auto px-4">
            <PillarColumns />
          </FadeInSection>
        </section>

        <section className="py-14">
          <FadeInSection className="max-w-7xl mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-5xl font-bold mb-4 text-white">
                Our <TypeOnView text="Committees" className="text-blue-400" />
              </h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-6" />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Every member finds their place in one of twelve committees — click a card to see what it does
                and how to reach its leads.
              </p>
            </div>

            <CommitteeGrid />
          </FadeInSection>
        </section>

        <section id="get-involved" className="py-14">
          <FadeInSection className="max-w-7xl mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-5xl font-bold mb-4 text-white">
                Get <TypeOnView text="Involved" className="text-blue-400" />
              </h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <FadeInSection direction="left" className="lg:col-span-3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/8 via-gold/5 to-transparent blur-2xl rounded-[2.5rem] pointer-events-none" />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/10">
                    <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-blue-400/30 rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-blue-400/30 rounded-bl-3xl" />

                    <p className="text-lg leading-relaxed text-gray-200 mb-6">
                      Want to join NHS? We welcome passionate students who are committed to making a
                      difference in our school and community. To become a member, you must apply during the
                      application period, which typically occurs in the{' '}
                      <span className="font-bold text-gold">Spring and Fall</span>. Watch out for any emails
                      in daily announcements or check our social media for updates on when applications will
                      open. We look forward to welcoming new members who share our dedication to excellence
                      and service!
                    </p>
                    <p className="text-lg leading-relaxed text-gray-200">
                      Students must have attended Brooklyn Tech for at least one school year in order to
                      apply. Freshmen may apply at the end of freshman year during the spring application
                      cycle. Applicants must have a minimum GPA of{' '}
                      <span className="font-bold text-blue-400">85</span>, taken from their transcript at
                      the end of the school year, and at least{' '}
                      <span className="font-bold text-blue-400">50 hours of community service</span>{' '}
                      (summer hours count). To meet NHS criteria, students must also earn points in four
                      categories corresponding to the four NHS pillars: Character, Scholarship, Leadership,
                      and Service. The minimum point requirements for acceptance are{' '}
                      <span className="font-bold text-teal-400">13 for Sophomores</span>,{' '}
                      <span className="font-bold text-teal-400">14 for Juniors</span>, and{' '}
                      <span className="font-bold text-teal-400">16 for Seniors</span>.
                    </p>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection direction="right" className="lg:col-span-2">
                <button
                  onClick={() => setIsFlowchartOpen(true)}
                  aria-label="Enlarge NHS application flowchart"
                  className="relative group w-full cursor-zoom-in"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 to-blue-500/10 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Image
                    src="/data/images/flowchart.jpg"
                    alt="NHS Application Process"
                    width={450}
                    height={550}
                    className="relative w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10 group-hover:ring-white/20 group-hover:scale-[1.02] transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-darkBlue-950/0 group-hover:bg-darkBlue-950/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
                      Click to enlarge
                    </span>
                  </div>
                </button>
              </FadeInSection>
            </div>

            <ImageLightbox isOpen={isFlowchartOpen} onClose={() => setIsFlowchartOpen(false)} />
          </FadeInSection>
        </section>

        <div className="pb-12" />
      </div>
    </div>
  );
}
