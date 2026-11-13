"use client";

import { useState } from "react";
import {
  Share2,
  Check,
  Copy,
  Printer,
  MessageCircle,
} from "lucide-react";

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.55a1.64 1.64 0 0 0-1.66 1.64 1.65 1.65 0 0 0 1.66 1.66 1.64 1.64 0 0 0 1.65-1.66 1.65 1.65 0 0 0-1.65-1.64Z" />
    </svg>
  );
}

interface ArticleShareBarProps {
  title: string;
  slug: string;
  variant?: "horizontal" | "sidebar";
}

export function ArticleShareBar({
  title,
  slug,
  variant = "horizontal",
}: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/actualites/${slug}`;
    }
    return `https://afi-ue.sn/actualites/${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      const url = getUrl();
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Découvrez cet article sur l'AFI-L'UE : ${title}`,
          url: getUrl(),
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const url = typeof window !== "undefined" ? encodeURIComponent(getUrl()) : "";
  const encodedTitle = encodeURIComponent(title);

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodedTitle}%20${url}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}`;

  if (variant === "sidebar") {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Share2 className="w-4 h-4 text-afi-red" />
          <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900">
            Partager l&apos;article
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0A66C2] text-white font-bold hover:bg-[#004182] transition-colors shadow-xs"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black text-white font-bold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <span className="font-bold">𝕏</span>
            <span>Twitter</span>
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-bold transition-all shadow-xs ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer la page</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-afi-red hover:underline"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Partager via...</span>
          </button>
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-afi-red" />
        Partager :
      </span>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur WhatsApp"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white font-bold hover:bg-[#004182] transition-colors"
      >
        <LinkedinIcon className="w-3.5 h-3.5" />
        <span>LinkedIn</span>
      </a>

      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur X (Twitter)"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white font-bold hover:bg-slate-800 transition-colors"
      >
        <span className="font-bold">𝕏</span>
        <span>Post</span>
      </a>

      <button
        type="button"
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
          copied
            ? "bg-emerald-600 text-white"
            : "bg-slate-100 text-slate-800 hover:bg-slate-200"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Lien copié !</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copier le lien</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        aria-label="Imprimer l'article"
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors ml-auto sm:ml-0"
        title="Imprimer"
      >
        <Printer className="w-4 h-4" />
      </button>
    </div>
  );
}
