import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Grid from './components/Grid'
import Chart from './components/Chart'
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

export default function App() {
  const [gradeSystem, setGradeSystem] = useState('plus-zero')
  const [totalCreditsGoal, setTotalCreditsGoal] = useState(130)
  const [types, setTypes] = useState([])
  const [semesters, setSemesters] = useState([])
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [editingCourse, setEditingCourse] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingType, setEditingType] = useState(null)
  const [addingSemester, setAddingSemester] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [pendingCategoryReturn, setPendingCategoryReturn] = useState(null)

  useEffect(() => {
    const saved = loadState()
    if (saved) {
      if (saved.gradeSystem) setGradeSystem(saved.gradeSystem)
      if (saved.totalCreditsGoal) setTotalCreditsGoal(saved.totalCreditsGoal)
      if (saved.types) setTypes(saved.types)
      if (saved.semesters) setSemesters(saved.semesters)
      if (saved.categories) setCategories(saved.categories)
      if (saved.courses) setCourses(saved.courses)
    } else {
      const defaultTypes = getDefaultTypes()
      const defaultSemesters = getDefaultSemesters()
      const defaultCategories = getDefaultCategories(defaultTypes)
      setTypes(defaultTypes)
      setSemesters(defaultSemesters)
      setCategories(defaultCategories)
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    saveState({ gradeSystem, totalCreditsGoal, types, semesters, categories, courses })
  }, [gradeSystem, totalCreditsGoal, types, semesters, categories, courses, loaded])

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
      const point = { name: s.label.replace('학년 ', '-').replace('학기', '') }
      point['전체'] = calcGPA(acc['전체'], gradeSystem)
      for (const t of types) {
        point[t.name] = calcGPA(acc[t.name], gradeSystem)
      }
      data.push(point)
    }
    return data
  }, [sortedSemesters, courses, categories, types, gradeSystem])

  const totalEarnedCredits = useMemo(() => calcEarnedCredits(courses), [courses])
  const overallGPA = useMemo(() => calcGPA(courses, gradeSystem), [courses, gradeSystem])

  const upsertCourse = (course) => {
    setCourses((prev) => {
      const idx = prev.findIndex((c) => c.id === course.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = course
        return next
      }
      return [...prev, course]
    })
  }
  const removeCourse = (id) => setCourses((prev) => prev.filter((c) => c.id !== id))

  const upsertCategory = (cat) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === cat.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = cat
        return next
      }
      return [...prev, cat]
    })
  }
  const removeCategory = (id) => {
    if (!confirm('이 카테고리와 안에 있는 모든 과목이 삭제됩니다. 계속하시겠습니까?')) return
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setCourses((prev) => prev.filter((c) => c.categoryId !== id))
  }

  const upsertType = (t) => {
    setTypes((prev) => {
      const idx = prev.findIndex((x) => x.id === t.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = t
        return next
      }
      return [...prev, t]
    })
  }
  const removeType = (id) => {
    setTypes((prev) => prev.filter((t) => t.id !== id))
    setCategories((prev) => prev.map((c) => (c.typeId === id ? { ...c, typeId: null } : c)))
  }

  const addSemester = (sem) => setSemesters((prev) => [...prev, { ...sem, id: uid() }])
  const removeSemester = (id) => {
    if (!confirm('이 학기와 안의 모든 과목이 삭제됩니다. 계속하시겠습니까?')) return
    setSemesters((prev) => prev.filter((s) => s.id !== id))
    setCourses((prev) => prev.filter((c) => c.semesterId !== id))
  }

  const resetAll = () => {
    const defaultTypes = getDefaultTypes()
    const defaultSemesters = getDefaultSemesters()
    const defaultCategories = getDefaultCategories(defaultTypes)
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
    a.download = `졸업요건_${new Date().toISOString().slice(0, 10)}.json`
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
        alert('파일을 불러올 수 없습니다.')
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

  const handleTypeSave = (t) => {
    upsertType(t)
    setEditingType(null)
    if (pendingCategoryReturn) {
      setEditingCategory({ ...pendingCategoryReturn, typeId: t.id })
      setPendingCategoryReturn(null)
    }
  }
  const handleTypeClose = () => {
    setEditingType(null)
    if (pendingCategoryReturn) {
      setEditingCategory(pendingCategoryReturn)
      setPendingCategoryReturn(null)
    }
  }
  const handleTypeDelete = () => {
    if (!editingType?._isNew) {
      if (!confirm('이 유형을 사용하던 카테고리들은 "없음"으로 바뀝니다. 삭제하시겠습니까?')) return
      removeType(editingType.id)
    }
    setEditingType(null)
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div style={{ color: 'var(--ink-soft)' }}>불러오는 중…</div>
      </div>
    )
  }

  return (
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

      <Chart chartData={chartData} types={types} gradeSystem={gradeSystem} />

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
          onDelete={handleTypeDelete}
          onClose={handleTypeClose}
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
          onEditType={(t) => setEditingType(t)}
          onExport={exportData}
          onImport={importData}
          onReset={() => setShowResetConfirm(true)}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showResetConfirm && (
        <ConfirmModal
          message="모든 데이터를 초기화하시겠습니까? 되돌릴 수 없습니다."
          onConfirm={resetAll}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  )
}