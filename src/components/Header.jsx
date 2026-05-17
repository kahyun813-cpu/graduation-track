import { GraduationCap, Settings, Globe } from 'lucide-react'
import { GRADE_SYSTEMS } from '../lib/constants'

// 🚨 본인이 만든 다국어 커스텀 훅 가져오기
import { useLang } from '../lib/i18n'

export default function Header({ totalEarnedCredits, totalCreditsGoal, overallGPA, gradeSystem, onOpenSettings }) {
  // 🚨 컨텍스트로부터 현재 언어와 번역 텍스트(t), 언어 변경 함수 받아오기
  const { lang, t, setLang } = useLang()

  return (
    <div className="border-b sticky top-0 z-20" style={{ background: 'var(--cream)', borderColor: 'var(--tan-dark)' }}>
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
        
        {/* 타이틀 구역 (t.appTitle, t.appSubtitle 반영) */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>{t.appTitle}</h1>
            <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.appSubtitle}</p>
          </div>
        </div>

        {/* 우측 메뉴 구역 */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          
          {/* 🌐 클릭할 때마다 ko ↔ en 상태를 스위칭하는 버튼 (t.langToggle 반영) */}
          <button 
            className="icon-btn" 
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}
          >
            <Globe size={14} /> {t.langToggle}
          </button>

          {/* 총 학점 구역 (t.totalCredits 반영) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: 'var(--cream-deep)' }}>
            <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.totalCredits}</span>
            <span className="font-bold text-sm" style={{ color: 'var(--ink)' }}>
              {totalEarnedCredits} / {totalCreditsGoal}
            </span>
          </div>

          {/* 전체 평점 구역 (t.overallGPA 반영) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: 'var(--cream-deep)' }}>
            <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.overallGPA}</span>
            <span className="font-bold text-sm" style={{ color: 'var(--maroon)' }}>
              {overallGPA != null ? overallGPA.toFixed(2) : '-'}
              <span className="text-xs font-normal" style={{ color: 'var(--ink-soft)' }}>
                {' / '}{GRADE_SYSTEMS[gradeSystem].maxGPA}
              </span>
            </span>
          </div>

          {/* 설정 버튼 (t.settings 반영) */}
          <button className="icon-btn" onClick={onOpenSettings}>
            <Settings size={14} /> {t.settings}
          </button>
        </div>

      </div>
    </div>
  )
}