export const GRADE_SYSTEMS = {
  'plus-zero': {
    label: '4.5 만점 · A+ / A0 / B+ / B0',
    shortLabel: '4.5 만점',
    maxGPA: 4.5,
    grades: {
      'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0': 3.0,
      'C+': 2.5, 'C0': 2.0, 'D+': 1.5, 'D0': 1.0, 'F': 0.0,
    },
    gradeRows: [
      ['A+', 'A0'], ['B+', 'B0'], ['C+', 'C0'], ['D+', 'D0'], ['F', 'P', 'NP'],
    ],
  },
  'plus-zero-minus': {
    label: '4.3 만점 · A+ / A0 / A- / B+ / B0 / B-',
    shortLabel: '4.3 만점',
    maxGPA: 4.3,
    grades: {
      'A+': 4.3, 'A0': 4.0, 'A-': 3.7, 'B+': 3.3, 'B0': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C0': 2.0, 'C-': 1.7, 'D+': 1.3, 'D0': 1.0, 'D-': 0.7, 'F': 0.0,
    },
    gradeRows: [
      ['A+', 'A0', 'A-'], ['B+', 'B0', 'B-'], ['C+', 'C0', 'C-'], ['D+', 'D0', 'D-'], ['F', 'P', 'NP'],
    ],
  },
}

export const GRADE_COLORS = {
  'A+': '#1E40AF', 'A0': '#2563EB', 'A-': '#3B82F6',
  'B+': '#15803D', 'B0': '#16A34A', 'B-': '#22C55E',
  'C+': '#B45309', 'C0': '#D97706', 'C-': '#F59E0B',
  'D+': '#B91C1C', 'D0': '#DC2626', 'D-': '#EF4444',
  'F': '#7F1D1D', 'P': '#1E3A8A', 'NP': '#6B7280',
}

export const TAG_COLORS = {
  '본전공': { bg: '#8B2A2A', text: '#FFF8E7' },
  '제2전공': { bg: '#8B2A2A', text: '#FFF8E7' },
  '부전공': { bg: '#6B4423', text: '#FFF8E7' },
  '연계전공': { bg: '#5B6B23', text: '#FFF8E7' },
}

export const TYPE_COLOR_PALETTE = [
  '#8B2A2A', '#8B6F3F', '#1E40AF', '#5B6B23', '#0F766E', '#6D28D9',
  '#BE185D', '#C2410C', '#B45309', '#0369A1', '#15803D', '#374151',
]

export const uid = () => Math.random().toString(36).slice(2, 10)

export function getDefaultTypes() {
  return [
    { id: uid(), name: '학문의 기초', color: '#8B6F3F' },
    { id: uid(), name: '전공', color: '#1E40AF' },
    { id: uid(), name: '교양', color: '#5B6B23' },
  ]
}

export function getDefaultSemesters() {
  return [
    { id: uid(), label: '1학년 1학기', year: 1, term: 1, type: 'regular' },
    { id: uid(), label: '1학년 2학기', year: 1, term: 2, type: 'regular' },
    { id: uid(), label: '2학년 1학기', year: 2, term: 1, type: 'regular' },
    { id: uid(), label: '2학년 2학기', year: 2, term: 2, type: 'regular' },
    { id: uid(), label: '3학년 1학기', year: 3, term: 1, type: 'regular' },
    { id: uid(), label: '3학년 2학기', year: 3, term: 2, type: 'regular' },
    { id: uid(), label: '4학년 1학기', year: 4, term: 1, type: 'regular' },
    { id: uid(), label: '4학년 2학기', year: 4, term: 2, type: 'regular' },
  ]
}

export function getDefaultCategories(types) {
  const find = (n) => types.find((t) => t.name === n)?.id || null
  return [
    { id: uid(), name: '학문의 기초', requiredCredits: 9, tag: null, typeId: find('학문의 기초') },
    { id: uid(), name: '전공', requiredCredits: 36, tag: '본전공', typeId: find('전공') },
    { id: uid(), name: '일반 교양', requiredCredits: 33, tag: null, typeId: find('교양') },
    { id: uid(), name: '교양 선택', requiredCredits: 10, tag: null, typeId: find('교양') },
  ]
}

export const TAG_PRESETS = ['', '본전공', '제2전공', '부전공', '연계전공']