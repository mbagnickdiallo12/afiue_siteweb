"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type EffectMode = "light" | "dark";

export type TopologyFieldProps = {
  mode?: EffectMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

export const TOPOLOGY_FIELD_DEFAULTS = {
  mode: "dark",
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface Edge3D {
  a: number;
  b: number;
  alpha: number;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export default function TopologyField({
  mode = TOPOLOGY_FIELD_DEFAULTS.mode,
  hue = TOPOLOGY_FIELD_DEFAULTS.hue,
  saturation = TOPOLOGY_FIELD_DEFAULTS.saturation,
  brightness = TOPOLOGY_FIELD_DEFAULTS.brightness,
  className,
  style,
}: TopologyFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numNodes = 120;
    const nodes: Node3D[] = [];

    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      nodes.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        baseSize: (Math.sin(i * 12.9898) * 0.5 + 0.5) * 1.5 + 1.1,
        pulseSpeed: ((Math.cos(i * 78.233) * 0.5 + 0.5) * 0.02) + 0.015,
        pulseOffset: (i * 0.6180339887) * Math.PI * 2,
      });
    }

    const edges: Edge3D[] = [];
    const threshold = 0.45;
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          edges.push({
            a: i,
            b: j,
            alpha: (1 - dist / threshold) * 0.65,
          });
        }
      }
    }

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect ? rect.width : window.innerWidth;
      height = rect ? rect.height : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let time = 0;

    const projX = new Float32Array(numNodes);
    const projY = new Float32Array(numNodes);
    const projZ = new Float32Array(numNodes);
    const projFog = new Float32Array(numNodes);

    const camZ = 650;
    const fovFactor = 1 / Math.tan((60 * Math.PI) / 360);

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const R = width > 768 ? 340 : 200;
      const offsetX = width > 768 ? width * 0.22 : 0;
      const offsetY = width > 768 ? height * 0.04 : height * 0.1;

      const rotY = time * 0.0018;
      const rotX = 0.2;
      const rotZ = time * 0.0006;

      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const cz = Math.cos(rotZ);
      const sz = Math.sin(rotZ);

      const focal = (height * 0.5) * fovFactor;

      for (let i = 0; i < numNodes; i++) {
        const n = nodes[i];
        // Rotate Y
        const x1 = n.x * cy + n.z * sy;
        const z1 = -n.x * sy + n.z * cy;
        const y1 = n.y;
        // Rotate X
        const y2 = y1 * cx - z1 * sx;
        const z2 = y1 * sx + z1 * cx;
        const x2 = x1;
        // Rotate Z
        const x3 = x2 * cz - y2 * sz;
        const y3 = x2 * sz + y2 * cz;
        const z3 = z2;

        const wx = x3 * R + offsetX;
        const wy = y3 * R + offsetY;
        const wz = z3 * R;

        const depth = Math.max(80, camZ - wz);
        const scale = focal / depth;

        projX[i] = width * 0.5 + wx * scale;
        projY[i] = height * 0.5 + wy * scale;
        projZ[i] = depth;
        projFog[i] = clamp((980 - depth) / (980 - 320), 0.08, 1);
      }

      // Draw connecting lines
      ctx.lineWidth = 1;
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const i = edge.a;
        const j = edge.b;
        const fog = (projFog[i] + projFog[j]) * 0.5;
        const alpha = edge.alpha * fog * 0.65;
        if (alpha <= 0.02) continue;

        ctx.strokeStyle = `rgba(199, 219, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(projX[i], projY[i]);
        ctx.lineTo(projX[j], projY[j]);
        ctx.stroke();
      }

      // Draw pulsing nodes
      for (let i = 0; i < numNodes; i++) {
        const n = nodes[i];
        const fog = projFog[i];
        const pulse = (Math.sin(time * n.pulseSpeed + n.pulseOffset) + 1) * 0.5;
        const targetRadius = (n.baseSize + pulse * 1.6) * (focal / projZ[i]);
        const alpha = (0.4 + pulse * 0.6) * fog;

        ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(projX[i], projY[i], Math.max(1.2, targetRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <div
      data-mode={mode}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 70% 50%, #172042 0%, #0E1428 50%, #070A12 100%)",
        filter,
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[140px] opacity-20 bg-[#3B82F6]"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
