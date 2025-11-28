# SK shieldus Installer Support Portal - 개발/배포 문서

## 📋 프로젝트 개요

### 목적
SK shieldus 홈보안 제품(도어가드) 설치 현장에서 기술자들이 빠르게 문제를 검색하고 해결할 수 있는 웹앱을 개발했습니다.

### 핵심 가치
> "현장에서 3초 안에 원하는 답을 찾는다"

### 타겟 사용자
- **Primary**: 현장 설치 관리자 (기술자)
- **Secondary**: 고객센터 상담원, 신입 기술자 교육용

---

## 🚀 개발 과정

### Phase 1: 기획 및 설계 (완료)

#### 1.1 PRD 작성
- **파일**: `prd.md`
- **내용**:
  - 프로젝트 개요 및 배경
  - 목표 및 성공 지표 (KPI)
  - 사용자 스토리 (7개, P0-P2 우선순위)
  - 기능 요구사항 (Phase 1-3 구분)
  - 데이터 모델 (TypeScript 인터페이스)
  - 기술 스택 선정
  - API 설계
  - 검색 기능 구현 방안
  - 비기능적 요구사항
  - 프로젝트 구조
  - UI 와이어프레임
  - 개발 로드맵
  - 디자인 가이드라인

#### 1.2 데이터 변환
- **원본**: `qa.md` (Markdown 형식, 100개 Q&A)
- **변환**: JSON 형식으로 구조화
  - `data/qa.json`: 100개 Q&A 항목
  - `data/categories.json`: 9개 카테고리 정의

**카테고리 구조**:
1. 설치 환경 및 사전 점검 (1-15)
2. 하드웨어 설치 (16-30)
3. 네트워크 및 Wi-Fi 연결 (31-45)
4. 기기 등록 및 초기 설정 (46-55)
5. 영상 및 카메라 설정 (56-68)
6. 경비 및 보안 설정 (69-78)
7. AI 얼굴인식 기능 (79-88)
8. SOS 비상버튼 (89-93)
9. 문제 해결 (Troubleshooting) (94-100)

---

### Phase 2: 프로젝트 셋업 (완료)

#### 2.1 Next.js 프로젝트 생성
```bash
npx create-next-app@latest web --typescript --tailwind --eslint --app --src-dir
```

**생성된 구조**:
- Next.js 16.0.5 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint

#### 2.2 UI 라이브러리 설치
- **shadcn/ui**: 모던한 UI 컴포넌트 라이브러리
  - Button, Card, Input, Badge, ScrollArea, Separator
- **Lucide React**: 아이콘 라이브러리

#### 2.3 검색 라이브러리 설치
- **Fuse.js**: 클라이언트 사이드 fuzzy search
  - 오타 허용
  - 유사어 매칭
  - 가중치 설정 (질문 50%, 답변 30%, 태그 20%)

---

### Phase 3: 핵심 기능 개발 (완료)

#### 3.1 데이터 레이어 구현

**파일**: `src/lib/data.ts`
- Q&A 데이터 로딩
- 카테고리별 필터링
- 관련 Q&A 추천
- ID/번호 기반 조회

**파일**: `src/lib/search.ts`
- Fuse.js 검색 엔진 설정
- 검색 결과 반환
- 인기 태그 추출

#### 3.2 타입 정의

**파일**: `src/types/index.ts`
```typescript
interface QAItem {
  id: string;
  number: number;
  categoryId: string;
  question: string;
  answer: string;
  citations: number[];
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  qaRange: [number, number];
  order: number;
}
```

#### 3.3 컴포넌트 개발

**레이아웃 컴포넌트**:
- `Header.tsx`: 상단 헤더 (로고, 브랜딩)
  - ADT 캡스 로고 이미지 사용
  - Sticky 헤더 (스크롤 시 고정)

**검색 컴포넌트**:
- `SearchBar.tsx`: 검색 입력창
  - 실시간 검색
  - 검색어 초기화 버튼
  - 자동 포커스 옵션

