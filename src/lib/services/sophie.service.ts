import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getFormations } from "@/lib/services/formations.service";

/* ============================================================================
   SOPHIE — Agent IA d'orientation AFI-L'UE
   Base de connaissances (site + apprentissage admin) & moteur de réponse.
   ============================================================================ */

export type SophieCategory =
  | "admissions"
  | "formations"
  | "frais"
  | "campus"
  | "vie_etudiante"
  | "general"
  | "document";

export interface SophieKnowledgeItem {
  id: string;
  title: string;
  category: SophieCategory;
  content: string;
  source: "manual" | "document";
  file_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SophieConfig {
  is_enabled: boolean;
  welcome_message: string;
  suggestions: string[];
  extra_instructions: string;
}

export interface SophieStore {
  config: SophieConfig;
  knowledge: SophieKnowledgeItem[];
}

export interface SophieChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORE_PATH = path.join(process.cwd(), "data", "sophie-knowledge.json");

export const DEFAULT_SOPHIE_CONFIG: SophieConfig = {
  is_enabled: true,
  welcome_message:
    "Bonjour, je suis Sophie, la conseillère virtuelle d'AFI-L'UE. Je peux vous orienter vers la bonne formation, vous expliquer les admissions et les frais. Que puis-je faire pour vous ?",
  suggestions: [
    "Quels Masters proposez-vous ?",
    "Quels sont les frais de scolarité ?",
    "Comment candidater ?",
    "Où se trouvent vos campus ?",
  ],
  extra_instructions: "",
};

/* ----------------------------------------------------------------------------
   Persistance
   ---------------------------------------------------------------------------- */

export function readSophieStore(): SophieStore {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
      return {
        config: { ...DEFAULT_SOPHIE_CONFIG, ...(parsed.config || {}) },
        knowledge: Array.isArray(parsed.knowledge) ? parsed.knowledge : [],
      };
    }
  } catch (err) {
    console.error("Sophie store read error:", err);
  }
  return { config: { ...DEFAULT_SOPHIE_CONFIG }, knowledge: [] };
}

export function writeSophieStore(store: SophieStore): void {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export function updateSophieConfig(patch: Partial<SophieConfig>): SophieConfig {
  const store = readSophieStore();
  store.config = { ...store.config, ...patch };
  writeSophieStore(store);
  return store.config;
}

export function addKnowledgeItem(
  input: Pick<SophieKnowledgeItem, "title" | "category" | "content"> &
    Partial<Pick<SophieKnowledgeItem, "source" | "file_name">>,
): SophieKnowledgeItem {
  const store = readSophieStore();
  const now = new Date().toISOString();
  const item: SophieKnowledgeItem = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    category: input.category,
    content: input.content.trim(),
    source: input.source || "manual",
    file_name: input.file_name,
    is_active: true,
    created_at: now,
    updated_at: now,
  };
  store.knowledge.unshift(item);
  writeSophieStore(store);
  return item;
}

export function updateKnowledgeItem(
  id: string,
  patch: Partial<Omit<SophieKnowledgeItem, "id" | "created_at">>,
): SophieKnowledgeItem | null {
  const store = readSophieStore();
  const idx = store.knowledge.findIndex((k) => k.id === id);
  if (idx === -1) return null;
  store.knowledge[idx] = {
    ...store.knowledge[idx],
    ...patch,
    updated_at: new Date().toISOString(),
  };
  writeSophieStore(store);
  return store.knowledge[idx];
}

export function deleteKnowledgeItem(id: string): boolean {
  const store = readSophieStore();
  const before = store.knowledge.length;
  store.knowledge = store.knowledge.filter((k) => k.id !== id);
  writeSophieStore(store);
  return store.knowledge.length < before;
}

/* ----------------------------------------------------------------------------
   Connaissances officielles du site (toujours à jour)
   ---------------------------------------------------------------------------- */

interface Chunk {
  title: string;
  content: string;
  url?: string;
}

