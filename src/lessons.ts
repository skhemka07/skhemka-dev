// Single source of truth for the GCP Infra curriculum.
// Add a lesson here AND drop the matching .md file into src/content/lessons/
// to make it appear on the site.

export interface LessonMeta {
  lesson: string;        // "1.1"
  slug: string;          // "1-1-resource-hierarchy"
  title: string;
  phase: number;
  phaseTitle: string;
  description: string;
  analogy: string;
  status: 'published' | 'draft' | 'planned';
}

export const gcpInfraLessons: LessonMeta[] = [
  // Phase 1
  {
    lesson: '1.1',
    slug: '1-1-resource-hierarchy',
    title: 'The GCP resource hierarchy',
    phase: 1,
    phaseTitle: 'Blueprint & bouncers',
    description: 'Organizations, folders, and projects — how GCP forces you to organize work before you build it.',
    analogy: 'The filing cabinet',
    status: 'published',
  },
  {
    lesson: '1.2',
    slug: '1-2-iam',
    title: 'IAM — identity & access management',
    phase: 1,
    phaseTitle: 'Blueprint & bouncers',
    description: 'The bouncer at the door — who, what, and where for every access decision in GCP.',
    analogy: 'The bouncer and the VIP list',
    status: 'published',
  },
  {
    lesson: '1.3',
    slug: '1-3-org-policies',
    title: 'Organization policies',
    phase: 1,
    phaseTitle: 'Blueprint & bouncers',
    description: 'Org-wide guardrails that prevent even an Owner from doing dumb things — the technical foundation of regulatory compliance.',
    analogy: 'The fire code for your whole building',
    status: 'published',
  },

  // Phase 2
  {
    lesson: '2.1',
    slug: '2-1-vpc-subnets',
    title: 'VPCs & subnets',
    phase: 2,
    phaseTitle: 'Roads & traffic cops',
    description: 'Drawing the borders of your private cloud city and dividing it into neighborhoods.',
    analogy: 'City planning',
    status: 'published',
  },
  {
    lesson: '2.2',
    slug: '2-2-firewalls-nat',
    title: 'Firewalls & Cloud NAT',
    phase: 2,
    phaseTitle: 'Roads & traffic cops',
    description: 'Toll booths and one-way mirrors — what gets in, and how private servers reach the internet.',
    analogy: 'The toll booth and one-way mirror',
    status: 'planned',
  },
  {
    lesson: '2.3',
    slug: '2-3-load-balancing',
    title: 'Cloud load balancing',
    phase: 2,
    phaseTitle: 'Roads & traffic cops',
    description: 'Distributing traffic globally — the difference between an L4 and L7 load balancer, and when to pick which.',
    analogy: 'The ultimate traffic cop',
    status: 'planned',
  },
  {
    lesson: '2.4',
    slug: '2-4-private-google-access',
    title: 'Private Google Access & PSC',
    phase: 2,
    phaseTitle: 'Roads & traffic cops',
    description: 'How private workloads talk to BigQuery, Cloud SQL, and Pub/Sub without ever touching the public internet.',
    analogy: 'The secret service tunnel',
    status: 'planned',
  },

  // Phase 3
  {
    lesson: '3.1',
    slug: '3-1-compute-engine',
    title: 'Compute Engine VMs',
    phase: 3,
    phaseTitle: 'The workhorses',
    description: 'Renting a customized house — when raw VMs are still the right answer in a serverless world.',
    analogy: 'Renting a customized house',
    status: 'planned',
  },
  {
    lesson: '3.2',
    slug: '3-2-gke',
    title: 'GKE — Google Kubernetes Engine',
    phase: 3,
    phaseTitle: 'The workhorses',
    description: 'The apartment complex with the automated landlord — Standard vs Autopilot, and when GKE earns its complexity.',
    analogy: 'The automated landlord',
    status: 'planned',
  },
  {
    lesson: '3.3',
    slug: '3-3-cloud-run',
    title: 'Cloud Run',
    phase: 3,
    phaseTitle: 'The workhorses',
    description: 'The ghost kitchen — request-driven containers that scale to zero and back to a thousand on demand.',
    analogy: 'The ghost kitchen',
    status: 'planned',
  },
  {
    lesson: '3.4',
    slug: '3-4-choosing-compute',
    title: 'Choosing your compute',
    phase: 3,
    phaseTitle: 'The workhorses',
    description: 'A decision framework for VM vs GKE vs Cloud Run vs Functions, with cost and operational trade-offs.',
    analogy: 'The right tool for the job',
    status: 'planned',
  },

  // Phase 4
  {
    lesson: '4.1',
    slug: '4-1-storage-disks',
    title: 'Cloud Storage & persistent disks',
    phase: 4,
    phaseTitle: 'Vaults & filing cabinets',
    description: 'The warehouse and the backpack — object storage for unlimited capacity vs block storage for raw speed.',
    analogy: 'The warehouse and the backpack',
    status: 'planned',
  },
  {
    lesson: '4.2',
    slug: '4-2-cloud-sql-spanner',
    title: 'Cloud SQL & Spanner',
    phase: 4,
    phaseTitle: 'Vaults & filing cabinets',
    description: 'The accountant — relational databases for when consistency matters more than anything else.',
    analogy: 'The organized accountant',
    status: 'planned',
  },
  {
    lesson: '4.3',
    slug: '4-3-bigtable-firestore',
    title: 'Bigtable & Firestore',
    phase: 4,
    phaseTitle: 'Vaults & filing cabinets',
    description: 'The address book — NoSQL for massive scale and rapid reads when relational rigor would slow you down.',
    analogy: 'The massive address book',
    status: 'planned',
  },
  {
    lesson: '4.4',
    slug: '4-4-bigquery',
    title: 'BigQuery',
    phase: 4,
    phaseTitle: 'Vaults & filing cabinets',
    description: 'The library research room — petabyte analytics in seconds, and the architectural pattern that defines GCP.',
    analogy: 'The library research room',
    status: 'planned',
  },

  // Phase 5
  {
    lesson: '5.1',
    slug: '5-1-logging-monitoring',
    title: 'Cloud Logging & Monitoring',
    phase: 5,
    phaseTitle: 'Security cameras',
    description: 'The dashboard and the black box — knowing when things break and reading the evidence after.',
    analogy: 'The dashboard in your car',
    status: 'planned',
  },
  {
    lesson: '5.2',
    slug: '5-2-security-command-center',
    title: 'Security Command Center',
    phase: 5,
    phaseTitle: 'Security cameras',
    description: 'A single pane of glass for every misconfiguration, vulnerability, and threat across the org.',
    analogy: 'The mall security camera room',
    status: 'planned',
  },
  {
    lesson: '5.3',
    slug: '5-3-kms-secrets',
    title: 'Cloud KMS & Secret Manager',
    phase: 5,
    phaseTitle: 'Security cameras',
    description: 'Where keys, tokens, and customer-managed encryption keys actually live — and the audit story for each.',
    analogy: 'The bank vault and the keyring',
    status: 'planned',
  },

  // Phase 6
  {
    lesson: '6.1',
    slug: '6-1-terraform',
    title: 'Terraform fundamentals',
    phase: 6,
    phaseTitle: 'The magic wand',
    description: 'Why professionals never click buttons — declarative infrastructure as the architect\'s superpower.',
    analogy: 'The 3D printer for buildings',
    status: 'planned',
  },
  {
    lesson: '6.2',
    slug: '6-2-iac-pipelines',
    title: 'IaC pipelines & policy-as-code',
    phase: 6,
    phaseTitle: 'The magic wand',
    description: 'The pipeline that turns Terraform from a script into governance — plan review, OPA / Sentinel, and Governance-as-Code.',
    analogy: 'The factory line for infrastructure',
    status: 'planned',
  },
];

export function getLessonByIndex(index: number): LessonMeta | undefined {
  return gcpInfraLessons[index];
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return gcpInfraLessons.find(l => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return gcpInfraLessons.findIndex(l => l.slug === slug);
}
