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

  if (!slides || slides.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-afi-navy-950 text-white min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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

            {/* Cinematic Minimalist Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45 z-10" />

            {/* DotPattern Superposition Overlay right above the image & vignette */}
            <DotPattern
              cx={1}
              cy={1}
              cr={1}
              className={cn(
                "z-10 fill-white/30 md:fill-white/40 [mask-image:radial-gradient(560px_circle_at_center,white,transparent)]",
              )}
            />

            {/* Centralized Clean & Minimal Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center py-24 sm:py-32">
              <div className="space-y-5 max-w-3xl">
                {/* Minimalist Top Tag */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-semibold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-afi-red animate-pulse" />
                    <span>{slide.badge}</span>
                  </div>
                )}

                {/* Main Slide Title (Monumental & Clean) */}
                <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-700">
                  {slide.title}
                </h1>

                {/* Subtitle (Short, 1-2 lines max) */}
                {slide.subtitle && (
                  <p className="text-sm sm:text-lg text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {slide.subtitle}
                  </p>
                )}

                {/* Minimalist Action Button (Matching authentic AFI white pill with red text) */}
                {slide.cta_primary_text && slide.cta_primary_url && (
                  <div className="pt-4 flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <Link
                      href={slide.cta_primary_url}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-afi-red hover:bg-slate-100 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>{slide.cta_primary_text}</span>
                      <ArrowRight className="w-4 h-4 text-afi-red" />
                    </Link>

                    {slide.cta_secondary_text && slide.cta_secondary_url && (
                      <Link
                        href={slide.cta_secondary_url}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/25 transition-all"
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

      {/* Floating Left Chevron */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all cursor-pointer opacity-70 hover:opacity-100 hover:scale-110"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Floating Right Chevron */}
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all cursor-pointer opacity-70 hover:opacity-100 hover:scale-110"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Segmented Red Dash Indicators (Matching user screenshots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                isActive
                  ? "w-10 sm:w-12 bg-afi-red shadow-md shadow-afi-red/50"
                  : "w-5 sm:w-6 bg-red-950/70 hover:bg-red-800/80 border border-red-900/30"
              }`}
              aria-label={`Aller à la diapositive ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
