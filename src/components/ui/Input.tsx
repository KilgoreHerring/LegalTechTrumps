import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input id={inputId} className="input-field" {...props} />
    </div>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function TextArea({ label, className = '', id, ...props }: TextAreaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <textarea id={inputId} className="input-field input-textarea" {...props} />
    </div>
  )
}
