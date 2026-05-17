import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import ModalShell, { Field } from './ModalShell'
import { GRADE_SYSTEMS, GRADE_COLORS } from '../../lib/constants'

export default function CourseModal({ course, categories, semesters, gradeSystem, onSave, onDelete, onClose }) {
  const [name, setName] = useState(course.name || '')
  const [credits, setCredits] = useState(course.credits ?? 3)
  const [grade, setGrade] = useState(course.grade || null)
  const [categoryId, setCategoryId] = useState(course.categoryId)
  const [semesterId, setSemesterId] = useState(course.semesterId)

  const sys = GRADE_SYSTEMS[gradeSystem]

  const save = () => {
    if (!name.trim()) { alert('과목명을 입력해주세요.'); return }
    onSave({ id: course.id, name: name.trim(), credits: Number(credits) || 0, grade, categoryId, semesterId })
  }

  return (
    <ModalShell title={course._isNew ? '과목 추가' : '과목 수정'} onClose={onClose}>
      <div className="space-y-4">
        <Field label="과목명">
          <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') save() }} autoFocus className="text-input" placeholder="예: 통계수학" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="학점">
            <input type="number" min={0} max={12} step={1} value={credits} onChange={(e) => setCredits(e.target.value)} className="text-input" />
          </Field>
          <Field label="카테고리">
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="text-input">
              {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </Field>
        </div>

        <Field label="학기">
          <select value={semesterId} onChange={(e) => setSemesterId(e.target.value)} className="text-input">
            {semesters.map((s) => (<option key={s.id} value={s.id}>{s.label}</option>))}
          </select>
        </Field>

        <Field label="성적 (선택)">
          <div className="space-y-1.5">
            {sys.gradeRows.map((row, i) => (
              <div key={i} className="flex gap-1.5 flex-wrap">
                {row.map((g) => (
                  <button key={g} onClick={() => setGrade(g === grade ? null : g)} className={`grade-btn ${grade === g ? 'active' : ''}`} style={grade === g ? {} : { color: GRADE_COLORS[g] }}>{g}</button>
                ))}
              </div>
            ))}
            <button onClick={() => setGrade(null)} className="text-xs underline mt-1" style={{ color: 'var(--ink-soft)' }}>성적 없음 (이수 예정)</button>
          </div>
        </Field>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
        {!course._isNew ? (
          <button onClick={onDelete} className="px-3 py-2 rounded text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--maroon)' }}><Trash2 size={14} /> 삭제</button>
        ) : <div />}
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--ink-soft)' }}>취소</button>
          <button onClick={save} className="px-4 py-2 rounded text-sm font-semibold" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>저장</button>
        </div>
      </div>
    </ModalShell>
  )
}