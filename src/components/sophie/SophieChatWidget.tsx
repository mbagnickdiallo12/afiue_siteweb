"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Mic, MicOff, RotateCcw, Sparkles, X } from "lucide-react";
import { HandoffBeam, createSimulatedVoice, type BeamPhase } from "@/components/ui/handoff-beam";
import { SophieAvatar3D } from "@/components/sophie/SophieAvatar3D";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

/* ============================================================================
   Sophie — widget de chat (bas droite, toutes les pages publiques)
   ============================================================================ */

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  at: number;
}

interface PublicConfig {
  is_enabled: boolean;
  welcome_message: string;
  suggestions: string[];
}

const STORAGE_KEY = "afi-sophie-chat-v3";
// Palette du faisceau aux couleurs AFI : centre, bord, réflexion, écoute, parole.
const AFI_BEAM = ["#e5252f", "#ff6b6b", "#ffc2c2", "#ff4d5a", "#ff8a8a"];

const voiceLevel = createSimulatedVoice(17);

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Rendu léger : **gras**, liens internes (/page) et retours à la ligne. */
function renderRich(text: string, onNavigate: () => void): ReactNode[] {
  const sanitized = text.replace(/https?:\/\/21st\.dev[^\s)]*/gi, "").trim();
  return sanitized.split("\n").map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*|(?:→\s*)?\/[a-z0-9\-/?=&]+)/gi).filter(Boolean);
    return (
      <span key={li} className="block min-h-[1em]">
        {parts.map((p, pi) => {
          if (p.startsWith("**") && p.endsWith("**")) {
            return (
              <strong key={pi} className="font-semibold text-white">
                {p.slice(2, -2)}
              </strong>
            );
          }
          const m = p.match(/^(?:→\s*)?(\/[a-z0-9\-/?=&]+)$/i);
          if (m) {
            return (
              <Link
                key={pi}
                href={m[1]}
                onClick={onNavigate}
                className="font-medium text-[#ff8a8a] underline underline-offset-2 hover:text-white"
              >
                {m[1] === "/candidater" ? "Candidater en ligne" : "Voir la page"} →
              </Link>
            );
          }
          return <span key={pi}>{p}</span>;
        })}
      </span>
    );
  });
}

