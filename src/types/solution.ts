export type SolutionCategory =
  | 'legal-ai'
  | 'contract-negotiation'
  | 'doc-automation'
  | 'matter-management'
  | 'dms'
  | 'clm'
  | 'legal-research'
  | 'e-discovery'
  | 'practice-management'
  | 'billing-time'
  | 'compliance'

export type EvaluationAreaId =
  | 'contract-doc-review'
  | 'legal-research'
  | 'contract-negotiation'
  | 'contract-management'
  | 'doc-automation'
  | 'workflow-process'

export interface VendorInfo {
  name: string
  website: string
  contactEmail: string
}

export interface Solution {
  id: string
  name: string
  category: SolutionCategory
  description: string
  usp: string
  vendor: VendorInfo
  logoUrl: string
  evaluationAreas: EvaluationAreaId[]
  featureRatings: FeatureRatings
  generalRatings: GeneralRatings
  pros: string[]
  cons: string[]
  implementationNotes: string
  createdAt: string
  updatedAt: string
  history: RatingHistoryEntry[]
  nextReviewDate: string | null
  shortlisted: boolean
}

export type FeatureScore = 0 | 1 | 2 | 3 | 4 | 5

export type FeatureRatings = Record<string, Record<string, FeatureScore>>

export interface GeneralRatings {
  uiUx: FeatureScore
  accuracy: FeatureScore
  speed: FeatureScore
  integrations: FeatureScore
  customerSupport: FeatureScore
  pricing: FeatureScore
  securityCompliance: FeatureScore
}

export interface RatingHistoryEntry {
  timestamp: string
  field: string
  previousValue: FeatureScore
  newValue: FeatureScore
  note?: string
}

export const DEFAULT_GENERAL_RATINGS: GeneralRatings = {
  uiUx: 0,
  accuracy: 0,
  speed: 0,
  integrations: 0,
  customerSupport: 0,
  pricing: 0,
  securityCompliance: 0,
}

export function createEmptySolution(partial: Partial<Solution> & { name: string; category: SolutionCategory }): Solution {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    description: '',
    usp: '',
    vendor: { name: '', website: '', contactEmail: '' },
    logoUrl: '',
    evaluationAreas: [],
    featureRatings: {},
    generalRatings: { ...DEFAULT_GENERAL_RATINGS },
    pros: [],
    cons: [],
    implementationNotes: '',
    createdAt: now,
    updatedAt: now,
    history: [],
    nextReviewDate: null,
    shortlisted: false,
    ...partial,
  }
}
