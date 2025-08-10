'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ESG 연계 자원봉사 인증 플랫폼
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            경기도민의 자원봉사 활동을 ESG 관점에서 자동 분류·점수화·인증
          </p>
          <p className="text-lg text-gray-500">
            [경기복지재단] 2026년 신규사업 발굴 아이디어 공모전 출품작
          </p>
        </div>

        {/* 주요 기능 소개 */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-lg font-semibold mb-2">환경 활동</h3>
            <p className="text-gray-600 text-sm">
              해변정화, 나무심기 등 환경보호 활동 자동 점수화
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold mb-2">사회 활동</h3>
            <p className="text-gray-600 text-sm">
              독거노인 봉사, 아동돌봄 등 사회공헌 활동 인증
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-lg font-semibold mb-2">지배구조 활동</h3>
            <p className="text-gray-600 text-sm">
              시민감시단, 공청회 참여 등 거버넌스 활동 평가
            </p>
          </div>
        </div>

        {/* 플랫폼 특장점 */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">플랫폼 특장점</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">ESG 가중치 기반 자동 점수 계산</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">누적 점수별 배지 시스템</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">PDF 인증서 자동 생성</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">월별 활동 현황 시각화</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">CSV/PDF 리포트 내보내기</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">별도 가입 없는 데모 체험</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="space-y-4">
          <Link
            href="/demo"
            className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-semibold px-8 py-4 rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🚀 데모 시작하기
          </Link>
          
          <p className="text-gray-500 text-sm">
            * 가상 데이터로 5분 내 주요 기능 체험 가능
          </p>
        </div>

        {/* 푸터 */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            본 플랫폼은 경기복지재단 신규사업 공모전 출품작으로, 데모 버전입니다.
          </p>
        </div>
      </div>
    </div>
  );
}