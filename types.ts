
export interface GlucoseData {
  timestamp: string;
  value: number;
}

export interface AIAnalysis {
  summary: string;
  observations: {
    description: string;
    riskLevel: 'good' | 'warning' | 'danger';
  }[];
  foodRecommendations: string[];
}
