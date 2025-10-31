
import { GlucoseData } from './types';

export const GLUCOSE_LEVELS = {
  LOW: 70,
  NORMAL_MAX: 180,
  HIGH: 180,
};

// Generate realistic mock data for 30 days
const generateMockData = (): GlucoseData[] => {
  const data: GlucoseData[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  for (let d = new Date(thirtyDaysAgo); d <= now; d.setHours(d.getHours() + 1)) {
    const hour = d.getHours();
    let baseValue = 110; // Base glucose level

    // Simulate meal spikes
    if ([8, 13, 19].includes(hour)) { // Breakfast, Lunch, Dinner
      baseValue += Math.random() * 60 + 30; // Spike after meal
    } else if ([9, 14, 20].includes(hour)) {
      baseValue += Math.random() * 40; // Still elevated
    }

    // Simulate morning rise (dawn phenomenon)
    if (hour >= 4 && hour <= 7) {
        baseValue += Math.random() * 20;
    }
    
    // Simulate dip at night
    if (hour >= 2 && hour <= 4) {
        baseValue -= Math.random() * 15;
    }

    const randomFluctuation = (Math.random() - 0.5) * 15;
    const finalValue = Math.round(baseValue + randomFluctuation);

    data.push({
      timestamp: new Date(d).toISOString(),
      value: finalValue,
    });
  }

  return data;
};

export const MOCK_DATA_30_DAYS: GlucoseData[] = generateMockData();