**카테고리 컴포넌트**:
- `CategoryCard.tsx`: 개별 카테고리 카드
- `CategoryList.tsx`: 카테고리 목록

**Q&A 컴포넌트**:
- `QACard.tsx`: Q&A 미리보기 카드
  - 검색어 하이라이트
  - 카테고리 배지
  - 호버 효과
- `QAList.tsx`: Q&A 목록

#### 3.4 페이지 개발

**홈 페이지** (`app/page.tsx`):
- 검색바
- 카테고리 목록
- 통계 (100개 Q&A, 9개 카테고리, 24/7)

**검색 결과 페이지** (`app/search/page.tsx`):
- 검색어 표시
- 결과 개수
- 검색어 하이라이트
- 빈 결과 처리

**카테고리 페이지** (`app/category/[id]/page.tsx`):
- 카테고리별 Q&A 목록
- Static Site Generation (SSG)
- 9개 카테고리 모두 pre-render

**Q&A 상세 페이지** (`app/qa/[id]/page.tsx`):
- 질문/답변 상세 표시
- 출처(citations) 표시
- 태그 목록 (검색 링크)
- 관련 Q&A 추천
- 복사/공유 버튼
- 100개 Q&A 모두 pre-render

#### 3.5 커스텀 훅

**파일**: `src/hooks/useSearch.ts`
- 검색 상태 관리
- 검색 결과 캐싱
- 검색어 변경 감지

---

### Phase 4: 스타일링 및 UX 개선 (완료)

#### 4.1 테마 변경
- **초기**: Dark theme (zinc-950 배경)
- **변경**: Light theme (slate-50 배경)
- 모든 컴포넌트 색상 업데이트
  - 배경: `bg-slate-50`
  - 카드: `bg-white`
  - 텍스트: `text-slate-900`
  - 호버: `hover:bg-red-50/50`

#### 4.2 반응형 디자인
- 모바일 우선 설계
- 최대 너비: `max-w-2xl`
- 터치 친화적 UI
- 큰 터치 타겟

#### 4.3 로고 적용
- ADT 캡스 로고 이미지 (`adt_logo.jpg`)
- Next.js Image 컴포넌트 사용 (자동 최적화)
- 높이 32px, 비율 유지

---

### Phase 5: 배포 준비 (완료)

#### 5.1 Git 저장소 설정
- Git 초기화
- `.gitignore` 설정
- 초기 커밋
- GitHub 저장소 생성 및 연결
  - 저장소: `jangwonboo/q-a-installer-support`
  - URL: https://github.com/jangwonboo/q-a-installer-support

#### 5.2 Vercel 배포 설정

**프로젝트 루트 `vercel.json`**:
```json
{
  "buildCommand": "cd web && npm install && npm run build",
  "outputDirectory": "web/.next",
  "framework": "nextjs"
}
```

**배포 가이드 작성**:
- `DEPLOY.md`: 상세 배포 가이드
- `VERCEL_SETUP.md`: 404 에러 해결 가이드

#### 5.3 문서화
- `README.md`: 프로젝트 개요 및 빠른 시작
- `DEPLOY.md`: 배포 가이드
- `VERCEL_SETUP.md`: Vercel 설정 가이드

---

## 🛠 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16.0.5 | React 프레임워크 (App Router) |
| **TypeScript** | 5.x | 타입 안정성 |
| **Tailwind CSS** | 4.x | 유틸리티 CSS |
| **shadcn/ui** | Latest | UI 컴포넌트 라이브러리 |
| **Fuse.js** | 7.1.0 | 클라이언트 사이드 검색 |
| **Lucide React** | 0.555.0 | 아이콘 |

### 배포
| 서비스 | 용도 |
|--------|------|
| **Vercel** | 호스팅 및 CI/CD |
| **GitHub** | 버전 관리 및 소스 코드 저장소 |

---

## 📁 프로젝트 구조

