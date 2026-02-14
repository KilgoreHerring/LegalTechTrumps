import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSolutions } from '../hooks/use-solutions'
import { useFilters } from '../hooks/use-filters'
import { CATEGORIES, CATEGORY_MAP } from '../data/categories'
import { isOverdue } from '../utils/date'
import { overallScore, areaScores } from '../utils/scores'
import { getFlavourText } from '../utils/flavour'
import { GENERAL_CRITERIA } from '../data/general-criteria'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import SearchBar from '../components/ui/SearchBar'
import EmptyState from '../components/ui/EmptyState'
import type { SolutionCategory } from '../types/solution'
import './DashboardPage.css'

function tierClass(score: number | null): string {
  if (score === null) return 'tier-unrated'
  if (score >= 4.5) return 'tier-legendary'
  if (score >= 3.5) return 'tier-epic'
  if (score >= 2.5) return 'tier-rare'
  return 'tier-common'
}

export default function DashboardPage() {
  const { state, dispatch } = useSolutions()
  const {
    filtered, search, setSearch,
    categoryFilter, setCategoryFilter,
    sortBy, setSortBy,
    sortDir, setSortDir,
    showShortlistOnly, setShowShortlistOnly,
    shortlistCount,
  } = useFilters(state.solutions)

  const [flipped, setFlipped] = useState<Set<string>>(new Set())
  const toggleFlip = (id: string) => setFlipped(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"? This cannot be undone.`)) {
      dispatch({ type: 'DELETE_SOLUTION', payload: id })
    }
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-header-right">
          <span className="dashboard-count">{state.solutions.length} solution{state.solutions.length !== 1 ? 's' : ''}</span>
          <Link to="/add"><Button>+ New Solution</Button></Link>
        </div>
      </div>

      {state.solutions.length === 0 ? (
        <EmptyState
          title="No solutions yet"
          description="Start by adding your first legal tech solution to evaluate."
          action={<Link to="/add"><Button>Add Your First Solution</Button></Link>}
        />
      ) : (
        <>
          <div className="dashboard-toolbar">
            <div className="toolbar-search">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="toolbar-controls">
              <Select
                options={[{ value: '', label: 'All Categories' }, ...CATEGORIES.map(c => ({ value: c.id, label: c.label }))]}
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value as SolutionCategory | '')}
              />
              <Select
                options={[
                  { value: 'date', label: 'Sort by Date' },
                  { value: 'name', label: 'Sort by Name' },
                  { value: 'score', label: 'Sort by Score' },
                  { value: 'category', label: 'Sort by Category' },
                ]}
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
              />
              <button
                className="toolbar-icon-btn"
                onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
                aria-label={`Sort ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortDir === 'asc' ? '↑' : '↓'}
              </button>
              <button
                className={`toolbar-icon-btn toolbar-shortlist-btn ${showShortlistOnly ? 'toolbar-shortlist-active' : ''}`}
                onClick={() => setShowShortlistOnly(v => !v)}
                aria-label={showShortlistOnly ? 'Show all solutions' : 'Show shortlist only'}
                title={showShortlistOnly ? 'Show all solutions' : 'Show shortlist only'}
              >
                ★ {shortlistCount > 0 && <span className="toolbar-shortlist-count">{shortlistCount}</span>}
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No matches" description="Try adjusting your search or filters." />
          ) : (
            <div className="solutions-grid">
              {filtered.map(s => {
                const score = overallScore(s)
                const cat = CATEGORY_MAP[s.category]
                const tier = tierClass(score)
                const flavour = getFlavourText(s)
                const isFlipped = flipped.has(s.id)

                return (
                  <div key={s.id} className={`tc ${tier}`} onClick={() => toggleFlip(s.id)}>
                    <div className={`tc-inner ${isFlipped ? 'tc-flipped' : ''}`}>

                      {/* FRONT FACE */}
                      <div className="tc-face tc-front">
                        <div className="tc-category-strip" style={{ backgroundColor: cat?.color }} />

                        <div className="tc-header">
                          <span className="tc-category" style={{ color: cat?.color }}>
                            {cat?.label}
                          </span>
                          <button
                            className={`tc-shortlist-btn ${s.shortlisted ? 'tc-shortlisted' : ''}`}
                            onClick={e => { e.stopPropagation(); dispatch({ type: 'TOGGLE_SHORTLIST', payload: s.id }) }}
                            aria-label={s.shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                            title={s.shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                          >
                            ★
                          </button>
                        </div>

                        <div className="tc-logo-area">
                          {s.logoUrl ? (
                            <img src={s.logoUrl} alt="" className="tc-logo" />
                          ) : (
                            <div className="tc-logo-placeholder">
                              {s.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className="tc-title-bar">
                          <h3 className="tc-name">{s.name}</h3>
                        </div>

                        <div className="tc-power-rating">
                          <span className="tc-power-label">Power Rating</span>
                          <span className="tc-score-number">
                            {score !== null ? score.toFixed(1) : '—'}
                          </span>
                        </div>

                        <div className="tc-all-stats">
                          {GENERAL_CRITERIA.map(c => {
                            const val = s.generalRatings[c.id]
                            return (
                              <div key={c.id} className="tc-stat-row">
                                <span className="tc-stat-row-label">{c.label}</span>
                                <span className="tc-stat-row-value" data-score={val}>
                                  {val > 0 ? val : '—'}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* BACK FACE */}
                      <div className="tc-face tc-back">
                        <div className="tc-category-strip" style={{ backgroundColor: cat?.color }} />

                        <div className="tc-back-header">
                          <h3 className="tc-name">{s.name}</h3>
                          <span className="tc-score-number tc-score-sm">
                            {score !== null ? score.toFixed(1) : '—'}
                          </span>
                        </div>

                        {(() => {
                          const areas = areaScores(s).filter(a => a.average !== null)
                          return areas.length > 0 && (
                            <div className="tc-area-scores">
                              <span className="tc-area-scores-title">Evaluation Areas</span>
                              {areas.map(a => (
                                <div key={a.areaId} className="tc-area-row">
                                  <span className="tc-area-row-label">{a.label}</span>
                                  <span className="tc-area-row-value" data-score={Math.round(a.average!)}>
                                    {a.average!.toFixed(1)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        })()}

                        {(flavour.strong || flavour.weak) && (
                          <div className="tc-flavour">
                            {flavour.strong && (
                              <div className="tc-flavour-row tc-flavour-strong">
                                <span className="tc-flavour-icon">+</span>
                                <span className="tc-flavour-text">Strong vs {flavour.strong}</span>
                              </div>
                            )}
                            {flavour.weak && (
                              <div className="tc-flavour-row tc-flavour-weak">
                                <span className="tc-flavour-icon">−</span>
                                <span className="tc-flavour-text">Weak vs {flavour.weak}</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="tc-back-footer">
                          {isOverdue(s.nextReviewDate) && (
                            <span className="tc-review-due">! Review due</span>
                          )}
                          <div className="tc-back-actions">
                            <Link to={`/solution/${s.id}/edit`} onClick={e => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); handleDelete(s.id, s.name) }} style={{ color: 'var(--danger)' }}>
                              🗑
                            </Button>
                          </div>
                          <Link to={`/solution/${s.id}`} className="tc-view-details" onClick={e => e.stopPropagation()}>
                            View Details →
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
