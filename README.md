# ESG 연계 자원봉사 인증 플랫폼

[경기복지재단] 2026년 신규사업 발굴 아이디어 공모전 출품작

## 🌟 프로젝트 개요

경기도민의 자원봉사 활동을 ESG(Environmental, Social, Governance) 관점에서 자동 분류·점수화·인증하는 웹앱 MVP입니다.

## 🚀 주요 기능

- **🎯 데모 모드**: 3종의 가상 프로필로 5분 내 핵심 기능 체험
- **📊 ESG 점수화**: 환경(E), 사회(S), 지배구조(G) 활동별 가중치 기반 자동 점수 계산
- **🏆 배지 시스템**: 누적 점수별 레벨 배지 자동 발급
- **📄 PDF 인증서**: jsPDF 기반 자동 생성 및 다운로드
- **📈 시각화 대시보드**: Chart.js 기반 월별 ESG 점수 차트
- **📋 리포트 내보내기**: CSV/PDF 형식 활동 리포트 다운로드

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Chart**: Chart.js, React-Chart.js-2
- **PDF**: jsPDF
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 🏗 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 랜딩 페이지
│   ├── demo/              # 프로필 선택 페이지
│   ├── dashboard/         # 대시보드
│   └── activity/new/      # 활동 등록 폼
├── components/            # 재사용 컴포넌트
│   ├── ESGChart.tsx       # Chart.js 기반 시각화
│   ├── ActivityCard.tsx   # 활동 카드
│   └── BadgeDisplay.tsx   # 배지 표시
├── data/                  # 가상 데이터
│   ├── demoUsers.json     # 3종 데모 사용자
│   └── esgConfig.json     # ESG 가중치 설정
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
│   ├── esgCalculator.ts   # ESG 점수 계산
│   ├── certificateGenerator.ts # PDF 인증서 생성
│   └── reportGenerator.ts # 리포트 생성
└── globals.css           # Tailwind CSS
```

## 🎮 사용자 흐름

1. **메인 페이지** → "데모 시작" 클릭
2. **프로필 선택** → 3종 가상 사용자 중 선택
3. **대시보드** → ESG 점수 시각화 및 최근 활동 확인
4. **활동 등록** → 새 자원봉사 활동 등록 (데모용 폼)
5. **인증서 다운로드** → PDF 인증서 생성
6. **리포트 다운로드** → CSV/PDF 활동 리포트

## 🚦 개발 및 배포

### 로컬 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# http://localhost:3000 접속
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start
```

### Vercel 배포

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 배포
vercel --prod
```

## 📊 ESG 점수 가중치

- **환경 (E)**: 1.2x (해변정화, 나무심기, 재활용 등)
- **사회 (S)**: 1.0x (독거노인 봉사, 아동돌봄, 노숙인 급식 등)  
- **지배구조 (G)**: 0.8x (시민감시단, 공청회 참여, 투명성 캠페인 등)

## 🏅 배지 시스템

- **Level 1** (🥉): 30점 달성 - "자원봉사 입문자"
- **Level 2** (🥈): 70점 달성 - "자원봉사 활동가"
- **Level 3** (🥇): 120점 달성 - "자원봉사 전문가"

## 📝 데모 사용자

1. **김환경** 🌱 - 환경활동 중심 (85점)
2. **박사회** 🤝 - 사회활동 중심 (120점)  
3. **이지배** ⚖️ - 지배구조활동 중심 (65점)

## 🎯 성공 기준

- ✅ Vercel 배포 후 5분 내 데모 접속 가능
- ✅ 주요 기능 5분 내 체험 완료
- 🎯 월간 방문자 500명 이상 (배포 후 측정)
- 🎯 체험 완료율 70% 이상 (배포 후 측정)

## 🔜 향후 개선사항

- 실제 사용자 인증 시스템
- 증빙파일 업로드 및 검증
- 관리자 승인 워크플로우  
- 실시간 알림 시스템
- 모바일 앱 버전

## 📞 문의

본 플랫폼은 경기복지재단 신규사업 공모전 출품작으로, 데모 버전입니다.

---

🏆 **[경기복지재단] 2026년 신규사업 발굴 아이디어 공모전 출품작**