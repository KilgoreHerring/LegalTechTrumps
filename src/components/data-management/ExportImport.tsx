import { useState, useRef } from 'react'
import { useSolutions } from '../../hooks/use-solutions'
import { exportToJson, importFromJson } from '../../store/storage'
import { downloadJson, readFileAsText } from '../../utils/export-import'
import Button from '../ui/Button'
import './ExportImport.css'

export default function ExportImport() {
  const { state, dispatch } = useSolutions()
  const fileRef = useRef<HTMLInputElement>(null)
  const [importResult, setImportResult] = useState<{ count: number; errors: string[] } | null>(null)
  const [importMode, setImportMode] = useState<'replace' | 'merge'>('merge')

  const handleExport = () => {
    const json = exportToJson(state.solutions)
    const date = new Date().toISOString().split('T')[0]
    downloadJson(json, `legal-techtrumps-${date}.json`)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await readFileAsText(file)
      const { solutions, errors } = importFromJson(text)
      setImportResult({ count: solutions.length, errors })

      if (solutions.length > 0) {
        dispatch({ type: 'IMPORT_DATA', payload: { solutions, mode: importMode } })
      }
    } catch {
      setImportResult({ count: 0, errors: ['Failed to read file'] })
    }

    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="export-import">
      <div className="ei-section">
        <h3>Export Data</h3>
        <p className="ei-desc">
          Download all {state.solutions.length} solution{state.solutions.length !== 1 ? 's' : ''} as a JSON file for backup.
        </p>
        <Button onClick={handleExport} disabled={state.solutions.length === 0}>
          Export JSON
        </Button>
      </div>

      <div className="ei-section">
        <h3>Import Data</h3>
        <p className="ei-desc">Import solutions from a previously exported JSON file.</p>
        <div className="ei-mode">
          <label className={`ei-mode-option ${importMode === 'merge' ? 'ei-mode-active' : ''}`}>
            <input type="radio" name="mode" value="merge" checked={importMode === 'merge'} onChange={() => setImportMode('merge')} />
            Merge (add new, keep existing)
          </label>
          <label className={`ei-mode-option ${importMode === 'replace' ? 'ei-mode-active' : ''}`}>
            <input type="radio" name="mode" value="replace" checked={importMode === 'replace'} onChange={() => setImportMode('replace')} />
            Replace (overwrite all)
          </label>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="ei-file-input"
        />
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          Choose File
        </Button>

        {importResult && (
          <div className={`ei-result ${importResult.errors.length > 0 ? 'ei-result-error' : 'ei-result-success'}`}>
            {importResult.count > 0 && <p>Imported {importResult.count} solution{importResult.count !== 1 ? 's' : ''}.</p>}
            {importResult.errors.map((err, i) => (
              <p key={i} className="ei-error">{err}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
