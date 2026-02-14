import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Search solutions...' }: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-icon">&#128269;</span>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          &times;
        </button>
      )}
    </div>
  )
}
