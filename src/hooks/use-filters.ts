import { useState, useMemo } from 'react'
import type { Solution, SolutionCategory } from '../types/solution'
import { overallScore } from '../utils/scores'

export type SortField = 'name' | 'score' | 'date' | 'category'

export function useFilters(solutions: Solution[]) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<SolutionCategory | ''>('')
  const [sortBy, setSortBy] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [showShortlistOnly, setShowShortlistOnly] = useState(false)

  const shortlistCount = useMemo(() => solutions.filter(s => s.shortlisted).length, [solutions])

  const filtered = useMemo(() => {
    let result = solutions

    if (showShortlistOnly) {
      result = result.filter(s => s.shortlisted)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.vendor.name.toLowerCase().includes(q)
      )
    }

    if (categoryFilter) {
      result = result.filter(s => s.category === categoryFilter)
    }

    result = [...result].sort((a, b) => {
      let cmp = 0
      switch (sortBy) {
        case 'name':
          cmp = a.name.localeCompare(b.name)
          break
        case 'score': {
          const sa = overallScore(a) ?? -1
          const sb = overallScore(b) ?? -1
          cmp = sa - sb
          break
        }
        case 'date':
          cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          break
        case 'category':
          cmp = a.category.localeCompare(b.category)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [solutions, search, categoryFilter, sortBy, sortDir, showShortlistOnly])

  return {
    filtered,
    search, setSearch,
    categoryFilter, setCategoryFilter,
    sortBy, setSortBy,
    sortDir, setSortDir,
    showShortlistOnly, setShowShortlistOnly,
    shortlistCount,
  }
}
