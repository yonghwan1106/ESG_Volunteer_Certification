'use client';

import { DemoUser } from '@/types';
import { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (user: DemoUser) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface AchievementSystemProps {
  user: DemoUser;
}

const achievements: Achievement[] = [
  {
    id: 'first_activity',
    title: '첫 걸음',
    description: '첫 번째 자원봉사 활동 완료',
    icon: '🎯',
    condition: (user) => user.activities.length >= 1,
    rarity: 'common',
    points: 5,
  },
  {
    id: 'five_activities',
    title: '꾸준한 참여자',
    description: '5개의 활동 완료',
    icon: '⭐',
    condition: (user) => user.activities.length >= 5,
    rarity: 'common',
    points: 10,
  },
  {
    id: 'env_specialist',
    title: '환경 전문가',
    description: '환경 활동으로 50점 달성',
    icon: '🌱',
    condition: (user) => {
      const envScore = user.activities.filter(a => a.type === 'E').reduce((sum, a) => sum + a.score, 0);
      return envScore >= 50;
    },
    rarity: 'rare',
    points: 20,
  },
  {
    id: 'social_warrior',
    title: '사회 활동가',
    description: '사회 활동으로 60점 달성',
    icon: '💙',
    condition: (user) => {
      const socialScore = user.activities.filter(a => a.type === 'S').reduce((sum, a) => sum + a.score, 0);
      return socialScore >= 60;
    },
    rarity: 'rare',
    points: 20,
  },
  {
    id: 'governance_expert',
    title: '거버넌스 전문가',
    description: '지배구조 활동으로 40점 달성',
    icon: '⚖️',
    condition: (user) => {
      const govScore = user.activities.filter(a => a.type === 'G').reduce((sum, a) => sum + a.score, 0);
      return govScore >= 40;
    },
    rarity: 'rare',
    points: 20,
  },
  {
    id: 'balanced_volunteer',
    title: '균형잡힌 자원봉사자',
    description: '모든 ESG 영역에서 각각 20점 이상',
    icon: '⚖️',
    condition: (user) => {
      const scores = user.activities.reduce(
        (acc, activity) => {
          acc[activity.type] += activity.score;
          return acc;
        },
        { E: 0, S: 0, G: 0 }
      );
      return scores.E >= 20 && scores.S >= 20 && scores.G >= 20;
    },
    rarity: 'epic',
    points: 50,
  },
  {
    id: 'streak_master',
    title: '연속 활동 마스터',
    description: '3일 연속 활동 (시뮬레이션)',
    icon: '🔥',
    condition: (user) => user.activities.length >= 3, // 데모용 간단한 조건
    rarity: 'epic',
    points: 30,
  },
  {
    id: 'century_club',
    title: '센추리 클럽',
    description: '총 100점 이상 달성',
    icon: '💯',
    condition: (user) => user.totalScore >= 100,
    rarity: 'legendary',
    points: 100,
  },
  {
    id: 'triple_badge',
    title: '트리플 크라운',
    description: '모든 레벨 배지 획득',
    icon: '👑',
    condition: (user) => user.badges.length >= 3,
    rarity: 'legendary',
    points: 150,
  },
];

export default function AchievementSystem({ user }: AchievementSystemProps) {
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showNewAchievement, setShowNewAchievement] = useState(false);

  const unlockedAchievements = achievements.filter(achievement => achievement.condition(user));
  const lockedAchievements = achievements.filter(achievement => !achievement.condition(user));

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const totalAchievementPoints = unlockedAchievements.reduce((sum, ach) => sum + ach.points, 0);

  useEffect(() => {
    // 새로운 성취 확인 (데모용)
    const recentlyUnlocked = achievements.filter(ach => 
      ach.condition(user) && !newAchievements.some(newAch => newAch.id === ach.id)
    );

    if (recentlyUnlocked.length > 0) {
      setNewAchievements(recentlyUnlocked);
      setShowNewAchievement(true);
      setTimeout(() => setShowNewAchievement(false), 3000);
    }
  }, [user, newAchievements]);

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          성취 시스템
        </h3>
        <div className="text-right">
          <div className="text-lg font-bold text-yellow-600">{totalAchievementPoints}점</div>
          <div className="text-xs text-gray-500">성취 점수</div>
        </div>
      </div>

      {/* 성취 통계 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <div className="text-lg font-bold text-gray-700">{unlockedAchievements.filter(a => a.rarity === 'common').length}</div>
          <div className="text-xs text-gray-500">일반</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="text-lg font-bold text-blue-700">{unlockedAchievements.filter(a => a.rarity === 'rare').length}</div>
          <div className="text-xs text-blue-500">희귀</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
          <div className="text-lg font-bold text-purple-700">{unlockedAchievements.filter(a => a.rarity === 'epic').length}</div>
          <div className="text-xs text-purple-500">에픽</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
          <div className="text-lg font-bold text-yellow-700">{unlockedAchievements.filter(a => a.rarity === 'legendary').length}</div>
          <div className="text-xs text-yellow-500">전설</div>
        </div>
      </div>

      {/* 획득한 성취 */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            획득한 성취 ({unlockedAchievements.length}/{achievements.length})
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 ${getRarityBorder(achievement.rarity)} bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-10 relative overflow-hidden`}
              >
                <div className="flex items-start space-x-3 relative z-10">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-bold text-gray-800">{achievement.title}</h5>
                      <div className="text-xs font-medium px-2 py-1 bg-white rounded-full text-gray-600">
                        +{achievement.points}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="text-xs text-gray-500 mt-1 capitalize">{achievement.rarity}</div>
                  </div>
                </div>
                
                {/* 빛나는 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 미획득 성취 (일부만 표시) */}
      {lockedAchievements.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-gray-400 mr-2">○</span>
            다음 목표
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lockedAchievements.slice(0, 4).map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50 opacity-75"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-bold text-gray-600">{achievement.title}</h5>
                      <div className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full text-gray-500">
                        +{achievement.points}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <div className="text-xs text-gray-400 mt-1 capitalize">{achievement.rarity}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 새 성취 알림 */}
      {showNewAchievement && newAchievements.length > 0 && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-xl shadow-2xl z-50 animate-bounce">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-spin">{newAchievements[0].icon}</div>
            <div>
              <div className="font-bold">새로운 성취 달성!</div>
              <div className="text-sm opacity-90">{newAchievements[0].title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}