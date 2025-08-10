'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Activity } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ESGChartProps {
  activities: Activity[];
}

export default function ESGChart({ activities }: ESGChartProps) {
  // 월별 ESG 점수 데이터 생성
  const generateMonthlyData = () => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월'];
    const monthlyScores = months.map((month, index) => {
      const monthActivities = activities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate.getMonth() === index;
      });

      const scores = { E: 0, S: 0, G: 0 };
      monthActivities.forEach(activity => {
        scores[activity.type] += activity.score;
      });

      return scores;
    });

    // 가상 데이터로 보완 (데모용)
    const baseData = [
      { E: 15, S: 10, G: 8 },
      { E: 25, S: 20, G: 12 },
      { E: 20, S: 15, G: 10 },
      { E: 30, S: 25, G: 15 },
      { E: 35, S: 30, G: 18 },
      { E: 40, S: 35, G: 20 }
    ];

    return {
      labels: months,
      datasets: [
        {
          label: '환경 (E)',
          data: baseData.map(d => d.E),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
        },
        {
          label: '사회 (S)',
          data: baseData.map(d => d.S),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
        {
          label: '지배구조 (G)',
          data: baseData.map(d => d.G),
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '월별 ESG 활동 점수',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '월',
        },
      },
      y: {
        title: {
          display: true,
          text: '점수',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Bar data={generateMonthlyData()} options={options} />
    </div>
  );
}