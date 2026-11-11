-- ====================================================================
-- MISSION 01: AFI-L'UE Initial PostgreSQL Schema & RLS Policies
-- Target: Self-hosted Supabase / PostgreSQL 15+
-- ====================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enumerations
CREATE TYPE user_role AS ENUM (
    'super_admin',
    'admin',
    'scolarite',
    'communication',
    'candidat'
);

CREATE TYPE degree_level AS ENUM (
    'licence',
    'master',
    'certification',
    'doctorat'
);

CREATE TYPE candidature_status AS ENUM (
    'brouillon',
    'soumis',
    'en_revue',
    'admissible',
    'admis',
    'rejete',
    'liste_attente'
);

CREATE TYPE document_type AS ENUM (
    'diplome_bac',
    'releve_notes',
    'piece_identite',
    'cv',
    'lettre_motivation',
    'photo_identite',
    'autre'
);

CREATE TYPE publication_status AS ENUM (
    'draft',
    'published',
    'archived'
);

-- 3. Utility Function: Timestamp updater
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. User Profiles (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'candidat',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 5. Formation Departments / Poles
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Formations (Licences, Masters, Certifications)
CREATE TABLE IF NOT EXISTS public.formations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    level degree_level NOT NULL,
    mention TEXT,
    domaine TEXT,
    grade TEXT,
    duration_years INT NOT NULL DEFAULT 3,
    credits_ects INT DEFAULT 180,
    short_description TEXT,
    description TEXT,
    objectives TEXT,
    curriculum TEXT,
    career_opportunities TEXT,
    admission_requirements TEXT,
    tuition_fees_local NUMERIC(12, 2),
    tuition_fees_international NUMERIC(12, 2),
    study_modes TEXT[] DEFAULT ARRAY['initiale']::TEXT[],
    brochure_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    order_index INT NOT NULL DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    legacy_wp_id INT,
    legacy_wp_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_formations_slug ON public.formations(slug);
CREATE INDEX idx_formations_level ON public.formations(level);
CREATE INDEX idx_formations_is_active ON public.formations(is_active);

CREATE TRIGGER trg_formations_updated_at
BEFORE UPDATE ON public.formations
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 7. Candidatures (Online Applications)
CREATE TABLE IF NOT EXISTS public.candidatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidat_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE RESTRICT,
    reference_code TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Sénégal',
    city TEXT,
    birth_date DATE NOT NULL,
    birth_place TEXT NOT NULL,
    previous_school TEXT,
    last_diploma TEXT,
    session_academic_year TEXT NOT NULL DEFAULT '2026-2027',
    status candidature_status NOT NULL DEFAULT 'soumis',
    admin_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_candidatures_formation ON public.candidatures(formation_id);
CREATE INDEX idx_candidatures_status ON public.candidatures(status);
CREATE INDEX idx_candidatures_email ON public.candidatures(email);
CREATE INDEX idx_candidatures_ref ON public.candidatures(reference_code);

CREATE TRIGGER trg_candidatures_updated_at
BEFORE UPDATE ON public.candidatures
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. Candidature Documents
CREATE TABLE IF NOT EXISTS public.candidature_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidature_id UUID NOT NULL REFERENCES public.candidatures(id) ON DELETE CASCADE,
    doc_type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_candidature_docs_cand ON public.candidature_documents(candidature_id);

-- 9. Article Categories
CREATE TABLE IF NOT EXISTS public.article_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Articles & News (Blog, Recherche, Vie étudiante)
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status publication_status NOT NULL DEFAULT 'draft',
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    view_count INT NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    legacy_wp_id INT,
    legacy_wp_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);

CREATE TRIGGER trg_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 11. Partners & Accreditations (CAMES, ANAQ-Sup, Entreprises)
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    partner_type TEXT NOT NULL DEFAULT 'corporate', -- 'accreditation', 'academic', 'corporate'
    website_url TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Contact & Inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Audit Log for Administrative Actions
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    payload JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidature_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: check current user role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Departments & Formations Policies (Public read, Admin/Staff manage)
CREATE POLICY "Departments are public viewable"
ON public.departments FOR SELECT
USING (true);

CREATE POLICY "Active formations are publicly viewable"
ON public.formations FOR SELECT
USING (is_active = TRUE OR public.current_user_role() IN ('super_admin', 'admin', 'scolarite', 'communication'));

CREATE POLICY "Admin and Scolarite can manage formations"
ON public.formations FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));

-- Candidatures Policies
CREATE POLICY "Candidates can view own candidatures"
ON public.candidatures FOR SELECT
TO authenticated
USING (candidat_id = auth.uid() OR public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));

CREATE POLICY "Anyone can submit candidature"
ON public.candidatures FOR INSERT
WITH CHECK (true);

CREATE POLICY "Scolarite & Admin can update candidatures"
ON public.candidatures FOR UPDATE
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));

-- Candidature Documents Policies
CREATE POLICY "Access documents of own candidature or staff"
ON public.candidature_documents FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.candidatures c
        WHERE c.id = candidature_documents.candidature_id
        AND (c.candidat_id = auth.uid() OR public.current_user_role() IN ('super_admin', 'admin', 'scolarite'))
    )
);

CREATE POLICY "Allow document upload for valid candidature"
ON public.candidature_documents FOR INSERT
WITH CHECK (true);

-- Articles & Categories Policies
CREATE POLICY "Published articles publicly viewable"
ON public.articles FOR SELECT
USING (status = 'published' OR public.current_user_role() IN ('super_admin', 'admin', 'communication'));

