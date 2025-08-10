'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DemoUser, Activity } from '@/types';
import { esgCalculator } from '@/utils/esgCalculator';
import demoUsers from '@/data/demoUsers.json';
import esgConfig from '@/data/esgConfig.json';

export default function NewActivityPage() {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'E' as 'E' | 'S' | 'G',
    title: '',
    description: '',
    baseScore: 20
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);

    try {
      // 실제 점수 계산 (가중치 적용)
      const actualScore = esgCalculator.calculateActivityScore(formData.baseScore, formData.type);

      // 새 활동 생성
      const newActivity: Activity = {
        id: esgCalculator.generateActivityId(),
        date: formData.date,
        type: formData.type,
        title: formData.title,
        description: formData.description,
        score: actualScore
      };

      // 데모에서는 로컬스토리지에 활동을 저장하는 대신 성공 메시지만 표시
      setTimeout(() => {
        alert(`활동이 등록되었습니다!\\n\\n제목: ${newActivity.title}\\n유형: ${esgConfig.activityTypes[newActivity.type].name}\\n점수: ${newActivity.score}점\\n\\n* 데모 모드에서는 실제 데이터가 저장되지 않습니다.`);
        router.push('/dashboard');
      }, 1000);

    } catch (error) {
      console.error('활동 등록 중 오류:', error);
      alert('활동 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePreviewScore = () => {
    return esgCalculator.calculateActivityScore(formData.baseScore, formData.type);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <span>←</span>
              <span>대시보드로 돌아가기</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentUser.avatar}</span>
              <span className="font-medium text-gray-900">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">새 활동 등록</h1>
            <p className="text-gray-600">ESG 자원봉사 활동을 등록하고 점수를 획득하세요</p>
          </div>

          {/* 데모 모드 안내 */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">⚠️</span>
              <span className="font-semibold text-yellow-800">데모 모드</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              이 화면은 데모용입니다. 실제로는 증빙파일 업로드와 관리자 승인 과정이 포함됩니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 날짜 선택 */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                활동 날짜 *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* 활동 유형 선택 */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                활동 유형 *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'E' | 'S' | 'G' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="E">환경 (Environmental) - 가중치 {esgConfig.weights.E}</option>
                <option value="S">사회 (Social) - 가중치 {esgConfig.weights.S}</option>
                <option value="G">지배구조 (Governance) - 가중치 {esgConfig.weights.G}</option>
              </select>
              
              {/* 활동 예시 */}
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>{esgConfig.activityTypes[formData.type].name}</strong> 활동 예시:
                </p>
                <div className="flex flex-wrap gap-2">
                  {esgConfig.activityTypes[formData.type].examples.map((example, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-white text-gray-700 text-xs rounded border"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 활동 제목 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                활동 제목 *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 한강공원 쓰레기 수거"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* 활동 설명 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                활동 설명 *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="활동 내용, 참여 인원, 소요 시간 등을 자세히 작성해주세요"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* 기본 점수 */}
            <div>
              <label htmlFor="baseScore" className="block text-sm font-medium text-gray-700 mb-2">
                기본 점수
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="baseScore"
                  min="5"
                  max="50"
                  step="5"
                  value={formData.baseScore}
                  onChange={(e) => setFormData({ ...formData, baseScore: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-16">{formData.baseScore}점</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                활동 규모와 노력에 따라 조정하세요 (실제 버전에서는 관리자가 검토 후 결정)
              </p>
            </div>

            {/* 점수 미리보기 */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">점수 계산 미리보기</h4>
              <div className="text-sm text-blue-800">
                <p>기본 점수: {formData.baseScore}점</p>
                <p>가중치 ({formData.type}): {esgConfig.weights[formData.type]}</p>
                <p className="font-semibold text-lg">
                  최종 점수: {calculatePreviewScore()}점
                </p>
              </div>
            </div>

            {/* 증빙파일 업로드 (비활성화) */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                증빙파일 업로드
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-gray-400 mb-2">📁</div>
                <p className="text-gray-400 text-sm">데모 모드에서는 파일 업로드가 비활성화되어 있습니다</p>
                <p className="text-xs text-gray-400 mt-1">
                  실제 버전: 활동 사진, 참여 확인서 등 증빙자료 업로드
                </p>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } transition-colors`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>등록 중...</span>
                  </div>
                ) : (
                  '활동 등록하기'
                )}
              </button>
              
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}