```
q_a/
├── data/                      # 원본 데이터
│   ├── qa.json                # 100개 Q&A (JSON)
│   └── categories.json        # 9개 카테고리
├── web/                       # Next.js 앱
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   │   ├── page.tsx       # 홈 페이지
│   │   │   ├── search/        # 검색 결과
│   │   │   ├── category/[id]/ # 카테고리별 Q&A
│   │   │   └── qa/[id]/       # Q&A 상세
│   │   ├── components/
│   │   │   ├── layout/        # Header
│   │   │   ├── search/        # SearchBar
│   │   │   ├── category/      # CategoryCard, CategoryList
│   │   │   ├── qa/            # QACard, QAList
│   │   │   └── ui/            # shadcn/ui 컴포넌트
│   │   ├── lib/
│   │   │   ├── data.ts        # 데이터 로딩
│   │   │   ├── search.ts       # Fuse.js 검색
│   │   │   └── utils.ts       # 유틸리티
│   │   ├── hooks/
│   │   │   └── useSearch.ts   # 검색 훅
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript 타입
│   │   └── data/              # JSON 데이터 (복사본)
│   ├── public/
│   │   └── adt_logo.jpg       # 로고 이미지
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── prd.md                     # 제품 요구사항 문서
├── qa.md                      # 원본 Q&A 데이터
├── vercel.json                # Vercel 배포 설정
├── .gitignore
└── README.md
```

---

## ✨ 주요 기능

### 1. 텍스트 검색
- **기술**: Fuse.js fuzzy search
- **특징**:
  - 오타 허용
  - 유사어 매칭
  - 검색어 하이라이트
  - 실시간 검색
- **검색 대상**: 질문, 답변, 태그

### 2. 카테고리 브라우징
- 9개 카테고리
- 카테고리별 Q&A 목록
- 이모지 아이콘
- Q&A 개수 표시

### 3. Q&A 상세 보기
- 질문/답변 상세 표시
- 출처(citations) 표시
- 태그 목록 (검색 링크)
- 관련 Q&A 추천 (같은 카테고리)
- 복사/공유 버튼 (UI만, 기능 미구현)

### 4. 반응형 디자인
- 모바일 우선
- 태블릿/데스크톱 지원
- 터치 친화적 UI

### 5. Static Site Generation (SSG)
- 114개 페이지 pre-render
  - 홈: 1개
  - 카테고리: 9개
  - Q&A 상세: 100개
  - 검색: 1개 (동적)
- 빠른 초기 로딩
- SEO 최적화

---

## 🎨 디자인 시스템

### 컬러 팔레트 (Light Theme)
- **Primary**: Red-500/600 (SK shieldus 브랜드 컬러)
- **Background**: Slate-50
- **Surface**: White
- **Text Primary**: Slate-900
- **Text Secondary**: Slate-500
- **Border**: Slate-200

### 타이포그래피
- **Font**: Geist (Next.js 기본)
- **Sizes**: xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px)

### 간격 시스템
- 4px, 8px, 12px, 16px, 24px, 32px

---

## 📊 성능 최적화

### 1. Static Generation
- 모든 Q&A 페이지 pre-render
- 빌드 타임에 HTML 생성
- CDN 캐싱

### 2. 이미지 최적화
- Next.js Image 컴포넌트
- 자동 WebP 변환
- Lazy loading

### 3. 코드 스플리팅
- Next.js 자동 코드 스플리팅
- 페이지별 번들 분리

### 4. 검색 최적화
- 클라이언트 사이드 검색 (100개 Q&A 수준)
- Fuse.js 인덱스 캐싱
- 디바운스 적용 (필요시)

---

## 🚀 배포 과정

### 1. GitHub 저장소 생성
- 저장소명: `q-a-installer-support`
- Public 저장소
- 초기 커밋 푸시

### 2. Vercel 배포
- Vercel 계정 생성 (GitHub 연동)
- 프로젝트 Import
- **중요**: Root Directory를 `web`으로 설정
- 자동 배포 완료

### 3. 배포 설정
- **Root Directory**: `web`
- **Framework**: Next.js (자동 감지)
- **Build Command**: `cd web && npm install && npm run build`
- **Output Directory**: `web/.next`