CREATE POLICY "Categories publicly viewable"
ON public.article_categories FOR SELECT
USING (true);

CREATE POLICY "Communication & Admin manage articles"
ON public.articles FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'communication'));

CREATE POLICY "Partners publicly viewable"
ON public.partners FOR SELECT
USING (is_active = TRUE OR public.current_user_role() IN ('super_admin', 'admin', 'communication'));

-- Contact Inquiries Policies
CREATE POLICY "Anyone can submit contact inquiry"
ON public.contact_inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Staff can view and manage contact inquiries"
ON public.contact_inquiries FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'communication'));

-- Audit Logs Policies
CREATE POLICY "Admin only view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin'));

-- Trigger: create profile on user registration in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'candidat'::user_role)
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ====================================================================
-- MISSION 02: AFI-L'UE Complete Academic, CMS & Admin Schema
-- Target: Self-hosted Supabase / PostgreSQL 15+
-- ====================================================================

-- 1. Create Scientific Domains table (The 4 core reference faculties)
CREATE TABLE IF NOT EXISTS public.domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE, -- 'SEG', 'ST', 'SJPA', 'SHS'
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    icon TEXT,
    banner_url TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_domains_updated_at
BEFORE UPDATE ON public.domains
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. Link departments to scientific domains
ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS domain_id UUID REFERENCES public.domains(id) ON DELETE SET NULL;

-- 3. Link formations to domains
ALTER TABLE public.formations
ADD COLUMN IF NOT EXISTS domain_id UUID REFERENCES public.domains(id) ON DELETE SET NULL;

-- 4. Study Formats (Initiale, Continue, Cours du soir, En ligne, Alternance, Executive)
CREATE TABLE IF NOT EXISTS public.study_formats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Many-to-many relationship for Formations <-> Study Formats
CREATE TABLE IF NOT EXISTS public.formation_study_formats (
    formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
    format_id UUID NOT NULL REFERENCES public.study_formats(id) ON DELETE CASCADE,
    PRIMARY KEY (formation_id, format_id)
);

-- 5. Academic Programs & Curriculum breakdown
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    total_credits INT DEFAULT 180,
    evaluation_methods TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.program_semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
    semester_number INT NOT NULL, -- 1 to 6 (Licence), 1 to 4 (Master)
    title TEXT NOT NULL, -- e.g. "Semestre 1 : Fondamentaux"
    total_credits INT DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.program_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    semester_id UUID NOT NULL REFERENCES public.program_semesters(id) ON DELETE CASCADE,
    code TEXT,
    title TEXT NOT NULL,
    credits INT DEFAULT 4,
    hours_cm INT DEFAULT 24, -- Cours Magistraux
    hours_td INT DEFAULT 16, -- Travaux Dirigés
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Accreditations (CAMES, ANAQ-Sup, etc.)
CREATE TABLE IF NOT EXISTS public.accreditations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE, -- 'CAMES', 'ANAQ_SUP'
    organization TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.formation_accreditations (
    formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
    accreditation_id UUID NOT NULL REFERENCES public.accreditations(id) ON DELETE CASCADE,
    date_obtained DATE,
    valid_until DATE,
    PRIMARY KEY (formation_id, accreditation_id)
);

-- 7. Homepage Slides (Hero Section Slider - Fully Administrable)
CREATE TABLE IF NOT EXISTS public.homepage_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge TEXT,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    cta_primary_text TEXT,
    cta_primary_url TEXT,
    cta_secondary_text TEXT,
    cta_secondary_url TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_homepage_slides_updated_at
BEFORE UPDATE ON public.homepage_slides
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. Events (Academic conferences, Open Days, Summer Schools)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    description TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Campus Dakar Point E',
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    image_url TEXT,
    registration_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 9. Testimonials (Students, Alumni, HR Managers)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    author_company TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    promotion_year INT,
    formation_title TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Global Site Settings (Key-Value configuration for contact, social links, stats)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. SEO & WordPress 301 Redirects Table
CREATE TABLE IF NOT EXISTS public.redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_url TEXT NOT NULL UNIQUE,
    target_url TEXT NOT NULL,
    status_code INT NOT NULL DEFAULT 301,
    hit_count INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- RLS POLICIES FOR NEW TABLES
-- ====================================================================

ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_study_formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accreditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_accreditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public can view active domains" ON public.domains FOR SELECT USING (is_active = TRUE OR public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));
CREATE POLICY "Public can view study formats" ON public.study_formats FOR SELECT USING (true);
CREATE POLICY "Public can view formation formats" ON public.formation_study_formats FOR SELECT USING (true);
CREATE POLICY "Public can view programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public can view semesters" ON public.program_semesters FOR SELECT USING (true);
CREATE POLICY "Public can view modules" ON public.program_modules FOR SELECT USING (true);
CREATE POLICY "Public can view accreditations" ON public.accreditations FOR SELECT USING (true);
CREATE POLICY "Public can view formation accreditations" ON public.formation_accreditations FOR SELECT USING (true);
CREATE POLICY "Public can view active slides" ON public.homepage_slides FOR SELECT USING (is_active = TRUE OR public.current_user_role() IN ('super_admin', 'admin', 'communication'));
CREATE POLICY "Public can view active events" ON public.events FOR SELECT USING (is_active = TRUE OR public.current_user_role() IN ('super_admin', 'admin', 'communication'));
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = TRUE OR public.current_user_role() IN ('super_admin', 'admin', 'communication'));
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active redirects" ON public.redirects FOR SELECT USING (true);
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Staff Management Policies
CREATE POLICY "Staff can manage domains" ON public.domains FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));
CREATE POLICY "Staff can manage programs" ON public.programs FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));
CREATE POLICY "Staff can manage semesters" ON public.program_semesters FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));
CREATE POLICY "Staff can manage modules" ON public.program_modules FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'scolarite'));
CREATE POLICY "Staff can manage slides" ON public.homepage_slides FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'communication'));
CREATE POLICY "Staff can manage events" ON public.events FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'communication'));
CREATE POLICY "Staff can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'communication'));
CREATE POLICY "Staff can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin'));
CREATE POLICY "Staff can manage redirects" ON public.redirects FOR ALL TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin'));
CREATE POLICY "Staff can view newsletter subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.current_user_role() IN ('super_admin', 'admin', 'communication'));


