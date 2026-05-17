import { GRADE_SYSTEMS } from './constants'

// -----------------------------------------------------------------------------
// 학기 정렬: 정규 1학기 → 여름 → 정규 2학기 → 겨울
// -----------------------------------------------------------------------------
export function semesterSortKey(s) {
  let pos = 0
  if (s.type === 'regular') pos = s.term === 1 ? 1 : 3
  else if (s.type === 'summer') pos = 2
  else if (s.type === 'winter') pos = 4
  return s.year * 10 + pos
}

// -----------------------------------------------------------------------------
// 평점 계산
// -----------------------------------------------------------------------------
export function calcGPA(courses, gradeSystem) {
  const sys = GRADE_SYSTEMS[gradeSystem]
  if (!sys) return null
  let totalPoints = 0
  let totalCredits = 0
  for (const c of courses) {
    if (!c.grade || c.grade === 'P' || c.grade === 'NP') continue
    const val = sys.grades[c.grade]
    if (val == null) continue
    totalPoints += val * (c.credits || 0)
    totalCredits += c.credits || 0
  }
  return totalCredits > 0 ? totalPoints / totalCredits : null
}

// -----------------------------------------------------------------------------
// 이수 학점 계산
// -----------------------------------------------------------------------------
export function calcEarnedCredits(courses) {
  let total = 0
  for (const c of courses) {
    if (c.grade === 'F' || c.grade === 'NP') continue
    total += c.credits || 0
  }
  return total
}

// -----------------------------------------------------------------------------
// 학기 라벨 자동 생성 (🚨 이 함수가 누락되었던 것입니다!)
// -----------------------------------------------------------------------------
export function makeSemesterLabel(year, type, term) {
  if (type === 'regular') return `${year}학년 ${term}학기`
  if (type === 'summer') return `${year}학년 여름계절`
  if (type === 'winter') return `${year}학년 겨울계절`
  return ''
}