import type { Solution } from '../types/solution'

const STORAGE_KEY = 'legal-tech-eval-solutions'
const EXPORT_VERSION = 1

export interface StoredState {
  solutions: Solution[]
  lastSaved: string | null
}

export function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { solutions: [], lastSaved: null }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.solutions)) return { solutions: [], lastSaved: null }
    return parsed as StoredState
  } catch {
    return { solutions: [], lastSaved: null }
  }
}

export function saveState(state: StoredState): void {
  const toSave: StoredState = { ...state, lastSaved: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
}

export interface ExportData {
  version: number
  exportDate: string
  solutionCount: number
  solutions: Solution[]
}

export function exportToJson(solutions: Solution[]): string {
  const data: ExportData = {
    version: EXPORT_VERSION,
    exportDate: new Date().toISOString(),
    solutionCount: solutions.length,
    solutions,
  }
  return JSON.stringify(data, null, 2)
}

export function importFromJson(json: string): { solutions: Solution[]; errors: string[] } {
  const errors: string[] = []
  try {
    const data = JSON.parse(json)

    if (!data || typeof data !== 'object') {
      return { solutions: [], errors: ['Invalid JSON structure'] }
    }

    const solutions: Solution[] = []
    const rawSolutions = data.solutions ?? data

    if (!Array.isArray(rawSolutions)) {
      return { solutions: [], errors: ['No solutions array found in import data'] }
    }

    for (let i = 0; i < rawSolutions.length; i++) {
      const s = rawSolutions[i]
      if (!s.id || !s.name || !s.category) {
        errors.push(`Solution at index ${i} missing required fields (id, name, or category)`)
        continue
      }
      solutions.push(s as Solution)
    }

    return { solutions, errors }
  } catch (e) {
    return { solutions: [], errors: [`Failed to parse JSON: ${(e as Error).message}`] }
  }
}
