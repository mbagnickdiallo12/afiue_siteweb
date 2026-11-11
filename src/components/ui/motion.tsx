"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type TargetAndTransition,
  type Transition,
} from "motion/react";

/**
 * Standard Apple/Google spring & ease curves
 */
export const EASINGS = {
  // Apple smooth deceleration
  smooth: [0.22, 1, 0.36, 1] as const,
  // Snappy spring physics
  spring: { type: "spring", stiffness: 350, damping: 25 } as const,
  // Gentle floating spring
  gentle: { type: "spring", stiffness: 200, damping: 20 } as const,
};

/**
 * Top Reading / Scroll Progress Bar (Minimalist Apple/Stripe style)
 */
export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-afi-red-900 via-afi-red to-red-500 origin-left z-50 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Fade In & Slide Up on scroll into view
 */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 24,
  className = "",
  once = true,
}: FadeInProps) {
  const offset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: EASINGS.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container for Grids and Lists (Cards cascade in smoothly)
 */
interface StaggerContainerProps {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  delayChildren = 0.05,
  staggerChildren = 0.08,
  className = "",
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Item to place inside StaggerContainer
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 20,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: EASINGS.smooth,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale In reveal
 */
export function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay,
        ease: EASINGS.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card / Container with tactile spring hover
 */
export function HoverLift({
  children,
  className = "",
  lift = -5,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: lift }}
      transition={EASINGS.spring}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tactile Button Feedback (whileHover + whileTap)
 */
export function MotionButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={EASINGS.spring}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated Counting Number (Apple Keynote style numbers)
 */
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Apple cubic-bezier easeOutExpo
      const easeProgress =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

