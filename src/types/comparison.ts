import type { FeatureScore } from './solution'

export interface ComparisonDifference {
  field: string
  label: string
  area?: string
  scoreA: FeatureScore
  scoreB: FeatureScore
  delta: number
}

export interface ComparisonResult {
  solutionAId: string
  solutionBId: string
  solutionAName: string
  solutionBName: string
  overallScoreA: number | null
  overallScoreB: number | null
  areaComparisons: AreaComparison[]
  generalComparisons: ComparisonDifference[]
}

export interface AreaComparison {
  areaId: string
  areaLabel: string
  averageA: number | null
  averageB: number | null
  features: ComparisonDifference[]
}
