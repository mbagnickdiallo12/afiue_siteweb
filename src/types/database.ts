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

export interface Department {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order_index: number;
  created_at: string;
}

export interface Formation {
  id: string;
  department_id: string | null;
  title: string;
  slug: string;
  level: DegreeLevel;
  mention: string | null;
  domaine: string | null;
  grade: string | null;
  duration_years: number;
  credits_ects: number | null;
  short_description: string | null;
  description: string | null;
  objectives: string | null;
  curriculum: string | null;
  career_opportunities: string | null;
  admission_requirements: string | null;
  tuition_fees_local: number | null;
  tuition_fees_international: number | null;
  study_modes: string[];
  brochure_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  legacy_wp_id: number | null;
  legacy_wp_url: string | null;
  created_at: string;
  updated_at: string;
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
}
