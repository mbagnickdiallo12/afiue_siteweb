import {
  ProgramBlock,
  TuitionTier,
  InternationalLeaderInfo,
} from "@/types/database";

export interface DetailedFormationContent {
  mention: string;
  specialty?: string;
  description: string;
  objectives?: string;
  career_opportunities_list: string[];
  admission_conditions_list: string[];
  program_blocks: ProgramBlock[];
  international_leader?: boolean;
  anaq_sup?: boolean;
  cames?: boolean;
}

export const DEFAULT_INTERNATIONAL_LEADER_INFO: InternationalLeaderInfo = {
  available: true,
  description:
    "International Leader est un programme ambitieux qui a pour objectif de former de nouvelles générations de dirigeants et entrepreneurs ouverts sur l’international, conscients des enjeux socio-économiques et aptes à construire un monde dynamique et durable. En plus de la double diplomation : un diplôme signé par le Ministère sénégalais en charge de l’enseignement supérieur et un diplôme européen de la Fédération Européenne Des Ecoles – FEDE, le programme International Leader propose plusieurs activités qui vont permettre aux étudiants de développer leur leadership, leur créativité, leur confiance en eux pour avoir l’audace d’affronter le monde :",
  activities: [
    "Institutions et relations internationales",
    "Préparation à la certification anglaise TOEIC",
    "Coaching en leadership et développement personnel",
    "Rencontre avec des personnalités du monde politique et socio – économique",
    "Team building",
    "Atelier de prise de parole en public",
    "Atelier du savoir – vivre",
    "Sport",
  ],
};

export const LICENCE_TUITION_TIERS: TuitionTier[] = [
  {
    label: "Formation Initiale – Multiprogramme (Licence 1)",
    registration_fee: "170 000 FCFA",
    monthly_fee: "75 000 FCFA / mois",
    duration_months: "10 mois (Octobre – Juillet)",
    schedule: "Cours du jour",
  },
  {
    label: "Formation Initiale – Multiprogramme (Licence 2)",
    registration_fee: "170 000 FCFA",
    monthly_fee: "80 000 FCFA / mois",
    duration_months: "10 mois (Octobre – Juillet)",
    schedule: "Cours du jour",
  },
  {
    label: "Formation Initiale – Multiprogramme (Licence 3)",
    registration_fee: "170 000 FCFA",
    monthly_fee: "85 000 FCFA / mois",
    duration_months: "10 mois (Octobre – Juillet)",
    schedule: "Cours du jour",
  },
  {
    label: "Parcours International Leader (Licence 1, 2 & 3)",
    registration_fee: "170 000 FCFA",
    monthly_fee: "95 000 FCFA / mois",
    duration_months: "10 mois (Octobre – Juillet)",
    schedule: "Double diplomation AFI-L'UE + DEES FEDE + TOEIC",
  },
  {
    label: "Formation Continue – Cours du Soir (Licence 1, 2 & 3)",
    registration_fee: "170 000 FCFA",
    monthly_fee: "70 000 FCFA / mois",
    duration_months: "10 mois (Novembre – Août)",
    schedule: "17h30 – 20h45",
  },
  {
    label: "Formation Continue – Cours du Week-end (Licence 3)",
    registration_fee: "170 000 FCFA",
    monthly_fee: "80 000 FCFA / mois",
    duration_months: "09 mois (Janvier – Septembre)",
    schedule: "Samedi & Dimanche (09h00 – 17h00)",
  },
  {
    label: "Formation E-Learning 100% en ligne (Licence 3)",
    registration_fee: "200 000 FCFA",
    monthly_fee: "90 000 FCFA / mois",
    duration_months: "09 mois (Janvier – Septembre)",
    schedule: "18h00 – 20h00",
  },
];

export const LICENCE_EXTRA_FEES: string[] = [
  "Uniforme L1 et L2 : 50 000 FCFA",
  "Bootcamp d'intégration L1 : 40 000 FCFA",
  "Bibliothèque numérique (annuelle) : 10 000 FCFA",
  "Frais de mémoire L3 : 70 000 FCFA",
  "Graduation L3 : 70 000 FCFA",
];

