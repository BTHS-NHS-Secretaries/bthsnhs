'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, X, type LucideIcon } from 'lucide-react';
import { accentStyles, type Accent } from './CommitteeGrid';

interface CommitteeModalProps {
  committee: {
    name: string;
    description: string;
    email?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  style: { icon: LucideIcon; accent: Accent };
}

export default function CommitteeModal({ committee, isOpen, onClose, style }: CommitteeModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape, in addition to clicking outside the card.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!committee || !isOpen) return null;

  const Icon = style.icon;
  const accent = accentStyles[style.accent];

  return createPortal(
    <>
      {/* Single full-viewport layer handles both the backdrop and the
          click-outside-to-close — clicking anywhere that isn't the card
          (including the flex gutters around it) closes the modal. */}
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative bg-darkBlue-800 rounded-2xl border border-white/10 shadow-2xl w-full h-[85vh] max-w-4xl overflow-y-auto scrollbar-hide animate-slideIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className={`relative overflow-hidden bg-gradient-to-br ${accent.bg} border-b border-white/10 px-10 sm:px-12 py-14`}>
            <div className={`absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br ${accent.bg} blur-3xl pointer-events-none`} />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10 rounded-tr-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-darkBlue-900/60 ring-1 ${accent.ring} flex items-center justify-center mb-6`}>
                <Icon size={28} className={accent.text} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">{committee.name}</h2>
              <div className={`w-16 h-1 rounded-full mt-6 bg-current ${accent.text} opacity-70`} />
            </div>
          </div>

          {/* Content */}
          <div className="px-10 sm:px-12 py-10">
            <p className="text-gray-200 text-lg leading-relaxed">{committee.description}</p>

            {committee.email && (
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${accent.text}`}>
                  Get in touch
                </p>
                <a
                  href={`mailto:${committee.email}`}
                  className="inline-flex items-center gap-3 group"
                >
                  <span className={`w-10 h-10 rounded-full bg-darkBlue-900 ring-1 ${accent.ring} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <Mail size={16} className={accent.text} />
                  </span>
                  <span className="text-white text-lg font-semibold group-hover:text-gold transition-colors duration-200 break-all">
                    {committee.email}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        :global(.animate-slideIn) {
          animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.animate-fadeIn) {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>,
    document.body
  );
}
