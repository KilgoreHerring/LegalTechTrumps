import type { Solution } from '../../types/solution'
import { EVALUATION_AREA_MAP } from '../../data/evaluation-areas'
import { GENERAL_CRITERIA } from '../../data/general-criteria'
import { formatDateTime } from '../../utils/date'
import './RatingHistory.css'

interface RatingHistoryProps {
  solution: Solution
}

function resolveFieldLabel(field: string): string {
  if (field.startsWith('general.')) {
    const key = field.replace('general.', '')
    const crit = GENERAL_CRITERIA.find(c => c.id === key)
    return crit ? `General: ${crit.label}` : field
  }

  const [areaId, featureId] = field.split('.')
  const area = EVALUATION_AREA_MAP[areaId as keyof typeof EVALUATION_AREA_MAP]
  if (!area) return field
  const feature = area.features.find(f => f.id === featureId)
  return feature ? `${area.label}: ${feature.label}` : field
}

const SCORE_LABELS = ['Not Evaluated', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent']

export default function RatingHistory({ solution }: RatingHistoryProps) {
  const entries = [...solution.history].reverse()

  if (entries.length === 0) {
    return (
      <div className="history-empty">
        <p>No rating changes recorded yet.</p>
        <p className="history-empty-sub">Changes will appear here as you rate features and criteria.</p>
      </div>
    )
  }

  return (
    <div className="history">
      <div className="history-count">{entries.length} change{entries.length !== 1 ? 's' : ''}</div>
      <div className="history-list">
        {entries.map((entry, i) => {
          const improved = entry.newValue > entry.previousValue
          const regressed = entry.newValue < entry.previousValue
          return (
            <div key={i} className="history-entry">
              <div className="history-dot-col">
                <span className={`history-dot ${improved ? 'dot-up' : regressed ? 'dot-down' : ''}`} />
                {i < entries.length - 1 && <span className="history-line" />}
              </div>
              <div className="history-content">
                <span className="history-field">{resolveFieldLabel(entry.field)}</span>
                <div className="history-change">
                  <span className="history-score-old">{SCORE_LABELS[entry.previousValue]} ({entry.previousValue})</span>
                  <span className="history-arrow">&rarr;</span>
                  <span className={`history-score-new ${improved ? 'score-improved' : regressed ? 'score-regressed' : ''}`}>
                    {SCORE_LABELS[entry.newValue]} ({entry.newValue})
                  </span>
                </div>
                {entry.note && <span className="history-note">{entry.note}</span>}
                <span className="history-time">{formatDateTime(entry.timestamp)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
