import type { Solution, FeatureScore, SolutionCategory } from '../types/solution'

interface FlavourText {
  strong: string | null
  weak: string | null
}

// Feature cluster definitions — groups of related feature IDs that map to a flavour phrase
// Each cluster is tagged with relevant categories so results feel contextual
interface Cluster {
  phrase: string
  featureIds: string[]
  categories: SolutionCategory[]  // empty = universal
}

const STRENGTH_CLUSTERS: Cluster[] = [
  { phrase: 'High-volume datarooms', featureIds: ['bulk-processing', 'metadata-extraction', 'export-reporting'], categories: ['e-discovery', 'dms', 'legal-ai'] },
  { phrase: 'Complex negotiations', featureIds: ['suggested-language', 'negotiation-tracking', 'clause-library', 'risk-scoring'], categories: ['contract-negotiation', 'clm', 'legal-ai'] },
  { phrase: 'Enterprise deployments', featureIds: ['permission-controls', 'role-permissions', 'approval-workflow', 'approval-routing'], categories: ['matter-management', 'practice-management', 'clm'] },
  { phrase: 'Complex and nuanced legal research', featureIds: ['jurisdictional-coverage', 'db-comprehensiveness', 'citation-checking'], categories: ['legal-research', 'compliance', 'legal-ai'] },
  { phrase: 'Due diligence', featureIds: ['ai-clause-id', 'risk-flagging', 'bulk-processing', 'dashboards'], categories: ['e-discovery', 'legal-ai', 'clm'] },
  { phrase: 'Template-heavy workflows', featureIds: ['template-creation', 'conditional-logic', 'template-library', 'multi-doc-gen'], categories: ['doc-automation', 'clm', 'practice-management'] },
  { phrase: 'Cross-team collaboration', featureIds: ['collaboration', 'real-time-collab', 'legal-comms', 'status-dashboards'], categories: ['matter-management', 'practice-management', 'dms'] },
  { phrase: 'Contract portfolio oversight', featureIds: ['contract-repository', 'search-filtering', 'counterparty-mgmt', 'amendment-mgmt'], categories: ['clm', 'contract-negotiation', 'dms'] },
  { phrase: 'Automated document assembly', featureIds: ['template-automation', 'data-integration', 'question-flow', 'output-formats'], categories: ['doc-automation', 'legal-ai', 'practice-management'] },
  { phrase: 'Process automation', featureIds: ['workflow-builder', 'deadline-automation', 'conditional-routing', 'tool-integration'], categories: ['practice-management', 'matter-management', 'billing-time'] },
  { phrase: 'Deep legal analysis', featureIds: ['search-precision', 'nlp-query', 'secondary-sources', 'annotation-tools'], categories: ['legal-research', 'legal-ai', 'e-discovery'] },
  { phrase: 'Risk identification', featureIds: ['risk-flagging', 'risk-scoring', 'ai-clause-id', 'custom-playbook'], categories: ['contract-negotiation', 'compliance', 'legal-ai'] },
  { phrase: 'Version-sensitive work', featureIds: ['redlining', 'version-control', 'version-comparison', 'position-comparison'], categories: ['contract-negotiation', 'doc-automation', 'dms'] },
]

// Category-specific strength overrides — when a general criterion is strong AND the solution
// is in a matching category, use a more specific phrase
const CATEGORY_STRENGTH_PHRASES: Partial<Record<SolutionCategory, Record<string, string>>> = {
  'legal-ai': {
    accuracy: 'AI-critical accuracy demands',
    speed: 'Real-time AI workflows',
    integrations: 'AI pipeline integrations',
    securityCompliance: 'Regulated AI environments',
  },
  'contract-negotiation': {
    accuracy: 'High-stakes deal precision',
    speed: 'Fast-moving negotiations',
    uiUx: 'Lawyer-friendly interfaces',
    securityCompliance: 'Confidential deal security',
  },
  'doc-automation': {
    speed: 'Rapid document generation',
    integrations: 'Multi-system document pipelines',
    uiUx: 'Self-service document creation',
  },
  'clm': {
    integrations: 'Enterprise contract ecosystems',
    securityCompliance: 'Contract data governance',
    customerSupport: 'Complex CLM onboarding',
  },
  'legal-research': {
    accuracy: 'Citation-critical research',
    speed: 'Time-sensitive research queries',
    securityCompliance: 'Privileged research security',
  },
  'e-discovery': {
    speed: 'Litigation deadline pressure',
    accuracy: 'Defensible discovery processes',
    securityCompliance: 'Litigation hold compliance',
  },
  'matter-management': {
    integrations: 'Firm-wide system connectivity',
    uiUx: 'Cross-department usability',
    securityCompliance: 'Matter confidentiality walls',
  },
  'dms': {
    speed: 'High-throughput file operations',
    integrations: 'Office suite integration demands',
    securityCompliance: 'Document access governance',
  },
  'compliance': {
    accuracy: 'Regulatory precision demands',
    securityCompliance: 'Audit-ready compliance posture',
    integrations: 'Regulatory reporting pipelines',
  },
  'practice-management': {
    uiUx: 'Firm-wide user adoption',
    integrations: 'Legal practice tool stacks',
    customerSupport: 'Practice rollout support',
  },
  'billing-time': {
    accuracy: 'Billing accuracy demands',
    speed: 'Time-entry efficiency',
    integrations: 'Finance system integrations',
    securityCompliance: 'Financial data compliance',
  },
}

