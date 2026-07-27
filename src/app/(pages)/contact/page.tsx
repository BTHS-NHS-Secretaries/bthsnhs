'use client';

import { useState } from 'react';
import { ChevronDown, Mail, MapPin, MessageCircle, Link2, Instagram, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  accent: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How do I join NHS?',
    answer: 'Visit the details page, applications for new members come every Summer and Fall.',
    accent: 'gold',
  },
  {
    question: 'When are your meetings?',
    answer:
      'We hold mandatory monthly meetings general meetings through the year, as well you must attend your commitee specific monthly meetings.',
    accent: 'blue',
  },
  {
    question: 'What is the time commitment for NHS members?',
    answer: 'NHS is a moderate time commitment, you must attend monthly meetings and participate in your committees work. There are also many volunteering or in person events that you can attend to gain general points to be readmitted.',
    accent: 'teal',
  },
  {
    question: 'What are some of the benefits of joining NHS?',
    answer: 'NHS is a great way to get involved in get involved in our schools events and community, as most of those volunteers come from NHS. Each of the committees also does their own work and events.',
    accent: 'gold',
  }
];

const accentStyles: Record<string, { text: string; ring: string; bg: string }> = {
  gold: { text: 'text-gold', ring: 'ring-gold/30', bg: 'bg-gold/10' },
  blue: { text: 'text-blue-400', ring: 'ring-blue-400/30', bg: 'bg-blue-400/10' },
  teal: { text: 'text-teal-400', ring: 'ring-teal-400/30', bg: 'bg-teal-400/10' },
};

function FAQAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqItems.map((item, index) => {
        const accent = accentStyles[item.accent];
        const isOpen = expandedIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl bg-darkBlue-800/50 backdrop-blur-sm border transition-colors duration-300 ${
              isOpen ? 'border-white/20' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 flex items-center gap-4 text-left group"
            >
              <span className={`flex-shrink-0 w-9 h-9 rounded-full ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center`}>
                <HelpCircle size={18} className={accent.text} />
              </span>
              <h3 className="flex-1 text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                {item.question}
              </h3>
              <ChevronDown
                size={22}
                className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-expo-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pl-[4.25rem]">
                  <p className="text-gray-300 text-base leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-darkBlue-900 to-darkBlue-950 text-white">
      <div className="absolute top-[4%] right-0 w-[34rem] h-[34rem] translate-x-1/3 rounded-full bg-blue-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] left-0 w-[36rem] h-[36rem] -translate-x-1/3 rounded-full bg-gold/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[6%] right-[8%] w-[30rem] h-[30rem] rounded-full bg-teal-500/[0.05] blur-[120px] pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-6 pt-32">
        <div className="mb-24 space-y-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">
              Get In <span className="text-gold">Touch</span>
            </h1>
            <div className="w-32 h-1 bg-gold mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Questions, ideas, or just want to say hi? Here's every way to reach the BTHS NHS team.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gold mb-2 text-center">Contact Us</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full opacity-50 mb-8" />
            <p className="text-center text-lg text-gray-300 mb-8">
              Reach out to our leadership team directly
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="group relative text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-gold/40 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <Mail size={20} className="text-gold" />
                </div>
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Upper Leadership</p>
                <a
                  href="mailto:leadership@bthsnhs.org"
                  className="text-gold text-lg hover:text-yellow-300 transition-colors break-all font-semibold"
                >
                  leadership@bthsnhs.org
                </a>
              </div>
              <div className="group relative text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-gold/40 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <Mail size={20} className="text-gold" />
                </div>
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Secretaries</p>
                <a
                  href="mailto:secretaries@bthsnhs.org"
                  className="text-gold text-lg hover:text-yellow-300 transition-colors break-all font-semibold"
                >
                  secretaries@bthsnhs.org
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gold mb-2 text-center">Location</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full opacity-50 mb-8" />
            <p className="text-center text-lg text-gray-300 mb-8">
              Visit us at Brooklyn Technical High School
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/15 via-blue-500/10 to-transparent blur-2xl rounded-[2rem] pointer-events-none" />
              <div className="relative text-center p-8 bg-darkBlue-800/60 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300">
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl" />
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center">
                  <MapPin size={26} className="text-gold" />
                </div>
                <p className="text-white text-xl leading-relaxed">
                  Brooklyn Technical High School
                  <br />
                  <span className="text-gold">29 Fort Greene Place</span>
                  <br />
                  <span className="text-gold">Brooklyn, NY 11217</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-16">
            <h2 className="text-5xl font-bold text-gold mb-2 text-center">FAQ</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full opacity-50 mb-12" />
            <FAQAccordion />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gold mb-2 text-center">Follow Us</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full opacity-50 mb-8" />
            <p className="text-center text-lg text-gray-300 mb-8">
              Stay updated with our latest news and events
            </p>
            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              <a
                href="https://discord.gg/Nk8JSy5uqK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/50 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300 text-blue-400 text-lg font-semibold hover:shadow-lg hover:shadow-blue-400/20"
              >
                <MessageCircle size={20} />
                Discord
              </a>
              <a
                href="https://bthsnhs.carrd.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-teal-400/50 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300 text-teal-400 text-lg font-semibold hover:shadow-lg hover:shadow-teal-400/20"
              >
                <Link2 size={20} />
                Carrd
              </a>
              <a
                href="https://instagram.com/BTHSNHS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-gold/50 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300 text-gold text-lg font-semibold hover:shadow-lg hover:shadow-gold/20"
              >
                <Instagram size={20} />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
