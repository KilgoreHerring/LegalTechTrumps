import { useMemo } from 'react'
import type { Solution } from '../types/solution'
import * as scores from '../utils/scores'

export function useScores(solution: Solution) {
  return useMemo(() => ({
    overall: scores.overallScore(solution),
    featureAvg: scores.overallFeatureScore(solution),
    generalAvg: scores.generalAverage(solution.generalRatings),
    areas: scores.areaScores(solution),
    strengths: scores.strengths(solution),
    weaknesses: scores.weaknesses(solution),
    radar: scores.radarData(solution),
    bar: scores.barData(solution),
    completion: scores.completionPercentage(solution),
  }), [solution])
}
