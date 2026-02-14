import type { ReactNode } from 'react'
import './EmptyState.css'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({ icon = '&#9878;', title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon" dangerouslySetInnerHTML={{ __html: icon }} />
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}
