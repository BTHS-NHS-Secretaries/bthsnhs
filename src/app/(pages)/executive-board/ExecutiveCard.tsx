'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import ExecutiveModal from './ExecutiveModal';

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

interface ExecutiveCardProps {
  executive: Executive;
  priority?: boolean;
}

export default function ExecutiveCard({ executive, priority = false }: ExecutiveCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateModalPosition = (rect: DOMRect) => {
    const modalWidth = 320; // Approximate width of modal
    const viewportWidth = window.innerWidth;
    
    let left = rect.right + 20;
    if (left + modalWidth > viewportWidth) {
      left = rect.left - modalWidth - 20;
    }

    const top = rect.top + rect.height / 2;
    return { top, left };
  };

  const updateModalPosition = () => {
    if (!cardRef.current || !isModalVisible) return;

    const rect = cardRef.current.getBoundingClientRect();
    setModalPosition(calculateModalPosition(rect));
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setModalPosition(calculateModalPosition(rect));
      setIsModalVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsModalVisible(false);
  };

  // Update position on scroll
  useEffect(() => {
    if (!isModalVisible) return;

    const handleScroll = () => {
      updateModalPosition();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModalVisible]);

  return (
    <>
      <div
        ref={cardRef}
        className="relative cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-darkBlue-800 rounded-xl overflow-hidden border-2 border-gold border-opacity-30 hover:border-opacity-100 transition-all duration-300 shadow-lg h-full hover:shadow-2xl group-hover:-translate-y-2">
          <div className="relative overflow-hidden bg-darkBlue-700 h-[290px] flex items-center justify-center">
            <Image
              src={executive.image}
              alt={executive.name}
              fill
              priority={priority}
              sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover bg-white transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="p-7 text-center">
            <h3 className="text-xl font-bold text-gold mb-2">{executive.role}</h3>
            <p className="text-lg font-semibold text-white mb-1">{executive.name}</p>
            <p className="text-gray-300 text-sm">{executive.major}</p>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <ExecutiveModal
            executive={executive}
            isVisible={isModalVisible}
            position={modalPosition}
          />,
          document.body
        )}
    </>
  );
}
