import { translations } from './i18n'

// -----------------------------------------------------------------------------
// 성적 체계 (App에서 현재 언어 설정을 읽어와 동적으로 라벨을 띄울 수 있도록 유지합니다)
// -----------------------------------------------------------------------------
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

// 태그 디자인 색상
export const TAG_COLORS = {
  '본전공': { bg: '#212121', text: '#ffffff' },
  'Major': { bg: '#212121', text: '#ffffff' },
  '제2전공': { bg: '#212121', text: '#ffffff' },
  'Double Major': { bg: '#212121', text: '#ffffff' },
  '부전공': { bg: '#616161', text: '#ffffff' },
  'Minor': { bg: '#616161', text: '#ffffff' },
  '연계전공': { bg: '#757575', text: '#ffffff' },
  'Interdisciplinary': { bg: '#757575', text: '#ffffff' },
}

export const TYPE_COLOR_PALETTE = [
  '#212121', '#424242', '#616161', '#757575', '#9e9e9e', '#0d47a1',
  '#1b5e20', '#e65100', '#b71c1c', '#4a148c', '#006064', '#374151',
]

export const uid = () => Math.random().toString(36).slice(2, 10)

// -----------------------------------------------------------------------------
// 🚨 언어(lang)를 주입받아 i18n에 선언된 기본 텍스트 세트로 생성하는 다국어 함수들
// -----------------------------------------------------------------------------
export function getDefaultTypes(lang = 'ko') {
  const t = translations[lang] || translations.ko
  return [
    { id: uid(), name: t.defaultTypes[0].name, color: t.defaultTypes[0].color },
    { id: uid(), name: t.defaultTypes[1].name, color: t.defaultTypes[1].color },
    { id: uid(), name: t.defaultTypes[2].name, color: t.defaultTypes[2].color },
  ]
}

export function getDefaultSemesters(lang = 'ko') {
  const t = translations[lang] || translations.ko
  return [
    { id: uid(), label: t.semLabel(1, 'regular', 1), year: 1, term: 1, type: 'regular' },
    { id: uid(), label: t.semLabel(1, 'regular', 2), year: 1, term: 2, type: 'regular' },
    { id: uid(), label: t.semLabel(2, 'regular', 1), year: 2, term: 1, type: 'regular' },
    { id: uid(), label: t.semLabel(2, 'regular', 2), year: 2, term: 2, type: 'regular' },
    { id: uid(), label: t.semLabel(3, 'regular', 1), year: 3, term: 1, type: 'regular' },
    { id: uid(), label: t.semLabel(3, 'regular', 2), year: 3, term: 2, type: 'regular' },
    { id: uid(), label: t.semLabel(4, 'regular', 1), year: 4, term: 1, type: 'regular' },
    { id: uid(), label: t.semLabel(4, 'regular', 2), year: 4, term: 2, type: 'regular' },
  ]
}

export function getDefaultCategories(types, lang = 'ko') {
  const t = translations[lang] || translations.ko
  const findId = (index) => types[index]?.id || null

  return [
    { id: uid(), name: t.defaultCategories[0].name, requiredCredits: 9, tag: null, typeId: findId(0) },
    { id: uid(), name: t.defaultCategories[1].name, requiredCredits: 36, tag: lang === 'ko' ? '본전공' : 'Major', typeId: findId(1) },
    { id: uid(), name: t.defaultCategories[2].name, requiredCredits: 33, tag: null, typeId: findId(2) },
    { id: uid(), name: t.defaultCategories[3].name, requiredCredits: 10, tag: null, typeId: findId(2) },
  ]
}

export const TAG_PRESETS = ['', '본전공', '제2전공', '부전공', '연계전공']