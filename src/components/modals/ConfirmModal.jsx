import ModalShell from './ModalShell'
import { useLang } from '../../lib/i18n'

export default function ConfirmModal({ message, onConfirm, onCancel, confirmLabel }) {
  const { t } = useLang()
  return (
    <ModalShell title={t.confirmTitle} onClose={onCancel}>
      <p className="text-sm" style={{ color: 'var(--ink)' }}>{message}</p>
      <div className="flex justify-end gap-2 mt-6">
        <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>{t.cancelBtn}</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>{confirmLabel || t.confirmBtn}</button>
      </div>
    </ModalShell>
  )
}