const DEFAULT_PUBLIC_CONFIG: PublicConfig = {
  is_enabled: true,
  welcome_message:
    "Bonjour, je suis Sophie, la conseillère virtuelle d'AFI-L'UE. Je peux vous orienter vers la bonne formation, vous expliquer les admissions et les frais. Que puis-je faire pour vous ?",
  suggestions: [
    "Quels Masters proposez-vous ?",
    "Quels sont les frais de scolarité ?",
    "Comment candidater ?",
    "Où se trouvent vos campus ?",
  ],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type SpeechRecognitionLike = any;

export function SophieChatWidget() {
  const [config, setConfig] = useState<PublicConfig>(DEFAULT_PUBLIC_CONFIG);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike>(null);

  // Configuration publique + historique de session.
  useEffect(() => {
    fetch("/api/sophie/config")
      .then((r) => r.json())
      .then((c: PublicConfig) => setConfig(c))
      .catch(() => setConfig(DEFAULT_PUBLIC_CONFIG));
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const list = JSON.parse(saved);
        setMessages(
          Array.isArray(list)
            ? list.filter((m: ChatMessage) => m && typeof m.content === "string" && !m.content.includes("21st.dev"))
            : []
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;
      const userMsg: ChatMessage = { id: uid(), role: "user", content: text, at: Date.now() };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      try {
        const res = await fetch("/api/sophie/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: next.slice(-12).map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        clearTimeout(timeoutId);
        const data = await res.json().catch(() => ({}));
        const reply =
          data.reply ||
          data.error ||
          "Désolée, je n'ai pas pu répondre. Contactez un conseiller au +221 77 508 87 28.";
        setMessages((prev) => [...prev, { id: uid(), role: "assistant", content: reply, at: Date.now() }]);
        setSpeaking(true);
        setTimeout(() => setSpeaking(false), 2200);
      } catch {
        clearTimeout(timeoutId);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: "Je suis désolée, une petite coupure réseau est survenue. N'hésitez pas à reposer votre question ou à nous contacter sur WhatsApp au +221 77 508 87 28.",
            at: Date.now(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  const toggleDictation = () => {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      inputRef.current?.focus();
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SR();
    rec.lang = "fr-FR";
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  if (!config?.is_enabled) return null;

  const phase: BeamPhase = loading
    ? "thinking"
    : speaking
      ? "speaking"
      : listening || input.length > 0
        ? "listening"
        : "idle";

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* ================= Bouton flottant ================= */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Discuter avec Sophie AI"
              className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0d1527] via-[#141f38] to-[#0d1527] py-2 pl-2.5 pr-5 shadow-[0_14px_35px_-6px_rgba(11,17,32,0.7)] border border-white/15 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-sky-400/50 hover:shadow-[0_16px_40px_-6px_rgba(93,158,255,0.4)] active:scale-[0.98] cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <SophieAvatar3D size={42} isSpeaking={speaking} isThinking={loading} />
              <span className="text-left leading-none">
                <span className="text-[15px] font-bold text-white tracking-wide font-heading">
                  Sophie AI
                </span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= Fenêtre de chat ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat avec Sophie AI"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 330, damping: 30 }}
            className="fixed z-[70] inset-x-2 bottom-2 top-16 sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-6 sm:w-[420px] sm:h-[min(650px,calc(100vh-48px))] flex flex-col overflow-hidden rounded-[30px] bg-gradient-to-b from-[#0e1629] via-[#090e1c] to-[#05070f] text-[#ededed] shadow-[0_30px_80px_-15px_rgba(5,10,25,0.9)] border border-white/10 ring-1 ring-white/5"
          >
            {/* Dot Pattern d'AFI-L'UE sur l'ensemble du fond */}
            <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className="fill-white/[0.08] [mask-image:radial-gradient(420px_circle_at_center,white,transparent)] pointer-events-none"
            />

            {/* Lueur d'ambiance moderne (Aura dégradée AFI Navy & Ruby) */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[380px] h-[220px] bg-gradient-to-b from-afi-red/20 via-[#1b2754]/35 to-transparent blur-3xl opacity-80" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 w-[240px] h-[240px] bg-[#1e2e6b]/25 blur-3xl rounded-full" />
            <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* En-tête */}
            <div className="relative z-10 flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
              <SophieAvatar3D size={38} isSpeaking={speaking} isThinking={loading} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white tracking-wide font-heading">
                  Sophie AI
                </p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label="Nouvelle conversation"
                  title="Nouvelle conversation"
                  className="grid size-9 place-items-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="grid size-9 place-items-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {/* Message d'accueil */}
              <div className="max-w-[88%]">
                <p className="mb-1.5 text-[11px] font-bold text-sky-400 tracking-wide uppercase">Sophie AI</p>
                <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-[#18233c] via-[#121a2d] to-[#0e1526] p-4 text-[13.5px] leading-relaxed text-[#f1f5f9] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  {config.welcome_message}
                </div>
              </div>

              {showWelcome && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {config.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full bg-gradient-to-r from-[#151f36] to-[#101729] px-3.5 py-2 text-[12.5px] font-medium text-slate-200 border border-white/10 hover:border-afi-red/50 hover:from-[#1b2744] hover:to-[#141d33] hover:text-white transition-all shadow-xs cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "assistant" ? (
                  <div key={m.id} className="max-w-[88%]">
                    <p className="mb-1.5 text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                      <span className="text-sky-400 font-bold">Sophie AI</span>
                      <span>•</span>
                      <span>{formatTime(m.at)}</span>
                    </p>
                    <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-[#18233c] via-[#121a2d] to-[#0e1526] p-4 text-[13.5px] leading-relaxed text-[#f1f5f9] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                      {renderRich(m.content, () => setOpen(false))}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="ml-auto max-w-[85%] flex flex-col items-end">
                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] px-4 py-3 text-[13.5px] leading-relaxed text-slate-900 font-medium shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-white/80">
                      {m.content}
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      {i < messages.length - 1 || !loading ? "Lu" : "Envoyé"} {formatTime(m.at)}
                    </p>
                  </div>
                ),
              )}

              {loading && (
                <div className="max-w-[88%]">
                  <p className="mb-1.5 text-[11px] font-semibold text-sky-400">Sophie AI réfléchit...</p>
                  <div className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-br from-[#18233c] to-[#0e1526] px-4 py-3.5 border border-white/10 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1.5 rounded-full bg-afi-red"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Barre de saisie sans contours durs */}
            <div className="relative z-10 px-3 pb-3 pt-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <HandoffBeam
                  phase={phase}
                  level={voiceLevel}
                  palette={AFI_BEAM}
                  tone="dark"
                  phaseLabels={{
                    idle: "Sophie est prête",
                    listening: "Sophie vous écoute",
                    thinking: "Sophie réfléchit",
                    speaking: "Sophie répond",
                  }}
                  className="w-full shadow-lg"
                >
                  <div className="flex h-16 w-full items-center gap-2 rounded-[32px] bg-gradient-to-b from-[#141c30] to-[#0c1222] py-2 pr-2 pl-5 shadow-inner border-0 ring-0 focus-within:ring-1 focus-within:ring-afi-red/40">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      aria-label="Votre question pour Sophie"
                      placeholder={listening ? "Je vous écoute…" : "Posez votre question à Sophie"}
                      maxLength={2000}
                      className="min-w-0 flex-1 bg-transparent text-[15px] text-[#f1f5f9] outline-none placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={toggleDictation}
                      aria-label={listening ? "Arrêter la dictée" : "Dicter votre question"}
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full transition active:scale-[0.97] cursor-pointer border-0",
                        listening ? "bg-afi-red text-white shadow-[0_0_12px_rgba(229,37,47,0.5)]" : "bg-white/10 text-slate-300 hover:text-white hover:bg-white/15",
                      )}
                    >
                      {listening ? <MicOff size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
                    </button>
                    <button
                      type="submit"
                      aria-label="Envoyer"
                      disabled={!input.trim() || loading}
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full transition active:scale-[0.97] cursor-pointer disabled:cursor-default border-0",
                        input.trim() && !loading ? "bg-afi-red text-white shadow-[0_0_12px_rgba(229,37,47,0.5)]" : "bg-white/10 text-slate-500",
                      )}
                    >
                      <ArrowUp size={18} aria-hidden="true" />
                    </button>
                  </div>
                </HandoffBeam>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

