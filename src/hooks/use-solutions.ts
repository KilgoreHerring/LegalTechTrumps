import { useContext } from 'react'
import { SolutionsContext } from '../store/solutions-context'

export function useSolutions() {
  const ctx = useContext(SolutionsContext)
  if (!ctx) throw new Error('useSolutions must be used within SolutionsProvider')
  return ctx
}
