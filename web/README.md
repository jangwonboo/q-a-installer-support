# SK shieldus Installer Support Portal

홈보안 제품 설치 Q&A 지원 웹앱

## 🚀 빠른 시작

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드

```bash
npm run build
npm start
```

## 📦 배포

### Vercel (추천)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 Import
3. **Root Directory**: `web` 설정
4. Deploy!

자세한 배포 가이드는 [DEPLOY.md](./DEPLOY.md) 참고

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **검색**: Fuse.js
- **언어**: TypeScript

## 📁 프로젝트 구조

```
web/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # React 컴포넌트
│   ├── lib/             # 유틸리티 함수
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript 타입
│   └── data/            # JSON 데이터
└── public/              # 정적 파일
```

## 📝 기능

- ✅ 텍스트 검색 (Fuse.js)
- ✅ 카테고리 브라우징
- ✅ Q&A 상세 보기
- ✅ 반응형 모바일 UI
- ✅ 라이트 테마

## 📄 라이선스

Private
