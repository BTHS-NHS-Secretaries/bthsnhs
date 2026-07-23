'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const SLIDE_DURATION = 5000;

export default function Carousel({ images }: { images: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultiple = images.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (images.length ? (prev + 1) % images.length : 0));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (images.length ? (prev - 1 + images.length) % images.length : 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused || !hasMultiple) return;
    const interval = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, currentSlide, hasMultiple]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-darkBlue-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {images.map((src, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity ease-expo-out ${
                isActive ? 'opacity-100 duration-[1200ms] z-10' : 'opacity-0 duration-[800ms] z-0'
              }`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={src}
                  alt="BTHS NHS chapter photo"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={`object-cover transition-transform ease-linear ${
                    isActive ? 'duration-[6000ms] scale-100' : 'duration-0 scale-110'
                  }`}
                />
              </div>
              {/* Subtle bottom gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkBlue-950/70 via-transparent to-transparent" />
            </div>
          );
        })}

        <div className="absolute top-6 left-6 z-20">
          <div className="size-3/4 flex items-center justify-center overflow-hidden">
            <img
              src="/data/images/logo.png"
              alt="BTHS NHS Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>

        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 z-10">
          <h1 className="pl-20 text-6xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
            Brooklyn Technical
            <br /> High School NHS
          </h1>
        </div>

        {hasMultiple && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-gold hover:bg-yellow-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(218,165,32,0.6)] text-darkBlue-900 w-12 h-12 rounded-full shadow-lg transition-all duration-300 font-bold text-xl"
              aria-label="Previous slide"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-gold hover:bg-yellow-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(218,165,32,0.6)] text-darkBlue-900 w-12 h-12 rounded-full shadow-lg transition-all duration-300 font-bold text-xl"
              aria-label="Next slide"
            >
              ›
            </button>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-3 rounded-full overflow-hidden transition-all duration-300 ${
                    index === currentSlide ? 'bg-white/25 w-14' : 'bg-white/40 w-3 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === currentSlide && !isPaused && (
                    <span
                      key={currentSlide}
                      className="absolute inset-0 origin-left bg-gold animate-[progress-bar_5s_linear_forwards]"
                    />
                  )}
                  {index === currentSlide && isPaused && <span className="absolute inset-0 bg-gold" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
