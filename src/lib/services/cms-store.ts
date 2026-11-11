import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  Formation,
  Testimonial,
  Article,
  ArticleCategory,
  HomepageSlide,
  Partner,
  StudentLifeItem,
  SiteSettings,
  Candidature,
  AdminUser,
  EventPopupConfig,
  EventPopupSlide,
} from "@/types/database";
import { ALL_FORMATIONS } from "@/lib/data/programme-hierarchy";
import {
  MOCK_TESTIMONIALS,
  MOCK_ARTICLES,
  MOCK_CATEGORIES,
  MOCK_SLIDES,
  MOCK_PARTNERS,
  MOCK_STUDENT_LIFE,
  MOCK_SITE_SETTINGS,
} from "@/lib/data/mock-data";

export interface DomainConfig {
  id: string;
  code: string;
  name: string;
  slug: string;
  short_description: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
}

export interface GradeConfig {
  id: string;
  name: string;
  level: "licence" | "master" | "doctorat";
  duration_years: number;
  default_ects: number;
}

export interface PricingGridConfig {
  id: string;
  name: string;
  level: "licence" | "master";
  registration_fee: number;
  monthly_fee: number;
  annual_fee_local: number;
  annual_fee_international: number;
  extra_fees?: string[];
  tiers: {
    label: string;
    registration_fee: string;
    monthly_fee: string;
    duration_months: string;
    schedule?: string;
  }[];
}

export interface CmsStoreData {
  formations: Formation[];
  testimonials: Testimonial[];
  articles: Article[];
  categories?: ArticleCategory[];
  slides: HomepageSlide[];
  partners: Partner[];
  student_life: StudentLifeItem[];
  settings: SiteSettings;
  candidatures: Candidature[];
  admin_users?: AdminUser[];
  domains_config?: DomainConfig[];
  grades_config?: GradeConfig[];
  pricing_grids_config?: PricingGridConfig[];
  event_popup?: EventPopupConfig;
}

export const DEFAULT_EVENT_POPUP_CONFIG: EventPopupConfig = {
  is_enabled: true,
  position: "bottom-left",
  auto_open_delay_ms: 1200,
  auto_slide_interval_ms: 4500,
  allow_dismiss_for_session: false,
  slides: [
    {
      id: "popup-slide-1",
      title: "Concours Meilleur Projet 2026",
      badge: "SME & Entrepreneuriat",
      subtitle: "Gagnez jusqu'à 3 000 000 FCFA de financement pour votre projet d'entreprise innovant !",
      image_url: "/images/events/event-sme-concours.jpg",
      cta_text: "Déposer un projet",
      cta_url: "/candidater",
      show_cta: true,
      target_date: "2026-12-15T18:00:00Z",
      show_countdown: true,
      order_index: 1,
      is_active: true,
    },
    {
      id: "popup-slide-2",
      title: "AFI TECH • Trophée Téranga Skills",
      badge: "Tech & Innovation",
      subtitle: "Célébration de l'excellence technologique et concours d'ingénierie logicielle.",
      image_url: "/images/events/event-afitech-teranga.jpg",
      cta_text: "Découvrir le cursus Tech",
      cta_url: "/formations/licence-genie-logiciel",
      show_cta: true,
      target_date: "2026-12-28T09:00:00Z",
      show_countdown: true,
      order_index: 2,
      is_active: true,
    },
    {
      id: "popup-slide-3",
      title: "Admissions & Prépa-Concours",
      badge: "Sessions 2026-2027",
      subtitle: "Intégrez les classes d'élite AFI-L'UE avec notre programme intensif de prépa-concours.",
      image_url: "/images/events/event-prepa-concours.jpg",
      cta_text: "S'inscrire à la session",
      cta_url: "/candidater",
      show_cta: true,
      target_date: "2026-12-05T10:00:00Z",
      show_countdown: true,
      order_index: 3,
      is_active: true,
    },
  ],
};

function hashSeedPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`afi-lue-salt-2026:${password}`)
    .digest("hex");
}

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-001",
    email: "admin@afi-ue.sn",
    full_name: "Pr. Abdoulaye Diop",
    role: "super_admin",
    department: "Direction Générale & SI",
    job_title: "Super Administrateur Système",
    phone: "+221 77 800 10 01",
    avatar_url: null,
    password_hash: hashSeedPassword("AdminAFI2026!"),
    is_active: true,
    permissions: [
      "formations",
      "candidatures",
      "articles",
      "testimonials",
      "slides",
      "vie_etudiante",
      "partenaires",
      "settings",
      "users",
    ],
    last_login_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    created_by: "Système Initial",
    created_at: "2026-01-15T09:00:00.000Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr-002",
    email: "etudes@afi-ue.sn",
    full_name: "Dr. Ousmane Bèye",
    role: "admin",
    department: "Direction des Études",
    job_title: "Directeur Académique Adjoint",
    phone: "+221 77 540 22 18",
    avatar_url: null,
    password_hash: hashSeedPassword("EtudesAFI2026!"),
    is_active: true,
    permissions: [
      "formations",
      "candidatures",
      "articles",
      "testimonials",
      "slides",
      "vie_etudiante",
      "partenaires",
      "settings",
    ],
    last_login_at: new Date(Date.now() - 86400000).toISOString(),
    created_by: "Pr. Abdoulaye Diop",
    created_at: "2026-02-10T10:30:00.000Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr-003",
    email: "scolarite@afi-ue.sn",
    full_name: "Mme Fatou Ndiaye",
    role: "scolarite",
    department: "Service Admissions & Scolarité",
    job_title: "Cheffe du Service Scolarité",
    phone: "+221 78 312 45 90",
    avatar_url: null,
    password_hash: hashSeedPassword("Scolarite2026!"),
    is_active: true,
    permissions: ["formations", "candidatures"],
    last_login_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    created_by: "Pr. Abdoulaye Diop",
    created_at: "2026-03-05T14:15:00.000Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr-004",
    email: "communication@afi-ue.sn",
    full_name: "M. Cheikh Tidiane Sy",
    role: "communication",
    department: "Communication & Relations Extérieures",
    job_title: "Responsable Communication Digitale",
    phone: "+221 76 490 88 12",
    avatar_url: null,
    password_hash: hashSeedPassword("ComAFI2026!"),
    is_active: true,
    permissions: [
      "articles",
      "testimonials",
      "slides",
      "vie_etudiante",
      "partenaires",
    ],
    last_login_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    created_by: "Pr. Abdoulaye Diop",
    created_at: "2026-04-01T11:00:00.000Z",
    updated_at: new Date().toISOString(),
  },
];

const STORE_PATH = path.join(process.cwd(), "data", "cms-store.json");

