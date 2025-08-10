'use client';

import { useState, useEffect } from 'react';
import { DemoUser } from '@/types';

interface GoalTrackerProps {
  user: DemoUser;
}

export default function GoalTracker({ user }: GoalTrackerProps) {
  const [monthlyGoals, setMonthlyGoals] = useState({
    E: 50,
    S: 40,
    G: 30
  });

  const [newGoals, setNewGoals] = useState(monthlyGoals);
  const [showEditModal, setShowEditModal] = useState(false);

  // 현재 월 점수 계산
  const currentMonth = new Date().getMonth();
  const currentMonthActivities = user.activities.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate.getMonth() === currentMonth;
  });

  const currentMonthScores = currentMonthActivities.reduce(
    (acc, activity) => {
      acc[activity.type] += activity.score;
      return acc;
    },
    { E: 0, S: 0, G: 0 }
  );

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'from-green-500 to-green-600';
    if (progress >= 75) return 'from-blue-500 to-blue-600';
    if (progress >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const handleSaveGoals = () => {
    setMonthlyGoals(newGoals);
    setShowEditModal(false);
    // 실제 앱에서는 여기서 API 호출
    alert('목표가 설정되었습니다! 💪');
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          이달의 목표
        </h3>
        <button
          onClick={() => setShowEditModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm font-semibold"
        >
          목표 수정
        </button>
      </div>

      <div className="space-y-6">
        {/* 환경 목표 */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌍</span>
              <span className="font-semibold text-gray-800">환경 활동</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-green-600">{currentMonthScores.E}</span>
              <span className="text-gray-500">/{monthlyGoals.E}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getProgressColor(calculateProgress(currentMonthScores.E, monthlyGoals.E))} transition-all duration-1000 ease-out`}
              style={{ width: `${calculateProgress(currentMonthScores.E, monthlyGoals.E)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span className="font-medium">
              {calculateProgress(currentMonthScores.E, monthlyGoals.E).toFixed(1)}% 달성
            </span>
            <span>{monthlyGoals.E}</span>
          </div>
        </div>

        {/* 사회 목표 */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤝</span>
              <span className="font-semibold text-gray-800">사회 활동</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-blue-600">{currentMonthScores.S}</span>
              <span className="text-gray-500">/{monthlyGoals.S}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getProgressColor(calculateProgress(currentMonthScores.S, monthlyGoals.S))} transition-all duration-1000 ease-out delay-200`}
              style={{ width: `${calculateProgress(currentMonthScores.S, monthlyGoals.S)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span className="font-medium">
              {calculateProgress(currentMonthScores.S, monthlyGoals.S).toFixed(1)}% 달성
            </span>
            <span>{monthlyGoals.S}</span>
          </div>
        </div>

        {/* 지배구조 목표 */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚖️</span>
              <span className="font-semibold text-gray-800">지배구조 활동</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-purple-600">{currentMonthScores.G}</span>
              <span className="text-gray-500">/{monthlyGoals.G}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getProgressColor(calculateProgress(currentMonthScores.G, monthlyGoals.G))} transition-all duration-1000 ease-out delay-400`}
              style={{ width: `${calculateProgress(currentMonthScores.G, monthlyGoals.G)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span className="font-medium">
              {calculateProgress(currentMonthScores.G, monthlyGoals.G).toFixed(1)}% 달성
            </span>
            <span>{monthlyGoals.G}</span>
          </div>
        </div>
      </div>

      {/* 전체 진행률 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 mb-2">이달 전체 목표 달성률</h4>
          <div className="text-3xl font-bold">
            {(
              (calculateProgress(currentMonthScores.E, monthlyGoals.E) +
               calculateProgress(currentMonthScores.S, monthlyGoals.S) +
               calculateProgress(currentMonthScores.G, monthlyGoals.G)) / 3
            ).toFixed(1)}%
          </div>
          <p className="text-sm text-gray-600 mt-1">
            목표 달성까지 {Math.max(0, (monthlyGoals.E + monthlyGoals.S + monthlyGoals.G) - (currentMonthScores.E + currentMonthScores.S + currentMonthScores.G))}점 남음
          </p>
        </div>
      </div>

      {/* 목표 수정 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900">월간 목표 설정</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">환경 활동 목표</label>
                <input
                  type="number"
                  value={newGoals.E}
                  onChange={(e) => setNewGoals({...newGoals, E: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  max="200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사회 활동 목표</label>
                <input
                  type="number"
                  value={newGoals.S}
                  onChange={(e) => setNewGoals({...newGoals, S: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">지배구조 활동 목표</label>
                <input
                  type="number"
                  value={newGoals.G}
                  onChange={(e) => setNewGoals({...newGoals, G: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="0"
                  max="200"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveGoals}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold"
              >
                저장
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}