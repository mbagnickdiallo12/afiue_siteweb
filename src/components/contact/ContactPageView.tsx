"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Navigation,
  Bus,
  Car,
  Accessibility,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Puis-je visiter les campus sans rendez-vous ?",
    answer: "Oui, du lundi au vendredi de 8h30 à 18h30 et le samedi matin jusqu'à 13h00.",
  },
  {
    question: "Quel est le délai de réponse moyen ?",
    answer: "Moins de 24h ouvrées par e-mail, et en direct sur WhatsApp.",
  },
  {
    question: "Comment postuler si j'habite hors de Dakar ou à l'étranger ?",
    answer: "Toutes les candidatures et entretiens d'admission s'effectuent à 100% en ligne.",
  },
];

export function ContactPageView() {
  const [activeCampusTab, setActiveCampusTab] = useState<"dakar" | "thies">("dakar");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen select-none">
      {/* =========================================================================
          1. HERO PLEINE LARGEUR — ÉPURÉ & MINIMALISTE (Style Apple / Google)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-14 sm:py-18 border-b border-slate-800/80">
        <div className="absolute inset-0 pattern-grid-dots opacity-20 pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full bg-afi-red/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-afi-red">Contact</span>
          </div>

          <div className="max-w-2xl space-y-3">
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Contactez l&apos;AFI-L&apos;UE
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Une question sur nos formations ou vos démarches d&apos;admission ? Nos équipes vous répondent du lundi au samedi.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTENU PRINCIPAL
          ========================================================================= */}
      <div className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* =========================================================================
              2. CANAUX RAPIDES (4 Cartes Minimalistes)
              ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Téléphone */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all space-y-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Téléphone
                </h3>
                <p className="text-xs text-slate-500">Lun – Ven : 8h30 – 18h30</p>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-0.5">
                <a href="tel:+221338247110" className="text-xs font-bold text-slate-900 hover:text-afi-red transition-colors block">
                  +221 33 824 71 10
                </a>
                <a href="tel:+221775088728" className="text-xs text-slate-600 hover:text-afi-red transition-colors block">
                  +221 77 508 87 28
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  WhatsApp
                </h3>
                <p className="text-xs text-slate-500">Échange direct en ligne</p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="https://wa.me/221775088728"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>+221 77 508 87 28</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all space-y-3">
              <div className="w-9 h-9 rounded-lg bg-afi-red text-white flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Email
                </h3>
                <p className="text-xs text-slate-500">Réponse sous 24h ouvrées</p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="mailto:afi@afi-ue.sn"
                  className="text-xs font-bold text-slate-900 hover:text-afi-red transition-colors block truncate"
                >
                  afi@afi-ue.sn
                </a>
              </div>
            </div>

            {/* Campus */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all space-y-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Sur place
                </h3>
                <p className="text-xs text-slate-500">Dakar &amp; Thiès</p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="#acces-campus"
                  className="inline-flex items-center gap-1 text-xs font-bold text-afi-red hover:text-red-700 transition-colors"
                >
                  <span>Voir les plans d&apos;accès</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              3. SECTION CENTRALE : FICHES CAMPUS & FORMULAIRE
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Gauche : Fiches Campus (Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Campus Dakar */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h2 className="font-heading font-black text-base text-slate-900">
                      Campus Dakar
                    </h2>
                    <span className="text-[10px] font-bold text-afi-red uppercase">
                      Siège Principal
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    Zone B
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-afi-red shrink-0" />
                    <span>Dakar, Zone B Rue G</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-afi-red shrink-0" />
                    <a href="tel:+221338247110" className="hover:text-afi-red transition-colors">
                      +221 33 824 71 10
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-afi-red shrink-0" />
                    <a href="mailto:afi@afi-ue.sn" className="hover:text-afi-red transition-colors">
                      afi@afi-ue.sn
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-afi-red shrink-0" />
                    <span>Lun – Ven : 8h30 – 18h30 | Sam : 9h00 – 13h00</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/campus/afi-dakar"
                    className="text-xs font-semibold text-slate-700 hover:text-afi-red inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Découvrir</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href="https://maps.google.com/?q=AFI+L'UE+Dakar+Zone+B+Rue+G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-afi-red hover:text-red-700 inline-flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Itinéraire</span>
                  </a>
                </div>
              </div>

              {/* Campus Thiès */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h2 className="font-heading font-black text-base text-slate-900">
                      Campus de Thiès
                    </h2>
                    <span className="text-[10px] font-bold text-slate-700 uppercase">
                      Pôle Régional
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    Caritas
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>Quartier Caritas, en face Cité Malick Sy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <a href="tel:+221339510000" className="hover:text-afi-red transition-colors">
                      +221 33 951 00 00
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <a href="mailto:thies@afi-ue.sn" className="hover:text-afi-red transition-colors">
                      thies@afi-ue.sn
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>Lun – Ven : 8h30 – 17h30 | Sam : 9h00 – 12h30</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/campus/afi-thies"
                    className="text-xs font-semibold text-slate-700 hover:text-afi-red inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Découvrir</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href="https://maps.google.com/?q=Thiès+Caritas+Malick+Sy+Senegal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-900 hover:text-afi-red inline-flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Itinéraire</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Droite : Formulaire (Span 7) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* =========================================================================
              4. SECTION LOCALISATION & CARTE
              ========================================================================= */}
          <div id="acces-campus" className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                  Accès aux campus
                </h2>
                <p className="text-xs text-slate-500">
                  Localisez facilement nos deux sites.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveCampusTab("dakar")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCampusTab === "dakar"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Dakar (Zone B)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCampusTab("thies")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCampusTab === "thies"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Thiès
                </button>
              </div>
            </div>

            {/* Map Embed */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="Carte d'accès"
                src={
                  activeCampusTab === "dakar"
                    ? "https://maps.google.com/maps?q=Dakar+Zone+B+Rue+G+Senegal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    : "https://maps.google.com/maps?q=Thies+Senegal+Caritas+Malick+Sy&t=&z=15&ie=UTF8&iwloc=&output=embed"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              <div className="absolute top-3 right-3 z-10">
                <a
                  href={
                    activeCampusTab === "dakar"
                      ? "https://maps.google.com/?q=Dakar+Zone+B+Rue+G+Senegal"
                      : "https://maps.google.com/?q=Thies+Senegal+Caritas+Malick+Sy"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-bold shadow-sm hover:bg-white border border-slate-200 inline-flex items-center gap-1.5"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Repères simples */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <Bus className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Bus Dakar Dem Dikk, BRT &amp; taxis</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <Car className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Parking surveillé sur place</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <Accessibility className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Accès personnes à mobilité réduite</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              5. FAQ COURTE & CONCISE
              ========================================================================= */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-heading font-black text-lg text-slate-900">
              Questions fréquentes
            </h2>

            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group"
                    >
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-afi-red transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-slate-900" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              6. BANNIÈRE FINALE COURTE
              ========================================================================= */}
          <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-white">
                Prêt à intégrer l&apos;AFI-L&apos;UE ?
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Les candidatures pour la rentrée 2026-2027 sont ouvertes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/candidater"
                className="px-5 py-2.5 rounded-xl bg-afi-red hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Candidater en ligne</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/formations"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
              >
                Voir les formations
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
