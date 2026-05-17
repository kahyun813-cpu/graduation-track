import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// 🚨 다국어 라이브러리 Hook
import { useLang } from '../lib/i18n';

const StatCard = ({ label, value }) => (
    <div className="p-4 rounded-lg text-center" style={{ background: 'var(--cream-deep)' }}>
        <div className="text-sm" style={{ color: 'var(--ink-soft)' }}>{label}</div>
        <div className="font-bold text-2xl" style={{ color: 'var(--maroon)' }}>
            {value}
        </div>
    </div>
);

export default function StatsDashboard({
    totalEarnedCredits,
    totalCreditsGoal,
    overallGPA,
    majorGPA,
    radarData,
}) {
    const { lang, t } = useLang();

    const graduationProgress = totalCreditsGoal > 0 ? (totalEarnedCredits / totalCreditsGoal) * 100 : 0;
    const formatGPA = (gpa) => gpa ? gpa.toFixed(2) : 'N/A';

    return (
        <div className="p-4 sm:p-6 rounded-lg space-y-6" style={{ background: 'var(--tan-light)' }}>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>{t.dashboardTitle}</h2>
                    <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                        {t.creditsShort(totalEarnedCredits, totalCreditsGoal)}
                    </span>
                </div>
                <div className="w-full h-3 rounded-full" style={{ background: 'var(--cream-deep)' }}>
                    <div
                        className="h-3 rounded-full"
                        style={{
                            width: `${Math.min(graduationProgress, 100)}%`,
                            background: 'var(--maroon)',
                            transition: 'width 0.5s ease-in-out'
                        }}
                    />
                </div>
                <div className="text-right text-xl font-bold mt-1" style={{ color: 'var(--maroon)' }}>
                    {graduationProgress.toFixed(1)}%
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatCard label={t.overallGPA} value={formatGPA(overallGPA)} />
                <StatCard label={t.majorGPALabel} value={formatGPA(majorGPA)} />
            </div>

            <div>
                <h3 className="text-center font-semibold mb-2" style={{ color: 'var(--ink)' }}>{t.radarChartTitle}</h3>
                <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="var(--tan-dark)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--ink-soft)', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Progress" dataKey="progress" stroke="var(--maroon)" fill="var(--maroon)" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}