-- ====================================================================
-- MISSION 03: Programme AFI-L'UE -> Domaines -> Mentions (Licences / Masters)
-- Complete Dynamic Catalogue (4 Domaines, 14 Licences, 23 Masters = 37 Formations)
-- ====================================================================

-- 1. Upsert the 4 official Domaines in exact schema order
INSERT INTO public.domains (id, code, name, slug, short_description, description, icon, order_index, is_active)
VALUES
  (
    '22222222-2222-2222-2222-222222222201',
    'SEG',
    'Sciences Économiques et Gestion',
    'sciences-economiques-et-de-gestion',
    'Banque, Finance, Audit, Comptabilité, Ressources Humaines, Marketing Digital, Logistique et Management.',
    'Pôle d''excellence formant les futurs dirigeants, auditeurs, gestionnaires, analystes financiers et managers de l''espace UEMOA et à l''international.',
    'BarChart3',
    1,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222203',
    'SJPA',
    'Sciences Juridiques, Politiques et de l''Administration',
    'sciences-juridiques-politiques-et-de-ladministration',
    'Management Juridique et Fiscal, Ingénierie Juridique, Audit Juridique et Droit des Affaires OHADA.',
    'Formations juridiques orientées pratique contentieuse de l''entreprise, gouvernance d''affaires et conformité fiscale et réglementaire dans l''espace OHADA.',
    'Scale',
    2,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    'ST',
    'Sciences et Technologies',
    'sciences-et-technologies',
    'Génie Logiciel, Systèmes & Réseaux, Développement Web, Intelligence Artificielle, Big Data et Finance Digitale.',
    'Cursus axés sur l''innovation technologique, la transformation numérique des organisations et l''ingénierie des systèmes informatiques et intelligents.',
    'Cpu',
    3,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222204',
    'SHS',
    'Sciences de l''Homme et de la Société',
    'sciences-de-lhomme-et-de-la-societe',
    'Langues Étrangères Appliquées à la Gestion des Entreprises, Communication et Dynamiques des Organisations.',
    'Développement des compétences linguistiques internationales, négociation interculturelle et gestion des entreprises dans un environnement globalisé.',
    'Users',
    4,
    TRUE
  )
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  order_index = EXCLUDED.order_index,
  is_active = TRUE;

-- 2. Dynamic Hierarchical View: Domaines -> Mentions (Licences / Masters) -> Formations
CREATE OR REPLACE VIEW public.v_programme_hierarchy AS
SELECT
  d.id AS domain_id,
  d.code AS domain_code,
  d.name AS domain_name,
  d.slug AS domain_slug,
  d.order_index AS domain_order,
  f.level AS cycle_mention, -- 'licence' | 'master'
  f.id AS formation_id,
  f.title AS formation_title,
  f.slug AS formation_slug,
  f.mention,
  f.grade,
  f.duration_years,
  f.credits_ects,
  f.short_description,
  f.order_index AS formation_order
FROM public.domains d
LEFT JOIN public.formations f
  ON f.domain_id = d.id AND f.is_active = TRUE
WHERE d.is_active = TRUE
ORDER BY d.order_index ASC, f.level ASC, f.order_index ASC;



-- ====================================================================
-- AFI-L'UE Official Seed Data
-- ====================================================================

-- 1. Accreditations
INSERT INTO public.accreditations (id, name, code, organization, description, order_index)
VALUES 
    ('11111111-1111-1111-1111-111111111101', 'CAMES', 'CAMES', 'Conseil Africain et Malgache pour l''Enseignement Supérieur', 'Reconnaissance et équivalence internationale des diplômes dans 19 pays membres.', 1),
    ('11111111-1111-1111-1111-111111111102', 'ANAQ-Sup', 'ANAQ_SUP', 'Autorité Nationale d''Assurance Qualité de l''Enseignement Supérieur (Sénégal)', 'Habilitation institutionnelle et accréditation des filières délivrées par l''État du Sénégal.', 2)
ON CONFLICT (code) DO NOTHING;