export const LICENCES_DETAILED_CONTENT: Record<string, DetailedFormationContent> = {
  // =========================================================================
  // 1. LICENCE BANQUE ASSURANCE FINANCE (Licence BAF .pdf)
  // =========================================================================
  "licence-banque-assurance-finance": {
    mention: "BANQUE ASSURANCE FINANCE – BAF",
    description:
      "Le programme de la Licence Banque Assurance Finance - BAF permet, en trois années académiques, de préparer les apprenants à la maîtrise des techniques, méthodes et outils de la Banque, de l’Assurance, de la Finance et à l’acquisition d’un savoir-faire et d’un savoir être qu’ils pourront mettre au service des organisations.\n\nEn outre, ce programme permet l’acquisition d’une bonne base en comptabilité et en fiscalité, assurant ainsi aux apprenants une polyvalence dans le domaine de la gestion.",
    career_opportunities_list: [
      "Chargé de clientèle particuliers/entreprises",
      "Gestionnaire de caisse dans une banque",
      "Responsable / Animateur service commercial",
      "Technicien des opérations bancaires",
      "Conseiller banque à distance",
      "Rédacteur de contrat d’assurance",
      "Rédacteur de sinistre",
      "Responsable d’agence",
      "Courtier d’assurance",
      "Conseiller en patrimoine",
      "Analyste financier",
      "Comptable bancaire",
      "Responsable/ Assistant administratif et financier",
      "Responsable/ Assistant comptable",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Produits et services de la banque et des assurances",
        items: [
          "Techniques bancaires",
          "Techniques d’assurances",
          "Management des assurances",
          "Conseil en patrimoine",
          "Chargé de clientèle des particuliers et des entreprises",
          "Pratique de la fidélisation (CRM)",
          "Marketing des services",
          "Techniques de vente et de négociation",
          "Marketing Digital",
          "Internet and Mobile Banking",
        ],
      },
      {
        title: "Finance",
        items: [
          "Mathématiques financières",
          "Analyse financière",
          "Politique d’investissement et de financement",
          "Gestion de la trésorerie",
          "Introduction aux marchés financiers",
        ],
      },
      {
        title: "Bases juridiques",
        items: [
          "Droit bancaire",
          "Droit des assurances",
          "Droit du crédit",
          "Droit cambiaire",
        ],
      },
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Comptabilité des sociétés",
          "Comptabilité bancaire",
          "Gestion prévisionnelle et budgétaire",
          "Fiscalité",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management",
          "Economie",
          "Droit",
          "Mathématiques et Statistiques",
          "Marketing",
          "Gestion des Ressources Humaines",
          "Gestion de projet",
          "Entrepreneurship - Business plan",
          "Analyse et Traitement de données sur Sphinx",
          "Recherche Opérationnelle",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
          "Méthodologie de Recherche",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 2. LICENCE GESTION DES RESSOURCES HUMAINES (Licence GRH.pdf)
  // =========================================================================
  "licence-gestion-des-ressources-humaines": {
    mention: "GESTION DES RESSOURCES HUMAINES - GRH",
    description:
      "Le programme de Licence en Gestion des Ressources Humaines permet, en trois années académiques, d’acquérir des connaissances et compétences dans tout le processus de la gestion du personnel : du recrutement à l’administration du personnel, en passant par la rémunération et la formation.\n\nLe programme permet entre autres d’avoir de solides bases dans l’environnement juridique de l’entreprise mais aussi de maitriser toute la dimension Qualité, Hygiène, Sécurité et Environnement liée à la gestion des ressources humaines.",
    career_opportunities_list: [
      "Assistant / Responsable RH",
      "Gestionnaire de paie",
      "Chargé de formation",
      "Chargé de recrutement",
      "Chargé des relations sociales",
      "Responsable d’agence d’intérim",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ressources Humaines",
        items: [
          "Introduction à la RH",
          "Politique de recrutement",
          "Stratégie de rémunération",
          "Formation",
          "Administration du personnel",
          "Evaluation du personnel",
          "Communication",
          "Logiciel de gestion de la paie",
          "GPEC",
          "Audit social",
          "Ergonomie",
          "Système d'information RH",
          "Ethique et Gestion de la diversité",
        ],
      },
      {
        title: "Droit :",
        items: [
          "Introduction à l'étude du droit",
          "Théories et pratiques des institutions juridictionnelles",
          "Droit civil",
          "Droit constitutionnel",
          "Droit administratif",
          "Droit des biens",
          "Droit des obligations",
          "Droit commercial général",
          "Droit du travail",
          "Droit pénal général",
          "Droit des sociétés",
          "Droit pénal des affaires",
          "Procédure civile",
          "Fiscalité",
        ],
      },
      {
        title: "QHSE - RH",
        items: [
          "Accident de travail et maladies professionnelles",
          "Aspects juridiques de la santé sécurité au travail",
          "Risques microbiologique et biotechnologique",
          "Les systèmes de management de la sécurité",
          "Evaluation des risques professionnels",
          "Management du risque",
          "Développement durable et RSE",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Entrepreneurship - Business plan",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management",
          "Economie",
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Mathématiques et statistiques",
          "Marketing",
          "Gestion de projet",
          "Analyse et Traitement de données sur Sphinx",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Présentation projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 3. LICENCE GESTION FINANCIÈRE, FISCALE ET COMPTABLE DES ENTREPRISES (Licence GFCE.pdf)
  // =========================================================================
  "licence-gestion-financiere-fiscale-et-comptable-des-entreprises": {
    mention: "GESTION ET STRATEGIE D’ENTREPRISE",
    specialty: "GESTION FINANCIERE FISCALE ET COMPTABLE DES ENTREPRISES - GFCE",
    description:
      "Quel que soit le secteur d’activité, le programme de Gestion Financière, Fiscale et Comptable des Entreprises offre des perspectives de carrière stimulantes aux apprenants en les formant à la gestion et à la stratégie d’entreprise.\nLes apprenants du programme sont formés à avoir une capacité d’analyses et de décisions fondées sur des savoirs à la fois étendus et spécialisés en management, en comptabilité, en fiscalité, en finance, en communication d’entreprise, dans le champ des ressources humaines et sur le plan commercial. Ils seront à même de construire une organisation efficace, propice au développement et à la pérennité de l’entreprise.",
    career_opportunities_list: [
      "Gestionnaire de PME",
      "Responsable/ Assistant administratif et financier",
      "Responsable/ Assistant comptable",
      "Responsable du développement commercial",
      "Chef des ventes",
      "Responsable d'agence",
      "Responsable d’un centre de profits",
      "Analyste financier",
      "Chef de produit",
      "Etc",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable",
        items: [
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Comptabilité des sociétés",
          "Comptabilité bancaire",
          "Gestion prévisionnelle et budgétaire",
          "Techniques comptables approfondies",
          "Comptabilité comparée",
          "Contrôle de gestion",
          "Introduction à l’audit Comptable",
          "Logiciel de comptabilité financière",
        ],
      },
      {
        title: "Finance",
        items: [
          "Mathématiques financières",
          "Analyse financière",
          "Politique d’investissement de financement",
          "Gestion de la trésorerie",
          "Introduction aux marchés financiers",
        ],
      },
      {
        title: "Analyse du risque fiscal",
        items: [
          "Introduction à la fiscalité",
          "Fiscalité des revenus des personnes physiques",
          "Fiscalité des entreprises",
          "Fiscalité indirecte",
          "Politique fiscale de l'entreprise",
          "Fiscalité comparée",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management",
          "Economie",
          "Droit",
          "Gouvernement d’entreprise",
          "Stratégie d’entreprise",
          "Communication d’entreprise",
          "Mathématiques et statistiques",
          "Marketing",
          "Gestion des ressources humaines",
          "Gestion de projet",
          "Entrepreneurship - Business plan",
          "Logiciel de gestion commerciale",
          "Recherche opérationnelle",
          "Vie sociale de l’entreprise",
          "Gestion de la production",
          "Analyse et Traitement de données Statistiques avec Sphinx",
          "Développement Durable",
          "Logiciel de Gestion de la Paie",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 4. LICENCE GESTION FINANCIÈRE ET ADMINISTRATIVE DES ENTREPRISES (Licence GFAE.pdf)
  // =========================================================================
  "licence-gestion-financiere-et-administrative-des-entreprises": {
    mention: "GESTION ET STRATÉGIE D’ENTREPRISE",
    specialty: "GESTION FINANCIÈRE ET ADMINISTRATIVE DES ENTREPRISES - GFAE",
    description:
      "La Licence Gestion Financière et Administrative des Entreprises permet de former de futurs professionnels capables de maîtriser les techniques administratives, comptables et fiscales, mais aussi en ressources humaines et qui seront en charge de superviser aussi bien les services administratifs que les services financiers.\n\nAinsi, ils veillent à la bonne gestion administrative, financière et la bonne gestion générale de l’entreprise.",
    career_opportunities_list: [
      "Gestionnaire de PME",
      "Responsable/assistant administratif et financier",
      "Responsable/assistant comptable",
      "Responsable/assistant contrôleur de gestion",
      "Responsable/assistant ressources humaines",
      "Responsable du développement commercial",
      "Conseiller financier",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Comptabilité des sociétés",
          "Comptabilité bancaire",
          "Logiciel de comptabilité financière",
          "Gestion prévisionnelle et budgétaire",
          "Techniques comptables approfondies",
          "Comptabilité comparée",
          "Fiscalité",
        ],
      },
      {
        title: "Gestion des Ressources Humaines",
        items: [
          "Introduction à la RH",
          "Politique de recrutement",
          "Stratégie de rémunération",
          "Aspects juridiques de la santé sécurité au travail",
          "Formation",
          "Administration du personnel",
          "Accident de travail et maladies professionnelles",
          "Evaluation du personnel",
          "Ethique et gestion de la diversité",
          "GPEC",
          "Audit social",
          "Logiciel de gestion de la paie",
          "Ergonomie",
          "Système d'information RH",
        ],
      },
      {
        title: "Stratégie, audit et contrôle de gestion",
        items: [
          "Vie sociale de l’entreprise",
          "Gouvernement d’entreprise",
          "Stratégie d’entreprise",
          "Introduction à l’audit comptable",
          "Contrôle de gestion",
        ],
      },
      {
        title: "Finance",
        items: [
          "Mathématiques financières",
          "Analyse financière",
          "Politique d’investissement et de financement",
          "Gestion de la trésorerie",
          "Introduction aux marchés financiers",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management",
          "Economie",
          "Droit",
          "Gestion de la production",
          "Marketing",
          "Communication",
          "Mathématiques et statistiques",
          "Gestion de projet",
          "Entrepreneurship - Business plan",
          "Analyse et traitement de données statistiques sur Sphinx",
          "Recherche opérationnelle",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 5. LICENCE MARKETING MANAGEMENT ET COMMUNICATION DIGITALE (Licence MMC.pdf)
  // =========================================================================
  "licence-marketing-management-et-communication-digitale": {
    mention: "MARKETING MANAGEMENT COMMUNICATION - MMC",
    specialty: "MARKETING ET COMMUNICATION DIGITALE",
    description:
      "L’évolution de la technologie et l’émergence du consommateur 2.0 poussent les entreprises à revoir leur communication et toute leur stratégie marketing et commercial.\nLe E-commerce propose des opportunités intéressantes pour les entreprises, d’où la nécessité de développer de nouvelles compétences pour accompagner ces dernières.\nLe programme de Licence en Marketing Management et Communication permet de former des professionnels ayant une vision globale de l’entreprise, une bonne base technique et capables de mettre en place des stratégies pour gagner des parts de marché et contribuer à l’amélioration continue des produits et des services.\n\nCette formation assure une triple compétence en Marketing, Management et Communication ainsi qu’en Techniques Numériques ou Digitales permettant ainsi aux profils sortants une polyvalence et une grande capacité d’adaptation face à un marché en perpétuel mouvement.",
    career_opportunities_list: [
      "Responsable marketing et commercial",
      "Responsable marketing digital",
      "Responsable de communication",
      "Attaché de presse",
      "Chef de projet digital",
      "Webmarketer",
      "Responsable évènementiel",
      "Social Media Manager",
      "Chef de produit(s) junior",
      "Chargé de relations publiques",
      "Chef de publicité/ Chef de projet junior",
      "Business Developer",
      "Responsable développement produit",
      "Chef de projet en marketing",
      "Chargé de clientèle",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Marketing Management :",
        items: [
          "Principes de management",
          "Théorie des organisations",
          "Approche théorique du marketing",
          "Comportement du consommateur",
          "Etudes et analyse de marché",
          "Techniques de vente et de négociation",
          "Marketing stratégique",
          "Marketing opérationnel",
          "Pratiques de la fidélisation (CRM)",
          "Marketing international",
          "Marketing industriel B to B",
          "Marketing des services",
          "Logiciel de gestion commerciale",
        ],
      },
      {
        title: "Communication :",
        items: [
          "Fondements de la communication",
          "Les principes de communication non commerciale des entreprises",
          "Communication et action publicitaire",
          "Stratégie des marques",
          "Communication presse et media",
          "Communication et approche commerciale de l'entreprise",
          "Communication sociale",
        ],
      },
      {
        title: "Techniques numériques - Digital :",
        items: [
          "Infographie",
          "Création de site web",
          "Multimedia",
          "Marketing digital",
          "Communication digitale",
          "E-commerce et E-logistique",
          "Community management",
          "Référencement web",
        ],
      },
      {
        title: "Logistic & international business :",
        items: [
          "Les techniques du commerce international : les incoterms 2020",
          "Banking",
          "Achats-approvisionnement",
          "Distribution",
          "Gestion des stocks",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Entrepreneurship - Business plan",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Outils de management :",
        items: [
          "Economie",
          "Droit",
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Mathématiques et statistiques",
          "Gestion des ressources humaines",
          "Gestion de projet",
          "Analyse et Traitement de données sur Sphinx",
        ],
      },
      {
        title: "Professionnalisation :",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 6. LICENCE MANAGEMENT DES AFFAIRES INTERNATIONALES (Licence MAI.pdf)
  // =========================================================================
  "licence-management-des-affaires-internationales": {
    mention: "MANAGEMENT DES AFFAIRES INTERNATIONALES - MAI",
    description:
      "Face à la mondialisation, à une part croissante des pays émergents dans le commerce international et à la concurrence au niveau international, les entreprises doivent savoir s’adapter à des environnements et aux exigences des consommateurs en redéfinissant leurs approches marketing et commerciale.\n\nDès lors, le programme de Licence en Management des affaires internationales permet, en trois années académiques, de former des professionnels capables de piloter des projets à l’échelle de la planète, d’anticiper les tendances et de contribuer efficacement à l’internationalisation des activités de l’entreprise.\nEn d’autres termes, le programme est conçu pour former des professionnels du marketing avec une vision à l’internationale et ayant une parfaite maitrise de l’anglais.",
    career_opportunities_list: [
      "Responsable du développement commercial international",
      "International Business Developer",
      "Chef de projet international",
      "Responsable marketing international",
      "Chef des ventes export",
      "Acheteur international",
      "Responsable commercial international",
      "Chef de produit international",
      "Chef de Marché Junior",
      "Assistant Responsable Import / Export",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Affaires Internationales :",
        items: [
          "Environnement des marchés internationaux",
          "Les techniques du commerce international : les incoterms 2020",
          "Techniques de financement des affaires internationales",
          "Relations internationales",
          "Négociation internationale",
          "Droit du commerce international",
          "Développement à l'international",
          "Financement des investissements à l'étranger",
          "Assurance-crédit et transport",
          "Banking",
        ],
      },
      {
        title: "Transport & Logistique :",
        items: [
          "Les transports: concept et économie",
          "Les différents modes et techniques de transport",
          "Emballage, palettisation, conteneurisation",
          "Gestion des stocks",
          "Achats-approvisionnement",
          "Distribution",
          "Droit des Transports",
          "E-commerce et E-logistique",
          "Facturation des opérations logistique et transport",
        ],
      },
      {
        title: "Douane :",
        items: [
          "Techniques douanières : les procédures",
          "Techniques douanières : les régimes",
          "Techniques douanières : la technologie tarifaire",
          "Les contentieux douaniers",
          "Droit douanier",
        ],
      },
      {
        title: "Marketing :",
        items: [
          "Approche théorique du marketing",
          "Etudes de marché",
          "Techniques de vente et de négociation",
          "Marketing stratégique",
          "Marketing opérationnel",
          "Marketing international",
          "Marketing industriel B to B",
          "Marketing des services",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Espagnol",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Outils de management :",
        items: [
          "Economie",
          "Droit",
          "Management",
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Mathématiques et statistiques",
          "Mathématiques financières",
          "Analyse financière",
          "Gestion des ressources humaines",
          "Gestion de projet",
          "Analyse et Traitement de données sur Sphinx",
          "Entrepreneurship - Business Plan",
        ],
      },
      {
        title: "Professionnalisation :",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Visites d’entreprise",
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 7. LICENCE TRANSPORT ET LOGISTIQUE (Licence GL.pdf)
  // =========================================================================
  "licence-transport-et-logistique": {
    mention: "GENIE LOGISTIQUE - GL",
    description:
      "La mondialisation et l'intensification de la concurrence exige une parfaite maîtrise de la chaîne logistique qui constitue un axe stratégique essentiel pour l’entreprise. Cette dernière est ainsi passée d'une logistique opérationnelle au concept de logistique globale, qui renvoie aussi bien aux opérations classiques (approvisionnements, stockage, transport…) qu'à la maîtrise des flux financiers et les flux d'informations devenus stratégiques pour leur bon fonctionnement.\n\nLe programme de licence en Génie Logistique prépare les apprenants à devenir des professionnels des transports et de la logistique, capables d’optimiser l’ensemble des ressources, moyens, méthodes et outils dans le but de piloter efficacement le processus des flux circulants au sein de l'organisation. Il s'agit précisément de pouvoir coordonner la gestion des flux d'un réseau en termes de coûts, délais et qualité depuis l'approvisionnement des fournisseurs jusqu'à la distribution aux clients.",
    career_opportunities_list: [
      "Responsable des opérations logistiques et transports",
      "Coordinateur de parc containers",
      "Responsable logistique",
      "Gestionnaire de flotte terre/ mer/ air",
      "Collaborateur commissionnaire/transitaire",
      "Responsable d’affrètement",
      "Acheteur",
      "Approvisionneur",
      "Gestionnaire des stocks",
      "Chargé d'ordonnancement et de planification des transports",
      "Responsable d'expédition",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Transport & Logistique",
        items: [
          "Les transports: concept et offre",
          "Les différents modes et techniques de transport",
          "Les moyens et les flux",
          "Recherche opérationnelle",
          "Droit des transports",
          "Emballage, palettisation, conteneurisation",
          "Gestion de parc ou flotte",
          "Mobilité urbaine",
          "Normalisation et QHSE",
          "E-commerce et E-logistique",
          "Facturation des opérations logistique et transport",
          "Anglais des transports et de la logistique",
        ],
      },
      {
        title: "Supply Chain Management",
        items: [
          "Achats-approvisionnement",
          "Gestion des stocks",
          "Gestion de la production",
          "Lean Value Stream Mapping",
          "Distribution",
          "Concepts SCM et Base de l’Audit Logistique",
          "SCM : système d’information logistique",
          "SCM : les bases du diagnostic et de l’audit logistique",
        ],
      },
      {
        title: "Affaires Internationales :",
        items: [
          "Les techniques du commerce international : les incoterms 2020",
          "Techniques de financement des affaires internationales",
          "Assurance-crédit et transport",
          "Banking",
        ],
      },
      {
        title: "Douane",
        items: [
          "Techniques douanières : les procédures",
          "Techniques douanières : les régimes",
          "Techniques douanières : la technologie tarifaire",
          "Les contentieux douaniers",
          "Droit douanier",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Entrepreneurship - Business plan",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Economie",
          "Droit",
          "Management",
          "Comptabilité",
          "Analyse et Traitement de données sur Sphinx",
          "Marketing",
          "Mathématiques et statistiques",
          "Gestion des ressources humaines",
          "Gestion de projet",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Visites d’entreprise",
          "Projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 8. LICENCE QUALITÉ HYGIÈNE SÉCURITÉ ET ENVIRONNEMENT (Licence QHSE.pdf)
  // =========================================================================
  "licence-qualite-hygiene-securite-et-environnement": {
    mention: "QUALITE HYGIENE SECURITE ENVIRONNEMENT - QHSE",
    description:
      "Face à la mondialisation des échanges, à l’évolution technologique et à l’exacerbation de la concurrence, l’entreprise doit être capable de se positionner au niveau national, régional et international afin de conquérir des parts de marché pour assurer son évolution.\nEn outre, les actions suivantes sont les objectifs de toute entreprise soucieuse de contribuer au développement durable :\n• fournir des produits et services conformes aux exigences des clients,\n• accroître la satisfaction des clients (Qualité),\n• améliorer la santé et la sécurité des travailleurs et des entreprises extérieures (Hygiène-Sécurité),\n• éliminer les dangers et réduire les risques (Hygiène-Sécurité),\n• protéger l’environnement des impacts des activités (Environnement),\n• prévenir toute pollution (Environnement).\n\nPour affronter ces enjeux, le programme de licence en QHSE permet de former de futurs professionnels capables de mettre en place une démarche pour permettre à l’entreprise d’assurer une satisfaction de sa clientèle, un développement de ses ressources humaines et une performance environnementale aboutissant à une compétitivité.",
    career_opportunities_list: [
      "Chargé(e) de projet RSE",
      "Chef de projet environnement et développement durable",
      "Responsable assurance qualité",
      "Responsable prévention des risques professionnels",
      "Responsable sécurité et environnement",
      "Responsable du service hygiène-sécurité",
      "Responsable environnement",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Management de la QHSE",
        items: [
          "Introduction à la qualité",
          "Concepts et enjeux HSE",
          "Codex alimentarius",
          "Outils de diagnostic qualité",
          "Outils de maitrise de la conception et de la production",
          "Les méthodes d’analyse et de résolution de problèmes",
          "Gestion du système documentaire",
          "Approche processus",
          "Les systèmes de management de la qualité",
          "Le référentiel QHSE",
          "Gestion de la production",
          "Lean Value Stream Mapping",
          "Système de management intégré",
          "Introduction à l’audit QHSE",
        ],
      },
      {
        title: "Hygiène et santé sécurité au travail",
        items: [
          "Aspects juridiques de l’environnement",
          "Aspects juridiques de la santé sécurité au travail",
          "Accident de travail et maladies professionnelles",
          "Risques microbiologique et biotechnologique",
          "Les systèmes de management de la sécurité",
          "La démarche HACCP",
          "Evaluation des risques professionnels",
          "Management du risque",
        ],
      },
      {
        title: "Management de l’environnement",
        items: [
          "Les systèmes de management de l’environnement",
          "Les ICPE et établissements classés SEVESO",
          "La gestion des déchets",
          "Etude d’impact environnemental",
          "Développement durable et RSE",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Méthodologie de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management",
          "Economie",
          "Droit",
          "Comptabilité",
          "Mathématiques et statistiques",
          "Marketing",
          "Communication d’entreprise",
          "Gestion des ressources humaines",
          "Gestion de projet",
          "Entrepreneurship - Business plan",
          "Analyse et Traitement de données sur Sphinx",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Visites d’entreprise",
          "Bureaux d’adaptation au monde de l’entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 9. LICENCE LANGUES ÉTRANGÈRES APPLIQUÉES À LA GESTION DES ENTREPRISES (Licence LEAGE.pdf)
  // =========================================================================
  "licence-langues-etrangeres-appliquees-a-la-gestion-des-entreprises": {
    mention: "LANGUES ETRANGERES APPLIQUEES A LA GESTION DES ENTREPRISES – LEAGE",
    description:
      "Le programme de la Licence Langues Etrangères Appliquées à la Gestion des Entreprises - LEAGE permet, en trois années académiques de former des agents bilingues/trilingues capables d’exécuter des tâches managériales et commerciales dans divers secteurs d’activité.\n\nLes apprenants du programme sont formés à avoir une capacité à appliquer les principales méthodes de gestion et de communication dans l’exécution des tâches commerciales et administratives, à utiliser les outils informatiques d’aide à la gestion et à la communication commerciale et à mettre en œuvre les techniques de création et de gestion d’une entreprise ou d’un projet d’entreprise.",
    career_opportunities_list: [
      "Assistant bilingue",
      "Assistant chef de produit",
      "Rédacteur technique bilingue",
      "Assistant commercial",
      "Attaché(e) de presse bilingue",
      "Chef de comptoir",
      "Assistant de direction ou secrétaire de direction",
      "Assistant marketing",
      "Attaché de presse",
      "Chargé d’études marketing",
      "Commercial Export",
      "Responsable du back office",
      "Secrétaire aux affaires étrangères",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Techniques d’expression écrite et orale",
        items: [
          "Compréhension – Expression orales (Français)",
          "Compréhension – Expression orales (Anglais)",
          "Compréhension – Expression écrites (Français)",
          "Compréhension – Expression écrites (Anglais)",
        ],
      },
      {
        title: "Marketing et communication",
        items: [
          "Marketing",
          "Communication",
          "Transport et logistique",
          "Marketing digital",
          "Techniques de négociation",
        ],
      },
      {
        title: "Culture générale",
        items: [
          "Histoire contemporaine de l’Afrique",
          "Géopolitique africaine",
        ],
      },
      {
        title: "TIC et Droit",
        items: [
          "Technologies de l’information et de la communication",
          "Introduction au droit",
          "Droit commercial",
        ],
      },
      {
        title: "Langues appliquées",
        items: [
          "Français économique et commercial",
          "Anglais économique et commercial",
          "Français administratif et juridique",
          "Anglais administratif et juridique",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management interculturel",
          "Entrepreneurship - Business plan",
          "Introduction à l’économie",
          "Introduction à la gestion",
          "Introduction à l’assistanat administratif",
          "Introduction à la gestion des ressources humaines",
          "Comptabilité",
          "Techniques de création et gestion de projet",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Techniques oratoires",
          "Méthodologie de recherche et de rédaction",
          "Techniques de recherche documentaire et collecte de données",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: false,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 10. LICENCE MANAGEMENT JURIDIQUE ET FISCAL (Licence MJF Multi.pdf & Licence MJF Leader.pdf)
  // =========================================================================
  "licence-management-juridique-et-fiscal": {
    mention: "MANAGEMENT JURIDIQUE ET FISCAL – MJF",
    description:
      "Le programme de Licence en Management Juridique et Fiscal permet, en trois années académiques, de former des juristes-fiscalistes dotés d’une grande capacité de réflexion et d'analyse juridique et fiscale.\nIls seront capables de défendre les intérêts de l’entreprise en prévoyant les risques et en veillant à l’application des lois et règlements.\nLes profils sortants de cette formation se positionnent comme des personnes incontournables dans la stratégie de l’entreprise en cela qu’ils apportent assistance et conseil au top management grâce à une veille permanente.\nIl s'agit d'une formation à forte dominance en Droit et en Fiscalité mais aussi en Comptabilité et en Management.\n\nEn outre, en parcours International Leader (Option Ressources Humaines), la partie « Ressources Humaines » permet aux apprenants d’être beaucoup plus polyvalents, mais aussi d’avoir une maitrise plus approfondie des problématiques de l’entreprise afin de mieux la défendre.",
    career_opportunities_list: [
      "Juriste-fiscaliste",
      "Assistant / Responsable fiscal",
      "Assistant / Responsable contentieux",
      "Consultant junior juriste-fiscaliste",
      "Assistant / Responsable RH",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat toutes séries ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Droit",
        items: [
          "Introduction à l'étude du droit",
          "Théories et pratiques des institutions juridictionnelles",
          "Droit civil",
          "Institutions internationales",
          "Droit constitutionnel",
          "Système politique sénégalais",
          "Droit administratif",
          "Droit des biens",
          "Droit des obligations",
          "Droit commercial général",
          "Droit du travail",
          "Droit pénal général",
          "Droit des sociétés",
          "Droit bancaire et des assurances",
          "Droit du crédit et droit cambiaire",
          "Droit des sûretés et des voies d'exécution",
          "Droit pénal des affaires",
          "Droit du commerce international",
          "Droit des transports",
          "Procédure civile",
          "Contrats spéciaux",
          "Finances publiques",
        ],
      },
      {
        title: "Fiscalité",
        items: [
          "Introduction à la fiscalité",
          "Fiscalité des revenus des personnes physiques",
          "Fiscalité des entreprises",
          "Fiscalité indirecte",
          "Politique fiscale de l'entreprise",
          "Fiscalité comparée",
        ],
      },
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Comptabilité de gestion",
          "Comptabilité des sociétés",
        ],
      },
      {
        title: "Ressources Humaines (Option International Leader)",
        items: [
          "Introduction à la RH",
          "Politique de recrutement",
          "Stratégie de rémunération",
          "Aspects juridiques de la santé sécurité au travail",
          "Accident de travail et maladies professionnelles",
          "Evaluation des risques professionnels",
          "Formation",
          "Administration du personnel",
          "Evaluation du personnel",
          "Logiciel de gestion de la paie",
          "GPEC",
          "Audit social",
          "Ergonomie",
          "Système d'information RH",
        ],
      },
      {
        title: "Outils de développement personnel",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Techniques d’expression",
          "Entrepreneurship - Business plan",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Outils de management",
        items: [
          "Management",
          "Economie",
          "Gestion de projet",
          "Gestion des ressources humaines",
          "Analyse et Traitement de données sur Sphinx",
        ],
      },
      {
        title: "Professionnalisation",
        items: [
          "Bureaux d’adaptation au monde de l’entreprise",
          "Présentation projet de création d'entreprise",
          "Etudes de cas de synthèse",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 11. LICENCE GÉNIE LOGICIEL (Licence GELO.pdf)
  // =========================================================================
  "licence-genie-logiciel": {
    mention: "INFORMATIQUE ET RÉSEAU",
    specialty: "GENIE LOGICIEL - GELO",
    description:
      "Les technologies de l’information et de la communication sont devenues incontournables pour tout secteur confondu. Ainsi, pour être compétitive, l’entreprise doit se doter de systèmes informatiques performants afin d’optimiser ses processus, de mieux communiquer et d’améliorer sa productivité.\nLe programme de Licence en Génie Logiciel permet de former des professionnels pouvant accompagner l’entreprise dans sa transformation numérique.\nLes profils sortants de la formation sont très polyvalents grâce à une solide base technique en développement et un bon niveau en réseau et système. Ils seront à même :\n• D’avoir une vision globale des problématiques informatiques de l’entreprise et de proposer des solutions performantes ;\n• D’analyser et de concevoir des applications en utilisant des outils de génie logiciel ;\n• De développer des applications informatiques utilisant des technologies récentes ;\n• De participer dans la mise en place de systèmes d’information ;\n• D’assister et de conseiller les utilisateurs ;\n• Etc.",
    career_opportunities_list: [
      "Analyste programmeur",
      "Concepteur/administrateur des bases de données",
      "Développeur informatique",
      "Administrateur de base de données",
      "Intégrateur de progiciel de gestion en client / serveur",
      "Assistant chef de projet ERP",
      "Développeur en architecture client-serveur",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat séries S – scientifique ou G – gestion ou tout autre diplôme équivalent ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Développement",
        items: [
          "Algorithmique",
          "Langage C",
          "JavaScript/JQuery",
          "Java",
          "Java Web",
          "Python",
          "PHP5/MySQL",
          "Base de données et langage SQL",
          "Merise",
          "UML",
          "Développement Front-End",
          "Développement Back-End",
          "Framework Symfony",
          "Initiation au développement d'applications Big-Data",
          "Sécurité des applications",
          "Développement d'application mobile",
          "Initiation à la robotique et aux objets connectés",
        ],
      },
      {
        title: "Système & réseau :",
        items: [
          "Cisco IT Essentials",
          "Cisco CCNA 1",
          "Cisco CCNA 2",
          "Cisco CCNA 3",
          "Linux - Administration système",
          "Linux - Administration réseau",
          "Administration Windows Server",
          "Base des réseaux de télécommunication",
          "Traitement du signal",
          "Téléphonie sur IP niveau 1",
          "Cryptographie",
        ],
      },
      {
        title: "Mathématiques pour l’ingénieur",
        items: [
          "Analyse",
          "Algèbre",
          "Statistique",
          "Probabilité",
        ],
      },
      {
        title: "Matériel & techniques numériques:",
        items: [
          "Architecture matérielle centrale",
          "Infographie",
          "Création de site web",
        ],
      },
      {
        title: "Outils de management :",
        items: [
          "Economie",
          "Droit",
          "Management",
          "Comptabilité",
          "Gestion des ressources humaines",
          "Gestion de projet de systèmes d’information",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Entrepreneurship - Business plan",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Professionnalisation :",
        items: [
          "Projets techniques",
          "Projet de création d'entreprise",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 12. LICENCE SYSTÈME, RÉSEAU ET TÉLÉCOMMUNICATION (Licence SRT.pdf)
  // =========================================================================
  "licence-systeme-reseau-et-telecommunication": {
    mention: "INFORMATIQUE ET RÉSEAU",
    specialty: "SYSTÈME, RESEAU ET TELECOMMUNICATIONS - SRT",
    description:
      "Les technologies de l’information et de la communication sont devenues incontournables pour tout secteur confondu. Ainsi, pour être compétitive, l’entreprise doit se doter de systèmes informatiques performants afin d’optimiser ses processus, de mieux communiquer et d’améliorer sa productivité.\nLes profils sortants du programme de Licence en Système, Réseau et Télécommunications sont très polyvalents grâce à une solide base technique en Réseau, Système, Sécurité et Télécommunication et un bon niveau en Développement. Ils seront à même :\n• D’avoir une vision globale des problématiques informatiques de l’entreprise et de proposer des solutions performantes ;\n• D’installer, administrer et assurer la maintenance d’un réseau sous une plateforme ;\n• De déployer, administrer et sécuriser un parc informatique multi-protocoles ;\n• De maîtriser les aspects « sécurité » et « qualité » des réseaux et des systèmes de communication ;\n• De savoir dimensionner un système de transmission de données ;\n• De programmer dans un langage informatique spécifique ;\n• De concevoir et développer des applications réseaux embarqués ;\n• D’administrer des bases de données ;\n• Etc.",
    career_opportunities_list: [
      "Gestionnaire de système informatique et réseaux",
      "Développeur d’applications réseaux",
      "Administrateur réseau et système",
      "Administrateur de bases de données",
      "Responsable maintenance logiciel et matériel pour les réseaux",
      "Assistant chef de projet pour les opérateurs",
      "Gestionnaire de parc informatique",
      "etc",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat Scientifique – S, Economie et Gestion – STEG ou Littéraire – L (sous conditions ) ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système, Réseau et Télécommunication :",
        items: [
          "Cisco IT Essentials",
          "Cisco CCNA 1",
          "Cisco CCNA 2",
          "Cisco CCNA 3",
          "Huawei HCNA Entry",
          "Huawei HCNA Intermediate",
          "Linux - Administration système",
          "Linux - Administration réseau",
          "Administration Windows Server",
          "Base des réseaux de télécommunication",
          "Traitement du signal",
          "Support de transmission",
          "Téléphonie sur IP niveau 1",
          "Réseau sans fil et mobile",
          "Cryptographie",
          "Sécurité réseau et système",
        ],
      },
      {
        title: "Développement",
        items: [
          "Algorithmique",
          "Langage C",
          "JavaScript/JQuery",
          "Java",
          "Java Web",
          "Python",
          "Base de données et langage SQL",
          "SGBD Oracle / SQL Server",
          "Merise",
          "UML",
          "Développement d'application mobile",
          "Initiation à la robotique et aux objets connectés",
        ],
      },
      {
        title: "Mathématiques pour l’ingénieur",
        items: [
          "Analyse",
          "Algèbre",
          "Statistique",
          "Probabilité",
        ],
      },
      {
        title: "Matériel & techniques numériques:",
        items: [
          "Architecture matérielle centrale",
          "Infographie",
          "Création de site web",
        ],
      },
      {
        title: "Outils de management :",
        items: [
          "Economie",
          "Droit",
          "Management",
          "Comptabilité",
          "Gestion des ressources humaines",
          "Gestion de projet de systèmes d’information",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Intégration africaine",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Entrepreneurship - Business plan",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Professionnalisation :",
        items: [
          "Projets techniques",
          "Projet de création d'entreprise",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: true,
  },

  // =========================================================================
  // 13. LICENCE DÉVELOPPEMENT WEB ET MARKETING DIGITAL (Licence DEVWEB.pdf)
  // =========================================================================
  "licence-developpement-web-et-marketing-digital": {
    mention: "INFORMATIQUE ET RÉSEAU",
    specialty: "DEVELOPPEMENT WEB ET MARKETING DIGITAL - DEVWEB",
    description:
      "Le digital est devenu incontournable dans notre quotidien et particulièrement dans les activités économiques. Dans le secteur commercial, les employeurs recherchent aujourd’hui des compétences solides spécifiques au marketing digital.\nLa Licence en Développement Web et Marketing Digital est un programme permettant de former des développeurs informatiques spécialisés dans le webmarketing. Avec des bases solides en marketing et en communication, ils seront capables de concevoir des dispositifs digitaux innovants adaptés à la stratégie commerciale de l’entreprise.",
    career_opportunities_list: [
      "Développeur de Web App",
      "Développeur de Web services",
      "Consultant en E-Communication et Web Marketing",
      "Consultant E-commerce et analyste de l’impact commercial pour l’entreprise",
      "Responsable agence Web et Web Média",
      "Etc.",
    ],
    admission_conditions_list: [
      "Etre titulaire du Baccalauréat Scientifique - S, Economie et Gestion - STEG ou Littéraire - L (sous conditions ) ;",
      "Faire acte de candidature par le retrait et le dépôt d’un dossier de candidature dûment rempli et contenant toutes les pièces requises.",
      "Passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Développement",
        items: [
          "Algorithmique",
          "Langage C",
          "JavaScript/JQuery",
          "Java",
          "Java Web",
          "Python",
          "PHP5/MySQL",
          "Base de données et langage SQL",
          "Merise",
          "UML",
          "Développement Front-End",
          "Développement Back-End",
          "Framework Symfony",
          "Initiation au développement d'applications Big-Data",
          "Sécurité des applications",
          "Développement d'application mobile",
        ],
      },
      {
        title: "Techniques numériques - Digital :",
        items: [
          "IT Essentials",
          "Infographie",
          "Création de site web",
          "Multimedia",
          "Marketing digital",
          "Communication digitale",
          "E-commerce et E-logistique",
          "Community management",
          "Référencement web",
        ],
      },
      {
        title: "Marketing :",
        items: [
          "Approche théorique du marketing",
          "Etudes et analyse de marché",
          "Marketing stratégique",
          "Marketing opérationnel",
          "Marketing industriel B to B",
          "Marketing des services",
        ],
      },
      {
        title: "Communication :",
        items: [
          "Fondements de la communication",
          "Les principes de communication non commerciale des entreprises",
          "Communication et action publicitaire",
          "Communication presse et média",
          "Communication et approche commerciale de l'entreprise",
        ],
      },
      {
        title: "Outils de management :",
        items: [
          "Economie",
          "Droit",
          "Comptabilité",
          "Mathématiques et statistiques",
          "Gestion des ressources humaines",
          "Gestion de projet de systèmes d’information",
        ],
      },
      {
        title: "Outils de développement personnel :",
        items: [
          "Anglais",
          "Intégration africaine",
          "Entrepreneurship - Business plan",
          "Anthropologie africaine",
          "Développement personnel et professionnel",
          "Bureautique",
          "Méthodologies de recherche",
        ],
      },
      {
        title: "Professionnalisation :",
        items: [
          "Projets techniques",
          "Projet de création d'entreprise",
          "Stage",
          "Mémoire de fin de parcours",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },

  // =========================================================================
  // 14. LICENCE INTELLIGENCE ARTIFICIELLE ET BIG DATA (LICENCE IABD.pdf)
  // =========================================================================
  "licence-intelligence-artificielle-et-big-data": {
    mention: "INTELLIGENCE ARTIFICIELLE ET BIG DATA - IABD",
    description:
      "Notre LICENCE en Intelligence Artificielle et Big Data vise à former une nouvelle génération de professionnels capables de concevoir, développer et exploiter des solutions basées sur les données et l’intelligence artificielle.\nLes apprenants acquerront une compréhension approfondie des fondements de l’informatique, de l’analyse de données, du machine learning et des systèmes intelligents.\nIls seront dotés des compétences techniques nécessaires pour collecter, traiter, analyser et valoriser les données massives, ainsi que pour développer des modèles prédictifs et des applications intelligentes adaptées aux besoins des entreprises et organisations.\n\nÀ l’issue de la Licence en Intelligence Artificielle et Big Data, les diplômés peuvent intégrer le marché du travail à des postes juniors dans les domaines de l’analyse de données, du développement informatique orienté data, de l’assistance en intelligence artificielle et de la gestion de projets numériques, ou poursuivre leurs études en master spécialisé.",
    career_opportunities_list: [
      "Junior Data Scientist",
      "Junior Data Engineer",
      "Junior Data Analyst",
      "Développeur Big Data",
      "Junior Data Quality Manager",
      "Statisticien",
      "Dataminer",
      "Administrateur de Bases de Données",
    ],
    admission_conditions_list: [
      "Baccalauréat scientifique (S, STI, ou équivalent)",
      "Baccalauréat technique ou professionnel à dominante informatique",
      "Ou tout autre diplôme admis en équivalence",
      "Les candidats doivent déposer un dossier de candidature et peuvent être soumis à un test de niveau ou un entretien.",
    ],
    program_blocks: [
      {
        title: "FONDAMENTAUX SCIENTIFIQUES ET INFORMATIQUES",
        items: [
          "Mathématiques générales",
          "Algèbre linéaire",
          "Probabilités et statistiques",
          "Logique et raisonnement",
          "Algorithmique et structures de données",
        ],
      },
      {
        title: "PROGRAMMATION ET DEVELOPPEMENT",
        items: [
          "Programmation en Python",
          "Programmation orientée objet",
          "Développement web (HTML, CSS, JavaScript)",
          "Introduction aux APIs et services web",
          "Outils de développement collaboratif (Git, GitHub)",
        ],
      },
      {
        title: "BASES DE DONNEES ET BIG DATA",
        items: [
          "Bases de données relationnelles (SQL)",
          "Modélisation des données",
          "Bases de données NoSQL",
          "Introduction au Big Data",
          "Outils Big Data (Hadoop, Spark)",
        ],
      },
      {
        title: "ANALYSE ET TRAITEMENT DES DONNEES",
        items: [
          "Data cleaning et préparation des données",
          "Analyse exploratoire des données",
          "Visualisation des données (Power BI, Tableau)",
          "Outils statistiques appliqués",
          "Tableaux de bord et reporting",
        ],
      },
      {
        title: "INTELLIGENCE ARTIFICIELLE",
        items: [
          "Introduction à l’intelligence artificielle",
          "Machine Learning",
          "Deep Learning (initiation)",
          "Traitement du langage naturel (NLP)",
          "Vision par ordinateur (initiation)",
        ],
      },
      {
        title: "OUTILS ET ENVIRONNEMENTS DATA",
        items: [
          "Environnements de développement (Jupyter, Anaconda)",
          "Cloud computing (initiation)",
          "Outils collaboratifs et data platforms",
          "Automatisation des processus",
        ],
      },
      {
        title: "SECURITE ET ETHIQUE DES DONNEES",
        items: [
          "Sécurité des systèmes d’information",
          "Protection des données personnelles",
          "Éthique de l’intelligence artificielle",
          "Gouvernance des données",
        ],
      },
      {
        title: "COMPETENCES TRANSVERSALES",
        items: [
          "Méthodologie de travail universitaire",
          "Communication professionnelle",
          "Anglais technique",
          "Gestion de projet",
          "Entrepreneuriat digital",
        ],
      },
      {
        title: "PRATIQUE METIERS",
        items: [
          "Projets tutorés",
          "Études de cas",
          "Hackathon / challenges data",
          "Stage en entreprise",
          "Projet de fin d’études",
        ],
      },
    ],
    international_leader: true,
    anaq_sup: true,
    cames: false,
  },
};
