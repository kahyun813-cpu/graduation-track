import { createContext, useContext } from 'react'

export const translations = {
  ko: {
    appTitle: '졸업하게해주세요',
    appSubtitle: '학기별 과목 · 학점 · 평점 한눈에',
    loading: '불러오는 중…',
    totalCredits: '총 학점',
    overallGPA: '전체 평점',
    settings: '설정',
    langToggle: 'EN',

    // 사용법
    helpIconTitle: '사용법 안내',
    helpTitle: '사용법 안내',
    helpSteps: [
      {
        title: '1. 카테고리 설정하기',
        content: '좌측의 카테고리(예: 전공필수, 교양)를 수정하거나 추가하여 자신만의 졸업요건을 만드세요. "필요 학점"을 입력하면 진행률이 표시됩니다.'
      },
      {
        title: '2. 과목 추가하기',
        content: '각 학기/카테고리에 맞는 칸의 [+] 버튼을 눌러 이수한 (또는 이수할) 과목을 추가하세요. 과목명, 학점, 성적을 입력할 수 있습니다.'
      },
      {
        title: '3. 데이터 분석하기',
        content: '과목을 추가하면 하단의 대시보드와 그래프가 자동으로 업데이트됩니다. 전체 평점, 전공 평점, 분야별 이수 현황을 한눈에 파악하세요.'
      },
      {
        title: '4. 데이터 저장 및 내보내기',
        content: '모든 데이터는 브라우저에 자동으로 저장됩니다. 다른 기기에서 사용하려면 우측 상단 [설정] 메뉴에서 데이터를 내보내고 불러올 수 있습니다.'
      }
    ],

    // 대시보드
    dashboardTitle: '졸업요건 취득현황',
    majorGPALabel: '전공 평점',
    radarChartTitle: '분야별 이수 현황',
    creditsUnit: '학점',

    addSemesterTitle: '학기 추가',
    deleteSemesterTitle: '학기 삭제',
    addCategoryTitle: '카테고리 추가',
    editCategoryTitle: '카테고리 수정',
    addCourseTitle: '과목 추가',
    editCourseTitle: '과목 수정',
    addTypeTitle: '유형 추가',
    editTypeTitle: '유형 수정',

    chartTitle: '평점 추이',
    chartSubtitle: '누적 평점 (학기마다 그때까지의 평균)',
    overallKey: '전체',
    chartHint: '범례를 클릭하면 라인을 숨길 수 있어요.',

    settingsTitle: '설정',
    gradeSystemLabel: '성적 체계',
    graduationCreditsLabel: '졸업 총 학점',
    typeManagement: '유형 관리',
    editLabel: '수정',
    addTypeBtn: '유형 추가',
    dataLabel: '데이터',
    exportBtn: '내보내기',
    importBtn: '불러오기',
    resetAllBtn: '모두 초기화',
    languageLabel: '언어',
    colorThemeLabel: '컬러 테마',

    courseNameLabel: '과목명',
    courseNamePlaceholder: '예: 통계수학',
    creditsLabel: '학점',
    categoryLabel: '카테고리',
    semesterLabel_: '학기',
    gradeLabel: '성적 (선택)',
    noGradeBtn: '성적 없음 (이수 예정)',

    nameLabel: '이름',
    categoryNamePlaceholder: '예: 통계 전공',
    requiredCreditsLabel: '필요 학점',
    typeForGraphLabel: '유형 (평점 추이 그래프 분류용)',
    noTypeBtn: '없음',
    newTypeBtn: '새 유형',
    tagLabel: '태그 (선택)',
    tagPresets: ['', '본전공', '제2전공', '부전공', '연계전공'],
    tagDisplayNames: {
      '': '없음', '본전공': '본전공', '제2전공': '제2전공', '부전공': '부전공', '연계전공': '연계전공',
      'Major': 'Major', 'Double Major': 'Double Major', 'Minor': 'Minor', 'Interdisciplinary': 'Interdisciplinary',
    },

    yearLabel: '학년',
    termTypeLabel: '유형',
    regularLabel: '정규학기',
    summerLabel: '여름 계절',
    winterLabel: '겨울 계절',
    termLabel: '학기',
    previewLabel: '미리보기',
    addBtn: '추가',

    typeNameLabel: '이름',
    typeNamePlaceholder: '예: 전공, 교양…',
    colorLabel: '색상',
    customColorLabel: '직접 입력',

    saveBtn: '저장',
    cancelBtn: '취소',
    deleteBtn: '삭제',
    confirmBtn: '확인',
    confirmTitle: '확인',

    alertCourseName: '과목명을 입력해주세요.',
    alertCategoryName: '카테고리 이름을 입력해주세요.',
    alertTypeName: '유형 이름을 입력해주세요.',
    alertDuplicateSemester: '이미 같은 학기가 있습니다.',
    alertImportFail: '파일을 불러올 수 없습니다.',
    confirmDeleteCategory: '이 카테고리와 안에 있는 모든 과목이 삭제됩니다. 계속하시겠습니까?',
    confirmDeleteSemester: '이 학기와 안의 모든 과목이 삭제됩니다. 계속하시겠습니까?',
    confirmDeleteType: '이 유형을 사용하던 카테고리들은 "없음"으로 바뀝니다. 삭제하시겠습니까?',
    confirmResetAll: '모든 데이터를 초기화하시겠습니까? 되돌릴 수 없습니다.',

    exportFileName: () => `졸업요건_${new Date().toISOString().slice(0, 10)}.json`,
    creditsShort: (e, r) => `${e}/${r} 학점`,
    semLabel: (year, type, term) => {
      if (type === 'regular') return `${year}학년 ${term}학기`
      if (type === 'summer') return `${year}학년 여름계절`
      if (type === 'winter') return `${year}학년 겨울계절`
      return `${year}학년`
    },
    semChartLabel: (s) => {
      if (s.type === 'regular') return `${s.year}-${s.term}`
      if (s.type === 'summer') return `${s.year}-여`
      if (s.type === 'winter') return `${s.year}-겨`
      return `${s.year}`
    },
    gradeSystems: {
      'plus-zero': { short: '4.5 만점', full: '4.5 만점 · A+ / A0 / B+ / B0' },
      'plus-zero-minus': { short: '4.3 만점', full: '4.3 만점 · A+ / A0 / A- / B+ / B0 / B-' },
    },

    defaultTypes: [
      { name: '전공', color: '#1E40AF' },
      { name: '교양', color: '#5B6B23' },
    ],
    defaultCategories: [
      { name: '전공필수', requiredCredits: 21, tag: '본전공', typeName: '전공' },
      { name: '전공선택', requiredCredits: 15, tag: '본전공', typeName: '전공' },
      { name: '교양', requiredCredits: 30, tag: null, typeName: '교양' },
    ],
  },

  en: {
    appTitle: 'Graduation Tracker',
    appSubtitle: 'Track courses · credits · GPA by semester',
    loading: 'Loading…',
    totalCredits: 'Total Credits',
    overallGPA: 'Overall GPA',
    settings: 'Settings',
    langToggle: '한',

    // User Guide
    helpIconTitle: 'User Guide',
    helpTitle: 'User Guide',
    helpSteps: [
      {
        title: '1. Set Up Categories',
        content: 'Edit or add categories on the left (e.g., Major Required, Electives) to create your own graduation plan. Enter "Required Credits" to track your progress.'
      },
      {
        title: '2. Add Courses',
        content: 'Click the [+] button in the corresponding semester/category cell to add courses you have taken (or plan to take). You can enter the course name, credits, and grade.'
      },
      {
        title: '3. Analyze Your Data',
        content: 'As you add courses, the dashboard and charts at the bottom will update automatically. Get a clear view of your overall GPA, major GPA, and completion status by area.'
      },
      {
        title: '4. Save & Export Data',
        content: 'All data is automatically saved in your browser. To use it on another device, you can export and import your data from the [Settings] menu in the top right.'
      }
    ],

    // Dashboard
    dashboardTitle: 'Graduation Status',
    majorGPALabel: 'Major GPA',
    radarChartTitle: 'Progress by Category',
    creditsUnit: 'cr',

    addSemesterTitle: 'Add Semester',
    deleteSemesterTitle: 'Remove Semester',
    addCategoryTitle: 'Add Category',
    editCategoryTitle: 'Edit Category',
    addCourseTitle: 'Add Course',
    editCourseTitle: 'Edit Course',
    addTypeTitle: 'Add Type',
    editTypeTitle: 'Edit Type',

    chartTitle: 'GPA Trend',
    chartSubtitle: 'Cumulative GPA (average up to each semester)',
    overallKey: 'Overall',
    chartHint: 'Click a legend item to show/hide that line.',

    settingsTitle: 'Settings',
    gradeSystemLabel: 'Grade System',
    graduationCreditsLabel: 'Credits to Graduate',
    typeManagement: 'Category Types',
    editLabel: 'Edit',
    addTypeBtn: 'Add Type',
    dataLabel: 'Data',
    exportBtn: 'Export',
    importBtn: 'Import',
    resetAllBtn: 'Reset All',
    languageLabel: 'Language',
    colorThemeLabel: 'Color Theme',

    courseNameLabel: 'Course Name',
    courseNamePlaceholder: 'e.g. Linear Algebra',
    creditsLabel: 'Credits',
    categoryLabel: 'Category',
    semesterLabel_: 'Semester',
    gradeLabel: 'Grade (optional)',
    noGradeBtn: 'No grade yet (planned)',

    nameLabel: 'Name',
    categoryNamePlaceholder: 'e.g. Statistics Major',
    requiredCreditsLabel: 'Required Credits',
    typeForGraphLabel: 'Type (for GPA trend chart)',
    noTypeBtn: 'None',
    newTypeBtn: 'New Type',
    tagLabel: 'Tag (optional)',
    tagPresets: ['', 'Major', 'Double Major', 'Minor', 'Interdisciplinary'],
    tagDisplayNames: {
      '': 'None', 'Major': 'Major', 'Double Major': 'Double Major', 'Minor': 'Minor', 'Interdisciplinary': 'Interdisciplinary',
      '본전공': 'Major', '제2전공': 'Double Major', '부전공': 'Minor', '연계전공': 'Interdisciplinary',
    },

    yearLabel: 'Year',
    termTypeLabel: 'Type',
    regularLabel: 'Regular',
    summerLabel: 'Summer',
    winterLabel: 'Winter',
    termLabel: 'Term',
    previewLabel: 'Preview',
    addBtn: 'Add',

    typeNameLabel: 'Name',
    typeNamePlaceholder: 'e.g. Major, Elective…',
    colorLabel: 'Color',
    customColorLabel: 'Custom',

    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    deleteBtn: 'Delete',
    confirmBtn: 'OK',
    confirmTitle: 'Confirm',

    alertCourseName: 'Please enter a course name.',
    alertCategoryName: 'Please enter a category name.',
    alertTypeName: 'Please enter a type name.',
    alertDuplicateSemester: 'This semester already exists.',
    alertImportFail: 'Failed to load the file.',
    confirmDeleteCategory: 'This will delete the category and all its courses. Continue?',
    confirmDeleteSemester: 'This will delete the semester and all its courses. Continue?',
    confirmDeleteType: 'Categories using this type will be set to "None". Delete?',
    confirmResetAll: 'Reset all data? This cannot be undone.',

    exportFileName: () => `graduation_tracker_${new Date().toISOString().slice(0, 10)}.json`,
    creditsShort: (e, r) => `${e}/${r} cr`,
    semLabel: (year, type, term) => {
      if (type === 'regular') return `Year ${year}, Sem ${term}`
      if (type === 'summer') return `Year ${year} Summer`
      if (type === 'winter') return `Year ${year} Winter`
      return `Year ${year}`
    },
    semChartLabel: (s) => {
      if (s.type === 'regular') return `${s.year}-${s.term}`
      if (s.type === 'summer') return `${s.year}-Su`
      if (s.type === 'winter') return `${s.year}-Wi`
      return `${s.year}`
    },
    gradeSystems: {
      'plus-zero': { short: '4.5 scale', full: '4.5 scale · A+ / A0 / B+ / B0' },
      'plus-zero-minus': { short: '4.3 scale', full: '4.3 scale · A+ / A0 / A- / B+ / B0 / B-' },
    },

    defaultTypes: [
      { name: 'Major', color: '#1E40AF' },
      { name: 'Electives', color: '#5B6B23' },
    ],
    defaultCategories: [
      { name: 'Major Required', requiredCredits: 21, tag: 'Major', typeName: 'Major' },
      { name: 'Major Elective', requiredCredits: 15, tag: 'Major', typeName: 'Major' },
      { name: 'Electives', requiredCredits: 30, tag: null, typeName: 'Electives' },
    ],
  },
}

export const LangContext = createContext({ lang: 'ko', t: translations.ko, setLang: () => {} })

export function useLang() {
  return useContext(LangContext)
}
