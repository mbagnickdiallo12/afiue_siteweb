export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | "super_admin"
  | "admin"
  | "scolarite"
  | "communication"
  | "candidat";

export type DegreeLevel = "licence" | "master" | "certification" | "doctorat";

export type CandidatureStatus =
  | "brouillon"
  | "soumis"
  | "en_revue"
  | "admissible"
  | "admis"
  | "rejete"
  | "liste_attente";

export type DocumentType =
  | "diplome_bac"
  | "releve_notes"
  | "piece_identite"
  | "cv"
  | "lettre_motivation"
  | "photo_identite"
  | "autre";

export type PublicationStatus = "draft" | "published" | "archived";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type AdminRole =
  | "super_admin"
  | "admin"
  | "scolarite"
  | "communication";

export type AdminModulePermission =
  | "formations"
  | "candidatures"
  | "articles"
  | "testimonials"
  | "slides"
  | "vie_etudiante"
  | "partenaires"
  | "settings"
  | "users";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  department: string;
  job_title?: string | null;
  phone: string | null;
  avatar_url: string | null;
  password_hash: string;
  is_active: boolean;
  permissions: AdminModulePermission[];
  last_login_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type SafeAdminUser = Omit<AdminUser, "password_hash">;

export interface Domain {
  id: string;
  code: string; // 'SEG', 'SJPA', 'ST', 'SHS'
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  banner_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  formations_count?: number;
  licences_count?: number;
  masters_count?: number;
}

export interface DomainHierarchy extends Domain {
  mentions: {
    licences: Formation[];
    masters: Formation[];
  };
}

export interface Department {
  id: string;
  domain_id?: string | null;
  code: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order_index: number;
  created_at: string;
}

