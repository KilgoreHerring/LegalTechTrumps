import type { FeatureScore } from '../../types/solution'
import './StarRating.css'

interface StarRatingProps {
  value: FeatureScore
  onChange: (score: FeatureScore) => void
  readonly?: boolean
}

const LABELS = ['Not Evaluated', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent']

export default function StarRating({ value, onChange, readonly = false }: StarRatingProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readonly) return
    if (e.key === 'ArrowRight' && value < 5) onChange((value + 1) as FeatureScore)
    if (e.key === 'ArrowLeft' && value > 0) onChange((value - 1) as FeatureScore)
  }

  return (
    <div
      className="star-rating"
      role="slider"
      aria-label="Rating"
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={value}
      aria-valuetext={LABELS[value]}
      tabIndex={readonly ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <div className="star-rating-segments">
        {([1, 2, 3, 4, 5] as FeatureScore[]).map(n => (
          <button
            key={n}
            type="button"
            className={`star-segment ${value >= n ? 'star-filled' : ''} ${value === n ? 'star-active' : ''}`}
            onClick={() => !readonly && onChange(value === n ? 0 as FeatureScore : n)}
            disabled={readonly}
            tabIndex={-1}
            aria-label={`${n} - ${LABELS[n]}`}
          >
            {n}
          </button>
        ))}
      </div>
      <span className={`star-label ${value === 0 ? 'star-label-empty' : ''}`}>
        {LABELS[value]}
      </span>
    </div>
  )
}
