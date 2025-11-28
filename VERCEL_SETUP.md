# Vercel 404 에러 해결 가이드

## 문제
Vercel 배포 후 404 에러가 발생하는 경우, Root Directory 설정 문제일 가능성이 높습니다.

## 해결 방법

### 방법 1: Vercel 대시보드에서 설정 (추천)

1. **Vercel 프로젝트로 이동**
   - https://vercel.com/dashboard
   - 프로젝트 선택

2. **Settings → General**
   - **Root Directory** 섹션 찾기
   - "Edit" 클릭
   - `web` 입력
   - "Save" 클릭

3. **Redeploy**
   - Deployments 탭으로 이동
   - 최신 배포 옆 "..." → "Redeploy"

### 방법 2: vercel.json 사용 (이미 설정됨)

프로젝트 루트에 `vercel.json` 파일이 생성되어 있습니다.
이 파일이 있으면 Vercel이 자동으로 `web` 폴더를 인식합니다.

**중요**: Vercel 대시보드에서도 Root Directory를 `web`으로 설정해야 합니다.

---

## 확인 사항

### ✅ 빌드 성공 확인
로컬에서 빌드가 성공하는지 확인:
```bash
cd web
npm run build
```

### ✅ 파일 구조 확인
```
q_a/
├── vercel.json          # 루트에 있음 (Root Directory 설정)
├── web/
│   ├── package.json
│   ├── next.config.ts
│   └── src/
└── ...
```

### ✅ Vercel 설정 확인
- Root Directory: `web`
- Framework: Next.js (자동 감지)
- Build Command: `cd web && npm install && npm run build` (vercel.json에서)
- Output Directory: `web/.next` (vercel.json에서)

---

## 재배포

설정 변경 후:
1. Vercel 대시보드에서 "Redeploy" 클릭
2. 또는 GitHub에 새로운 커밋 푸시 (자동 재배포)

---

## 문제가 계속되면

1. **Vercel 로그 확인**
   - Deployments → 최신 배포 → "View Function Logs"

2. **빌드 로그 확인**
   - Deployments → 최신 배포 → "View Build Logs"

3. **환경 변수 확인**
   - Settings → Environment Variables

4. **캐시 삭제**
   - Settings → General → "Clear Build Cache"

