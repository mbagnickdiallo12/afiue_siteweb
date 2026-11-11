"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { HomepageSlide } from "@/types/database";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  slides: HomepageSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay timer (6 seconds per slide)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch Swipe Gesture for mobile
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-afi-navy-950 text-white min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Diaporama des formations AFI-L'UE"
    >
      {/* Slides Background Container */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background High-Res Slide Image */}
            <div className="absolute inset-0">
              <Image
                src={`${slide.image_url}?v=1920x800-orig`}
                alt={slide.title}
                fill
                priority={index === 0}
                unoptimized
                quality={100}
                className="object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
                sizes="100vw"
              />
            </div>

            {/* Cinematic Minimalist Dark Vignette Overlay: Reinforced on mobile for 100% text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-afi-navy-950/80 via-black/60 to-afi-navy-950/85 sm:bg-gradient-to-t sm:from-black/80 sm:via-black/30 sm:to-black/50 z-10" />

            {/* DotPattern Superposition Overlay right above the image & vignette */}
            <DotPattern
              cx={1}
              cy={1}
              cr={1}
              className={cn(
                "z-10 fill-white/20 sm:fill-white/35 md:fill-white/40 [mask-image:radial-gradient(560px_circle_at_center,white,transparent)]",
              )}
            />

            {/* Centralized Clean & Minimal Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center pt-20 pb-20 sm:py-28 lg:py-32">
              <div className="space-y-3.5 sm:space-y-5 max-w-3xl w-full">
                {/* Minimalist Top Tag */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-afi-red animate-pulse" />
                    <span className="truncate max-w-[260px] sm:max-w-none">{slide.badge}</span>
                  </div>
                )}

                {/* Main Slide Title (Monumental, Clean & Fluid Responsive) */}
                <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.18] sm:leading-[1.1] drop-shadow-md sm:drop-shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-700 px-1">
                  {slide.title}
                </h1>

                {/* Subtitle (Calibrated font and leading for perfect readability on mobile) */}
                {slide.subtitle && (
                  <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-slate-100/90 font-normal max-w-2xl mx-auto leading-snug sm:leading-relaxed drop-shadow animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-0">
                    {slide.subtitle}
                  </p>
                )}

                {/* Mobile-Adapted Action Buttons (Full-width stacked on mobile, row on tablet/desktop) */}
                {slide.cta_primary_text && slide.cta_primary_url && (
                  <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <Link
                      href={slide.cta_primary_url}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-afi-red hover:bg-slate-100 active:bg-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center"
                    >
                      <span>{slide.cta_primary_text}</span>
                      <ArrowRight className="w-4 h-4 text-afi-red shrink-0" />
                    </Link>

                    {slide.cta_secondary_text && slide.cta_secondary_url && (
                      <Link
                        href={slide.cta_secondary_url}
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/25 transition-all text-center"
                      >
                        <span>{slide.cta_secondary_text}</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Left Chevron (Discreet on desktop, hidden on mobile in favor of intuitive touch swipe) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/35 hover:bg-black/65 text-white/85 hover:text-white items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer opacity-70 hover:opacity-100 hover:scale-110"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Floating Right Chevron (Discreet on desktop, hidden on mobile in favor of intuitive touch swipe) */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/35 hover:bg-black/65 text-white/85 hover:text-white items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer opacity-70 hover:opacity-100 hover:scale-110"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Segmented Red Dash Indicators */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                isActive
                  ? "w-8 sm:w-12 bg-afi-red shadow-md shadow-afi-red/50"
                  : "w-4 sm:w-6 bg-red-950/70 hover:bg-red-800/80 border border-red-900/30"
              }`}
              aria-label={`Aller à la diapositive ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
