import { useState } from 'react'
import ModalShell, { Field } from './ModalShell'
import { makeSemesterLabel } from '../../lib/utils'

export default function SemesterModal({ existing, onAdd, onClose }) {
  const [year, setYear] = useState(1)
  const [type, setType] = useState('regular')
  const [term, setTerm] = useState(1)

  const labelOf = () => makeSemesterLabel(year, type, term)

  const add = () => {
    const label = labelOf()
    if (existing.find((s) => s.label === label)) { alert('이미 같은 학기가 있습니다.'); return }
    onAdd({ label, year: Number(year), term: type === 'regular' ? Number(term) : 0, type })
  }

  const pill = (active, color = 'var(--maroon)') => ({
    background: active ? color : 'var(--cream-deep)', color: active ? 'var(--cream)' : 'var(--ink)', border: `1px solid ${active ? color : 'var(--tan-dark)'}`,
  })

  return (
    <ModalShell title="학기 추가" onClose={onClose}>
      <div className="space-y-4">
        <Field label="학년">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((y) => (
              <button key={y} onClick={() => setYear(y)} className="flex-1 py-2 rounded text-sm font-medium" style={pill(year === y)}>{y}</button>
            ))}
          </div>
        </Field>

        <Field label="유형">
          <div className="grid grid-cols-3 gap-2">
            {[{ k: 'regular', label: '정규학기' }, { k: 'summer', label: '여름 계절' }, { k: 'winter', label: '겨울 계절' }].map((o) => (
              <button key={o.k} onClick={() => setType(o.k)} className="py-2 rounded text-sm font-medium" style={pill(type === o.k)}>{o.label}</button>
            ))}
          </div>
        </Field>

        {type === 'regular' && (
          <Field label="학기">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map((t) => (
                <button key={t} onClick={() => setTerm(t)} className="py-2 rounded text-sm font-medium" style={pill(term === t)}>{t}학기</button>
              ))}
            </div>
          </Field>
        )}

        <div className="px-3 py-2 rounded text-sm" style={{ background: 'var(--cream-deep)', color: 'var(--ink-soft)' }}>
          미리보기: <span className="font-semibold" style={{ color: 'var(--ink)' }}>{labelOf()}</span>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
        <button onClick={onClose} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>취소</button>
        <button onClick={add} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>추가</button>
      </div>
    </ModalShell>
  )
}