-- 2. Scientific Domains (4 Core Reference Domains)
INSERT INTO public.domains (id, code, name, slug, short_description, description, icon, order_index)
VALUES
    ('22222222-2222-2222-2222-222222222201', 'SEG', 'Sciences Économiques et de Gestion', 'sciences-economiques-et-de-gestion', 'Management, Finance, Audit, Comptabilité, Commerce et Marketing.', 'Pôle d''excellence formant les futurs dirigeants, gestionnaires, analystes financiers et créateurs d''entreprises de l''espace UEMOA.', 'BarChart3', 1),
    ('22222222-2222-2222-2222-222222222202', 'ST', 'Sciences et Technologies', 'sciences-et-technologies', 'Intelligence Artificielle, Génie Logiciel, Big Data, Réseaux et Cybersécurité.', 'Cursus axés sur l''innovation technologique, la transformation numérique des entreprises et l''ingénierie des systèmes complexes.', 'Cpu', 2),
    ('22222222-2222-2222-2222-222222222203', 'SJPA', 'Sciences Juridiques, Politiques et de l''Administration', 'sciences-juridiques-politiques-et-de-ladministration', 'Droit des Affaires, Fiscalité, Droit Social et Administration.', 'Formations juridiques orientées pratique de l''entreprise, gouvernance institutionnelle et conformité réglementaire.', 'Scale', 3),
    ('22222222-2222-2222-2222-222222222204', 'SHS', 'Sciences de l''Homme et de la Société', 'sciences-de-lhomme-et-de-la-societe', 'Communication d''entreprise, Ressources Humaines et Sociologie des organisations.', 'Développement du capital humain, relations professionnelles et dynamiques organisationnelles.', 'Users', 4)
ON CONFLICT (code) DO NOTHING;

-- 3. Departments
INSERT INTO public.departments (id, code, name, slug, domain_id, description, icon, order_index)
VALUES
    ('33333333-3333-3333-3333-333333333301', 'DEP-INFO', 'Département Informatique & Technologies Numériques', 'informatique-technologies-numeriques', '22222222-2222-2222-2222-222222222202', 'Programmes d''ingénierie logicielle, IA, cloud computing et cybersécurité.', 'Code', 1),
    ('33333333-3333-3333-3333-333333333302', 'DEP-FIN', 'Département Finance, Comptabilité & Audit', 'finance-comptabilite-audit', '22222222-2222-2222-2222-222222222201', 'Filières d''expertise comptable, ingénierie financière et contrôle de gestion.', 'PieChart', 2),
    ('33333333-3333-3333-3333-333333333303', 'DEP-MGT', 'Département Management, Marketing & Logistique', 'management-marketing-logistique', '22222222-2222-2222-2222-222222222201', 'Stratégie managériale, commerce international, chaîne logistique et marketing digital.', 'TrendingUp', 3),
    ('33333333-3333-3333-3333-333333333304', 'DEP-DROIT', 'Département Droit des Affaires & Fiscalité', 'droit-affaires-fiscalite', '22222222-2222-2222-2222-222222222203', 'Cadre juridique des contrats, contentieux d''affaires et droit social.', 'Shield', 4),
    ('33333333-3333-3333-3333-333333333305', 'DEP-RH', 'Département Ressources Humaines & Communication', 'ressources-humaines-communication', '22222222-2222-2222-2222-222222222204', 'Gestion prévisionnelle des emplois, marque employeur et communication institutionnelle.', 'MessageSquare', 5)
ON CONFLICT (code) DO NOTHING;

-- 4. Study Formats
INSERT INTO public.study_formats (id, code, name, slug, description, order_index)
VALUES
    ('44444444-4444-4444-4444-444444444401', 'INITIAL', 'Formation Initiale (Jour)', 'formation-initiale', 'Cours réguliers en présentiel en journée, idéal pour les bacheliers et étudiants à temps plein.', 1),
    ('44444444-4444-4444-4444-444444444402', 'SOIR', 'Cours du Soir (Professionnels)', 'cours-du-soir', 'Horaires aménagés de 18h30 à 21h30 et le samedi pour les professionnels en activité.', 2),
    ('44444444-4444-4444-4444-444444444403', 'ONLINE', 'Formation à Distance (E-learning)', 'formation-a-distance', 'Plateforme pédagogique interactive avec classes virtuelles et tutorat personnalisé.', 3),
    ('44444444-4444-4444-4444-444444444404', 'EXECUTIVE', 'Executive Education', 'executive-education', 'Certifications professionnelles courtes, séminaires thématiques et VAE.', 4)
ON CONFLICT (code) DO NOTHING;

