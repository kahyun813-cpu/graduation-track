import { GraduationCap, Settings } from 'lucide-react'
import { GRADE_SYSTEMS } from '../lib/constants'

export default function Header({ totalEarnedCredits, totalCreditsGoal, overallGPA, gradeSystem, onOpenSettings }) {
  return (
    <div className="border-b sticky top-0 z-20" style={{ background: 'var(--cream)', borderColor: 'var(--tan-dark)' }}>
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>졸업요건 트래커</h1>
            <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>학기별 과목 · 학점 · 평점 한눈에</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: 'var(--cream-deep)' }}>
            <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>총 학점</span>
            <span className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{totalEarnedCredits} / {totalCreditsGoal}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: 'var(--cream-deep)' }}>
            <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>전체 평점</span>
            <span className="font-bold text-sm" style={{ color: 'var(--maroon)' }}>
              {overallGPA != null ? overallGPA.toFixed(2) : '-'}
              <span className="text-xs font-normal" style={{ color: 'var(--ink-soft)' }}>{' / '}{GRADE_SYSTEMS[gradeSystem].maxGPA}</span>
            </span>
          </div>
          <button className="icon-btn" onClick={onOpenSettings}><Settings size={14} /> 설정</button>
        </div>
      </div>
    </div>
  )
}