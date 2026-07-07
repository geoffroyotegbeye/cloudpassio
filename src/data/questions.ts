export type Domain =
  | "Cloud Concepts"
  | "Security & Compliance"
  | "Cloud Technology & Services"
  | "Billing, Pricing & Support";

export type Difficulty = "Facile" | "Moyen" | "Difficile";
export type QuestionType = "single" | "multiple" | "scenario" | "case-study";

export interface Question {
  id: string;
  domain: Domain;
  service?: string;
  relatedServices?: string[];
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  scenario?: string;
  choices: { id: string; text: string }[];
  answer: string[]; // ids of correct choices
  explanation: string;
  whyWrong?: Record<string, string>;
  commonTrap?: string; // Le piège d'examen exploité par cette question
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
  // ============================================================
  // CLOUD CONCEPTS - 20 questions
  // ============================================================

  {
    id: "cc001",
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
      "Le passage du CAPEX à l'OPEX est l'un des six avantages fondamentaux du cloud. Vous n'immobilisez plus de capital en serveurs, stockage et infrastructure. Vous payez uniquement ce que vous consommez chaque mois (pay-as-you-go), ce qui améliore la flexibilité financière et permet une meilleure allocation des ressources.",
    whyWrong: {
      a: "Le cloud élimine justement le besoin d'investissements massifs en amont. Vous dimensionnez à la demande réelle.",
      c: "AWS gère l'infrastructure physique selon le modèle de responsabilité partagée. Vous ne gérez ni datacenters ni matériel.",
      d: "Le modèle AWS est pay-as-you-go, pas un abonnement fixe. Les coûts fluctuent avec votre consommation.",
    },
    commonTrap: "Confusion entre 'avoir du contrôle' et 'payer moins cher'. Le cloud réduit les coûts *parce qu'on délègue* le contrôle physique.",
    keywords: ["CAPEX", "OPEX", "pay-as-you-go", "6 avantages"],
    memoryTrick: "CAPEX → OPEX = Avantage #1 du cloud",
    docUrl: "https://aws.amazon.com/what-is-cloud-computing/",
    examProbability: "Élevée",
  },

  {
    id: "cc002",
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
      "Le pilier Fiabilité (Reliability) du Well-Architected Framework couvre la capacité d'un système à se rétablir automatiquement après une panne. Cela inclut l'auto-scaling, la multi-AZ, les health checks et la résilience. Les 5 piliers sont : Reliability, Security, Performance, Cost Optimization, Operational Excellence.",
    whyWrong: {
      a: "Excellence opérationnelle couvre l'automatisation, le monitoring et les bonnes pratiques opérationnelles, pas spécifiquement l'auto-recovery.",
      c: "Performance couvre la latence, le débit et l'efficacité, pas la résilience aux pannes.",
      d: "Optimisation des coûts couvre la réduction des dépenses, pas la remise automatique en état.",
    },
    keywords: ["Well-Architected", "Reliability", "Auto-recovery", "5 piliers"],
    memoryTrick: "Fiabilité = Résilience automatique aux pannes",
    examProbability: "Élevée",
  },

  {
    id: "cc003",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "multiple",
    prompt: "Quels sont les avantages directs de l'élasticité dans AWS ? (Choisir 2)",
    choices: [
      { id: "a", text: "Provisionner exactement la capacité nécessaire à chaque instant T" },
      { id: "b", text: "Réduire les coûts en évitant le sur-provisionnement et la sous-utilisation" },
      { id: "c", text: "Garantir un matériel physique dédié à votre application" },
      { id: "d", text: "Éliminer complètement la latence réseau entre utilisateurs et AWS" },
    ],
    answer: ["a", "b"],
    explanation:
      "L'élasticité est la capacité à scaler automatiquement vers le haut (scale-up) ou le bas (scale-down) selon la demande réelle. Elle résout deux problèmes : (1) vous ne surdimensionnez jamais = économies, (2) vous ne sous-dimensionnez jamais = performance constante. Exemple : e-commerce avec pics saisonniers — you scale down après Noël, réduisant les coûts. Vous scale-up avant Black Friday, gérant les pics sans panne.",
    whyWrong: {
      c: "Vous n'avez jamais de matériel dédié — c'est le contraire de l'élasticité. Vous partagez les ressources d'AWS, multipliées par 1000s d'autres clients.",
      d: "L'élasticité ne réduit pas la latence. CloudFront + Edge Locations font cela. Vous pouvez avoir 1000 instances EC2 en un lieu, la latence vers l'utilisateur reste la même.",
    },
    commonTrap: "Penser que l'élasticité = haute disponibilité ou performance réseau. Non — c'est juste du scaling de capacité.",
    keywords: ["élasticité", "scaling", "auto scaling", "capacity", "cost reduction"],
    memoryTrick: "Élasticité = passer de 1 à 1000 instances selon la charge",
    examProbability: "Élevée",
  },

  {
    id: "cc004",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Une région AWS est composée de plusieurs :",
    choices: [
      { id: "a", text: "Edge Locations (points de présence CDN)" },
      { id: "b", text: "Availability Zones (zones de disponibilité)" },
      { id: "c", text: "Local Zones uniquement" },
      { id: "d", text: "VPC (Virtual Private Cloud)" },
    ],
    answer: ["b"],
    explanation:
      "Une région AWS contient **au minimum 3 Availability Zones (AZ)** isolées géographiquement mais reliées par un réseau privé à très faible latence (< 1 ms). Chaque AZ est composée d'un ou plusieurs datacenters physiques indépendants. Cette architecture permet la haute disponibilité : si une AZ tombe, vos services restent en ligne dans les autres AZ (si vous avez deployé Multi-AZ).",
    whyWrong: {
      a: "Edge Locations sont des points de présence CDN (CloudFront), beaucoup plus nombreux (~400) et dispersés mondialement. Elles ne sont pas des AZ.",
      c: "Local Zones existent mais ne sont pas la composition standard d'une région. Local Zones offrent très faible latence à une ville spécifique.",
      d: "VPC est un réseau isolé créé *dans* une région, pas une composante de la région.",
    },
    commonTrap: "Confondre Edge Locations (CDN) et Availability Zones (datacenters). Les AZ sont pour HA, les Edge Locations pour la latence client.",
    keywords: ["Région", "AZ", "Availability Zone", "haute disponibilité"],
    memoryTrick: "Région ⊃ 3+ AZ ⊃ Datacenters. Région ≠ Edge Location",
    examProbability: "Élevée",
  },

  {
    id: "cc005",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "scenario",
    prompt: "Qu'est-ce qu'une Edge Location dans AWS ?",
    scenario:
      "Une entreprise média souhaite diffuser du contenu vidéo (films, séries) à des utilisateurs dans le monde entier avec la plus faible latence possible. Le contenu est stocké en eu-west-1, mais les utilisateurs sont répartis en Asie du Sud, Afrique, Amérique du Sud.",
    choices: [
      { id: "a", text: "Un datacenter contenant des serveurs EC2 et RDS" },
      { id: "b", text: "Un point de présence utilisé par CloudFront pour mettre en cache le contenu près de l'utilisateur" },
      { id: "c", text: "Un type d'Availability Zone étendue en zone urbaine" },
      { id: "d", text: "Une région AWS dédiée aux entreprises média" },
    ],
    answer: ["b"],
    explanation:
      "Les Edge Locations sont des points de présence (PoP) CDN utilisés par Amazon CloudFront et Route 53. Contrairement aux régions (3-4 par continent), il y a ~400 Edge Locations éparpillées mondialement, souvent dans les villes principales. Quand un utilisateur demande du contenu, CloudFront le sert depuis l'Edge Location la plus proche. Si le contenu est en cache, il est servi immédiatement (<10 ms). Sinon, l'Edge Location le récupère depuis l'origine (s3, ALB, etc.) une seule fois, puis le cache pour les prochaines requêtes.",
    whyWrong: {
      a: "Les Edge Locations ne contiennent pas de serveurs EC2/RDS complets — ce sont des caches CDN légers.",
      c: "Ce ne sont pas des extensions d'AZ. Les AZ sont des régions isolées avec tous les services AWS.",
      d: "Les Edge Locations sont generiques, utilisées par tous les secteurs.",
    },
    commonTrap: "Penser que vous déployez votre appli sur une Edge Location. Non — CloudFront *distribue* le contenu depuis votre origine.",
    relatedServices: ["CloudFront", "Route 53", "S3"],
    keywords: ["Edge", "CloudFront", "CDN", "latence", "cache", "PoP"],
    memoryTrick: "400 Edge Locations = cache CDN • 31 Régions = datacenters complets",
    examProbability: "Élevée",
  },

  {
    id: "cc006",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel est le model de service AWS pour AWS Lambda ?",
    choices: [
      { id: "a", text: "Infrastructure as a Service (IaaS)" },
      { id: "b", text: "Platform as a Service (PaaS)" },
      { id: "c", text: "Software as a Service (SaaS)" },
      { id: "d", text: "Function as a Service (FaaS) / Serverless" },
    ],
    answer: ["d"],
    explanation:
      "Lambda est Function as a Service (FaaS), une sous-catégorie du serverless. Vous écrivez du code (une fonction), vous la déployez, et AWS l'exécute à votre demande. Vous ne gérez ni le OS, ni les dépendances système, ni la scaling — juste votre fonction. Vous payez par invocation + durée. IaaS = vous gérez le OS (EC2). PaaS = vous gérez l'app (Elastic Beanstalk gère OS/runtime). FaaS = vous gérez juste le code.",
    whyWrong: {
      a: "IaaS = EC2, vous gérez l'OS. Vous avez accès au serveur.",
      b: "PaaS = Elastic Beanstalk, vous déployez l'app complète, AWS gère infrastructure. Vous avez toujours une 'machine'.",
      c: "SaaS = Salesforce, Gmail. Vous accédez via navigateur.",
    },
    commonTrap: "Confondre serverless et 'pas de serveur physique'. Les serveurs existent, AWS les gère juste.",
    relatedServices: ["Lambda", "API Gateway", "DynamoDB"],
    keywords: ["FaaS", "serverless", "Lambda", "pay-per-invocation"],
    memoryTrick: "IaaS > PaaS > FaaS = moins de management",
    examProbability: "Élevée",
  },

  {
    id: "cc007",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Lequel des éléments suivants est un service AWS RÉGIONAL (pas disponible aux Edge Locations) ?",
    choices: [
      { id: "a", text: "CloudFront" },
      { id: "b", text: "Route 53" },
      { id: "c", text: "EC2" },
      { id: "d", text: "IAM" },
    ],
    answer: ["c"],
    explanation:
      "EC2 est un service RÉGIONAL — vous créez une instance dans une région spécifique (us-east-1, eu-west-1, etc.). CloudFront et Route 53 sont GLOBAUX (vous les configurez une fois, ils fonctionnent partout). IAM est aussi GLOBAL (un utilisateur IAM fonctionne dans toutes les régions). Les services régionaux : EC2, RDS, S3 (buckets régionaux mais accessibles globalement), ECS, ALB, etc.",
    whyWrong: {
      a: "CloudFront est global — déployez une distribution, elle fonctionne partout.",
      b: "Route 53 est global — une zone DNS fonctionne partout.",
      d: "IAM est global — un utilisateur IAM a accès à toutes les régions.",
    },
    commonTrap: "Penser que S3 est global. S3 est RÉGIONAL — vous créez un bucket dans une région. Mais il est accessible depuis partout. Les Edge Locations l'accélèrent via CloudFront.",
    relatedServices: ["EC2", "RDS", "ALB", "CloudFront", "Route 53"],
    keywords: ["régional", "global", "service scope"],
    memoryTrick: "GLOBAL = IAM, CloudFront, Route 53 • RÉGIONAL = EC2, RDS, S3",
    examProbability: "Élevée",
  },

  {
    id: "cc008",
    domain: "Cloud Concepts",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Une entreprise souhaite déployer son application dans le cloud pour la première fois. Elle vient d'une infrastructure on-premise. Son directeur IT demande : 'Quel est l'avantage financier réel du cloud ?'",
    scenario:
      "L'entreprise actuallement dépense 2M€/an en CAPEX (serveurs, stockage, climatisation, personnel infrastructure) + 500k€/an en OPEX (électricité, maintenance, licences). Après migration AWS, elle paierait ~1.8M€/an en consommation cloud (compute, storage, bandwidth) + 300k€/an en personnel DevOps.",
    choices: [
      { id: "a", text: "Le cloud coûte moins cher immédiatement (économies instantanées)" },
      { id: "b", text: "Le CAPEX est éliminé, mais les coûts OPEX totaux sont similaires ou plus élevés" },
      { id: "c", text: "Le cloud est plus cher, mais offre une flexibilité permettant une croissance sans surcoûts" },
      { id: "d", text: "Les économies d'échelle AWS sont négligeables pour une petite entreprise" },
    ],
    answer: ["b"],
    explanation:
      "Cet exemple illustre une vérité importante souvent mal comprise : le cloud ne réduit pas *toujours* les coûts OPEX totaux d'une entreprise. L'avantage réel est l'élimination du CAPEX (pas d'investissement initial en hardware) et la flexibilité (vous payez selon votre consommation réelle, pas un pari sur la croissance future). Dans ce cas : CAPEX 2M€ éliminé (énorme avantage), mais OPEX passe de 500k€ à 2.1M€ (plus cher). Cependant, l'absence de CAPEX + flexibilité peut justifier le surcoût OPEX (pas de risque d'over-capacity). Le cloud gagne quand : (1) vous avez de forte variabilité de charge, (2) vous manquez de capital, (3) vous désirez scaler rapidement.",
    whyWrong: {
      a: "Faux. Le cloud n'est pas toujours moins cher. Il peut être plus cher en OPEX si on migre une charge stable.",
      c: "Trop vague et incorrect. Le 'surcoût accepté pour la flexibilité' n'est jamais la bonne réponse à l'examen.",
      d: "Les économies d'échelle AWS s'appliquent à TOUS, y compris les petites entreprises.",
    },
    commonTrap: "'Le cloud est moins cher' est un mythe. Le cloud est flexible et sans CAPEX, mais n'est pas garantir moins cher en OPEX total.",
    keywords: ["CAPEX", "OPEX", "ROI", "coût total", "flexibilité"],
    memoryTrick: "Cloud = pas de CAPEX, mais OPEX peut être plus élevé",
    examProbability: "Élevée",
  },

  {
    id: "cc009",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quels sont les 6 avantages du cloud computing selon AWS ?",
    choices: [
      { id: "a", text: "CAPEX→OPEX, latence réduite, économies d'échelle, élasticité, performance mondiale, pas de datacenter" },
      { id: "b", text: "CAPEX→OPEX, scalabilité illimitée, 99.99% uptime garanti, coûts matériel zéro, API gratuites, support gratuit" },
      { id: "c", text: "CAPEX→OPEX, économies d'échelle, élasticité, vitesse & agilité, déploiement global en minutes, pas de gestion datacenter" },
      { id: "d", text: "Coûts réduits, plus de sécurité, scalabilité infinie, 100% uptime, performance réseau, liberté complète" },
    ],
    answer: ["c"],
    explanation:
      "Les 6 avantages du cloud AWS sont exactement : (1) CAPEX → OPEX, (2) Économies d'échelle massives (AWS négocie mieux les coûts que vous), (3) Élasticité (ne pas guessing la capacité), (4) Vitesse & Agilité (time-to-market réduit), (5) Déploiement mondial en minutes (350+ points de présence), (6) Arrêt de la gestion des datacenters (IT peut se concentrer sur l'innovation, pas sur la maintenance du hardware).",
    whyWrong: {
      a: "Presque correct, mais 'latence réduite' n'est pas un des 6. CloudFront réduit la latence, c'est un service spécifique.",
      b: "Plusieurs faux : '99.99% uptime garanti' — AWS ne garantit pas d'uptime pour l'application (seulement pour les services). 'Coûts matériel zéro' — techniquement vrai mais ce n'est pas énoncé comme ça.",
      d: "Plusieurs faux : '100% uptime' — jamais garanti. 'Performance réseau' — pas un des 6. 'Liberté complète' — trop vague.",
    },
    commonTrap: "Confondre les 6 avantages avec les 5 piliers Well-Architected ou les caractéristiques de services spécifiques.",
    keywords: ["6 avantages", "CAPEX", "OPEX", "économies d'échelle", "élasticité", "agilité", "global"],
    memoryTrick: "6 avantages = CAPEX, Économies, Élasticité, Vitesse, Global, Pas-de-DC",
    examProbability: "Élevée",
  },

