import type { Solution, FeatureScore, GeneralRatings } from '../types/solution'

export interface SolutionsState {
  solutions: Solution[]
  lastSaved: string | null
}

export type SolutionsAction =
  | { type: 'ADD_SOLUTION'; payload: Solution }
  | { type: 'UPDATE_SOLUTION'; payload: Solution }
  | { type: 'DELETE_SOLUTION'; payload: string }
  | { type: 'RATE_FEATURE'; payload: { solutionId: string; areaId: string; featureId: string; score: FeatureScore; note?: string } }
  | { type: 'RATE_GENERAL'; payload: { solutionId: string; criterion: keyof GeneralRatings; score: FeatureScore; note?: string } }
  | { type: 'TOGGLE_SHORTLIST'; payload: string }
  | { type: 'IMPORT_DATA'; payload: { solutions: Solution[]; mode: 'replace' | 'merge' } }

function updateSolution(state: SolutionsState, id: string, updater: (s: Solution) => Solution): SolutionsState {
  return {
    ...state,
    solutions: state.solutions.map(s => s.id === id ? updater(s) : s),
  }
}

export function solutionsReducer(state: SolutionsState, action: SolutionsAction): SolutionsState {
  switch (action.type) {
    case 'ADD_SOLUTION':
      return { ...state, solutions: [...state.solutions, action.payload] }

    case 'UPDATE_SOLUTION':
      return updateSolution(state, action.payload.id, () => ({
        ...action.payload,
        updatedAt: new Date().toISOString(),
      }))

    case 'DELETE_SOLUTION':
      return { ...state, solutions: state.solutions.filter(s => s.id !== action.payload) }

    case 'RATE_FEATURE': {
      const { solutionId, areaId, featureId, score, note } = action.payload
      return updateSolution(state, solutionId, s => {
        const prev = s.featureRatings[areaId]?.[featureId] ?? 0
        if (prev === score) return s
        return {
          ...s,
          updatedAt: new Date().toISOString(),
          featureRatings: {
            ...s.featureRatings,
            [areaId]: { ...s.featureRatings[areaId], [featureId]: score },
          },
          history: [...s.history, {
            timestamp: new Date().toISOString(),
            field: `${areaId}.${featureId}`,
            previousValue: prev as FeatureScore,
            newValue: score,
            note,
          }],
        }
      })
    }

    case 'RATE_GENERAL': {
      const { solutionId, criterion, score, note } = action.payload
      return updateSolution(state, solutionId, s => {
        const prev = s.generalRatings[criterion]
        if (prev === score) return s
        return {
          ...s,
          updatedAt: new Date().toISOString(),
          generalRatings: { ...s.generalRatings, [criterion]: score },
          history: [...s.history, {
            timestamp: new Date().toISOString(),
            field: `general.${criterion}`,
            previousValue: prev,
            newValue: score,
            note,
          }],
        }
      })
    }

    case 'TOGGLE_SHORTLIST':
      return updateSolution(state, action.payload, s => ({
        ...s,
        shortlisted: !s.shortlisted,
        updatedAt: new Date().toISOString(),
      }))

    case 'IMPORT_DATA': {
      if (action.payload.mode === 'replace') {
        return { ...state, solutions: action.payload.solutions }
      }
      const existingIds = new Set(state.solutions.map(s => s.id))
      const newSolutions = action.payload.solutions.filter(s => !existingIds.has(s.id))
      return { ...state, solutions: [...state.solutions, ...newSolutions] }
    }

    default:
      return state
  }
}
