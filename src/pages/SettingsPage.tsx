import { useState, useEffect } from 'react'
import ExportImport from '../components/data-management/ExportImport'
import './SettingsPage.css'

export default function SettingsPage() {
  const [highContrast, setHighContrast] = useState(() =>
    document.documentElement.classList.contains('high-contrast')
  )
  const [reducedMotion, setReducedMotion] = useState(() =>
    document.documentElement.classList.contains('reduced-motion')
  )

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
    localStorage.setItem('lte-high-contrast', String(highContrast))
  }, [highContrast])

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion)
    localStorage.setItem('lte-reduced-motion', String(reducedMotion))
  }, [reducedMotion])

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <section className="settings-section">
        <h2>Data Management</h2>
        <ExportImport />
      </section>

      <section className="settings-section">
        <h2>Accessibility</h2>
        <div className="settings-toggles">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={e => setHighContrast(e.target.checked)}
            />
            <div>
              <span className="settings-toggle-label">High Contrast Mode</span>
              <span className="settings-toggle-desc">Increase contrast for better readability</span>
            </div>
          </label>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={e => setReducedMotion(e.target.checked)}
            />
            <div>
              <span className="settings-toggle-label">Reduced Motion</span>
              <span className="settings-toggle-desc">Disable animations and transitions</span>
            </div>
          </label>
        </div>
      </section>
    </div>
  )
}
