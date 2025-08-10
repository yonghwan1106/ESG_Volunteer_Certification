'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('project');

  const tabs = [
    { id: 'project', label: '프로젝트 소개', icon: '🎯' },
    { id: 'esg', label: 'ESG 시스템', icon: '🌱' },
    { id: 'tech', label: '기술 스택', icon: '⚡' },
    { id: 'team', label: '개발 정보', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* 헤더 */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">🌱</div>
              <span className="font-bold text-xl text-gray-900">ESG 자원봉사 플랫폼</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/demo" className="text-gray-600 hover:text-green-600 transition-colors">
                데모 체험
              </Link>
              <Link href="/about" className="text-green-600 font-medium">
                소개
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 히어로 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <span className="mr-2">🏆</span>
            경기복지재단 2026년 신규사업 발굴 아이디어 공모전 출품작
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ESG 연계 자원봉사 인증 플랫폼
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            경기도민의 자원봉사 활동을 <strong className="text-green-600">ESG 관점에서 자동 분류·점수화·인증</strong>하여 
            참여 동기를 강화하고 사회적 가치를 측정하는 혁신적인 플랫폼입니다.
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* 프로젝트 소개 탭 */}
            {activeTab === 'project' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">프로젝트 배경</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-red-800">현재 문제점</h3>
                      <ul className="space-y-2 text-red-700">
                        <li>• 자원봉사 활동의 사회적 가치 측정 어려움</li>
                        <li>• ESG 관점에서의 체계적 분류 부족</li>
                        <li>• 참여자 동기 부여 시스템 미흡</li>
                        <li>• 활동 결과의 가시화 한계</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-green-800">해결 방안</h3>
                      <ul className="space-y-2 text-green-700">
                        <li>• ESG 가중치 기반 자동 점수 계산</li>
                        <li>• 레벨별 배지 시스템으로 성취감 제공</li>
                        <li>• PDF 인증서 자동 발급</li>
                        <li>• 시각적 대시보드로 성과 확인</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">핵심 가치</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl mb-3">📊</div>
                      <h4 className="font-semibold mb-2 text-blue-800">데이터 기반 측정</h4>
                      <p className="text-sm text-blue-600">ESG 가중치를 통한 과학적 점수 산정</p>
                    </div>
                    
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl mb-3">🏆</div>
                      <h4 className="font-semibold mb-2 text-green-800">동기 부여</h4>
                      <p className="text-sm text-green-600">배지와 인증서로 성취감 극대화</p>
                    </div>
                    
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="text-3xl mb-3">🌍</div>
                      <h4 className="font-semibold mb-2 text-purple-800">사회적 가치</h4>
                      <p className="text-sm text-purple-600">지속가능한 사회 발전에 기여</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ESG 시스템 탭 */}
            {activeTab === 'esg' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">ESG 점수 계산 시스템</h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">가중치 기반 점수 산정</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-100 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">1.2x</div>
                        <div className="text-sm font-medium text-green-800">환경 (E)</div>
                        <div className="text-xs text-green-600 mt-1">Environmental</div>
                      </div>
                      
                      <div className="bg-blue-100 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">1.0x</div>
                        <div className="text-sm font-medium text-blue-800">사회 (S)</div>
                        <div className="text-xs text-blue-600 mt-1">Social</div>
                      </div>
                      
                      <div className="bg-purple-100 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">0.8x</div>
                        <div className="text-sm font-medium text-purple-800">지배구조 (G)</div>
                        <div className="text-xs text-purple-600 mt-1">Governance</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border border-green-200 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 text-green-800 flex items-center">
                        <span className="text-xl mr-2">🌍</span>
                        환경 활동 (E)
                      </h4>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 해변/공원 정화 활동</li>
                        <li>• 나무 심기, 정원 가꾸기</li>
                        <li>• 재활용 캠페인 참여</li>
                        <li>• 환경 감시 및 모니터링</li>
                        <li>• 친환경 교육 봉사</li>
                      </ul>
                    </div>
                    
                    <div className="border border-blue-200 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 text-blue-800 flex items-center">
                        <span className="text-xl mr-2">🤝</span>
                        사회 활동 (S)
                      </h4>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 독거노인 돌봄 서비스</li>
                        <li>• 아동 교육 및 돌봄</li>
                        <li>• 노숙인 급식 봉사</li>
                        <li>• 장애인 지원 활동</li>
                        <li>• 다문화 가정 지원</li>
                      </ul>
                    </div>
                    
                    <div className="border border-purple-200 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 text-purple-800 flex items-center">
                        <span className="text-xl mr-2">⚖️</span>
                        지배구조 활동 (G)
                      </h4>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 시민감시단 참여</li>
                        <li>• 공청회 및 토론회 참석</li>
                        <li>• 투명성 캠페인 활동</li>
                        <li>• 시민교육 프로그램 진행</li>
                        <li>• 지역사회 거버넌스 참여</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">배지 시스템</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-3">🥉</div>
                      <h4 className="font-bold text-yellow-800">Level 1</h4>
                      <p className="text-yellow-700">자원봉사 입문자</p>
                      <p className="text-sm text-yellow-600 mt-2">30점 달성</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-3">🥈</div>
                      <h4 className="font-bold text-gray-800">Level 2</h4>
                      <p className="text-gray-700">자원봉사 활동가</p>
                      <p className="text-sm text-gray-600 mt-2">70점 달성</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-3">🥇</div>
                      <h4 className="font-bold text-yellow-800">Level 3</h4>
                      <p className="text-yellow-700">자원봉사 전문가</p>
                      <p className="text-sm text-yellow-600 mt-2">120점 달성</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 기술 스택 탭 */}
            {activeTab === 'tech' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">기술 아키텍처</h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-blue-800">Frontend</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-black rounded"></span>
                            <span>Next.js 14 - React 프레임워크</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-blue-500 rounded"></span>
                            <span>TypeScript - 타입 안정성</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-cyan-400 rounded"></span>
                            <span>Tailwind CSS - 유틸리티 스타일링</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-orange-500 rounded"></span>
                            <span>Chart.js - 데이터 시각화</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3 text-purple-800">Infrastructure</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-black rounded"></span>
                            <span>Vercel - 배포 및 호스팅</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gray-800 rounded"></span>
                            <span>GitHub - 버전 관리</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-red-500 rounded"></span>
                            <span>jsPDF - PDF 생성</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-green-500 rounded"></span>
                            <span>JSON - 데모 데이터 관리</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">성능 및 접근성</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 text-gray-800">🚀 성능 최적화</h4>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• Next.js App Router로 빠른 페이지 로딩</li>
                        <li>• 정적 페이지 생성 (SSG)</li>
                        <li>• 이미지 최적화 및 레이지 로딩</li>
                        <li>• Vercel Edge Network 활용</li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 text-gray-800">♿ 접근성</h4>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 반응형 디자인 (모바일 최적화)</li>
                        <li>• 시맨틱 HTML 구조</li>
                        <li>• 키보드 내비게이션 지원</li>
                        <li>• 색상 대비 WCAG AA 준수</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 개발 정보 탭 */}
            {activeTab === 'team' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">프로젝트 정보</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3 text-blue-800">📋 프로젝트 개요</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">프로젝트명:</span>
                          <span className="font-medium">ESG 연계 자원봉사 인증 플랫폼</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">개발 기간:</span>
                          <span className="font-medium">2025년 1월</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">프로젝트 타입:</span>
                          <span className="font-medium">웹앱 MVP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">라이선스:</span>
                          <span className="font-medium">데모 버전</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3 text-green-800">🏆 공모전 정보</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">주최 기관:</span>
                          <span className="font-medium">경기복지재단</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">공모 분야:</span>
                          <span className="font-medium">신규사업 발굴 아이디어</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">목표 연도:</span>
                          <span className="font-medium">2026년</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">대상 지역:</span>
                          <span className="font-medium">경기도</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">향후 발전 계획</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-purple-800">🎯 단기 목표 (6개월)</h3>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 실제 사용자 인증 시스템 구축</li>
                        <li>• 증빙파일 업로드 및 검증 시스템</li>
                        <li>• 관리자 승인 워크플로우 개발</li>
                        <li>• 모바일 앱 버전 출시</li>
                        <li>• API 연동 및 데이터베이스 구축</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-orange-800">🚀 장기 비전 (1년+)</h3>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 경기도 전체 자원봉사센터 연동</li>
                        <li>• AI 기반 활동 추천 시스템</li>
                        <li>• 블록체인 기반 인증서 발급</li>
                        <li>• 기업 CSR 프로그램 연계</li>
                        <li>• 국가 단위 ESG 자원봉사 네트워크</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-yellow-800 flex items-center">
                    <span className="text-xl mr-2">💡</span>
                    데모 버전 안내
                  </h3>
                  <p className="text-sm text-yellow-700">
                    현재 버전은 개념 증명용 데모입니다. 가상 데이터를 사용하며, 실제 서비스에는 
                    사용자 인증, 데이터베이스 연동, 관리자 시스템 등이 추가로 필요합니다.
                    실제 운영을 위해서는 개인정보보호법, 자원봉사활동기본법 등의 법적 요건을 충족해야 합니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">지금 바로 데모를 체험해보세요!</h2>
          <p className="mb-6 opacity-90">3명의 가상 사용자로 ESG 자원봉사 인증 시스템을 직접 경험할 수 있습니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🚀 데모 시작하기
            </Link>
            <Link
              href="/"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              🏠 메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}