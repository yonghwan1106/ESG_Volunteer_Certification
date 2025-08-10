'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: '🌍', title: '환경 활동', color: 'from-green-500 to-emerald-600' },
    { icon: '🤝', title: '사회 활동', color: 'from-blue-500 to-cyan-600' },
    { icon: '⚖️', title: '지배구조 활동', color: 'from-purple-500 to-indigo-600' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-50 animate-bounce"></div>
      </div>
      
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-4xl w-full text-center">
        {/* 헤더 */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium mb-6 animate-pulse">
            <span className="mr-2 text-lg">🏆</span>
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              경기복지재단 2026년 신규사업 발굴 아이디어 공모전 출품작
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              ESG 연계 자원봉사
            </span>
            <br />
            <span className="text-gray-900">인증 플랫폼</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
            경기도민의 자원봉사 활동을 <strong className="text-green-600">ESG 관점에서 자동 분류·점수화·인증</strong>하여<br />
            참여 동기를 강화하고 사회적 가치를 측정합니다
          </p>
          
          {/* 동적 특징 표시 */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <div className={`text-3xl transition-all duration-500 ${currentFeature === 0 ? 'scale-110' : 'scale-100'}`}>
              {features[currentFeature].icon}
            </div>
            <div className={`bg-gradient-to-r ${features[currentFeature].color} bg-clip-text text-transparent font-semibold text-lg`}>
              {features[currentFeature].title} 자동 점수화
            </div>
          </div>
        </div>

        {/* 주요 기능 소개 */}
        <div className={`grid md:grid-cols-3 gap-6 mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl border border-green-200 hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌍</div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">환경 활동</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded mb-3"></div>
            <p className="text-gray-600 leading-relaxed">
              해변정화, 나무심기 등 환경보호 활동을 <strong className="text-green-600">1.2x 가중치</strong>로 자동 점수화
            </p>
          </div>
          
          <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 md:mt-4">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">사회 활동</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mb-3"></div>
            <p className="text-gray-600 leading-relaxed">
              독거노인 봉사, 아동돌봄 등 사회공헌 활동을 <strong className="text-blue-600">1.0x 기준</strong>으로 인증
            </p>
          </div>
          
          <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl border border-purple-200 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚖️</div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">지배구조 활동</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded mb-3"></div>
            <p className="text-gray-600 leading-relaxed">
              시민감시단, 공청회 참여 등 거버넌스 활동을 <strong className="text-purple-600">0.8x</strong>로 평가
            </p>
          </div>
        </div>

        {/* 플랫폼 특장점 */}
        <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-10 border border-gray-100 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">플랫폼 특장점</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">ESG 가중치 기반 자동 점수 계산</span>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">누적 점수별 배지 시스템</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">PDF 인증서 자동 생성</span>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">월별 활동 현황 시각화</span>
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">CSV/PDF 리포트 내보내기</span>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">별도 가입 없는 데모 체험</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className={`space-y-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="group relative inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-semibold px-10 py-4 rounded-2xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <span className="text-2xl group-hover:animate-bounce">🚀</span>
                <span>데모 시작하기</span>
              </span>
            </Link>
            
            <Link
              href="/about"
              className="group inline-block border-2 border-green-500 text-green-600 text-xl font-semibold px-10 py-4 rounded-2xl hover:bg-green-50 hover:border-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <span className="text-2xl group-hover:animate-pulse">📋</span>
                <span>자세히 알아보기</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm animate-pulse">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>가상 데이터로 5분 내 주요 기능 체험 가능</span>
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          </div>
        </div>

        {/* 푸터 */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            본 플랫폼은 경기복지재단 신규사업 공모전 출품작으로, 데모 버전입니다.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}