export type Domain =
  | "Cloud Concepts"
  | "Security & Compliance"
  | "Cloud Technology & Services"
  | "Billing, Pricing & Support";

export type Difficulty = "Facile" | "Moyen" | "Difficile";

export interface Question {
  id: string;
  domain: Domain;
  service?: string;
  difficulty: Difficulty;
  type: "single" | "multiple";
  prompt: string;
  scenario?: string;
  choices: { id: string; text: string }[];
  answer: string[]; // ids of correct choices
  explanation: string;
  whyWrong?: Record<string, string>;
  keywords: string[];
  memoryTrick?: string;
  docUrl?: string;
  examProbability: "Faible" | "Moyenne" | "Élevée";
}

export const DOMAINS: Domain[] = [
  "Cloud Concepts",
  "Security & Compliance",
  "Cloud Technology & Services",
  "Billing, Pricing & Support",
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "single",
    prompt:
      "Lequel des éléments suivants représente un avantage clé du cloud computing selon AWS ?",
    choices: [
      { id: "a", text: "Investir massivement en CAPEX pour prévoir la capacité" },
      { id: "b", text: "Échanger des dépenses d'investissement (CAPEX) contre des dépenses variables (OPEX)" },
      { id: "c", text: "Gérer soi-même les datacenters pour plus de contrôle" },
      { id: "d", text: "Payer un abonnement fixe indépendamment de l'usage" },
    ],
    answer: ["b"],
    explanation:
      "Le passage du CAPEX à l'OPEX est l'un des six avantages fondamentaux du cloud. Vous ne payez que ce que vous consommez, ce qui améliore l'agilité financière.",
    whyWrong: {
      a: "Le cloud élimine justement le besoin d'investissements massifs en amont.",
      c: "AWS gère l'infrastructure physique (modèle de responsabilité partagée).",
      d: "Le modèle est pay-as-you-go, pas un abonnement fixe.",
    },
    keywords: ["CAPEX", "OPEX", "pay-as-you-go", "6 avantages"],
    memoryTrick: "CAPEX → OPEX = Cloud Advantage #1",
    docUrl: "https://aws.amazon.com/what-is-cloud-computing/",
    examProbability: "Élevée",
  },
  {
    id: "q2",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel principe de conception AWS Well-Architected recommande de concevoir des systèmes qui se remettent automatiquement des défaillances ?",
    choices: [
      { id: "a", text: "Excellence opérationnelle" },
      { id: "b", text: "Fiabilité" },
      { id: "c", text: "Performance" },
      { id: "d", text: "Optimisation des coûts" },
    ],
    answer: ["b"],
    explanation:
      "Le pilier Fiabilité (Reliability) du Well-Architected Framework couvre la capacité d'un système à se rétablir automatiquement après une panne.",
    keywords: ["Well-Architected", "Reliability", "Auto-recovery"],
    memoryTrick: "Fiabilité = Résilience automatique",
    examProbability: "Élevée",
  },
  {
    id: "q3",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "multiple",
    prompt: "Quels sont les avantages de l'élasticité dans AWS ? (Choisir 2)",
    choices: [
      { id: "a", text: "Provisionner exactement la capacité nécessaire à un instant T" },
      { id: "b", text: "Réduire les coûts en évitant le sur-provisionnement" },
      { id: "c", text: "Garantir un matériel physique dédié" },
      { id: "d", text: "Éliminer complètement la latence réseau" },
    ],
    answer: ["a", "b"],
    explanation:
      "L'élasticité permet de scaler vers le haut ou le bas dynamiquement selon la demande, évitant le sur- ou sous-provisionnement.",
    keywords: ["élasticité", "scaling", "auto scaling"],
    examProbability: "Élevée",
  },
  {
    id: "q4",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Une région AWS est composée de plusieurs :",
    choices: [
      { id: "a", text: "Edge Locations" },
      { id: "b", text: "Availability Zones" },
      { id: "c", text: "Local Zones uniquement" },
      { id: "d", text: "VPC" },
    ],
    answer: ["b"],
    explanation:
      "Une région AWS contient au moins 3 Availability Zones (AZ) isolées géographiquement mais reliées par un réseau à faible latence.",
    keywords: ["Région", "AZ", "Availability Zone"],
    memoryTrick: "Région ⊃ AZ ⊃ Datacenters",
    examProbability: "Élevée",
  },
  {
    id: "q5",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "single",
    prompt: "Qu'est-ce qu'une Edge Location dans AWS ?",
    scenario:
      "Une entreprise média souhaite diffuser du contenu vidéo à des utilisateurs dans le monde entier avec la plus faible latence possible.",
    choices: [
      { id: "a", text: "Un datacenter contenant des serveurs EC2" },
      { id: "b", text: "Un point de présence utilisé par CloudFront pour mettre en cache le contenu" },
      { id: "c", text: "Un type d'Availability Zone étendue" },
      { id: "d", text: "Une région AWS dédiée aux entreprises" },
    ],
    answer: ["b"],
    explanation:
      "Les Edge Locations sont des points de présence CDN utilisés par Amazon CloudFront (et Route 53) pour distribuer du contenu au plus près des utilisateurs finaux.",
    keywords: ["Edge", "CloudFront", "CDN", "latence"],
    examProbability: "Élevée",
  },

  // SECURITY
  {
    id: "q6",
    domain: "Security & Compliance",
    service: "IAM",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service permet de gérer les utilisateurs, groupes et permissions dans AWS ?",
    choices: [
      { id: "a", text: "AWS IAM" },
      { id: "b", text: "AWS KMS" },
      { id: "c", text: "AWS Shield" },
      { id: "d", text: "AWS Config" },
    ],
    answer: ["a"],
    explanation:
      "AWS Identity and Access Management (IAM) est le service qui gère les identités et les autorisations d'accès aux ressources AWS.",
    keywords: ["IAM", "identité", "permissions"],
    examProbability: "Élevée",
  },
  {
    id: "q7",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Selon le modèle de responsabilité partagée, qui est responsable du chiffrement des données côté client sur S3 ?",
    choices: [
      { id: "a", text: "AWS" },
      { id: "b", text: "Le client" },
      { id: "c", text: "Partagé équitablement" },
      { id: "d", text: "Le fournisseur d'accès Internet" },
    ],
    answer: ["b"],
    explanation:
      "Dans le modèle de responsabilité partagée, AWS gère la sécurité DU cloud (infrastructure). Le client gère la sécurité DANS le cloud, dont le chiffrement des données, la configuration IAM, et les données elles-mêmes.",
    keywords: ["Shared Responsibility", "chiffrement", "S3"],
    memoryTrick: "AWS = du cloud • Client = dans le cloud",
    examProbability: "Élevée",
  },
  {
    id: "q8",
    domain: "Security & Compliance",
    service: "Shield",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS protège contre les attaques DDoS de manière automatique et gratuite ?",
    choices: [
      { id: "a", text: "AWS WAF" },
      { id: "b", text: "AWS Shield Standard" },
      { id: "c", text: "AWS GuardDuty" },
      { id: "d", text: "Amazon Inspector" },
    ],
    answer: ["b"],
    explanation:
      "AWS Shield Standard est activé automatiquement et gratuitement pour tous les clients AWS. Shield Advanced est payant et offre une protection étendue.",
    whyWrong: {
      a: "WAF filtre les requêtes web (SQL injection, XSS), pas les attaques volumétriques.",
      c: "GuardDuty détecte les menaces via le machine learning, il ne les bloque pas.",
      d: "Inspector évalue les vulnérabilités des workloads.",
    },
    keywords: ["Shield", "DDoS", "gratuit"],
    examProbability: "Élevée",
  },
  {
    id: "q9",
    domain: "Security & Compliance",
    service: "KMS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service permet de créer et gérer des clés cryptographiques pour chiffrer les données ?",
    choices: [
      { id: "a", text: "AWS KMS" },
      { id: "b", text: "AWS Secrets Manager" },
      { id: "c", text: "AWS Certificate Manager" },
      { id: "d", text: "AWS CloudHSM uniquement" },
    ],
    answer: ["a"],
    explanation:
      "AWS Key Management Service (KMS) crée et contrôle les clés de chiffrement. Il s'intègre nativement avec la plupart des services AWS.",
    keywords: ["KMS", "chiffrement", "clés"],
    examProbability: "Élevée",
  },
  {
    id: "q10",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "single",
    prompt:
      "Quelle méthode d'authentification IAM est la plus sécurisée pour un utilisateur humain administrateur ?",
    choices: [
      { id: "a", text: "Access Key + Secret Key" },
      { id: "b", text: "Mot de passe uniquement" },
      { id: "c", text: "Mot de passe + MFA" },
      { id: "d", text: "Compte root avec Access Keys" },
    ],
    answer: ["c"],
    explanation:
      "L'authentification multi-facteurs (MFA) doit toujours être activée pour les utilisateurs privilégiés. Les Access Keys sont pour un accès programmatique, pas pour la console.",
    keywords: ["MFA", "IAM", "best practices"],
    examProbability: "Élevée",
  },
  {
    id: "q11",
    domain: "Security & Compliance",
    service: "CloudTrail",
    difficulty: "Moyen",
    type: "single",
    prompt: "Un auditeur souhaite savoir qui a supprimé un bucket S3 la semaine dernière. Quel service utiliser ?",
    choices: [
      { id: "a", text: "Amazon CloudWatch Metrics" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    answer: ["b"],
    explanation:
      "CloudTrail enregistre les appels API dans votre compte AWS (qui, quoi, quand, d'où). C'est LE service d'audit.",
    whyWrong: {
      a: "CloudWatch surveille les métriques et logs applicatifs, pas les appels API.",
      c: "AWS Config évalue la conformité de la configuration des ressources.",
      d: "Trusted Advisor donne des recommandations, pas d'historique d'actions.",
    },
    keywords: ["CloudTrail", "audit", "API"],
    memoryTrick: "CloudTrail = journal des API • CloudWatch = métriques",
    examProbability: "Élevée",
  },

  // TECHNOLOGY
  {
    id: "q12",
    domain: "Cloud Technology & Services",
    service: "EC2",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service fournit des serveurs virtuels redimensionnables dans le cloud AWS ?",
    choices: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "Amazon EC2" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon RDS" },
    ],
    answer: ["b"],
    explanation:
      "Amazon Elastic Compute Cloud (EC2) fournit une capacité de calcul redimensionnable sous forme d'instances virtuelles.",
    keywords: ["EC2", "compute", "IaaS"],
    examProbability: "Élevée",
  },
  {
    id: "q13",
    domain: "Cloud Technology & Services",
    service: "S3",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Une entreprise doit archiver des données rarement consultées avec le coût de stockage le plus bas possible. Récupération en 12h acceptée.",
    scenario:
      "Une compagnie d'assurance conserve des dossiers clients pendant 10 ans pour raison réglementaire. Les accès sont extrêmement rares.",
    choices: [
      { id: "a", text: "S3 Standard" },
      { id: "b", text: "S3 Intelligent-Tiering" },
      { id: "c", text: "S3 Glacier Deep Archive" },
      { id: "d", text: "S3 One Zone-IA" },
    ],
    answer: ["c"],
    explanation:
      "S3 Glacier Deep Archive est la classe la moins chère (≈$0.00099/GB/mois) pour un archivage à long terme avec récupération dans les 12 heures.",
    whyWrong: {
      a: "S3 Standard est le plus cher, adapté aux accès fréquents.",
      b: "Intelligent-Tiering déplace les données automatiquement, mais coûte plus qu'un archivage direct connu.",
      d: "One Zone-IA est pour un accès peu fréquent mais rapide, dans une seule AZ.",
    },
    keywords: ["Glacier", "Deep Archive", "archivage", "coût"],
    memoryTrick: "Deep Archive = plus profond = moins cher = plus lent",
    examProbability: "Élevée",
  },
  {
    id: "q14",
    domain: "Cloud Technology & Services",
    service: "Lambda",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS permet d'exécuter du code sans provisionner de serveurs ?",
    choices: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "AWS Lambda" },
      { id: "c", text: "Amazon ECS" },
      { id: "d", text: "AWS Batch" },
    ],
    answer: ["b"],
    explanation:
      "AWS Lambda est un service serverless : vous fournissez du code, AWS gère l'infrastructure. Facturation à la milliseconde d'exécution.",
    keywords: ["Lambda", "serverless", "FaaS"],
    memoryTrick: "Lambda = zéro serveur à gérer",
    examProbability: "Élevée",
  },
  {
    id: "q15",
    domain: "Cloud Technology & Services",
    service: "RDS",
    difficulty: "Moyen",
    type: "multiple",
    prompt: "Quels moteurs de base de données sont gérés par Amazon RDS ? (Choisir 2)",
    choices: [
      { id: "a", text: "MongoDB" },
      { id: "b", text: "PostgreSQL" },
      { id: "c", text: "Cassandra" },
      { id: "d", text: "MySQL" },
    ],
    answer: ["b", "d"],
    explanation:
      "RDS supporte : MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora. MongoDB → DocumentDB. Cassandra → Keyspaces.",
    keywords: ["RDS", "SQL", "moteurs"],
    examProbability: "Élevée",
  },
  {
    id: "q16",
    domain: "Cloud Technology & Services",
    service: "DynamoDB",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Quel service AWS offre une base NoSQL entièrement gérée avec des performances à l'échelle du millième de seconde ?",
    choices: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon DynamoDB" },
      { id: "d", text: "Amazon Aurora" },
    ],
    answer: ["c"],
    explanation:
      "DynamoDB est le service NoSQL clé-valeur / document d'AWS, serverless, avec latence en millisecondes à toute échelle.",
    keywords: ["DynamoDB", "NoSQL", "serverless"],
    examProbability: "Élevée",
  },
  {
    id: "q17",
    domain: "Cloud Technology & Services",
    service: "VPC",
    difficulty: "Moyen",
    type: "single",
    prompt: "Qu'est-ce qu'un Amazon VPC ?",
    choices: [
      { id: "a", text: "Un réseau virtuel isolé dans le cloud AWS" },
      { id: "b", text: "Un service de calcul haute performance" },
      { id: "c", text: "Un pare-feu applicatif" },
      { id: "d", text: "Un service DNS géré" },
    ],
    answer: ["a"],
    explanation:
      "Amazon Virtual Private Cloud (VPC) fournit un réseau logiquement isolé dans lequel vous lancez vos ressources AWS.",
    keywords: ["VPC", "réseau", "isolation"],
    examProbability: "Élevée",
  },
  {
    id: "q18",
    domain: "Cloud Technology & Services",
    service: "Route 53",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS fournit un DNS géré, scalable et hautement disponible ?",
    choices: [
      { id: "a", text: "Amazon CloudFront" },
      { id: "b", text: "AWS Route 53" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "AWS Global Accelerator" },
    ],
    answer: ["b"],
    explanation:
      "Route 53 est le service DNS géré d'AWS. Il gère aussi l'enregistrement de domaines et les politiques de routage.",
    keywords: ["Route 53", "DNS"],
    examProbability: "Élevée",
  },
  {
    id: "q19",
    domain: "Cloud Technology & Services",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service permet de comparer visuellement des architectures selon le Well-Architected Framework ?",
    choices: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Well-Architected Tool" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Systems Manager" },
    ],
    answer: ["b"],
    explanation:
      "Le Well-Architected Tool vous aide à examiner votre architecture par rapport aux bonnes pratiques AWS.",
    keywords: ["Well-Architected", "outil"],
    examProbability: "Moyenne",
  },
  {
    id: "q20",
    domain: "Cloud Technology & Services",
    service: "CloudFront",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS est un CDN mondial ?",
    choices: [
      { id: "a", text: "Amazon CloudFront" },
      { id: "b", text: "AWS Global Accelerator" },
      { id: "c", text: "AWS Snowball" },
      { id: "d", text: "Amazon Route 53" },
    ],
    answer: ["a"],
    explanation:
      "CloudFront est le CDN d'AWS, qui met en cache le contenu dans les Edge Locations pour réduire la latence.",
    keywords: ["CloudFront", "CDN", "cache"],
    examProbability: "Élevée",
  },
  {
    id: "q21",
    domain: "Cloud Technology & Services",
    service: "SNS/SQS",
    difficulty: "Difficile",
    type: "single",
    prompt:
      "Une application e-commerce doit découpler ses services : la commande envoyée déclenche facturation, expédition, notification. Quel service utiliser pour une distribution 1-vers-N ?",
    choices: [
      { id: "a", text: "Amazon SQS Standard" },
      { id: "b", text: "Amazon SNS" },
      { id: "c", text: "AWS Step Functions" },
      { id: "d", text: "Amazon Kinesis" },
    ],
    answer: ["b"],
    explanation:
      "Amazon SNS (Simple Notification Service) est un pub/sub qui distribue un message à plusieurs abonnés. SQS est point-à-point (une file, un consommateur qui traite).",
    whyWrong: {
      a: "SQS = file d'attente 1→1, pas de broadcast.",
      c: "Step Functions orchestrent des workflows.",
      d: "Kinesis = streaming de données temps réel.",
    },
    keywords: ["SNS", "SQS", "pub/sub", "découplage"],
    memoryTrick: "SNS = Notification à N • SQS = Queue point-à-point",
    examProbability: "Élevée",
  },
  {
    id: "q22",
    domain: "Cloud Technology & Services",
    service: "ELB",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel type d'Elastic Load Balancer opère au niveau de la couche applicative (Layer 7) ?",
    choices: [
      { id: "a", text: "Network Load Balancer" },
      { id: "b", text: "Classic Load Balancer" },
      { id: "c", text: "Application Load Balancer" },
      { id: "d", text: "Gateway Load Balancer" },
    ],
    answer: ["c"],
    explanation:
      "L'Application Load Balancer (ALB) opère au niveau HTTP/HTTPS (Layer 7), permettant du routage basé sur le contenu.",
    keywords: ["ALB", "Layer 7", "load balancer"],
    memoryTrick: "ALB = A pour Application (Layer 7) • NLB = N pour Network (Layer 4)",
    examProbability: "Élevée",
  },
  {
    id: "q23",
    domain: "Cloud Technology & Services",
    service: "EBS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quelle affirmation sur Amazon EBS est correcte ?",
    choices: [
      { id: "a", text: "Un volume EBS peut être attaché à plusieurs instances de plusieurs AZ" },
      { id: "b", text: "Un volume EBS est lié à une Availability Zone spécifique" },
      { id: "c", text: "EBS est un stockage objet" },
      { id: "d", text: "EBS remplace S3 pour l'archivage" },
    ],
    answer: ["b"],
    explanation:
      "Un volume EBS existe dans une seule AZ et ne peut être attaché qu'à des instances de la même AZ. Utilisez EFS pour un stockage partagé multi-AZ.",
    keywords: ["EBS", "AZ", "block storage"],
    examProbability: "Élevée",
  },
  {
    id: "q24",
    domain: "Cloud Technology & Services",
    service: "S3 vs EFS",
    difficulty: "Difficile",
    type: "single",
    prompt:
      "Une équipe de scientifiques Linux doit partager un même système de fichiers monté sur plusieurs instances EC2 avec support POSIX.",
    choices: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "Amazon EBS Multi-Attach" },
      { id: "c", text: "Amazon EFS" },
      { id: "d", text: "Amazon FSx for Windows" },
    ],
    answer: ["c"],
    explanation:
      "EFS est un système de fichiers NFS entièrement géré, partageable par des milliers d'instances EC2 Linux avec support POSIX.",
    whyWrong: {
      a: "S3 est du stockage objet (API REST), pas un système de fichiers POSIX.",
      b: "EBS Multi-Attach reste limité (même AZ, cas d'usage précis).",
      d: "FSx Windows est SMB pour Windows, pas Linux.",
    },
    keywords: ["EFS", "NFS", "POSIX", "partagé"],
    memoryTrick: "EFS = Elastic File System = partagé Linux",
    examProbability: "Élevée",
  },

  // BILLING
  {
    id: "q25",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS permet de visualiser et analyser les coûts de manière interactive ?",
    choices: [
      { id: "a", text: "AWS Budgets" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "AWS Pricing Calculator" },
    ],
    answer: ["b"],
    explanation:
      "Cost Explorer offre des graphiques interactifs sur l'usage et les coûts, avec prévisions jusqu'à 12 mois.",
    keywords: ["Cost Explorer", "coûts", "analyse"],
    memoryTrick: "Explorer = graphiques • Budgets = alertes",
    examProbability: "Élevée",
  },
  {
    id: "q26",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service alerte quand les coûts prévus dépassent un seuil défini ?",
    choices: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Budgets" },
      { id: "c", text: "AWS CloudWatch" },
      { id: "d", text: "AWS Cost and Usage Report" },
    ],
    answer: ["b"],
    explanation:
      "AWS Budgets permet de définir des seuils de coût/usage et d'envoyer des alertes proactives.",
    keywords: ["Budgets", "alertes"],
    examProbability: "Élevée",
  },
  {
    id: "q27",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Quel plan de support inclut un Technical Account Manager (TAM) dédié ?",
    choices: [
      { id: "a", text: "Basic" },
      { id: "b", text: "Developer" },
      { id: "c", text: "Business" },
      { id: "d", text: "Enterprise" },
    ],
    answer: ["d"],
    explanation:
      "Seuls Enterprise On-Ramp et Enterprise incluent un TAM (dédié pour Enterprise, groupe pour On-Ramp).",
    keywords: ["Support", "TAM", "Enterprise"],
    memoryTrick: "TAM = Top level support = Enterprise",
    examProbability: "Élevée",
  },
  {
    id: "q28",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Une charge EC2 tourne 24/7 pendant 3 ans. Quel modèle de tarification est le plus économique ?",
    choices: [
      { id: "a", text: "On-Demand" },
      { id: "b", text: "Spot Instances" },
      { id: "c", text: "Reserved Instances 3 ans (all upfront)" },
      { id: "d", text: "Dedicated Hosts On-Demand" },
    ],
    answer: ["c"],
    explanation:
      "Les Reserved Instances 3 ans en all-upfront offrent jusqu'à 72% d'économies vs On-Demand pour des charges stables prévisibles.",
    whyWrong: {
      a: "On-Demand est le plus flexible mais le plus cher sur la durée.",
      b: "Spot est jusqu'à 90% moins cher mais peut être interrompu — inadapté à un 24/7 critique.",
      d: "Dedicated Hosts On-Demand est le plus cher (matériel dédié).",
    },
    keywords: ["Reserved", "3 ans", "économies"],
    examProbability: "Élevée",
  },
  {
    id: "q29",
    domain: "Billing, Pricing & Support",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Quelles caractéristiques décrivent les Spot Instances ? (Choisir 2)",
    choices: [
      { id: "a", text: "Jusqu'à 90% de réduction par rapport à On-Demand" },
      { id: "b", text: "Garantissent une disponibilité continue" },
      { id: "c", text: "Peuvent être interrompues avec un préavis de 2 minutes" },
      { id: "d", text: "Idéales pour bases de données de production critiques" },
    ],
    answer: ["a", "c"],
    explanation:
      "Les Spot exploitent la capacité inutilisée : très bon marché mais interruptibles. Parfait pour batch, big data, CI/CD, workloads tolérant aux pannes.",
    keywords: ["Spot", "interruption", "économies"],
    examProbability: "Élevée",
  },
  {
    id: "q30",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Quel service fournit un tableau de bord avec des recommandations de sécurité, performance, tolérance aux pannes et optimisation des coûts ?",
    choices: [
      { id: "a", text: "AWS Config" },
      { id: "b", text: "AWS Trusted Advisor" },
      { id: "c", text: "AWS Compute Optimizer" },
      { id: "d", text: "AWS Systems Manager" },
    ],
    answer: ["b"],
    explanation:
      "Trusted Advisor scanne votre compte selon 5 piliers : coût, performance, sécurité, tolérance aux pannes, quotas de service.",
    keywords: ["Trusted Advisor", "recommandations"],
    memoryTrick: "Trusted Advisor = conseiller de confiance en 5 piliers",
    examProbability: "Élevée",
  },
  {
    id: "q31",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel outil AWS gratuit permet d'estimer le coût d'une architecture avant déploiement ?",
    choices: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Pricing Calculator" },
      { id: "c", text: "AWS Budgets" },
      { id: "d", text: "AWS Billing Console" },
    ],
    answer: ["b"],
    explanation:
      "Le Pricing Calculator permet de simuler le coût mensuel d'une architecture AWS sans avoir de compte actif.",
    keywords: ["Pricing Calculator", "estimation"],
    examProbability: "Élevée",
  },
  {
    id: "q32",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service permet de gérer plusieurs comptes AWS via une facturation consolidée ?",
    choices: [
      { id: "a", text: "AWS Organizations" },
      { id: "b", text: "AWS Control Tower" },
      { id: "c", text: "AWS IAM Identity Center" },
      { id: "d", text: "AWS Resource Access Manager" },
    ],
    answer: ["a"],
    explanation:
      "AWS Organizations centralise la gestion de plusieurs comptes : facturation consolidée, SCPs (policies), regroupement en OUs.",
    keywords: ["Organizations", "consolidated billing", "SCP"],
    examProbability: "Élevée",
  },
  {
    id: "q33",
    domain: "Billing, Pricing & Support",
    difficulty: "Difficile",
    type: "single",
    prompt:
      "Quel avantage financier est apporté par la facturation consolidée dans AWS Organizations ?",
    choices: [
      { id: "a", text: "Réductions volumétriques agrégées sur S3, EC2, etc." },
      { id: "b", text: "Réduction fixe de 20% sur tous les services" },
      { id: "c", text: "Support Business gratuit" },
      { id: "d", text: "Suppression des frais de transfert de données" },
    ],
    answer: ["a"],
    explanation:
      "La facturation consolidée agrège la consommation de tous les comptes pour bénéficier des paliers de volume (S3, transfert de données, Reserved Instances partagées).",
    keywords: ["consolidated billing", "volume", "économies"],
    examProbability: "Moyenne",
  },
  {
    id: "q34",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel document liste les certifications de conformité (SOC, ISO, PCI-DSS) d'AWS ?",
    choices: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Artifact" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Compliance Center" },
    ],
    answer: ["b"],
    explanation:
      "AWS Artifact est le portail d'accès aux rapports de conformité et audits d'AWS (SOC, ISO 27001, PCI-DSS, HIPAA, etc.).",
    keywords: ["Artifact", "compliance", "SOC", "ISO"],
    memoryTrick: "Artifact = les artefacts de conformité téléchargeables",
    examProbability: "Élevée",
  },
  {
    id: "q35",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel modèle de service cloud est représenté par AWS Lambda ?",
    choices: [
      { id: "a", text: "IaaS" },
      { id: "b", text: "PaaS" },
      { id: "c", text: "SaaS" },
      { id: "d", text: "FaaS / Serverless" },
    ],
    answer: ["d"],
    explanation:
      "Lambda est Function as a Service (FaaS), une sous-catégorie du serverless. Vous ne gérez ni OS ni runtime — juste votre fonction.",
    keywords: ["FaaS", "serverless", "Lambda"],
    examProbability: "Moyenne",
  },
  {
    id: "q36",
    domain: "Cloud Technology & Services",
    service: "CloudWatch",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service collecte les métriques, logs et déclenche des alarmes sur les ressources AWS ?",
    choices: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS X-Ray" },
      { id: "d", text: "AWS Config" },
    ],
    answer: ["b"],
    explanation:
      "CloudWatch = observabilité : métriques (CPU, mémoire), logs applicatifs, alarmes, dashboards.",
    keywords: ["CloudWatch", "monitoring", "métriques"],
    memoryTrick: "Watch = observer les métriques • Trail = tracer les API",
    examProbability: "Élevée",
  },
  {
    id: "q37",
    domain: "Cloud Technology & Services",
    service: "Snow Family",
    difficulty: "Difficile",
    type: "single",
    prompt:
      "Une entreprise doit transférer 500 TB de données depuis son datacenter vers S3, mais la bande passante Internet est limitée à 100 Mbps.",
    choices: [
      { id: "a", text: "AWS Direct Connect" },
      { id: "b", text: "AWS Snowball Edge" },
      { id: "c", text: "AWS DataSync via Internet" },
      { id: "d", text: "Uploader directement sur S3 via HTTPS" },
    ],
    answer: ["b"],
    explanation:
      "Snowball Edge est un boîtier physique livré chez le client. 500 TB via 100 Mbps prendrait des mois — Snowball transfère en quelques jours.",
    keywords: ["Snowball", "migration", "physique"],
    memoryTrick: "Snowball = valise physique • Petabyte → Snowmobile (camion)",
    examProbability: "Élevée",
  },
  {
    id: "q38",
    domain: "Cloud Concepts",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Quels sont les 6 avantages du cloud selon AWS ? (Choisir 2 réponses parmi les vraies)",
    choices: [
      { id: "a", text: "Bénéficier d'économies d'échelle massives" },
      { id: "b", text: "Devenir mondial en quelques minutes" },
      { id: "c", text: "Éliminer complètement les coûts de licence" },
      { id: "d", text: "Contrôler chaque serveur physique" },
    ],
    answer: ["a", "b"],
    explanation:
      "Les 6 avantages : CAPEX→OPEX, économies d'échelle, capacité élastique, vitesse & agilité, arrêt de la gestion des datacenters, déploiement mondial en minutes.",
    keywords: ["6 avantages", "économies d'échelle", "global"],
    examProbability: "Élevée",
  },
  {
    id: "q39",
    domain: "Security & Compliance",
    service: "GuardDuty",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS utilise le machine learning pour détecter les menaces sur votre compte ?",
    choices: [
      { id: "a", text: "AWS WAF" },
      { id: "b", text: "Amazon Inspector" },
      { id: "c", text: "Amazon GuardDuty" },
      { id: "d", text: "AWS Macie" },
    ],
    answer: ["c"],
    explanation:
      "GuardDuty analyse en continu les logs (CloudTrail, VPC Flow, DNS) via ML pour détecter comportements anormaux et menaces.",
    whyWrong: {
      a: "WAF filtre le trafic web au niveau applicatif.",
      b: "Inspector scanne les vulnérabilités des workloads (EC2, ECR, Lambda).",
      d: "Macie détecte les données sensibles (PII) dans S3.",
    },
    keywords: ["GuardDuty", "ML", "menaces"],
    memoryTrick: "GuardDuty = chien de garde intelligent",
    examProbability: "Élevée",
  },
  {
    id: "q40",
    domain: "Cloud Technology & Services",
    difficulty: "Difficile",
    type: "single",
    prompt:
      "Une startup construit un backend API mobile avec charge très variable et souhaite payer uniquement à l'utilisation, sans gérer de serveurs.",
    scenario:
      "L'application peut passer de 100 à 100 000 requêtes/minute lors de campagnes. L'équipe est petite et ne veut pas gérer d'infrastructure.",
    choices: [
      { id: "a", text: "EC2 Auto Scaling derrière un ALB" },
      { id: "b", text: "API Gateway + AWS Lambda + DynamoDB" },
      { id: "c", text: "ECS sur EC2" },
      { id: "d", text: "Elastic Beanstalk avec RDS" },
    ],
    answer: ["b"],
    explanation:
      "Stack 100% serverless : API Gateway (endpoints REST), Lambda (compute pay-per-invocation), DynamoDB (NoSQL serverless). Scale de 0 à des millions sans gestion d'infra.",
    keywords: ["serverless", "API Gateway", "Lambda", "DynamoDB"],
    memoryTrick: "API Gateway + Lambda + DynamoDB = trio serverless classique",
    examProbability: "Élevée",
  },
];

export function getQuestionsByMode(
  mode: "quick" | "practice" | "exam",
  domain?: Domain,
): Question[] {
  const pool = domain ? QUESTIONS.filter((q) => q.domain === domain) : QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const size = mode === "quick" ? 10 : mode === "practice" ? 25 : 65;
  // If pool smaller, cycle
  const out: Question[] = [];
  let i = 0;
  while (out.length < Math.min(size, mode === "exam" ? QUESTIONS.length : size)) {
    out.push(shuffled[i % shuffled.length]);
    i++;
    if (i > 500) break;
  }
  return out;
}

export const MODE_META = {
  quick: { label: "Quiz Rapide", questions: 10, minutes: null, description: "10 questions pour un échauffement rapide" },
  practice: { label: "Entraînement", questions: 25, minutes: null, description: "25 questions pour consolider" },
  exam: { label: "Examen Blanc", questions: 65, minutes: 90, description: "65 questions, 90 minutes — conditions réelles" },
} as const;

export type QuizMode = keyof typeof MODE_META;
