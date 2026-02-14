import type { SolutionCategory } from '../types/solution'

export interface CategoryDefinition {
  id: SolutionCategory
  label: string
  color: string
}

export const CATEGORIES: CategoryDefinition[] = [
  { id: 'legal-ai', label: 'Legal AI Platforms', color: '#4A90E2' },
  { id: 'contract-negotiation', label: 'Contract Negotiation & Playbooks', color: '#C84545' },
  { id: 'doc-automation', label: 'Document Automation', color: '#50C878' },
  { id: 'matter-management', label: 'Matter Management Systems', color: '#7B68EE' },
  { id: 'dms', label: 'Document Management Systems', color: '#008B8B' },
  { id: 'clm', label: 'Contract Lifecycle Management', color: '#C84545' },
  { id: 'legal-research', label: 'Legal Research Platforms', color: '#FFBF00' },
  { id: 'e-discovery', label: 'E-Discovery Tools', color: '#E27D4A' },
  { id: 'practice-management', label: 'Practice Management Software', color: '#9B59B6' },
  { id: 'billing-time', label: 'Legal Billing & Time Tracking', color: '#2ECC71' },
  { id: 'compliance', label: 'Compliance Management Systems', color: '#E74C3C' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<SolutionCategory, CategoryDefinition>
