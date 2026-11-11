import { type BjorkTone } from "./palette";

export function useBjorkTone(explicit?: BjorkTone): BjorkTone {
  return explicit ?? "dark";
}

