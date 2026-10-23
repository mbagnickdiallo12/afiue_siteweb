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