-- 5. Formations (Licences, Masters, Certifications)
INSERT INTO public.formations (
    id, department_id, domain_id, title, slug, level, mention, domaine, grade,
    duration_years, credits_ects, short_description, description, objectives,
    curriculum, career_opportunities, admission_requirements,
    tuition_fees_local, tuition_fees_international, study_modes,
    is_featured, is_active, order_index
)
VALUES
    (
        '55555555-5555-5555-5555-555555555501',
        '33333333-3333-3333-3333-333333333301',
        '22222222-2222-2222-2222-222222222202',
        'Licence Intelligence Artificielle et Big Data',
        'licence-intelligence-artificielle-et-big-data',
        'licence',
        'Informatique et Technologies Numériques',
        'Sciences et Technologies',
        'Licence Professionnelle (BAC+3)',
        3,
        180,
        'Une formation de pointe formant aux métiers de l''apprentissage automatique, du traitement massif de données et du développement d''applications intelligentes.',
        'La Licence en Intelligence Artificielle et Big Data d''AFI-L''UE prépare les étudiants à concevoir, déployer et maintenir des architectures de données complexes et des modèles d''IA prédictifs au service des entreprises.',
        'Maîtriser les algorithmes d''apprentissage supervisé et non-supervisé ; Développer des pipelines de données ETL ; Manipuler les frameworks PyTorch, TensorFlow et Scikit-Learn ; Comprendre les enjeux éthiques de l''IA.',
        'Semestre 1-2 : Algorithmique, Mathématiques appliquées, Programmation Python & SQL ; Semestre 3-4 : Bases de données NoSQL, Data Warehouse, Machine Learning, Statistiques bayésiennes ; Semestre 5-6 : Deep Learning, Computer Vision, NLP, Projet d''ingénierie et Stage en entreprise.',
        'Data Scientist Junior, Développeur IA, Data Engineer, Administrateur Big Data, Consultant Business Intelligence.',
        'Baccalauréat Scientifique (S1, S2, S3) ou Technique (T1, T2). Sélection sur dossier académique et entretien de motivation.',
        950000.00,
        1350000.00,
        ARRAY['initiale', 'cours_du_soir'],
        TRUE,
        TRUE,
        1
    ),
    (
        '55555555-5555-5555-5555-555555555502',
        '33333333-3333-3333-3333-333333333301',
        '22222222-2222-2222-2222-222222222202',
        'Licence Génie Logiciel (GELO)',
        'licence-genie-logiciel-gelo',
        'licence',
        'Génie Logiciel',
        'Sciences et Technologies',
        'Licence Professionnelle (BAC+3)',
        3,
        180,
        'Conception, développement et architecture d''applications web, mobiles et distribuées hautement évolutives.',
        'La Licence Génie Logiciel dote les apprenants des compétences théoriques et pratiques nécessaires pour conduire des projets logiciels industriels selon les méthodologies agiles (Scrum, DevOps).',
        'Concevoir des architectures logicielles pérennes ; Développer des applications full-stack (Next.js, Spring Boot, Flutter) ; Mettre en œuvre l''intégration et le déploiement continus (CI/CD) ; Sécuriser le code.',
        'Semestre 1-2 : Fondamentaux de la programmation C/Java, Systèmes d''exploitation, Réseaux de base ; Semestre 3-4 : POO avancée, Bases de données relationnelles, Conception UML, Architecture logicielle ; Semestre 5-6 : Développement web moderne, Microservices, Cloud et DevOps, Projet de fin d''études.',
        'Développeur Full-Stack, Ingénieur d''études logicielles, Concepteur d''applications mobiles, Développeur DevOps Junior.',
        'Baccalauréat S1, S2, S3, L2 avec bon niveau en mathématiques, ou diplôme équivalent.',
        900000.00,
        1300000.00,
        ARRAY['initiale', 'cours_du_soir'],
        TRUE,
        TRUE,
        2
    ),
    (
        '55555555-5555-5555-5555-555555555503',
        '33333333-3333-3333-3333-333333333302',
        '22222222-2222-2222-2222-222222222201',
        'Licence Banque Assurance Finance',
        'licence-banque-assurance-finance',
        'licence',
        'Banque et Finance',
        'Sciences Économiques et de Gestion',
        'Licence Professionnelle (BAC+3)',
        3,
        180,
        'Formation diplômante reconnue CAMES pour intégrer les institutions bancaires, compagnies d''assurance et marchés financiers africains.',
        'Cette formation pluridisciplinaire combine l''analyse financière approfondie, la réglementation bancaire BCEAO, la gestion des risques et la commercialisation des produits financiers.',
        'Analyser la rentabilité et les risques de crédit d''une entreprise ; Maîtriser les opérations de guichet et de trésorerie ; Comprendre les mécanismes d''assurance vie et non-vie ; Respecter la conformité LCB-FT.',
        'Semestre 1-2 : Économie générale, Comptabilité générale, Mathématiques financières, Droit commercial ; Semestre 3-4 : Gestion de portefeuille, Marchés des capitaux, Droit bancaire, Fiscalité des entreprises ; Semestre 5-6 : Analyse du risque de crédit, FinTech & Mobile Money, Audit bancaire, Stage professionnel.',
        'Chargé de clientèle particuliers/entreprises, Analyste de crédit, Gestionnaire de patrimoine, Souscripteur en assurances, Gestionnaire de trésorerie.',
        'Baccalauréat Séries L2, S1, S2, G. Examen du dossier et entretien.',
        850000.00,
        1250000.00,
        ARRAY['initiale', 'cours_du_soir'],
        TRUE,
        TRUE,
        3
    ),
    (
        '55555555-5555-5555-5555-555555555504',
        '33333333-3333-3333-3333-333333333302',
        '22222222-2222-2222-2222-222222222201',
        'Master Audit et Contrôle de Gestion',
        'master-audit-et-controle-de-gestion',
        'master',
        'Audit et Contrôle de Gestion',
        'Sciences Économiques et de Gestion',
        'Master Professionnel (BAC+5)',
        2,
        120,
        'Diplôme d''excellence formant des auditeurs internes/externes et des contrôleurs de gestion stratégiques pour cabinets et multinationales.',
        'Le Master Audit et Contrôle de Gestion d''AFI-L''UE prépare à la maîtrise des normes IFRS/SYSCOHADA, au pilotage de la performance, à l''audit légal et aux missions de conseil en organisation.',
        'Conduire des missions d''audit opérationnel et financier selon les normes internationales ; Concevoir des tableaux de bord prospectifs ; Maîtriser le contrôle budgétaire et le cost accounting ; Piloter la cartographie des risques.',
        'Semestre 1 : Normes comptables internationales (SYSCOHADA révisé & IFRS), Audit financier, Contrôle de gestion stratégique ; Semestre 2 : Fiscalité approfondie, Évaluation d''entreprises, Audit des SI ; Semestre 3 : Consolidation des comptes, Gouvernance & RSE, Management des risques ; Semestre 4 : Mémoire professionnel et soutenance.',
        'Auditeur en cabinet (Big 4), Contrôleur de gestion groupe, Directeur Administratif et Financier (DAF), Auditeur interne, Consultant en management.',
        'Licence en Gestion, Économie, Finance ou diplôme équivalent (BAC+3). Sélection sur dossier et entretien devant un jury académique.',
        1350000.00,
        1850000.00,
        ARRAY['cours_du_soir', 'initiale'],
        TRUE,
        TRUE,
        4
    ),
    (
        '55555555-5555-5555-5555-555555555505',
        '33333333-3333-3333-3333-333333333303',
        '22222222-2222-2222-2222-222222222201',
        'Master Supply Chain Management & Logistique',
        'master-supply-chain-management',
        'master',
        'Transport et Logistique',
        'Sciences Économiques et de Gestion',
        'Master Professionnel (BAC+5)',
        2,
        120,
        'Management global des flux physiques et d''informations, approvisionnements stratégiques et logistique portuaire/aéroportuaire.',
        'Face aux défis des corridors sous-régionaux et du Port Autonome de Dakar, ce Master forme les experts de l''optimisation logistique, du transit douanier et du commerce maritime.',
        'Optimiser la chaîne logistique de bout en bout ; Négocier les contrats de transport multimodal et de fret ; Maîtriser les procédures douanières GAINDE ; Piloter les stocks et les plateformes logistiques.',
        'Semestre 1 : Management de la Supply Chain, Gestion d''entrepôts et des stocks, Droit maritime ; Semestre 2 : Commerce international et Incoterms 2020, Logistique portuaire, Achats stratégiques ; Semestre 3 : Systèmes d''information logistique (ERP / WMS), Audit logistique, Supply Chain durable ; Semestre 4 : Stage professionnel et mémoire de Master.',
        'Responsable Supply Chain, Directeur Logistique, Responsable des achats internationaux, Transitaire / Déclarant en douane, Consultant logistique.',
        'Licence en Logistique, Commerce International, Économie ou Gestion (BAC+3).',
        1300000.00,
        1800000.00,
        ARRAY['cours_du_soir', 'initiale'],
        TRUE,
        TRUE,
        5
    ),
    (
        '55555555-5555-5555-5555-555555555506',
        '33333333-3333-3333-3333-333333333301',
        '22222222-2222-2222-2222-222222222202',
        'Master Ingénierie Logicielle & Intelligence Artificielle',
        'master-ingenierie-logicielle-intelligence-artificielle',
        'master',
        'Informatique et Systèmes d''Information',
        'Sciences et Technologies',
        'Master Professionnel (BAC+5)',
        2,
        120,
        'Formation d''experts capables d''architecturer des plateformes d''entreprise intelligentes, distribuées et résilientes.',
        'Un cursus alliant génie logiciel de haut niveau (Clean Architecture, Cloud Native, Microservices) et intelligence artificielle avancée (LLMs, MLOps, vision par ordinateur).',
        'Concevoir des architectures distribuées à haute disponibilité ; Déployer et superviser des modèles d''IA en production (MLOps) ; Piloter des équipes d''ingénieurs logiciels ; Garantir la sécurité applicative (DevSecOps).',
        'Semestre 1 : Architecture logicielle avancée, Cloud Computing (AWS/GCP), Algorithmes d''IA avancés ; Semestre 2 : MLOps et pipeline CI/CD pour IA, Traitement automatique du langage naturel, Cybersécurité des architectures web ; Semestre 3 : Systèmes distribués, Microservices et Kubernetes, Management de l''innovation technologique ; Semestre 4 : Projet de recherche appliquée / Stage en entreprise et soutenance.',
        'Architecte Logiciel, Lead Developer, Ingénieur MLOps, Directeur Technique (CTO), Chef de Projet Digital.',
        'Licence en Informatique, Génie Logiciel, Télécoms ou diplôme équivalent (BAC+3).',
        1450000.00,
        1950000.00,
        ARRAY['cours_du_soir', 'initiale'],
        TRUE,
        TRUE,
        6
    ),
    (
        '55555555-5555-5555-5555-555555555507',
        '33333333-3333-3333-3333-333333333304',
        '22222222-2222-2222-2222-222222222203',
        'Licence Droit des Affaires & Fiscalité',
        'licence-droit-des-affaires-et-fiscalite',
        'licence',
        'Droit Privé et Sciences Juridiques',
        'Sciences Juridiques, Politiques et de l''Administration',
        'Licence Professionnelle (BAC+3)',
        3,
        180,
        'Sécurisation des opérations juridiques, contrats d''affaires et gestion fiscale pour entreprises de l''espace OHADA.',
        'Formation combinant droit commercial général, droit des sociétés, fiscalité directe et indirecte, et droit du travail selon le traité OHADA.',
        'Rédiger des actes contractuels et statutaires sécurisés ; Assurer la conformité fiscale des sociétés ; Traiter le contentieux du recouvrement et les litiges prud''homaux ; Maîtriser le droit bancaire et des sûretés.',
        'Semestre 1-2 : Introduction au droit civil, Droit constitutionnel, Droit des obligations ; Semestre 3-4 : Droit des sociétés OHADA, Droit du travail et sécurité sociale, Droit fiscal général ; Semestre 5-6 : Procédures collectives, Droit pénal des affaires, Fiscalité des entreprises, Stage pratique.',
        'Juriste d''entreprise junior, Assistant fiscaliste, Collaborateur en cabinet d''avocat ou d''expertise comptable, Gestionnaire de contentieux.',
        'Baccalauréat Séries L1, L2, S1, S2, G. Examen du dossier.',
        800000.00,
        1200000.00,
        ARRAY['initiale', 'cours_du_soir'],
        FALSE,
        TRUE,
        7
    ),
    (
        '55555555-5555-5555-5555-555555555508',
        '33333333-3333-3333-3333-333333333305',
        '22222222-2222-2222-2222-222222222204',
        'Licence Gestion des Ressources Humaines',
        'licence-gestion-des-ressources-humaines',
        'licence',
        'Sciences de Gestion & RH',
        'Sciences de l''Homme et de la Société',
        'Licence Professionnelle (BAC+3)',
        3,
        180,
        'Recrutement, gestion de la paie, formation continue et relations sociales au cœur de la performance de l''entreprise.',
        'Un programme opérationnel préparant les futurs cadres RH aux nouveaux enjeux : transformation digitale des RH, droit du travail sénégalais, bien-être au travail et gestion des compétences.',
        'Administrer le personnel et élaborer la paie ; Mener un processus de recrutement complet ; Élaborer un plan de développement des compétences ; Faciliter le dialogue social en entreprise.',
        'Semestre 1-2 : Notions de management, Droit du travail, Sociologie des organisations ; Semestre 3-4 : Gestion de la paie et logiciels RH, Recrutement et intégration, Évaluation du personnel ; Semestre 5-6 : Droit social approfondi, Communication interne, Audit social, Stage en entreprise.',
        'Chargé de recrutement, Gestionnaire de paie, Responsable formation, Assistant RH, Consultant RH junior.',
        'Baccalauréat toutes séries confondues. Sélection sur dossier.',
        800000.00,
        1200000.00,
        ARRAY['initiale', 'cours_du_soir'],
        FALSE,
        TRUE,
        8
    )
