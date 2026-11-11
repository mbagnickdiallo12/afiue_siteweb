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
