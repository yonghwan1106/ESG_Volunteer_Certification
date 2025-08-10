'use client';

import { Activity } from '@/types';

interface ActivityCardProps {
  activity: Activity;
}

const getTypeColor = (type: 'E' | 'S' | 'G') => {
  switch (type) {
    case 'E':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'S':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'G':
      return 'bg-purple-100 text-purple-800 border-purple-300';
  }
};

const getTypeName = (type: 'E' | 'S' | 'G') => {
  switch (type) {
    case 'E':
      return '환경';
    case 'S':
      return '사회';
    case 'G':
      return '지배구조';
  }
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const formattedDate = new Date(activity.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(
                activity.type
              )}`}
            >
              {getTypeName(activity.type)}
            </span>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {activity.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{activity.score}</div>
          <div className="text-xs text-gray-500">점</div>
        </div>
      </div>
    </div>
  );
}