ON CONFLICT (slug) DO NOTHING;

-- 6. Link Formations to CAMES / ANAQ-Sup Accreditations
INSERT INTO public.formation_accreditations (formation_id, accreditation_id, date_obtained)
VALUES
    ('55555555-5555-5555-5555-555555555501', '11111111-1111-1111-1111-111111111102', '2023-01-15'),
    ('55555555-5555-5555-5555-555555555502', '11111111-1111-1111-1111-111111111101', '2022-06-20'),
    ('55555555-5555-5555-5555-555555555503', '11111111-1111-1111-1111-111111111101', '2021-06-20'),
    ('55555555-5555-5555-5555-555555555504', '11111111-1111-1111-1111-111111111101', '2020-07-10'),
    ('55555555-5555-5555-5555-555555555505', '11111111-1111-1111-1111-111111111101', '2022-07-15')
ON CONFLICT DO NOTHING;

-- 7. Homepage Slides (Hero Slider - Fully Administrable)
INSERT INTO public.homepage_slides (
    id, badge, title, subtitle, image_url,
    cta_primary_text, cta_primary_url,
    cta_secondary_text, cta_secondary_url,
    order_index, is_active
)
VALUES
    (
        '77777777-7777-7777-7777-777777777701',
        'Excellence & Accréditations CAMES',
        'L''Excellence Académique au Service de l''Entreprise',
        'Depuis plus de 30 ans, AFI-L''UE forme les leaders, gestionnaires et ingénieurs qui bâtissent l''économie africaine avec des diplômes reconnus à l''international.',
        '/images/hero/slide-campus.jpg',
        'Découvrir nos formations', '/formations',
        'Candidater en ligne', '/candidater',
        1, TRUE
    ),
    (
        '77777777-7777-7777-7777-777777777702',
        'Pôle Sciences & Technologies',
        'Devenez Acteur de la Révolution Numérique & de l''IA',
        'Licences et Masters en Intelligence Artificielle, Big Data, Génie Logiciel et Cybersécurité avec des laboratoires et des projets industriels concrets.',
        '/images/hero/slide-tech.jpg',
        'Explorer le pôle Tech', '/domaines/sciences-et-technologies',
        'Déposer sa candidature', '/candidater',
        2, TRUE
    ),
    (
        '77777777-7777-7777-7777-777777777703',
        'Executive Education & Cours du Soir',
        'Accélérez Votre Carrière Professionnelle',
        'Des cursus adaptés aux professionnels en activité : cours du soir de 18h30 à 21h30, certifications ciblées et formation à distance.',
        '/images/hero/slide-executive.jpg',
        'Découvrir l''Executive Education', '/executive-education',
        'Demande d''information', '/contact',
        3, TRUE
    )
