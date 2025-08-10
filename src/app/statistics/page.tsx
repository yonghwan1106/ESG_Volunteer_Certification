'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DemoUser } from '@/types';
import demoUsers from '@/data/demoUsers.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsPage() {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
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

  if (!currentUser) return null;

  // 데이터 계산
  const esgScores = currentUser.activities.reduce(
    (acc, activity) => {
      acc[activity.type] += activity.score;
      return acc;
    },
    { E: 0, S: 0, G: 0 }
  );

  // 월별 진행 데이터 (가상)
  const monthlyProgress = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
      {
        label: '누적 점수',
        data: [25, 45, 65, 85, 105, currentUser.totalScore],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // ESG 분포 도넛 차트
  const esgDistribution = {
    labels: ['환경 (E)', '사회 (S)', '지배구조 (G)'],
    datasets: [
      {
        data: [esgScores.E, esgScores.S, esgScores.G],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 랭킹 데이터 (모든 사용자 비교)
  const allUsers = (demoUsers as DemoUser[]).sort((a, b) => b.totalScore - a.totalScore);
  const userRank = allUsers.findIndex(u => u.id === currentUser.id) + 1;

  const tabs = [
    { id: 'overview', label: '종합 현황', icon: '📊' },
    { id: 'trends', label: '트렌드 분석', icon: '📈' },
    { id: 'comparison', label: '사용자 비교', icon: '👥' },
    { id: 'achievements', label: '성취 분석', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 헤더 */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span className="font-bold text-xl text-gray-900">ESG 통계</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentUser.avatar}</span>
                <span className="font-medium text-gray-900">{currentUser.name}</span>
              </div>
              
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                대시보드로
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* 종합 현황 탭 */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* 핵심 지표 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">총 점수</p>
                        <p className="text-3xl font-bold">{currentUser.totalScore}</p>
                      </div>
                      <div className="text-4xl opacity-80">🏆</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">완료 활동</p>
                        <p className="text-3xl font-bold">{currentUser.activities.length}</p>
                      </div>
                      <div className="text-4xl opacity-80">✅</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">획득 배지</p>
                        <p className="text-3xl font-bold">{currentUser.badges.length}</p>
                      </div>
                      <div className="text-4xl opacity-80">🏅</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">전체 순위</p>
                        <p className="text-3xl font-bold">#{userRank}</p>
                      </div>
                      <div className="text-4xl opacity-80">🥇</div>
                    </div>
                  </div>
                </div>

                {/* 차트들 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">월별 점수 추이</h3>
                    <div className="h-64">
                      <Line data={monthlyProgress} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">ESG 활동 분포</h3>
                    <div className="h-64">
                      <Doughnut data={esgDistribution} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 트렌드 분석 탭 */}
            {activeTab === 'trends' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">활동 트렌드 분석</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="font-semibold mb-4">월 평균 활동</h3>
                    <div className="text-3xl font-bold text-blue-600">
                      {(currentUser.activities.length / 6).toFixed(1)}
                    </div>
                    <p className="text-gray-500">개/월</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="font-semibold mb-4">월 평균 점수</h3>
                    <div className="text-3xl font-bold text-green-600">
                      {(currentUser.totalScore / 6).toFixed(1)}
                    </div>
                    <p className="text-gray-500">점/월</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-semibold mb-4">활동 유형별 선호도</h3>
                  <div className="space-y-4">
                    {Object.entries(esgScores).map(([type, score]) => {
                      const percentage = (score / currentUser.totalScore) * 100;
                      return (
                        <div key={type}>
                          <div className="flex justify-between mb-1">
                            <span>{type === 'E' ? '환경' : type === 'S' ? '사회' : '지배구조'}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                type === 'E' ? 'bg-green-500' : type === 'S' ? 'bg-blue-500' : 'bg-purple-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 사용자 비교 탭 */}
            {activeTab === 'comparison' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">전체 사용자 비교</h2>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">순위표</h3>
                    <div className="space-y-3">
                      {allUsers.map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex items-center space-x-4 p-4 rounded-xl ${
                            user.id === currentUser.id
                              ? 'bg-blue-50 border-2 border-blue-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="text-2xl font-bold text-gray-400">
                            #{index + 1}
                          </div>
                          <div className="text-2xl">{user.avatar}</div>
                          <div className="flex-1">
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              {user.activities.length}개 활동 완료
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {user.totalScore}
                            </div>
                            <div className="text-xs text-gray-500">점</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 성취 분석 탭 */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">성취 분석</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl mb-2">📅</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.ceil((new Date().getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-gray-500">활동 기간 (일)</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {(currentUser.totalScore / currentUser.activities.length).toFixed(1)}
                    </div>
                    <div className="text-gray-500">활동당 평균 점수</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {((currentUser.totalScore / 150) * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-500">목표 달성률</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-semibold mb-4">다음 목표까지</h3>
                  <div className="space-y-4">
                    {currentUser.totalScore < 120 && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Level 3 배지까지</span>
                          <span>{120 - currentUser.totalScore}점 남음</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-yellow-500 h-3 rounded-full"
                            style={{ width: `${(currentUser.totalScore / 120) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}