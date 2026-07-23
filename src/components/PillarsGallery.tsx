'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
}

function AccordionColumn({
  images,
  onImageOpen,
}: {
  images: GalleryImage[];
  onImageOpen: (src: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-2 sm:gap-3 h-full">
      {images.map((img, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={img.src}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => onImageOpen(img.src)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onImageOpen(img.src);
              }
            }}
            className={`relative rounded-2xl overflow-hidden cursor-pointer ring-1 transition-all duration-500 ease-expo-out ${
              isActive ? 'flex-[6] ring-gold/50' : 'flex-[1] ring-white/10 opacity-75 hover:opacity-100'
            }`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="25vw" className="object-cover" />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-darkBlue-950/70 via-transparent to-transparent transition-opacity duration-500 ${
                isActive ? 'opacity-30' : 'opacity-70'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!src) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [src, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-darkBlue-950/90 backdrop-blur-sm transition-opacity duration-300 ${
        src ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors duration-200"
      >
        ×
      </button>

      {src && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[75vw] h-[75vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gold/30"
        >
          <Image src={src} alt="Enlarged BTHS NHS event photo" fill sizes="75vw" className="object-contain bg-darkBlue-950" />
        </div>
      )}
    </div>,
    document.body
  );
}

export default function PillarsGallery({ images }: { images: string[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 h-[500px] flex items-center justify-center text-gray-500 text-sm text-center px-8">
        Drop photos into public/data/images/misc to fill this gallery.
      </div>
    );
  }

  const columnA: GalleryImage[] = images
    .filter((_, i) => i % 2 === 0)
    .map((src) => ({ src, alt: 'BTHS NHS service and community event' }));
  const columnB: GalleryImage[] = images
    .filter((_, i) => i % 2 === 1)
    .map((src) => ({ src, alt: 'BTHS NHS service and community event' }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[520px] sm:h-[600px] lg:h-[720px]">
        <AccordionColumn images={columnA} onImageOpen={setLightboxSrc} />
        <AccordionColumn images={columnB} onImageOpen={setLightboxSrc} />
      </div>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
