import { TuitionTier } from "@/types/database";
import { DetailedFormationContent } from "./programme-details-licences";

export const MASTER_TUITION_TIERS: TuitionTier[] = [
  {
    label: "Master 1 & Master 2 – Cours du Soir (Présentiel)",
    registration_fee: "180 000 FCFA",
    monthly_fee: "95 000 FCFA / mois",
    duration_months: "10 mois (Novembre – Août)",
    schedule: "17h30 – 20h45",
  },
  {
    label: "Master 1 & Master 2 – Cours du Week-end",
    registration_fee: "180 000 FCFA",
    monthly_fee: "95 000 FCFA / mois",
    duration_months: "09 mois (Janvier – Septembre)",
    schedule: "Samedi & Dimanche (09h00 – 17h00)",
  },
  {
    label: "Master 1 & Master 2 – E-Learning (100% en ligne)",
    registration_fee: "200 000 FCFA",
    monthly_fee: "100 000 FCFA / mois",
    duration_months: "09 mois (Janvier – Septembre)",
    schedule: "18h00 – 20h00",
  },
];

export const MASTER_EXTRA_FEES: string[] = [
  "Bibliothèque numérique (annuelle) : 10 000 FCFA",
  "Frais de mémoire M2 : 100 000 FCFA",
  "Graduation M2 : 70 000 FCFA",
];

