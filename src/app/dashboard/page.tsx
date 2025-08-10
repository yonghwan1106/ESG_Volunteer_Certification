'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DemoUser } from '@/types';
import demoUsers from '@/data/demoUsers.json';
import ESGChart from '@/components/ESGChart';
import ActivityCard from '@/components/ActivityCard';
import BadgeDisplay from '@/components/BadgeDisplay';
import { generateAndDownloadCertificate } from '@/utils/certificateGenerator';
import { ReportGenerator } from '@/utils/reportGenerator';

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const selectedUserId = localStorage.getItem('selectedDemoUser');
    if (!selectedUserId) {
      router.push('/demo');
      return;
    }

    const user = (demoUsers as DemoUser[]).find(u => u.id === selectedUserId);
    if (!user) {
      router.push('/demo');
      return;
    }

    setCurrentUser(user);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  // ESG 점수별 분류
  const esgScores = currentUser.activities.reduce(
    (acc, activity) => {
      acc[activity.type] += activity.score;
      return acc;
    },
    { E: 0, S: 0, G: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-xl font-bold text-gray-900"
              >
                ESG 자원봉사 플랫폼
              </Link>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                데모 모드
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentUser.avatar}</span>
                <span className="font-medium text-gray-900">{currentUser.name}</span>
              </div>
              
              <button
                onClick={() => {
                  localStorage.removeItem('selectedDemoUser');
                  router.push('/demo');
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                사용자 변경
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 상단 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 점수</p>
                <p className="text-2xl font-bold text-gray-900">{currentUser.totalScore}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">🌍</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">환경 점수</p>
                <p className="text-2xl font-bold text-green-600">{esgScores.E}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">사회 점수</p>
                <p className="text-2xl font-bold text-blue-600">{esgScores.S}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">⚖️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">지배구조 점수</p>
                <p className="text-2xl font-bold text-purple-600">{esgScores.G}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 차트와 활동 목록 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 차트 */}
            <ESGChart activities={currentUser.activities} />

            {/* 액션 버튼들 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">주요 기능</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/activity/new"
                  className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <span>📝</span>
                  <span>활동 등록</span>
                </Link>
                
                <button
                  className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    generateAndDownloadCertificate(currentUser);
                  }}
                >
                  <span>📄</span>
                  <span>인증서 다운로드</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center justify-center space-x-2 bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors w-full">
                    <span>📊</span>
                    <span>리포트 다운로드</span>
                  </button>
                  
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      onClick={() => ReportGenerator.downloadCSV(currentUser)}
                    >
                      CSV 다운로드
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-b-lg"
                      onClick={() => ReportGenerator.generatePDFReport(currentUser)}
                    >
                      PDF 리포트
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 활동 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">최근 활동</h3>
              <div className="space-y-4">
                {currentUser.activities
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
              
              {currentUser.activities.length > 3 && (
                <div className="mt-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    모든 활동 보기 ({currentUser.activities.length - 3}개 더)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 배지 */}
          <div className="lg:col-span-1">
            <BadgeDisplay badges={currentUser.badges} totalScore={currentUser.totalScore} />
          </div>
        </div>
      </div>
    </div>
  );
}