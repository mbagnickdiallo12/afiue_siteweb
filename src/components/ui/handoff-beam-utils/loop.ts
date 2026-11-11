"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface VisibleLoopOptions {
  fpsCap?: number;
}

export function useVisibleLoop(
  ref: RefObject<HTMLElement | null>,
  callback: (dt: number) => void,
  options: VisibleLoopOptions = {},
): void {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let isVisible = true;
    const minInterval = options.fpsCap && options.fpsCap > 0 ? 1000 / options.fpsCap : 0;

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && ref.current) {
      io = new IntersectionObserver((entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
        }
      });
      io.observe(ref.current);
    }

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (!isVisible) {
        lastTime = now;
        return;
      }
      const elapsed = now - lastTime;
      if (minInterval > 0 && elapsed < minInterval) return;
      lastTime = now;
      const dt = Math.min(0.1, Math.max(0.001, elapsed / 1000));
      cbRef.current(dt);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      io?.disconnect();
    };
  }, [ref, options.fpsCap]);
}