ON CONFLICT DO NOTHING;

-- 8. Official Partners & Corporate Network
INSERT INTO public.partners (id, name, logo_url, partner_type, website_url, order_index, is_active)
VALUES
    ('88888888-8888-8888-8888-888888888801', 'CAMES', '/images/partners/cames.png', 'accreditation', 'https://lecames.org', 1, TRUE),
    ('88888888-8888-8888-8888-888888888802', 'ANAQ-Sup', '/images/partners/anaq-sup.png', 'accreditation', 'https://anaqsup.sn', 2, TRUE),
    ('88888888-8888-8888-8888-888888888803', 'Sonatel / Orange', '/images/partners/sonatel.png', 'corporate', 'https://sonatel.sn', 3, TRUE),
    ('88888888-8888-8888-8888-888888888804', 'CBAO Groupe Attijariwafa bank', '/images/partners/cbao.png', 'corporate', 'https://cbao.sn', 4, TRUE),
    ('88888888-8888-8888-8888-888888888805', 'Société Générale Sénégal', '/images/partners/societe-generale.png', 'corporate', 'https://societegenerale.sn', 5, TRUE),
    ('88888888-8888-8888-8888-888888888806', 'PwC Sénégal', '/images/partners/pwc.png', 'corporate', 'https://pwc.com', 6, TRUE)
