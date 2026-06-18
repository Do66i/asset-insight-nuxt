# 📈 Asset Insight Nuxt

> Nuxt 3 + Nest.js 기반의 나만의 주식 & 자산 포트폴리오 인사이트 대시보드

Nuxt 3의 **SSR(서버 사이드 렌더링)**과 **동적 라우팅**을 극대화하여 검색엔진 최적화(SEO)와 빠른 초기 로딩 속도를 보장하는 자산 관리 대시보드 애플리케이션입니다. 추후 Nest.js 백엔드 API와의 결합을 염두에 두고 구조화되었습니다.

---

## 🗺 1. 와이어프레임 & 주요 기능 (Wireframe & Features)

애플리케이션은 크게 3개의 핵심 화면으로 구성됩니다.

### ① 대시보드 메인 (`/`)
* **나의 총 자산 요약**: ISA 계좌, 미국 주식 등 자산별 비중을 시각적으로 표현 (차트 컴포넌트 활용).
* **관심 종목 위젯**: 실시간(또는 데모) 주가 흐름 요약.

### ② 자산 포트폴리오 관리 (`/portfolio`)
* **자산 추가/수정/삭제**: 보유 중인 주식 종목, 수량, 평균 단가 입력 폼.
* **수익률 계산기**: 현재가 기준 실시간 평가 손익 및 수익률 추적.

### ③ 주식 인사이트 게시판 (`/board` 및 `/board/:id`)
* **인사이트 공유**: 미국 주식 및 ISA 활용 팁을 공유하는 게시판.
* **SSR 상세 페이지**: 게시글 상세 페이지(`/board/1`)는 검색엔진(SEO)에 노출되도록 완전한 서버 사이드 렌더링으로 처리.

---

## 📂 2. 폴더 구조 (Folder Structure)

Nuxt 3의 표준 규칙 및 내부 레이어 구분을 위한 구조입니다. Scripts 내부는 기능별 주석 섹션으로 구분하여 관리합니다.

```text
asset-insight-nuxt/
├── .nuxt/                  # Nuxt 자동 생성 빌드 파일 (Git 제외)
├── .output/                # 프로덕션 배포용 빌드 결과물 (Git 제외)
├── assets/                 # SCSS, 이미지, 폰트 등 컴파일이 필요한 자원
│   └── scss/               # 공통 스타일 및 변수 관리
├── components/             # 재사용 가능한 UI 컴포넌트 (자동 임포트)
│   ├── common/             # Button, Input 등 공통 컴포넌트
│   └── dashboard/          # 대시보드 전용 컴포넌트
├── layouts/                # 페이지 틀을 결정하는 레이아웃 (Default, Blank 등)
├── node_modules/           # 의존성 라이브러리 (Git 제외)
├── pages/                  # 파일 기반 라우팅 규칙 적용 폴더
│   ├── board/
│   │   ├── [id].vue        # 게시글 상세 페이지 (동적 라우팅: /board/:id)
│   │   └── index.vue       # 게시판 메인 페이지 (/board)
│   ├── index.vue           # 메인 대시보드 페이지 (/)
│   └── portfolio.vue       # 자산 관리 페이지 (/portfolio)
├── plugins/                # 외부 라이브러리 및 플러그인 설정
├── stores/                 # Pinia 전역 상태 관리 폴더
├── app.vue                 # 애플리케이션 최상위 컴포넌트
├── nuxt.config.ts          # Nuxt 프로젝트 전역 설정 파일
├── package.json            # 프로젝트 의존성 및 스크립트 정의
└── README.md               # 프로젝트 가이드 문서
```

## 🌿 3. Git 브랜치 및 커밋 규칙 (Git Branch & Commit Strategy)

### 🔄 브랜치 워크플로우

아래와 같은 단계별 배포 흐름을 준수합니다.

```text
[feature/기능이름] ──> [dev] ──> [staging] ──> [main] (라이브 배포)
```

### 브랜치 역할

#### `main`

* 상용 운영 환경에 배포되는 최상위 브랜치입니다.
* 검증이 완료된 코드만 병합합니다.

#### `staging`

* 운영 배포 전 최종 검증을 진행하는 브랜치입니다.
* QA 및 통합 테스트를 수행합니다.

#### `dev`

* 개발 중심 브랜치입니다.
* 모든 기능 개발의 베이스라인 역할을 합니다.

#### `feature/기능이름`

* 개별 기능 개발을 위한 브랜치입니다.
* 기능 개발 완료 후 `dev` 브랜치로 Pull Request를 생성합니다.

### 브랜치 네이밍 예시

```text
feature/login
feature/user-profile
feature/payment
feature/admin-dashboard
```

---

## 💬 커밋 메시지 규칙 (Commit Convention)

커밋 메시지는 아래 Prefix 규칙을 따릅니다.

| 타입         | 설명                                           |
| ---------- | -------------------------------------------- |
| `feat`     | 새로운 기능 추가                                    |
| `fix`      | 버그 수정                                        |
| `docs`     | 문서 수정 (README 등)                             |
| `style`    | 코드 의미에 영향을 주지 않는 변경 사항 (CSS, 포맷팅, 세미콜론 추가 등) |
| `refactor` | 코드 리팩토링                                      |
| `chore`    | 빌드 설정, 패키지 매니저 설정, 환경 구성 등                   |

### 커밋 예시

```bash
feat: 로그인 기능 추가
fix: 사용자 정보 조회 오류 수정
docs: README 설치 가이드 업데이트
style: 코드 포맷팅 정리
refactor: 회원가입 로직 구조 개선
chore: eslint 설정 추가
```

---

# 🛠 4. 코드 작성 규칙 (Code Conventions)

## Vue 3 Composition API 사용

모든 Vue 컴포넌트는 `<script setup>` 구조를 사용합니다.

```vue
<script setup>
// code
</script>
```

---

## 세미콜론(;) 필수

모든 JavaScript / TypeScript 문장의 끝에는 세미콜론(`;`)을 작성합니다.

### ✅ Good

```vue
const name = 'John';

console.log(name);
```

### ❌ Bad

```vue
const name = 'John'

console.log(name)
```

---

## 명시적 Import 사용

Import 문 작성 시 확장자명을 반드시 명시합니다.

### ✅ Good

```vue
import Navigation from '~/components/common/Navigation.vue';
import useAuth from '~/composables/useAuth.ts';
```

### ❌ Bad

```vue
import Navigation from '~/components/common/Navigation';
import useAuth from '~/composables/useAuth';
```

---

## Script Setup 구조화

`<script setup>` 내부 코드는 아래 순서를 준수합니다.

```vue
<script setup>
// ----- Props / Emits -----

// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
```

### 예시

```vue
<script setup>
// ----- Props / Emits -----
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

// ----- Composables -----
// 필요한 경우 커스텀 컴포저블을 호출하는 섹션

// ----- State -----
const count = ref(0);

// ----- Computed -----
const doubledCount = computed(() => {
  return count.value * 2;
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----
onMounted(() => {
  console.log('mounted');
});

// ----- Methods -----
const increase = () => {
  count.value++;
};
</script>
```
