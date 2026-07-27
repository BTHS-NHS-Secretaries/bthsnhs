'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Handshake,
  GraduationCap,
  HeartHandshake,
  PiggyBank,
  Award,
  Lightbulb,
  Megaphone,
  UsersRound,
  Leaf,
  Compass,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import CommitteeModal from './CommitteeModal';

interface Committee {
  name: string;
  description: string;
  email?: string;
}

export type Accent = 'gold' | 'blue' | 'teal';

export const accentStyles: Record<Accent, { text: string; ring: string; bg: string; glow: string; hoverBorder: string }> = {
  gold: {
    text: 'text-gold',
    ring: 'ring-gold/30',
    bg: 'from-gold/20 to-gold/5',
    glow: 'group-hover:shadow-gold/20',
    hoverBorder: 'hover:border-gold/60',
  },
  blue: {
    text: 'text-blue-400',
    ring: 'ring-blue-400/30',
    bg: 'from-blue-400/20 to-blue-400/5',
    glow: 'group-hover:shadow-blue-400/20',
    hoverBorder: 'hover:border-blue-400/60',
  },
  teal: {
    text: 'text-teal-400',
    ring: 'ring-teal-400/30',
    bg: 'from-teal-400/20 to-teal-400/5',
    glow: 'group-hover:shadow-teal-400/20',
    hoverBorder: 'hover:border-teal-400/60',
  },
};

// Icon + accent chosen per committee so the grid reads as a set of distinct
// "departments" rather than identical gray boxes.
const COMMITTEE_STYLE: Record<string, { icon: LucideIcon; accent: Accent }> = {
  'Alumni Services': { icon: Users, accent: 'gold' },
  'Club Team Council': { icon: Handshake, accent: 'blue' },
  'College Services': { icon: GraduationCap, accent: 'teal' },
  'Community Services': { icon: HeartHandshake, accent: 'gold' },
  Fundraising: { icon: PiggyBank, accent: 'blue' },
  Induction: { icon: Award, accent: 'teal' },
  Mentoring: { icon: Lightbulb, accent: 'gold' },
  Outreach: { icon: Megaphone, accent: 'blue' },
  'Parent Services': { icon: UsersRound, accent: 'teal' },
  'School Environment Services': { icon: Leaf, accent: 'gold' },
  Tours: { icon: Compass, accent: 'blue' },
  Tutoring: { icon: BookOpen, accent: 'teal' },
};

const DEFAULT_STYLE = { icon: Users, accent: 'gold' as Accent };

export default function CommitteeGrid() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadCommittees = async () => {
      try {
        const response = await fetch('/data/committees.json');
        const data = await response.json();
        setCommittees(data);
      } catch (error) {
        console.error('Error loading committees:', error);
      }
    };

    loadCommittees();
  }, []);

  const handleBoxClick = (committee: Committee) => {
    setSelectedCommittee(committee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCommittee(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
        {committees.map((committee, index) => {
          const { icon: Icon, accent } = COMMITTEE_STYLE[committee.name] ?? DEFAULT_STYLE;
          const style = accentStyles[accent];

          return (
            <button
              key={committee.name}
              onClick={() => handleBoxClick(committee)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-7 min-h-32 sm:min-h-36 md:min-h-44 cursor-pointer text-left transition-all duration-300 border border-white/10 ${style.hoverBorder} hover:-translate-y-1.5 hover:bg-white/[0.08] hover:shadow-2xl ${style.glow}`}
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${style.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${style.bg} ring-1 ${style.ring} flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={18} className={style.text} />
                </div>

                <h3 className="text-sm sm:text-base md:text-xl font-bold text-white group-hover:text-white transition-colors duration-300 leading-snug">
                  {committee.name}
                </h3>

                <span
                  className={`mt-auto pt-4 text-xs font-semibold uppercase tracking-widest ${style.text} opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 hidden md:block`}
                >
                  Learn more →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <CommitteeModal
        committee={selectedCommittee}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        style={selectedCommittee ? COMMITTEE_STYLE[selectedCommittee.name] ?? DEFAULT_STYLE : DEFAULT_STYLE}
      />
    </>
  );
}
