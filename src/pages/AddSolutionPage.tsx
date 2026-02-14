import { useNavigate } from 'react-router-dom'
import { useSolutions } from '../hooks/use-solutions'
import SolutionForm from '../components/solution/SolutionForm'
import type { Solution } from '../types/solution'

export default function AddSolutionPage() {
  const { dispatch } = useSolutions()
  const navigate = useNavigate()

  const handleSubmit = (solution: Solution) => {
    dispatch({ type: 'ADD_SOLUTION', payload: solution })
    navigate(`/solution/${solution.id}`)
  }

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Add New Solution</h1>
      <SolutionForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  )
}
