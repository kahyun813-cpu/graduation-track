import { useState } from 'react'
import { Trash2, Check } from 'lucide-react'
import ModalShell, { Field } from './ModalShell'
import { TYPE_COLOR_PALETTE } from '../../lib/constants'
import { useLang } from '../../lib/i18n'

export default function TypeModal({ type, onSave, onDelete, onClose, deletable }) {
  const { t } = useLang()
  const [name, setName] = useState(type.name || '')
  const [color, setColor] = useState(type.color || TYPE_COLOR_PALETTE[0])
  const [customColor, setCustomColor] = useState(type.color || '#000000')
  const [customMode, setCustomMode] = useState(!TYPE_COLOR_PALETTE.includes(type.color))

  const save = () => {
    if (!name.trim()) { alert(t.alertTypeName); return }
    onSave({ id: type.id, name: name.trim(), color: customMode ? customColor : color })
  }

  return (
    <ModalShell title={type._isNew ? t.addTypeTitle : t.editTypeTitle} onClose={onClose}>
      <div className="space-y-4">
        <Field label={t.typeNameLabel}>
          <input value={name} onChange={(e) => setName(e.target.value)} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') save() }} className="text-input" placeholder={t.typeNamePlaceholder} />
        </Field>

        <Field label={t.colorLabel}>
          <div className="grid grid-cols-6 gap-2 mb-3">
            {TYPE_COLOR_PALETTE.map((c) => (
              <button key={c} onClick={() => { setColor(c); setCustomMode(false) }} className="aspect-square rounded flex items-center justify-center" style={{ background: c, border: !customMode && color === c ? '3px solid var(--cream)' : '1px solid var(--tan-dark)', boxShadow: !customMode && color === c ? `0 0 0 2px ${c}` : 'none' }}>
                {!customMode && color === c && <Check size={14} style={{ color: '#fff' }} />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--ink-soft)' }}><input type="checkbox" checked={customMode} onChange={(e) => setCustomMode(e.target.checked)} /> {t.customColorLabel}</label>
            {customMode && (
              <>
                <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="h-8 w-12 rounded cursor-pointer" style={{ border: '1px solid var(--tan-dark)' }} />
                <input type="text" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="text-input flex-1" placeholder="#000000" />
              </>
            )}
          </div>
        </Field>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
        {!type._isNew && deletable ? (
          <button onClick={onDelete} className="px-3 py-2 rounded text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--maroon)' }}><Trash2 size={14} /> {t.deleteBtn}</button>
        ) : <div />}
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>{t.cancelBtn}</button>
          <button onClick={save} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>{t.saveBtn}</button>
        </div>
      </div>
    </ModalShell>
  )
}