'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import PillarCard from '@/components/PillarCard';
import { desc } from 'framer-motion/client';

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

export default function Home() {
  const events = [
    {
      id: 'orientation',
      title: 'Freshman Orientation',
      description: 'Welcome new students to the BTHS community with an engaging orientation event. Learn about NHS, our mission, and how to get involved in making a difference.',
      icon: '',
      bg: 'bg-indigo-700',
    },
    {
      id: 'openhouse',
      title: 'Fall Open House',
      description: 'Join us for an exciting open house where you can meet our executive board, explore our committees, and discover ways to get involved in our community.',
      icon: '',
      bg: 'bg-blue-700',
    },
    {
      id: 'HomeComing',
      title: "Testing",
      description: "testing",
      icon: " ",
      bg: 'bg-blue-700'
    }
  ];

  return (
    <div className="">
      <div>
        <Carousel />

      <FadeInSection className="max-w-7xl mx-auto px-4 pt-32">
        <div className="mb-12">
          <h2 className="text-6xl font-bold mb-6 text-center text-white">
            <span className="text-blue-400 typing-text">About</span> BTHS NHS
          </h2>
          <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full mb-8"></div>
          
          <p className="text-2xl leading-relaxed text-center max-w-4xl mx-auto mb-12 text-gray-200">
            Brooklyn Technical High School National Honor Society is a prestigious organization of <span className="font-bold text-blue-400">600+ members</span> dedicated to serving our school and community. We foster excellence in scholarship, leadership, character, and service.
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-indigo-900 p-10 rounded-2xl shadow-lg border border-indigo-700">
              <div className="text-5xl font-bold text-blue-300 mb-4">12</div>
              <h3 className="text-3xl font-bold mb-4 text-white">Active Committees</h3>
              <p className="text-gray-300 text-lg">Each committee dedicates itself to making meaningful contributions across different aspects of school and community life.</p>
            </div>

            <div className="bg-blue-900 p-10 rounded-2xl shadow-lg border border-blue-700">
              <div className="text-5xl font-bold text-blue-300 mb-4">300+</div>
              <h3 className="text-3xl font-bold mb-4 text-white">Annual Volunteer Hours</h3>
              <p className="text-gray-300 text-lg">Members contribute countless hours of service through volunteering, tutoring, mentoring, and event assistance.</p>
            </div>

            <div className="bg-slate-800 p-10 rounded-2xl shadow-lg border border-slate-700">
              <div className="text-5xl font-bold text-blue-300 mb-4">NYC</div>
              <h3 className="text-3xl font-bold mb-4 text-white">Community Impact</h3>
              <p className="text-gray-300 text-lg">Serving beyond BTHS to make a positive impact on Brooklyn and New York City communities.</p>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-[#F6FAFD] py-20">
        <div className="bg-indigo-900 rounded-3xl p-16 max-w-3xl mx-auto border border-indigo-700">
          <h3 className="text-5xl font-bold mb-10 text-white typing-text">Get Involved</h3>
          <div className="space-y-5 mb-10">
            <div className="flex gap-4 text-gray-200">
              <span className="text-blue-400 text-2xl">•</span>
              <span className="text-lg">Leadership & Service Committee - Drive organizational strategy and community impact</span>
            </div>
            <div className="flex gap-4 text-gray-200">
              <span className="text-blue-400 text-2xl">•</span>
              <span className="text-lg">Mentorship & Tutoring - Support fellow students in their academic journey</span>
            </div>
            <div className="flex gap-4 text-gray-200">
              <span className="text-blue-400 text-2xl">•</span>
              <span className="text-lg">Event Coordination - Plan and execute meaningful school and community events</span>
            </div>
            <div className="flex gap-4 text-gray-200">
              <span className="text-blue-400 text-2xl">•</span>
              <span className="text-lg">Community Service - Volunteer with local organizations and initiatives</span>
            </div>
            <div className="flex gap-4 text-gray-200">
              <span className="text-blue-400 text-2xl">•</span>
              <span className="text-lg">12+ Active Committees - Join a team aligned with your passions and interests</span>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-block bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Learn More
          </Link>
        </div>
      </FadeInSection>

      {/* Events Section */}
      <FadeInSection className="bg-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-6xl font-bold mb-6 text-center text-white">
            <span className="text-blue-400 typing-text">Featured</span> Events
          </h2>
          <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {events.map((event, i) => (
            <div key={event.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="text-5xl font-bold text-white mb-6">{event.title}</h3>
                <p className="text-gray-300 text-xl leading-relaxed mb-8">
                  {event.description}
                </p>
              </div>

              <div
                className={`rounded-3xl flex flex-col items-center justify-center text-center gap-8 min-h-80 relative overflow-hidden ${i % 2 === 1 ? "lg:order-1" : ""} ${event.bg}`}
              >
                <div className="relative z-10 p-16 flex flex-col items-center gap-8 w-full">
                  <div className="w-28 h-28 rounded-3xl bg-white/20 flex items-center justify-center text-white text-6xl">
                    
                  </div>
                  <p className="font-black text-4xl text-white leading-tight max-w-xs">
                    
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Our Pillars Section */}
      <FadeInSection className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-6xl font-bold mb-6 text-center text-white">
            Our <span className="text-blue-400 typing-text">Pillars</span>
          </h2>
          <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full mb-10"></div>
          <p className="text-center text-gray-300 text-xl max-w-2xl mx-auto">

          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PillarCard
            title="Character"
            description="Integrity & Diversity"
            details="We value diverse cultures and build relationships with integrity, honesty, and perseverance. Character is the foundation of all that we do, shaping how we interact with others and contribute to our community."
          />
          <PillarCard
            title="Leadership"
            description="Action & Responsibility"
            details="We take ownership of our actions and serve as agents of change. Leadership means inspiring others, making bold decisions, and creating positive momentum in everything we undertake."
          />
          <PillarCard
            title="Scholarship"
            description="Excellence & Learning"
            details="We are committed to intellectual growth and educational excellence. Through continuous learning and curiosity, we develop the knowledge and skills needed to make informed contributions to society."
          />
          <PillarCard
            title="Service"
            description="Impact & Compassion"
            details="We engage in meaningful service with a genuine desire to help others and create lasting positive impact. Service is how we demonstrate our values and make our community stronger."
          />
        </div>
        </div>
      </FadeInSection>

      <div className="pb-8" />
      </div>
    </div>
  );
}
