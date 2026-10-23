import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://afi-ue.sn"),
  title: {
    default: "AFI-L'UE | L'Université de l'Entreprise — Dakar, Sénégal",
    template: "%s | AFI-L'UE",
  },
  description:
    "AFI-L'Université de l'Entreprise à Dakar : Établissement privé d'enseignement supérieur d'excellence reconnu CAMES et ANAQ-Sup. Licences, Masters, Formations continues et Executive Education.",
  keywords: [
    "AFI",
    "AFI-UE",
    "Université Dakar",
    "Université de l'Entreprise",
    "Licence Dakar",
    "Master Sénégal",
    "CAMES",
    "ANAQ-Sup",
    "Intelligence Artificielle",
    "Gestion",
    "Informatique",
  ],
  authors: [{ name: "Université AFI-L'UE" }],
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://afi-ue.sn",
    siteName: "AFI-L'UE — Université de l'Entreprise",
    title: "AFI-L'UE | L'Université de l'Entreprise — Dakar, Sénégal",
    description:
      "Formations d'élite en Sciences de Gestion, Droit, Ingénierie & Technologies. Diplômes accrédités CAMES.",
    images: [
      {
        url: "https://afi-ue.sn/wp-content/uploads/2025/10/Logo-AFI-LUniversite-de-lEntreprise-version-officielle-1280x523.png",
        width: 1280,
        height: 523,
        alt: "Logo AFI-L'UE",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-body bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
