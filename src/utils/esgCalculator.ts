import { Activity, ESGWeights } from '@/types';
import esgConfig from '@/data/esgConfig.json';

export class ESGCalculator {
  private weights: ESGWeights;

  constructor() {
    this.weights = esgConfig.weights as ESGWeights;
  }

  calculateActivityScore(baseScore: number, type: 'E' | 'S' | 'G'): number {
    return Math.round(baseScore * this.weights[type]);
  }

  calculateTotalScore(activities: Activity[]): number {
    return activities.reduce((total, activity) => total + activity.score, 0);
  }

  getESGBreakdown(activities: Activity[]): { E: number; S: number; G: number } {
    return activities.reduce(
      (breakdown, activity) => {
        breakdown[activity.type] += activity.score;
        return breakdown;
      },
      { E: 0, S: 0, G: 0 }
    );
  }

  getBadgeLevel(totalScore: number): 1 | 2 | 3 | null {
    if (totalScore >= 120) return 3;
    if (totalScore >= 70) return 2;
    if (totalScore >= 30) return 1;
    return null;
  }

  getActivitySuggestions(type: 'E' | 'S' | 'G'): string[] {
    return esgConfig.activityTypes[type].examples;
  }

  generateActivityId(): string {
    return `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const esgCalculator = new ESGCalculator();