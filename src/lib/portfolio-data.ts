// Static content for the personal portfolio page, sourced from Geoffroy's CV.
// Pure data — no side effects, safe to import on server and client.

export const PROFILE = {
  name: "Geoffroy OTEGBEYE",
  role: "Développeur Fullstack — Lead Technique",
  tagline: "Vue.js · React · Node.js · Python",
  location: "Cotonou, Bénin",
  email: "geoffroyotegbeye@gmail.com",
  phone: "+229 01 57 97 25 75",
  linkedin: "https://linkedin.com/in/geoffroy-otegbeye-287038247",
  github: "https://github.com/geoffroyotegbeye",
  cvUrl: "/cv-geoffroy-otegbeye.pdf",
  cvFileName: "CV-Geoffroy-OTEGBEYE.pdf",
  summary:
    "Développeur fullstack, 3 ans d'expérience, aujourd'hui lead technique d'une équipe de 10 développeurs. Membre de l'équipe fondatrice d'un dialer propriétaire qui traite plus de 9 000 appels par jour pour ~300 téléconseillers. Je conçois et industrialise des applications d'analyse par IA en production (transcription, diarisation, LLM auto-hébergés sur GPU) et je structure les pratiques d'équipe : qualité de code, sécurité, autonomie.",
};

export const HIGHLIGHTS = [
  { value: "3 ans", label: "d'expérience" },
  { value: "10", label: "développeurs encadrés" },
  { value: "9 000+", label: "appels / jour en prod" },
  { value: "4", label: "apps en production" },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["Vue.js 3", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "Python", "FastAPI", "API REST"],
  },
  { category: "Données", items: ["PostgreSQL", "MongoDB", "MySQL"] },
  {
    category: "IA appliquée",
    items: [
      "faster-whisper",
      "Diarisation",
      "Ollama",
      "LLM auto-hébergés",
      "Pipelines GPU",
    ],
  },
  {
    category: "Infra & Ops",
    items: [
      "Docker",
      "Linux",
      "Gitea / Gitea Actions",
      "NVIDIA CUDA",
      "Benchmarking GPU",
    ],
  },
  {
    category: "Qualité & Sécurité",
    items: ["Revue de code automatisée", "OWASP", "Architecture multi-tenant"],
  },
];

export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "VIPP INTERSTIS",
    location: "Cotonou, Bénin",
    role: "Coordinateur de projets digitaux / Lead technique",
    period: "03/2025 – aujourd'hui",
    current: true,
    bullets: [
      "Encadrement d'une équipe de 10 développeurs sur un portefeuille de 4 applications internes et clients (dont un client externe du secteur pharmaceutique)",
      "Transformation d'une équipe orientée exécution en équipe autonome : compréhension du besoin métier, anticipation des problèmes, responsabilité sur les choix techniques",
      "Mise en place d'un Gitea auto-hébergé pour internaliser la gestion de versions, avec pipeline d'analyse automatisée du code (qualité et sécurité) avant intégration sur la branche principale",
      "Diffusion d'une culture sécurité : règles OWASP appliquées dès la conception sur l'ensemble des développements de l'équipe",
      "Conception et industrialisation de la couche IA du groupe (transcription, diarisation, LLM auto-hébergés) sur infrastructure GPU interne",
      "Optimisation de la pipeline de traitement audio : temps de traitement réduit d'environ 20 % (60–65 min → 45–55 min pour un audio de 40 min) et passage d'un traitement strictement séquentiel à l'exécution de 2 pipelines en parallèle",
      "Benchmark comparatif de deux serveurs GPU (NVIDIA GB10 vs Tesla V100S) sur charge réelle : ~12 % de gain de performance identifié, rapport de décision remis à la direction technique",
    ],
  },
  {
    company: "VIPP INTERSTIS",
    location: "Cotonou, Bénin",
    role: "Développeur Fullstack",
    period: "03/2023 – 03/2025",
    current: false,
    bullets: [
      "Membre de l'équipe fondatrice de Catarina, dialer propriétaire développé en interne pour remplacer des services externes et absorber la croissance du centre d'appels",
      "Développement du socle applicatif (Vue.js / Node.js) : gestion des campagnes, supervision des agents, traitement des appels",
      "Système aujourd'hui en production : plus de 9 000 appels par jour, ~300 téléconseillers, une dizaine de campagnes actives",
    ],
  },
];

export const TRAINING = {
  title: "Formation intensive développement web",
  org: "VIPP INTERSTIS",
  period: "08/2022 – 03/2023",
};

export interface Product {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
}

export const PRODUCTS: Product[] = [
  {
    name: "Catarina",
    tagline: "Le cœur opérationnel",
    description:
      "Dialer propriétaire. Gère l'intégralité des appels sortants et la supervision des agents.",
    stack: ["Vue.js", "Node.js"],
    role: "Membre de l'équipe fondatrice, développement du socle (1 an).",
  },
  {
    name: "CallSight Analytics",
    tagline: "La couche d'analyse",
    description:
      "Analyse automatique de la qualité des appels pour un client du secteur pharmaceutique : transcription, séparation client/conseiller, évaluation par LLM.",
    stack: ["Vue.js", "FastAPI", "faster-whisper", "Ollama", "GPU"],
    role: "Conception de l'architecture, industrialisation, optimisation des performances de la pipeline.",
  },
  {
    name: "ScriptOptimizer AI",
    tagline: "La boucle de retour",
    description:
      "Exploite les transcriptions réelles pour améliorer les scripts d'appel remis aux téléconseillers.",
    stack: ["Vue.js", "FastAPI", "Ollama"],
    role: "Conception et pilotage du développement.",
  },
  {
    name: "Dev-Manager",
    tagline: "La couche de pilotage",
    description:
      "Plateforme interne de suivi d'activité et de planification de l'équipe de développement.",
    stack: ["React", "Node.js", "MongoDB"],
    role: "Conception et développement.",
  },
];

export const PERSONAL_PROJECT = {
  name: "Sorika",
  tagline: "ERP / CRM multi-tenant",
  description:
    "Architecture multi-tenant avec isolation des données par organisation. Projet de fond orienté architecture, sécurité et industrialisation.",
  stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
};

export const EDUCATION = {
  degree: "Licence — Banque, Finance et Assurance",
  org: "HECM, Bénin",
  year: "2019",
};

export const LANGUAGES = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "B1" },
];