const INITIAL_CANDIDATURES: Candidature[] = [
  {
    id: "cand-001",
    reference_code: "AFI-2026-X8F4K",
    first_name: "Mamadou",
    last_name: "Diop",
    email: "mamadou.diop@gmail.com",
    phone: "+221 77 654 32 10",
    country: "Sénégal",
    city: "Dakar",
    birth_date: "2004-05-12",
    birth_place: "Dakar",
    previous_school: "Lycée Lamine Guèye",
    last_diploma: "Baccalauréat S2",
    session_academic_year: "2026-2027",
    status: "soumis",
    formation_id: "f1",
    admin_notes: "Dossier complet, en attente de validation par la scolarité.",
    reviewed_by: null,
    reviewed_at: null,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    updated_at: new Date().toISOString(),
    candidat_id: null,
    formation: {
      id: "f1",
      department_id: null,
      title: "Licence Intelligence Artificielle et Big Data",
      slug: "licence-intelligence-artificielle-et-big-data",
      level: "licence",
      mention: "Informatique & IA",
      domaine: "Technologies & Informatique",
      grade: "Licence (Bac+3)",
      duration_years: 3,
      credits_ects: 180,
      short_description: "Formation de pointe en IA et Big Data.",
      description: null,
      objectives: null,
      curriculum: null,
      career_opportunities: null,
      admission_requirements: null,
      tuition_fees_local: 920000,
      tuition_fees_international: 1120000,
      study_modes: ["initiale", "cours_du_soir", "weekend"],
      brochure_url: null,
      is_featured: true,
      is_active: true,
      order_index: 1,
      meta_title: null,
      meta_description: null,
      legacy_wp_id: null,
      legacy_wp_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "cand-002",
    reference_code: "AFI-2026-K9M2P",
    first_name: "Aissatou",
    last_name: "Sow",
    email: "aissatou.sow@yahoo.fr",
    phone: "+221 78 123 45 67",
    country: "Sénégal",
    city: "Thiès",
    birth_date: "2001-09-20",
    birth_place: "Thiès",
    previous_school: "Université de Thiès",
    last_diploma: "Licence Sciences Économiques",
    session_academic_year: "2026-2027",
    status: "en_revue",
    formation_id: "f2",
    admin_notes: "Dossier académique solide (moyenne 14/20). Entretien planifié.",
    reviewed_by: "Admin Scolarité",
    reviewed_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    candidat_id: null,
    formation: {
      id: "f2",
      department_id: null,
      title: "Master Audit et Contrôle de Gestion",
      slug: "master-audit-et-controle-de-gestion",
      level: "master",
      mention: "Audit & Finance",
      domaine: "Sciences Économiques et Gestion",
      grade: "Master (Bac+5)",
      duration_years: 2,
      credits_ects: 120,
      short_description: "Expertise en audit financier et contrôle stratégique.",
      description: null,
      objectives: null,
      curriculum: null,
      career_opportunities: null,
      admission_requirements: null,
      tuition_fees_local: 1130000,
      tuition_fees_international: 1130000,
      study_modes: ["cours_du_soir", "weekend"],
      brochure_url: null,
      is_featured: true,
      is_active: true,
      order_index: 2,
      meta_title: null,
      meta_description: null,
      legacy_wp_id: null,
      legacy_wp_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
];

function getInitialStore(): CmsStoreData {
  return {
    formations: ALL_FORMATIONS,
    testimonials: MOCK_TESTIMONIALS,
    articles: MOCK_ARTICLES,
    categories: MOCK_CATEGORIES,
    slides: MOCK_SLIDES,
    partners: MOCK_PARTNERS,
    student_life: MOCK_STUDENT_LIFE,
    settings: MOCK_SITE_SETTINGS,
    candidatures: INITIAL_CANDIDATURES,
    admin_users: INITIAL_ADMIN_USERS,
    event_popup: DEFAULT_EVENT_POPUP_CONFIG,
  };
}

export function readCmsStore(): CmsStoreData {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      const initial = getInitialStore();
      const dir = path.dirname(STORE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }

    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsStoreData>;

    const mergedFormations =
      parsed.formations && parsed.formations.length > 0
        ? parsed.formations.map((stored) => {
            const seed = ALL_FORMATIONS.find(
              (f) => f.id === stored.id || f.slug === stored.slug
            );
            if (!seed) return stored;
            return {
              ...seed,
              ...stored,
              mention: stored.mention ?? seed.mention,
              specialty: stored.specialty ?? seed.specialty,
              domaine: stored.domaine ?? seed.domaine,
              grade: stored.grade ?? seed.grade,
              duration_label: stored.duration_label ?? seed.duration_label,
              program_blocks:
                stored.program_blocks && stored.program_blocks.length > 0
                  ? stored.program_blocks
                  : seed.program_blocks,
              career_opportunities_list:
                stored.career_opportunities_list &&
                stored.career_opportunities_list.length > 0
                  ? stored.career_opportunities_list
                  : seed.career_opportunities_list,
              admission_conditions_list:
                stored.admission_conditions_list &&
                stored.admission_conditions_list.length > 0
                  ? stored.admission_conditions_list
                  : seed.admission_conditions_list,
              tuition_summary: stored.tuition_summary ?? seed.tuition_summary,
              tuition_tiers:
                stored.tuition_tiers && stored.tuition_tiers.length > 0
                  ? stored.tuition_tiers
                  : seed.tuition_tiers,
              extra_fees:
                stored.extra_fees && stored.extra_fees.length > 0
                  ? stored.extra_fees
                  : seed.extra_fees,
              international_leader:
                stored.international_leader !== undefined
                  ? stored.international_leader
                  : seed.international_leader,
              accreditations:
                stored.accreditations && stored.accreditations.length > 0
                  ? stored.accreditations
                  : seed.accreditations,
            };
          })
        : ALL_FORMATIONS;

    return {
      formations: mergedFormations,
      testimonials: parsed.testimonials && parsed.testimonials.length > 0 ? parsed.testimonials : MOCK_TESTIMONIALS,
      articles: parsed.articles && parsed.articles.length > 0 ? parsed.articles : MOCK_ARTICLES,
      categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : MOCK_CATEGORIES,
      slides: parsed.slides && parsed.slides.length > 0 ? parsed.slides : MOCK_SLIDES,
      partners: Array.isArray(parsed.partners) && parsed.partners.length > 0 ? parsed.partners : MOCK_PARTNERS,
      student_life: Array.isArray(parsed.student_life) && parsed.student_life.length > 0 ? parsed.student_life : MOCK_STUDENT_LIFE,
      settings: parsed.settings ? { ...MOCK_SITE_SETTINGS, ...parsed.settings } : MOCK_SITE_SETTINGS,
      candidatures: parsed.candidatures ? parsed.candidatures : INITIAL_CANDIDATURES,
      admin_users:
        Array.isArray(parsed.admin_users) && parsed.admin_users.length > 0
          ? parsed.admin_users
          : INITIAL_ADMIN_USERS,
      domains_config: parsed.domains_config || [],
      grades_config: parsed.grades_config || [],
      pricing_grids_config: parsed.pricing_grids_config || [],
      event_popup:
        parsed.event_popup && Array.isArray(parsed.event_popup.slides)
          ? parsed.event_popup
          : DEFAULT_EVENT_POPUP_CONFIG,
    };
  } catch (error) {
    console.warn("Failed to read CMS store, falling back to in-memory:", error);
    return getInitialStore();
  }
}

export function writeCmsStore(data: CmsStoreData): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${STORE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, STORE_PATH);
  } catch (error) {
    console.error("Failed to write to CMS store:", error);
  }
}
