"use client";

import { motion } from "motion/react";

interface SophieAvatar3DProps {
  size?: number; // en pixels (défaut: 42)
  className?: string;
  isSpeaking?: boolean;
  isThinking?: boolean;
}

export function SophieAvatar3D({
  size = 42,
  className = "",
  isSpeaking = false,
  isThinking = false,
}: SophieAvatar3DProps) {
  // Calculs proportionnels
  const eyeWidth = Math.max(5, Math.round(size * 0.17));
  const eyeHeight = Math.max(2, Math.round(size * 0.055));
  const eyeGap = Math.max(3, Math.round(size * 0.12));

  return (
    <div
      className={`relative select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Halo d'ambiance externe lissé */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          scale: isSpeaking ? [1, 1.25, 1] : isThinking ? [1, 1.15, 1] : [1, 1.08, 1],
          opacity: isSpeaking ? [0.6, 0.9, 0.6] : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: isSpeaking ? 1.2 : isThinking ? 1.5 : 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(125, 175, 255, 0.45) 0%, rgba(93, 140, 255, 0.15) 50%, transparent 75%)",
          filter: "blur(6px)",
          transform: "scale(1.3)",
        }}
      />

      {/* Sphère 3D volumétrique flottante */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden shadow-lg"
        animate={{
          y: isSpeaking ? [-2, 2, -2] : [-1.5, 1.5, -1.5],
          rotate: isThinking ? [-3, 3, -3] : [0, 0, 0],
        }}
        transition={{
          duration: isSpeaking ? 1.6 : 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          // Dégradé volumétrique 3D inspiré de l'image de référence (source lumineuse haut-gauche)
          background: `
            radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.95) 0%, rgba(185, 215, 255, 0.75) 22%, rgba(110, 165, 255, 0.9) 45%, rgba(60, 115, 235, 1) 75%, rgba(25, 60, 160, 1) 100%)
          `,
          boxShadow: `
            inset -3px -3px 8px rgba(15, 35, 95, 0.7),
            inset 2px 2px 6px rgba(255, 255, 255, 0.8),
            0 4px 14px rgba(45, 105, 230, 0.45)
          `,
        }}
      >
        {/* Reflet spéculaire doux sur la calotte supérieure */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 50%)",
          }}
        />

        {/* Visage / Yeux luminescents (deux fentes horizontales blanches "--") */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex items-center"
            style={{ gap: eyeGap }}
            animate={{
              y: isSpeaking ? [-1, 1, -1] : [0, 0, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Oeil gauche */}
            <motion.span
              className="rounded-full bg-white block"
              style={{
                width: eyeWidth,
                height: eyeHeight,
                boxShadow: "0 0 6px rgba(255, 255, 255, 0.95), 0 0 10px rgba(180, 220, 255, 0.8)",
              }}
              animate={{
                scaleY: [1, 1, 0.08, 1, 1],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                times: [0, 0.88, 0.92, 0.96, 1],
                ease: "easeInOut",
              }}
            />

            {/* Oeil droit */}
            <motion.span
              className="rounded-full bg-white block"
              style={{
                width: eyeWidth,
                height: eyeHeight,
                boxShadow: "0 0 6px rgba(255, 255, 255, 0.95), 0 0 10px rgba(180, 220, 255, 0.8)",
              }}
              animate={{
                scaleY: [1, 1, 0.08, 1, 1],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                times: [0, 0.88, 0.92, 0.96, 1],
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

