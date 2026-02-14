import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          <span className="header-logo-icon">🃏</span>
          Legal TechTrumps
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/" end className="header-link">Dashboard</NavLink>
          <NavLink to="/add" className="header-link">+ Add Solution</NavLink>
          <NavLink to="/compare" className="header-link">⚔️ Battle</NavLink>
          <NavLink to="/settings" className="header-link">Settings</NavLink>
        </nav>
      </div>
    </header>
  )
}
