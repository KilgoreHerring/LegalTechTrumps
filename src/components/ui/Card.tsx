import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  children: ReactNode
}

export default function Card({ hoverable = false, className = '', children, ...props }: CardProps) {
  return (
    <div className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`} {...props}>
      {children}
    </div>
  )
}
