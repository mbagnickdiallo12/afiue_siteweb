import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "afi-ue.sn",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/licence-intelligence-artificielle-et-big-data",
        destination: "/formations/licence-intelligence-artificielle-et-big-data",
        permanent: true,
      },
      {
        source: "/licence-genie-logiciel-gelo",
        destination: "/formations/licence-genie-logiciel-gelo",
        permanent: true,
      },
      {
        source: "/licence-banque-assurance-finance",
        destination: "/formations/licence-banque-assurance-finance",
        permanent: true,
      },
      {
        source: "/master-audit-et-controle-de-gestion",
        destination: "/formations/master-audit-et-controle-de-gestion",
        permanent: true,
      },
      {
        source: "/master-supply-chain-management",
        destination: "/formations/master-supply-chain-management",
        permanent: true,
      },
      {
        source: "/formulaire-dinscription-senegal",
        destination: "/candidater",
        permanent: true,
      },
      {
        source: "/formulaire-dinscription-gabon",
        destination: "/candidater",
        permanent: true,
      },
      {
        source: "/formulaire-dinscription-congo",
        destination: "/candidater",
        permanent: true,
      },
      {
        source: "/category/actualites",
        destination: "/actualites",
        permanent: true,
      },
      {
        source: "/category/vie-etudiante",
        destination: "/actualites?cat=vie-etudiante",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