export interface StudyFormat {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Accreditation {
  id: string;
  name: string;
  code: string;
  organization: string;
  logo_url: string | null;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface ProgramBlock {
  title: string;
  items: string[];
}

export interface TuitionTier {
  label: string;
  registration_fee: string;
  monthly_fee: string;
  duration_months: string;
  schedule?: string;
}

export interface InternationalLeaderInfo {
  available: boolean;
  description: string;
  activities: string[];
  destinations?: string[];
}

export interface Formation {
  id: string;
  department_id: string | null;
  domain_id?: string | null;
  title: string;
  slug: string;
  level: DegreeLevel;
  mention: string | null;
  specialty?: string | null;
  domaine: string | null;
  grade: string | null;
  duration_years: number;
  duration_label?: string | null;
  credits_ects: number | null;
  short_description: string | null;
  description: string | null;
  objectives: string | null;
  curriculum: string | null;
  program_blocks?: ProgramBlock[];
  career_opportunities: string | null;
  career_opportunities_list?: string[];
  admission_requirements: string | null;
  admission_conditions_list?: string[];
  tuition_fees_local: number | null;
  tuition_fees_international: number | null;
  tuition_summary?: string | null;
  tuition_tiers?: TuitionTier[];
  extra_fees?: string[];
  study_modes: string[];
  brochure_url: string | null;
  image_url?: string | null;
  international_leader?: InternationalLeaderInfo | null;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  legacy_wp_id: number | null;
  legacy_wp_url: string | null;
  created_at: string;
  updated_at: string;
  // Expanded fields (joins)
  domain?: Domain | null;
  department?: Department | null;
  accreditations?: Accreditation[];
}

export interface AcademicProgram {
  id: string;
  formation_id: string;
  title: string;
  slug: string;
  description: string | null;
  total_credits: number;
  evaluation_methods: string | null;
  created_at: string;
  updated_at: string;
  semesters?: ProgramSemester[];
}

export interface ProgramSemester {
  id: string;
  program_id: string;
  semester_number: number;
  title: string;
  total_credits: number;
  created_at: string;
  modules?: ProgramModule[];
}

export interface ProgramModule {
  id: string;
  semester_id: string;
  code: string | null;
  title: string;
  credits: number;
  hours_cm: number;
  hours_td: number;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface HomepageSlide {
  id: string;
  badge: string | null;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_primary_text: string | null;
  cta_primary_url: string | null;
  cta_secondary_text: string | null;
  cta_secondary_url: string | null;
  order_index: number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ParcoursScolaireLigne {
  annee: string;
  diplome: string;
  etablissement: string;
  date_obtention: string;
}

export interface TuteurInfo {
  nom_prenom: string;
  profession: string;
  adresse: string;
  email: string;
  telephone: string;
}

export interface LangueNiveau {
  nom: string;
  niveau: "faible" | "moyen" | "eleve" | "";
}

export interface DossierCandidatureData {
  // Page 1: Programmes & État Civil
  programme_type: "initiale_licence" | "continue_licence" | "master" | "cours_weekend" | "presup" | "elearning";
  sous_option?: "international_leader" | "multiprogramme" | "";
  niveau: "licence_1" | "licence_2" | "licence_3" | "master_1" | "master_2";
  domaine: string;
  mention: string;
  specialite: string;
  civilite: "Mme" | "Mlle" | "M.";
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  adresse: string;
  adresse_suite?: string;
  ville: string;
  telephone: string;
  portable: string;
  email: string;

  // Page 2: Tuteur / Bailleur
  tuteur_type_principal?: "pere" | "mere" | "autre";
  pere?: TuteurInfo;
  mere?: TuteurInfo;
  autre_tuteur?: TuteurInfo;

  // Page 2: Parcours scolaire
  parcours?: ParcoursScolaireLigne[];

  // Page 2: Langues
  langue_1?: LangueNiveau;
  langue_2?: LangueNiveau;
  langue_3?: LangueNiveau;
  langue_autres?: LangueNiveau;

  // Page 2: Comment avez-vous connu l'établissement
  sources_connaissance?: string[];
  source_presse_precision?: string;
  source_salons_precision?: string;

  // Page 3: Motivations
  motivations_texte?: string;

  // Page 4: Attestation
  attestation_nom_complet?: string;
  attestation_lieu?: string;
  attestation_date?: string;
  attestation_lu_et_approuve?: boolean;
}

export interface Candidature {
  id: string;
  candidat_id: string | null;
  formation_id: string;
  reference_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string | null;
  birth_date: string;
  birth_place: string;
  previous_school: string | null;
  last_diploma: string | null;
  session_academic_year: string;
  status: CandidatureStatus;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  formation?: Formation | null;
  documents?: CandidatureDocument[];
  dossier_data?: DossierCandidatureData | null;
}

export interface CandidatureDocument {
  id: string;
  candidature_id: string;
  doc_type: DocumentType;
  file_name: string;
  file_path: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  uploaded_at: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Article {
  id: string;
  category_id: string | null;
  author_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  status: PublicationStatus;
  is_pinned: boolean;
  view_count: number;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  legacy_wp_id: number | null;
  legacy_wp_url: string | null;
  created_at: string;
  updated_at: string;
  category?: ArticleCategory | null;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  description: string;
  location: string;
  start_date: string;
  end_date: string | null;
  image_url: string | null;
  registration_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  author_company: string | null;
  content: string;
  avatar_url: string | null;
  promotion_year: number | null;
  formation_title: string | null;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
}

export type PartnerType = "accreditation" | "institutionnel" | "academique" | "entreprise" | "academic" | "corporate";

export type PartnerDisplayStyle =
  | "bold-caps"
  | "dot-sep"
  | "pipe-sep"
  | "serif-italic"
  | "cisco"
  | "wide-caps"
  | "uppercase_bold"
  | "split_dot"
  | "split_pipe"
  | "lowercase_bold";

export interface Partner {
  id: string;
  name: string;
  sub_label?: string | null;
  full_title?: string | null;
  logo_url: string | null;
  display_style?: PartnerDisplayStyle;
  partner_type: PartnerType;
  website_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface StudentLifeItem {
  id: string;
  title: string;
  tag: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  university_name: string;
  acronym: string;
  tagline: string;
  main_email: string;
  admission_email: string;
  phone_main: string;
  phone_admission: string;
  phone_mobile: string;
  whatsapp: string;
  main_address: string;
  campus_thies: string;
  academic_year: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface RedirectRule {
  id: string;
  source_url: string;
  target_url: string;
  status_code: number;
  hit_count: number;
  is_active: boolean;
}

export interface EventPopupSlide {
  id: string;
  title: string;
  badge?: string;
  subtitle?: string;
  image_url: string;
  cta_text?: string;
  cta_url?: string;
  show_cta: boolean;
  target_date?: string | null;
  show_countdown: boolean;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EventPopupConfig {
  is_enabled: boolean;
  position: "bottom-right" | "bottom-left" | "center-modal";
  auto_open_delay_ms: number;
  auto_slide_interval_ms: number;
  allow_dismiss_for_session: boolean;
  slides: EventPopupSlide[];
}

