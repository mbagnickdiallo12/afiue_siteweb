"use client";

import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TextRevealFaqsProps {
  items?: FaqItem[];
  badge?: string;
  title?: string;
  description?: string;
  supportText?: string;
  supportLinkText?: string;
  supportLinkHref?: string;
}

const DEFAULT_MOBILITE_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "À quel moment de mon cursus puis-je postuler pour une mobilité internationale ?",
    answer: "La mobilité étudiante est généralement ouverte à partir de la 2ème année de Licence (L2) et en Master. Les étudiants en Licence 1 peuvent néanmoins intégrer directement le parcours International Leader dès leur inscription.",
  },
  {
    id: "faq-2",
    question: "Mes cours suivis à l'étranger sont-ils validés dans mon diplôme AFI-L'UE ?",
    answer: "Absolument. Conformément au système LMD et au contrat pédagogique signé avant votre départ, chaque crédit ECTS ou équivalent validé dans l'université partenaire est reconnu de plein droit pour l'obtention de votre diplôme à AFI-L'UE.",
  },
  {
    id: "faq-3",
    question: "Je suis un étudiant étranger, comment intégrer AFI-L'UE à Dakar ou Thiès ?",
    answer: "Vous pouvez candidater 100% en ligne sur notre plateforme. Dès votre pré-inscription validée, notre Bureau International vous délivre une attestation de pré-inscription pour vos formalités consulaires et vous guide jusqu'à votre arrivée.",
  },
  {
    id: "faq-4",
    question: "Quelles sont les opportunités de stages à l'international ?",
    answer: "Grâce à notre service carrières et aux conventions signées avec des multinationales partenaires opérant dans toute la sous-région et en Europe, nous accompagnons nos étudiants dans la recherche de stages de fin d'études à l'étranger.",
  },
  {
    id: "faq-5",
    question: "Quels sont les diplômes et certifications obtenus lors de la mobilité ?",
    answer: "Selon le programme choisi, vous bénéficiez soit d'une validation de crédits intégrée à votre diplôme d'État sénégalais accrédité CAMES, soit d'un double diplôme européen délivré avec la Fédération Européenne des Écoles (FEDE), en plus du passage officiel du TOEIC™ ou TFI™.",
  },
];

export function BlurredStagger({ text }: { text: string }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.008,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: 2,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-xs sm:text-sm leading-relaxed text-slate-600 break-words whitespace-normal font-normal"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}

export default function TextRevealFaqs({
  items = DEFAULT_MOBILITE_FAQS,
  badge = "Questions Fréquentes",
  title = "Tout Ce Que Vous Devez Savoir sur la Mobilité",
  description = "Retrouvez les réponses claires sur les semestres d'échanges, les bourses, les équivalences de crédits LMD et l'accueil international.",
  supportText,
  supportLinkText,
  supportLinkHref,
}: TextRevealFaqsProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14 items-start">
          {/* Colonne gauche (2 colonnes) : Titre & Badge */}
          <div className="md:col-span-2 space-y-4">
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-afi-red text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <HelpCircle className="w-3.5 h-3.5 text-white" />
                <span>{badge}</span>
              </span>
            )}
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.15]">
              {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {description}
            </p>

            {supportText && supportLinkText && supportLinkHref && (
              <div className="pt-2 hidden md:block border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  {supportText}{" "}
                  <Link
                    href={supportLinkHref}
                    className="text-afi-red font-bold hover:underline inline-flex items-center gap-1 mt-1 transition-colors"
                  >
                    <span>{supportLinkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Colonne droite (3 colonnes) : Accordéon épuré sans contour extérieur */}
          <div className="md:col-span-3">
            <Accordion type="single" collapsible defaultValue="faq-1" className="w-full">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-slate-200 last:border-b-0 py-1"
                >
                  <AccordionTrigger className="cursor-pointer text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-afi-red hover:no-underline transition-colors py-4 group">
                    <span className="pr-4 leading-snug group-hover:text-afi-red transition-colors">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Lien support sur mobile uniquement si fourni */}
          {supportText && supportLinkText && supportLinkHref && (
            <div className="md:hidden pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                {supportText}{" "}
                <Link
                  href={supportLinkHref}
                  className="text-afi-red font-bold hover:underline inline-flex items-center gap-1 mt-1 transition-colors"
                >
                  <span>{supportLinkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
