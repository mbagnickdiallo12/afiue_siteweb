import Link from "next/link";
import {
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Server,
} from "lucide-react";

export default function HomePage() {
  const sampleFormations = [
    {
      title: "Licence Intelligence Artificielle et Big Data",
      level: "Licence",
      duration: "3 ans",
      domain: "Sciences & Technologies",
      cames: true,
      slug: "licence-intelligence-artificielle-et-big-data",
    },
    {
      title: "Licence Banque Assurance Finance",
      level: "Licence",
      duration: "3 ans",
      domain: "Économie & Gestion",
      cames: true,
      slug: "licence-banque-assurance-finance",
    },
    {
      title: "Licence Génie Logiciel (GELO)",
      level: "Licence",
      duration: "3 ans",
      domain: "Informatique & Réseaux",
      cames: true,
      slug: "licence-genie-logiciel-gelo",
    },
    {
      title: "Master Audit et Contrôle de Gestion",
      level: "Master",
      duration: "2 ans",
      domain: "Management & Audit",
      cames: true,
      slug: "master-audit-et-controle-de-gestion",
    },
    {
      title: "Master Supply Chain Management & Logistique",
      level: "Master",
      duration: "2 ans",
      domain: "Commerce & Logistique",
      cames: true,
      slug: "master-supply-chain-management",
    },
    {
      title: "Master Stratégie Managériale à l'International",
      level: "Master",
      duration: "2 ans",
      domain: "Stratégie & Affaires",
      cames: true,
      slug: "master-strategie-manageriale-a-linternational",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner - Institution Info */}
      <div className="bg-afi-navy text-white/90 text-xs py-2 px-4 border-b border-white/10">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Établissement reconnu CAMES & Habilité ANAQ-Sup
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline">Dakar, Point E & Thiès</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/api/health"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Santé Système (API Health)
            </Link>
            <span className="text-white/40">|</span>
            <span className="text-white/70">Année Académique 2026-2027</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle">
        <div className="container mx-auto flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-afi-red flex items-center justify-center text-white font-extrabold text-xl shadow-card tracking-wider">
              AFI
            </div>
            <div>
              <span className="block font-heading font-extrabold text-lg text-afi-navy leading-tight tracking-tight">
                AFI-L&apos;UE
              </span>
              <span className="block text-[11px] font-semibold text-afi-red uppercase tracking-wider">
                L&apos;Université de l&apos;Entreprise
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="#groupe" className="hover:text-afi-red transition-colors">
              Le Groupe
            </Link>
            <Link href="#formations" className="hover:text-afi-red transition-colors">
              Formations & Diplômes
            </Link>
            <Link href="#recherche" className="hover:text-afi-red transition-colors">
              Recherche & Innovation
            </Link>
            <Link href="#vie-etudiante" className="hover:text-afi-red transition-colors">
              Vie Étudiante
            </Link>
            <Link href="#contact" className="hover:text-afi-red transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#candidature"
              className="bg-afi-red hover:bg-afi-red-800 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-card hover:shadow-floating transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Postuler en ligne
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Foundation Notice for Mission 01 */}
        <section className="bg-gradient-to-r from-amber-500/10 via-afi-red-50 to-blue-500/10 border-b border-amber-200/60 py-3">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <span className="bg-afi-red text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Mission 01
              </span>
              <span className="font-semibold text-afi-navy">
                Fondations Techniques & Architecture Validées :
              </span>
              <span className="text-slate-600">
                Next.js 15 App Router • TypeScript Strict • Tailwind CSS • Supabase Autohébergé
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/api/health"
                className="text-xs font-bold text-afi-red underline hover:text-afi-red-800"
              >
                Vérifier le statut en temps réel →
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-16 md:py-24 border-b border-slate-200/60">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-afi-red-50 text-afi-red border border-afi-red-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-afi-red" />
                  Pôle d&apos;Excellence Universitaire International
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-afi-navy leading-tight tracking-tight">
                  Formez votre avenir dans{" "}
                  <span className="text-afi-red underline decoration-afi-gold decoration-4 underline-offset-8">
                    l&apos;Université de l&apos;Entreprise
                  </span>
                </h1>

                <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Depuis plus de 30 ans, AFI-L&apos;UE prépare les leaders, ingénieurs et managers de demain grâce à des cursus accrédités CAMES, une pédagogie en prise directe avec le monde professionnel et des partenariats internationaux de premier rang.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#formations"
                    className="bg-afi-navy hover:bg-afi-navy-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-card hover:shadow-floating transition-all flex items-center gap-2 text-base"
                  >
                    <BookOpen className="w-5 h-5 text-afi-gold" />
                    Explorer le catalogue des formations
                  </a>
                  <a
                    href="#candidature"
                    className="bg-white hover:bg-slate-50 text-afi-navy font-bold px-6 py-3.5 rounded-xl border-2 border-slate-300 hover:border-afi-red transition-all flex items-center gap-2 text-base"
                  >
                    Dossier de candidature
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
                  <div className="p-3 bg-white rounded-xl shadow-subtle border border-slate-100">
                    <span className="block text-2xl font-black text-afi-red">1993</span>
                    <span className="text-xs text-slate-500 font-medium">Année de création</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-subtle border border-slate-100">
                    <span className="block text-2xl font-black text-afi-navy">+35</span>
                    <span className="text-xs text-slate-500 font-medium">Formations Diplômantes</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-subtle border border-slate-100">
                    <span className="block text-2xl font-black text-emerald-600">CAMES</span>
                    <span className="text-xs text-slate-500 font-medium">Reconnaissance Panafricaine</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-subtle border border-slate-100">
                    <span className="block text-2xl font-black text-afi-gold">+95%</span>
                    <span className="text-xs text-slate-500 font-medium">Taux d&apos;insertion</span>
                  </div>
                </div>
              </div>

              {/* Visual Card / Architecture status card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden">
                  <div className="bg-afi-navy p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-afi-gold flex items-center gap-1.5">
                        <Server className="w-4 h-4" />
                        Infrastructure & Stack 2026
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Opérationnel
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-heading">
                      Plateforme Universitaire AFI-L&apos;UE
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      Remplacement moderne du CMS WordPress historique
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Next.js 15 App Router</h4>
                        <p className="text-xs text-slate-500">
                          Architecture serveur hybride (SSR / ISR) pour un SEO et des performances maximales.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">PostgreSQL via Supabase Autohébergé</h4>
                        <p className="text-xs text-slate-500">
                          Sécurité Row Level Security (RLS) native et gestion optimisée des dossiers étudiants.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Contabo VPS + Coolify</h4>
                        <p className="text-xs text-slate-500">
                          Conteneurisation Docker autonome, zéro lock-in cloud et sauvegardes locales.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Migration WordPress Sécurisée</h4>
                        <p className="text-xs text-slate-500">
                          Inventaire de 71 articles, 94 pages, 35 cursus et 301 médias sans interruption de service.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Statut : Étape 1 & Étape 3 complétées</span>
                      <span className="font-mono font-bold text-afi-navy">v0.1.0-alpha</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formations Catalogue Teaser */}
        <section id="formations" className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-afi-red font-bold text-xs uppercase tracking-widest">
                Diplômes & Programmes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-afi-navy mt-2">
                Nos Formations d&apos;Excellence
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                Licences et Masters professionnels dispensés en cours du jour, du soir et en ligne.
              </p>
            </div>

            {/* Quick search bar mockup */}
            <div className="max-w-xl mx-auto mb-10">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher une formation (ex: Intelligence Artificielle, Finance, Audit...)"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-afi-red/20 focus:border-afi-red transition-all"
                  readOnly
                />
              </div>
            </div>

            {/* Formations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleFormations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 hover:border-afi-red/40 hover:shadow-card transition-all p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                          item.level === "Master"
                            ? "bg-afi-navy text-white"
                            : "bg-afi-red-50 text-afi-red"
                        }`}
                      >
                        {item.level} ({item.duration})
                      </span>
                      {item.cames && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          CAMES
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-afi-red transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-2">
                      Domaine : {item.domain}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-afi-red">
                    <span>Voir les détails & admission</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-afi-navy text-white pt-12 pb-8 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-afi-red flex items-center justify-center font-extrabold text-white text-lg">
                  AFI
                </div>
                <span className="font-heading font-extrabold text-lg tracking-tight">
                  AFI-L&apos;UE
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                AFI - L&apos;Université de l&apos;Entreprise. Établissement privé d&apos;enseignement supérieur fondé en 1993, pionnier de la formation professionnalisante au Sénégal et dans la sous-région.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3 text-afi-gold uppercase tracking-wider">
                Nos Formations
              </h4>
              <ul className="space-y-2 text-xs text-white/70">
                <li>Licences en Sciences de Gestion</li>
                <li>Licences en Informatique & IA</li>
                <li>Masters Spécialisés & Audit</li>
                <li>Programmes Exécutifs & Certifiants</li>
                <li>Cours du Soir & Week-end</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3 text-afi-gold uppercase tracking-wider">
                Campus & Contact
              </h4>
              <p className="text-xs text-white/70 leading-relaxed space-y-1">
                <span className="block font-semibold text-white">Campus Principal Point E :</span>
                Rue de Fatick x Rue de Kaolack, Dakar, Sénégal
                <br />
                <span className="block font-semibold text-white mt-2">Téléphone :</span>
                +221 33 824 50 50 / +221 33 825 80 80
                <br />
                <span className="block font-semibold text-white mt-1">Email :</span>
                contact@afi-ue.sn
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3 text-afi-gold uppercase tracking-wider">
                Supervision Technique
              </h4>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 space-y-2 text-xs text-white/80">
                <div className="flex items-center justify-between">
                  <span>Serveur :</span>
                  <span className="font-mono text-emerald-400">Contabo VPS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Orchestrateur :</span>
                  <span className="font-mono text-emerald-400">Coolify</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Base de données :</span>
                  <span className="font-mono text-emerald-400">PostgreSQL (Supabase)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Build :</span>
                  <span className="font-mono text-emerald-400">Next.js 15 (Node 24)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-white/50">
            <p>© {new Date().getFullYear()} Université AFI-L&apos;UE. Tous droits réservés.</p>
            <p>Plateforme Next.js développée pour le projet de refonte AFI-L&apos;UE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
