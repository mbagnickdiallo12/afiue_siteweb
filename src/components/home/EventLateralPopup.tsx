"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EventPopupConfig, EventPopupSlide } from "@/types/database";

interface EventLateralPopupProps {
  config?: EventPopupConfig | null;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(targetIso?: string | null): TimeRemaining {
  if (!targetIso) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0 || isNaN(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isExpired: false };
}

export function EventLateralPopup({ config }: EventLateralPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: true,
  });

  const activeSlides: EventPopupSlide[] = (config?.slides || []).filter(
    (s) => s.is_active !== false
  );

  const totalSlides = activeSlides.length;
  const currentSlide: EventPopupSlide | undefined = activeSlides[currentIndex];

  // Auto-open timer on mount
  useEffect(() => {
    if (!config?.is_enabled || totalSlides === 0) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, config.auto_open_delay_ms || 1200);

    return () => clearTimeout(timer);
  }, [config, totalSlides]);

  // Next / Prev slide handlers
  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play slider interval
  useEffect(() => {
    if (!isOpen || isHovered || totalSlides <= 1) return;

    const intervalTime = config?.auto_slide_interval_ms || 4500;
    const interval = setInterval(() => {
      handleNext();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isOpen, isHovered, totalSlides, config?.auto_slide_interval_ms, handleNext]);

  // Countdown timer ticker
  useEffect(() => {
    if (!currentSlide?.show_countdown || !currentSlide?.target_date) return;

    const updateCountdown = () => {
      setTimeRemaining(calculateTimeRemaining(currentSlide.target_date));
    };

    updateCountdown();
    const ticker = setInterval(updateCountdown, 1000);

    return () => clearInterval(ticker);
  }, [currentSlide?.target_date, currentSlide?.show_countdown, currentIndex]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!config?.is_enabled || totalSlides === 0 || !currentSlide) {
    return null;
  }

  // Positioning classes
  const position = config.position || "bottom-left";
  const positionClasses =
    position === "bottom-right"
      ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
      : position === "center-modal"
      ? "inset-0 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm z-50"
      : "bottom-4 left-4 sm:bottom-6 sm:left-6"; // default bottom-left

  const isModal = position === "center-modal";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`${
            isModal
              ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
              : "fixed z-50 " + positionClasses
          }`}
          onClick={(e) => {
            if (isModal && e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full max-w-[380px] sm:max-w-[410px] bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200/90 overflow-visible text-slate-800"
          >
            {/* Top Close Button (floating badge matching reference styling in AFI Red) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer le popup"
              className="absolute -top-3.5 -right-3.5 z-30 w-9 h-9 rounded-full bg-afi-red hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Main Content Container */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Slider Image Container (Square / 1:1) */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-900 shadow-xs group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentSlide.image_url}
                      alt={currentSlide.title}
                      fill
                      priority
                      sizes="(max-width: 640px) 340px, 400px"
                      className="object-cover"
                    />

                    {/* Gradient Overlay for subtle text contrast & luxury depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Dotted Grid Pattern overlay signature */}
                    <div className="absolute inset-0 pattern-grid-dots opacity-25 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Slider Navigation Arrows (visible if multiple slides) */}
                {totalSlides > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      aria-label="Affiche précédente"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      aria-label="Affiche suivante"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Slider Pagination Dots at bottom of image */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-xs">
                      {activeSlides.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setCurrentIndex(idx)}
                          aria-label={`Aller à l'affiche ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? "w-5 bg-white"
                              : "w-1.5 bg-white/40 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1 text-center px-1">
                <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 leading-snug tracking-tight">
                  {currentSlide.title}
                </h3>
                {currentSlide.subtitle && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>

              {/* Compte à Rebours (Countdown) if enabled */}
              {currentSlide.show_countdown && currentSlide.target_date && (
                <div className="text-center space-y-2 py-0.5">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-afi-red" />
                    <span>
                      {timeRemaining.isExpired
                        ? "Événement en cours"
                        : "Temps restant avant l'événement"}
                    </span>
                  </div>

                  {!timeRemaining.isExpired ? (
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-0.5">
                      {/* Jours */}
                      <div className="flex flex-col items-center justify-center bg-slate-900 text-white rounded-lg py-1.5 px-2 min-w-[50px] shadow-xs">
                        <span className="font-mono font-black text-base sm:text-lg leading-none">
                          {String(timeRemaining.days).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          Jours
                        </span>
                      </div>

                      <span className="font-bold text-slate-400 text-sm">:</span>

                      {/* Heures */}
                      <div className="flex flex-col items-center justify-center bg-slate-900 text-white rounded-lg py-1.5 px-2 min-w-[50px] shadow-xs">
                        <span className="font-mono font-black text-base sm:text-lg leading-none">
                          {String(timeRemaining.hours).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          Heures
                        </span>
                      </div>

                      <span className="font-bold text-slate-400 text-sm">:</span>

                      {/* Minutes */}
                      <div className="flex flex-col items-center justify-center bg-slate-900 text-white rounded-lg py-1.5 px-2 min-w-[50px] shadow-xs">
                        <span className="font-mono font-black text-base sm:text-lg leading-none">
                          {String(timeRemaining.minutes).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          Min
                        </span>
                      </div>

                      <span className="font-bold text-slate-400 text-sm">:</span>

                      {/* Secondes */}
                      <div className="flex flex-col items-center justify-center bg-afi-red text-white rounded-lg py-1.5 px-2 min-w-[50px] shadow-xs">
                        <span className="font-mono font-black text-base sm:text-lg leading-none">
                          {String(timeRemaining.seconds).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-red-200 mt-0.5">
                          Sec
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-emerald-700 bg-white py-1.5 px-3 rounded-lg border border-slate-200 inline-block">
                      Inscriptions ouvertes dès maintenant !
                    </div>
                  )}
                </div>
              )}

              {/* Bouton d'action CTA if enabled */}
              {currentSlide.show_cta && currentSlide.cta_text && (
                <Link
                  href={currentSlide.cta_url || "/candidater"}
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-5 rounded-lg bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
                >
                  <span>{currentSlide.cta_text}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