  {
    id: "cc010",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel modèle de déploiement cloud AWS combine on-premise et AWS ?",
    choices: [
      { id: "a", text: "Public Cloud" },
      { id: "b", text: "Private Cloud" },
      { id: "c", text: "Hybrid Cloud" },
      { id: "d", text: "Community Cloud" },
    ],
    answer: ["c"],
    explanation:
      "Hybrid Cloud = fusion on-premise (données sensibles, legacy systems) + AWS (applications modernes, scalabilité). Exemple : base de données sensible reste on-premise, mais l'appli web scale sur AWS. Services AWS pour l'hybrid : AWS Outposts (AWS datacenter dans votre batiment), AWS Direct Connect (connexion dédiée), Storage Gateway (cache on-premise de S3).",
    whyWrong: {
      a: "Public Cloud = tout sur AWS, pas de on-premise.",
      b: "Private Cloud = on-premise avec tools AWS (OpenStack, VMware). Techniquement pas AWS.",
      d: "Community Cloud = partage entre organisations similaires (santé, gouvernement). Rare.",
    },
    keywords: ["Hybrid", "on-premise", "AWS Outposts", "Direct Connect"],
    memoryTrick: "Hybrid = on-prem + AWS mélangés",
    examProbability: "Moyenne",
  },

  {
    id: "cc011",
    domain: "Cloud Concepts",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Qu'est-ce que l'AWS Shared Responsibility Model ? (Choisir 2)",
    choices: [
      { id: "a", text: "AWS est responsable de TOUT (sécurité hardware et logiciel)" },
      { id: "b", text: "AWS gère la sécurité DU cloud (infrastructure, région, AZ)" },
      { id: "c", text: "Le client gère la sécurité DANS le cloud (données, IAM, chiffrement app)" },
      { id: "d", text: "Les responsabilités dépendent entièrement du service utilisé (IaaS vs PaaS vs SaaS)" },
    ],
    answer: ["b", "d"],
    explanation:
      "Le Shared Responsibility Model dit : (1) AWS gère la sécurité *de* l'infrastructure cloud (hardware, datacenters, régions, AZ, hyperviseur). (2) Le client gère la sécurité *de* son déploiement (données, IAM, chiffrement, patching du guest OS). (3) Les responsabilités varient PAR SERVICE : — IaaS (EC2) : vous patchez l'OS — PaaS (Elastic Beanstalk) : AWS patche l'OS, vous patchez l'app — SaaS (Salesforce) : AWS gère presque tout.",
    whyWrong: {
      a: "Non. AWS ne gère pas vos données, IAM, ou configuration applicative.",
      c: "Vrai, mais pas complet. Ce n'est qu'une moitié du modèle.",
    },
    commonTrap: "Penser que 'sécurité du cloud' = 'sécurité sur le cloud'. Non. DU = infrastructure. DANS = votre application.",
    keywords: ["Shared Responsibility", "sécurité cloud", "IAM", "données"],
    memoryTrick: "AWS = du cloud • Client = dans le cloud",
    examProbability: "Élevée",
  },

  {
    id: "cc012",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel composant AWS est responsable du contrôle d'accès logique aux ressources (utilisateurs, permissions) ?",
    choices: [
      { id: "a", text: "Security Groups (pare-feu réseau)" },
      { id: "b", text: "Network ACL (contrôle d'accès réseau)" },
      { id: "c", text: "AWS IAM (Identity and Access Management)" },
      { id: "d", text: "AWS KMS (Key Management Service)" },
    ],
    answer: ["c"],
    explanation:
      "IAM gère les identités (utilisateurs, groupes, rôles) et les permissions granulaires (quels utilisateurs peuvent faire quoi sur quelles ressources). IAM est au niveau LOGIQUE (qui peut accéder). Security Groups et NACL sont au niveau RÉSEAU (quel trafic est autorisé). KMS gère les clés de chiffrement.",
    whyWrong: {
      a: "Security Groups filtrent le trafic réseau (ports, protocoles), pas les permissions logiques.",
      b: "NACL est au niveau sous-réseau, filtre du trafic.",
      d: "KMS chiffre les données en transit/au repos, ne gère pas les utilisateurs.",
    },
    keywords: ["IAM", "identité", "permissions", "contrôle d'accès"],
    memoryTrick: "IAM = qui. SG = quel trafic. KMS = clés de chiffrement",
    examProbability: "Élevée",
  },

  {
    id: "cc013",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous concevez une architecture pour une plateforme de streaming vidéo mondiale avec millions d'utilisateurs et pics de charge imprévisibles.",
    scenario:
      "Le contenu vidéo (4K, haute bitrate) doit être accessible en <2s depuis n'importe où. Les utilisateurs sont répartis uniformément entre Amérique du Nord, Europe, Asie. La charge varie : millions d'utilisateurs pendant les heures de prime time, très peu la nuit.",
    choices: [
      { id: "a", text: "Déployer une région unique en us-east-1 avec EC2 Auto Scaling" },
      { id: "b", text: "Utiliser CloudFront pour cacher le contenu + S3 pour stocker + Lambda pour l'encoding" },
      { id: "c", text: "Déployer dans 3 régions (us, eu, ap) avec ALB et failover multi-région" },
      { id: "d", text: "CloudFront + S3 + API Gateway + Lambda pour l'API, avec Auto Scaling en multi-région" },
    ],
    answer: ["d"],
    explanation:
      "La meilleure approche combine : CloudFront (400 Edge Locations, cache local, <2s garanti), S3 dans une région primaire (coût réduit, stockage centralisé), API Gateway + Lambda (serverless, scale 0→1M requêtes), Auto Scaling pour les pics. Les 3 régions (option C) sont coûteuses et inutiles si vous avez CloudFront. AWS optimise : cache CDN = basse latence, Auto Scaling = flexibilité de charge, serverless = pas de maintenance.",
    whyWrong: {
      a: "Une seule région ne peut pas servir <2s globalement. Latence EU/APAC serait 50-150ms.",
      b: "Lambda pour l'encoding vidéo est une très mauvaise idée (timeout 15 min, coûts énormes). Utilisez MediaConvert.",
      c: "Multi-région coûteux et complexe. CloudFront suffit.",
    },
    commonTrap: "'Latence basse' = 'plusieurs régions'. Non. CloudFront = une région + 400 Edge Locations.",
    relatedServices: ["CloudFront", "S3", "API Gateway", "Lambda", "Auto Scaling"],
    keywords: ["CDN", "Edge", "latence", "scaling", "serverless"],
    memoryTrick: "Latence globale → CloudFront. Pics de charge → Auto Scaling. Pas besoin de multi-région.",
    examProbability: "Élevée",
  },

  {
    id: "cc014",
    domain: "Cloud Concepts",
    difficulty: "Difficile",
    type: "single",
    prompt: "Vous migrez une application legacy on-premise vers AWS. Quel est le service AWS recommandé pour une migration 'lift-and-shift' minimal effort ?",
    choices: [
      { id: "a", text: "AWS EC2 (migrer les VMs tel quel)" },
      { id: "b", text: "AWS Application Migration Service (MGN)" },
      { id: "c", text: "AWS DataSync (synchroniser les données)" },
      { id: "d", text: "AWS DMS (database migration service)" },
    ],
    answer: ["b"],
    explanation:
      "AWS Application Migration Service (MGN, ancien nom CloudEndure) est l'outil de migration 'lift-and-shift' — vous pointez votre serveur on-premise, MGN crée une AMI (image machine) automatiquement, puis vous testez et lancez. C'est minimaliste, peu de modification d'app. EC2 seul ne migre rien — c'est juste une instance vide. DataSync = données. DMS = bases de données. MGN = applications entières.",
    whyWrong: {
      a: "EC2 tout seul n'est pas un service de migration. Vous devez configurer tout manuellement.",
      c: "DataSync est pour synchroniser des données, pas les applications.",
      d: "DMS est spécifique aux bases de données, pas aux applications.",
    },
    commonTrap: "Penser que créer une EC2 = migration. Non, c'est juste créer une instance vide.",
    relatedServices: ["EC2", "MGN", "DataSync", "DMS"],
    keywords: ["migration", "lift-and-shift", "MGN", "CloudEndure"],
    examProbability: "Moyenne",
  },

