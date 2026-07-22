'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const SLIDE_DURATION = 5000;

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    { id: 1, src: '/data/images/execphoto2024.png', alt: 'Executive Photo 2024' },
    { id: 2, src: '/data/images/nys.png', alt: 'NYSCLSA 2025' },
    { id: 3, src: '/data/images/execphoto2024.png', alt: 'Executive Photo 2024' },
    { id: 4, src: '/data/images/execphoto2024.png', alt: 'Executive Photo 2024' },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, currentSlide]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-darkBlue-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={`${slide.id}-${index}`}
              className={`absolute inset-0 transition-opacity ease-expo-out ${
                isActive ? 'opacity-100 duration-[1200ms] z-10' : 'opacity-0 duration-[800ms] z-0'
              }`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={`object-cover transition-transform ease-linear ${
                    isActive ? 'duration-[6000ms] scale-100' : 'duration-0 scale-110'
                  }`}
                />
              </div>
              {/* Legibility + mood gradient, tying the photo into the site's navy/gold identity */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkBlue-950/90 via-darkBlue-950/20 to-darkBlue-950/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-darkBlue-950/70 via-transparent to-transparent" />
            </div>
          );
        })}

        {/* Soft gold glow tying the logo into the footer's glow-blob language */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl pointer-events-none z-10" />

        <div className="absolute top-6 left-6 z-20">
          <div className="size-3/4 flex items-center justify-center overflow-hidden">
            <img
              src="/data/images/logo.png"
              alt="BTHS NHS Logo"
              className="w-full h-full object-contain p-2 drop-shadow-[0_0_18px_rgba(218,165,32,0.35)]"
            />
          </div>
        </div>

        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 z-10">
          <h1 className="pl-20 text-6xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
            Brooklyn Technical
            <br /> High School NHS
          </h1>
        </div>

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
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-3 rounded-full overflow-hidden transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white/25 w-14'
                  : 'bg-white/40 w-3 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && !isPaused && (
                <span
                  key={currentSlide}
                  className="absolute inset-0 origin-left bg-gold animate-[progress-bar_5s_linear_forwards]"
                />
              )}
              {index === currentSlide && isPaused && (
                <span className="absolute inset-0 bg-gold" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
