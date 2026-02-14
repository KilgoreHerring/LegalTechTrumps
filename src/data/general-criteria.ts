import type { GeneralRatings } from '../types/solution'

export interface GeneralCriterionDefinition {
  id: keyof GeneralRatings
  label: string
  description: string
}

export const GENERAL_CRITERIA: GeneralCriterionDefinition[] = [
  { id: 'uiUx', label: 'UI & UX', description: 'Quality of the user interface and overall user experience' },
  { id: 'accuracy', label: 'Accuracy', description: 'Accuracy of outputs, analysis, and recommendations' },
  { id: 'speed', label: 'Speed', description: 'Performance and responsiveness of the platform' },
  { id: 'integrations', label: 'Integrations', description: 'Available integrations with other tools and platforms' },
  { id: 'customerSupport', label: 'Customer Support', description: 'Quality and responsiveness of vendor support' },
  { id: 'pricing', label: 'Pricing', description: 'Value for money and pricing model transparency' },
  { id: 'securityCompliance', label: 'Security', description: 'Security certifications, data protection, and regulatory compliance' },
]
