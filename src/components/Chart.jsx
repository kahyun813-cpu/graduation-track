import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { GRADE_SYSTEMS } from '../lib/constants'

// 🚨 본인의 다국어 라이브러리에서 useLang 훅 가져오기
import { useLang } from '../lib/i18n'

export default function Chart({ chartData, types, gradeSystem }) {
  // 🚨 현재 언어에 맞는 번역 텍스트 세트(t) 받아오기
  const { t } = useLang()

  return (
    // 원래 가지고 계시던 패딩 값(px-6 pb-10)을 그대로 유지합니다!
    <div className="max-w-[1600px] mx-auto px-6 pb-10">
      <div className="rounded-lg p-5" style={{ background: 'var(--cream-deep)', border: '1px solid var(--tan-dark)' }}>
        
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          {/* 🚨 한국어/영어에 따라 실시간으로 바뀌도록 매핑 */}
          <h2 className="font-semibold" style={{ color: 'var(--ink)' }}>{t.chartTitle}</h2>
          <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>{t.chartSubtitle}</div>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#B8A17040" />
              <XAxis dataKey="name" stroke="#5B4A33" fontSize={12} />
              <YAxis stroke="#5B4A33" fontSize={12} domain={[0, GRADE_SYSTEMS[gradeSystem].maxGPA]} />
              <Tooltip contentStyle={{ background: 'var(--cream)', border: '1px solid var(--tan-dark)', borderRadius: 6 }} formatter={(v) => (v != null ? Number(v).toFixed(2) : 'N/A')} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              
              {/* 🚨 dataKey를 '전체' 대신 본인이 i18n에 적어둔 t.overallKey('전체' 또는 'Overall')로 매칭! */}
              <Line type="monotone" dataKey={t.overallKey} stroke="#8B2A2A" strokeWidth={2.5} dot={{ r: 4 }} connectNulls />
              
              {types.map((tObj) => (
                <Line key={tObj.id} type="monotone" dataKey={tObj.name} stroke={tObj.color} strokeWidth={2} dot={{ r: 3 }} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* 🚨 하단 힌트 문구도 다국어 자동 변환 */}
        <div className="mt-3 text-xs" style={{ color: 'var(--ink-soft)' }}>{t.chartHint}</div>
      </div>
    </div>
  )
}