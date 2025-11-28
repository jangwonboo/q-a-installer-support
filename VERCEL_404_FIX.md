# Vercel 404 에러 해결 가이드

## 문제
Vercel 배포 후 404 에러가 계속 발생합니다.

## 원인
1. Root Directory 설정 문제
2. vercel.json 설정 충돌
3. 빌드 출력 경로 문제

## 해결 방법

### 방법 1: Vercel 대시보드에서 Root Directory 설정 (가장 중요!)

1. **Vercel 프로젝트로 이동**
   - https://vercel.com/dashboard
   - `q-a-installer-support` 프로젝트 선택

2. **Settings → General**
   - **Root Directory** 섹션 찾기
   - "Edit" 클릭
   - `web` 입력 (반드시 `web`으로 설정!)
   - "Save" 클릭

3. **Settings → Build & Development Settings**
   - Framework Preset: Next.js (자동 감지)
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)
   - Install Command: `npm install` (자동)

4. **Redeploy**
   - Deployments 탭으로 이동
   - 최신 배포 옆 "..." → "Redeploy"

### 방법 2: vercel.json 수정

프로젝트 루트의 `vercel.json`을 제거하거나 수정합니다.

**옵션 A: vercel.json 제거 (권장)**
- Vercel 대시보드에서 Root Directory를 `web`으로 설정하면 자동으로 감지됩니다.

**옵션 B: vercel.json 유지**
```json
{
  "buildCommand": "cd web && npm install && npm run build",
  "outputDirectory": "web/.next",
  "installCommand": "cd web && npm install",
  "framework": "nextjs"
}
```

### 방법 3: 프로젝트 구조 변경 (고급)

만약 위 방법이 작동하지 않으면, 프로젝트를 `web` 폴더 내용을 루트로 이동하는 것을 고려할 수 있습니다.

---

## 확인 체크리스트

- [ ] Vercel 대시보드에서 Root Directory가 `web`으로 설정됨
- [ ] Build Command가 올바름
- [ ] Output Directory가 올바름
- [ ] 빌드 로그에서 에러 없음
- [ ] 재배포 완료

---

## 빌드 로그 확인

Vercel 대시보드에서:
1. Deployments → 최신 배포 클릭
2. "View Build Logs" 클릭
3. 에러 메시지 확인

---

## 추가 문제 해결

### 빌드는 성공하지만 404가 발생하는 경우
- Root Directory 설정 확인
- 라우팅 문제 확인 (Next.js App Router)

### 빌드 실패하는 경우
- 빌드 로그 확인
- 의존성 문제 확인
- Node.js 버전 확인

---

## 참고

- Next.js는 `vercel.json` 없이도 자동으로 감지됩니다.
- Root Directory만 올바르게 설정하면 대부분 해결됩니다.