export const MASTERS_DETAILED_CONTENT: Record<string, DetailedFormationContent> = {
  // =========================================================================
  // 1. MASTER AUDIT ET CONTRÔLE DE GESTION (Master ACG.pdf)
  // =========================================================================
  "master-audit-et-controle-de-gestion": {
    mention: "AUDIT ET CONTRÔLE DE GESTION - ACG",
    specialty: "AUDIT ET CONTRÔLE DE GESTION - ACG",
    description:
      "Le Master Audit et Contrôle de Gestion – ACG permet d’acquérir en deux années académiques une formation spécialisée en comptabilité, finance, fiscalité, audit et contrôle de gestion.\nIl s’agit d’une formation de référence, construit en lien étroit avec les attentes des entreprises et organisations.\n\nEn outre, le Master ACG permet également aux apprenants d’avoir une vision globale de l'entreprise, de la rigueur, de l'autonomie et le sens de l'initiative grâce à des modules supports tels que le développement personnel et professionnel, le management et organisation des entreprises, la gestion de projet…",
    career_opportunities_list: [
      "Auditeur interne/externe",
      "Expert-comptable",
      "Commissaire aux comptes",
      "Contrôleur de gestion",
      "Responsable des services comptables et financiers",
      "Responsable de comptabilité des groupes",
      "Analyste financier",
      "Chef comptable",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le programme est ouvert aux étudiants titulaires d’une Licence en Gestion et Stratégie d’Entreprises, en Comptabilité, en Finance, en Economie ou tout autre diplôme de niveau BAC+3 admis en équivalence.",
      "Le Master ACG est aussi accessible aux professionnels évoluant dans le domaine de la gestion, de la comptabilité, de la finance, du contrôle et de l’audit.",
      "Les candidats au Master ACG doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Comptabilité bancaire",
          "Techniques fiscales",
          "Les règles d’évaluation comptable et financière",
          "Fiscalité approfondie",
          "Les obligations fiscales et sociales de l'entreprise",
          "Taxe sur les activités financières",
          "L’enregistrement comptable des capitaux permanents",
          "Les opérations de fusion et les comptes consolidés",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Information comptable et management financier",
          "Normes comptables internationales IAS/IFRS",
        ],
      },
      {
        title: "Contrôle",
        items: [
          "Introduction à l’étude du contrôle de gestion",
          "L’organisation et les coûts",
          "La pertinence des méthodes d’évaluation et d’analyse des coûts",
          "Méthode des coûts préétablis",
          "Organisation et budgets",
          "Amélioration de la performance de l’entreprise",
          "Contrôle interne",
          "Le pilotage de la performance structurelle de l'entreprise",
          "Ethique de la profession comptable et contrôle interne",
        ],
      },
      {
        title: "Audit",
        items: [
          "Cadre conceptuel et spécificités de l'audit",
          "Audit légal",
          "Déroulement de la mission d'audit",
          "Examen limité et autres interventions définies",
          "Pratique de la mise en place des procédures, de l'audit financier et comptable",
        ],
      },
      {
        title: "Management des systèmes d’information",
        items: [
          "Concept SI et modélisation",
          "Conception et mise en œuvre d’un SI",
          "Systèmes décisionnels",
          "Gouvernance des systèmes d’information",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur",
          "Diagnostic financier",
          "Politique d’investissement et de financement",
          "Gestion de la trésorerie",
          "Diagnostic financier approfondi",
          "Econométrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Evaluation d’entreprise",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
          "Visites d’entreprise",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 2. MASTER GESTION FINANCIÈRE, FISCALE ET COMPTABLE DES ENTREPRISES (Master GFCE.pdf)
  // =========================================================================
  "master-gestion-financiere-fiscale-et-comptable-des-entreprises": {
    mention: "GESTION FINANCIERE, FISCALE ET COMPTABLE DES ENTREPRISES - GFCE",
    specialty: "GESTION FINANCIÈRE, FISCALE ET COMPTABLE DES ENTREPRISES - GFCE",
    description:
      "Le Master GSE – Spécialité Gestion Financière Fiscale et comptable des Entreprises permet, en deux années académiques, d’acquérir une formation spécialisée.\nEn effet, le Master GSE favorise l'acquisition de savoirs, de savoir-faire et de savoir être indispensables à la gestion d’entreprises et à la stratégie financière pour l’accès à des postes dans des entreprises, des banques et cabinets privés ou publics, notamment dans les groupes favorisant la qualification au niveau de la branche d’activités et la promotion interne.\n\nIl permet également d’avoir une vision globale de l'entreprise, des savoirs applicables, de la rigueur, de l'autonomie, du sens de l'initiative qui sont les principales qualités développées par les étudiants poursuivant ce parcours.",
    career_opportunities_list: [
      "Responsable administratif et financier",
      "Directeur financier",
      "Chef comptable",
      "Chef d’entreprise",
      "Cadre financier",
      "Gestionnaire de Patrimoine",
      "Conseiller/Conseillère en Gestion Banque privée",
      "Conseiller/Conseillère en gestion de capitaux",
      "Conseiller fiscaliste",
      "Consultant en fusions et acquisitions",
      "Commissaire aux comptes",
      "Gestionnaire de paie",
      "Analyste financier",
      "Conseiller/Conseillère en investissements financiers",
      "Gestionnaire d'actifs",
      "Analyste quantitatif en finance",
      "Trésorier d’entreprise",
    ],
    admission_conditions_list: [
      "Le programme est ouvert aux étudiants titulaires d’une Licence en Gestion et Stratégie d’Entreprise, en Comptabilité, en Finance, en Economie ou tout autre diplôme de niveau BAC+3 admis en équivalence.",
      "Le Master GFCE est aussi accessible aux professionnels évoluant dans le domaine de la gestion, de la comptabilité, de la finance, du contrôle et de l’audit.",
      "Les candidats au Master GFCE doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Techniques fiscales",
          "Les règles d’évaluation comptable et financière",
          "Fiscalité approfondie",
          "Les obligations fiscales et sociales de l'entreprise",
          "Taxe sur les activités financières",
          "L’enregistrement comptable des capitaux permanents",
          "Les opérations de fusion et les comptes consolidés",
          "Comptabilité bancaire",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Information comptable et management financier",
          "Normes comptables internationales IAS/IFRS",
        ],
      },
      {
        title: "Contrôle",
        items: [
          "Introduction à l’étude du contrôle de gestion",
          "L’organisation et les coûts",
          "La pertinence des méthodes d’évaluation et d’analyse des coûts",
          "Méthode des coûts préétablis",
          "Organisation et budgets",
          "Amélioration de la performance de l’entreprise",
          "Contrôle interne",
        ],
      },
      {
        title: "Techniques de contrôle approfondies",
        items: [
          "Le pilotage de la performance structurelle de l'entreprise",
          "Ethique de la profession comptable et contrôle interne",
          "Examen limité et autres interventions définies",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur",
          "Diagnostic financier",
          "Politique d’investissement et de financement",
          "Gestion de la trésorerie",
          "Diagnostic financier approfondi",
          "Econométrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Evaluation d’entreprise",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
          "Visites d’entreprise",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 3. MASTER INGÉNIERIE FINANCIÈRE (Master IF.pdf)
  // =========================================================================
  "master-ingenierie-financiere": {
    mention: "INGENIERIE FINANCIERE - IF",
    specialty: "INGÉNIERIE FINANCIÈRE - IF",
    description:
      "Le programme de Master en Ingénierie Financière permet, en deux années académiques de préparer les apprenants à la maîtrise des techniques, méthodes et outils de la Banque et de la Finance et à l’acquisition d’un savoir-faire et d’un savoir être qu’ils pourront mettre au service des organisations notamment :\n• Piloter le système de reporting et d’analyse des risques financiers de l’entreprise ;\n• Construire des mécanismes de financement à court et moyen terme de l’ensemble des activités de l’organisation ;\n• Réaliser l’évaluation financière d’un projet d’investissement à long terme pour l’organisation ;\n• Assurer la gestion de portefeuilles d’actifs financiers ;\n• Elaborer une stratégie de financement à long terme d’une organisation.\n\nIl est destiné particulièrement aux cadres et cadres supérieurs qui projettent de travailler dans les banques d’investissements et commerciales, la gestion d’investissement, l’analyse des valeurs, les marchés financiers, le commerce et la gestion du risque, la fonction financière des entreprises, la finance d’entreprise, le capital-risque, la planification d’entreprise et la consultance, la gestion stratégique dans le domaine financier...",
    career_opportunities_list: [
      "Chargé de clientèle particuliers/entreprises",
      "Gestionnaire de caisse dans une banque",
      "Conseiller en patrimoine",
      "Analyste financier",
      "Comptable bancaire",
      "Directeur administratif et financier",
      "Opérateur de marché",
      "Concepteur et conseiller en opérations et produits financiers",
      "Spécialiste des opérations bancaires",
      "Credit manager",
      "Chargé d'Affaires en Capital d’Investissement",
      "Analyste Risques de Crédit",
    ],
    admission_conditions_list: [
      "Le Master Ingénierie Financière est ouvert aux titulaires d’une Licence en : Banque Assurance et Finance, Finance et Comptabilité, Economie et gestion, Mathématiques, Econométrie et Statistique, Economie Appliquée à la Finance, ou tout autre diplôme admis en équivalence.",
      "Le Master IF est également ouvert aux professionnels de la Banque, de la Finance et de l’Assurance.",
      "Les candidats au Master IF doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Techniques fiscales",
          "Fiscalité approfondie",
          "Comptabilité bancaire",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Fiscalité internationale",
          "Taxe sur les activités financières",
          "Audit et contrôle interne",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur",
          "Diagnostic financier",
          "Politique d'investissement et de financement",
          "Gestion de la trésorerie",
          "VBA appliqué à la finance",
          "Finance islamique",
          "Diagnostic financier approfondi",
          "Econométrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Evaluation d’entreprise",
        ],
      },
      {
        title: "Ingénierie financière et management des risques",
        items: [
          "Analyse financière",
          "Stratégie financière à court et long terme",
          "Gestion de portefeuille",
          "Gestion obligataire",
          "Management des risques : la valeur, le temps et le risque",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 4. MASTER FINANCE INTERNATIONALE ET MARCHÉS BOURSIERS (Master FIMB.pdf)
  // =========================================================================
  "master-finance-internationale-et-marches-boursiers": {
    mention: "FINANCE INTERNATIONALE ET MARCHES BOURSIERS - FIMB",
    specialty: "FINANCE INTERNATIONALE ET MARCHÉS BOURSIERS - FIMB",
    description:
      "Le programme de Master en Banque Assurance Finance – BAF, spécialité Finance Internationale et Marchés Boursiers permet, en deux années académiques, de préparer les apprenants à la maîtrise des techniques, méthodes et outils permettant de devenir expert dans tous les métiers liés aux investissements sur les marchés financiers.\nIl est destiné particulièrement aux cadres et cadres supérieurs qui projettent de travailler dans les sociétés de gestion et d’intermédiation, les banques d’investissements, les banques commerciales, les marchés financiers, le commerce et la gestion du risque, la finance d’entreprise, le capital-risque, la planification d’entreprise et la consultance, … et qui savent s'adapter de manière adéquate aux changements quotidiens que subit la bourse.",
    career_opportunities_list: [
      "Trader",
      "Gestionnaire de Portefeuille",
      "Conseiller en investissement",
      "Technicien des opérations bancaires",
      "Gestionnaire de fonds",
      "Conseiller banque à distance",
      "Conseiller en patrimoine",
      "Analyste financier",
      "Trésorier",
      "Responsable administratif et financier",
    ],
    admission_conditions_list: [
      "Le Master Finance Internationale et Marchés Boursiers est ouvert aux titulaires d’une Licence en : Banque Assurance et Finance, Finance et Comptabilité, Economie et gestion, Mathématiques, Econométrie et Statistiques, Economie Appliquée à la Finance, ou tout autre diplôme admis en équivalence.",
      "Le Master FIMB est également ouvert aux professionnels de la Banque, de la Finance et de l’Assurance.",
      "Les candidats au Master FIMB doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Rappel de Comptabilité financière",
          "Techniques fiscales",
          "Fiscalité approfondie",
          "Comptabilité bancaire",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Fiscalité internationale",
          "Taxe sur les activités financières",
          "Audit et contrôle interne",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur",
          "Diagnostic financier",
          "Politique d'investissement et de financement",
          "Gestion de la trésorerie",
          "VBA appliqué à la finance",
          "Finance islamique",
          "Diagnostic financier approfondi",
          "Econométrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Evaluation d’entreprise",
        ],
      },
      {
        title: "Ingénierie financière et management des risques",
        items: [
          "Analyse financière",
          "Stratégie financière à court et long terme",
          "Management des risques : la valeur, le temps et le risque",
        ],
      },
      {
        title: "Bourse et finance de marchés",
        items: [
          "Marché monétaire",
          "Marché des actions et des obligations",
          "Simulation boursière (salle des marchés dédiée)",
          "Les marchés internationaux des capitaux",
          "Les structures et intervenants à la bourse",
          "Le fonctionnement du marché",
          "Gestion de portefeuille",
          "Gestion obligataire",
          "Investir en bourse",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 5. MASTER BANQUE PRIVÉE INTERNATIONALE (Master BPI.pdf)
  // =========================================================================
  "master-banque-privee-internationale": {
    mention: "BANQUE PRIVEE INTERNATIONALE - BPI",
    specialty: "BANQUE PRIVÉE INTERNATIONALE - BPI",
    description:
      "Les acteurs du marché financier se caractérisent par une offre aussi variée que l’est leur clientèle et cela est d’autant plus vrai dans un contexte international. La clientèle de la banque privée nécessite une approche particulière.\nPour répondre aux exigences de cette clientèle, le Master Banque Assurance Finance Spécialité Banque Privée Internationale permet de développer des compétences techniques, commerciales et professionnelles nécessaires à l'exercice de métier aux enjeux conséquents.\n\nIntégrité, fiabilité et crédibilité seront les caractéristiques recherchées chez ces experts du secteur bancaire. Les métiers de la gestion privée offrent des spécialités qui seront autant d’opportunités d’évolution de carrière.\nLe passage à l’action effectué lors de la formation permet au diplômé de savoir mener une analyse de l’environnement de l’entreprise, d’émettre des préconisations et de les mettre en œuvre : ceci se révèlera être un atout décisif pour l’intégration au sein d’une organisation à un poste de responsabilité.",
    career_opportunities_list: [
      "Chargé de clientèle particuliers/entreprises",
      "Gestionnaire de caisse dans une banque",
      "Responsable service commercial",
      "Technicien des opérations bancaires",
      "Conseiller banque à distance",
      "Responsable d'unité commerciale",
      "Conseiller en patrimoine",
      "Analyste financier",
      "Comptable bancaire",
      "Responsable administratif et financier",
      "Responsable comptable",
    ],
    admission_conditions_list: [
      "Le Master Banque Privée Internationale est ouvert aux titulaires d’une Licence en : Banque Assurance et Finance, Finance et Comptabilité, Economie et gestion, Mathématiques, Econométrie et Statistique, Economie Appliquée à la Finance, ou tout autre diplôme admis en équivalence.",
      "Le Master BPI est également ouvert aux professionnels de la Banque, de la Finance et de l’Assurance.",
      "Les candidats au Master BPI doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Rappel de Comptabilité financière",
          "Techniques fiscales",
          "Fiscalité approfondie",
          "Comptabilité bancaire",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Fiscalité internationale",
          "Taxe sur les activités financières",
          "Audit et contrôle interne",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur",
          "Diagnostic financier",
          "Politique d'investissement et de financement",
          "Gestion de la trésorerie",
          "VBA appliqué à la finance",
          "Finance islamique",
          "Diagnostic financier approfondi",
          "Econométrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Evaluation d’entreprise",
        ],
      },
      {
        title: "Ingénierie financière et management des risques",
        items: [
          "Analyse financière",
          "Stratégie financière à court et long terme",
          "Gestion de portefeuille",
          "Gestion obligataire",
          "Management des risques : la valeur, le temps et le risque",
        ],
      },
      {
        title: "Banque: Outils de gestion",
        items: [
          "Gestion de la relation client",
          "Analyse et gestion des actifs financiers",
          "Analyse technique",
          "Gestion de patrimoine",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 6. MASTER MANAGEMENT DES RESSOURCES HUMAINES (Master GRH.pdf)
  // =========================================================================
  "master-management-des-ressources-humaines": {
    mention: "GESTION DES RESSOURCES HUMAINES - GRH",
    description:
      "Le Master GRH permet, en deux années académiques, d’acquérir une formation spécialisée dans tout le processus de la gestion du personnel : du recrutement à l’administration du personnel en passant par la rémunération et la formation.\nEn effet, le Master GRH favorise l'acquisition de savoirs, de savoir-faire et de savoir être indispensables pour l'accès à des emplois dans les entreprises industrielles et commerciales, de prestation de services, dans les organisations et administrations, etc.\n\nIl permet également d’avoir une vision globale de l'entreprise et de développer des qualités organisationnelles telles que le sens de l'initiative, l'autonomie, la rigueur, l’optimisation, etc.\nCes objectifs correspondent bien aux nouvelles fonctions du DRH et de son équipe dans les entreprises, notamment une implication plus grande dans le processus stratégique des organisations.",
    career_opportunities_list: [
      "Chargé de formation",
      "Chargé de recrutement",
      "Chargé des relations sociales",
      "Directeur des RH",
      "Responsable de la formation",
      "Responsable du développement des RH",
      "Responsable du recrutement",
      "Chef de projet",
      "Consultant RH",
      "Etc",
    ],
    admission_conditions_list: [
      "Le Master GRH est ouvert aux étudiants et professionnels titulaires d’une Licence de GRH, de Droit, de Management ou tout autre diplôme de licence ayant les fondamentaux du droit et/ou de la gestion.",
      "Les candidats au Master GRH doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Management des Ressources Humaines",
        items: [
          "Sociologie des organisations",
          "Psychologie du travail et des organisations",
          "Gestion opérationnelle des RH",
          "Management d’équipes et gestion des conflits",
          "Conditions de travail",
          "Bilan social",
          "Audit social",
          "Administration du personnel et politique de rémunération comparée",
          "Gestion des carrières et développement",
          "Ergonomie",
          "Système d’amélioration des performances du personnel (SAPER)",
          "Pratique de la gestion des ressources humaines",
          "SAARI Paie",
        ],
      },
      {
        title: "Environnement juridique",
        items: [
          "Relations individuelles et collectives du travail",
          "Droit du travail et de la sécurité sociale",
          "Instances de représentation du personnel",
          "Santé sécurité au travail",
          "Les obligations fiscales et sociales de l'entreprise",
        ],
      },
      {
        title: "Stratégie des ressources humaines",
        items: [
          "Politique de l’emploi",
          "GPEC approfondie",
          "Gestion stratégique des ressources humaines",
          "GRH et changement organisationnel",
          "Système d’information RH(SIRH)",
          "Gestion de la paie et de la masse salariale",
          "Mobilité internationale",
        ],
      },
      {
        title: "Formation",
        items: [
          "La politique de la formation",
          "Le droit à la formation",
          "Le plan de formation",
        ],
      },
      {
        title: "Recrutement",
        items: [
          "Gestion du besoin de recrutement",
          "Le processus d’embauche et d’intégration",
          "Recrutement en anglais",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
          "Visites d’entreprise",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 7. MASTER MARKETING MANAGEMENT ET COMMUNICATION DIGITALE (Master MMC.pdf)
  // =========================================================================
  "master-marketing-management-et-communication-digitale": {
    mention: "MARKETING ET COMMUNICATION DIGITALE",
    specialty: "MARKETING ET COMMUNICATION DIGITALE",
    description:
      "Le programme du Master MMC permet, en deux années académiques, d’acquérir une formation spécialisée en marketing et en communication mais aussi en techniques numériques. Il offre aux apprenants toutes les clés pour devenir un relais entre entreprise et consommateur.\nEn effet, à l’ère du digital, mettre en place des stratégies marketing, nécessite des compétences aussi bien dans le domaine traditionnel du marketing et de la communication que dans le domaine du numérique.\n\nEn outre, le Master MMC favorise aussi l'acquisition de savoirs, de savoir-faire, de savoir être, de savoir-faire faire et de savoir devenir nécessaires pour l'accès à des emplois dans les entreprises industrielles, commerciales et de prestation de services ainsi que dans les autres organisations.",
    career_opportunities_list: [
      "Directeur ou chef de service marketing / communication / commercial",
      "Responsable de la stratégie digitale",
      "Marketing business analyst",
      "Social media manager",
      "Consultant search marketing",
      "Responsable marketing",
      "Chef de produit / secteur",
      "Consultant dans des cabinets de marketing ou de communication",
      "Responsable du merchandising",
      "Chargé de la relation client",
      "Conseiller commercial",
      "Média planneur",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le Master MMC est accessible aux étudiants et professionnels ayant obtenu une Licence en marketing, en communication, en affaires internationales, en informatique ou tout autre diplôme de licence ayant les fondamentaux du marketing, de la communication et/ou de la gestion.",
      "Les candidats au Master MMC doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Marketing management",
        items: [
          "Etudes et recherche marketing",
          "Marketing mix",
          "Système d'information marketing",
          "La marque",
          "Marketing stratégique",
          "Marketing B to B",
          "Marketing des services",
          "Elaboration et gestion du budget marketing",
          "Management de la force de vente",
          "Droit du marketing",
          "Audit marketing",
        ],
      },
      {
        title: "Communication",
        items: [
          "Structure de la politique globale de communication",
          "La communication média et la communication hors média",
          "Le mix communication",
          "Les tableaux de bord de la communication",
          "La communication de crise",
          "Approche psychosociale du consommateur",
          "La communication globale",
          "Plan de communication",
        ],
      },
      {
        title: "Marketing et communication digitale",
        items: [
          "Marketing digital et E-business",
          "Communication digitale",
          "E-commerce",
          "HTML5/CSS3",
          "CMS",
          "Conception d'un site web marchand",
          "Production de contenu multimédia",
          "Web data analytics",
          "Community management et E-reputation",
          "E-strategy",
          "Search engine marketing : SEO,SEA,SMO",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Comptabilité de gestion",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Visites d’entreprise",
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 8. MASTER STRATÉGIE MANAGÉRIALE À L'INTERNATIONALE (Master MAI - SMI.pdf)
  // =========================================================================
  "master-strategie-manageriale-a-linternationale": {
    mention: "STRATEGIE MANAGERIALE A L’INTERNATIONAL",
    specialty: "STRATÉGIE MANAGÉRIALE À L’INTERNATIONAL",
    description:
      "Le programme du Master MAI - Spécialité Stratégie Managériale à l’International permet l’acquisition de solides connaissances sur l’ensemble des expertises techniques et managériales de la pratique des affaires dans un contexte international en utilisant convenablement la langue des affaires internationales à savoir l’anglais. Il a pour objectif principal de former des cadres capables d’appréhender les nouveaux enjeux liés à la mondialisation des économies, nécessaires pour anticiper les mutations du marché, déployer une stratégie et gérer des équipes à l’international.\n\nA l’issue de la formation, les apprenants seront à même de :\n• Participer à la détermination de la stratégie de développement international de l’entreprise ;\n• Savoir traiter les appels d’offre à l’international et gérer les relations d’approvisionnement avec les fournisseurs ;\n• Pouvoir analyser et évaluer les risques de crédit et de change ;\n• Savoir maîtriser les étapes financières et douanières liées au passage de frontières.",
    career_opportunities_list: [
      "Chef de service ou directeur export",
      "Chef de service ou directeur marketing",
      "Chef des services étrangers dans les banques",
      "Consultant junior dans le développement international des entreprises",
      "Transitaire",
      "Responsable achat",
      "Responsable développement produit à l’international",
      "Chargé d’affaires international",
      "Directeur/Responsable international",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le Master MAI est accessible aux étudiants et professionnels ayant obtenu une Licence et ayant au moins le niveau B1 du CECRL en anglais.",
      "Les candidats au Master MAI doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Environnement international",
        items: [
          "Economie internationale",
          "Stratégie d'entreprise",
          "Géopolitique et intelligence économique (en anglais)",
          "Droit international des affaires",
          "Droit des transports",
        ],
      },
      {
        title: "Commerce international",
        items: [
          "La prospection des marchés étrangers",
          "Commerce et finances internationaux",
          "Management des achats à l'international (en anglais)",
          "Management des ventes à l'international (en anglais)",
          "Techniques d'assurance",
          "Négociation internationale (en anglais)",
          "Politique douanière internationale",
        ],
      },
      {
        title: "Stratégie de développement des entreprises à l’international",
        items: [
          "Stratégie de croissance interne",
          "Stratégie de croissance externe",
          "La structure organisationnelle de la multinationale (en anglais)",
          "La gestion commerciale des entreprises internationales (en anglais)",
        ],
      },
      {
        title: "Supply chain management :",
        items: [
          "Logistique, Supply Chain, le concept",
          "Chaine et coûts logistiques",
          "Les méthodes d'approvisionnement",
          "La politique douanière internationale",
          "Distribution",
          "Transport et logistique internationale",
        ],
      },
      {
        title: "International finance & Risk management",
        items: [
          "Choix des investissements",
          "Le système monétaire international",
          "Le change",
          "Le système bancaire international",
          "Risques liés aux opérations à l'international",
        ],
      },
      {
        title: "Marketing Management : revue pratique de l’étude",
        items: [
          "Etudes et recherche marketing",
          "Marketing mix",
          "Système d'information marketing",
          "Géomarketing",
          "CRM",
          "Marketing international",
        ],
      },
      {
        title: "Marketing et communication digitale à l’international",
        items: [
          "Développement web",
          "Marketing digital et E-Business",
          "Communication digitale",
          "E-commerce",
          "Conception d'un site web marchand",
          "Web data analytics",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Gestion de projet",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Business english",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Visites d’entreprise",
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 9. MASTER SUPPLY CHAIN MANAGEMENT (Master SCM.pdf)
  // =========================================================================
  "master-supply-chain-management": {
    mention: "SUPPLY CHAIN MANAGEMENT - SCM",
    specialty: "SUPPLY CHAIN MANAGEMENT - SCM",
    description:
      "La mondialisation et l'intensification de la concurrence exigent une parfaite maîtrise de la chaîne logistique qui constitue un axe stratégique essentiel pour l’entreprise. Cette dernière est ainsi passée d'une logistique opérationnelle au concept de logistique globale, qui renvoie aussi bien aux opérations classiques (approvisionnements, stockage, transport…) qu'à la maîtrise des flux financiers et les flux d'informations devenus stratégiques pour leur bon fonctionnement.\n\nLe programme de Master en Supply Chain Management prépare les apprenants à devenir des professionnels des transports et de la logistique, capables d’optimiser l’ensemble des ressources, moyens, méthodes et outils dans le but de piloter efficacement le processus des flux circulant au sein de l'organisation. Il s'agit précisément de pouvoir coordonner la gestion des flux d'un réseau en termes de coûts, délais et qualité depuis l'approvisionnement des fournisseurs jusqu'à la distribution aux clients tout en prenant en compte la dimension environnementale.",
    career_opportunities_list: [
      "Responsable des opérations logistiques et transports",
      "Coordinateur de parc containers",
      "Responsable logistique",
      "Gestionnaire de flotte terre/mer/air",
      "Collaborateur commissionnaire/transitaire",
      "Responsable d’affrètement",
      "Acheteur",
      "Gestionnaire des stocks",
      "Chargé d'ordonnancement et de planification des transports",
      "Responsable d'expédition",
      "Responsable de production",
      "Responsable Achat/approvisionnement",
      "Gestionnaire de stocks - Entrepôts",
      "Gestionnaire de plateforme logistique",
      "Gestionnaire de société de transport",
      "Responsable transit",
    ],
    admission_conditions_list: [
      "Le Master Supply Chain Management est ouvert aux étudiants ayant obtenus une Licence en Transport et Logistique, en Management de Affaires Internationales, en Commerce International, en Transit, en Marketing et Communication, en Administration des entreprises ou tout autre diplôme de licence ayant les fondamentaux de la logistique et/ou de la gestion.",
      "Le Master SCM est également ouvert aux professionnels évoluant dans le domaine de la logistique, du commerce international, de la douane…",
      "Les candidats au Master SCM doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Transport & Douane",
        items: [
          "Introduction au transport",
          "Droit des transports",
          "Economie des transports",
          "Transport et logistique internationale",
          "Politique douanière internationale",
        ],
      },
      {
        title: "Supply Chain Management",
        items: [
          "Logistique, supply chain management : le concept",
          "Prévision des besoins et gestion des composantes",
          "Chaine et coûts logistiques",
          "Les méthodes d’approvisionnement",
          "Gestion de production et soutien logistique intégré",
          "La gestion des stocks avec Excel",
          "Management de projets logistiques",
          "Code ISPS",
          "Achats et approvisionnements",
          "Organisation des activités de manutention et de stockage",
          "Emballage – conditionnement",
          "Gestion de plateformes logistiques",
          "Système d'entreposage",
          "Externalisation logistique",
          "Green logistics et reserve logistics",
        ],
      },
      {
        title: "E-logistique et gestion des SI",
        items: [
          "E-logistique et géolocalisation",
          "Gestion des SI et ERP",
          "VBA (Excel avancé)",
        ],
      },
      {
        title: "Contrôle et audit",
        items: [
          "Indicateurs et tableaux de bord",
          "Contrôle de gestion et outils de prévision",
          "Audit logistique",
        ],
      },
      {
        title: "Outils commerciaux et logistiques",
        items: [
          "Recherche marketing",
          "Marketing stratégique",
          "Négociation et animation des équipes de vente",
          "Distribution",
        ],
      },
      {
        title: "Affaires Internationales :",
        items: [
          "Economie internationale",
          "La prospection des marchés étrangers",
          "Commerce et finance internationaux",
          "Techniques d’assurance",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "La gestion de la QSHE",
          "Recherche opérationnelle en logistique (LIPS)",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
          "Visites d’entreprise",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 10. MASTER LOGISTIQUE ET MANAGEMENT PORTUAIRE (Master LMP.pdf)
  // =========================================================================
  "master-logistique-et-management-portuaire": {
    mention: "LOGISTIQUE ET MANAGEMENT PORTUAIRE – LMP",
    specialty: "LOGISTIQUE ET MANAGEMENT PORTUAIRE – LMP",
    description:
      "Le commerce international dépendant à 90 % du transport maritime, fait de ce dernier, avec les ports, un maillon clé de la supply chain. Tous les acteurs autour du port doivent offrir la performance attendue par les clients qu’il s’agisse d’efficience, de qualité ou de performance environnementale et sociale.\n\nLe programme de Master en Génie Logistique, Spécialité Logistique et Management Portuaire prépare les apprenants à devenir des professionnels des transports et de la logistique maritime, capables de maitriser toutes les problématiques du commerce international et pouvoir gérer l’ensemble des flux portuaires.",
    career_opportunities_list: [
      "Responsable logistique",
      "Responsable de parc containers",
      "Gestionnaire de flotte",
      "Responsable d’affrètement",
      "Chargé d'ordonnancement et de planification des transports",
      "Responsable d'expédition",
      "Consultant en logistique",
      "Gestionnaire de plateforme logistique",
      "Gestionnaire de société de transport",
      "Responsable transit",
      "Responsable d’entrepôt",
      "Responsable d’exploitation",
      "Responsable de service transit",
      "Chef de ligne maritime",
      "Ship manager",
      "Responsable Booking",
      "Expert maritime",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le Master Logistique et Management Portuaire est ouvert aux étudiants ayant obtenu une Licence en Transport et Logistique, en Management de Affaires Internationales, en Commerce International, en Transit, en Marketing et Communication, en Administration des entreprises ou tout autre diplôme de licence ayant les fondamentaux de la logistique et/ou de la gestion.",
      "Le Master LMP est également ouvert aux professionnels évoluant dans le domaine de la logistique, du commerce international, du transit, de la douane…",
      "Les candidats au Master LMP doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Supply Chain Management",
        items: [
          "Logistique, supply chain management, le concept",
          "Chaine et coûts logistiques",
          "La politique douanière internationale",
          "Transport et logistique internationale",
          "Management de projets logistiques",
        ],
      },
      {
        title: "Management portuaire",
        items: [
          "Technologie des bateaux (anglais)",
          "Code ISPS",
          "Booking et cotation",
          "Anglais portuaire",
          "Lignes régulières",
          "Gestion des escales",
          "Organisation et gestion de la manutention portuaire",
          "Culture portuaire",
          "Partenariat entreprises",
          "Vente et prestation maritime",
          "Affrètement et tramping",
          "Organisation et gestion des ports",
          "Communication portuaire",
          "Gestion des flux portuaires et maritimes",
          "Ligne de produit",
          "Transport de marchandises dangereuses",
        ],
      },
      {
        title: "Droit",
        items: [
          "Droit africain des transports",
          "Droit du transport international",
          "Droit des assurances maritimes",
          "Droit portuaire",
          "Droit du travail maritime et portuaire",
          "Droit douanier",
          "OHADA et intégration africaine",
        ],
      },
      {
        title: "Economie",
        items: [
          "Politique économique des armateurs",
          "Economie portuaire prospective",
          "Analyse économique",
        ],
      },
      {
        title: "Recherche opérationnelle",
        items: [
          "Algorithmes des transports",
          "Etude de la faisabilité d'une ligne",
          "Logiciels de gestion portuaire",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "La gestion de la QSHE",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
          "Visites d’entreprise",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 11. MASTER MANAGEMENT DE PROJET (Master MANAGEMENT DE PROJET.pdf)
  // =========================================================================
  "master-management-de-projet": {
    mention: "MANAGEMENT DE PROJET",
    description:
      "Notre MASTER en Management de Projet vise à former une nouvelle génération de leaders capables de relever les défis complexes du monde des affaires modernes.\nLes auditeurs acquerront une compréhension approfondie des principes du management de projet, des compétences en communication, de la gestion du risque et du travail d’équipe.\nIls seront dotés des techniques et méthodes de montage, de suivi-évaluation, de contrôle et de leadership liées au Management de projet, de programme et de portefeuille.\n\nNos diplômés pourront exceller dans divers secteurs, que ce soit dans les entreprises privées ou publiques, dans les organisations internationales ou même en tant que consultant.\nEnfin, notre programme offrira aux auditeurs les compétences et la confiance nécessaires pour naviguer avec succès dans le monde dynamique du management de projet.",
    career_opportunities_list: [
      "Manager de Projet",
      "Consultant en montage de projet, de programme et de portefeuille",
      "Chef de programme et de portefeuille",
      "Chargé de Passation de Marchés Publics",
      "Directeur de projet de développement",
      "Expert en suivi-évaluation",
      "Contrôleur de Projet, de programme et de portefeuille",
      "Consultant en organisation",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le MASTER Management de Projet est ouvert aux titulaires d’une Licence en : Sciences Économiques et Gestion, Sociologie, Finance, Comptabilité, ou tout autre diplôme admis en équivalence.",
      "Les candidats au MASTER Management de Projet doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "OUTILS DE BASE DE LA GESTION DE PROJET",
        items: [
          "Statistique",
          "Gestion des Bases de données (Excel Avancé)",
          "Informatique (KoBoToolBOX, SPSS)",
          "Recherche Opérationnelle",
        ],
      },
      {
        title: "TECHNIQUES COMPTABLES ET JURIDIQUES",
        items: [
          "Comptabilité Générale",
          "Gestion des coûts et des délais",
          "Aspects juridiques et fiscaux des Projets",
        ],
      },
      {
        title: "OUTILS D'ANALYSE DE PROJET",
        items: [
          "Analyse économique de Projet",
          "Analyse financière de Projet",
          "Analyse socio-environnementale de Projet",
        ],
      },
      {
        title: "MOBILISATION DES PARTIES PRENANTES",
        items: [
          "Approche participative en conduite de Projet (MARP)",
          "Pérennisation de Projet et autofinancement",
        ],
      },
      {
        title: "PLANIFICATION DE PROJET",
        items: [
          "Planification Stratégique 1",
          "Planification Opérationnelle 1 MS Project",
          "Planification Budgétaire",
        ],
      },
      {
        title: "METHODES DE GESTION DE PROJET 1",
        items: [
          "Généralités sur la Gestion de Projet",
          "Gestion Axée sur les Résultats (GAR1)",
          "Financement de Projet",
        ],
      },
      {
        title: "TECHNIQUES D'AUDIT ET DE SUIVI-EVALUATION",
        items: [
          "Audit de Projet",
          "Suivi-évaluation 1",
          "Analyse des données",
        ],
      },
      {
        title: "OUTILS DE MANAGEMENT",
        items: [
          "Méthodologie de recherche",
          "Business English",
        ],
      },
      {
        title: "METHODES DE GESTION DE PROJET 2",
        items: [
          "Planification stratégique 2",
          "Planification opérationnelle 2 MS Project",
          "Gestion axée sur les résultats (GAR 2)",
          "Suivi-Evaluation 2",
        ],
      },
      {
        title: "LEADERSHIP ET GESTION DE PROJET INTERNATIONAL",
        items: [
          "Leadership et Team Building en Gestion de Projet",
          "Management culturel de Projet International",
          "Management Agile",
        ],
      },
      {
        title: "SOCIOLOGIE ET GESTION DES RH DE PROJET",
        items: [
          "Psychosociologie du travail",
          "Gestion des équipes de Projet (GEP)",
          "Marketing Social",
        ],
      },
      {
        title: "OUTILS DE MANAGEMENT DU CONSEIL",
        items: [
          "Consultance, répondre à un appel d'offre",
          "Passation de Marché",
          "Techniques de Négociation",
          "Gestion de Portefeuille",
        ],
      },
      {
        title: "PRATIQUE METIERS",
        items: [
          "Vie Active et Professionnelle",
          "Stage et Mémoire de fin de parcours",
        ],
      },
      {
        title: "MANAGEMENT DE LA PERFORMANCE ET DE L'INNOVATION",
        items: [
          "Gestion de la Performance et du changement",
          "Prospective",
          "Ethique en Gestion de Projet",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 12. MASTER MANAGEMENT DES ORGANISATIONS SANITAIRES ET SOCIALES (MO2S)
  // =========================================================================
  "master-management-des-organisations-sanitaires-et-sociales": {
    mention: "MANAGEMENT DES ORGANISATIONS SANITAIRES ET SOCIALES (MO2S)",
    description:
      "Notre Programme Management des Organisations Sanitaires et Sociales (MO2S) cible des étudiants (en formation initiale ou continue) titulaires d’une Licence ou d’un Master en Sciences Sociales ou des Professionnels de secteur de la santé. Il a pour objectif principal de former aux postes de direction dans des organisations publiques et privées du secteur de la santé et médico-social.\n\nIl adopte une approche holistique, intégrant la théorie, des études de cas réels, des projets pratiques et une immersion dans les entreprises et les organisations.\nNos auditeurs auront également l’occasion de collaborer avec des professionnels hautement qualifiés, de participer à des ateliers interactifs et de développer des compétences transférables essentielles telles que la gestion du temps, le leadership, la communication sociale et la prise de décision.",
    career_opportunities_list: [
      "Directeur d’hôpital",
      "Responsable de service dans une structure sanitaire",
      "Cadre hospitalier",
      "Gestion du personnel dans le secteur sanitaire ou médico-social",
      "Responsable suivi-évaluation dans un organisme sanitaire ou médico-social",
      "Contrôleur de Gestion",
      "Gestionnaire d’un Système d’informations dans un établissement sanitaire ou médico-social",
      "Responsable qualité et sécurité dans les organisations sanitaires",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le MASTER Management des Organisations Sanitaires et Sociales (MO2S) est ouvert aux titulaires d’une Licence ou d’un Master I en Sciences Sociales : Sciences Économiques et Gestion, Finance, Comptabilité, Marketing, Sociologie, ou tout autre diplôme admis en équivalence.",
      "Le Programme est également ouvert aux professionnels du secteur sanitaire ou médico-social.",
      "Les candidats au MASTER Management des Organisations Sanitaires et Sociales (MO2S) doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "OUTILS DE BASE DU MANAGEMENT DES OS",
        items: [
          "Principes de base de la gestion des OS",
          "Gestion des Bases de données (Excel Avancé)",
          "Economie de la santé",
          "Prospective des OS",
          "Comptabilité de Gestion (gestion des fournitures médicales, inventaire)",
          "Théories des organisations",
          "Gouvernance et Management Stratégique",
          "Gestion économique et financière des OS",
        ],
      },
      {
        title: "ASPECTS JURIDIQUES DU MANAGEMENT DES OS",
        items: [
          "Droit Hospitalier",
          "Confidentialité et protection des données des patients",
          "Droit du travail",
        ],
      },
      {
        title: "METHODES ET OUTILS DE GESTION DE LA LOGISTIQUE DES OS",
        items: [
          "Gestion de la logistique hospitalière",
          "Gestion des systèmes d'informations",
        ],
      },
      {
        title: "PLANIFICATION DANS LES OS",
        items: [
          "Planification Stratégique",
          "Planification Opérationnelle MS Project",
          "Gestion Axée sur les Résultat",
        ],
      },
      {
        title: "METHODES DE SUIVI ET D’EVALUATION",
        items: [
          "Contrôle de Gestion des OS",
          "Audit",
          "Suivi-évaluation",
        ],
      },
      {
        title: "OUTILS DE MANAGEMENT",
        items: [
          "Méthodologie de recherche",
          "Business Médical",
          "GRC",
        ],
      },
      {
        title: "LEADERSHIP ET GESTION DU PERSONNEL DES OS",
        items: [
          "Leadership et Team Building",
          "Recrutement du personnel sanitaire et social",
          "Formation du personnel sanitaire et social",
          "Evaluation du personnel sanitaire et social",
          "Fiscalité des revenus des personnes physiques",
          "Ethique et gestion de la diversité",
          "Psychosociologie du travail",
          "Marketing Social",
          "Gestion des conflits",
          "Accueil et Orientation",
        ],
      },
      {
        title: "GESTION DE LA QHSE DANS LES OS",
        items: [
          "Qualité et normes de sécurité dans les OS",
          "Gestion des risques dans les établissements de santé",
          "Gestion de crise",
          "Gestion de l'Hygiène",
        ],
      },
      {
        title: "GESTION DE LA COMPTABILITE DANS LES OS",
        items: [
          "Gestion de la caisse",
          "Facturation et Gestion des assurances médicales",
          "Gestion de la pharmacie des OS",
        ],
      },
      {
        title: "MANAGEMENT DE LA PERFORMANCE ET DE L'INNOVATION",
        items: [
          "Conduite du changement",
          "Innovation dans la gestion des OS",
          "RSE dans la gestion d'une OS",
        ],
      },
      {
        title: "PRATIQUE METIERS",
        items: [
          "Stage et Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 13. MASTER QUALITÉ, HYGIÈNE, SÉCURITÉ ET ENVIRONNEMENT (Master QHSE.pdf)
  // =========================================================================
  "master-management-de-la-qualite-hygiene-securite-et-environnement": {
    mention: "QUALITE HYGIENE SECURITE ENVIRONNEMENT ET AUDIT - QHSE",
    description:
      "Le Master QHSE et Audit a pour objectif de former des cadres en système de management de la qualité, de l’hygiène, de la sécurité, de l’environnement et de l’audit.\nLes profils sortants peuvent évoluer dans divers secteurs d’activités : de la distribution, aux services en passant par les industries.\nEn outre, les actions suivantes sont les enjeux de toute entreprise soucieuse de contribuer au développement durable :\n- Fournir des produits et services conformes aux normes qualité,\n- Accroître la satisfaction des clients,\n- Améliorer la santé et la sécurité des travailleurs et des entreprises extérieures,\n- Eliminer les dangers et réduire les risques,\n- Protéger l’environnement des impacts des activités,\n- Prévenir toute pollution,\n- Pouvoir mener des investigations dans le domaine de la QHSE.\n\nPour affronter ces enjeux, le programme de Master en QHSE permet de former de futurs professionnels capables de mettre en place une démarche permettant à l’entreprise d’assurer une satisfaction de ses clients, un développement de ses ressources humaines et une performance environnementale aboutissant à une compétitivité.",
    career_opportunities_list: [
      "Chef de projet environnement et développement durable",
      "Responsable assurance qualité",
      "Responsable prévention des risques professionnels",
      "Responsable sécurité et environnement",
      "Responsable du service hygiène-sécurité",
      "Chargé de mission éthique et déontologie",
      "Directeur de l’environnement",
      "Manager en développement durable",
      "Directeur qualité",
      "Auditeur qualité",
      "Chargé de mission accréditation",
      "Spécialiste des certifications et des normes",
      "Chargé de recherche et développement",
    ],
    admission_conditions_list: [
      "Le master Qualité, Hygiène Sécurité et Environnement est ouvert aux étudiants ayant obtenus une Licence en QHSE, en Agroalimentaire, Biologie, en Pharmacie, en Sciences, en Sciences Economiques et de Gestion ou tout autre diplôme admis en équivalence.",
      "Il est aussi accessible aux professionnels évoluant dans le domaine de la QHSE et de la gestion.",
      "Les candidats au Master QHSE doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Management QHSE",
        items: [
          "Diagnostic et démarches qualité",
          "Les référentiels QHSE",
          "Management de la sécurité",
          "Management de l’environnement",
          "Management de l’hygiène",
          "Gestion documentaire et l’approche processus",
          "Gestion des risques agro-alimentaires",
          "Outils qualité",
          "Certification et accréditation",
          "Qualité totale (EFQM) / analyse de la valeur",
          "Maitrise statistique des procédés",
        ],
      },
      {
        title: "Audit et contrôle",
        items: [
          "Cadre conceptuel et spécifique de l’audit",
          "Documentation des missions d’audit",
          "Déroulement des missions d’audit",
          "Introduction au contrôle de gestion",
          "Cadre général et conceptuel du contrôle interne",
          "Ethique, déontologie et responsabilité de l’auditeur",
          "Appréciation du contrôle interne et mise en place de procédures",
        ],
      },
      {
        title: "Mise en œuvre",
        items: [
          "Système de management intégré",
          "Mise en œuvre QHSE domaine production, services, santé, sécurité",
          "Pratique de l’audit qualité",
          "Visites d’entreprise",
        ],
      },
      {
        title: "Organisation et gestion",
        items: [
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Organisation industrie, production et services",
          "Gestion de la production",
          "Gestion de la relation client",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Analyse économique",
          "Analyse quantitative",
          "Ethique des affaires",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 14. MASTER MANAGEMENT PUBLIC ET INNOVATION TERRITORIALE
  // =========================================================================
  "master-management-public-et-innovation-territoriale": {
    mention: "MANAGEMENT PUBLIC ET INNOVATION TERRITORIALE",
    description:
      "Le Master Management Public et Innovation Territoriale forme des cadres supérieurs pour piloter le développement des collectivités territoriales africaines dans un contexte de décentralisation accélérée.\n\nContexte :\nLe Master Management Public et Innovation Territoriale répond aux défis de la décentralisation en Afrique, où les collectivités territoriales gèrent de plus en plus de compétences transférées (fiscalité, urbanisme, services sociaux). Il s'appuie sur une progression logique : les fondamentaux du management public territorial (M1) vers le pilotage stratégique et projets innovants (M2), intégrant les enjeux numériques et durables des territoires africains.\n\nObjectif Général :\nFormer des managers publics territoriaux capables de piloter stratégiquement les collectivités territoriales pour un développement inclusif et résilient.\n\nObjectifs Spécifiques :\n• Maîtriser la planification publique territoriale\n• Maîtriser la gestion budgétaire, RH et juridique des collectivités sénégalaises.\n• Développer des compétences en innovation territoriale, partenariats public-privé et gestion de crise.\n• Renforcer la participation citoyenne et l'usage des outils numériques (SIG, plateformes collaboratives).\n• Préparer à des missions opérationnelles via stages en collectivités et mémoire appliqué.\n\nCompétences à atteindre :\n• Gestion publique : Budgets locaux, fiscalité, audit, RH territoriales, droit administratif.\n• Pilotage stratégique : Diagnostic territorial, gouvernance, gestion de crise, négociation publique.\n• Projets et innovation : Méthodologie de projets, PPP, innovation organisationnelle, ateliers créatifs.\n• Développement durable : Urbanisme, résilience, environnement, participation citoyenne.\n• Outils numériques : SIG, communication digitale, systèmes d'information territoriale.",
    career_opportunities_list: [
      "Directeur de cabinet / Secrétaire général de commune ou région",
      "Chargé de mission développement local",
      "Responsable projets territoriaux (collectivités, bailleurs de fonds)",
      "Conseiller en décentralisation (ministères, ONG internationales)",
      "Chef de service finances/RH des collectivités territoriales",
      "Consultant urbanisme et aménagement.",
    ],
    admission_conditions_list: [
      "Le Master Management Public et Innovation Territoriale est ouvert aux titulaires d’une Licence ou d’un Master 1 en Sciences Sociales : Droit et Sciences Politiques, Gestion et Administration Publique, Économie et Développement Local, Sciences de Gestion, Urbanisme et Aménagement, Sociologie et Démographie, Géographie et SIG, Informatique appliquée au territoire, ou tout autre diplôme admis en équivalence.",
      "Ce programme est également ouvert aux professionnels des collectivités territoriales, ONG de développement ou entreprises publiques souhaitant se reconvertir ou se perfectionner en management territorial et innovation publique.",
      "Les candidats au Master Management Public et Innovation Territoriale doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Gestion publique :",
        items: [
          "Budgets locaux",
          "Fiscalité",
          "Audit",
          "RH territoriales",
          "Droit administratif.",
        ],
      },
      {
        title: "Pilotage stratégique :",
        items: [
          "Diagnostic territorial",
          "Gouvernance des collectivités territoriales",
          "Gestion de crise",
          "Négociation publique",
        ],
      },
      {
        title: "Projets et innovation :",
        items: [
          "Méthodologie de projets",
          "Partenariats Publics Privés",
          "Innovation organisationnelle",
          "Ateliers créatifs",
        ],
      },
      {
        title: "Développement durable :",
        items: [
          "Urbanisme",
          "Résilience",
          "Environnement",
          "Participation citoyenne",
        ],
      },
      {
        title: "Outils numériques :",
        items: [
          "SIG",
          "Communication digitale",
          "Systèmes d'information territoriale.",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 15. MASTER BUSINESS INTELLIGENCE ET STRATÉGIE COMMERCIALE
  // =========================================================================
  "master-business-intelligence-et-strategie-commerciale": {
    mention: "BUSINESS INTELLIGENCE ET STRATÉGIE COMMERCIALE",
    description:
      "Le Master Business Intelligence et Stratégie Commerciale forme des cadres supérieurs capables d'analyser les données stratégiques pour piloter la performance commerciale dans un environnement digitalisé et international.\n\nContexte :\nLe Master Business Intelligence et Stratégie Commerciale répond à la transformation digitale des entreprises, où la Business Intelligence devient un levier stratégique pour la prise de décision. Il s'appuie sur une progression logique : les fondamentaux du management (M1) vers la spécialisation en stratégie data-driven et innovation commerciale (M2), intégrant les enjeux du commerce digital et durable.\n\nObjectif Général :\nFormer des managers maîtrisant l'analyse de données (BI) et la stratégie commerciale pour optimiser la performance des entreprises dans un contexte globalisé et numérique.\n\nObjectifs Spécifiques :\n• Maîtriser les outils BI et le contrôle de gestion pour piloter les performances commerciales.\n• Développer des business models innovants intégrant e-commerce, supply chain et commerce durable.\n• Renforcer les compétences en négociation internationale, management d'équipe et gestion de projets complexes.\n\nCompétences à atteindre :\n• Analyse stratégique : Business Intelligence, contrôle de gestion, audit de projets, études de marché avancées.\n• Stratégie commerciale : Négociation internationale, business models innovants, stratégie digitale et distribution.\n• Management opérationnel : Leadership d'équipes, gestion de projets complexes, soft skills professionnels.\n• Outils techniques : Excel avancé, outils BI, supply chain management, comptabilité analytique.\n• Innovation responsable : Entrepreneuriat, commerce alternatif (éthique, durable), innovation commerciale.",
    career_opportunities_list: [
      "Consultant Business Intelligence/Stratégie",
      "Responsable Data & Performance Commerciale",
      "Chef de projet digital / E-commerce Manager",
      "Business Developer International",
      "Contrôleur de gestion commerciale",
      "Entrepreneur / Créateur d'entreprise innovante",
    ],
    admission_conditions_list: [
      "Le Master Business Intelligence et Stratégie Commerciale est ouvert aux titulaires d’une Licence ou d’un Master I en Sciences Sociales et Techniques : Sciences Économiques et Gestion, Finance, Commerce, Comptabilité, Marketing, Sociologie, Informatique, ou tout autre diplôme admis en équivalence.",
      "Ce programme est également ouvert aux professionnels du commerce souhaitant se reconvertir ou se perfectionner en Business Intelligence et stratégie commerciale.",
      "Les candidats au Master Business Intelligence et Stratégie Commerciale doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Analyse stratégique",
        items: [
          "Business Intelligence",
          "Contrôle de gestion",
          "Audit de projets",
          "Etudes de marché avancées.",
        ],
      },
      {
        title: "Stratégie commerciale :",
        items: [
          "Négociation commerciale",
          "Business models innovants",
          "Stratégie digitale et distribution.",
        ],
      },
      {
        title: "Management opérationnel :",
        items: [
          "Leadership d'équipes",
          "Gestion de projets complexes",
          "Soft skills",
        ],
      },
      {
        title: "Outils techniques :",
        items: [
          "Excel avancé, outils BI",
          "Supply chain management",
          "Comptabilité analytique.",
        ],
      },
      {
        title: "Innovation responsable :",
        items: [
          "Entrepreneuriat",
          "Commerce alternatif (éthique, durable)",
          "Innovation commerciale.",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 16. MASTER INGÉNIERIE JURIDIQUE ET FISCALE (Master IJF.pdf)
  // =========================================================================
  "master-ingenierie-juridique-et-fiscale": {
    mention: "INGENIERIE JURIDIQUE ET FISCALE - IJF",
    specialty: "INGÉNIERIE JURIDIQUE ET FISCALE - IJF",
    description:
      "Le programme de Master en Ingénierie Juridique et Fiscale permet en deux années académiques de former des juristes-fiscalistes dotés d’une grande capacité de réflexion et d'analyse juridique et fiscale. Ils seront capables de défendre les intérêts de l’entreprise en prévoyant les risques et en veillant à l’application des lois et règlements.\n\nLes profils sortants de cette formation se positionnent comme des personnes incontournables dans la stratégie de l’entreprise en cela qu’ils apportent assistance et conseil au top management grâce à une veille juridico-fiscale permanente.\nIl s'agit d'une formation à forte dominance en Droit et en Fiscalité mais aussi en Comptabilité et en Management.",
    career_opportunities_list: [
      "Juriste-fiscaliste",
      "Auditeur juridique et fiscal",
      "Responsable fiscal",
      "Responsable contentieux",
      "Consultant juriste-fiscaliste",
      "Juriste en assurance",
      "Cadre juridique auprès de sociétés ou associations à but non lucratif",
      "Juriste de collectivité territoriale",
      "Juriste d’entreprise",
      "Conseiller juridique fiscal",
      "Mandataire liquidateur",
      "Administrateur judiciaire",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le Master Ingénierie Juridique et Fiscale est accessible aux étudiants et professionnels ayant au préalable validé une licence en droit, en fiscalité ou tout autre diplôme de licence ayant les fondamentaux du droit, de la fiscalité et/ou de la gestion.",
      "Les candidats au Master IJF doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie juridique",
        items: [
          "Droit pénal des affaires et sanctions fiscales",
          "Droit comptable",
          "Contrats spéciaux",
          "Procédures civiles et commerciales",
          "Droit des sûretés",
          "Droit des entreprises en difficultés",
          "Droit du contentieux",
          "Droit bancaire et du crédit",
          "Droit privé international",
          "AG et tenue des livres obligatoires",
          "Droit de la propriété intellectuelle",
          "Procédure simplifiée de recouvrement des créances et voies d’exécution",
        ],
      },
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Techniques fiscales",
          "Fiscalité approfondie",
          "L’entreprise et l’administration fiscale",
          "Généralité sur le droit fiscal, sur l’impôt et la structure du système fiscal sénégalais",
          "IS, IR et les autres impôts directs",
          "TVA et les autres impôts indirects",
        ],
      },
      {
        title: "Stratégie juridique",
        items: [
          "Le gouvernement d’entreprise et le droit à l’information des associés",
          "Techniques contractuelles",
          "Techniques comptables et problèmes juridiques et fiscaux",
        ],
      },
      {
        title: "Ingénierie fiscale",
        items: [
          "Fiscalité immobilière",
          "Fiscalité des fusions et opérations assimilées",
          "Taxe sur les activités financières",
          "Ingénierie fiscale",
          "Fiscalité des hydrocarbures",
          "Incitation à l’investissement",
        ],
      },
      {
        title: "Stratégie fiscale",
        items: [
          "Techniques fiscales",
          "Conventions fiscales internationales",
          "Contrôle et contentieux fiscaux",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Ethique des affaires",
          "Analyse économique",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 17. MASTER AUDIT JURIDIQUE ET FISCAL (Master AJF.pdf)
  // =========================================================================
  "master-audit-juridique-et-fiscal": {
    mention: "AUDIT JURIDIQUE ET FISCAL - AJF",
    specialty: "AUDIT JURIDIQUE ET FISCAL - AJF",
    description:
      "Le programme de Master en Management Juridique et Fiscal permet en deux années académiques de former des juristes-fiscalistes dotés d’une grande capacité de réflexion et d'analyse juridique et fiscale. Ils seront capables de défendre les intérêts de l’entreprise en prévoyant les risques et en veillant à l’application des lois et règlements.\n\nLes profils sortants de cette formation se positionnent comme des personnes incontournables dans la stratégie d’une organisation en cela qu’ils apportent assistance et conseil au top management grâce à une veille juridico-fiscale permanente.\nIl s'agit d'une formation à forte dominance en Droit, en Fiscalité et en Audit mais aussi en Comptabilité et en Management.",
    career_opportunities_list: [
      "Juriste-fiscaliste",
      "Auditeur juridique et fiscal",
      "Responsable fiscal",
      "Responsable contentieux",
      "Consultant juriste-fiscaliste",
      "Juriste en assurance",
      "Cadre juridique auprès de sociétés ou associations à but non lucratif",
      "Juriste de collectivité territoriale",
      "Juriste d’entreprise",
      "Juriste de banque et gestionnaire de patrimoine",
      "Administrateur judiciaire",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le Master Audit Juridique et Fiscal est accessible aux étudiants et professionnels ayant au préalable validé une licence en droit, en fiscalité ou tout autre diplôme de licence ayant les fondamentaux du droit, de la fiscalité et/ou de la gestion.",
      "Les candidats au Master AJF doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie juridique",
        items: [
          "Droit pénal des affaires et sanctions fiscales",
          "Droit comptable",
          "Contrats spéciaux",
          "Procédures civiles et commerciales",
          "Droit des sûretés",
          "Droit des entreprises en difficultés",
          "Droit du contentieux",
          "Droit bancaire et du crédit",
          "Droit privé international",
          "Droit de la propriété intellectuelle",
          "Procédure simplifiée de recouvrement des créances et voies d’exécution",
        ],
      },
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Généralité sur le droit fiscal, sur l’impôt et la structure du système fiscal sénégalais",
          "IS, IR et les autres impôts directs",
          "TVA et les autres impôts indirects",
          "Comptabilité financière",
          "Techniques fiscales",
          "Fiscalité approfondie",
          "L’entreprise et l’administration fiscale",
        ],
      },
      {
        title: "Stratégie juridique",
        items: [
          "AG et tenue des livres obligatoires",
          "Le gouvernement d’entreprise et le droit à l’information des associés",
          "Techniques contractuelles",
          "Techniques comptables et problèmes juridiques et fiscaux",
        ],
      },
      {
        title: "Ingénierie fiscale",
        items: [
          "Fiscalité immobilière",
          "Fiscalité des fusions et opérations assimilées",
          "Fiscalité des hydrocarbures",
          "Incitation à l’investissement",
          "Ingénierie fiscale",
          "Les obligations fiscales des banques et des établissements financiers",
        ],
      },
      {
        title: "Audit juridique et fiscal",
        items: [
          "Cadre conceptuel et spécifique de l’audit",
          "Documentation des missions d’audit",
          "Déroulement d’une mission d’audit",
          "Ethiques et déontologie de l’auditeur",
          "Appréciation du contrôle interne et mise en place de procédures",
          "Pratique de l’audit juridique et fiscal",
        ],
      },
      {
        title: "Stratégie fiscale",
        items: [
          "Techniques fiscales",
          "Conventions fiscales internationales",
          "Contrôle et contentieux fiscaux",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Ethique des affaires",
          "Analyse économique",
          "Management et organisation des entreprises",
          "Stratégie d’entreprise",
          "Gestion de projet",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 18. MASTER GÉNIE LOGICIEL (Master GELO.pdf)
  // =========================================================================
  "master-genie-logiciel": {
    mention: "GENIE LOGICIEL - GELO",
    specialty: "GÉNIE LOGICIEL - GELO",
    description:
      "Les technologies de l’information et de la communication sont devenues incontournables pour tout secteur confondu. Ainsi, pour être compétitive, l’entreprise doit se doter de systèmes informatiques performants afin d’optimiser ses processus, de mieux communiquer et d’améliorer sa productivité.\nLa spécialité GELO a pour but la maîtrise des outils et des méthodes logicielles destinés à des systèmes complexes : modélisation des connaissances, architectures Web, architectures parallèles, systèmes cyber-physiques et temps réel, systèmes multi-agents, systèmes d’information, Big Data, méthodes de conception et analyse.\nLe programme de Master en Génie Logiciel permet de former des professionnels pouvant accompagner l’entreprise dans sa transformation numérique.\n\nIls seront à même :\n- d’avoir une vision globale des problématiques informatiques de l’entreprise et de proposer des solutions performantes ;\n- d’analyser et de concevoir des applications en utilisant des outils de génie logiciel ;\n- de développer des applications informatiques utilisant des technologies récentes ;\n- Mettre en place des systèmes d’information ;\n- etc.",
    career_opportunities_list: [
      "Analyste programmeur",
      "Développeur informatique",
      "Architecte logiciel",
      "Ingénieur d’études et développement",
      "Architecte et urbaniste de système d’Information",
      "Chef de projet…",
      "Concepteur/administrateur des bases de données",
      "Intégrateur de progiciel de gestion en client / serveur",
      "Ingénieur logiciel",
      "Testeur et intégrateur d’application",
      "Consultant",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le master Génie Logiciel est accessible aux professionnels du domaine de l’informatique et aux étudiants ayant obtenus une Licence en Informatique, en MIAGE, en Mathématique, en Physique ou tout autre diplôme admis en équivalence.",
      "Les candidats au Master GELO doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie logicielle",
        items: [
          "Algorithmique, approche orientée objet avancées",
          "Cloud computing",
          "Qualité logicielle : outils et méthodes",
          "UML 2 avancé et design patterns",
          "Intelligence artificielle",
          "Méthodologies agiles",
        ],
      },
      {
        title: "Développement d’applications",
        items: [
          "DBA oracle",
          "Technologies JEE 1",
          "Technologie ASP.NET",
          "DBA SQL server",
          "Technologie XML/JSON",
          "Développement d’applications mobiles",
          "Programmation JEE 2",
          "Programmation PYTHON/JANGO",
          "Développement d’applications distribuées",
        ],
      },
      {
        title: "Business intelligence",
        items: [
          "Data warehouse",
          "Reporting",
          "Data mining",
        ],
      },
      {
        title: "Traitement de données massives",
        items: [
          "Introduction au Big Data",
          "Traitement Big Data",
        ],
      },
      {
        title: "Système et sécurité",
        items: [
          "Cryptographie et politique de sécurité",
          "Ethical hacking",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projets techniques",
          "Projet de création d'entreprise",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management et organisation des entreprises",
          "Droit des TIC",
          "Conduite de projets des SI",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 19. MASTER SYSTÈME, RÉSEAU ET TÉLÉCOMMUNICATION (Master SRT.pdf)
  // =========================================================================
  "master-systeme-reseau-et-telecommunication": {
    mention: "SYSTÈME, RESEAU ET TELECOMMUNICATIONS - SRT",
    specialty: "SYSTÈME, RÉSEAU ET TÉLÉCOMMUNICATIONS - SRT",
    description:
      "Les technologies de l’information et de la communication sont devenues incontournables pour tout secteur confondu. Ainsi, pour être compétitive, l’entreprise doit se doter de systèmes informatiques performants afin d’optimiser ses processus, de mieux communiquer et d’améliorer sa productivité.\nLa spécialité SRT a pour ambition de former des spécialistes en Système, Réseau et Télécommunications, capables non seulement de maîtriser les systèmes de communication d’aujourd’hui, mais également de concevoir et développer les systèmes de demain.\n\nElle s’adresse aux étudiants souhaitant approfondir les méthodes de conception et de réalisation d'architectures systèmes, réseaux et télécom dans l'entreprise, et sur les aspects de la sécurité et de l'optimisation de ces architectures.",
    career_opportunities_list: [
      "Gestionnaire de système informatique et réseaux",
      "Administrateur réseau et système",
      "Administrateur de bases de données",
      "Responsable maintenance logiciel et matériel pour les réseaux",
      "Gestionnaire de parc informatique",
      "Ingénieur systèmes",
      "Ingénieur réseaux et télécoms",
      "Ingénieur sécurité",
      "Consultant en réseaux et sécurité",
      "Responsable informatique",
      "RSSI (Responsable Sécurité du Système d’Information)",
      "Chef de projet",
      "Etc.",
    ],
    admission_conditions_list: [
      "Le Master Système, Réseau et Télécommunication est accessible aux professionnels du domaine de l’informatique et aux étudiants ayant obtenus une Licence en Informatique, en MIAGE, en Mathématique, en Physique ou tout autre diplôme admis en équivalence.",
      "Les candidats au Master SRT doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Fondamentaux informatiques",
        items: [
          "Algorithmique, approche orientée objet avancées",
          "Conduite de projet des SI",
          "Technologies JEE 1",
          "Cloud computing",
        ],
      },
      {
        title: "Réseau et Télécommunication",
        items: [
          "CCNA 3",
          "CCNA 4",
          "Base de la transmission numérique",
          "Traitement numérique du signal",
          "Next generation network",
          "Architecture des réseaux fixes et mobiles",
          "CISCO communication unifiée",
          "Réseaux haut débit et qualité de service (QOS)",
          "Dimensionnement et planification des réseaux mobiles",
          "Téléphonie IP niveau 2",
          "Audit des systèmes et réseaux",
          "Ingénierie avancée des réseaux",
          "Internet des objets (IdO)",
          "Modélisation et optimisation du trafic Internet",
        ],
      },
      {
        title: "Système et sécurité",
        items: [
          "Linux administration réseau avancée",
          "Administration avancée windows server",
          "Développement d’applications mobiles",
          "Linux administration système avancée",
          "CCNA security",
          "Cryptographie et politique de sécurité",
          "Ethical hacking",
          "Data warehouse",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Art oratoire",
          "Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Projets techniques",
          "Projet de création d'entreprise",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management et organisation des entreprises",
          "Droit des TIC",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 20. MASTER INGÉNIERIE DU WEB ET E-COMMUNICATION
  // =========================================================================
  "master-ingenierie-du-web-et-e-communication": {
    mention: "INGÉNIERIE DU WEB ET E-COMMUNICATION - DEVWEB",
    specialty: "INGÉNIERIE DU WEB ET E-COMMUNICATION (DEVWEB)",
    description:
      "Le Master en Ingénierie du Web et E-communication forme des architectes web, directeurs de projets digitaux et experts en communication numérique capables de concevoir des plateformes web et mobiles complexes tout en pilotant les stratégies d'acquisition, d'e-commerce et de transformation digitale des organisations.",
    career_opportunities_list: [
      "Architecte et Développeur Full-Stack Web & Mobile",
      "Directeur de projet digital / Product Owner",
      "Consultant en E-Communication et Web Marketing",
      "Responsable E-commerce et Transformation Digitale",
      "Directeur d'agence Web et Web Média",
      "Expert SEO / SEA et Web Data Analytics",
    ],
    admission_conditions_list: [
      "Accessible aux titulaires d'une Licence en Informatique, Développement Web, Multimédia, Marketing Digital ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie Web & Mobile Avancée",
        items: [
          "Architectures Web modernes (Front-End & Back-End)",
          "Frameworks JavaScript & PHP (Symfony, React, Node.js)",
          "Développement d'applications mobiles multiplateformes",
          "Bases de données relationnelles et NoSQL",
          "Sécurité des applications web et Cloud Computing",
        ],
      },
      {
        title: "E-Communication & Stratégie Digitale",
        items: [
          "Marketing digital et E-business",
          "E-commerce et E-logistique",
          "Conception de plateformes marchandes et UX/UI Design",
          "Production de contenu multimédia et Brand Content",
          "Community management et E-réputation",
          "Search Engine Marketing (SEO, SEA, SMO) & Web Data Analytics",
        ],
      },
      {
        title: "Management de projet & Professionnalisation",
        items: [
          "Gestion de projet Agile / Scrum & Conduite de projets SI",
          "Droit des TIC et de la propriété intellectuelle",
          "Anglais professionnel, Leadership & Entrepreneuriat digital",
          "Projets techniques, Stage en entreprise & Mémoire de fin d'études",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 21. MASTER INTELLIGENCE ARTIFICIELLE (MASTER INTELLIGENCE ARTIFICIELLE.pdf)
  // =========================================================================
  "master-intelligence-artificielle": {
    mention: "INTELLIGENCE ARTIFICIELLE",
    description:
      "Notre MASTER en Intelligence Artificielle vise à former des experts capables de concevoir, développer et déployer des systèmes intelligents répondant aux enjeux complexes des organisations modernes.\nLes auditeurs acquerront une maîtrise approfondie des algorithmes d’apprentissage automatique, du traitement des données massives, des modèles de deep learning et des systèmes intelligents. Ils seront dotés des compétences nécessaires pour analyser des problématiques complexes, concevoir des solutions innovantes basées sur l’IA et piloter des projets technologiques à forte valeur ajoutée.",
    career_opportunities_list: [
      "Data Analyst",
      "Data Scientist",
      "Data Ingénieur",
      "Chief data Officer",
      "Data Protection Officer",
      "Architecte Big Data",
      "Consultant Big Data / IA",
      "Entrepreneur IA",
    ],
    admission_conditions_list: [
      "Le MASTER en Intelligence Artificielle est ouvert aux titulaires d’une Licence en : Informatique, Mathématiques, Statistiques, Data Science, Télécommunications, ou tout autre diplôme admis en équivalence",
      "Les candidats doivent soumettre un dossier de candidature et peuvent être convoqués à un test technique et/ou un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "FONDAMENTAUX AVANCES EN IA",
        items: [
          "Mathématiques pour l’IA (algèbre linéaire avancée, optimisation)",
          "Probabilités et statistiques avancées",
          "Recherche opérationnelle",
          "Théorie de l’information",
        ],
      },
      {
        title: "MACHINE LEARNING ET DEEP LEARNING",
        items: [
          "Apprentissage supervisé et non supervisé",
          "Réseaux de neurones artificiels",
          "Deep Learning (CNN, RNN, Transformers)",
          "Apprentissage par renforcement",
          "Évaluation et optimisation des modèles",
        ],
      },
      {
        title: "BIG DATA ET DATA ENGINEERING",
        items: [
          "Architectures Big Data",
          "Traitement distribué (Hadoop, Spark)",
          "Data pipelines et ETL",
          "Cloud computing (AWS, Azure, GCP)",
          "Stockage et gestion de données massives",
        ],
      },
      {
        title: "TRAITEMENT AVANCE DES DONNEES",
        items: [
          "Analyse exploratoire avancée",
          "Feature engineering",
          "Visualisation avancée des données",
          "Data storytelling",
          "Outils BI et dashboards",
        ],
      },
      {
        title: "INTELLIGENCE ARTIFICIELLE APPLIQUEE",
        items: [
          "Traitement du langage naturel (NLP)",
          "Vision par ordinateur",
          "Systèmes de recommandation",
          "IA pour la finance digitale",
          "IA pour la santé et l’industrie",
        ],
      },
      {
        title: "DEVELOPPEMENT ET DEPLOIEMENT DES SOLUTIONS IA",
        items: [
          "Programmation avancée en Python",
          "Frameworks IA (TensorFlow, PyTorch, Scikit-learn)",
          "MLOps et industrialisation des modèles",
          "APIs et microservices",
          "Déploiement cloud et monitoring",
        ],
      },
      {
        title: "SECURITE, ETHIQUE ET GOUVERNANCE",
        items: [
          "Sécurité des systèmes intelligents",
          "Protection des données personnelles",
          "Éthique de l’IA",
          "Réglementation et conformité",
          "Gouvernance des données",
        ],
      },
      {
        title: "MANAGEMENT ET COMPETENCES TRANSVERSALES",
        items: [
          "Gestion de projet agile",
          "Innovation et transformation digitale",
          "Entrepreneuriat technologique",
          "Leadership et travail en équipe",
          "Communication professionnelle et scientifique",
          "Anglais technique",
        ],
      },
      {
        title: "PRATIQUE METIERS",
        items: [
          "Projets tutorés",
          "Études de cas réels",
          "Hackathon IA / Data",
          "Stage en entreprise",
          "Mémoire de fin d’études",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 22. MASTER FINANCE DIGITALE (MASTER FINANCE DIGITALE .pdf)
  // =========================================================================
  "master-finance-digitale": {
    mention: "FINANCE DIGITALE",
    description:
      "Notre MASTER en Finance Digitale vise à former des professionnels capables de maîtriser les transformations technologiques du secteur financier et de piloter des projets innovants intégrant les outils numériques.\nLes auditeurs acquerront une compréhension approfondie des mécanismes financiers, des technologies digitales (fintech, blockchain, IA), des systèmes de paiement électronique et de l’analyse de données financières. Ils seront dotés des compétences nécessaires pour concevoir, analyser et sécuriser des solutions financières digitales adaptées aux nouveaux besoins des marchés.",
    career_opportunities_list: [
      "Analyste en finance digitale",
      "Consultant en transformation digitale des services financiers",
      "Spécialiste FinTech",
      "Analyste en paiement électronique et mobile money",
      "Responsable innovation financière",
      "Data Analyst en finance",
      "Gestionnaire de projets FinTech",
      "Responsable conformité et gestion des risques numériques",
      "Entrepreneur dans le domaine de la FinTech",
    ],
    admission_conditions_list: [
      "Être titulaire d’une Licence en finance, économie, gestion, informatique, mathématiques appliquées ou tout diplôme équivalent.",
      "Avoir des connaissances de base en finance et en outils numériques.",
      "Avoir un intérêt pour les technologies financières et la transformation digitale du secteur financier.",
      "Les candidats doivent également soumettre un dossier de candidature et passer un entretien avec un responsable pédagogique afin d’évaluer leur motivation et leur projet professionnel.",
    ],
    program_blocks: [
      {
        title: "FONDAMENTAUX DE LA FINANCE",
        items: [
          "Finance d’entreprise",
          "Marchés financiers",
          "Mathématiques financières",
          "Analyse financière",
          "Gestion des risques",
        ],
      },
      {
        title: "ENVIRONNEMENT DIGITAL ET FINTECH",
        items: [
          "Introduction à la fintech",
          "Transformation digitale des institutions financières",
          "Écosystème des startups fintech",
          "Innovation financière",
          "Open banking et API financières",
        ],
      },
      {
        title: "SYSTEMES DE PAIEMENT ET MONETIQUE",
        items: [
          "Monétique et moyens de paiement",
          "Mobile money et finance inclusive",
          "Paiements électroniques et digitaux",
          "Sécurité des transactions",
          "Normes et régulation (PCI-DSS, etc.)",
        ],
      },
      {
        title: "DATA ET ANALYSE FINANCIERE",
        items: [
          "Data science appliquée à la finance",
          "Analyse des données financières",
          "Visualisation des données",
          "Outils BI et reporting",
          "Introduction au Machine Learning pour la finance",
        ],
      },
      {
        title: "TECHNOLOGIES EMERGENTES",
        items: [
          "Blockchain et cryptomonnaies",
          "Smart contracts",
          "Intelligence artificielle en finance",
          "Automatisation des processus (RPA)",
          "Cloud computing",
        ],
      },
      {
        title: "GESTION DES RISQUES ET SECURITE",
        items: [
          "Gestion des risques financiers",
          "Lutte contre la fraude",
          "Cybersécurité financière",
          "Conformité réglementaire (KYC, AML)",
          "Protection des données",
        ],
      },
      {
        title: "MANAGEMENT ET STRATEGIE",
        items: [
          "Gestion de projet (Agile, Scrum)",
          "Stratégie digitale",
          "Marketing des services financiers digitaux",
          "Leadership et innovation",
          "Entrepreneuriat fintech",
        ],
      },
      {
        title: "OUTILS TRANSVERSAUX",
        items: [
          "Programmation Python pour la finance",
          "Gestion des bases de données",
          "No-code et digitalisation",
          "Anglais des affaires",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "PRATIQUE METIERS",
        items: [
          "Études de cas réels",
          "Projets tutorés",
          "Hackathon fintech",
          "Stage en entreprise",
          "Mémoire de fin d’études",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 23. MASTER LANGUES ÉTRANGÈRES APPLIQUÉES À LA GESTION DES ENTREPRISES (LEAGE)
  // =========================================================================
  "master-langues-etrangeres-appliquees-a-la-gestion-des-entreprises": {
    mention: "LANGUES ÉTRANGÈRES APPLIQUÉES À LA GESTION DES ENTREPRISES – LEAGE",
    description:
      "Le Master Langues Étrangères Appliquées à la Gestion des Entreprises (LEAGE) forme des cadres polyglottes capables de piloter des opérations commerciales, administratives et managériales dans un environnement multiculturel et international. Il combine la maîtrise approfondie des langues d'affaires (Français, Anglais et langues internationales) avec le management stratégique, le commerce international et la communication d'entreprise.",
    career_opportunities_list: [
      "Responsable export / Responsable commercial international",
      "Cadre bilingue / trilingue en entreprise ou organisation internationale",
      "Chargé de communication internationale et relations publiques",
      "Responsable administratif et commercial bilingue",
      "Consultant en management interculturel",
      "Chargé de mission aux affaires étrangères et diplomatiques",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d'une Licence LEAGE, Langues Étrangères Appliquées, Lettres, Commerce International, Gestion ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Langues appliquées aux affaires et à la diplomatie",
        items: [
          "Anglais économique, financier et commercial approfondi",
          "Français administratif, juridique et diplomatique",
          "Traduction spécialisée et rédaction professionnelle bilingue",
          "Négociation commerciale internationale multilingue",
        ],
      },
      {
        title: "Management international et Commerce transfrontalier",
        items: [
          "Management interculturel et gouvernance des organisations",
          "Commerce international, transport et logistique",
          "Marketing international et communication digitale",
          "Droit des affaires et institutions internationales",
        ],
      },
      {
        title: "Outils de gestion & Professionnalisation",
        items: [
          "Comptabilité de gestion et analyse financière",
          "Conduite et gestion de projets internationaux",
          "Méthodologie de recherche, Entrepreneuriat & Leadership",
          "Stage professionnel et Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },
};
