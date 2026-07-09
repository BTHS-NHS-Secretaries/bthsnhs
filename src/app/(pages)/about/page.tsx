'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CommitteeGrid from '@/components/CommitteeGrid';

function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
    <div
      ref={sectionRef}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="relative bg-slate-900">
      <div>
        <FadeInSection className="max-w-7xl mx-auto px-4 pt-32">
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-6 text-center text-white">
              About <span className="text-blue-400">NHS</span>
            </h1>
            <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full mb-8"></div>

            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-xl leading-relaxed text-gray-300">
                The Brooklyn Technical High School National Honor Society is a prestigious organization dedicated to fostering excellence in scholarship, leadership, character, and service. With over 600+ active members, we create meaningful opportunities for students to grow academically and make a positive impact on our school and community.
              </p>

              <p className="text-xl leading-relaxed text-gray-300">
                NHS members participate in two types of events: general organization-wide events where the entire membership comes together to celebrate and serve, and specialized committee events where smaller groups focus on specific initiatives and causes. This allows you to engage at the level that best suits your interests and schedule.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-indigo-950 py-16">
          <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4 text-center text-white">
              Our <span className="text-blue-400">Committees</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
          </div>

          <CommitteeGrid />
          </div>
        </FadeInSection>

        <FadeInSection className="bg-blue-1000 py-16">
          <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4 text-center text-white">
              Get <span className="text-blue-400">Involved</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-200 mb-6">
                Want to join NHS? We welcome passionate students who are committed to making a difference in our school and community. To become a member, you must apply during the application period, which typically occurs in the Fall and Summer. Watch out for any emails in daily announcements or check our social media for updates on when applications will open. We look forward to welcoming new members who share our dedication to excellence and service!
                <br /> <br />
                Students must have attended Brooklyn Tech for at least one school year in order to apply. Freshmen may apply at the end of Freshman year during the Spring Applications. Applicants must have a minimum GPA of 85. The GPA will be taken from the student's transcript at the end of the school year. To meet NHS criteria, students must earn points in four categories corresponding to the four NHS pillars: Character, Scholarship, Leadership, and Service. The minimum point requirements for acceptance are 13 for Sophomores, 14 for Juniors, and 16 for Seniors.
              </p>
            </div>

            <div className="flex justify-center">
              <Image
                src="/data/images/flowchart.jpg"
                alt="NHS Application Process"
                width={450}
                height={550}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
          </div>
        </FadeInSection>

        <div className="pb-12" />
      </div>
    </div>
  );
}