### 4. 자동 CI/CD
- GitHub 푸시 → 자동 빌드 → 자동 배포
- Pull Request → 프리뷰 배포
- main 브랜치 → 프로덕션 배포

---

## 🐛 문제 해결

### 1. 404 에러 (해결 완료)
**문제**: Vercel 배포 후 404 에러 발생

**원인**: Root Directory 설정 누락

**해결**:
1. 프로젝트 루트에 `vercel.json` 생성
2. Vercel 대시보드에서 Root Directory를 `web`으로 설정
3. 재배포

**파일**: `vercel.json`, `VERCEL_SETUP.md`

### 2. 중첩 Git 저장소 (해결 완료)
**문제**: `web` 폴더에 별도 Git 저장소 존재

**해결**:
- `web/.git` 삭제
- 프로젝트 루트에서 통합 관리

### 3. Fuse.js 타입 에러 (해결 완료)
**문제**: TypeScript 타입 에러

**해결**:
```typescript
import Fuse, { IFuseOptions } from 'fuse.js';
```

---

## 📈 현재 상태

### 완료된 기능 (MVP)
- ✅ 텍스트 검색 (Fuse.js)
- ✅ 카테고리 브라우징
- ✅ Q&A 상세 보기
- ✅ 반응형 모바일 UI
- ✅ 라이트 테마
- ✅ 로고 적용
- ✅ GitHub 저장소
- ✅ Vercel 배포
- ✅ 자동 CI/CD

### 미구현 기능 (Phase 2+)
- ⏳ 음성 검색 (Web Speech API)
- ⏳ 북마크/즐겨찾기
- ⏳ 검색 기록
- ⏳ Guided Troubleshooting
- ⏳ Admin Dashboard
- ⏳ 사진 업로드 분석 (AI)

---

## 🔗 링크

- **GitHub 저장소**: https://github.com/jangwonboo/q-a-installer-support
- **Vercel 배포**: (배포 URL 확인 필요)
- **PRD 문서**: `prd.md`
- **배포 가이드**: `web/DEPLOY.md`

---

## 📝 개발 통계

### 코드 통계
- **총 파일**: 51개
- **TypeScript 파일**: ~30개
- **컴포넌트**: 15개
- **페이지**: 4개 (114개 라우트)
- **라인 수**: ~11,550줄

### 데이터
- **Q&A 항목**: 100개
- **카테고리**: 9개
- **태그**: ~200개

### 배포
- **빌드 시간**: ~2분
- **배포 시간**: ~3분
- **총 페이지**: 114개 (pre-render)

---

## 🎯 다음 단계

### 단기 (1-2주)
1. 음성 검색 기능 추가
2. 북마크 기능 구현
3. 검색 기록 저장
4. 성능 모니터링 추가

### 중기 (1개월)
1. Guided Troubleshooting 구현
2. 검색 통계/분석
3. 사용자 피드백 수집
4. PWA 설정 (오프라인 지원)

### 장기 (3개월+)
1. Admin Dashboard
2. 콘텐츠 관리 시스템 (CMS)
3. 사진 업로드 분석 (Vision AI)
4. 다국어 지원

---

## 👥 개발 정보

### 개발 기간
- 시작: 2024년 11월
- 현재: MVP 완료, 배포 완료

### 기술 스택 선택 이유
- **Next.js**: SSR/SSG 지원, 빠른 초기 로딩, SEO 최적화
- **shadcn/ui**: 커스터마이징 용이, 모던 디자인
- **Fuse.js**: 클라이언트 사이드 검색, 100개 Q&A 수준에 적합
- **Vercel**: Next.js 최적화, 자동 배포, 무료 플랜

---

## 📚 참고 문서

- [PRD 문서](./prd.md) - 제품 요구사항 상세
- [배포 가이드](./web/DEPLOY.md) - 배포 방법
- [Vercel 설정](./VERCEL_SETUP.md) - Vercel 문제 해결
- [원본 Q&A](./qa.md) - 100개 Q&A 데이터

---

*문서 작성일: 2024년 11월*  
*최종 업데이트: 배포 완료 후*

