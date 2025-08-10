'use client';

import { Badge } from '@/types';

interface BadgeDisplayProps {
  badges: Badge[];
  totalScore: number;
}

export default function BadgeDisplay({ badges, totalScore }: BadgeDisplayProps) {
  const allBadges = [
    {
      id: 'level1',
      level: 1 as const,
      name: '자원봉사 입문자',
      description: '30점 달성',
      icon: '🥉',
      threshold: 30,
    },
    {
      id: 'level2',
      level: 2 as const,
      name: '자원봉사 활동가',
      description: '70점 달성',
      icon: '🥈',
      threshold: 70,
    },
    {
      id: 'level3',
      level: 3 as const,
      name: '자원봉사 전문가',
      description: '120점 달성',
      icon: '🥇',
      threshold: 120,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900">획득 배지</h3>
      
      <div className="space-y-4">
        {allBadges.map((badge) => {
          const isUnlocked = totalScore >= badge.threshold;
          const userBadge = badges.find(b => b.level === badge.level);
          
          return (
            <div
              key={badge.id}
              className={`flex items-center space-x-4 p-3 rounded-lg border ${
                isUnlocked
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`text-3xl ${!isUnlocked && 'grayscale opacity-50'}`}>
                {badge.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-semibold ${
                    isUnlocked ? 'text-yellow-800' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </h4>
                  {isUnlocked && (
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                      획득
                    </span>
                  )}
                </div>
                
                <p className={`text-sm ${
                  isUnlocked ? 'text-yellow-700' : 'text-gray-400'
                }`}>
                  {badge.description}
                </p>
                
                {userBadge?.unlockedAt && (
                  <p className="text-xs text-yellow-600 mt-1">
                    획득일: {new Date(userBadge.unlockedAt).toLocaleDateString('ko-KR')}
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  isUnlocked ? 'text-yellow-800' : 'text-gray-500'
                }`}>
                  {totalScore} / {badge.threshold}
                </div>
                
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      isUnlocked ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}
                    style={{
                      width: `${Math.min((totalScore / badge.threshold) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 배지 시스템 안내</h4>
        <p className="text-sm text-blue-800">
          ESG 활동을 통해 점수를 누적하고 배지를 획득해보세요! 
          각 배지는 자원봉사 인증서에 포함됩니다.
        </p>
      </div>
    </div>
  );
}