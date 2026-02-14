import { useMemo } from 'react'
import type { Solution, FeatureScore } from '../types/solution'
import type { ComparisonResult, AreaComparison, ComparisonDifference } from '../types/comparison'
import { EVALUATION_AREA_MAP } from '../data/evaluation-areas'
import { GENERAL_CRITERIA } from '../data/general-criteria'
import { overallScore, areaAverage } from '../utils/scores'

export function useComparison(solutionA: Solution | undefined, solutionB: Solution | undefined): ComparisonResult | null {
  return useMemo(() => {
    if (!solutionA || !solutionB) return null

    const allAreas = new Set([...solutionA.evaluationAreas, ...solutionB.evaluationAreas])

    const areaComparisons: AreaComparison[] = [...allAreas].map(areaId => {
      const area = EVALUATION_AREA_MAP[areaId]
      if (!area) return null

      const ratingsA = solutionA.featureRatings[areaId] ?? {}
      const ratingsB = solutionB.featureRatings[areaId] ?? {}

      const features: ComparisonDifference[] = area.features.map(f => ({
        field: `${areaId}.${f.id}`,
        label: f.label,
        area: area.label,
        scoreA: (ratingsA[f.id] ?? 0) as FeatureScore,
        scoreB: (ratingsB[f.id] ?? 0) as FeatureScore,
        delta: (ratingsA[f.id] ?? 0) - (ratingsB[f.id] ?? 0),
      }))

      return {
        areaId,
        areaLabel: area.label,
        averageA: areaAverage(ratingsA),
        averageB: areaAverage(ratingsB),
        features,
      }
    }).filter(Boolean) as AreaComparison[]

    const generalComparisons: ComparisonDifference[] = GENERAL_CRITERIA.map(c => ({
      field: `general.${c.id}`,
      label: c.label,
      scoreA: solutionA.generalRatings[c.id],
      scoreB: solutionB.generalRatings[c.id],
      delta: solutionA.generalRatings[c.id] - solutionB.generalRatings[c.id],
    }))

    return {
      solutionAId: solutionA.id,
      solutionBId: solutionB.id,
      solutionAName: solutionA.name,
      solutionBName: solutionB.name,
      overallScoreA: overallScore(solutionA),
      overallScoreB: overallScore(solutionB),
      areaComparisons,
      generalComparisons,
    }
  }, [solutionA, solutionB])
}