const INSTITUTION_FACTS: Chunk[] = [
  {
    title: "Présentation d'AFI-L'UE",
    content:
      "AFI-L'UE (L'Université de l'Entreprise) est une université privée sénégalaise fondée en 1993, basée à Dakar et Thiès. Elle forme des leaders, gestionnaires et ingénieurs. Diplômes accrédités par l'ANAQ-Sup, reconnus par le CAMES et habilités par l'État du Sénégal. Directrice Générale : Mme Sophie Diouf COULIBALY.",
    url: "/universite",
  },
  {
    title: "Campus et coordonnées",
    content:
      "Campus AFI Dakar (siège principal) : Dakar, Zone B Rue G, proche du Point E. Tél : +221 33 824 71 10 / +221 77 508 87 28 (WhatsApp). Email : afi@afi-ue.sn. Horaires : lundi–vendredi 8h30–18h30, samedi 9h00–13h00. Campus AFI-Thiès : Quartier Caritas, en face Cité Malick Sy (Mbour 4, en face antenne RTS). Tél : +221 33 951 00 00. Email : thies@afi-ue.sn. AFI-TECH Dakar : école des technologies (IA, génie logiciel, réseaux et cloud).",
    url: "/contact",
  },
  {
    title: "Régimes d'études",
    content:
      "Licences (Bac+3, 3 ans) : Formation Initiale cours du jour (lundi–vendredi 08h00–17h00), Cours du soir (17h30–20h45), Week-end (samedi et dimanche 09h00–17h00, en L3) et E-learning. Masters (Bac+5, 2 ans) : disponibles en Cours du soir, Week-end et À distance (E-learning).",
    url: "/formations",
  },
  {
    title: "Frais de scolarité Licence",
    content:
      "Licence : inscription 170 000 FCFA. Formation Initiale Multiprogramme : 75 000 FCFA/mois en L1, 80 000 en L2, 85 000 en L3 (10 mois, octobre à juillet). Parcours International Leader : 95 000 FCFA/mois. Cours du soir : 70 000 FCFA/mois (10 mois). Week-end : 80 000 FCFA/mois (9 mois). E-learning : inscription 200 000 FCFA + 90 000 FCFA/mois. Frais annexes : uniforme L1/L2 50 000 FCFA, bootcamp L1 40 000 FCFA, bibliothèque numérique 10 000 FCFA/an, mémoire L3 70 000 FCFA, graduation L3 70 000 FCFA.",
    url: "/admissions",
  },
  {
    title: "Frais de scolarité Master",
    content:
      "Master : inscription 180 000 FCFA, puis 95 000 FCFA/mois en cours du soir (10 mois) ou week-end (9 mois). E-learning : inscription 200 000 FCFA + 100 000 FCFA/mois. Frais annexes : bibliothèque numérique 10 000 FCFA, mémoire et encadrement M2 100 000 FCFA, graduation M2 70 000 FCFA.",
    url: "/admissions",
  },
  {
    title: "Procédure d'admission",
    content:
      "1) Choisir sa formation dans le catalogue. 2) Déposer sa candidature en ligne sur /candidater (relevés de notes et diplômes). 3) Entretien d'admission en présentiel ou en visioconférence. 4) Décision sous 72h puis inscription administrative. Licence : Baccalauréat toutes séries. Master : Licence (Bac+3) ou équivalent, sélection sur dossier et entretien. Les candidats hors Dakar ou à l'étranger peuvent tout faire en ligne.",
    url: "/candidater",
  },
  {
    title: "Programme International Leader",
    content:
      "International Leader est un parcours de Licence en Formation Initiale (cours du jour) avec double diplomation : diplôme de l'État du Sénégal et diplôme européen FEDE, plus préparation au TOEIC, coaching en leadership, prise de parole et rencontres avec des personnalités. Il n'est pas disponible en soir, week-end ou e-learning.",
    url: "/formations",
  },
  {
    title: "PRESUP, Executive Education, Recherche et Entreprises",
    content:
      "PRESUP : école préparatoire (immersion en français, test TFI, 600h). Executive Education : formation continue pour cadres en cours du soir et week-end. AFI Research Center : centre de recherche et laboratoire AFI-Lab. AFI-BOOST : incubateur d'entreprises (mentorat, création d'entreprise). Service Carrières : stages, emploi et insertion. Vie étudiante : plus de 26 nationalités, clubs et événements.",
    url: "/universite",
  },
];