ON CONFLICT DO NOTHING;

-- 9. News Categories & Articles
INSERT INTO public.article_categories (id, name, slug, description, order_index)
VALUES
    ('99999999-9999-9999-9999-999999999901', 'Vie Universitaire', 'vie-universitaire', 'Actualités de la communauté estudiantine, événements et cérémonies.', 1),
    ('99999999-9999-9999-9999-999999999902', 'Recherche & Colloques', 'recherche-et-colloques', 'Publications du laboratoire AFI Research Center et colloques scientifiques.', 2),
    ('99999999-9999-9999-9999-999999999903', 'Admissions & Concours', 'admissions-et-concours', 'Informations officielles sur les rentrées académiques et bourses d''études.', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (
    id, category_id, title, slug, excerpt, content, cover_image_url,
    tags, status, is_pinned, view_count, published_at
)
VALUES
    (
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '99999999-9999-9999-9999-999999999903',
        'Ouverture officielle des admissions pour l''année académique 2026-2027',
        'ouverture-admissions-annee-academique-2026-2027',
        'Les inscriptions et dépôts de dossiers de candidature pour les cycles de Licence et Master sont ouverts sur les campus de Dakar et Thiès.',
        'L''Université AFI-L''UE informe les bacheliers, étudiants et professionnels en reconversion de l''ouverture de la campagne de dépôt de candidatures pour l''année académique 2026-2027. Les candidats peuvent déposer leur dossier directement via le portail en ligne ou sur nos campus.',
        '/images/news/admission-2026.jpg',
        ARRAY['Admissions', 'Licence', 'Master', 'Campus Dakar'],
        'published',
        TRUE,
        1420,
        NOW() - INTERVAL '3 days'
    ),
    (
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '99999999-9999-9999-9999-999999999901',
        'Cérémonie de remise des diplômes de la promotion sortante',
        'ceremonie-remise-diplomes-promotion-sortante',
        'Retour en images sur la célébration solennelle des lauréats des Licences et Masters en présence des partenaires et personnalités académiques.',
        'La cérémonie annuelle de remise des parchemins a rassemblé plus de 600 lauréats, leurs familles et les représentants des entreprises partenaires. Une célébration couronnant des années d''efforts et d''engagement vers le marché de l''emploi.',
        '/images/news/graduation.jpg',
        ARRAY['Graduation', 'Alumni', 'Excellence'],
        'published',
        FALSE,
        980,
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '99999999-9999-9999-9999-999999999902',
        'Colloque Scientifique International du laboratoire AFI Research Center',
        'colloque-scientifique-international-afi-research-center',
        'Trois journées de débats académiques autour des mutations économiques, du droit des affaires et de l''intelligence artificielle en Afrique.',
        'Organisé sous l''égide du Conseil Scientifique d''AFI-L''UE, ce colloque a accueilli des chercheurs venus de 8 pays d''Afrique et d''Europe pour échanger sur les transitions technologiques et managériales dans le contexte ouest-africain.',
        '/images/news/colloque.jpg',
        ARRAY['Recherche', 'Colloque', 'Publication', 'AFI Research Center'],
        'published',
        FALSE,
        640,
        NOW() - INTERVAL '20 days'
    )
ON CONFLICT (slug) DO NOTHING;

-- 10. Site Settings (Institutional data, address, contact, campaign)
INSERT INTO public.site_settings (key, value, description)
VALUES
    ('contact_info', '{
        "university_name": "AFI-L''Université de l''Entreprise (AFI-L''UE)",
        "acronym": "AFI-L''UE",
        "tagline": "L''Université de l''Entreprise",
        "main_email": "contact@afi-ue.sn",
        "admission_email": "admission@afi-ue.sn",
        "phone_main": "+221 33 824 50 50",
        "phone_admission": "+221 33 825 80 80",
        "phone_mobile": "+221 77 638 00 00",
        "whatsapp": "+221 77 638 00 00",
        "main_address": "Angle Rue Leo Frobenius x Rue A, Point E, BP 17094, Dakar, Sénégal",
        "campus_thies": "Quartier Caritas, En face Cité Malick Sy, Thiès, Sénégal",
        "academic_year": "2026-2027",
        "socials": {
            "facebook": "https://facebook.com/afildakar",
            "linkedin": "https://linkedin.com/school/afi-l-ue",
            "instagram": "https://instagram.com/afi_ue_dakar",
            "twitter": "https://twitter.com/afi_ue"
        }
    }'::jsonb, 'Coordonnées officielles et réseaux sociaux de l''université'),
    ('admission_campaign', '{
        "is_open": true,
        "academic_year": "2026-2027",
        "deadline": "2026-11-30",
        "notice": "Campagne d''admissions 2026-2027 ouverte pour les Licences et Masters à Dakar et Thiès."
    }'::jsonb, 'Paramètres de la campagne de recrutement des étudiants')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;



-- ============================================================================
-- BUCKETS DE STOCKAGE SUPABASE (Documents candidatures & Médias)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('candidatures-documents', 'candidatures-documents', false),
  ('media-public', 'media-public', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public media read access'
  ) THEN
    CREATE POLICY "Public media read access" ON storage.objects
      FOR SELECT USING (bucket_id = 'media-public');
  END IF;
END $$;
