import type { SelectHTMLAttributes } from 'react'
import './Select.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  placeholder?: string
}

export default function Select({ label, options, placeholder, className = '', id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={`select-group ${className}`}>
      {label && <label htmlFor={selectId} className="select-label">{label}</label>}
      <select id={selectId} className="select-field" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
