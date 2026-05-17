import { Download, Upload, Plus, Edit3, Trash2 } from 'lucide-react'
import ModalShell, { Field } from './ModalShell'
import { GRADE_SYSTEMS } from '../../lib/constants'
import { useLang } from '../../lib/i18n'

export default function SettingsModal({
  gradeSystem, setGradeSystem, totalCreditsGoal, setTotalCreditsGoal, types, onAddType, onEditType, onExport, onImport, onReset, onClose,
}) {
  const { t } = useLang()

  return (
    <ModalShell title={t.settingsTitle} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-5">
        <Field label={t.gradeSystemLabel}>
          <div className="space-y-2">
            {Object.entries(GRADE_SYSTEMS).map(([k, v]) => (
              <button key={k} onClick={() => setGradeSystem(k)} className="w-full text-left px-3 py-3 rounded" style={{ background: gradeSystem === k ? 'var(--maroon)' : 'var(--cream-deep)', color: gradeSystem === k ? 'var(--cream)' : 'var(--ink)', border: `1px solid ${gradeSystem === k ? 'var(--maroon)' : 'var(--tan-dark)'}` }}>
                <div className="font-semibold text-sm">{t.gradeSystems[k].short}</div>
                <div className="text-xs mt-0.5 opacity-90">{t.gradeSystems[k].full}</div>
              </button>
            ))}
          </div>
        </Field>

        <Field label={t.graduationCreditsLabel}>
          <input type="number" min={0} value={totalCreditsGoal} onChange={(e) => setTotalCreditsGoal(Number(e.target.value) || 0)} className="text-input" />
        </Field>

        <Field label={t.typeManagement}>
          <div className="space-y-1.5">
            {types.map((t) => (
              <div key={t.id} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: 'var(--cream-deep)', border: '1px solid var(--tan-dark)' }}>
                <span className="inline-block w-4 h-4 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <span className="flex-1 font-medium text-sm" style={{ color: 'var(--ink)' }}>{t.name}</span>
                <button onClick={() => onEditType(t)} className="px-2 py-1 rounded text-xs flex items-center gap-1" style={{ color: 'var(--ink-soft)' }}><Edit3 size={12} /> {t.editLabel}</button>
              </div>
            ))}
            <button onClick={onAddType} className="w-full px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-1.5" style={{ background: 'transparent', color: 'var(--maroon)', border: '1.5px dashed var(--maroon)' }}><Plus size={14} /> {t.addTypeBtn}</button>
          </div>
        </Field>

        <div className="pt-2 border-t" style={{ borderColor: 'var(--tan-dark)' }}>
          <div className="field-label">{t.dataLabel}</div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onExport} className="px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-2" style={{ background: 'var(--cream-deep)', color: 'var(--ink)', border: '1px solid var(--tan-dark)' }}><Download size={14} /> {t.exportBtn}</button>
            <label className="px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 cursor-pointer" style={{ background: 'var(--cream-deep)', color: 'var(--ink)', border: '1px solid var(--tan-dark)' }}>
              <Upload size={14} /> {t.importBtn}
              <input type="file" accept="application/json" className="hidden" onChange={(e) => { if (e.target.files?.[0]) { onImport(e.target.files[0]); onClose() } }} />
            </label>
          </div>
          <button onClick={onReset} className="w-full mt-2 px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-1.5" style={{ background: 'transparent', color: 'var(--maroon)', border: '1px solid var(--maroon)' }}><Trash2 size={14} /> {t.resetAllBtn}</button>
        </div>
      </div>
    </ModalShell>
  )
}