async function buildSiteChunks(): Promise<Chunk[]> {
  const chunks: Chunk[] = [...INSTITUTION_FACTS];
  try {
    const formations = await getFormations();
    const licences = formations.filter((f) => f.level === "licence");
    const masters = formations.filter((f) => f.level === "master");

    chunks.push({
      title: "Liste des Licences",
      content: `AFI-L'UE propose ${licences.length} Licences (Bac+3) : ${licences
        .map((f) => f.title)
        .join(" ; ")}.`,
      url: "/formations?level=licence",
    });
    chunks.push({
      title: "Liste des Masters",
      content: `AFI-L'UE propose ${masters.length} Masters (Bac+5), en soir, week-end et à distance : ${masters
        .map((f) => f.title)
        .join(" ; ")}.`,
      url: "/formations?level=master",
    });

    for (const f of formations) {
      const isMaster = f.level === "master";
      const careers =
        f.career_opportunities_list?.join(", ") || f.career_opportunities || "";
      chunks.push({
        title: f.title,
        url: `/formations/${f.slug}`,
        content: [
          `${f.title} (${isMaster ? "Master, Bac+5, 2 ans" : "Licence, Bac+3, 3 ans"}).`,
          f.domain?.name ? `Domaine : ${f.domain.name}.` : "",
          `Régimes : ${isMaster ? "Soir, Week-end, À distance" : "Jour, Soir, Week-end, E-learning"}.`,
          f.short_description || "",
          (f.description || "").slice(0, 600),
          careers ? `Débouchés : ${careers}.` : "",
          f.admission_requirements ? `Admission : ${f.admission_requirements}` : "",
          f.tuition_summary ? `Frais : ${f.tuition_summary}` : "",
        ]
          .filter(Boolean)
          .join(" "),
      });
    }
  } catch (err) {
    console.error("Sophie: formations load error", err);
  }
  return chunks;
}

/* ----------------------------------------------------------------------------
   Recherche (retrieval) — score par recouvrement de termes normalisés
   ---------------------------------------------------------------------------- */

const STOPWORDS = new Set(
  "le la les un une des de du d l et ou a au aux en dans pour par sur avec est sont je tu il elle nous vous ils elles mon ma mes votre vos quel quelle quels quelles comment combien que qui quoi ce cet cette ces se sa son ses ne pas plus y t on me moi faire peut puis il".split(
    " ",
  ),
);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+]+/g, " ")
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map((t) => (t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t));
}

function splitLong(c: Chunk): Chunk[] {
  if (c.content.length <= 1400) return [c];
  const parts: Chunk[] = [];
  const sentences = c.content.split(/(?<=[.!?])\s+/);
  let buf = "";
  for (const s of sentences) {
    if ((buf + " " + s).length > 1200 && buf) {
      parts.push({ ...c, content: buf.trim() });
      buf = "";
    }
    buf += " " + s;
  }
  if (buf.trim()) parts.push({ ...c, content: buf.trim() });
  return parts;
}

async function getAllChunks(): Promise<Chunk[]> {
  const site = await buildSiteChunks();
  const learned = readSophieStore()
    .knowledge.filter((k) => k.is_active)
    .map((k) => ({ title: k.title, content: k.content }));
  return [...learned, ...site].flatMap(splitLong);
}

