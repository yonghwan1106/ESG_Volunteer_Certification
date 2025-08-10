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
          backgroundColor: 'rgba(34, 197, 94, 0.9)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: '사회 (S)',
          data: baseData.map(d => d.S),
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: '지배구조 (G)',
          data: baseData.map(d => d.G),
          backgroundColor: 'rgba(139, 92, 246, 0.9)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600',
          },
        },
      },
      title: {
        display: true,
        text: '월별 ESG 활동 점수 현황',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#374151',
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#6B7280',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '월',
          font: {
            size: 14,
            weight: '600',
          },
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        title: {
          display: true,
          text: '점수',
          font: {
            size: 14,
            weight: '600',
          },
          color: '#6B7280',
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.3)',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="h-96">
        <Bar data={generateMonthlyData()} options={options} />
      </div>
    </div>
  );
}