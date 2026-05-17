import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Grid from './components/Grid'
import Chart from './components/Chart'
import StatsDashboard from './components/StatsDashboard'
import CourseModal from './components/modals/CourseModal'
import CategoryModal from './components/modals/CategoryModal'
import SemesterModal from './components/modals/SemesterModal'
import TypeModal from './components/modals/TypeModal'
import SettingsModal from './components/modals/SettingsModal'
import ConfirmModal from './components/modals/ConfirmModal'
import {
  TYPE_COLOR_PALETTE,
  uid,
  getDefaultTypes,
  getDefaultSemesters,
  getDefaultCategories,
} from './lib/constants'
import { loadState, saveState } from './lib/storage'
import { semesterSortKey, calcGPA, calcEarnedCredits } from './lib/utils'

// 🚨 본인이 만든 다국어 컨텍스트와 번역 데이터 완벽 연결
import { translations, LangContext } from './lib/i18n'

export default function App() {
  // ---------------------------- 상태 ----------------------------
  const [lang, setLang] = useState('ko') // 기본 언어: 한국어
  const [gradeSystem, setGradeSystem] = useState('plus-zero')
  const [totalCreditsGoal, setTotalCreditsGoal] = useState(130)
  const [types, setTypes] = useState([])
  const [semesters, setSemesters] = useState([])
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [loaded, setLoaded] = useState(false)

  // 모달 상태
  const [editingCourse, setEditingCourse] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingType, setEditingType] = useState(null)
  const [addingSemester, setAddingSemester] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [pendingCategoryReturn, setPendingCategoryReturn] = useState(null)

  // 현재 언어에 맞는 텍스트 세트 자동 매칭
  const t = translations[lang]

  // ---------------------------- 🚨 다국어 연동 핸들러 ----------------------------
  const handleLanguageChange = (newLang) => {
    setLang(newLang)
    
    // 사용자가 직접 추가한 과목이 아직 없다면(초기 상태), 언어 버튼 누를 때 테이블 데이터도 즉시 번역본으로 자동 갱신!
    if (courses.length === 0) {
      const nextTypes = getDefaultTypes(newLang)
      const nextSemesters = getDefaultSemesters(newLang)
      const nextCategories = getDefaultCategories(nextTypes, newLang)
      setTypes(nextTypes)
      setSemesters(nextSemesters)
      setCategories(nextCategories)
    }
  }

  // ---------------------------- 로드 ----------------------------
  useEffect(() => {
    const saved = loadState()
    if (saved) {
      if (saved.lang) setLang(saved.lang)
      if (saved.gradeSystem) setGradeSystem(saved.gradeSystem)
      if (saved.totalCreditsGoal) setTotalCreditsGoal(saved.totalCreditsGoal)
      if (saved.types) setTypes(saved.types)
      if (saved.semesters) setSemesters(saved.semesters)
      if (saved.categories) setCategories(saved.categories)
      if (saved.courses) setCourses(saved.courses)
    } else {
      // 처음 실행 시 기본 언어(ko) 기준으로 테이블 세팅
      const defaultTypes = getDefaultTypes('ko')
      const defaultSemesters = getDefaultSemesters('ko')
      const defaultCategories = getDefaultCategories(defaultTypes, 'ko')
      setTypes(defaultTypes)
      setSemesters(defaultSemesters)
      setCategories(defaultCategories)
    }
    setLoaded(true)
  }, [])

  // ---------------------------- 저장 ----------------------------
  useEffect(() => {
    if (!loaded) return
    saveState({ lang, gradeSystem, totalCreditsGoal, types, semesters, categories, courses })
  }, [lang, gradeSystem, totalCreditsGoal, types, semesters, categories, courses, loaded])

  // ---------------------------- 파생 상태 ----------------------------
  const sortedSemesters = useMemo(
    () => [...semesters].sort((a, b) => semesterSortKey(a) - semesterSortKey(b)),
    [semesters]
  )

  const coursesBySemester = useMemo(() => {
    const map = {}
    for (const c of courses) {
      const k = `${c.categoryId}__${c.semesterId}`
      if (!map[k]) map[k] = []
      map[k].push(c)
    }
    return map
  }, [courses])

  const earnedByCategory = useMemo(() => {
    const map = {}
    for (const cat of categories) {
      const catCourses = courses.filter((c) => c.categoryId === cat.id)
      map[cat.id] = calcEarnedCredits(catCourses)
    }
    return map
  }, [categories, courses])

  const semesterStats = useMemo(() => {
    const stats = {}
    for (const s of sortedSemesters) {
      const sc = courses.filter((c) => c.semesterId === s.id)
      stats[s.id] = {
        gpa: calcGPA(sc, gradeSystem),
        credits: calcEarnedCredits(sc),
      }
    }
    return stats
  }, [sortedSemesters, courses, gradeSystem])

  const chartData = useMemo(() => {
    const catTypeMap = {}
    for (const cat of categories) catTypeMap[cat.id] = cat.typeId

    const acc = { 전체: [] }
    for (const t of types) acc[t.name] = []

    const data = []
    for (const s of sortedSemesters) {
      const sc = courses.filter((c) => c.semesterId === s.id)
      acc['전체'] = acc['전체'].concat(sc)
      for (const t of types) {
        const filtered = sc.filter((c) => catTypeMap[c.categoryId] === t.id)
        acc[t.name] = acc[t.name].concat(filtered)
      }
      const point = { name: t.semChartLabel(s) } // 🚨 본인의 다국어 차트 라벨 함수 바인딩
      point['전체'] = calcGPA(acc['전체'], gradeSystem)
      for (const t of types) {
        point[t.name] = calcGPA(acc[t.name], gradeSystem)
      }
      data.push(point)
    }
    return data
  }, [sortedSemesters, courses, categories, types, gradeSystem, t])

  const totalEarnedCredits = useMemo(() => calcEarnedCredits(courses), [courses])
  const overallGPA = useMemo(() => calcGPA(courses, gradeSystem), [courses, gradeSystem])

  const majorGPA = useMemo(() => {
    const majorCategoryIds = categories
      .filter((c) => c.tag === '본전공' || c.tag === '제2전공' || c.tag === 'Major' || c.tag === 'Double Major')
      .map((c) => c.id)
    const majorCourses = courses.filter((c) => majorCategoryIds.includes(c.categoryId))
    return calcGPA(majorCourses, gradeSystem)
  }, [categories, courses, gradeSystem])

  const radarData = useMemo(() => {
    return types.map((type) => {
      const catsForType = categories.filter((cat) => cat.typeId === type.id)
      if (catsForType.length === 0) return null

      const totalRequired = catsForType.reduce((sum, cat) => sum + (cat.requiredCredits || 0), 0)
      if (totalRequired === 0) return null

      const totalEarned = catsForType.reduce((sum, cat) => sum + (earnedByCategory[cat.id] || 0), 0)
      const progress = Math.min(100, (totalEarned / totalRequired) * 100)
      return { subject: type.name, progress, fullMark: 100 }
    }).filter(Boolean)
  }, [types, categories, earnedByCategory])

  // ---------------------------- 액션들 ----------------------------
  const upsertCourse = (course) => {
    setCourses((prev) => {
      const idx = prev.findIndex((c) => c.id === course.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = course; return next }
      return [...prev, course]
    })
  }
  const removeCourse = (id) => setCourses((prev) => prev.filter((c) => c.id !== id))

  const upsertCategory = (cat) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === cat.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = cat; return next }
      return [...prev, cat]
    })
  }
  const removeCategory = (id) => {
    if (!confirm(t.confirmDeleteCategory)) return
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setCourses((prev) => prev.filter((c) => c.categoryId !== id))
  }

  const upsertType = (typeObj) => {
    setTypes((prev) => {
      const idx = prev.findIndex((x) => x.id === typeObj.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = typeObj; return next }
      return [...prev, typeObj]
    })
  }
  const removeType = (id) => {
    setTypes((prev) => prev.filter((t) => t.id !== id))
    setCategories((prev) => prev.map((c) => (c.typeId === id ? { ...c, typeId: null } : c)))
  }

  const addSemester = (sem) => setSemesters((prev) => [...prev, { ...sem, id: uid() }])
  const removeSemester = (id) => {
    if (!confirm(t.confirmDeleteSemester)) return
    setSemesters((prev) => prev.filter((s) => s.id !== id))
    setCourses((prev) => prev.filter((c) => c.semesterId !== id))
  }

  const resetAll = () => {
    const defaultTypes = getDefaultTypes(lang)
    const defaultSemesters = getDefaultSemesters(lang)
    const defaultCategories = getDefaultCategories(defaultTypes, lang)
    setGradeSystem('plus-zero')
    setTotalCreditsGoal(130)
    setTypes(defaultTypes)
    setSemesters(defaultSemesters)
    setCategories(defaultCategories)
    setCourses([])
    setShowResetConfirm(false)
  }

  const exportData = () => {
    const data = { gradeSystem, totalCreditsGoal, types, semesters, categories, courses }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = t.exportFileName()
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const d = JSON.parse(e.target.result)
        if (d.gradeSystem) setGradeSystem(d.gradeSystem)
        if (d.totalCreditsGoal) setTotalCreditsGoal(d.totalCreditsGoal)
        if (d.types) setTypes(d.types)
        if (d.semesters) setSemesters(d.semesters)
        if (d.categories) setCategories(d.categories)
        if (d.courses) setCourses(d.courses)
      } catch {
        alert(t.alertImportFail)
      }
    }
    reader.readAsText(file)
  }

  const openAddTypeFromCategory = (currentCategoryState) => {
    setPendingCategoryReturn(currentCategoryState)
    setEditingCategory(null)
    const usedColors = new Set(types.map((t) => t.color))
    const nextColor = TYPE_COLOR_PALETTE.find((c) => !usedColors.has(c)) || TYPE_COLOR_PALETTE[0]
    setEditingType({ id: uid(), name: '', color: nextColor, _isNew: true })
  }

  const handleTypeSave = (tObj) => {
    upsertType(tObj)
    setEditingType(null)
    if (pendingCategoryReturn) {
      setEditingCategory({ ...pendingCategoryReturn, typeId: tObj.id })
      setPendingCategoryReturn(null)
    }
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div style={{ color: 'var(--ink-soft)' }}>{t.loading}</div>
      </div>
    )
  }

  return (
    <LangContext.Provider value={{ lang, t, setLang: handleLanguageChange }}>
      <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
        <Header
          totalEarnedCredits={totalEarnedCredits}
          totalCreditsGoal={totalCreditsGoal}
          overallGPA={overallGPA}
          gradeSystem={gradeSystem}
          onOpenSettings={() => setShowSettings(true)}
        />

        <Grid
          sortedSemesters={sortedSemesters}
          categories={categories}
          coursesBySemester={coursesBySemester}
          earnedByCategory={earnedByCategory}
          semesterStats={semesterStats}
          onAddSemester={() => setAddingSemester(true)}
          onRemoveSemester={removeSemester}
          onAddCategory={() =>
            setEditingCategory({ id: uid(), name: '', requiredCredits: 0, tag: null, typeId: null, _isNew: true })
          }
          onEditCategory={(cat) => setEditingCategory(cat)}
          onRemoveCategory={removeCategory}
          onAddCourse={(categoryId, semesterId) =>
            setEditingCourse({ id: uid(), categoryId, semesterId, name: '', credits: 3, grade: null, _isNew: true })
          }
          onEditCourse={(c) => setEditingCourse(c)}
        />

        {/* 하단 대시보드 구조 레이아웃 */}
        <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-4 sm:p-6 rounded-lg" style={{ background: 'var(--cream-deep)' }}>
            <Chart chartData={chartData} types={types} gradeSystem={gradeSystem} />
          </div>
          <StatsDashboard
            totalEarnedCredits={totalEarnedCredits}
            totalCreditsGoal={totalCreditsGoal}
            overallGPA={overallGPA}
            majorGPA={majorGPA}
            radarData={radarData}
          />
        </div>

        {/* 각종 기능 모달창 모음 */}
        {editingCourse && (
          <CourseModal
            course={editingCourse}
            categories={categories}
            semesters={sortedSemesters}
            gradeSystem={gradeSystem}
            onSave={(c) => { upsertCourse(c); setEditingCourse(null) }}
            onDelete={() => { removeCourse(editingCourse.id); setEditingCourse(null) }}
            onClose={() => setEditingCourse(null)}
          />
        )}

        {editingCategory && (
          <CategoryModal
            category={editingCategory}
            types={types}
            onSave={(c) => { upsertCategory(c); setEditingCategory(null) }}
            onAddType={() => openAddTypeFromCategory(editingCategory)}
            onClose={() => setEditingCategory(null)}
          />
        )}

        {editingType && (
          <TypeModal
            type={editingType}
            onSave={handleTypeSave}
            onDelete={() => { if (!editingType?._isNew) { if (confirm(t.confirmDeleteType)) removeType(editingType.id) }; setEditingType(null) }}
            onClose={() => { setEditingType(null); if (pendingCategoryReturn) { setEditingCategory(pendingCategoryReturn); setPendingCategoryReturn(null) } }}
            deletable={types.length > 1}
          />
        )}

        {addingSemester && (
          <SemesterModal
            existing={semesters}
            onAdd={(s) => { addSemester(s); setAddingSemester(false) }}
            onClose={() => setAddingSemester(false)}
          />
        )}

        {showSettings && (
          <SettingsModal
            gradeSystem={gradeSystem}
            setGradeSystem={setGradeSystem}
            totalCreditsGoal={totalCreditsGoal}
            setTotalCreditsGoal={setTotalCreditsGoal}
            types={types}
            onAddType={() => {
              const usedColors = new Set(types.map((t) => t.color))
              const nextColor = TYPE_COLOR_PALETTE.find((c) => !usedColors.has(c)) || TYPE_COLOR_PALETTE[0]
              setEditingType({ id: uid(), name: '', color: nextColor, _isNew: true })
            }}
            onEditType={(tObj) => setEditingType(tObj)}
            onExport={exportData}
            onImport={importData}
            onReset={() => setShowResetConfirm(true)}
            onClose={() => setShowSettings(false)}
          />
        )}

        {showResetConfirm && (
          <ConfirmModal
            message={t.confirmResetAll}
            onConfirm={resetAll}
            onCancel={() => setShowResetConfirm(false)}
          />
        )}
      </div>
    </LangContext.Provider>
  )
}