import { X, Info, Plus, GraduationCap, BarChart2 } from 'lucide-react'
import { useLang } from '../../lib/i18n'

export default function HelpModal({ onClose }) {
  const { lang } = useLang()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="w-full max-w-2xl rounded-xl shadow-xl overflow-hidden border flex flex-col bg-white border-zinc-200 animate-scale-up"
      >
        {/* 헤더 (새로운 깔끔한 그레이/블랙 톤) */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-zinc-50 border-zinc-200">
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            <Info size={18} className="text-zinc-700" />
            <span>{lang === 'ko' ? '사용 설명서' : 'User Guide'}</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-md hover:bg-zinc-200/60 transition-colors text-zinc-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* 본문 콘텐츠 */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1 text-zinc-700 max-h-[60vh]">
          {lang === 'ko' ? (
            <>
              <p className="text-base font-medium border-b pb-3 border-zinc-100 text-zinc-900">
                🎓 <strong>Graduation Tracker</strong>에 오신 것을 환영합니다! 본 서비스는 대학 생활 동안 이수한 과목과 학점, 평점을 시각적으로 관리할 수 있는 도구입니다.
              </p>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-zinc-900 text-white mt-0.5 shadow-sm">
                    <Plus size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900 mb-1">1. 학기 및 과목 추가하기</h4>
                    <p className="text-zinc-600 leading-relaxed">
                      표의 왼쪽 위에 있는 <strong>[+]</strong> 버튼을 눌러 계절학기를 포함한 새 학기를 추가할 수 있습니다. 각 칸의 <strong>[+]</strong> 버튼을 누르면 해당 학기에 들은 과목명, 학점, 성적을 입력할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-zinc-900 text-white mt-0.5 shadow-sm">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900 mb-1">2. 이수 요건 관리</h4>
                    <p className="text-zinc-600 leading-relaxed">
                      왼쪽의 카테고리 카드(Major Required, Electives 등)는 졸업에 필요한 필수 학점 대비 내가 채운 학점을 실시간으로 계산해 줍니다. 오른쪽 상단 <strong>Settings</strong>를 통해 본인 학교의 졸업 요건에 맞게 자유롭게 카테고리를 편집해 보세요.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-zinc-900 text-white mt-0.5 shadow-sm">
                    <BarChart2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900 mb-1">3. 대시보드 및 데이터 보관</h4>
                    <p className="text-zinc-600 leading-relaxed">
                      하단 대시보드에서는 누적 평점 추이 그래프와 전공 평점을 한눈에 확인할 수 있습니다. 입력한 모든 데이터는 브라우저에 자동 저장되며, <strong>Settings ➡️ Export</strong>를 통해 파일로 백업해 안전하게 보관할 수도 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-base font-medium border-b pb-3 border-zinc-100 text-zinc-900">
                🎓 Welcome to the <strong>Graduation Tracker</strong>! This tool helps you visually manage your university courses, credits, and GPA.
              </p>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-zinc-900 text-white mt-0.5 shadow-sm">
                    <Plus size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900 mb-1">1. Add Semesters & Courses</h4>
                    <p className="text-zinc-600 leading-relaxed">
                      Click the <strong>[+]</strong> button at the top-left to add new regular or summer/winter semesters. Click the <strong>[+]</strong> inside any cell to log a course name, credits, and grade for that semester.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-zinc-900 text-white mt-0.5 shadow-sm">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900 mb-1">2. Manage Graduation Requirements</h4>
                    <p className="text-zinc-600 leading-relaxed">
                      The category cards on the left track your progress against required graduation credits. Open <strong>Settings</strong> in the top-right corner to tailor the categories according to your university's specific system.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-zinc-900 text-white mt-0.5 shadow-sm">
                    <BarChart2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900 mb-1">3. Dashboard & Data Backup</h4>
                    <p className="text-zinc-600 leading-relaxed">
                      The bottom dashboard displays your cumulative GPA trends and a dedicated Major GPA box. All data is autosaved locally, and you can download a backup file anytime via <strong>Settings ➡️ Export</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t flex justify-end bg-zinc-50 border-zinc-200">
          <button 
            className="px-4 py-2 text-xs font-bold rounded-lg border transition-all bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm"
            onClick={onClose}
          >
            {lang === 'ko' ? '닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}