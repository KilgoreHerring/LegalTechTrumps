import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return createPortal(
    <dialog ref={dialogRef} className="modal-dialog" onClick={e => {
      if (e.target === dialogRef.current) onClose()
    }}>
      <div className="modal-content">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </dialog>,
    document.body,
  )
}
