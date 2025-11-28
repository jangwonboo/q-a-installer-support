#!/bin/bash

# GitHub 저장소 생성 및 연결 스크립트

echo "🚀 GitHub 저장소 설정"
echo ""
echo "1단계: GitHub에서 저장소 생성"
echo "   - https://github.com/new 접속"
echo "   - Repository name: q-a-installer-support"
echo "   - Description: SK shieldus 홈보안 제품 설치 Q&A 지원 웹앱"
echo "   - Public 또는 Private 선택"
echo "   - 'Initialize this repository with a README' 체크 해제"
echo "   - 'Create repository' 클릭"
echo ""
read -p "GitHub 저장소를 생성하셨나요? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -p "GitHub 사용자명을 입력하세요: " GITHUB_USER
    
    if [ -z "$GITHUB_USER" ]; then
        echo "❌ 사용자명이 입력되지 않았습니다."
        exit 1
    fi
    
    echo ""
    echo "2단계: 원격 저장소 연결 및 푸시"
    
    # 원격 저장소 추가
    git remote add origin "https://github.com/${GITHUB_USER}/q-a-installer-support.git" 2>/dev/null || \
    git remote set-url origin "https://github.com/${GITHUB_USER}/q-a-installer-support.git"
    
    # 브랜치를 main으로 설정
    git branch -M main
    
    # 푸시
    echo ""
    echo "코드를 GitHub에 푸시합니다..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 성공! 저장소가 생성되었습니다:"
        echo "   https://github.com/${GITHUB_USER}/q-a-installer-support"
        echo ""
        echo "다음 단계:"
        echo "   1. Vercel (https://vercel.com) 접속"
        echo "   2. GitHub로 로그인"
        echo "   3. 'Add New Project' 클릭"
        echo "   4. 저장소 선택"
        echo "   5. Root Directory: 'web' 설정"
        echo "   6. Deploy!"
    else
        echo ""
        echo "❌ 푸시 실패. GitHub 인증이 필요할 수 있습니다."
        echo "   다음 명령어로 수동 푸시:"
        echo "   git push -u origin main"
    fi
else
    echo ""
    echo "GitHub 저장소를 먼저 생성해주세요:"
    echo "   https://github.com/new"
    echo ""
    echo "생성 후 다음 명령어로 연결:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/q-a-installer-support.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

