import ModalShell from './ModalShell'

export default function ConfirmModal({ message, onConfirm, onCancel, confirmLabel = '확인' }) {
  return (
    <ModalShell title="확인" onClose={onCancel}>
      <p className="text-sm" style={{ color: 'var(--ink)' }}>{message}</p>
      <div className="flex justify-end gap-2 mt-6">
        <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>취소</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>{confirmLabel}</button>
      </div>
    </ModalShell>
  )
}