export function valueNoise1D(seed: number): (x: number) => number {
  const hash = (n: number): number => {
    let h = (n + seed * 374761393) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };

  return (x: number): number => {
    const xi = Math.floor(x);
    const xf = x - xi;
    const u = xf * xf * (3 - 2 * xf);
    const a = hash(xi);
    const b = hash(xi + 1);
    return a + (b - a) * u;
  };
}

