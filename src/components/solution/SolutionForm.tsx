import { useState, useCallback, useRef, useEffect } from 'react'
import type { Solution, SolutionCategory, EvaluationAreaId } from '../../types/solution'
import { createEmptySolution } from '../../types/solution'
import { CATEGORIES } from '../../data/categories'
import { EVALUATION_AREAS } from '../../data/evaluation-areas'
import { searchVendors, type VendorLookup } from '../../data/vendors'
import Input, { TextArea } from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import './SolutionForm.css'

interface SolutionFormProps {
  initial?: Solution
  onSubmit: (solution: Solution) => void
  onCancel: () => void
}

export default function SolutionForm({ initial, onSubmit, onCancel }: SolutionFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<SolutionCategory | ''>(initial?.category ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [usp, setUsp] = useState(initial?.usp ?? '')
  const [vendorName, setVendorName] = useState(initial?.vendor.name ?? '')
  const [vendorWebsite, setVendorWebsite] = useState(initial?.vendor.website ?? '')
  const [vendorEmail, setVendorEmail] = useState(initial?.vendor.contactEmail ?? '')
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl ?? '')
  const [areas, setAreas] = useState<Set<EvaluationAreaId>>(new Set(initial?.evaluationAreas ?? []))
  const [nextReviewDate, setNextReviewDate] = useState(initial?.nextReviewDate ?? '')

  // Vendor auto-suggest
  const [suggestions, setSuggestions] = useState<VendorLookup[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestRef = useRef<HTMLDivElement>(null)

  const handleNameChange = useCallback((value: string) => {
    setName(value)
    const results = searchVendors(value)
    setSuggestions(results)
    setShowSuggestions(results.length > 0)
  }, [])

  const selectVendor = useCallback((vendor: VendorLookup) => {
    setName(vendor.name)
    setVendorName(vendor.name)
    setVendorWebsite(vendor.website)
    setLogoUrl(vendor.logoUrl)
    setDescription(vendor.description)
    if (!category) setCategory(vendor.suggestedCategory)
    setShowSuggestions(false)
  }, [category])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggleArea = (areaId: EvaluationAreaId) => {
    setAreas(prev => {
      const next = new Set(prev)
      if (next.has(areaId)) next.delete(areaId)
      else next.add(areaId)
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !category) return

    const solution = initial
      ? { ...initial, name, category, description, usp, vendor: { name: vendorName, website: vendorWebsite, contactEmail: vendorEmail }, logoUrl, evaluationAreas: [...areas], nextReviewDate: nextReviewDate || null, updatedAt: new Date().toISOString() }
      : createEmptySolution({ name, category, description, usp, vendor: { name: vendorName, website: vendorWebsite, contactEmail: vendorEmail }, logoUrl, evaluationAreas: [...areas], nextReviewDate: nextReviewDate || null })

    onSubmit(solution)
  }

  return (
    <form className="solution-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Solution Details</h2>
        <div className="form-row" ref={suggestRef} style={{ position: 'relative' }}>
          <Input
            label="Solution Name"
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="e.g. Ironclad, Kira Systems..."
            required
            autoComplete="off"
          />
          {showSuggestions && (
            <div className="vendor-suggestions">
              {suggestions.map(v => (
                <button
                  key={v.name}
                  type="button"
                  className="vendor-suggestion"
                  onClick={() => selectVendor(v)}
                >
                  {v.logoUrl && <img src={v.logoUrl} alt="" className="vendor-suggestion-logo" />}
                  <div>
                    <strong>{v.name}</strong>
                    <span className="vendor-suggestion-desc">{v.description}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <Select
          label="Category"
          value={category}
          onChange={e => setCategory(e.target.value as SolutionCategory)}
          options={CATEGORIES.map(c => ({ value: c.id, label: c.label }))}
          placeholder="Select a category..."
          required
        />
        <TextArea
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief description of the solution..."
        />
        <Input
          label="Unique Selling Point (USP)"
          value={usp}
          onChange={e => setUsp(e.target.value)}
          placeholder="What does this tool do best?"
        />
      </div>

      <div className="form-section">
        <h2>Vendor Information</h2>
        <div className="form-grid">
          <Input label="Vendor Name" value={vendorName} onChange={e => setVendorName(e.target.value)} />
          <Input label="Website" value={vendorWebsite} onChange={e => setVendorWebsite(e.target.value)} type="url" placeholder="https://..." />
          <Input label="Contact Email" value={vendorEmail} onChange={e => setVendorEmail(e.target.value)} type="email" />
          <Input label="Logo URL" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div className="form-section">
        <h2>Review Schedule</h2>
        <Input
          label="Next Review Date"
          type="date"
          value={nextReviewDate}
          onChange={e => setNextReviewDate(e.target.value)}
        />
        <p className="form-hint">Set a reminder to re-evaluate this solution.</p>
      </div>

      <div className="form-section">
        <h2>Evaluation Areas</h2>
        <p className="form-hint">Select which areas you want to evaluate for this solution.</p>
        <div className="area-grid">
          {EVALUATION_AREAS.map(area => (
            <label key={area.id} className={`area-checkbox ${areas.has(area.id) ? 'area-checked' : ''}`}>
              <input
                type="checkbox"
                checked={areas.has(area.id)}
                onChange={() => toggleArea(area.id)}
              />
              <span className="area-label">{area.label}</span>
              <span className="area-count">{area.features.length} features</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={!name.trim() || !category}>
          {initial ? 'Save Changes' : 'Create Solution'}
        </Button>
      </div>
    </form>
  )
}
