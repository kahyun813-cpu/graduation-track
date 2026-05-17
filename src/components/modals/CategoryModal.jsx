import { useState } from 'react'
import { Plus } from 'lucide-react'
import ModalShell, { Field } from './ModalShell'
import { useLang } from '../../lib/i18n'

export default function CategoryModal({ category, types, onSave, onAddType, onClose }) {
  const { t } = useLang()
  const [name, setName] = useState(category.name || '')
  const [requiredCredits, setRequiredCredits] = useState(category.requiredCredits || 0)
  const [tag, setTag] = useState(category.tag || '')
  const [typeId, setTypeId] = useState(category.typeId || null)

  const save = () => {
    if (!name.trim()) { alert(t.alertCategoryName); return }
    onSave({ id: category.id, name: name.trim(), requiredCredits: Number(requiredCredits) || 0, tag: tag || null, typeId: typeId || null })
  }

  return (
    <ModalShell title={category._isNew ? t.addCategoryTitle : t.editCategoryTitle} onClose={onClose}>
      <div className="space-y-4">
        <Field label={t.nameLabel}>
          <input value={name} onChange={(e) => setName(e.target.value)} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') save() }} className="text-input" placeholder={t.categoryNamePlaceholder} />
        </Field>

        <Field label={t.requiredCreditsLabel}>
          <input type="number" min={0} value={requiredCredits} onChange={(e) => setRequiredCredits(e.target.value)} className="text-input" />
        </Field>

        <Field label={t.typeForGraphLabel}>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setTypeId(null)} className="px-3 py-1.5 rounded text-sm font-medium" style={{ background: typeId === null ? 'var(--ink-soft)' : 'var(--cream-deep)', color: typeId === null ? 'var(--cream)' : 'var(--ink)', border: `1px solid ${typeId === null ? 'var(--ink-soft)' : 'var(--tan-dark)'}` }}>{t.noTypeBtn}</button>
            {types.map((t) => (
              <button key={t.id} onClick={() => setTypeId(t.id)} className="px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5" style={{ background: typeId === t.id ? t.color : 'var(--cream-deep)', color: typeId === t.id ? 'var(--cream)' : 'var(--ink)', border: `1px solid ${typeId === t.id ? t.color : 'var(--tan-dark)'}` }}>
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: t.color, border: typeId === t.id ? '1px solid var(--cream)' : 'none' }} />{t.name}
              </button>
            ))}
            <button onClick={onAddType} className="px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5" style={{ background: 'transparent', color: 'var(--maroon)', border: '1px dashed var(--maroon)' }}><Plus size={12} /> {t.newTypeBtn}</button>
          </div>
        </Field>

        <Field label={t.tagLabel}>
          <div className="flex gap-2 flex-wrap">
            {t.tagPresets.map((tagPreset) => (
              <button key={tagPreset || 'none'} onClick={() => setTag(tagPreset)} className="px-3 py-1.5 rounded text-sm" style={{ background: tag === tagPreset ? 'var(--maroon)' : 'var(--cream-deep)', color: tag === tagPreset ? 'var(--cream)' : 'var(--ink)', border: `1px solid ${tag === tagPreset ? 'var(--maroon)' : 'var(--tan-dark)'}` }}>{t.tagDisplayNames[tagPreset]}</button>
            ))}
          </div>
        </Field>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
        <button onClick={onClose} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>{t.cancelBtn}</button>
        <button onClick={save} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>{t.saveBtn}</button>
      </div>
    </ModalShell>
  )
}