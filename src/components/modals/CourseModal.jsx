import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import ModalShell, { Field } from './ModalShell'
import { GRADE_SYSTEMS, GRADE_COLORS } from '../../lib/constants'
import { useLang } from '../../lib/i18n'

export default function CourseModal({ course, categories, semesters, gradeSystem, onSave, onDelete, onClose }) {
  const { t } = useLang()
  const [name, setName] = useState(course.name || '')
  const [credits, setCredits] = useState(course.credits ?? 3)
  const [grade, setGrade] = useState(course.grade || null)
  const [categoryId, setCategoryId] = useState(course.categoryId)
  const [semesterId, setSemesterId] = useState(course.semesterId)

  const sys = GRADE_SYSTEMS[gradeSystem]

  const save = () => {
    if (!name.trim()) { alert(t.alertCourseName); return }
    onSave({ id: course.id, name: name.trim(), credits: Number(credits) || 0, grade, categoryId, semesterId })
  }

  return (
    <ModalShell title={course._isNew ? t.addCourseTitle : t.editCourseTitle} onClose={onClose}>
      <div className="space-y-4">
        <Field label={t.courseNameLabel}>
          <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') save() }} autoFocus className="text-input" placeholder={t.courseNamePlaceholder} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label={t.creditsLabel}>
            <input type="number" min={0} max={12} step={1} value={credits} onChange={(e) => setCredits(e.target.value)} className="text-input" />
          </Field>
          <Field label={t.categoryLabel}>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="text-input">
              {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </Field>
        </div>

        <Field label={t.semesterLabel_}>
          <select value={semesterId} onChange={(e) => setSemesterId(e.target.value)} className="text-input">
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>{t.semLabel(s.year, s.type, s.term)}</option>
            ))}
          </select>
        </Field>

        <Field label={t.gradeLabel}>
          <div className="space-y-1.5">
            {sys.gradeRows.map((row, i) => (
              <div key={i} className="flex gap-1.5 flex-wrap">
                {row.map((g) => (
                  <button key={g} onClick={() => setGrade(g === grade ? null : g)} className={`grade-btn ${grade === g ? 'active' : ''}`} style={grade === g ? {} : { color: GRADE_COLORS[g] }}>{g}</button>
                ))}
              </div>
            ))}
            <button onClick={() => setGrade(null)} className="text-xs underline mt-1" style={{ color: 'var(--ink-soft)' }}>{t.noGradeBtn}</button>
          </div>
        </Field>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
        {!course._isNew ? (
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