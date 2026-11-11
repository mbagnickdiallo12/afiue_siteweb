export type BjorkTone = "dark" | "light";

export interface BjorkPaletteTokens {
  surface: string;
  surfaceActive: string;
  border: string;
  text: string;
  textMedium: string;
  textSoft: string;
  accent: string;
}

export const BJORK_PALETTE: Record<BjorkTone, BjorkPaletteTokens> = {
  dark: {
    surface: "#121212",
    surfaceActive: "#202020",
    border: "#232323",
    text: "#ededed",
    textMedium: "rgba(237, 237, 237, 0.72)",
    textSoft: "rgba(237, 237, 237, 0.5)",
    accent: "#ec5c13",
  },
  light: {
    surface: "#fbfaf7",
    surfaceActive: "#f0eee9",
    border: "#e3e0d9",
    text: "#18181b",
    textMedium: "rgba(24, 24, 27, 0.72)",
    textSoft: "rgba(24, 24, 27, 0.5)",
    accent: "#dc4a0c",
  },
};

