import { useState } from 'react'
import type { Solution, FeatureScore, GeneralRatings } from '../../types/solution'
import { GENERAL_CRITERIA } from '../../data/general-criteria'
import { useSolutions } from '../../hooks/use-solutions'
import StarRating from '../ui/StarRating'
import { TextArea } from '../ui/Input'
import Button from '../ui/Button'
import './GeneralRatingPanel.css'

interface GeneralRatingPanelProps {
  solution: Solution
}

export default function GeneralRatingPanel({ solution }: GeneralRatingPanelProps) {
  const { dispatch } = useSolutions()
  const [newPro, setNewPro] = useState('')
  const [newCon, setNewCon] = useState('')

  const handleRate = (criterion: keyof GeneralRatings, score: FeatureScore) => {
    dispatch({
      type: 'RATE_GENERAL',
      payload: { solutionId: solution.id, criterion, score },
    })
  }

  const addPro = () => {
    if (!newPro.trim()) return
    dispatch({
      type: 'UPDATE_SOLUTION',
      payload: { ...solution, pros: [...solution.pros, newPro.trim()] },
    })
    setNewPro('')
  }

  const removePro = (index: number) => {
    dispatch({
      type: 'UPDATE_SOLUTION',
      payload: { ...solution, pros: solution.pros.filter((_, i) => i !== index) },
    })
  }

  const addCon = () => {
    if (!newCon.trim()) return
    dispatch({
      type: 'UPDATE_SOLUTION',
      payload: { ...solution, cons: [...solution.cons, newCon.trim()] },
    })
    setNewCon('')
  }

  const removeCon = (index: number) => {
    dispatch({
      type: 'UPDATE_SOLUTION',
      payload: { ...solution, cons: solution.cons.filter((_, i) => i !== index) },
    })
  }

  const updateNotes = (notes: string) => {
    dispatch({
      type: 'UPDATE_SOLUTION',
      payload: { ...solution, implementationNotes: notes },
    })
  }

  return (
    <div className="general-panel">
      <div className="general-section">
        <h3>General Criteria</h3>
        <div className="general-criteria-list">
          {GENERAL_CRITERIA.map(c => (
            <div key={c.id} className="general-criterion">
              <div className="criterion-info">
                <span className="criterion-name">{c.label}</span>
                <span className="criterion-desc">{c.description}</span>
              </div>
              <StarRating
                value={solution.generalRatings[c.id]}
                onChange={score => handleRate(c.id, score)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="general-section">
        <h3>Pros</h3>
        <div className="tag-list">
          {solution.pros.map((pro, i) => (
            <span key={i} className="tag tag-pro">
              {pro}
              <button type="button" className="tag-remove" onClick={() => removePro(i)}>&times;</button>
            </span>
          ))}
        </div>
        <div className="tag-input-row">
          <input
            className="tag-input"
            value={newPro}
            onChange={e => setNewPro(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPro())}
            placeholder="Add a pro..."
          />
          <Button variant="ghost" size="sm" onClick={addPro} type="button">Add</Button>
        </div>
      </div>

      <div className="general-section">
        <h3>Cons</h3>
        <div className="tag-list">
          {solution.cons.map((con, i) => (
            <span key={i} className="tag tag-con">
              {con}
              <button type="button" className="tag-remove" onClick={() => removeCon(i)}>&times;</button>
            </span>
          ))}
        </div>
        <div className="tag-input-row">
          <input
            className="tag-input"
            value={newCon}
            onChange={e => setNewCon(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCon())}
            placeholder="Add a con..."
          />
          <Button variant="ghost" size="sm" onClick={addCon} type="button">Add</Button>
        </div>
      </div>

      <div className="general-section">
        <h3>Implementation Notes</h3>
        <TextArea
          value={solution.implementationNotes}
          onChange={e => updateNotes(e.target.value)}
          placeholder="Notes about implementation, deployment, considerations..."
          rows={4}
        />
      </div>
    </div>
  )
}
