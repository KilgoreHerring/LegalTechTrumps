import { useMemo } from 'react'
import type { EvaluationAreaId, FeatureScore, Solution } from '../../types/solution'
import { EVALUATION_AREA_MAP } from '../../data/evaluation-areas'
import { useSolutions } from '../../hooks/use-solutions'
import StarRating from '../ui/StarRating'
import './FeatureRatingPanel.css'

interface FeatureRatingPanelProps {
  solution: Solution
  areaId: EvaluationAreaId
}

export default function FeatureRatingPanel({ solution, areaId }: FeatureRatingPanelProps) {
  const { dispatch } = useSolutions()
  const area = EVALUATION_AREA_MAP[areaId]
  if (!area) return null

  const ratings = solution.featureRatings[areaId] ?? {}

  const average = useMemo(() => {
    const scored = area.features
      .map(f => ratings[f.id] ?? 0)
      .filter(s => s > 0)
    if (scored.length === 0) return null
    return scored.reduce((a, b) => a + b, 0) / scored.length
  }, [area.features, ratings])

  const ratedCount = area.features.filter(f => (ratings[f.id] ?? 0) > 0).length

  const handleRate = (featureId: string, score: FeatureScore) => {
    dispatch({
      type: 'RATE_FEATURE',
      payload: { solutionId: solution.id, areaId, featureId, score },
    })
  }

  return (
    <div className="feature-panel">
      <div className="feature-panel-header">
        <h3>{area.label}</h3>
        <div className="feature-panel-meta">
          <span className="feature-panel-count">{ratedCount}/{area.features.length} rated</span>
          {average !== null && (
            <span className="feature-panel-avg">{average.toFixed(1)}</span>
          )}
        </div>
      </div>
      <div className="feature-list">
        {area.features.map((feature, i) => (
          <div key={feature.id} className={`feature-row ${i % 2 === 0 ? 'feature-row-alt' : ''}`}>
            <div className="feature-info">
              <span className="feature-name">{feature.label}</span>
              <span className="feature-desc">{feature.description}</span>
            </div>
            <StarRating
              value={(ratings[feature.id] ?? 0) as FeatureScore}
              onChange={score => handleRate(feature.id, score)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
