# 배포 가이드 - Vercel

## 🚀 Vercel 배포 (가장 추천 - 5분 완료)

### 1단계: GitHub에 코드 푸시

```bash
cd /Users/jangwonboo/projects/q_a/web

# Git 초기화 (이미 되어있다면 스킵)
git init

# GitHub 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/q-a-installer-support.git

# 커밋 및 푸시
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2단계: Vercel 배포

1. **Vercel 가입**: https://vercel.com/signup
   - GitHub 계정으로 로그인 (권장)

2. **프로젝트 Import**
   - Vercel 대시보드에서 "Add New Project" 클릭
   - GitHub 저장소 선택
   - 자동으로 Next.js 감지됨

3. **설정 확인**
   - Framework Preset: Next.js (자동)
   - Root Directory: `web` (프로젝트가 web 폴더에 있으므로)
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)

4. **Deploy 클릭**
   - 약 2-3분 후 배포 완료
   - 자동으로 `https://your-project.vercel.app` 도메인 제공

### 3단계: 커스텀 도메인 연결 (선택)

1. Vercel 프로젝트 → Settings → Domains
2. 원하는 도메인 입력 (예: `installer-support.yourdomain.com`)
3. DNS 설정 안내에 따라 도메인 DNS 레코드 추가
4. SSL 인증서 자동 발급 (Let's Encrypt)

---

## 🔄 자동 CI/CD

GitHub에 푸시하면 자동으로:
- ✅ 빌드 실행
- ✅ 배포 자동화
- ✅ 프리뷰 배포 (Pull Request마다)
- ✅ 프로덕션 배포 (main 브랜치)

---

## 📊 Vercel 무료 플랜 제한

- ✅ 무료 도메인 제공 (`*.vercel.app`)
- ✅ 무료 SSL 인증서
- ✅ 월 100GB 대역폭
- ✅ 무제한 배포
- ✅ 자동 CI/CD

---

## 🌐 대안: Netlify

### Netlify 배포 (Vercel 대안)

1. **Netlify 가입**: https://app.netlify.com/signup

2. **배포 방법**
   ```bash
   # Netlify CLI 설치
   npm install -g netlify-cli
   
   # 로그인
   netlify login
   
   # 배포
   cd web
   netlify deploy --prod
   ```

3. **또는 GitHub 연동**
   - Netlify 대시보드 → "Add new site" → "Import an existing project"
   - GitHub 저장소 선택
   - Build settings:
     - Base directory: `web`
     - Build command: `npm run build`
     - Publish directory: `web/.next`

---

## 🚂 대안: Railway

### Railway 배포

1. **Railway 가입**: https://railway.app
2. **"New Project" → "Deploy from GitHub repo"**
3. **자동 감지 및 배포**

---

## 📝 환경 변수 설정 (필요시)

Vercel/Netlify 대시보드에서:
- Settings → Environment Variables
- 환경 변수 추가

---

## ✅ 배포 체크리스트

- [ ] GitHub 저장소 생성 및 푸시
- [ ] Vercel 계정 생성
- [ ] 프로젝트 Import
- [ ] Root Directory: `web` 설정
- [ ] 첫 배포 완료 확인
- [ ] 커스텀 도메인 연결 (선택)

---

## 🔧 문제 해결

### 빌드 에러
```bash
# 로컬에서 빌드 테스트
cd web
npm run build
```

### Root Directory 설정
- Vercel: Settings → General → Root Directory → `web`

### 환경 변수
- Vercel: Settings → Environment Variables

---

## 📚 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel GitHub 연동](https://vercel.com/docs/concepts/git)

