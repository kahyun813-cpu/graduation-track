import React from 'react'
import { Plus, X, Edit3, Trash2 } from 'lucide-react'
import { GRADE_COLORS, TAG_COLORS } from '../lib/constants'
import { useLang } from '../lib/i18n'

export default function Grid({
  sortedSemesters, categories, coursesBySemester, earnedByCategory, semesterStats,
  onAddSemester, onRemoveSemester, onAddCategory, onEditCategory, onRemoveCategory, onAddCourse, onEditCourse,
}) {
  const { t } = useLang()

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 overflow-x-auto">
      <div className="grid gap-2 min-w-fit" style={{ gridTemplateColumns: `200px repeat(${sortedSemesters.length}, minmax(160px, 1fr))` }}>
        <div className="flex items-center justify-center">
          <button onClick={onAddSemester} className="w-10 h-10 rounded-md flex items-center justify-center hover:scale-105 transition" style={{ border: '1.5px solid var(--maroon)', color: 'var(--maroon)' }} title={t.addSemesterTitle}>
            <Plus size={18} />
          </button>
        </div>

        {sortedSemesters.map((s) => (
          <div key={s.id} className="semester-header group">
            <span>{t.semLabel(s.year, s.type, s.term)}</span>
            <button onClick={() => onRemoveSemester(s.id)} className="opacity-0 group-hover:opacity-100 transition" title={t.deleteSemesterTitle} style={{ color: 'var(--maroon)' }}><X size={14} /></button>
          </div>
        ))}

        {categories.map((cat) => {
          const earned = earnedByCategory[cat.id] || 0
          const pct = cat.requiredCredits > 0 ? Math.min(100, (earned / cat.requiredCredits) * 100) : 0
          const overflowing = earned > cat.requiredCredits && cat.requiredCredits > 0
          return (
            <React.Fragment key={cat.id}>
              <div className="category-label group relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-sm leading-tight" style={{ color: 'var(--ink)' }}>{cat.name}</div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => onEditCategory(cat)} title={t.editLabel} style={{ color: 'var(--ink-soft)' }}><Edit3 size={13} /></button>
                    <button onClick={() => onRemoveCategory(cat.id)} title={t.deleteBtn} style={{ color: 'var(--maroon)' }}><Trash2 size={13} /></button>
                  </div>
                </div>
                <div className="text-xs mt-1" style={{ color: overflowing ? '#5B6B23' : 'var(--ink-soft)' }}>{earned}/{cat.requiredCredits} {t.creditsUnit}</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: overflowing ? '#5B6B23' : 'var(--maroon)' }} />
                </div>
                {cat.tag && (
                  <div className="mt-2">
                    <span className="tag-badge" style={{ background: TAG_COLORS[cat.tag]?.bg || 'var(--maroon)', color: TAG_COLORS[cat.tag]?.text || 'var(--cream)' }}>{t.tagDisplayNames[cat.tag] || cat.tag}</span>
                  </div>
                )}
              </div>

              {sortedSemesters.map((s) => {
                const cellCourses = coursesBySemester[`${cat.id}__${s.id}`] || []
                return (
                  <div key={s.id} className="flex flex-col gap-1.5 py-1">
                    {cellCourses.map((c) => (
                      <button key={c.id} className="pill" onClick={() => onEditCourse(c)}>
                        <span className="truncate flex-1 min-w-0">{c.name}</span>
                        {c.grade && <span className="font-bold flex-shrink-0" style={{ color: GRADE_COLORS[c.grade] || 'var(--ink)' }}>{c.grade}</span>}
                      </button>
                    ))}
                    <button className="pill-empty" onClick={() => onAddCourse(cat.id, s.id)}><Plus size={14} /></button>
                  </div>
                )
              })}
            </React.Fragment>
          )
        })}

        <div className="flex items-center justify-center">
          <button onClick={onAddCategory} className="w-10 h-10 rounded-md flex items-center justify-center hover:scale-105 transition" style={{ border: '1.5px solid var(--maroon)', color: 'var(--maroon)' }} title={t.addCategoryTitle}>
            <Plus size={18} />
          </button>
        </div>
        {sortedSemesters.map((s) => {
          const stat = semesterStats[s.id]
          return (
            <div key={s.id} className="summary-cell">
              <div className="text-base font-bold" style={{ color: stat.gpa != null ? 'var(--maroon)' : 'var(--ink-soft)' }}>{stat.gpa != null ? stat.gpa.toFixed(2) : 'N/A'}</div>
              <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>{stat.credits} {t.creditsUnit}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}