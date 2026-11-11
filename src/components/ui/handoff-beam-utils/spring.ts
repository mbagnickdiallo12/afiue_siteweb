export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface SpringState {
  x: number;
  v: number;
}

export function stepSpring(
  state: SpringState,
  target: number,
  config: SpringConfig,
  dt: number,
): void {
  if (dt <= 0) return;
  const maxDt = Math.min(dt, 0.05);
  const steps = Math.max(1, Math.ceil(maxDt / 0.008));
  const h = maxDt / steps;
  const { stiffness: k, damping: c, mass: m } = config;

  for (let i = 0; i < steps; i++) {
    const force = -k * (state.x - target) - c * state.v;
    const acc = force / m;
    state.v += acc * h;
    state.x += state.v * h;
  }
}

