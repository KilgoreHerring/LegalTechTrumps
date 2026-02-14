import type { Solution, FeatureScore, GeneralRatings } from '../types/solution'
import { EVALUATION_AREA_MAP } from '../data/evaluation-areas'
import { GENERAL_CRITERIA } from '../data/general-criteria'

export function areaAverage(ratings: Record<string, FeatureScore>): number | null {
  const scored = Object.values(ratings).filter(s => s > 0)
  if (scored.length === 0) return null
  return scored.reduce((a, b) => a + b, 0) / scored.length
}

export function overallFeatureScore(solution: Solution): number | null {
  const allScores: number[] = []
  for (const areaId of solution.evaluationAreas) {
    const ratings = solution.featureRatings[areaId]
    if (!ratings) continue
    for (const score of Object.values(ratings)) {
      if (score > 0) allScores.push(score)
    }
  }
  if (allScores.length === 0) return null
  return allScores.reduce((a, b) => a + b, 0) / allScores.length
}

export function generalAverage(ratings: GeneralRatings): number | null {
  const scored = Object.values(ratings).filter(s => s > 0)
  if (scored.length === 0) return null
  return scored.reduce((a, b) => a + b, 0) / scored.length
}

export function overallScore(solution: Solution): number | null {
  const feat = overallFeatureScore(solution)
  const gen = generalAverage(solution.generalRatings)
  if (feat === null && gen === null) return null
  if (feat === null) return gen
  if (gen === null) return feat
  return feat * 0.6 + gen * 0.4
}

export interface StrengthWeakness {
  areaLabel: string
  featureLabel: string
  score: number
}

export function strengths(solution: Solution): StrengthWeakness[] {
  const results: StrengthWeakness[] = []
  for (const areaId of solution.evaluationAreas) {
    const area = EVALUATION_AREA_MAP[areaId]
    const ratings = solution.featureRatings[areaId]
    if (!area || !ratings) continue
    for (const feature of area.features) {
      const score = ratings[feature.id] ?? 0
      if (score >= 4) results.push({ areaLabel: area.label, featureLabel: feature.label, score })
    }
  }
  return results.sort((a, b) => b.score - a.score)
}

export function weaknesses(solution: Solution): StrengthWeakness[] {
  const results: StrengthWeakness[] = []
  for (const areaId of solution.evaluationAreas) {
    const area = EVALUATION_AREA_MAP[areaId]
    const ratings = solution.featureRatings[areaId]
    if (!area || !ratings) continue
    for (const feature of area.features) {
      const score = ratings[feature.id] ?? 0
      if (score >= 1 && score <= 2) results.push({ areaLabel: area.label, featureLabel: feature.label, score })
    }
  }
  return results.sort((a, b) => a.score - b.score)
}

export interface AreaScore {
  areaId: string
  label: string
  average: number | null
  ratedCount: number
  totalCount: number
}

export function areaScores(solution: Solution): AreaScore[] {
  return solution.evaluationAreas.map(areaId => {
    const area = EVALUATION_AREA_MAP[areaId]
    const ratings = solution.featureRatings[areaId] ?? {}
    const scored = Object.values(ratings).filter(s => s > 0)
    return {
      areaId,
      label: area?.label ?? areaId,
      average: scored.length > 0 ? scored.reduce((a, b) => a + b, 0) / scored.length : null,
      ratedCount: scored.length,
      totalCount: area?.features.length ?? 0,
    }
  })
}

export function topArea(solution: Solution): AreaScore | null {
  const scored = areaScores(solution).filter(a => a.average !== null)
  if (scored.length === 0) return null
  return scored.reduce((best, a) => a.average! > best.average! ? a : best)
}

export interface RadarDataPoint {
  area: string
  score: number
  fullMark: 5
}

export function radarData(solution: Solution): RadarDataPoint[] {
  return areaScores(solution)
    .filter(a => a.average !== null)
    .map(a => ({ area: a.label, score: Number(a.average!.toFixed(2)), fullMark: 5 }))
}

export interface BarDataPoint {
  criterion: string
  score: number
}

export function barData(solution: Solution): BarDataPoint[] {
  return GENERAL_CRITERIA
    .map(c => ({ criterion: c.label, score: solution.generalRatings[c.id] }))
    .filter(d => d.score > 0)
}

export function completionPercentage(solution: Solution): number {
  let total = 0
  let rated = 0
  for (const areaId of solution.evaluationAreas) {
    const area = EVALUATION_AREA_MAP[areaId]
    if (!area) continue
    total += area.features.length
    const ratings = solution.featureRatings[areaId] ?? {}
    rated += Object.values(ratings).filter(s => s > 0).length
  }
  total += GENERAL_CRITERIA.length
  rated += Object.values(solution.generalRatings).filter(s => s > 0).length
  return total === 0 ? 0 : Math.round((rated / total) * 100)
}