// Category-specific weakness phrases
const CATEGORY_WEAKNESS_PHRASES: Partial<Record<SolutionCategory, Record<string, string>>> = {
  'legal-ai': {
    accuracy: 'Hallucination-sensitive tasks',
    securityCompliance: 'Regulated AI environments',
  },
  'contract-negotiation': {
    speed: 'Fast-turnaround deals',
    accuracy: 'High-stakes clause precision',
  },
  'clm': {
    integrations: 'Complex enterprise stacks',
    securityCompliance: 'Contract security mandates',
  },
  'e-discovery': {
    accuracy: 'Defensibility requirements',
    speed: 'Litigation deadline pressure',
  },
  'compliance': {
    accuracy: 'Regulatory precision demands',
    securityCompliance: 'Audit-critical environments',
  },
}

// Fallback general criteria weakness phrases
const WEAKNESS_GENERAL: Record<string, string> = {
  pricing: 'Tight budgets',
  customerSupport: 'Teams needing hand-holding',
  integrations: 'Complex tech stacks',
  speed: 'Time-critical workflows',
  accuracy: 'Precision-critical tasks',
  uiUx: 'Non-technical users',
  securityCompliance: 'Security-sensitive environments',
}

// Fallback general criteria strength phrases
const STRENGTH_GENERAL: Record<string, string> = {
  pricing: 'Cost-conscious teams',
  customerSupport: 'First-time adopters',
  integrations: 'Multi-tool ecosystems',
  speed: 'High-pressure deadlines',
  accuracy: 'Precision-critical work',
  uiUx: 'User adoption challenges',
  securityCompliance: 'Security-first organisations',
}

function getAllFeatureScores(solution: Solution): Record<string, number> {
  const scores: Record<string, number> = {}
  for (const areaId of solution.evaluationAreas) {
    const ratings = solution.featureRatings[areaId]
    if (!ratings) continue
    for (const [featureId, score] of Object.entries(ratings)) {
      if (score > 0) scores[featureId] = score
    }
  }
  return scores
}

function clusterScore(featureScores: Record<string, number>, featureIds: string[]): { avg: number; count: number } {
  const scored = featureIds.map(id => featureScores[id]).filter((s): s is number => s !== undefined && s > 0)
  if (scored.length === 0) return { avg: 0, count: 0 }
  return { avg: scored.reduce((a, b) => a + b, 0) / scored.length, count: scored.length }
}

export function getFlavourText(solution: Solution): FlavourText {
  const featureScores = getAllFeatureScores(solution)
  const gen = solution.generalRatings
  const cat = solution.category

  // Find best strength cluster — prioritise clusters tagged with this solution's category
  let bestStrong: { phrase: string; avg: number; count: number; categoryMatch: boolean } | null = null
  for (const cluster of STRENGTH_CLUSTERS) {
    const { avg, count } = clusterScore(featureScores, cluster.featureIds)
    if (count >= 2 && avg >= 4) {
      const categoryMatch = cluster.categories.length === 0 || cluster.categories.includes(cat)
      // Prefer category-matching clusters, then higher avg, then more features
      const isBetter = !bestStrong
        || (categoryMatch && !bestStrong.categoryMatch)
        || (categoryMatch === bestStrong.categoryMatch && avg > bestStrong.avg)
        || (categoryMatch === bestStrong.categoryMatch && avg === bestStrong.avg && count > bestStrong.count)
      if (isBetter) {
        bestStrong = { phrase: cluster.phrase, avg, count, categoryMatch }
      }
    }
  }

  // If no feature cluster qualifies, check general criteria for strength
  // Use category-specific phrase if available, otherwise fallback
  if (!bestStrong) {
    let bestGenKey: string | null = null
    let bestGenScore = 0
    for (const [key, score] of Object.entries(gen)) {
      if (score >= 4 && score > bestGenScore) {
        bestGenScore = score
        bestGenKey = key
      }
    }
    if (bestGenKey) {
      const phrase = CATEGORY_STRENGTH_PHRASES[cat]?.[bestGenKey]
        || STRENGTH_GENERAL[bestGenKey]
      if (phrase) {
        bestStrong = { phrase, avg: bestGenScore, count: 1, categoryMatch: true }
      }
    }
  }

  // Find worst weakness — check general criteria first (more impactful on the card)
  // Use category-specific weakness phrase if available
  let worstWeak: { phrase: string; score: number } | null = null
  for (const [key, score] of Object.entries(gen)) {
    if (score >= 1 && score <= 2) {
      const phrase = CATEGORY_WEAKNESS_PHRASES[cat]?.[key] || WEAKNESS_GENERAL[key]
      if (phrase && (!worstWeak || score < worstWeak.score)) {
        worstWeak = { phrase, score }
      }
    }
  }

  // If no general weakness, look for a weak feature cluster (avg ≤ 2, ≥2 rated)
  // Prefer category-matching clusters
  if (!worstWeak) {
    let worstCluster: { phrase: string; avg: number; categoryMatch: boolean } | null = null
    for (const cluster of STRENGTH_CLUSTERS) {
      const { avg, count } = clusterScore(featureScores, cluster.featureIds)
      if (count >= 2 && avg > 0 && avg <= 2) {
        const categoryMatch = cluster.categories.length === 0 || cluster.categories.includes(cat)
        const isBetter = !worstCluster
          || (categoryMatch && !worstCluster.categoryMatch)
          || (categoryMatch === worstCluster.categoryMatch && avg < worstCluster.avg)
        if (isBetter) {
          worstCluster = { phrase: cluster.phrase, avg, categoryMatch }
        }
      }
    }
    if (worstCluster) {
      worstWeak = { phrase: worstCluster.phrase, score: worstCluster.avg }
    }
  }

  return {
    strong: bestStrong ? bestStrong.phrase : null,
    weak: worstWeak ? worstWeak.phrase : null,
  }
}
