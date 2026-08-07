# 졸업하게해주세요 (Graduation Tracker)

학기별 과목, 학점, 평점을 한눈에 관리하여 졸업까지의 여정을 도와주는 웹 애플리케이션입니다.

A web application that helps you manage your courses, credits, and GPA by semester to track your journey to graduation.

**[라이브 데모 바로가기](https://graduation-track.vercel.app/)** 

---

## 주요 기능 (Key Features)

-   **시각적 그리드 UI**: 학기 및 이수 구분에 따라 과목을 한눈에 파악하고 관리할 수 있는 직관적인 표 UI를 제공합니다.
-   **실시간 학점/평점 계산**: 과목을 추가하거나 성적을 입력할 때마다 전체 평점, 전공 평점, 이수 학점이 자동으로 계산됩니다.
-   **분석 대시보드**:
    -   **평점 추이 그래프**: 학기별 누적 평점 변화를 시각적으로 추적합니다.
    -   **분야별 이수 현황**: 전공, 교양 등 분야별 학점 이수율을 레이더 차트로 보여주어 부족한 부분을 쉽게 파악할 수 있습니다.
-   **자유로운 커스터마이징**:
    -   사용자 학교의 졸업요건에 맞게 '전공필수', '교양' 등 카테고리를 자유롭게 추가/수정할 수 있습니다.
    -   성적 체계(4.5 또는 4.3 만점)를 선택할 수 있습니다.
-   **다국어 지원**: 한국어와 영어를 모두 지원하며, 언제든지 언어를 전환할 수 있습니다.
-   **데이터 관리**:
    -   모든 데이터는 브라우저에 자동 저장됩니다.
    -   데이터를 JSON 파일로 내보내거나(Export) 불러와서(Import) 안전하게 백업하고 다른 기기에서 사용할 수 있습니다.
-   **사용자 가이드**: 처음 사용하는 사람도 쉽게 적응할 수 있도록 친절한 사용 설명서를 제공합니다.

## 스크린샷 (Screenshots)

<img width="1279" height="619" alt="image" src="https://github.com/user-attachments/assets/d610dd68-1fd9-4d9d-b487-4efde69b067b" />


<img width="1278" height="673" alt="image" src="https://github.com/user-attachments/assets/e4bcf6ab-ccbe-488e-b0fe-da90af1cfe22" />





## 기술 스택 (Tech Stack)

-   **Frontend**: React
-   **Styling**: Tailwind CSS
-   **Charts**: Recharts

## 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1.  **저장소 복제 (Clone the repository):**
    ```bash
    git clone https://github.com/kahyun813-cpu/graduation-track.git
    cd graduation-track
    ```

2.  **의존성 설치 (Install dependencies):**
    ```bash
    npm install
    ```

3.  **개발 서버 실행 (Run the development server):**
    ```bash
    npm run dev
    ```

4.  브라우저에서 `http://localhost:5173` (또는 터미널에 표시된 주소)로 접속합니다.

## 프로젝트 구조 (Project Structure)

```
graduation-track/
├── public/
└── src/
    ├── components/      # UI를 구성하는 재사용 가능한 컴포넌트
    │   ├── modals/      # 각종 모달창 컴포넌트
    │   ├── Chart.jsx
    │   ├── Grid.jsx
    │   ├── Header.jsx
    │   └── StatsDashboard.jsx
    ├── lib/             # 핵심 로직, 상수, 유틸리티 함수
    │   ├── constants.js
    │   ├── i18n.js      # 다국어 텍스트 및 로직
    │   ├── storage.js   # LocalStorage 데이터 저장/로드
    │   └── utils.js
    ├── App.jsx          # 메인 애플리케이션 컴포넌트
    ├── index.css        # 전역 스타일 및 Tailwind CSS 설정
    └── main.jsx         # 애플리케이션 진입점
```
