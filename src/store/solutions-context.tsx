import { createContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react'
import { solutionsReducer, type SolutionsState, type SolutionsAction } from './solutions-reducer'
import { loadState, saveState } from './storage'

interface SolutionsContextValue {
  state: SolutionsState
  dispatch: Dispatch<SolutionsAction>
}

export const SolutionsContext = createContext<SolutionsContextValue | null>(null)

export function SolutionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(solutionsReducer, null, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  return (
    <SolutionsContext.Provider value={{ state, dispatch }}>
      {children}
    </SolutionsContext.Provider>
  )
}
