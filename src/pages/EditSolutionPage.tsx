import { useParams, useNavigate } from 'react-router-dom'
import { useSolutions } from '../hooks/use-solutions'
import SolutionForm from '../components/solution/SolutionForm'
import type { Solution } from '../types/solution'

export default function EditSolutionPage() {
  const { id } = useParams()
  const { state, dispatch } = useSolutions()
  const navigate = useNavigate()
  const solution = state.solutions.find(s => s.id === id)

  if (!solution) {
    return (
      <div>
        <h1>Solution not found</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)' }}>
          This solution doesn't exist or has been deleted.
        </p>
      </div>
    )
  }

  const handleSubmit = (updated: Solution) => {
    dispatch({ type: 'UPDATE_SOLUTION', payload: updated })
    navigate(`/solution/${updated.id}`)
  }

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Edit: {solution.name}</h1>
      <SolutionForm
        initial={solution}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/solution/${id}`)}
      />
    </div>
  )
}
