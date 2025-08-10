'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DemoUser } from '@/types';
import demoUsers from '@/data/demoUsers.json';

export default function DemoPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const router = useRouter();

  const handleStartDemo = () => {
    if (selectedUserId) {
      localStorage.setItem('selectedDemoUser', selectedUserId);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            데모 사용자 선택
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            3명의 가상 사용자 중 하나를 선택하여 플랫폼을 체험해보세요
          </p>
          <p className="text-sm text-gray-500">
            각 사용자는 서로 다른 ESG 활동 패턴을 보여줍니다
          </p>
        </div>

        {/* 사용자 카드 목록 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {(demoUsers as DemoUser[]).map((user) => {
            const esgScores = user.activities.reduce(
              (acc, activity) => {
                acc[activity.type] += activity.score;
                return acc;
              },
              { E: 0, S: 0, G: 0 }
            );

            return (
              <div
                key={user.id}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                  selectedUserId === user.id
                    ? 'ring-4 ring-blue-500 shadow-xl'
                    : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                {/* 사용자 정보 */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{user.avatar}</div>
                  <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* 총 점수 */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.totalScore}점
                  </div>
                  <p className="text-xs text-gray-500">총 ESG 점수</p>
                </div>

                {/* ESG 점수 분포 */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">환경 (E)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((esgScores.E / 50) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{esgScores.E}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">사회 (S)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((esgScores.S / 50) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{esgScores.S}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">지배구조 (G)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((esgScores.G / 50) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{esgScores.G}</span>
                    </div>
                  </div>
                </div>

                {/* 배지 */}
                <div className="text-center">
                  {user.badges.map((badge) => (
                    <div key={badge.id} className="inline-flex items-center space-x-1">
                      <span className="text-lg">{badge.icon}</span>
                      <span className="text-xs text-gray-600">{badge.name}</span>
                    </div>
                  ))}
                </div>

                {/* 활동 수 */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    총 {user.activities.length}개 활동 완료
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 시작 버튼 */}
        <div className="text-center">
          <button
            onClick={handleStartDemo}
            disabled={!selectedUserId}
            className={`px-8 py-4 text-xl font-semibold rounded-lg transition-all duration-200 ${
              selectedUserId
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedUserId ? '대시보드 시작하기' : '사용자를 선택해주세요'}
          </button>
          
          {selectedUserId && (
            <p className="mt-3 text-sm text-gray-600">
              선택된 사용자: {demoUsers.find(u => u.id === selectedUserId)?.name}
            </p>
          )}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 데모 안내</h4>
            <p className="text-sm text-blue-800">
              각 사용자는 서로 다른 ESG 활동 유형에 특화되어 있습니다. 
              김환경님은 환경활동 중심, 박사회님은 사회활동 중심, 이지배님은 거버넌스 활동 중심입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}