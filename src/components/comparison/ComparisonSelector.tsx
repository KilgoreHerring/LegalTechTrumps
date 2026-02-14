import type { Solution } from '../../types/solution'
import Select from '../ui/Select'
import './ComparisonSelector.css'

interface ComparisonSelectorProps {
  solutions: Solution[]
  idA: string
  idB: string
  onChangeA: (id: string) => void
  onChangeB: (id: string) => void
}

export default function ComparisonSelector({ solutions, idA, idB, onChangeA, onChangeB }: ComparisonSelectorProps) {
  const options = solutions.map(s => ({ value: s.id, label: s.name }))

  return (
    <div className="comparison-selector">
      <Select
        label="Solution A"
        options={options}
        value={idA}
        onChange={e => onChangeA(e.target.value)}
        placeholder="Select a solution..."
      />
      <span className="comparison-vs">VS</span>
      <Select
        label="Solution B"
        options={options}
        value={idB}
        onChange={e => onChangeB(e.target.value)}
        placeholder="Select a solution..."
      />
    </div>
  )
}
