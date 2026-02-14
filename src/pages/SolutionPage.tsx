import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSolutions } from '../hooks/use-solutions'
import { CATEGORY_MAP } from '../data/categories'
import { EVALUATION_AREA_MAP } from '../data/evaluation-areas'
import FeatureRatingPanel from '../components/rating/FeatureRatingPanel'
import GeneralRatingPanel from '../components/rating/GeneralRatingPanel'
import RatingHistory from '../components/rating/RatingHistory'
import StatsCard from '../components/stats/StatsCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import type { EvaluationAreaId } from '../types/solution'
import './SolutionPage.css'

type TabId = EvaluationAreaId | 'general' | 'stats' | 'history'

export default function SolutionPage() {
  const { id } = useParams()
  const { state } = useSolutions()
  const solution = state.solutions.find(s => s.id === id)

  const [activeTab, setActiveTab] = useState<TabId>('stats')
  const [saveKey, setSaveKey] = useState(0)

  // Reset tab when navigating to a different solution
  useEffect(() => {
    setActiveTab('stats')
  }, [id])

  // Track updatedAt to show save toast
  const updatedAt = solution?.updatedAt
  const [prevUpdatedAt, setPrevUpdatedAt] = useState(updatedAt)

  useEffect(() => {
    if (updatedAt && prevUpdatedAt && updatedAt !== prevUpdatedAt) {
      setSaveKey(k => k + 1)
    }
    setPrevUpdatedAt(updatedAt)
  }, [updatedAt, prevUpdatedAt])

  if (!solution) {
    return (
      <div>
        <h1>Solution not found</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)' }}>
          This solution doesn't exist or has been deleted.
        </p>
        <Link to="/"><Button variant="secondary" style={{ marginTop: 16 }}>Back to Dashboard</Button></Link>
      </div>
    )
  }

  const category = CATEGORY_MAP[solution.category]

  const tabs: { id: TabId; label: string }[] = [
    ...solution.evaluationAreas.map(areaId => ({
      id: areaId as TabId,
      label: EVALUATION_AREA_MAP[areaId]?.label ?? areaId,
    })),
    { id: 'general', label: 'General' },
    { id: 'stats', label: 'Stats' },
    { id: 'history', label: 'History' },
  ]

  const currentIndex = tabs.findIndex(t => t.id === activeTab)
  const prevTab = currentIndex > 0 ? tabs[currentIndex - 1] : null
  const nextTab = currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : null

  const goTo = (tab: TabId) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="solution-page">
      <div className="solution-page-header">
        <div className="solution-page-title-row">
          {solution.logoUrl && <img src={solution.logoUrl} alt="" className="solution-page-logo" />}
          <div>
            <h1>{solution.name}</h1>
            <div className="solution-page-meta">
              <Badge label={category?.label ?? solution.category} color={category?.color} size="md" />
              {solution.usp && <span className="solution-page-usp">USP: {solution.usp}</span>}
            </div>
          </div>
        </div>
        <Link to={`/solution/${solution.id}/edit`}>
          <Button variant="secondary" size="sm">Edit</Button>
        </Link>
      </div>

      {solution.description && (
        <p className="solution-page-desc">{solution.description}</p>
      )}

      <div className="solution-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`solution-tab ${activeTab === tab.id ? 'solution-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="solution-tab-content">
        {solution.evaluationAreas.includes(activeTab as EvaluationAreaId) && (
          <FeatureRatingPanel solution={solution} areaId={activeTab as EvaluationAreaId} />
        )}
        {activeTab === 'general' && <GeneralRatingPanel solution={solution} />}
        {activeTab === 'stats' && <StatsCard solution={solution} />}
        {activeTab === 'history' && <RatingHistory solution={solution} />}

        <div className="tab-nav-bar">
          <div>
            {prevTab && (
              <Button variant="ghost" size="sm" onClick={() => goTo(prevTab.id)}>
                ← {prevTab.label}
              </Button>
            )}
          </div>
          <span className="tab-nav-bar-center">
            {currentIndex + 1} / {tabs.length}
          </span>
          <div>
            {nextTab && (
              <Button variant="ghost" size="sm" onClick={() => goTo(nextTab.id)}>
                {nextTab.label} →
              </Button>
            )}
          </div>
        </div>
      </div>

      {saveKey > 0 && (
        <div className="autosave-toast" key={saveKey}>
          ✓ Saved
        </div>
      )}
    </div>
  )
}
