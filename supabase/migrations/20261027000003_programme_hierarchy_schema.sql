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

