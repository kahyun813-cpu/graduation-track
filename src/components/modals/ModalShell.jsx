import { X } from 'lucide-react'

export default function ModalShell({ title, onClose, children, maxWidth = 'max-w-md' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(58,46,31,0.45)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className={`rounded-lg shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-auto`} style={{ background: 'var(--cream)', border: '1px solid var(--tan-dark)' }} onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 flex items-center justify-between border-b sticky top-0" style={{ borderColor: 'var(--tan-dark)', background: 'var(--cream)' }}>
          <h3 className="font-bold" style={{ color: 'var(--ink)' }}>{title}</h3>
          <button onClick={onClose} style={{ color: 'var(--ink-soft)' }}><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      {children}
    </div>
  )
}