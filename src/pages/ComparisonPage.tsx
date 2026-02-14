import { useState } from 'react'
import { useSolutions } from '../hooks/use-solutions'
import { useComparison } from '../hooks/use-comparison'
import ComparisonSelector from '../components/comparison/ComparisonSelector'
import ComparisonView from '../components/comparison/ComparisonView'
import EmptyState from '../components/ui/EmptyState'

export default function ComparisonPage() {
  const { state } = useSolutions()
  const [idA, setIdA] = useState('')
  const [idB, setIdB] = useState('')

  const solutionA = state.solutions.find(s => s.id === idA)
  const solutionB = state.solutions.find(s => s.id === idB)
  const result = useComparison(solutionA, solutionB)

  if (state.solutions.length < 2) {
    return (
      <div>
        <h1 style={{ marginBottom: 'var(--space-lg)' }}>Battle Mode ⚔️</h1>
        <EmptyState
          title="Need at least 2 solutions"
          description="Add more solutions to use the comparison feature."
        />
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Battle Mode ⚔️</h1>
      <ComparisonSelector
        solutions={state.solutions}
        idA={idA}
        idB={idB}
        onChangeA={setIdA}
        onChangeB={setIdB}
      />
      {result && solutionA && solutionB && (
        <div style={{ marginTop: 'var(--space-xl)' }}>
          <ComparisonView result={result} solutionA={solutionA} solutionB={solutionB} />
        </div>
      )}
    </div>
  )
}
