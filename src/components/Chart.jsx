import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { GRADE_SYSTEMS } from '../lib/constants'

export default function Chart({ chartData, types, gradeSystem }) {
  return (
    <div className="max-w-[1600px] mx-auto px-6 pb-10">
      <div className="rounded-lg p-5" style={{ background: 'var(--cream-deep)', border: '1px solid var(--tan-dark)' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="font-semibold" style={{ color: 'var(--ink)' }}>평점 추이</h2>
          <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>누적 평점 (학기마다 그때까지의 평균)</div>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#B8A17040" />
              <XAxis dataKey="name" stroke="#5B4A33" fontSize={12} />
              <YAxis stroke="#5B4A33" fontSize={12} domain={[0, GRADE_SYSTEMS[gradeSystem].maxGPA]} />
              <Tooltip contentStyle={{ background: 'var(--cream)', border: '1px solid var(--tan-dark)', borderRadius: 6 }} formatter={(v) => (v != null ? Number(v).toFixed(2) : 'N/A')} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line type="monotone" dataKey="전체" stroke="#8B2A2A" strokeWidth={2.5} dot={{ r: 4 }} connectNulls />
              {types.map((t) => (
                <Line key={t.id} type="monotone" dataKey={t.name} stroke={t.color} strokeWidth={2} dot={{ r: 3 }} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-xs" style={{ color: 'var(--ink-soft)' }}>범례를 클릭하면 라인을 숨길 수 있어요.</div>
      </div>
    </div>
  )
}