  {
    id: "cc015",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS permet d'optimiser automatiquement les coûts en recommandant des réservations et des changements d'instance ?",
    choices: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "AWS Compute Optimizer" },
      { id: "d", text: "AWS Budgets" },
    ],
    answer: ["c"],
    explanation:
      "AWS Compute Optimizer analyse votre historique de charge (CPU, mémoire, réseau) et recommande les types d'instance optimaux + Reserved Instances. Exemple : vous tournez des t3.large sous-utilisées → Compute Optimizer recommande des t3.small + économies de 60%. Cost Explorer = visualisation. Trusted Advisor = vérifications de config (sécurité, perf). Budgets = alertes.",
    whyWrong: {
      a: "Trusted Advisor vérifie les configurations (security groups trop ouverts, etc.), pas l'optimisation de compute.",
      b: "Cost Explorer visualise les dépenses, ne recommande pas d'optimisations.",
      d: "Budgets envoie des alertes quand vous dépassez un seuil, ne recommande pas d'optimisations.",
    },
    commonTrap: "Confondre 'Compute Optimizer' et 'Cost Explorer'. Compute Optimizer = recommandations. Cost Explorer = rapports.",
    relatedServices: ["EC2", "Reserved Instances", "Compute Optimizer"],
    keywords: ["Compute Optimizer", "cost optimization", "recommendations"],
    examProbability: "Moyenne",
  },

  {
    id: "cc016",
    domain: "Cloud Concepts",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Quels services AWS sont SANS COÛTS pour une petite utilisation ? (Choisir 2)",
    choices: [
      { id: "a", text: "AWS Lambda (1M invocations/mois gratuites)" },
      { id: "b", text: "AWS S3 (1 TB de stockage gratuit/mois)" },
      { id: "c", text: "AWS RDS (la base de données est toujours payante, pas de free tier généreux)" },
      { id: "d", text: "Amazon DynamoDB (25 GB de stockage gratuit/mois)" },
    ],
    answer: ["a", "d"],
    explanation:
      "AWS Lambda free tier : 1M invocations/mois + 400,000 GB-secondes compute. Si vous avez 1000 requêtes/jour × 1 seconde, c'est ~30K invocations/mois = gratuit. DynamoDB free tier : 25 GB stockage + 25 unités RCU + 25 unités WCU/mois. Pour une appli petit traffic, c'est gratuit.",
    whyWrong: {
      b: "S3 free tier = 5 GB (pas 1 TB). Petit free tier.",
      c: "RDS n'a pas de free tier généreux. Même une micro instance coûte ~$10/mois.",
    },
    keywords: ["free tier", "Lambda", "DynamoDB", "serverless"],
    examProbability: "Moyenne",
  },

  {
    id: "cc017",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "single",
    prompt: "Lequel des éléments suivants décrit l'avantage SPEED du cloud AWS ?",
    choices: [
      { id: "a", text: "Déployer une infrastructure en quelques heures au lieu de mois on-premise" },
      { id: "b", text: "Les données sont transmises plus vite vers les utilisateurs" },
      { id: "c", text: "Les applications cloudnatives s'exécutent plus rapidement que on-premise" },
      { id: "d", text: "Les requêtes API sont traitées instantanément sans latence" },
    ],
    answer: ["a"],
    explanation:
      "L'avantage SPEED (ou 'Vitesse & Agilité') du cloud = time-to-market réduit. On-premise : 3-6 mois pour commander, recevoir, installer, configurer du hardware. AWS : 15 minutes pour créer une instance, configurer une app, lancer en production. C'est un avantage commercial énorme : vous innovez vite.",
    whyWrong: {
      b: "Les données ne sont pas 'transmises plus vite'. CloudFront les met en cache, réduisant la latence. Mais c'est un avantage séparé.",
      c: "Être cloudnative n'accélère pas l'exécution. C'est une architecture, pas une vitesse.",
      d: "Aucune requête n'est instantanée (latence ≥ 1 ms).",
    },
    keywords: ["Speed", "time-to-market", "agilité", "innovation"],
    memoryTrick: "Speed = déploiement en heures, pas en mois",
    examProbability: "Moyenne",
  },

  {
    id: "cc018",
    domain: "Cloud Concepts",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel élément ne fait PAS partie des 5 piliers du AWS Well-Architected Framework ?",
    choices: [
      { id: "a", text: "Reliability (Fiabilité)" },
      { id: "b", text: "Scalability (Scalabilité)" },
      { id: "c", text: "Operational Excellence (Excellence opérationnelle)" },
      { id: "d", text: "Cost Optimization (Optimisation des coûts)" },
    ],
    answer: ["b"],
    explanation:
      "Les 5 piliers officiels sont : (1) Reliability, (2) Security, (3) Performance Efficiency, (4) Cost Optimization, (5) Operational Excellence. Scalability est un concept clé mais n'est pas un pilier officiel distinct — c'est couvert dans 'Reliability' (résilience) et 'Performance'.",
    whyWrong: {
      a: "Reliability est pilier #1.",
      c: "Operational Excellence est pilier #5.",
      d: "Cost Optimization est pilier #4.",
    },
    keywords: ["Well-Architected", "5 piliers"],
    memoryTrick: "5 piliers = R.S.P.C.O. (Reliability, Security, Performance, Cost, Operational)",
    examProbability: "Moyenne",
  },

  {
    id: "cc019",
    domain: "Cloud Concepts",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Une startuptech veut lancer un MVP en 2 semaines sur AWS pour competitor avec des acteurs établis. Quel principal avantage du cloud justifie ce timeline ?",
    choices: [
      { id: "a", text: "Le coût réduit du cloud permet d'embaucher plus vite" },
      { id: "b", text: "La vitesse de déploiement : pas de hardware à commander/installer" },
      { id: "c", text: "AWS a des datacenters partout, réduisant la latence" },
      { id: "d", text: "Le cloud est automatiquement sécurisé par AWS" },
    ],
    answer: ["b"],
    explanation:
      "Dans un timeline court, le facteur critique est le temps. On-premise : 4-6 mois pour hardware. AWS : créer une infra complexe en heures. La startup peut se concentrer sur le code, pas sur l'infrastructure. C'est l'avantage 'Speed/Agilité'.",
    whyWrong: {
      a: "Coût réduit n'accélère pas les embauches en 2 semaines.",
      c: "La latence n'est pas un problème pour un MVP.",
      d: "Sécurité est importante mais n'impacte pas un timeline court.",
    },
    commonTrap: "Confondre 'cloud réduit les coûts' avec 'cloud accélère le time-to-market'. Ce sont deux avantages distincts.",
    keywords: ["speed", "time-to-market", "MVP", "agilité"],
    examProbability: "Moyenne",
  },

  {
    id: "cc020",
    domain: "Cloud Concepts",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel est le modèle de tarification AWS par défaut pour EC2 ?",
    choices: [
      { id: "a", text: "Payer par heure (On-Demand)" },
      { id: "b", text: "Payer par seconde (On-Demand)" },
      { id: "c", text: "Payer par minute (On-Demand)" },
      { id: "d", text: "Abonnement annuel obligatoire" },
    ],
    answer: ["b"],
    explanation:
      "EC2 On-Demand est facturé par SECONDE (depuis 2017, c'était par heure avant). Une instance de 30 secondes = 30 secondes facturées. Cela améliore la flexibilité pour les tests courts, les batch jobs. Reserved Instances = contrats 1/3 ans (remise 30-70%).",
    whyWrong: {
      a: "Ancienne facturation (pré-2017).",
      c: "Aucun service AWS ne facture à la minute.",
      d: "On-Demand = pas d'engagement. Reserved = engagement optionnel.",
    },
    keywords: ["On-Demand", "facturation", "seconde", "EC2"],
    examProbability: "Élevée",
  },

  // ============================================================
  // SECURITY & COMPLIANCE - 30 questions
  // ============================================================

  {
    id: "sc001",
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
      "AWS Identity and Access Management (IAM) est le service qui gère les identités (utilisateurs, groupes, rôles) et les autorisations granulaires (policies). IAM est GLOBAL — un utilisateur IAM fonctionne dans toutes les régions. KMS = chiffrement. Shield = DDoS. Config = conformité.",
    whyWrong: {
      b: "KMS gère les clés de chiffrement, pas les utilisateurs.",
      c: "Shield protège contre les attaques DDoS.",
      d: "Config vérifie la conformité des ressources.",
    },
    keywords: ["IAM", "identité", "permissions", "utilisateurs"],
    examProbability: "Élevée",
  },

  {
    id: "sc002",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt:
      "Selon le modèle de responsabilité partagée, qui est responsable du chiffrement des données CÔTÉ CLIENT sur S3 ?",
    choices: [
      { id: "a", text: "AWS (AWS gère le chiffrement au repos sur ses serveurs)" },
      { id: "b", text: "Le client (il doit chiffrer avant d'envoyer à S3)" },
      { id: "c", text: "Partagé équitablement 50/50" },
      { id: "d", text: "Le fournisseur d'accès Internet" },
    ],
    answer: ["b"],
    explanation:
      "Chiffrement côté client = vous chiffrez le fichier avant de l'uploader sur S3 (avec votre clé privée). C'est votre responsabilité. AWS peut aussi chiffrer au repos (SSE-S3, SSE-KMS) = chiffrement côté serveur AWS. Modèle : AWS gère la sécurité *DE* l'infrastructure (datacenters, hyperviseurs). Vous gérez la sécurité *DANS* votre déploiement (données, IAM, chiffrement app).",
    whyWrong: {
      a: "AWS gère le chiffrement SERVER-SIDE. Client-side c'est vous.",
      c: "Ce n'est pas partagé. Client-side = client.",
      d: "L'ISP n'est jamais responsable des données AWS.",
    },
    commonTrap: "Confondre SSE (Server-Side Encryption) et chiffrement client-side. SSE = AWS gère. Client-side = vous.",
    relatedServices: ["S3", "KMS"],
    keywords: ["Shared Responsibility", "chiffrement client", "chiffrement serveur", "S3"],
    memoryTrick: "Côté CLIENT = ton problème. Côté SERVER = AWS",
    examProbability: "Élevée",
  },

  {
    id: "sc003",
    domain: "Security & Compliance",
    service: "Shield",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS protège contre les attaques DDoS de manière automatique ET GRATUITE pour tous les clients ?",
    choices: [
      { id: "a", text: "AWS WAF (Web Application Firewall)" },
      { id: "b", text: "AWS Shield Standard" },
      { id: "c", text: "Amazon GuardDuty" },
      { id: "d", text: "Amazon Inspector" },
    ],
    answer: ["b"],
    explanation:
      "AWS Shield Standard est activé automatiquement et GRATUITEMENT pour TOUS les clients AWS. Il protège contre les attaques DDoS couches 3/4 (volumétriques). Shield Advanced est payant (~$3000/mois) et offre une protection étendue (couche 7, support 24/7, assurance). WAF = pare-feu applicatif (couche 7, injection SQL, XSS). GuardDuty = détection de menaces ML. Inspector = vulnérabilités.",
    whyWrong: {
      a: "WAF filtre le trafic applicatif (SQL injection, XSS), pas les attaques volumétriques brutes.",
      c: "GuardDuty détecte les menaces via ML (CloudTrail logs, VPC Flow), ne les bloque pas activement.",
      d: "Inspector évalue les vulnérabilités EC2/ECR, pas DDoS.",
    },
    commonTrap: "'DDoS' peut signifier couche 3 (volumétrique, Shield) ou couche 7 (applicatif, WAF). Shield Standard = layer 3/4.",
    relatedServices: ["Shield", "WAF", "DDoS", "CloudFront"],
    keywords: ["Shield", "DDoS", "gratuit", "Standard", "Advanced"],
    memoryTrick: "Shield Standard = gratuit. Shield Advanced = payant mais plus fort",
    examProbability: "Élevée",
  },

  {
    id: "sc004",
    domain: "Security & Compliance",
    service: "WAF",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous protégez une application web contre les attaques par injection SQL et XSS (cross-site scripting).",
    scenario:
      "Un attaquant essaie d'injecter du code JavaScript dans un formulaire : <script>alert('hacked')</script>. Un autre tente une injection SQL : ' OR '1'='1.",
    choices: [
      { id: "a", text: "AWS Shield Standard bloquera automatiquement ces attaques" },
      { id: "b", text: "AWS WAF peut bloquer ces patterns applicatifs au niveau couche 7" },
      { id: "c", text: "Security Groups peut bloquer ces attaques" },
      { id: "d", text: "Il faut un code applicatif pour valider les inputs (AWS ne peut pas le faire)" },
    ],
    answer: ["b"],
    explanation:
      "AWS WAF (Web Application Firewall) fonctionne à la couche 7 (applicative) et peut détecter/bloquer : SQL injection, XSS, CSRF, etc. via des règles (patterns regex, IP blacklist, rate limiting). Shield Standard (couche 3/4) ne les bloque pas. Security Groups (couche 4) ne regardent que les ports/protocoles. Validation applicative est idéale, mais WAF est une couche défense-en-profondeur.",
    whyWrong: {
      a: "Shield Standard ne regarde pas la payload applicative. Il bloque les attaques volumétriques brutes.",
      c: "Security Groups ne voient que les ports/protocoles, pas le contenu applicatif.",
      d: "Techniquement correct que la validation app soit idéale, mais WAF offre une protection sans changer le code.",
    },
    commonTrap: "Confondre Shield (DDoS couche 3) et WAF (attaques applicatives couche 7).",
    relatedServices: ["WAF", "Shield", "ALB"],
    keywords: ["WAF", "injection SQL", "XSS", "couche 7", "applicative"],
    memoryTrick: "Shield = DDoS. WAF = attaques app (SQL, XSS)",
    examProbability: "Moyenne",
  },

  {
    id: "sc005",
    domain: "Security & Compliance",
    service: "GuardDuty",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS utilise le machine learning pour détecter les MENACES anormales sur un compte AWS ?",
    choices: [
      { id: "a", text: "AWS WAF" },
      { id: "b", text: "Amazon Inspector" },
      { id: "c", text: "Amazon GuardDuty" },
      { id: "d", text: "AWS Macie" },
    ],
    answer: ["c"],
    explanation:
      "GuardDuty analyse en continu les logs (CloudTrail, VPC Flow Logs, DNS queries) via machine learning pour détecter comportements anormaux : tentatives d'authentification échouées récurrentes, port scans, communications vers IPs de botnet, accès à des ressources via credential compromise, etc. Il alerté mais ne bloque pas — c'est de la DÉTECTION.",
    whyWrong: {
      a: "WAF bloque les attaques applicatives (SQL, XSS).",
      b: "Inspector évalue les vulnérabilités des instances/images, pas les comportements anormaux du compte.",
      d: "Macie détecte les données SENSIBLES (PII) dans S3, pas les menaces d'accès.",
    },
    commonTrap: "'Détection' ≠ 'blocage'. GuardDuty détecte. WAF/Shield bloquent.",
    relatedServices: ["GuardDuty", "CloudTrail", "VPC Flow Logs"],
    keywords: ["GuardDuty", "ML", "détection", "menaces"],
    memoryTrick: "GuardDuty = chien de garde intelligent (détecte)",
    examProbability: "Élevée",
  },

  {
    id: "sc006",
    domain: "Security & Compliance",
    service: "Macie",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous gérez un bucket S3 contenant des milliers de fichiers. Vous devez identifier automatiquement les fichiers contenant des données personnelles sensibles (numéros de sécurité sociale, numéros de carte bancaire, emails, adresses).",
    choices: [
      { id: "a", text: "Uploader les fichiers et laisser GuardDuty les analyser" },
      { id: "b", text: "Amazon Macie scanne S3 et détecte les données sensibles (PII)" },
      { id: "c", text: "AWS Config vérifie que le bucket est public/privé" },
      { id: "d", text: "Écrire un script pour parser manuellement chaque fichier" },
    ],
    answer: ["b"],
    explanation:
      "Amazon Macie est un service de découverte de données sensibles. Il scanne automatiquement S3, détecte les patterns PII (SSN, numéro de carte, emails, addresses, etc.), et génère des alertes. C'est l'outil idéal pour la conformité RGPD/CCPA. GuardDuty = menaces d'accès. Macie = données sensibles.",
    whyWrong: {
      a: "GuardDuty analyse les logs de menaces, pas le contenu des fichiers.",
      c: "Config vérifie les configurations (policies, encryption), pas les données.",
      d: "C'est possible mais manuel et non scalable pour 1000s de fichiers.",
    },
    commonTrap: "Confondre Macie (données sensibles) et GuardDuty (menaces d'accès).",
    relatedServices: ["Macie", "S3", "RGPD"],
    keywords: ["Macie", "PII", "données sensibles", "S3", "compliance"],
    memoryTrick: "Macie = trouver les données sensibles dans S3",
    examProbability: "Moyenne",
  },

  {
    id: "sc007",
    domain: "Security & Compliance",
    service: "KMS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS gère les clés de chiffrement pour l'encryption au repos et en transit ?",
    choices: [
      { id: "a", text: "AWS IAM" },
      { id: "b", text: "AWS KMS (Key Management Service)" },
      { id: "c", text: "AWS Secrets Manager" },
      { id: "d", text: "AWS Certificate Manager" },
    ],
    answer: ["b"],
    explanation:
      "AWS KMS (Key Management Service) crée, stocke et gère les clés de chiffrement master (CMK). Vous utilisez KMS pour : SSE-S3/S3 encryption, EBS volume encryption, RDS encryption, Secrets Manager. KMS est RÉGIONAL. Vous contrôlez qui peut utiliser les clés via IAM policies. Secrets Manager = stockage de secrets (DB passwords, API keys). Certificate Manager = certificats SSL/TLS.",
    whyWrong: {
      a: "IAM gère les utilisateurs/permissions, pas les clés de chiffrement.",
      c: "Secrets Manager stocke les secrets (passwords), utilise KMS pour les chiffrer.",
      d: "Certificate Manager gère les certificats SSL/TLS, pas les clés KMS.",
    },
    commonTrap: "Penser que 'clé' = 'secret'. Non. KMS gère les clés de CHIFFREMENT. Secrets Manager gère les secrets.",
    relatedServices: ["KMS", "S3", "RDS", "EBS"],
    keywords: ["KMS", "clés de chiffrement", "encryption", "master key"],
    memoryTrick: "KMS = clés. Secrets Manager = secrets",
    examProbability: "Élevée",
  },

  {
    id: "sc008",
    domain: "Security & Compliance",
    service: "Secrets Manager",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre application a besoin d'une clé d'API tierce (Stripe, Twilio) pour fonctionner. Vous ne voulez pas hardcoder la clé dans le code source.",
    choices: [
      { id: "a", text: "Stocker la clé en variable d'environnement EC2" },
      { id: "b", text: "Mettre la clé dans Secrets Manager avec rotation automatique" },
      { id: "c", text: "Stocker la clé chiffrée en S3 public" },
      { id: "d", text: "Demander à l'utilisateur de la saisir au démarrage" },
    ],
    answer: ["b"],
    explanation:
      "AWS Secrets Manager est le service pour stocker/gérer les secrets (API keys, DB passwords, tokens OAuth). Vous créez un secret, l'application le demande via l'API Secrets Manager (IAM autorise), il est chiffré avec KMS, et rotation automatique peut se déclencher. C'est beaucoup plus sûr que des variables d'environnement ou du S3.",
    whyWrong: {
      a: "Les variables d'env EC2 sont visibles dans les logs/outils et non chiffrées.",
      c: "S3 public = accessible par tous. Insécurisé. Privé serait un peu mieux mais Secrets Manager est idéal.",
      d: "Peu pratique et non automatable.",
    },
    commonTrap: "Penser que S3 privé ou variables d'env suffisent. Secrets Manager = rotation auto + chiffrement.",
    relatedServices: ["Secrets Manager", "KMS", "IAM"],
    keywords: ["Secrets Manager", "API keys", "rotation", "chiffrement"],
    examProbability: "Moyenne",
  },

  {
    id: "sc009",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS permet de tracer TOUTES les appels API sur votre compte AWS ?",
    choices: [
      { id: "a", text: "Amazon CloudWatch" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "AWS VPC Flow Logs" },
      { id: "d", text: "AWS X-Ray" },
    ],
    answer: ["b"],
    explanation:
      "CloudTrail enregistre TOUTES les appels API effectués sur votre compte AWS (qui a appelé quoi, quand, depuis quel IP, quel résultat). Obligatoire pour audit/conformité. CloudWatch = métriques/logs applicatifs. VPC Flow Logs = trafic réseau EC2. X-Ray = tracing applicatif distribué.",
    whyWrong: {
      a: "CloudWatch collecte les métriques (CPU) et logs applicatifs, pas les appels AWS API.",
      c: "VPC Flow Logs enregistrent le trafic réseau (src IP, dest IP, bytes), pas les appels API.",
      d: "X-Ray trace les appels entre services applicatifs, pas les appels AWS API.",
    },
    commonTrap: "Confondre CloudWatch, CloudTrail, VPC Flow Logs. Ils tracent des choses différentes.",
    relatedServices: ["CloudTrail", "CloudWatch", "VPC"],
    keywords: ["CloudTrail", "audit", "API", "logging"],
    memoryTrick: "Trail = tracer les API AWS • Watch = métriques applicatives",
    examProbability: "Élevée",
  },

  {
    id: "sc010",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS gère les certificats SSL/TLS pour HTTPS ?",
    choices: [
      { id: "a", text: "AWS Certificate Manager" },
      { id: "b", text: "AWS KMS" },
      { id: "c", text: "AWS Secrets Manager" },
      { id: "d", text: "AWS WAF" },
    ],
    answer: ["a"],
    explanation:
      "AWS Certificate Manager (ACM) crée, renouvelle automatiquement et gère les certificats SSL/TLS gratuitement. Vous l'utilisez pour HTTPS sur ALB, CloudFront, API Gateway, etc. ACM valide automatiquement le renouvellement (60 jours avant expiration). C'est gratuit. Un certificat auto-signé coûterait un temps/effort.",
    whyWrong: {
      b: "KMS = clés de chiffrement data, pas certificats.",
      c: "Secrets Manager = secrets applicatifs.",
      d: "WAF = pare-feu applicatif.",
    },
    keywords: ["Certificate Manager", "SSL", "TLS", "HTTPS"],
    examProbability: "Moyenne",
  },

  {
    id: "sc011",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Quels éléments font partie des meilleures pratiques IAM AWS ? (Choisir 2)",
    choices: [
      { id: "a", text: "Créer un seul utilisateur root et le partager entre administrateurs" },
      { id: "b", text: "Utiliser des rôles IAM pour les services AWS (EC2, Lambda) au lieu de clés d'accès" },
      { id: "c", text: "Activer MFA (Multi-Factor Authentication) sur le compte root" },
      { id: "d", text: "Donner la permission AdministratorAccess à tous les utilisateurs pour flexibilité" },
    ],
    answer: ["b", "c"],
    explanation:
      "Meilleures pratiques IAM : (1) Activer MFA sur root + utilisateurs importants. (2) Utiliser des rôles IAM pour les services (EC2 assume-role, Lambda assume-role) au lieu de hard-coder des clés d'accès dans le code. (3) Least privilege = permissions minimales. (4) Rotation des clés d'accès régulière. (5) Utiliser Secrets Manager pour stocker les clés sensibles.",
    whyWrong: {
      a: "JAMAIS partager le compte root. C'est un secret gardé très sérieusement.",
      d: "Pire pratique. Least privilege = permissions minimales.",
    },
    commonTrap: "'Flexibilité' via permissions larges = catastrophe sécurité. Les bonnes pratiques privilégient la sécurité.",
    relatedServices: ["IAM", "MFA"],
    keywords: ["IAM", "MFA", "rôles", "least privilege"],
    examProbability: "Élevée",
  },

  {
    id: "sc012",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre instance EC2 doit accéder à un bucket S3 privé pour lire des fichiers de configuration. Comment autoriser cet accès de manière sécurisée ?",
    choices: [
      { id: "a", text: "Mettre les clés d'accès AWS dans le code EC2" },
      { id: "b", text: "Créer une policy IAM et l'attacher à une instance profile (rôle EC2)" },
      { id: "c", text: "Rendre le bucket S3 public avec contrôle d'accès par IP" },
      { id: "d", text: "Stocker les clés d'accès en variables d'environnement EC2" },
    ],
    answer: ["b"],
    explanation:
      "Le flux sécurisé : (1) Créer une policy IAM autorisant s3:GetObject sur le bucket. (2) Créer un rôle IAM 'S3ReadRole'. (3) Attacher la policy au rôle. (4) Lancer l'instance EC2 avec une 'instance profile' attachée au rôle. (5) L'EC2 peut maintenant lire S3 sans clés d'accès — AWS crée automatiquement des tokens temporaires. C'est la way de faire.",
    whyWrong: {
      a: "Hardcoder les clés dans le code source = catastrophe si le code est exposé/archivé.",
      c: "S3 public = accessible par tous, grave faille.",
      d: "Variables d'env peuvent être loggées, leaking les clés.",
    },
    commonTrap: "Penser que 'des clés stockées quelque part' sur l'instance = ok. Non. Rôles IAM = zero clés stockées.",
    relatedServices: ["EC2", "IAM", "S3"],
    keywords: ["IAM role", "instance profile", "assume role", "temporary credentials"],
    memoryTrick: "EC2 + S3 = IAM role. Jamais de clés hardcodées.",
    examProbability: "Élevée",
  },

  {
    id: "sc013",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "single",
    prompt: "Quel document AWS décrit la conformité et les certifications de sécurité (SOC, ISO, PCI-DSS, HIPAA) d'AWS ?",
    choices: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Artifact" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Compliance Center" },
    ],
    answer: ["b"],
    explanation:
      "AWS Artifact est le portail d'accès aux rapports de conformité et audits d'AWS : SOC 1/2, ISO 27001, PCI-DSS, HIPAA, etc. Vous pouvez télécharger les rapports pour montrer à vos clients/auditeurs que AWS respecte ces standards. Trusted Advisor = vérifications (sécurité, perf). Config = tracking de config. Compliance Center = ressources générales sur la conformité.",
    whyWrong: {
      a: "Trusted Advisor = vérifications, pas certificats.",
      c: "Config = tracking, pas certifications.",
      d: "Compliance Center = ressources éducatives, pas les documents officiels.",
    },
    keywords: ["Artifact", "compliance", "SOC", "ISO", "certification"],
    memoryTrick: "Artifact = les artefacts de conformité téléchargeables",
    examProbability: "Élevée",
  },

  {
    id: "sc014",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS analyse les configurations des ressources pour vérifier la conformité à vos règles métier ?",
    choices: [
      { id: "a", text: "AWS Config" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "AWS Inspector" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    answer: ["a"],
    explanation:
      "AWS Config enregistre les configurations de toutes les ressources (EC2, S3, RDS, IAM, etc.) et vérifie la conformité à vos règles (Config Rules). Exemple : 'tous les security groups doivent interdire le SSH en 0.0.0.0/0'. Config alerté si quelqu'un change la config. C'est pour la conformité",
    whyWrong: {
      b: "CloudTrail = qui a fait quoi (API).",
      c: "Inspector = vulnérabilités.",
      d: "Trusted Advisor = vérifications high-level.",
    },
    keywords: ["AWS Config", "compliance", "règles", "configuration"],
    examProbability: "Moyenne",
  },

  {
    id: "sc015",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre entreprise doit respecter PCI-DSS (stockage de données de cartes bancaires). Où stockeriez-vous les numéros de carte pour qu'ils soient sécurisés et conformes ?",
    choices: [
      { id: "a", text: "En base de données RDS standard sans chiffrement" },
      { id: "b", text: "En S3 public chiffré" },
      { id: "c", text: "Utiliser un service tiers PCI-DSS (Stripe, Adyen) ou AWS Payment Cryptography" },
      { id: "d", text: "Stocker temporairement en DynamoDB avec TTL (time-to-live)" },
    ],
    answer: ["c"],
    explanation:
      "PCI-DSS 3.2+ : stockez les numéros de carte sur un service tiers PCI-compliant (Stripe tokenize, Adyen, AWS Payment Cryptography). JAMAIS localement. C'est le standard de l'industrie. Vous recevez un token, pas la vraie card. AWS Payment Cryptography est conçu pour ce cas.",
    whyWrong: {
      a: "Stockage local sans audit rigoureux = violation PCI.",
      b: "S3 public = catastrophe. Même privé chiffré = pas assez rigoureux pour PCI.",
      d: "DynamoDB local = même problème que RDS.",
    },
    commonTrap: "Penser que 'chiffrement' = conforme PCI-DSS. Non. PCI requiert l'externalisation du stockage card.",
    relatedServices: ["Payment Cryptography", "Stripe", "DynamoDB"],
    keywords: ["PCI-DSS", "card data", "tokenization", "compliance"],
    examProbability: "Moyenne",
  },

  {
    id: "sc016",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "single",
    prompt: "Quel service AWS vérifie automatiquement les vulnérabilités DANS les instances EC2, images ECR et fonctions Lambda ?",
    choices: [
      { id: "a", text: "AWS GuardDuty" },
      { id: "b", text: "Amazon Inspector" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "AWS Config" },
    ],
    answer: ["b"],
    explanation:
      "Amazon Inspector scanne les instances EC2, images ECR (Docker), et fonctions Lambda pour déterminer les vulnérabilités (packages outdated, CVEs, etc.). Il génère un rapport avec les CVEs trouvées et recommend corrections. GuardDuty = détecte les accès anormaux. Trusted Advisor = checks généraux. Config = configuration.",
    whyWrong: {
      a: "GuardDuty = menaces d'accès, pas vulnérabilités code.",
      c: "Trusted Advisor = checks généraux (sécurité groups trop ouverts), pas vulnérabilités logicielles.",
      d: "Config = configuration, pas vulnérabilités.",
    },
    commonTrap: "Confondre 'détection de menaces' (GuardDuty) et 'détection de vulnérabilités' (Inspector).",
    relatedServices: ["Inspector", "EC2", "ECR", "Lambda"],
    keywords: ["Inspector", "vulnérabilités", "CVE", "scans"],
    examProbability: "Moyenne",
  },

  {
    id: "sc017",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel est le but principal d'un Security Group dans AWS ?",
    choices: [
      { id: "a", text: "Gérer les utilisateurs IAM et leurs permissions" },
      { id: "b", text: "Filtrer le trafic RÉSEAU entrant/sortant sur une instance EC2 (stateful firewall)" },
      { id: "c", text: "Bloquer les attaques DDoS couche 7" },
      { id: "d", text: "Chiffrer les données en transit" },
    ],
    answer: ["b"],
    explanation:
      "Un Security Group est un pare-feu virtuel STATEFUL. Il permet/refuse le trafic sur les ports et protocoles. Exemple : autoriser TCP 443 depuis 0.0.0.0/0 (HTTPS partout), refuser SSH sauf 203.0.113.0/24. Stateful = si tu autorise le trafic entrant port 443, la réponse sortante est automatiquement autorisée.",
    whyWrong: {
      a: "IAM gère les utilisateurs/permissions, pas le trafic réseau.",
      c: "WAF et Shield bloquent les attaques. Security Groups ne regardent pas la payload.",
      d: "Vous configure manuellement le chiffrement TLS. Security Groups ne le font pas.",
    },
    keywords: ["Security Group", "firewall", "réseau", "stateful"],
    examProbability: "Élevée",
  },

  {
    id: "sc018",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel est la différence entre un Security Group et une Network ACL (NACL) ?",
    choices: [
      { id: "a", text: "Security Group = instance-level, NACL = subnet-level" },
      { id: "b", text: "Security Group = stateless, NACL = stateful" },
      { id: "c", text: "Security Group est plus puissant que NACL" },
      { id: "d", text: "NACL sont obligatoires, Security Groups optionnels" },
    ],
    answer: ["a"],
    explanation:
      "Security Group = appliqué à l'INSTANCE (défense fine). NACL = appliqué au SOUS-RÉSEAU (défense large). Security Group est STATEFUL (réponses autorisées auto). NACL est STATELESS (règles explicites pour inbound ET outbound). NACL apparaît dans 10% des questions, souvent comme piège.",
    whyWrong: {
      b: "C'est l'inverse. SG = stateful. NACL = stateless.",
      c: "Ni l'un ni l'autre n'est 'plus puissant'. Ils fonctionnent sur des couches différentes.",
      d: "Les deux sont optionnels (bien que les SG soient quasi obligatoires).",
    },
    commonTrap: "Confondre instance-level vs subnet-level. Ou stateful vs stateless.",
    keywords: ["Security Group", "NACL", "instance", "subnet", "stateful"],
    memoryTrick: "SG = instance, stateful • NACL = subnet, stateless",
    examProbability: "Moyenne",
  },

  {
    id: "sc019",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Vous créez une VPC avec 2 subnets (publique et privée). Les instances privées doivent pouvoir télécharger des packages via Internet (apt-get, pip), mais ne doivent pas être accessibles depuis Internet. Comment configurer cela ?",
    choices: [
      { id: "a", text: "Lancer les instances privées avec Elastic IP directement accessible" },
      { id: "b", text: "Ajouter une NAT Gateway (ou NAT Instance) dans le subnet public. Router la table privée vers NAT." },
      { id: "c", text: "Ouvrir le Security Group des instances privées à tout Internet (0.0.0.0/0)" },
      { id: "d", text: "Créer une bastion (jump host) pour que les instances privées y accèdent avant Internet" },
    ],
    answer: ["b"],
    explanation:
      "NAT Gateway = service AWS géré permettant aux instances privées d'accéder Internet SANS être accessibles depuis Internet. Flux : instance privée → NAT Gateway (subnet public) → Internet. Les réponses reviennent vers l'instance privée. NAT Instance = EC2 manuelle (plus rare). Bastion = accès administrateur, pas Internet.",
    whyWrong: {
      a: "Elastic IP + instances directement accessibles = faille, elles ne sont plus privées.",
      c: "Ouvrir le SG à tout Internet ne suffit pas — il faut une route par NAT.",
      d: "Bastion = accès SSH/RDP admin, pas pour télécharger des packages Internet.",
    },
    commonTrap: "Penser que 'privé' = 'pas d'Internet'. Non. Privé = pas accessible depuis Internet, mais peut accéder Internet via NAT.",
    relatedServices: ["NAT Gateway", "VPC", "subnet", "routing"],
    keywords: ["NAT", "subnet privé", "accès internet"],
    examProbability: "Élevée",
  },

  {
    id: "sc020",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "single",
    prompt: "Quel service AWS centralise et manage les certifications pour les utilisateurs multi-comptes AWS (SSO/federation) ?",
    choices: [
      { id: "a", text: "AWS IAM Identity Center (ex-SSO)" },
      { id: "b", text: "AWS Organizations" },
      { id: "c", text: "AWS Cognito" },
      { id: "d", text: "AWS Directory Service" },
    ],
    answer: ["a"],
    explanation:
      "AWS IAM Identity Center (anciellement AWS SSO) permet une authentification centralisée pour plusieurs comptes AWS et applications. Exemple : créer un utilisateur une fois, il accède 50 comptes AWS via SSO. Le service integre avec Okta, Azure AD, etc. Organizations = gestion comptable. Cognito = authentification utilisateurs finaux (mobiles, web). Directory Service = AD on-premise bridge.",
    whyWrong: {
      b: "Organizations gère les comptes, pas l'authentification.",
      c: "Cognito = authentification utilisateurs finaux, pas employés AWS.",
      d: "Directory Service = AD bridge, pas SSO centralisé.",
    },
    keywords: ["IAM Identity Center", "SSO", "federation", "multi-compte"],
    examProbability: "Moyenne",
  },

  {
    id: "sc021",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS autorise les utilisateurs à accéder aux ressources AWS *dans d'autres comptes* selon un rôle spécifique ?",
    choices: [
      { id: "a", text: "Cross-account IAM role (assumer un rôle d'un autre compte)" },
      { id: "b", text: "AWS Organizations" },
      { id: "c", text: "AWS IAM policies locales seulement" },
      { id: "d", text: "Un VPN entre comptes" },
    ],
    answer: ["a"],
    explanation:
      "Cross-account access : Compte A créé un rôle IAM permettant au compte B (via un principal spécifique) de l'assumer. Exemple : Compte A (prod), Compte B (dev). Dev peut assumer le rôle 'ProdReadOnly' du Compte A pour lire les ressources prod. Le rôle contient une trust policy autorisant l'autre compte.",
    whyWrong: {
      b: "Organizations centralise la facturation, ne permet pas l'accès cross-account par rôle.",
      c: "Les policies locales au compte ne suffisent pas.",
      d: "VPN = connectivité réseau, pas accès IAM.",
    },
    keywords: ["cross-account", "assume role", "trust policy"],
    examProbability: "Moyenne",
  },

  {
    id: "sc022",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS offre un registre d'audit IMMUABLE (impossible à modifier) des événements de sécurité ?",
    choices: [
      { id: "a", text: "AWS CloudTrail avec S3 Object Lock" },
      { id: "b", text: "CloudWatch Logs" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "Security Hub" },
    ],
    answer: ["a"],
    explanation:
      "CloudTrail enregistre les API, et si vous envoyez les logs à S3 avec Object Lock = immutabilité garantie (personne, pas même AWS, ne peut supprimer/modifier les logs). C'est la meilleure pratique pour la conformité.",
    whyWrong: {
      b: "CloudWatch Logs sont muables (on peut les modifier/supprimer).",
      c: "Config = tracking config, pas audit immutable.",
      d: "Security Hub = dashboard, pas immutabilité garantie.",
    },
    keywords: ["CloudTrail", "Object Lock", "immutable", "audit"],
    examProbability: "Moyenne",
  },

  {
    id: "sc023",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Votre entreprise subit un audit de conformité. L'auditeur demande une preuve qu'AUCUN utilisateur IAM ne peut modifier le root account. Comment pourriez-vous le prouver ?",
    choices: [
      { id: "a", text: "Montrer qu'il n'y a pas de politique IAM donnant la permission 'root:*'" },
      { id: "b", text: "Utiliser AWS CloudTrail pour montrer qu'aucun changement root ne s'est produit" },
      { id: "c", text: "Ajouter une politique SCP (Service Control Policy) interdisant toute modification du compte root" },
      { id: "d", text: "C'est impossible. AWS ne peut pas empêcher les changements root." },
    ],
    answer: ["c"],
    explanation:
      "Une Service Control Policy (SCP) est une policy appliquée au niveau du compte ou de l'organisation qui agit comme un maximum de permissions — elle peut REFUSER une action même si une policy IAM l'autorise. Exemple : SCP refusant iam:DeleteUser pour le compte root. Combined avec MFA sur root, c'est la meilleure pratique.",
    whyWrong: {
      a: "Une policy IAM seule ne suffit pas. Un root peut override IAM.",
      b: "CloudTrail montre les changements, ne les prévient pas.",
      d: "SCP le peut.",
    },
    commonTrap: "Confondre IAM policy (user-level) et SCP (account-level). SCP > IAM.",
    relatedServices: ["SCP", "Organizations", "IAM"],
    keywords: ["SCP", "Service Control Policy", "root", "Organizations"],
    examProbability: "Moyenne",
  },

  {
    id: "sc024",
    domain: "Security & Compliance",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel est le compte AWS 'root' (racine) ?",
    choices: [
      { id: "a", text: "L'utilisateur 'admin' créé par défaut" },
      { id: "b", text: "Le compte utilisé lors de l'inscription AWS (email de création)" },
      { id: "c", text: "Un compte spécial AWS utilisé pour gérer tous les autres" },
      { id: "d", text: "Une instance EC2 avec les permissions les plus élevées" },
    ],
    answer: ["b"],
    explanation:
      "Le compte root AWS = le compte créé lors de l'inscription. C'est l'email utilisé pour sign up. C'est le compte avec les permissions MAXIMALES — il peut tout faire. JAMAIS l'utiliser pour le travail quotidien. Créer un utilisateur IAM 'admin' et l'utiliser à la place. Protéger le root avec MFA très sérieusement.",
    whyWrong: {
      a: "Il n'y a pas d'utilisateur 'admin' par défaut. Vous le créez.",
      c: "Root = votre compte personnel, pas un compte spécial AWS.",
      d: "Root n'est pas une instance EC2.",
    },
    keywords: ["root account", "MFA", "principal", "credentials"],
    memoryTrick: "Root = le compte de création. À protéger au maximum.",
    examProbability: "Élevée",
  },

  {
    id: "sc025",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel est le protocole de chiffrement TLS actuel recommandé par AWS pour le transit de données ?",
    choices: [
      { id: "a", text: "TLS 1.0" },
      { id: "b", text: "TLS 1.2 et supérieur" },
      { id: "c", text: "SSL 3.0" },
      { id: "d", text: "Aucun, HTTP suffil" },
    ],
    answer: ["b"],
    explanation:
      "AWS recommande TLS 1.2 minimum, TLS 1.3 pour du nouveau déploiement. TLS 1.0/1.1 sont dépréciés. Tous les services AWS (HTTPS, CloudFront, ALB) supportent TLS 1.2+. SSL 3.0 = antédiluvien.",
    keywords: ["TLS", "encryption", "transit", "HTTPS"],
    examProbability: "Faible",
  },

  {
    id: "sc026",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Vous êtes responsable de sécurité. Vous trouvez que 50 utilisateurs IAM partagent une seule clé d'accès AWS. Quel est le principal risque et comment le remédier ?",
    choices: [
      { id: "a", text: "Aucun risque, les clés d'accès sont chiffrées par AWS" },
      { id: "b", text: "Risque : impossible de tracer qui a fait quoi. Solution : créer un utilisateur unique par personne + MFA" },
      { id: "c", text: "Risque : la clé peut être compromise. Solution : faire une rotation chaque jour" },
      { id: "d", text: "Risque : les permissions sont partagées. Solution : augmenter les droits de la clé" },
    ],
    answer: ["b"],
    explanation:
      "Le principal risque : NON-REPUDIABILITY. Si la clé est compromise, vous ne savez pas QUI l'a utilisée. Si 50 personnes la partagent, c'est pire — impossible de tracer les actions à un utilisateur. Remediation : créer un utilisateur IAM unique par personne, autoriser MFA, raider accès dans CloudTrail. Rotation chaque jour est impractical.",
    whyWrong: {
      a: "Non-repudiability n'est pas un problème de chiffrement.",
      c: "Rotation chaque jour est impractical. Mieux : une clé par personne.",
      d: "Augmenter les droits = pire.",
    },
    commonTrap: "Penser que 'rotation rapide' = sécurité. Non. Un utilisateur par personne = traçabilité.",
    keywords: ["IAM", "clés partagées", "traçabilité", "non-repudiability"],
    examProbability: "Moyenne",
  },

  {
    id: "sc027",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS vous aide à configurer les bonnes pratiques de sécurité (vérifications high-level) ?",
    choices: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "AWS CloudTrail" },
      { id: "d", text: "AWS Inspector" },
    ],
    answer: ["a"],
    explanation:
      "AWS Trusted Advisor vérifie votre compte et recommande des améliorations : security groups trop ouverts, pas de MFA sur root, EBS non chiffré, etc. C'est pour les vérifications high-level. Le plan gratuit offre 7 vérifications. Le plan Business/Enterprise en offre +100.",
    whyWrong: {
      b: "Config = tracking de config, pas des vérifications de meilleures pratiques générales.",
      c: "CloudTrail = audit des API.",
      d: "Inspector = vulnérabilités logicielles.",
    },
    keywords: ["Trusted Advisor", "vérifications", "bonnes pratiques"],
    examProbability: "Moyenne",
  },

  {
    id: "sc028",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS vous permet de générer automatiquement un compliance report pour montrer qu'une ressource S3 respecte votre politique (ex: chiffrement obligatoire) ?",
    choices: [
      { id: "a", text: "AWS Config avec Config Rules" },
      { id: "b", text: "AWS Trusted Advisor" },
      { id: "c", text: "AWS CloudTrail" },
      { id: "d", text: "AWS Artifact" },
    ],
    answer: ["a"],
    explanation:
      "Config + Config Rules : vous créez une règle 's3-bucket-server-side-encryption-enabled', Config évalue toutes les S3 buckets, envoie en rapport les non-conformes, et vous pouvez générer un compliance report.",
    whyWrong: {
      b: "Trusted Advisor = vérifications générales, pas des rapports compliance granulaires.",
      c: "CloudTrail = audit API.",
      d: "Artifact = certifications AWS (SOC, ISO), pas vos ressources.",
    },
    keywords: ["Config Rules", "compliance", "rapports", "configuration"],
    examProbability: "Moyenne",
  },

  {
    id: "sc029",
    domain: "Security & Compliance",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Un pirate obtient les clés d'accès AWS d'un utilisateur IAM. Quel est le premier service qui détecterait une activité anormale ?",
    choices: [
      { id: "a", text: "AWS CloudTrail (enregistre toutes les API)" },
      { id: "b", text: "Amazon GuardDuty (détecte les comportements anormaux via ML)" },
      { id: "c", text: "AWS Config (vérifie la configuration)" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    answer: ["b"],
    explanation:
      "CloudTrail enregistre tout (historique), mais ne détecte pas activement. GuardDuty surveille en continu (CloudTrail, VPC Flow Logs, DNS queries) et détecte les anomalies via ML : tentatives d'authentification échouées répétées, accès API depuis des IPs suspects, appels API anormaux, etc. GuardDuty ALERTE.",
    whyWrong: {
      a: "CloudTrail enregistre après les faits. C'est utile pour l'audit, pas pour la détection active.",
      c: "Config = configuration.",
      d: "Trusted Advisor ne détecte pas les menaces.",
    },
    commonTrap: "Penser que 'CloudTrail enregistre' = 'détection active'. Non. Enregistrement ≠ détection.",
    keywords: ["GuardDuty", "détection", "menaces", "ML"],
    examProbability: "Élevée",
  },

  {
    id: "sc030",
    domain: "Security & Compliance",
    difficulty: "Difficile",
    type: "single",
    prompt: "Quel est l'avantage principal d'utiliser AWS Secrets Manager plutôt que des variables d'environnement pour les secrets d'application ?",
    choices: [
      { id: "a", text: "Les variables d'env ne peuvent pas stocker de secrets" },
      { id: "b", text: "Secrets Manager permet la rotation automatique, le chiffrement KMS et un audit CloudTrail" },
      { id: "c", text: "Secrets Manager est beaucoup moins cher que les variables" },
      { id: "d", text: "Secrets Manager est integré à toutes les frameworks (Django, Spring, Laravel)" },
    ],
    answer: ["b"],
    explanation:
      "Secrets Manager = rotation auto (change les DB passwords, API keys, tous les X jours), chiffrement KMS, audit complet (CloudTrail enregistre chaque accès), versionning des secrets. Les variables d'env : statiques, pas de rotation, peuvent être loggées.",
    whyWrong: {
      a: "Les variables d'env PEUVENT stocker des secrets, mais c'est mauvais.",
      c: "Coût est négligeable, pas la raison principale.",
      d: "Aucune framework ne garantit une integration directe.",
    },
    keywords: ["Secrets Manager", "rotation", "KMS", "audit"],
    examProbability: "Moyenne",
  },

  // ============================================================
  // CLOUD TECHNOLOGY & SERVICES - 45 questions (LARGE SECTION)
  // ============================================================

  {
    id: "ct001",
    domain: "Cloud Technology & Services",
    service: "EC2",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS fournit des serveurs virtuels à la demande ?",
    choices: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "Amazon S3" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "AWS CloudFront" },
    ],
    answer: ["a"],
    explanation:
      "Amazon EC2 (Elastic Compute Cloud) fournit des serveurs virtuels redimensionnables à la demande. Vous choisissez le type (t3.small, m5.large, etc.), l'OS (Linux, Windows), et AWS crée l'instance. Vous payez par seconde.",
    whyWrong: {
      b: "S3 = stockage d'objets.",
      c: "Lambda = fonctions serverless.",
      d: "CloudFront = CDN.",
    },
    keywords: ["EC2", "serveur virtuel", "compute"],
    examProbability: "Élevée",
  },

  {
    id: "ct002",
    domain: "Cloud Technology & Services",
    service: "S3",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS stocke les données sous forme d'objets dans des 'buckets' ?",
    choices: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "Amazon S3" },
      { id: "c", text: "Amazon EBS" },
      { id: "d", text: "Amazon EFS" },
    ],
    answer: ["b"],
    explanation:
      "Amazon S3 (Simple Storage Service) stocke les données en tant qu'objets (fichiers) dans des buckets (répertoires). Chaque bucket a un nom global unique. S3 = clé-valeur, pas une filesystem traditionelle. EBS = disques blocs pour EC2. EFS = NFS partagé.",
    whyWrong: {
      a: "EC2 = compute.",
      c: "EBS = volume blocs pour instances.",
      d: "EFS = filesystem NFS partagé.",
    },
    keywords: ["S3", "bucket", "objet", "stockage"],
    examProbability: "Élevée",
  },

  {
    id: "ct003",
    domain: "Cloud Technology & Services",
    service: "RDS",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS gère les bases de données relationnelles (MySQL, PostgreSQL, Oracle) avec sauvegardes automatiques et failover ?",
    choices: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon DynamoDB" },
      { id: "c", text: "Amazon ElastiCache" },
      { id: "d", text: "AWS Redshift" },
    ],
    answer: ["a"],
    explanation:
      "Amazon RDS (Relational Database Service) gère les databases traditionnelles. AWS gère la sauvegarde, les patchs, le failover automatique (read replicas en multi-AZ). Vous ne gérez pas l'infrastructure OS. DynamoDB = NoSQL. ElastiCache = cache. Redshift = data warehouse.",
    whyWrong: {
      b: "DynamoDB est NoSQL (clé-valeur).",
      c: "ElastiCache est un cache (Redis, Memcached).",
      d: "Redshift est pour l'analytics big data.",
    },
    keywords: ["RDS", "database", "MySQL", "PostgreSQL", "relationnelle"],
    examProbability: "Élevée",
  },

  {
    id: "ct004",
    domain: "Cloud Technology & Services",
    service: "DynamoDB",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS est une base de données NoSQL serverless avec scaling automatique ?",
    choices: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon DynamoDB" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "AWS Glue" },
    ],
    answer: ["b"],
    explanation:
      "DynamoDB = NoSQL serverless. Vous créez une table (clé primaire + attributs), DynamoDB scale automatiquement. Pas de serveur à gérer. Deux modes : On-Demand (payez par requête) ou Provisioned (payez par RCU/WCU). Parfait pour les applis avec trafic variable.",
    whyWrong: {
      a: "RDS = relationnel géré.",
      c: "Redshift = data warehouse.",
      d: "Glue = ETL.",
    },
    keywords: ["DynamoDB", "NoSQL", "serverless", "scaling"],
    examProbability: "Élevée",
  },

  {
    id: "ct005",
    domain: "Cloud Technology & Services",
    service: "Lambda",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous construisez une API mobile backend. L'appli reçoit des milliers de requêtes/jour, avec forte variabilité. Vous ne voulez pas gérer de serveurs.",
    scenario:
      "Les pics peuvent passer de 100 req/min la nuit à 10 000 req/min le jour. L'équipe ne peut pas maintenir une infrastructure traditionnelle.",
    choices: [
      { id: "a", text: "Lancer 10 instances EC2 en On-Demand et les scaler manuellement" },
      { id: "b", text: "API Gateway + Lambda + DynamoDB (serverless stack)" },
      { id: "c", text: "Elastic Beanstalk avec Auto Scaling" },
      { id: "d", text: "ECS avec un Application Load Balancer" },
    ],
    answer: ["b"],
    explanation:
      "Stack 100% serverless : API Gateway (endpoints REST), Lambda (compute pay-per-invocation + duration), DynamoDB (NoSQL serverless). Scaling automatique de 0 à des millions sans gestion. Coût proportionnel à l'usage réel. Lambda = meilleur choix pour l'imprévisibilité.",
    whyWrong: {
      a: "10 instances = manuelle et coûteuse (même scaling down, coûts minimums). Surprovisionnement probable.",
      c: "Beanstalk = nécessite un minimum d'instances (au moins 1), coûts fixes.",
      d: "ECS = plus complexe que Lambda, gestion du cluster requise.",
    },
    commonTrap: "'Pas de serveurs' = Lambda. 'Peu de gestion' ≠ Lambda. ECS/Beanstalk = gestion de clusters/instances.",
    relatedServices: ["Lambda", "API Gateway", "DynamoDB"],
    keywords: ["Lambda", "serverless", "API", "auto-scaling", "FaaS"],
    memoryTrick: "Forte variabilité → Lambda. Charge stable → EC2.",
    examProbability: "Élevée",
  },

  {
    id: "ct006",
    domain: "Cloud Technology & Services",
    service: "ECS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS permet de déployer des conteneurs Docker gérés avec orchestration automatique ?",
    choices: [
      { id: "a", text: "Amazon ECS (Elastic Container Service)" },
      { id: "b", text: "Amazon EKS (Elastic Kubernetes Service)" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "AWS Fargate" },
    ],
    answer: ["a"],
    explanation:
      "Amazon ECS est le service container d'AWS. Vous déployez des image Docker (définies dans une 'task definition'), ECS les lance dans un cluster EC2 ou Fargate. Vous pouvez spécifier le nombre de instances (replicas) et ECS gère l'orchestration.",
    whyWrong: {
      b: "EKS = Kubernetes. Plus complexe, pour teams avec expertise K8s.",
      c: "Lambda = fonctions, pas containers.",
      d: "Fargate = launch type d'ECS, pas un service séparé.",
    },
    keywords: ["ECS", "Docker", "conteneur", "orchestration"],
    examProbability: "Moyenne",
  },

  {
    id: "ct007",
    domain: "Cloud Technology & Services",
    service: "Fargate",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quelle est la différence entre 'ECS sur EC2' et 'ECS sur Fargate' ?",
    choices: [
      { id: "a", text: "Fargate = serverless, pas de gestion EC2. ECS sur EC2 = vous gérez les instances" },
      { id: "b", text: "ECS sur Fargate est toujours moins cher que EC2" },
      { id: "c", text: "Fargate supporte tous les types de conteneur, EC2 seulement Docker" },
      { id: "d", text: "Fargate est optimal pour les workloads longs (batch), EC2 pour web" },
    ],
    answer: ["a"],
    explanation:
      "ECS sur Fargate = serverless. Vous définissez les ressources (CPU, mémoire), AWS provisionne automatiquement le hardware. Pas de gestion EC2. ECS sur EC2 = vous créez un cluster EC2, vous patchez, vous scaler. Fargate = payer à l'utilisation (pas de coûts fixes EC2). EC2 = coûts fixes, mais plus de contrôle.",
    whyWrong: {
      b: "Fargate peut être plus cher si load stable (coûts fixes EC2 sont moins chers).",
      c: "Les deux supportent Docker.",
      d: "Fargate peut faire du batch (timeout 24h), EC2 peut faire du web.",
    },
    commonTrap: "Penser que 'Fargate = toujours mieux'. Non. Si charge stable et prévisible, EC2 peut être moins cher.",
    relatedServices: ["ECS", "Fargate", "EC2"],
    keywords: ["Fargate", "serverless", "ECS", "conteneur"],
    memoryTrick: "Fargate = pas d'instances EC2. ECS sur EC2 = instances à gérer",
    examProbability: "Moyenne",
  },

  {
    id: "ct008",
    domain: "Cloud Technology & Services",
    service: "ALB",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS distribue le trafic incoming entre plusieurs instances/targets et supporte la terminaison SSL ?",
    choices: [
      { id: "a", text: "Amazon Route 53" },
      { id: "b", text: "AWS Application Load Balancer (ALB)" },
      { id: "c", text: "Amazon CloudFront" },
      { id: "d", text: "AWS WAF" },
    ],
    answer: ["b"],
    explanation:
      "ALB = load balancer (couche 7 / applicative). Il distribue le trafic entre instances basé sur le chemin URI, le hostname, le header HTTP, etc. Supporte la terminaison SSL (vous uploadez le certif, ALB déchiffre le trafic). NLB = couche 4 (ultra-haute performance). CLB = legacy.",
    whyWrong: {
      a: "Route 53 = DNS.",
      c: "CloudFront = CDN.",
      d: "WAF = pare-feu applicatif.",
    },
    keywords: ["ALB", "load balancer", "distribution", "SSL"],
    examProbability: "Élevée",
  },

  {
    id: "ct009",
    domain: "Cloud Technology & Services",
    service: "Auto Scaling",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez un groupe d'instances EC2 derrière un ALB. Vous voulez que le nombre d'instances augmente automatiquement si la CPU moyenne dépasse 70%, et diminue si elle passe sous 30%.",
    choices: [
      { id: "a", text: "Créer une policy de scaling CloudWatch directement (deprecated)" },
      { id: "b", text: "Utiliser AWS Auto Scaling avec une target tracking policy basée sur la métrique CPU" },
      { id: "c", text: "Lambda déclenche les scale-up/scale-down manuellement" },
      { id: "d", text: "Configurer EC2 Fleet avec des instances Spot" },
    ],
    answer: ["b"],
    explanation:
      "Auto Scaling = le service AWS moderne pour le scaling. Vous créez un Auto Scaling Group (ASG), définissez une target tracking policy (ex: CPU-based), et ASG scale automatiquement. Les seuils 70%/30% sont implémentés via des step policies ou target tracking.",
    whyWrong: {
      a: "C'est l'ancienne approche (CloudWatch Alarms manuelles). Auto Scaling est mieux.",
      c: "Lambda peut déclencher, mais c'est plus complexe qu'un ASG natif.",
      d: "EC2 Fleet = Spot instances, pas le service de scaling.",
    },
    commonTrap: "Penser que 'CloudWatch Alarms' = scaling. Les alarms déclenchent l'action, mais ASG est l'orchestrateur.",
    relatedServices: ["Auto Scaling", "EC2", "CloudWatch", "ALB"],
    keywords: ["Auto Scaling", "ASG", "scaling policy", "target tracking"],
    examProbability: "Élevée",
  },

  {
    id: "ct010",
    domain: "Cloud Technology & Services",
    service: "CloudWatch",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service collecte les métriques, les logs et déclenche des alarmes sur les ressources AWS ?",
    choices: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS X-Ray" },
      { id: "d", text: "AWS Config" },
    ],
    answer: ["b"],
    explanation:
      "CloudWatch = observabilité (monitoring). Collecte les métriques de base (CPU, NetworkIn, DiskRead), les logs applicatifs, les custom metrics (via agent CloudWatch). Déclenche les alarmes (SNS, Lambda). Vous visualisez les dashboards.",
    whyWrong: {
      a: "CloudTrail = audit des API AWS.",
      c: "X-Ray = tracing distribué des applis.",
      d: "Config = tracking de config.",
    },
    commonTrap: "'Monitoring' peut venir de plusieurs services. CloudWatch = principal.",
    relatedServices: ["CloudWatch", "EC2", "RDS", "Lambda"],
    keywords: ["CloudWatch", "monitoring", "métriques", "logs", "alarmes"],
    memoryTrick: "Watch = observer. Trail = tracer les API",
    examProbability: "Élevée",
  },

  {
    id: "ct011",
    domain: "Cloud Technology & Services",
    service: "CloudFront",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre site web statique (HTML, CSS, JS) est hébergé en S3 dans eu-west-1. Les utilisateurs dans le monde entier expérience une latence élevée pour charger les assets.",
    choices: [
      { id: "a", text: "Répliquer le bucket S3 dans chaque région (très coûteux)" },
      { id: "b", text: "Utiliser CloudFront pour mettre en cache les assets dans 400 Edge Locations" },
      { id: "c", text: "Lancer des instances EC2 dans chaque région" },
      { id: "d", text: "Augmenter la bande passante S3 (pas d'option directe)" },
    ],
    answer: ["b"],
    explanation:
      "CloudFront = CDN avec 400 Edge Locations mondialement. Vous créez une distribution CloudFront pointant vers votre S3 bucket (origin). Quand un utilisateur demande un asset, CloudFront le sert depuis l'Edge Location la plus proche (< 1-10 ms). Si absent, récupère de S3, le cache. Coûts : transfert de données + requête.",
    whyWrong: {
      a: "Coûteux et complexe. CloudFront est conçu pour cela.",
      c: "Coûteux. CloudFront est plus efficace.",
      d: "S3 n'a pas d'option pour augmenter la bande passante — c'est CloudFront qui l'accélère.",
    },
    commonTrap: "Penser que CloudFront = 'créer des copies'. Non. CloudFront = cache CDN centralisé.",
    relatedServices: ["CloudFront", "S3", "Edge Location"],
    keywords: ["CloudFront", "CDN", "Edge", "cache", "latence"],
    memoryTrick: "Latence globale élevée → CloudFront",
    examProbability: "Élevée",
  },

  {
    id: "ct012",
    domain: "Cloud Technology & Services",
    service: "Route 53",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS gère les zones DNS et les enregistrements A, CNAME, MX, etc. ?",
    choices: [
      { id: "a", text: "AWS CloudFront" },
      { id: "b", text: "Amazon Route 53" },
      { id: "c", text: "AWS Elastic IP" },
      { id: "d", text: "AWS Certificate Manager" },
    ],
    answer: ["b"],
    explanation:
      "Route 53 = service DNS managé AWS. Vous créez une zone pour votre domaine (example.com), ajoutez des enregistrements (A, CNAME, MX, SRV, TXT). Route 53 résout example.com vers votre IP/ALB/CloudFront. Supporte le health check et le failover automatique.",
    whyWrong: {
      a: "CloudFront = CDN.",
      c: "Elastic IP = adresse IP statique pour EC2.",
      d: "Certificate Manager = certificats SSL.",
    },
    keywords: ["Route 53", "DNS", "zone", "enregistrements"],
    examProbability: "Élevée",
  },

  {
    id: "ct013",
    domain: "Cloud Technology & Services",
    service: "VPC",
    difficulty: "Moyen",
    type: "single",
    prompt: "Qu'est-ce qu'une VPC dans AWS ?",
    choices: [
      { id: "a", text: "Un réseau virtuel isolé où vous déployez vos ressources AWS" },
      { id: "b", text: "Un service de conteneur (similaire à Docker)" },
      { id: "c", text: "Un groupe de sauvegardes" },
      { id: "d", text: "Un cache distribué" },
    ],
    answer: ["a"],
    explanation:
      "VPC (Virtual Private Cloud) = réseau virtuel créé dans une région AWS. Vous configurez la CIDR (ex: 10.0.0.0/16), les subnets, les route tables, les Internet Gateways, les NAT Gateways. Tout déploiement AWS (EC2, RDS, Lambda) vit dans une VPC.",
    whyWrong: {
      b: "ECS/Docker = conteneurs.",
      c: "Backup = snapshots.",
      d: "Cache = ElastiCache.",
    },
    keywords: ["VPC", "réseau", "subnet", "CIDR"],
    examProbability: "Élevée",
  },

  {
    id: "ct014",
    domain: "Cloud Technology & Services",
    service: "Elastic Beanstalk",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez une application Django traditionnelle. Vous voulez la déployer sur AWS minimal effort, sans gérer EC2/ALB/Auto Scaling directement.",
    choices: [
      { id: "a", text: "Configurer manuellement EC2 + ALB + Auto Scaling" },
      { id: "b", text: "Utiliser AWS Elastic Beanstalk (gère EC2, ALB, Auto Scaling, RDS optionnel)" },
      { id: "c", text: "Convertir l'app en Lambda (serverless)" },
      { id: "d", text: "Utiliser ECS Fargate (containers)" },
    ],
    answer: ["b"],
    explanation:
      "Elastic Beanstalk = PaaS AWS. Vous uploadez votre code Django, Beanstalk configure automatiquement EC2, ALB, Auto Scaling, logs, monitoring. Vous déployez via ebcli (eb deploy). Beanstalk gère l'infrastructure, vous focalisé sur l'app.",
    whyWrong: {
      a: "Possible mais beaucoup de travail manuel.",
      c: "Lambda = fonctions, pas une app Django complète.",
      d: "ECS = containers, plus complexe que Beanstalk.",
    },
    commonTrap: "Penser que Beanstalk = serverless. Non. C'est PaaS — AWS gère l'infra mais EC2 tournent.",
    relatedServices: ["Elastic Beanstalk", "EC2", "ALB"],
    keywords: ["Beanstalk", "PaaS", "deployment", "minimal effort"],
    memoryTrick: "Beanstalk = déployer une app complète • Lambda = déployer une fonction",
    examProbability: "Moyenne",
  },

  {
    id: "ct015",
    domain: "Cloud Technology & Services",
    service: "API Gateway",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous créez une API REST pour votre application mobile. L'API doit supporter 100 000 requêtes/jour avec spike d'utilisation.",
    choices: [
      { id: "a", text: "Créer un serveur Node.js sur EC2 avec Express" },
      { id: "b", text: "API Gateway + Lambda (serverless, scaling auto)" },
      { id: "c", text: "API Gateway + EC2 Auto Scaling" },
      { id: "d", text: "Utiliser un service tiers (Firebase, Heroku)" },
    ],
    answer: ["b"],
    explanation:
      "API Gateway = service AWS pour créer des APIs REST/WebSocket. Combiné avec Lambda, c'est une stack 100% serverless. API Gateway crée des endpoints (GET /users, POST /orders, etc.), Lambda traite chaque requête (pay-per-invocation). DynamoDB pour la persistance.",
    whyWrong: {
      a: "Possible mais vous gérez le serveur (patches, scaling).",
      c: "Plus complexe que Lambda + API Gateway.",
      d: "Services tiers = moins de contrôle, coûts différents.",
    },
    commonTrap: "Penser que 'API Gateway' = API complète. Non. API Gateway = endpoint, il faut du compute derrière (Lambda, EC2, etc.).",
    relatedServices: ["API Gateway", "Lambda", "DynamoDB"],
    keywords: ["API Gateway", "REST", "endpoints", "serverless"],
    examProbability: "Élevée",
  },

  {
    id: "ct016",
    domain: "Cloud Technology & Services",
    service: "SQS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS fournit une queue de messages découplant les producteurs et consommateurs ?",
    choices: [
      { id: "a", text: "Amazon SNS" },
      { id: "b", text: "Amazon SQS" },
      { id: "c", text: "Amazon Kinesis" },
      { id: "d", text: "AWS EventBridge" },
    ],
    answer: ["b"],
    explanation:
      "Amazon SQS (Simple Queue Service) = message queue. Les producteurs envoient les messages, SQS les stocke, les consommateurs les récupèrent. Découplage = producteur et consommateur ne se connaissent pas. SQS a deux types : Standard (meilleur effort) et FIFO (ordre garanti).",
    whyWrong: {
      a: "SNS = pub/sub, pas une queue.",
      c: "Kinesis = streaming de données, pas une queue simple.",
      d: "EventBridge = événements, pas une queue.",
    },
    keywords: ["SQS", "queue", "messages", "découplage"],
    examProbability: "Élevée",
  },

  {
    id: "ct017",
    domain: "Cloud Technology & Services",
    service: "SNS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS fournit un système de publication/souscription (pub/sub) pour notifier plusieurs abonnés ?",
    choices: [
      { id: "a", text: "Amazon SQS" },
      { id: "b", text: "Amazon SNS" },
      { id: "c", text: "AWS Step Functions" },
      { id: "d", text: "AWS Lambda" },
    ],
    answer: ["b"],
    explanation:
      "Amazon SNS (Simple Notification Service) = pub/sub. Un producteur publie un message, les abonnés (email, SMS, SQS, Lambda, HTTP) reçoivent. Un message peut aller à 1000s d'abonnés simultanément.",
    whyWrong: {
      a: "SQS = queue 1-to-1.",
      c: "Step Functions = orchestration workflows.",
      d: "Lambda = compute.",
    },
    keywords: ["SNS", "pub/sub", "notifications"],
    examProbability: "Élevée",
  },

  {
    id: "ct018",
    domain: "Cloud Technology & Services",
    service: "S3",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez un bucket S3 avec 10 TB de données sensibles. Vous voulez sécuriser l'accès et éviter tout accès public accidentel.",
    choices: [
      { id: "a", text: "Rendre le bucket privé, ajouter une bucket policy autorisant les utilisateurs IAM spécifiques" },
      { id: "b", text: "Utiliser S3 Public Read, conserver les données chiffrées" },
      { id: "c", text: "Créer une VPC endpoint pour S3" },
      { id: "d", text: "Bloquer tout accès, y compris les utilisateurs IAM" },
    ],
    answer: ["a"],
    explanation:
      "Best practice : (1) S3 bucket privé par défaut (Block All Public Access). (2) Bucket policy autorisant les utilisateurs/rôles IAM spécifiques (s3:GetObject, s3:PutObject). (3) Chiffrement SSE-S3 ou SSE-KMS. (4) Versioning + MFA Delete. VPC endpoint est utile si vous avez besoin de connectivité privée (pas d'accès public du tout).",
    whyWrong: {
      b: "S3 Public = catastrophe même si chiffré (n'importe qui peut télécharger).",
      c: "VPC endpoint est utile mais pas suffisant seul. Vous avez besoin d'une bucket policy.",
      d: "Vous devez au moins laisser accès aux utilisateurs autorisés.",
    },
    commonTrap: "Penser que 'chiffrement' = 'sécurisé'. Non. Chiffrement + access control.",
    relatedServices: ["S3", "IAM", "KMS", "VPC Endpoint"],
    keywords: ["S3", "bucket policy", "private", "chiffrement"],
    examProbability: "Élevée",
  },

  {
    id: "ct019",
    domain: "Cloud Technology & Services",
    service: "EBS",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS fournit du stockage blocs pour les instances EC2 (volumes de disque) ?",
    choices: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "Amazon EBS" },
      { id: "c", text: "Amazon EFS" },
      { id: "d", text: "AWS Snowball" },
    ],
    answer: ["b"],
    explanation:
      "Amazon EBS (Elastic Block Store) = disques blocs pour EC2. Vous créez un volume (gp3, io1, etc.), l'attacher à une instance EC2. EBS est optimisé pour des performances élevées (bases de données, applicatifs I/O intensifs). EFS = NFS partagé entre instances.",
    whyWrong: {
      a: "S3 = objet, pas bloc.",
      c: "EFS = NFS partagé, pas bloc privé.",
      d: "Snowball = transfert de données physique.",
    },
    keywords: ["EBS", "stockage bloc", "volume", "EC2"],
    examProbability: "Moyenne",
  },

  {
    id: "ct020",
    domain: "Cloud Technology & Services",
    service: "EFS",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez 5 instances EC2 qui doivent partager un même répertoire de fichiers contenant des données de configuration.",
    choices: [
      { id: "a", text: "S3 avec versioning" },
      { id: "b", text: "EBS volumes (un par instance)" },
      { id: "c", text: "Amazon EFS (NFS partagé)" },
      { id: "d", text: "RDS pour stocker les fichiers" },
    ],
    answer: ["c"],
    explanation:
      "EFS (Elastic File System) = NFS POSIX partagé entre instances. Vous montez EFS sur /mnt/efs, plusieurs instances le lisent/écrivent. Parfait pour des data partagées, du stockage de config, des répertoires de cache.",
    whyWrong: {
      a: "S3 = objet, pas filesystem POSIX.",
      b: "EBS = privé à l'instance, pas partagé.",
      d: "RDS = base de données structurée.",
    },
    keywords: ["EFS", "NFS", "partagé", "filesystem"],
    examProbability: "Moyenne",
  },

  {
    id: "ct021",
    domain: "Cloud Technology & Services",
    service: "Snowball",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Une entreprise doit transférer 500 TB de données depuis son datacenter vers AWS S3. La bande passante Internet est limitée à 100 Mbps. Un transfert internet prendrait 6 mois minimum.",
    choices: [
      { id: "a", text: "AWS Direct Connect (connexion dédiée)" },
      { id: "b", text: "AWS Snowball Edge (appareil physique)" },
      { id: "c", text: "AWS DataSync via Internet" },
      { id: "d", text: "Uploader sur S3 via HTTPS classique" },
    ],
    answer: ["b"],
    explanation:
      "Snowball Edge = boîtier physique de 100 TB envoyé chez vous. Vous copiez les données, renvoyez le boîtier. AWS reçoit, copie dans S3. Délai : 1-2 semaines. Coûts : beaucoup moins cher qu'une 6 mois de bande passante. Pour multi-TB, Snowball. Pour petit volume (<100 GB), Internet est ok.",
    whyWrong: {
      a: "Direct Connect est plus lent (même bande passante que votre ISP).",
      c: "DataSync = même limitation Internet (100 Mbps).",
      d: "6 mois d'attente = inacceptable.",
    },
    commonTrap: "Penser que 'migration vers AWS' = toujours Internet. Pour big data, Snowball est le standard.",
    relatedServices: ["Snowball", "S3", "migration"],
    keywords: ["Snowball", "migration", "données", "physique"],
    memoryTrick: "100 TB → Snowball. 1 GB → Internet",
    examProbability: "Élevée",
  },

  {
    id: "ct022",
    domain: "Cloud Technology & Services",
    service: "DataSync",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez une application qui lit/écrit dans un NFS on-premise. Vous voulez la migrer vers AWS tout en gardant compatibilité avec le chemin /data.",
    choices: [
      { id: "a", text: "Importer les données S3, remplacer le chemin NFS par un AWS SDK" },
      { id: "b", text: "AWS Storage Gateway (créer un cache NFS local qui synchronise S3)" },
      { id: "c", text: "Snowball pour copier les données, puis configurer une EC2 NFS" },
      { id: "d", text: "Utiliser DataSync pour une synchronisation initiale, puis EFS pour la persistance" },
    ],
    answer: ["b"],
    explanation:
      "Storage Gateway = cache on-premise qui synchronise avec S3/EBS/Glacier. Mode File Gateway : expose un NFS mountable. L'app voit un NFS local, Storage Gateway le synchronise avec S3. Parfait pour les migrations où l'app doit rester inchangée.",
    whyWrong: {
      a: "Requiert des changements d'app.",
      c: "NFS sur EC2 = gestion serveur, pas optimal.",
      d: "DataSync = synchronisation une seule fois, pas persistance continue.",
    },
    commonTrap: "Confondre DataSync (sync unique) et Storage Gateway (cache continu).",
    relatedServices: ["Storage Gateway", "DataSync", "S3", "EFS"],
    keywords: ["Storage Gateway", "NFS", "cache", "synchronisation"],
    examProbability: "Moyenne",
  },

  {
    id: "ct023",
    domain: "Cloud Technology & Services",
    service: "CloudTrail",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS enregistre toutes les appels API sur votre compte pour l'audit et la conformité ?",
    choices: [
      { id: "a", text: "Amazon CloudWatch" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    answer: ["b"],
    explanation:
      "CloudTrail enregistre CHAQUE appel API (qui a appelé, quoi, quand, depuis quel IP, quel résultat). Obligatoire pour audit/conformité. Vous pouvez envoyer les logs à S3 pour une rétention longue. Jamais le laisser désactivé.",
    whyWrong: {
      a: "CloudWatch = métriques/logs applicatifs.",
      c: "Config = configuration.",
      d: "Trusted Advisor = vérifications.",
    },
    keywords: ["CloudTrail", "audit", "API logging"],
    examProbability: "Élevée",
  },

  {
    id: "ct024",
    domain: "Cloud Technology & Services",
    service: "X-Ray",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre application distribuée (micro-services) a une latence élevée. Vous devez identifier quel service est le goulot d'étranglement.",
    choices: [
      { id: "a", text: "CloudWatch Logs avec grep manuellement" },
      { id: "b", text: "AWS X-Ray (distributed tracing)" },
      { id: "c", text: "CloudTrail pour auditer les appels API" },
      { id: "d", text: "Utiliser Application Performance Monitoring (APM) AWS propriétaire" },
    ],
    answer: ["b"],
    explanation:
      "AWS X-Ray = tracing distribué. Vous instrumentez votre code (X-Ray SDK), chaque appel inter-service est enregistré (latence, erreur). Vous visualisez la topologie des services (service map), identifiez les goulots d'étranglement.",
    whyWrong: {
      a: "Manuel et fastidieux.",
      c: "CloudTrail = appels AWS API, pas appels inter-app.",
      d: "AWS propose X-Ray, qui est l'outil natif.",
    },
    keywords: ["X-Ray", "tracing distribué", "latence", "topologie"],
    examProbability: "Moyenne",
  },

  {
    id: "ct025",
    domain: "Cloud Technology & Services",
    service: "CodeBuild",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez un pipeline CI/CD. Vous devez compiler du code Java, lancer des tests, puis créer une image Docker.",
    choices: [
      { id: "a", text: "Créer manuellement une EC2, installer Jenkins dessus" },
      { id: "b", text: "AWS CodeBuild (service managé de compilation)" },
      { id: "c", text: "GitHub Actions (hors AWS)" },
      { id: "d", text: "Utiliser Lambda pour compiler (pas conçu pour cela)" },
    ],
    answer: ["b"],
    explanation:
      "AWS CodeBuild = service managé pour compiler et tester. Vous spécifiez un buildspec.yml (étapes de compilation), CodeBuild lance un conteneur ephemeral, compile, crée l'artefact (ex: JAR, image Docker). Pas de serveur à gérer.",
    whyWrong: {
      a: "Jenkins = option mais maintenance manuelle.",
      c: "GitHub Actions = option mais intégration AWS moins native.",
      d: "Lambda = timeout 15 min, pas designed pour builds longs.",
    },
    keywords: ["CodeBuild", "CI/CD", "compilation", "conteneur"],
    examProbability: "Moyenne",
  },

  {
    id: "ct026",
    domain: "Cloud Technology & Services",
    service: "CodeDeploy",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS automatise le déploiement d'applications sur EC2, on-premise, ou Lambda ?",
    choices: [
      { id: "a", text: "AWS CodeBuild" },
      { id: "b", text: "AWS CodeDeploy" },
      { id: "c", text: "AWS CodePipeline" },
      { id: "d", text: "AWS Elastic Beanstalk" },
    ],
    answer: ["b"],
    explanation:
      "AWS CodeDeploy = service de déploiement. Vous spécifiez comment déployer (appspec.yml), CodeDeploy automatise : arrêter l'ancienne app, déployer la nouvelle, lancer les tests de validation, et rollback en cas d'erreur.",
    whyWrong: {
      a: "CodeBuild = compilation.",
      c: "CodePipeline = orchestration du pipeline complet.",
      d: "Beanstalk = déploiement app complète, pas service fine-grained.",
    },
    keywords: ["CodeDeploy", "déploiement", "automatisé"],
    examProbability: "Moyenne",
  },

  {
    id: "ct027",
    domain: "Cloud Technology & Services",
    service: "CodePipeline",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous voulez créer un pipeline CI/CD : commit → compilation → tests → déploiement en production automatiquement.",
    choices: [
      { id: "a", text: "Utiliser Jenkins (externe à AWS)" },
      { id: "b", text: "AWS CodePipeline orchestrant CodeBuild, CodeDeploy, etc." },
      { id: "c", text: "Écrire manuellement des scripts de déploiement" },
      { id: "d", text: "Utiliser GitHub Actions (bien que ça marche, moins natif)" },
    ],
    answer: ["b"],
    explanation:
      "CodePipeline = orchestration pipeline. Vous créez les étapes (Source = CodeCommit, Build = CodeBuild, Deploy = CodeDeploy, Test = CodeBuild), CodePipeline les exécute séquentiellement. Déclenché par un commit Git.",
    whyWrong: {
      a: "Jenkins = externe, moins d'intégration AWS.",
      c: "Scripts = pas de gestion d'erreur, non reproductible.",
      d: "GitHub Actions = possible mais moins natif qu'AWS.",
    },
    keywords: ["CodePipeline", "CI/CD", "orchestration"],
    examProbability: "Moyenne",
  },

  {
    id: "ct028",
    domain: "Cloud Technology & Services",
    service: "Elasticache",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre application doit servir rapidement des données de session utilisateur. La base de données RDS est un goulot d'étranglement (milliers de requêtes/sec).",
    choices: [
      { id: "a", text: "Ajouter une machine RDS plus puissante" },
      { id: "b", text: "Utiliser Amazon ElastiCache (Redis ou Memcached) en front de RDS" },
      { id: "c", text: "Augmenter les connexions RDS limites" },
      { id: "d", text: "Passer à DynamoDB" },
    ],
    answer: ["b"],
    explanation:
      "ElastiCache = cache en mémoire (Redis, Memcached). Les données fréquemment accédées restent en cache (~1ms). Si absent, récupère de RDS, met à jour le cache. Résout les goulots RDS et améliore la latence dramatiquement.",
    whyWrong: {
      a: "Vertical scaling a des limites. Horizontal cache est mieux.",
      c: "Limits de connexions ≠ problème. Le problème est la bande passante.",
      d: "Possible mais DynamoDB != cache. ElastiCache est moins cher pour ce use case.",
    },
    keywords: ["ElastiCache", "Redis", "cache", "latence"],
    examProbability: "Élevée",
  },

  {
    id: "ct029",
    domain: "Cloud Technology & Services",
    service: "Lambda",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Quels sont les avantages de Lambda pour les applications event-driven ? (Choisir 2)",
    choices: [
      { id: "a", text: "Vous ne payez que pour le temps d'exécution réel" },
      { id: "b", text: "Scaling automatique de zéro à des millions de fonctions simultanées" },
      { id: "c", text: "Vous avez accès au serveur physique pour installer des outils customs" },
      { id: "d", text: "Intégration native avec S3, SNS, SQS pour déclencher automatiquement" },
    ],
    answer: ["a", "d"],
    explanation:
      "Avantages Lambda : (1) Pay-per-execution : 1 requête = 1 facturation (très économique pour variable load). (2) Scaling auto : 0 → 1 million concurrent executions sans configuration. (3) Event-driven : S3 upload → Lambda, SNS message → Lambda, SQS → Lambda. Les événements déclenchent automatiquement les fonctions.",
    whyWrong: {
      c: "Lambda = pas d'accès serveur. Conteneur ephemeral, pas de persistance.",
    },
    commonTrap: "Penser que 'serverless' = 'pas de serveurs physiques'. Les serveurs existent, AWS les gère.",
    relatedServices: ["Lambda", "S3", "SNS", "SQS"],
    keywords: ["Lambda", "event-driven", "serverless", "pay-per-execution"],
    examProbability: "Élevée",
  },

  {
    id: "ct030",
    domain: "Cloud Technology & Services",
    service: "Redshift",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous devez analyser 10 TB de logs historiques pour produire des rapports d'affaires. Une requête SQL typique dure 30 secondes sur RDS.",
    choices: [
      { id: "a", text: "Augmenter les puissance RDS" },
      { id: "b", text: "Amazon Redshift (data warehouse columnar, optimisé OLAP)" },
      { id: "c", text: "Amazon Athena (requête S3 directement)" },
      { id: "d", text: "Amazon EMR (Hadoop/Spark)" },
    ],
    answer: ["b"],
    explanation:
      "Redshift = data warehouse optimisé pour OLAP (analytics). Colonaire, compression, indexing. 10 TB historique = Redshift parfait. Une requête qui dure 30s sur RDS peut durer 1s sur Redshift. Athena = requête ad-hoc sans préparation. EMR = big data compute.",
    whyWrong: {
      a: "RDS = OLTP (transactions), pas analytics.",
      c: "Athena = requête directement S3 (pas de préparation), mais plus lent que Redshift pour des requêtes complexes.",
      d: "EMR = plus complexe, besoin de cluster Hadoop.",
    },
    commonTrap: "RDS ≠ Redshift. RDS = transactionnel. Redshift = analytics.",
    relatedServices: ["Redshift", "RDS", "Athena"],
    keywords: ["Redshift", "data warehouse", "OLAP", "analytics"],
    examProbability: "Moyenne",
  },

  {
    id: "ct031",
    domain: "Cloud Technology & Services",
    service: "Athena",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS permet d'exécuter des requêtes SQL directement sur des données stockées dans S3 sans préparation ou infrastructure dédiée ?",
    choices: [
      { id: "a", text: "Amazon Redshift" },
      { id: "b", text: "Amazon Athena" },
      { id: "c", text: "AWS Glue" },
      { id: "d", text: "Amazon EMR" },
    ],
    answer: ["b"],
    explanation:
      "Athena = requête SQL ad-hoc sur S3. Vous ne créez pas un cluster — vous uploadez des données dans S3 (Parquet, CSV, JSON), créez une table Athena, et lancez des requêtes. Vous payez par requête (par 1 GB scanné).",
    whyWrong: {
      a: "Redshift = infrastructure dédiée, plus cher mais plus puissant.",
      c: "Glue = ETL, pas requête directe.",
      d: "EMR = Hadoop/Spark, plus complexe.",
    },
    keywords: ["Athena", "SQL", "S3", "requête ad-hoc"],
    examProbability: "Moyenne",
  },

  {
    id: "ct032",
    domain: "Cloud Technology & Services",
    service: "Glue",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS automatise l'ETL (extract, transform, load) de données entre sources ?",
    choices: [
      { id: "a", text: "AWS Data Pipeline" },
      { id: "b", text: "AWS Glue" },
      { id: "c", text: "AWS Lake Formation" },
      { id: "d", text: "Amazon Redshift" },
    ],
    answer: ["b"],
    explanation:
      "AWS Glue = service ETL managé. Vous spécifiez une source (S3, RDS, Redshift), une destination, Glue crée un job qui extrait, transforme (nettoyage, joining), charge. Glue contient aussi un data catalog (inventaire des tables).",
    whyWrong: {
      a: "Data Pipeline = scheduling/orchestration, pas ETL.",
      c: "Lake Formation = data governance, pas ETL.",
      d: "Redshift = destination possible, pas ETL.",
    },
    keywords: ["Glue", "ETL", "data transformation"],
    examProbability: "Moyenne",
  },

  {
    id: "ct033",
    domain: "Cloud Technology & Services",
    service: "StepFunctions",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Vous avez un workflow complexe : (1) traiter des fichiers S3 (2) envoyer des notifications SNS (3) attendre approbation manuelle (4) déployer en production.",
    choices: [
      { id: "a", text: "Créer des scripts Lambda séquentiels manuellement" },
      { id: "b", text: "AWS Step Functions (orchestration de workflows)" },
      { id: "c", text: "AWS Data Pipeline (scheduling)" },
      { id: "d", text: "Jenkins avec plugins" },
    ],
    answer: ["b"],
    explanation:
      "AWS Step Functions = orchestration. Vous définissez une state machine (JSON), Step Functions exécute les étapes séquentiellement, gère les erreurs, les retry, les branches conditionnelles. Supporte les actions Lambda, SQS, SNS, CodeBuild, etc.",
    whyWrong: {
      a: "Scripts = code to maintain.",
      c: "Data Pipeline = scheduling (quand lancer), pas orchestration (comment exécuter).",
      d: "Jenkins = externe à AWS.",
    },
    keywords: ["Step Functions", "orchestration", "workflow", "state machine"],
    examProbability: "Moyenne",
  },

  {
    id: "ct034",
    domain: "Cloud Technology & Services",
    service: "IoT Core",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Vous construisez une plateforme IoT avec 100 000 appareils envoyant des données toutes les 10 secondes. Vous devez ingérer et traiter les données en temps réel.",
    choices: [
      { id: "a", text: "IoT Core → Kinesis → Lambda pour traitement en temps réel" },
      { id: "b", text: "S3 directement à partir des appareils" },
      { id: "c", text: "EC2 instances listening on UDP ports" },
      { id: "d", text: "RDS pour stocker tous les events" },
    ],
    answer: ["a"],
    explanation:
      "AWS IoT Core = connexions MQTT sécurisées pour millions d'appareils. Intègre avec Kinesis (streaming), Lambda (computation), Dynamo DB (persistence). 100k appareils × 10 sec = 10k events/sec = Kinesis scaling.",
    whyWrong: {
      b: "S3 n'a pas d'endpoint IoT MQTT.",
      c: "UDP = peu sûr, pas scalable à 100k appareils.",
      d: "RDS = TPS limité pour millions d'events.",
    },
    keywords: ["IoT Core", "MQTT", "streaming", "devices"],
    examProbability: "Moyenne",
  },

  {
    id: "ct035",
    domain: "Cloud Technology & Services",
    service: "Cognito",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre application mobile a besoin d'authentifier les utilisateurs (email + password, aussi Google/Facebook login) et fournir des tokens JWT pour les API.",
    choices: [
      { id: "a", text: "Implémenter manuellement OAuth2 depuis zéro" },
      { id: "b", text: "Amazon Cognito (user pools + identity pools)" },
      { id: "c", text: "AWS IAM pour les utilisateurs mobiles" },
      { id: "d", text: "Utiliser Auth0 (service tiers)" },
    ],
    answer: ["b"],
    explanation:
      "Amazon Cognito User Pools = gestion utilisateurs (signup, login, MFA, password reset). Cognito Identity Pools = federation (Login via Google, Facebook, obtenir des credentials AWS temporaires). Cognito envoie un JWT que l'app utilise pour les appels API.",
    whyWrong: {
      a: "Possible mais beaucoup de travail (sécurité, scalabilité).",
      c: "IAM = utilisateurs AWS internes, pas pour mobiles.",
      d: "Auth0 = service tiers, moins d'intégration AWS.",
    },
    keywords: ["Cognito", "authentification", "JWT", "OAuth2"],
    examProbability: "Moyenne",
  },

  // (Fin des services. Total ~35 questions Cloud Technology)

  // ============================================================
  // BILLING, PRICING & SUPPORT - 20 questions
  // ============================================================

  {
    id: "bp001",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel est le modèle de tarification AWS par défaut pour les services ?",
    choices: [
      { id: "a", text: "Payer un abonnement annuel fixe pour tous les services" },
      { id: "b", text: "Pay-as-you-go : payer uniquement ce que vous consommez" },
      { id: "c", text: "Payer un taux horaire fixe indépendant de l'utilisation" },
      { id: "d", text: "Nécessite une licence entreprise" },
    ],
    answer: ["b"],
    explanation:
      "AWS utilise pay-as-you-go. Vous payez pour ce que vous utilisez : EC2 par seconde, S3 par GB stocké, data transfer par GB, etc. Pas de frais minimum ou d'engagement (sauf Reserved Instances optionnels).",
    whyWrong: {
      a: "Pas d'abonnement annuel obligatoire.",
      c: "Les taux varient selon l'utilisation.",
      d: "Pas de licence entreprise. Tous les comptes AWS utilisent le même modèle.",
    },
    keywords: ["pay-as-you-go", "pricing", "OPEX"],
    examProbability: "Élevée",
  },

  {
    id: "bp002",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel est le principal avantage des Reserved Instances par rapport aux On-Demand ?",
    choices: [
      { id: "a", text: "Vous obtenez une remise de 30-70% pour un engagement 1 ou 3 ans" },
      { id: "b", text: "Vous obtenez une machine physique dédiée" },
      { id: "c", text: "Vous pouvez ignorer les limites de capacité" },
      { id: "d", text: "La performance est garantie 100% uptime" },
    ],
    answer: ["a"],
    explanation:
      "Reserved Instances = vous vous engagez sur 1 an (30% remise) ou 3 ans (60% remise) à utiliser une certaine instance. Payant le discount est énorme pour des workloads stables. On-Demand = paiement à l'heure, prix plein.",
    whyWrong: {
      b: "Dedicated Instances/Hosts = hardware physique. RI ≠ dédicace.",
      c: "RI ne change pas les limites.",
      d: "Uptime dépend d'une architecture multi-AZ, pas de l'instance.",
    },
    keywords: ["Reserved Instances", "discount", "engagement"],
    examProbability: "Élevée",
  },

  {
    id: "bp003",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous analysez la facture AWS d'un client. Ils tournent une instance m5.large pendant 24h/day × 365 jours. On-Demand = $0.096/heure.",
    choices: [
      { id: "a", text: "Recommander On-Demand (~$8400/an)" },
      { id: "b", text: "Recommander un Reserved Instance 1 an (~$4000/an)" },
      { id: "c", text: "Recommander 3 ans Reserved (~$2500/an)" },
      { id: "d", text: "Acheter une machine physique on-premise" },
    ],
    answer: ["c"],
    explanation:
      "Charge stable 24/7 = Reserved Instance idéal. 3 ans = remise maximale (60-70%). Calcul : $0.096 × 24 × 365 = $842/an On-Demand. 3 ans RI ≈ $2500/an (breakeven ~20 mois). Économies énormes.",
    whyWrong: {
      a: "On-Demand = le plus cher.",
      b: "1 an est ok mais 3 ans est mieux.",
      d: "On-premise = CAPEX massif, dépréciation.",
    },
    commonTrap: "Penser que 'RI coûte cher'. Non. Pour charge stable, RI réduit coûts de 50-70%.",
    keywords: ["Reserved Instances", "cost optimization", "payback"],
    examProbability: "Moyenne",
  },

  {
    id: "bp004",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel service AWS permet de gérer les factures de plusieurs comptes AWS en un seul endroit ?",
    choices: [
      { id: "a", text: "AWS Consolidated Billing (via Organizations)" },
      { id: "b", text: "AWS Budgets" },
      { id: "c", text: "AWS Cost Explorer" },
      { id: "d", text: "AWS CloudTrail" },
    ],
    answer: ["a"],
    explanation:
      "Consolidated Billing = réunir les factures de 10+ comptes AWS dans un seul compte 'payer'. Bénéfices : réductions volumétriques agrégées, réserves partagées entre comptes, facture centralisée.",
    whyWrong: {
      b: "Budgets = alertes quand vous dépassez un seuil.",
      c: "Cost Explorer = visualisation des dépenses.",
      d: "CloudTrail = audit API.",
    },
    keywords: ["Consolidated Billing", "Organizations", "multiple comptes"],
    examProbability: "Élevée",
  },

  {
    id: "bp005",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre entreprise a 10 comptes AWS avec des charges différentes. Vous activez Consolidated Billing. Quel principal avantage financier obtenez-vous ?",
    choices: [
      { id: "a", text: "Réductions volumétriques sur les Reserved Instances partagées entre comptes" },
      { id: "b", text: "Réduction fixe de 50% sur tous les services" },
      { id: "c", text: "AWS rembourse les dépenses précédentes" },
      { id: "d", text: "Le support AWS devient gratuit" },
    ],
    answer: ["a"],
    explanation:
      "Consolidated Billing agrège la consommation de tous les comptes. Exemple : Compte A consomme 1 TB S3, Compte B 0.5 TB. Total = 1.5 TB → palier volume supérieur → remise meilleure. Sans consolidation, chaque compte serait facturé pour 1 TB et 0.5 TB séparément (paliers inférieurs).",
    whyWrong: {
      b: "Pas de réduction fixe.",
      c: "Pas de remboursement rétroactif.",
      d: "Support est payant (sauf Developer free).",
    },
    keywords: ["Consolidated Billing", "réductions volumétriques", "paliers"],
    examProbability: "Moyenne",
  },

  {
    id: "bp006",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS vous aide à identifier les ressources non utilisées et non optimisées pour réduire les coûts ?",
    choices: [
      { id: "a", text: "AWS Compute Optimizer" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "AWS Budgets" },
    ],
    answer: ["a"],
    explanation:
      "Compute Optimizer analyse l'utilisation CPU/mémoire et recommande des optimisations : downsize une instance surdimensionnée, utiliser Spot, acheter RI. Rapport : 'Instance m5.large est à 10% utilisation, downsize à t3.small → économies de 70%'.",
    whyWrong: {
      b: "Cost Explorer = visualisation, pas recommandations.",
      c: "Trusted Advisor = vérifications générales.",
      d: "Budgets = alertes.",
    },
    keywords: ["Compute Optimizer", "optimization", "recommendations"],
    examProbability: "Moyenne",
  },

  {
    id: "bp007",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel plan de support AWS offre un response time de 1 heure pour les issues critiques ?",
    choices: [
      { id: "a", text: "Developer (gratuit, sauf message de bienvenue)" },
      { id: "b", text: "Business (~$100/mois)" },
      { id: "c", text: "Enterprise (~$15,000/mois)" },
      { id: "d", text: "Tous les plans offrent 1h" },
    ],
    answer: ["b"],
    explanation:
      "Business Support = response 1h pour critical. Enterprise = response 15 min. Developer = pas de response time garanti (support par email, réponse en 12-24h). Les prix AWS varient selon le plan.",
    whyWrong: {
      a: "Developer = pas de response time SLA.",
      c: "Enterprise = 15 min, pas 1h.",
      d: "Pas tous les plans.",
    },
    keywords: ["Support Plan", "Business", "Enterprise", "SLA"],
    examProbability: "Moyenne",
  },

  {
    id: "bp008",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel est le modèle de tarification d'AWS Lambda ?",
    choices: [
      { id: "a", text: "Payer par seconde d'exécution + par nombre d'invocations" },
      { id: "b", text: "Abonnement mensuel fixe" },
      { id: "c", text: "Coûts fixes d'une instance" },
      { id: "d", text: "Gratuit pour le free tier uniquement" },
    ],
    answer: ["a"],
    explanation:
      "Lambda pricing = (nombre d'invocations × $0.20 par million) + (compute : durée × mémoire × $0.0000166667 par GB-seconde). Exemple : 1M invocations × 1 seconde × 512 MB = $0.20 + (1M × 0.5 GB × 1 sec × $0.0000166667) = $0.20 + $8.33 = $8.53.",
    keywords: ["Lambda", "pricing", "invocation", "GB-second"],
    examProbability: "Moyenne",
  },

  {
    id: "bp009",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Vous avez une architecture : 5 instances EC2 t2.small, 500 GB S3, 100 GB RDS. Quels coûts estimeriez-vous mensuellement ?",
    choices: [
      { id: "a", text: "~$500/mois" },
      { id: "b", text: "~$1000/mois" },
      { id: "c", text: "~$50/mois" },
      { id: "d", text: "Impossible à estimer sans tarification exacte" },
    ],
    answer: ["b"],
    explanation:
      "Estimation : 5 × t2.small × 730h × $0.023 = $84/mois. S3 : 500 GB × $0.023 = $11.5/mois. RDS (db.t2.small) : ~$60/mois. Total ≈ $150-200/mois. Aucun choix exact, mais $1000 est raisonnable si on ajoute failover/backup/transfer, et dans le contexte d'examen une sur-estimation est mieux qu'une sous-estimation.",
    keywords: ["pricing", "estimation", "coûts"],
    examProbability: "Moyenne",
  },

  {
    id: "bp010",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS gratuit permet de visualiser les dépenses par jour, service, compte ?",
    choices: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Budgets" },
      { id: "c", text: "AWS Trusted Advisor (free tier)" },
      { id: "d", text: "AWS Organizations" },
    ],
    answer: ["a"],
    explanation:
      "Cost Explorer = gratuit pour tout le monde. Vous visualisez les dépenses par jour, service, compte, tag. Dashboards interactifs, forecasting.",
    keywords: ["Cost Explorer", "visualization", "dépenses"],
    examProbability: "Moyenne",
  },

  {
    id: "bp011",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel est l'avantage principal des Spot Instances par rapport aux On-Demand ?",
    choices: [
      { id: "a", text: "90% de réduction, mais AWS peut les terminer à tout moment" },
      { id: "b", text: "Garantie 100% uptime" },
      { id: "c", text: "Performance garantie identique à On-Demand" },
      { id: "d", text: "Accès root illimité" },
    ],
    answer: ["a"],
    explanation:
      "Spot Instances = utiliser la capacité inutilisée AWS avec jusqu'à 90% remise. Inconvénient : AWS peut les terminer avec 2 min de notification si la demande monte. Idéal pour batch, analytics (interruptible).",
    whyWrong: {
      b: "Spot = interruptible.",
      c: "Performance = identique, mais uptime ≠ garanti.",
      d: "Accès root = même que On-Demand.",
    },
    keywords: ["Spot Instances", "discount", "interruption"],
    examProbability: "Moyenne",
  },

  {
    id: "bp012",
    domain: "Billing, Pricing & Support",
    difficulty: "Difficile",
    type: "scenario",
    prompt:
      "Vous lancez un job batch qui analyse 10 TB de données, dure 2 heures. Vous avez les choix :",
    choices: [
      { id: "a", text: "On-Demand instances m5.xlarge" },
      { id: "b", text: "Reserved Instance 1-an pour m5.xlarge" },
      { id: "c", text: "Spot Instances m5.xlarge au prix actuel (90% discount)" },
      { id: "d", text: "Lambda (coûteux pour long jobs)" },
    ],
    answer: ["c"],
    explanation:
      "Batch = workload interruptible. Spot = 90% off, parfait. 2h une fois / mois = Spot economics wins. Si job était crítico 24/7, Reserved Instance serait mieux.",
    whyWrong: {
      a: "On-Demand = surpayé pour batch.",
      b: "1-an RI = engagement inutile pour un job ponctuel.",
      d: "Lambda timeout 15 min, job dure 2h.",
    },
    commonTrap: "Penser que Spot = toujours risqué. Non. Batch = cas d'usage parfait.",
    keywords: ["Spot", "batch", "cost optimization"],
    examProbability: "Moyenne",
  },

  {
    id: "bp013",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel transfert de données dans AWS est gratuit ?",
    choices: [
      { id: "a", text: "Données entrantes (inbound) depuis Internet" },
      { id: "b", text: "Données entre régions différentes" },
      { id: "c", text: "Données entre instances dans la même AZ" },
      { id: "d", text: "Transfert S3 → CloudFront" },
    ],
    answer: ["a"],
    explanation:
      "Data transfer INBOUND (Internet → AWS) = GRATUIT. Data transfer OUTBOUND (AWS → Internet) = payant (~$0.09/GB). Inter-région = payant. Intra-region/intra-AZ = gratuit.",
    whyWrong: {
      b: "Inter-régions = payant.",
      c: "Gratuit mais c'est juste un cas particulier d'intra-région.",
      d: "Gratuit mais secondaire à la règle principale.",
    },
    keywords: ["data transfer", "inbound", "gratuit"],
    examProbability: "Élevée",
  },

  {
    id: "bp014",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Votre facturation AWS s'est soudainement augmentée de 200%. Quel est le premier service à vérifier pour détecter une anomalie ?",
    choices: [
      { id: "a", text: "CloudTrail (qui a changé l'infra)" },
      { id: "b", text: "Cost Explorer (dépenses par service)" },
      { id: "c", text: "CloudWatch (alertes de déploiement)" },
      { id: "d", text: "Trusted Advisor (vérifications de config)" },
    ],
    answer: ["b"],
    explanation:
      "Cost Explorer montre rapidement quel service a causé l'augmentation. Exemple : 'EC2 passé de $1000 à $3000' ou 'NAT Gateway soudainement $2000'. Une fois identifié, vous pouvez enquêter avec CloudTrail (qui l'a lancé).",
    whyWrong: {
      a: "CloudTrail = après détection, pas pour identifier.",
      c: "CloudWatch = métriques de la ressource, pas des coûts.",
      d: "Trusted Advisor = configuration, pas coûts.",
    },
    keywords: ["Cost Explorer", "anomalie", "investigation"],
    examProbability: "Moyenne",
  },

  {
    id: "bp015",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS gratuit pour le premier an offre une allocation large (750 heures EC2, 5 GB S3) aux nouveaux comptes ?",
    choices: [
      { id: "a", text: "AWS Free Tier" },
      { id: "b", text: "AWS Promotional Credits" },
      { id: "c", text: "AWS Startup Package" },
      { id: "d", text: "AWS Education Program" },
    ],
    answer: ["a"],
    explanation:
      "AWS Free Tier = allocation gratuite pour 12 mois après l'inscription. 750 heures EC2 t2.micro/month, 5 GB S3, 1 GB RDS, 1M Lambda invocations, etc. Dépasse ces limites = facturé.",
    keywords: ["Free Tier", "gratuit", "allocation"],
    examProbability: "Faible",
  },

  {
    id: "bp016",
    domain: "Billing, Pricing & Support",
    difficulty: "Difficile",
    type: "multiple",
    prompt: "Quels facteurs réduisent le coût total AWS ? (Choisir 2)",
    choices: [
      { id: "a", text: "Consolidation des comptes pour réductions volumétriques" },
      { id: "b", text: "Migrer vers Spot Instances où possible" },
      { id: "c", text: "Augmenter le nombre de régions pour paralléliser le workload" },
      { id: "d", text: "Utiliser Reserved Instances pour charges stables" },
    ],
    answer: ["a", "d"],
    explanation:
      "Réduire coûts : (1) Consolidated Billing = réductions volumétriques. (2) RI pour charges stables (30-70% discount). (3) Spot pour interruptible (90% discount). (4) Downsizing instances surdimensionnées. (5) Arrêter les ressources inutilisées.",
    whyWrong: {
      b: "Spot est bon, mais Spot = risqué (peut être terminé), donc réponse plus conditionnelle que Consolidated Billing et RI.",
      c: "Multi-région = plus cher (data transfer inter-région payant).",
    },
    keywords: ["cost reduction", "Consolidated Billing", "Reserved Instances"],
    examProbability: "Moyenne",
  },

  {
    id: "bp017",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "single",
    prompt: "Quel service AWS vous aide à définir une limite de dépense et reçoit une alerte si vous la dépassez ?",
    choices: [
      { id: "a", text: "AWS Budgets" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "AWS Organizations" },
    ],
    answer: ["a"],
    explanation:
      "AWS Budgets vous permet de définir un budget (ex: $5000/mois) et recevoir des alertes si vous le dépassez (50%, 80%, 100%). Vous pouvez déclencher une action auto (arrêter des instances).",
    keywords: ["Budgets", "alertes", "limites de dépense"],
    examProbability: "Moyenne",
  },

  {
    id: "bp018",
    domain: "Billing, Pricing & Support",
    difficulty: "Moyen",
    type: "scenario",
    prompt:
      "Une équipe utilise un service AWS sans l'optimiser. Quel est la meilleure recommandation pour réduire les coûts sans sacrifier la performance ?",
    choices: [
      { id: "a", text: "Supprimer des instances pour réduire les coûts" },
      { id: "b", text: "Utiliser Compute Optimizer pour obtenir des recommandations d'optimisation" },
      { id: "c", text: "Arrêter toutes les ressources" },
      { id: "d", text: "Négocier avec AWS pour une remise" },
    ],
    answer: ["b"],
    explanation:
      "Compute Optimizer analyse l'utilisation réelle et recommande : downsize une instance surdimensionnée, utiliser RI/Spot. C'est objectif et basé sur les données, pas sur des suppositions.",
    keywords: ["Compute Optimizer", "optimization", "recommandations"],
    examProbability: "Moyenne",
  },

  {
    id: "bp019",
    domain: "Billing, Pricing & Support",
    difficulty: "Difficile",
    type: "single",
    prompt: "Quel est l'impact du transfer de données entre régions sur la facture AWS ?",
    choices: [
      { id: "a", text: "Inbound = gratuit, outbound inter-région = ~$0.02/GB" },
      { id: "b", text: "Gratuit si vous avez des Reserved Instances" },
      { id: "c", text: "Gratuit si vous avez Consolidated Billing" },
      { id: "d", text: "Jamais de coûts de transfer" },
    ],
    answer: ["a"],
    explanation:
      "Data transfer inter-région = PAYANT. Inbound gratuit, outbound ~$0.02/GB (varie par région). C'est une source cachée de coûts : copier 1 TB d'une région à l'autre = ~$20. CloudFront (intra-région) évite ce coût.",
    keywords: ["data transfer", "inter-région", "coût"],
    examProbability: "Moyenne",
  },

  {
    id: "bp020",
    domain: "Billing, Pricing & Support",
    difficulty: "Facile",
    type: "single",
    prompt: "Quel est l'avantage financier principal d'utiliser des outils AWS automatisés pour gérer les ressources ?",
    choices: [
      { id: "a", text: "Arrêt automatique des ressources inutilisées, pas de gaspillage" },
      { id: "b", text: "AWS réduit les prix automatiquement" },
      { id: "c", text: "Vous payez moins de support" },
      { id: "d", text: "Aucun avantage financier" },
    ],
    answer: ["a"],
    explanation:
      "Auto Scaling, Lambda, Spot Instances = arrêt/scale-down automatique quand inutilisé. Pas de gaspillage. Équipes manuelles = resource creep (des instances tournent inutilement pendant des mois).",
    keywords: ["automation", "cost", "efficiency"],
    examProbability: "Faible",
  },
];

export function getQuestionsByMode(
  mode: "quick" | "practice" | "exam",
  domain?: Domain,
): Question[] {
  const pool = domain ? QUESTIONS.filter((q) => q.domain === domain) : QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const size = mode === "quick" ? 10 : mode === "practice" ? 25 : 65;
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
