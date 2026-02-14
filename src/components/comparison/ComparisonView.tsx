import type { Solution } from '../../types/solution'
import type { ComparisonResult } from '../../types/comparison'
import { CATEGORY_MAP } from '../../data/categories'
import { GENERAL_CRITERIA } from '../../data/general-criteria'
import './ComparisonView.css'

interface ComparisonViewProps {
  result: ComparisonResult
  solutionA: Solution
  solutionB: Solution
}

function tierClass(score: number | null): string {
  if (score === null) return 'tier-unrated'
  if (score >= 4.5) return 'tier-legendary'
  if (score >= 3.5) return 'tier-epic'
  if (score >= 2.5) return 'tier-rare'
  return 'tier-common'
}

export default function ComparisonView({ result, solutionA, solutionB }: ComparisonViewProps) {
  const scoreA = result.overallScoreA
  const scoreB = result.overallScoreB
  const hasScores = scoreA !== null && scoreB !== null
  const winnerIs = hasScores ? (scoreA! > scoreB! ? 'A' : scoreB! > scoreA! ? 'B' : 'tie') : null

  const catA = CATEGORY_MAP[solutionA.category]
  const catB = CATEGORY_MAP[solutionB.category]
  const tierA = tierClass(scoreA)
  const tierB = tierClass(scoreB)

  // Count wins per stat
  let winsA = 0
  let winsB = 0
  result.generalComparisons.forEach(g => {
    if (g.scoreA > 0 && g.scoreB > 0) {
      if (g.scoreA > g.scoreB) winsA++
      else if (g.scoreB > g.scoreA) winsB++
    }
  })

  return (
    <div className="comparison-view">

      {/* BATTLE ARENA — two cards + VS */}
      <div className="battle-arena">

        {/* CARD A */}
        <div className={`battle-card ${tierA} ${winnerIs === 'A' ? 'battle-winner' : ''}`}>
          {winnerIs === 'A' && <span className="battle-crown">👑</span>}
          <div className="battle-card-inner">
            <div className="tc-category-strip" style={{ backgroundColor: catA?.color }} />
            <div className="battle-logo-area">
              {solutionA.logoUrl ? (
                <img src={solutionA.logoUrl} alt="" className="battle-logo" />
              ) : (
                <div className="battle-logo-placeholder">{solutionA.name.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <div className="battle-title-bar">
              <h3 className="battle-name">{solutionA.name}</h3>
            </div>
            <div className="battle-power">
              <span className="battle-power-label">Power Rating</span>
              <span className={`battle-power-score ${winnerIs === 'A' ? 'battle-score-winner' : ''}`}>
                {scoreA !== null ? scoreA.toFixed(1) : '—'}
              </span>
            </div>
            <div className="battle-stats">
              {GENERAL_CRITERIA.map(c => {
                const valA = solutionA.generalRatings[c.id]
                const valB = solutionB.generalRatings[c.id]
                const isWin = valA > 0 && valB > 0 && valA > valB
                const isLoss = valA > 0 && valB > 0 && valB > valA
                return (
                  <div key={c.id} className={`battle-stat ${isWin ? 'battle-stat-win' : ''} ${isLoss ? 'battle-stat-loss' : ''}`}>
                    <span className="battle-stat-label">{c.label}</span>
                    <span className="battle-stat-value" data-score={valA}>{valA > 0 ? valA : '—'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* VS DIVIDER */}
        <div className="battle-vs-column">
          <div className="battle-vs-badge">VS</div>
          <div className="battle-tally">
            <span className={`battle-tally-count ${winsA > winsB ? 'battle-tally-lead' : ''}`}>{winsA}</span>
            <span className="battle-tally-sep">—</span>
            <span className={`battle-tally-count ${winsB > winsA ? 'battle-tally-lead' : ''}`}>{winsB}</span>
          </div>
        </div>

        {/* CARD B */}
        <div className={`battle-card ${tierB} ${winnerIs === 'B' ? 'battle-winner' : ''}`}>
          {winnerIs === 'B' && <span className="battle-crown">👑</span>}
          <div className="battle-card-inner">
            <div className="tc-category-strip" style={{ backgroundColor: catB?.color }} />
            <div className="battle-logo-area">
              {solutionB.logoUrl ? (
                <img src={solutionB.logoUrl} alt="" className="battle-logo" />
              ) : (
                <div className="battle-logo-placeholder">{solutionB.name.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <div className="battle-title-bar">
              <h3 className="battle-name">{solutionB.name}</h3>
            </div>
            <div className="battle-power">
              <span className="battle-power-label">Power Rating</span>
              <span className={`battle-power-score ${winnerIs === 'B' ? 'battle-score-winner' : ''}`}>
                {scoreB !== null ? scoreB.toFixed(1) : '—'}
              </span>
            </div>
            <div className="battle-stats">
              {GENERAL_CRITERIA.map(c => {
                const valA = solutionA.generalRatings[c.id]
                const valB = solutionB.generalRatings[c.id]
                const isWin = valB > 0 && valA > 0 && valB > valA
                const isLoss = valB > 0 && valA > 0 && valA > valB
                return (
                  <div key={c.id} className={`battle-stat ${isWin ? 'battle-stat-win' : ''} ${isLoss ? 'battle-stat-loss' : ''}`}>
                    <span className="battle-stat-label">{c.label}</span>
                    <span className="battle-stat-value" data-score={valB}>{valB > 0 ? valB : '—'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* STAT-BY-STAT BREAKDOWN */}
      <div className="battle-breakdown">
        <h3 className="battle-breakdown-title">Stat-by-Stat</h3>
        <div className="battle-breakdown-header">
          <span>{result.solutionAName}</span>
          <span>Criterion</span>
          <span>{result.solutionBName}</span>
        </div>
        {result.generalComparisons.map(g => {
          const aWins = g.scoreA > 0 && g.scoreB > 0 && g.scoreA > g.scoreB
          const bWins = g.scoreA > 0 && g.scoreB > 0 && g.scoreB > g.scoreA
          return (
            <div key={g.field} className="battle-breakdown-row">
              <span className={`battle-breakdown-score ${aWins ? 'battle-breakdown-win' : ''} ${bWins ? 'battle-breakdown-loss' : ''}`}>
                {g.scoreA > 0 ? g.scoreA : '—'}
              </span>
              <span className="battle-breakdown-label">{g.label}</span>
              <span className={`battle-breakdown-score ${bWins ? 'battle-breakdown-win' : ''} ${aWins ? 'battle-breakdown-loss' : ''}`}>
                {g.scoreB > 0 ? g.scoreB : '—'}
              </span>
            </div>
          )
        })}
      </div>

      {/* AREA DEEP-DIVE — keep existing table format for detail */}
      {result.areaComparisons.map(area => (
        <div key={area.areaId} className="battle-area">
          <div className="battle-area-header">
            <h3>{area.areaLabel}</h3>
            <div className="battle-area-avgs">
              <span className={area.averageA !== null && area.averageB !== null && area.averageA > area.averageB ? 'battle-breakdown-win' : ''}>
                {area.averageA?.toFixed(1) ?? '—'}
              </span>
              <span className="battle-area-sep">vs</span>
              <span className={area.averageA !== null && area.averageB !== null && area.averageB > area.averageA ? 'battle-breakdown-win' : ''}>
                {area.averageB?.toFixed(1) ?? '—'}
              </span>
            </div>
          </div>
          <div className="battle-breakdown-header">
            <span>{result.solutionAName}</span>
            <span>Feature</span>
            <span>{result.solutionBName}</span>
          </div>
          {area.features.map(f => {
            const aWins = f.scoreA > 0 && f.scoreB > 0 && f.scoreA > f.scoreB
            const bWins = f.scoreA > 0 && f.scoreB > 0 && f.scoreB > f.scoreA
            return (
              <div key={f.field} className="battle-breakdown-row">
                <span className={`battle-breakdown-score ${aWins ? 'battle-breakdown-win' : ''} ${bWins ? 'battle-breakdown-loss' : ''}`}>
                  {f.scoreA > 0 ? f.scoreA : '—'}
                </span>
                <span className="battle-breakdown-label">{f.label}</span>
                <span className={`battle-breakdown-score ${bWins ? 'battle-breakdown-win' : ''} ${aWins ? 'battle-breakdown-loss' : ''}`}>
                  {f.scoreB > 0 ? f.scoreB : '—'}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
