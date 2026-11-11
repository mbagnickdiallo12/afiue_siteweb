// AFI-L'UE Site Officiel — Déploiement Vercel Production avec Sophie AI
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteLayoutWrapper } from "@/components/layout/SiteLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "AFI-L'UE — L'Université de l'Entreprise | Dakar & Thiès",
    template: "%s | AFI-L'Université de l'Entreprise",
  },
  description:
    "Grande école et université privée de référence au Sénégal. Formations d'excellence en Licence et Master reconnues CAMES et habilitées ANAQ-Sup.",
  keywords: [
    "AFI",
    "AFI-L'UE",
    "Université de l'Entreprise",
    "Dakar",
    "Sénégal",
    "CAMES",
    "ANAQ-Sup",
    "Licence",
    "Master",
    "Intelligence Artificielle",
    "Génie Logiciel",
    "Audit et Contrôle de Gestion",
    "Banque Finance",
    "Supply Chain",
    "Cours du soir",
  ],
  authors: [{ name: "AFI-L'UE" }],
  creator: "Université AFI-L'UE",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://afi-ue.sn",
    siteName: "AFI-L'Université de l'Entreprise",
    title: "AFI-L'UE — L'Université de l'Entreprise",
    description:
      "Formations d'excellence en Licence et Master reconnues CAMES et habilitées ANAQ-Sup à Dakar Point E et Thiès.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-body selection:bg-afi-red selection:text-white"
      >
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
