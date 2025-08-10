export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalScore: number;
  badges: Badge[];
  activities: Activity[];
}

export interface Activity {
  id: string;
  date: string;
  type: 'E' | 'S' | 'G';
  title: string;
  description: string;
  score: number;
}

export interface Badge {
  id: string;
  level: 1 | 2 | 3;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface ESGWeights {
  E: number;
  S: number;
  G: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}