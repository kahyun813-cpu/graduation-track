import { useState } from 'react'
import ModalShell, { Field } from './ModalShell'
import { useLang } from '../../lib/i18n'

export default function SemesterModal({ existing, onAdd, onClose }) {
  const { t } = useLang()
  const [year, setYear] = useState(1)
  const [type, setType] = useState('regular')
  const [term, setTerm] = useState(1)

  const add = () => {
    const alreadyExists = existing.some(
      (s) => s.year === Number(year) && s.type === type && (type !== 'regular' || s.term === Number(term))
    )
    if (alreadyExists) {
      alert(t.alertDuplicateSemester)
      return
    }
    onAdd({ year: Number(year), term: type === 'regular' ? Number(term) : 0, type })
  }

  const pill = (active, color = 'var(--maroon)') => ({
    background: active ? color : 'var(--cream-deep)', color: active ? 'var(--cream)' : 'var(--ink)', border: `1px solid ${active ? color : 'var(--tan-dark)'}`,
  })

  return (
    <ModalShell title={t.addSemesterTitle} onClose={onClose}>
      <div className="space-y-4">
        <Field label={t.yearLabel}>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((y) => (
              <button key={y} onClick={() => setYear(y)} className="flex-1 py-2 rounded text-sm font-medium" style={pill(year === y)}>{y}</button>
            ))}
          </div>
        </Field>

        <Field label={t.termTypeLabel}>
          <div className="grid grid-cols-3 gap-2">
            {[{ k: 'regular', label: t.regularLabel }, { k: 'summer', label: t.summerLabel }, { k: 'winter', label: t.winterLabel }].map((o) => (
              <button key={o.k} onClick={() => setType(o.k)} className="py-2 rounded text-sm font-medium" style={pill(type === o.k)}>{o.label}</button>
            ))}
          </div>
        </Field>

        {type === 'regular' && (
          <Field label={t.termLabel}>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map((termNum) => (
                <button key={termNum} onClick={() => setTerm(termNum)} className="py-2 rounded text-sm font-medium" style={pill(term === termNum)}>{termNum}</button>
              ))}
            </div>
          </Field>
        )}

        <div className="px-3 py-2 rounded text-sm" style={{ background: 'var(--cream-deep)', color: 'var(--ink-soft)' }}>
          {t.previewLabel}: <span className="font-semibold" style={{ color: 'var(--ink)' }}>{t.semLabel(year, type, term)}</span>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
        <button onClick={onClose} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>{t.cancelBtn}</button>
        <button onClick={add} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>{t.addBtn}</button>
      </div>
    </ModalShell>
  )
}