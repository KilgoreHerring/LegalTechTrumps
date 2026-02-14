import type { Solution } from '../../types/solution'
import { useScores } from '../../hooks/use-scores'
import SolutionRadarChart from './RadarChart'
import SolutionBarChart from './BarChart'
import './StatsCard.css'

interface StatsCardProps {
  solution: Solution
}

export default function StatsCard({ solution }: StatsCardProps) {
  const { overall, featureAvg, generalAvg, areas, strengths, weaknesses, radar, bar, completion } = useScores(solution)

  return (
    <div className="stats-card">
      <div className="stats-overview">
        <div className="stats-overall">
          <span className="stats-overall-score">
            {overall !== null ? overall.toFixed(1) : '—'}
          </span>
          <span className="stats-overall-label">Overall Score</span>
          <span className="stats-overall-sub">{completion}% evaluated</span>
        </div>
        <div className="stats-averages">
          <div className="stats-avg-item">
            <span className="stats-avg-value">{featureAvg !== null ? featureAvg.toFixed(1) : '—'}</span>
            <span className="stats-avg-label">Feature Avg</span>
          </div>
          <div className="stats-avg-item">
            <span className="stats-avg-value">{generalAvg !== null ? generalAvg.toFixed(1) : '—'}</span>
            <span className="stats-avg-label">General Avg</span>
          </div>
        </div>
      </div>

      {areas.length > 0 && (
        <div className="stats-section">
          <h3>Area Scores</h3>
          <div className="stats-areas">
            {areas.map(a => (
              <div key={a.areaId} className="stats-area-row">
                <span className="stats-area-name">{a.label}</span>
                <div className="stats-area-bar-bg">
                  <div
                    className="stats-area-bar-fill"
                    style={{ width: a.average !== null ? `${(a.average / 5) * 100}%` : '0%' }}
                  />
                </div>
                <span className="stats-area-score">
                  {a.average !== null ? a.average.toFixed(1) : '—'}
                </span>
                <span className="stats-area-count">{a.ratedCount}/{a.totalCount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="stats-columns">
        {strengths.length > 0 && (
          <div className="stats-section">
            <h3>Strengths</h3>
            <ul className="stats-list stats-list-strengths">
              {strengths.slice(0, 5).map((s, i) => (
                <li key={i}>
                  <span className="stats-list-score">{s.score}</span>
                  <div>
                    <span className="stats-list-feature">{s.featureLabel}</span>
                    <span className="stats-list-area">{s.areaLabel}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {weaknesses.length > 0 && (
          <div className="stats-section">
            <h3>Weaknesses</h3>
            <ul className="stats-list stats-list-weaknesses">
              {weaknesses.slice(0, 5).map((w, i) => (
                <li key={i}>
                  <span className="stats-list-score">{w.score}</span>
                  <div>
                    <span className="stats-list-feature">{w.featureLabel}</span>
                    <span className="stats-list-area">{w.areaLabel}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="stats-charts">
        {radar.length > 0 && (
          <div className="stats-section">
            <h3>Evaluation Area Radar</h3>
            <SolutionRadarChart data={radar} />
          </div>
        )}
        {bar.length > 0 && (
          <div className="stats-section">
            <h3>General Criteria</h3>
            <SolutionBarChart data={bar} />
          </div>
        )}
      </div>
    </div>
  )
}
