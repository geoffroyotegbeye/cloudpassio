// Static content for the CloudPulse career roadmap (10 Aug 2026 → 28 Feb 2027).
// Pure data — no side effects, safe to import on server and client.

export interface RoadmapTask {
  id: string;
  text: string;
  milestone?: boolean;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  short: string;
  dateLabel: string;
  start: string; // ISO date, inclusive
  end: string; // ISO date, inclusive
  note?: string;
  tasks: RoadmapTask[];
}

export const CAMPAIGN_START = "2026-08-10";
export const CAMPAIGN_END = "2027-02-28";

export function getCampaignDay(now: Date) {
  const start = new Date(`${CAMPAIGN_START}T00:00:00`);
  const end = new Date(`${CAMPAIGN_END}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const totalDays =
    Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
  let dayIndex =
    Math.round((today.getTime() - start.getTime()) / 86_400_000) + 1;
  if (dayIndex < 0) dayIndex = 0;
  if (dayIndex > totalDays) dayIndex = totalDays;
  const currentPhase = PHASES.find((p) => {
    const s = new Date(`${p.start}T00:00:00`);
    const e = new Date(`${p.end}T00:00:00`);
    return today >= s && today <= e;
  });
  return { dayIndex, totalDays, currentPhaseId: currentPhase?.id ?? null };
}

export const PIPELINE_STAGES = [
  "Sources (API · CSV · PostgreSQL)",
  "Airflow",
  "S3 Data Lake (raw → processed → curated)",
  "Spark / SQL",
  "Data Warehouse",
  "Analytics / Dashboard",
];

export const TECH_STACK = [
  "Python",
  "SQL avancé",
  "Airflow",
  "Spark",
  "S3 / MinIO",
  "Data Lake",
  "Data Warehouse",
  "Terraform",
  "AWS (Glue · Athena · IAM · RDS · CloudWatch)",
  "Docker",
  "CI/CD",
];

export const GOLDEN_RULE: { skill: string; proof: string }[] = [
  { skill: "Terraform", proof: "commit Terraform" },
  { skill: "Airflow", proof: "DAG dans le projet" },
  { skill: "AWS", proof: "architecture déployée" },
  { skill: "IAM", proof: "policies documentées" },
  { skill: "Spark", proof: "transformation Spark" },
  { skill: "CI/CD", proof: "pipeline fonctionnel" },
  { skill: "Data Quality", proof: "tests écrits" },
  { skill: "Monitoring", proof: "dashboard / alerte" },
];

export const FINAL_OBJECTIVE_QUOTE =
  "I designed, implemented and deployed a cloud-based data platform using Python, PostgreSQL, Airflow, Spark, AWS and Terraform. I automated the infrastructure deployment, implemented CI/CD, monitoring and data-quality checks, and documented the architecture and engineering decisions.";

export const PHASES: RoadmapPhase[] = [
  {
    id: 0,
    title: "Fondation",
    short: "Fondation",
    dateLabel: "10 → 16 août 2026",
    start: "2026-08-10",
    end: "2026-08-16",
    note: "Pas d'AWS, pas de certification, pas de Kubernetes. On construit le socle local.",
    tasks: [
      { id: "p0-1", text: "Créer le repository GitHub CloudPulse" },
      {
        id: "p0-2",
        text: "Choisir le scénario métier — E-commerce : customers, products, orders, payments",
      },
      { id: "p0-3", text: "Définir l'architecture initiale (schéma V0)" },
      { id: "p0-4", text: "Installer Docker + Docker Compose" },
      { id: "p0-5", text: "Préparer l'environnement Python" },
      { id: "p0-6", text: "Préparer PostgreSQL en local (Docker)" },
      { id: "p0-7", text: "Préparer Airflow en local (Docker)" },
      {
        id: "p0-8",
        text: "Écrire le README initial (contexte, objectifs, stack)",
      },
    ],
  },
  {
    id: 1,
    title: "Data Engineering fundamentals",
    short: "Août",
    dateLabel: "17 → 31 août 2026",
    start: "2026-08-17",
    end: "2026-08-31",
    tasks: [
      { id: "p1-1", text: "Python data : fichiers, CSV, JSON" },
      { id: "p1-2", text: "Python data : requests / consommation d'API" },
      { id: "p1-3", text: "Python data : Pandas (nettoyage, transformation)" },
      { id: "p1-4", text: "Python data : exceptions & logging" },
      { id: "p1-5", text: "SQL avancé : JOIN, GROUP BY" },
      { id: "p1-6", text: "SQL avancé : CTE & Window Functions" },
      { id: "p1-7", text: "SQL avancé : indexes, views, transactions" },
      { id: "p1-8", text: "Pipeline batch : Source → Python → PostgreSQL" },
      { id: "p1-9", text: "Premier DAG Airflow : Extract → Transform → Load" },
      {
        id: "p1-10",
        text: "Ajouter retries, scheduling, logging, validation au DAG",
      },
      { id: "p1-11", text: "Pipeline fonctionnel en local", milestone: true },
    ],
  },
  {
    id: 2,
    title: "Data Platform — Airflow + Spark + Data Lake",
    short: "Septembre",
    dateLabel: "Septembre 2026",
    start: "2026-09-01",
    end: "2026-09-30",
    tasks: [
      { id: "p2-1", text: "Introduire MinIO (S3 local) comme data lake" },
      {
        id: "p2-2",
        text: "Structurer le data lake : raw/ · processed/ · curated/",
      },
      { id: "p2-3", text: "Premiers traitements Spark / PySpark" },
      {
        id: "p2-4",
        text: "Écrire les règles de Data Quality (NOT NULL, unicité, plages, dates/emails valides)",
      },
      { id: "p2-5", text: "Ajouter des tests automatisés au pipeline" },
      {
        id: "p2-6",
        text: "Ajouter un monitoring basique (logs, statut des DAGs)",
      },
      {
        id: "p2-7",
        text: "Documenter l'architecture data lake (raw → processed → curated)",
      },
      { id: "p2-8", text: "V1 publiable sur GitHub", milestone: true },
    ],
  },
  {
    id: 3,
    title: "AWS + Terraform",
    short: "Octobre",
    dateLabel: "Octobre 2026",
    start: "2026-10-01",
    end: "2026-10-31",
    tasks: [
      { id: "p3-1", text: "Obtenir la certification AWS Cloud Practitioner" },
      {
        id: "p3-2",
        text: "Structurer le repo Terraform (modules/, environments/dev, /prod)",
      },
      { id: "p3-3", text: "Provisionner S3 avec Terraform" },
      { id: "p3-4", text: "Provisionner IAM avec Terraform (rôles, policies)" },
      { id: "p3-5", text: "Provisionner VPC avec Terraform" },
      { id: "p3-6", text: "Mettre en place AWS Glue" },
      { id: "p3-7", text: "Mettre en place Athena" },
      { id: "p3-8", text: "Mettre en place RDS" },
      { id: "p3-9", text: "Migrer le pipeline local vers AWS" },
      { id: "p3-10", text: "CloudPulse v2 (cloud)", milestone: true },
    ],
  },
  {
    id: 4,
    title: "CI/CD + Sécurité + Monitoring",
    short: "Novembre",
    dateLabel: "Novembre 2026",
    start: "2026-11-01",
    end: "2026-11-30",
    tasks: [
      { id: "p4-1", text: "Pipeline CI : tests automatisés" },
      { id: "p4-2", text: "Pipeline CI : lint" },
      { id: "p4-3", text: "Pipeline CI : security scan" },
      { id: "p4-4", text: "Pipeline CI : terraform validate + plan" },
      {
        id: "p4-5",
        text: "CD : déploiement automatisé (terraform apply contrôlé)",
      },
      { id: "p4-6", text: "Appliquer IAM least privilege" },
      { id: "p4-7", text: "Mettre en place la gestion des secrets" },
      { id: "p4-8", text: "Mettre en place CloudWatch (logs, alerting)" },
      { id: "p4-9", text: "Rédiger un diagramme d'architecture complet" },
      { id: "p4-10", text: "Faire une analyse de coûts AWS" },
      { id: "p4-11", text: "Rédiger le premier case study du projet" },
      {
        id: "p4-12",
        text: "Démarrer une prospection légère si le projet est présentable",
      },
    ],
  },
  {
    id: 5,
    title: "Portfolio + Personal Branding",
    short: "Décembre",
    dateLabel: "Décembre 2026",
    start: "2026-12-01",
    end: "2026-12-31",
    tasks: [
      {
        id: "p5-1",
        text: "Construire le portfolio one-page (positionnement, projets, liens)",
      },
      {
        id: "p5-2",
        text: "Aligner le profil LinkedIn sur le même positionnement",
      },
      {
        id: "p5-3",
        text: "Publier le case study complet (problème → architecture → résultats)",
      },
      {
        id: "p5-4",
        text: "Documenter le voyage (posts Day 1, 7, 14, 21, 35, 50)",
      },
      {
        id: "p5-5",
        text: "Basculer le rythme : 50% projet · 50% recherche commerciale",
      },
      {
        id: "p5-6",
        text: 'Définir l\'offre freelance ("I build automated data pipelines and cloud data infrastructure for growing businesses")',
      },
    ],
  },
  {
    id: 6,
    title: "Prospection intensive",
    short: "Janvier",
    dateLabel: "Janvier 2027",
    start: "2027-01-01",
    end: "2027-01-31",
    tasks: [
      {
        id: "p6-1",
        text: "Identifier les cibles LinkedIn (Founder SaaS, CTO startup, Agency owner...)",
      },
      { id: "p6-2", text: "Repérer des opportunités sur GitHub" },
      {
        id: "p6-3",
        text: "Participer aux communautés Reddit / Discord / Slack techniques",
      },
      { id: "p6-4", text: "Démarrer l'outreach par email direct personnalisé" },
      { id: "p6-5", text: "Rituel quotidien — 30 min trouver des prospects" },
      {
        id: "p6-6",
        text: "Rituel quotidien — 30 min personnaliser les messages",
      },
      { id: "p6-7", text: "Rituel quotidien — 30 min publier du contenu" },
      {
        id: "p6-8",
        text: "Rituel quotidien — 1–2h construire / améliorer le projet",
      },
      { id: "p6-9", text: "Rituel quotidien — 1h apprentissage" },
      { id: "p6-10", text: "Objectif — 10 conversations qualifiées / semaine" },
      { id: "p6-11", text: "Objectif — 2 à 3 appels / semaine" },
      {
        id: "p6-12",
        text: "Première mission facile à vendre (50–150 $)",
        milestone: true,
      },
    ],
  },
  {
    id: 7,
    title: "Stabiliser & viser le remote",
    short: "Février",
    dateLabel: "Février 2027",
    start: "2027-02-01",
    end: "2027-02-28",
    tasks: [
      {
        id: "p7-1",
        text: "Transformer la première mission en témoignage / référence",
      },
      { id: "p7-2", text: "Obtenir un client récurrent" },
      { id: "p7-3", text: "Chercher activement un contrat remote" },
      { id: "p7-4", text: "Bilan des 202 jours", milestone: true },
    ],
  },
];
