import './Badge.css'

interface BadgeProps {
  label: string
  color?: string
  size?: 'sm' | 'md'
}

export default function Badge({ label, color, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`badge badge-${size}`}
      style={color ? { borderColor: color, color } : undefined}
    >
      {label}
    </span>
  )
}