function retrieve(chunks: Chunk[], query: string, k = 6): Chunk[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return chunks.slice(0, 3);
  const df = new Map<string, number>();
  const docs = chunks.map((c) => {
    const toks = tokenize(`${c.title} ${c.title} ${c.content}`);
    new Set(toks).forEach((t) => df.set(t, (df.get(t) || 0) + 1));
    return toks;
  });
  const N = chunks.length;
  const scored = chunks.map((c, i) => {
    const toks = docs[i];
    let score = 0;
    for (const q of qTokens) {
      const tf = toks.filter((t) => t === q || (q.length > 4 && t.startsWith(q))).length;
      if (tf === 0) continue;
      const idf = Math.log(1 + N / (df.get(q) || 1));
      score += (tf / (tf + 1.5)) * idf;
    }
    return { c, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.c);
}

/* ----------------------------------------------------------------------------
   Génération de la réponse
   ---------------------------------------------------------------------------- */

function buildSystemPrompt(config: SophieConfig, context: Chunk[]): string {
  return `Tu es Sophie, la conseillère virtuelle officielle d'AFI-L'UE (L'Université de l'Entreprise, Dakar et Thiès, Sénégal).
Ton rôle : orienter les futurs étudiants, informer les visiteurs et répondre à leurs questions sur AFI-L'UE.

Règles strictes :
- Réponds UNIQUEMENT à partir des INFORMATIONS OFFICIELLES ci-dessous. N'invente jamais un chiffre, une formation, une date ou un prix.
- Si l'information n'y figure pas, dis-le simplement et propose de contacter un conseiller : +221 77 508 87 28 (WhatsApp) ou afi@afi-ue.sn.
- Refuse poliment les sujets sans rapport avec AFI-L'UE et ramène la conversation vers l'université.
- Réponds en français (ou dans la langue de l'utilisateur), de façon chaleureuse, claire et concise : 2 à 6 phrases ou une courte liste.
- Pour orienter, pose une question sur le niveau (Bac, Licence, professionnel) ou le domaine d'intérêt si nécessaire.
- Quand c'est utile, mentionne le lien de la page concernée (ex. /candidater, /formations/...).
${config.extra_instructions ? `\nConsignes supplémentaires de l'administration :\n${config.extra_instructions}\n` : ""}
INFORMATIONS OFFICIELLES :
${context.map((c, i) => `[${i + 1}] ${c.title}${c.url ? ` (${c.url})` : ""}\n${c.content}`).join("\n\n")}`;
}

async function callGemini(
  system: string,
  messages: SophieChatMessage[],
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
        }),
      },
    );
    if (!res.ok) {
      console.error("Sophie Gemini error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text || "")
      .join("")
      .trim();
    return text || null;
  } catch (err) {
    console.error("Sophie Gemini fetch error:", err);
    return null;
  }
}

/** Réponse locale (sans clé IA) : renvoie les passages officiels les plus pertinents. */
function localAnswer(query: string, context: Chunk[]): string {
  const q = query.toLowerCase();
  if (/^(bonjour|salut|hello|bonsoir|hi)\b/.test(q.trim()) && q.length < 25) {
    return "Bonjour ! Je suis Sophie, la conseillère virtuelle d'AFI-L'UE. Dites-moi votre niveau d'études ou le domaine qui vous intéresse, et je vous oriente vers la bonne formation.";
  }
  if (context.length === 0) {
    return "Je n'ai pas encore cette information. Un conseiller peut vous répondre directement au +221 77 508 87 28 (WhatsApp) ou par email à afi@afi-ue.sn.";
  }
  const best = context.slice(0, 2);
  const body = best
    .map((c) => {
      const text = c.content.length > 520 ? `${c.content.slice(0, 520).trim()}…` : c.content;
      return `**${c.title}**\n${text}${c.url ? `\n→ ${c.url}` : ""}`;
    })
    .join("\n\n");
  return `${body}\n\nBesoin de plus de détails ? Contactez un conseiller au +221 77 508 87 28.`;
}

export async function answerSophie(
  messages: SophieChatMessage[]
): Promise<{ reply: string; sources: string[] }> {
  const store = readSophieStore();
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return { reply: store.config.welcome_message, sources: [] };

  const chunks = await getAllChunks();
  // On enrichit la requête avec le message précédent pour garder le fil.
  const prevUser = messages.filter((m) => m.role === "user").slice(-2, -1)[0];
  const query = `${lastUser.content} ${prevUser?.content || ""}`;
  const context = retrieve(chunks, query, 7);

  const llm = await callGemini(
    buildSystemPrompt(store.config, context.length ? context : INSTITUTION_FACTS),
    messages.slice(-10),
  );
  const rawReply = llm ?? localAnswer(lastUser.content, retrieve(chunks, lastUser.content, 3));
  const reply = rawReply.replace(/https?:\/\/[^\s]*21st\.dev[^\s)]*/gi, "").trim();
  const sources = context.slice(0, 3).map((c) => c.title);
  return { reply, sources };
}

