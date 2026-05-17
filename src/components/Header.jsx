import { useState } from 'react'
import { GraduationCap, Settings, Globe, HelpCircle } from 'lucide-react'
import { GRADE_SYSTEMS } from '../lib/constants'
import { useLang } from '../lib/i18n'
import HelpModal from './modals/HelpModal' // 🚨 방금 만든 설명서 파일 연결!

export default function Header({ totalEarnedCredits, totalCreditsGoal, overallGPA, gradeSystem, onOpenSettings }) {
  const { lang, t, setLang } = useLang()
  const [showHelp, setShowHelp] = useState(false) // 🚨 설명서 팝업창 제어 상태 추가

  return (
    <>
      <div className="border-b sticky top-0 z-20" style={{ background: 'var(--cream)', borderColor: 'var(--tan-dark)' }}>
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          
          {/* 타이틀 구역 */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'var(--maroon)', color: 'var(--cream)' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>{t.appTitle}</h1>
                
                {/* 🚨 Graduation Tracker 바로 오른쪽에 생기는 설명서 아이콘 단추! */}
                <button 
                  onClick={() => setShowHelp(true)} 
                  className="p-0.5 rounded-full hover:bg-stone-200/60 transition-colors"
                  title={lang === 'ko' ? '사용 설명서 보기' : 'View User Guide'}
                  style={{ color: 'var(--ink-soft)', display: 'inline-flex', alignItems: 'center' }}
                >
                  <HelpCircle size={16} />
                </button>
              </div>
              <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.appSubtitle}</p>
            </div>
          </div>

          {/* 우측 메뉴 구역 */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <button 
              className="icon-btn" 
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}
            >
              <Globe size={14} /> {t.langToggle}
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: 'var(--cream-deep)' }}>
              <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.totalCredits}</span>
              <span className="font-bold text-sm" style={{ color: 'var(--ink)' }}>
                {totalEarnedCredits} / {totalCreditsGoal}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: 'var(--cream-deep)' }}>
              <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.overallGPA}</span>
              <span className="font-bold text-sm" style={{ color: 'var(--maroon)' }}>
                {overallGPA != null ? overallGPA.toFixed(2) : '-'}
                <span className="text-xs font-normal" style={{ color: 'var(--ink-soft)' }}>
                  {' / '}{GRADE_SYSTEMS[gradeSystem].maxGPA}
                </span>
              </span>
            </div>

            <button className="icon-btn" onClick={onOpenSettings}>
              <Settings size={14} /> {t.settings}
            </button>
          </div>

        </div>
      </div>

      {/* 🚨 설명서 모달창 활성화 조건 */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  )
}