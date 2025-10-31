
import React from 'react';
import { AIAnalysis } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import Spinner from './Spinner';

interface AIAssistantProps {
  onGetAnalysis: () => void;
  analysis: AIAnalysis | null;
  isLoading: boolean;
}

const TrafficLight: React.FC<{ level: 'good' | 'warning' | 'danger' }> = ({ level }) => {
    const colorMap = {
        good: 'bg-success-green',
        warning: 'bg-warning-amber',
        danger: 'bg-danger-red',
    };
    return <div className={`w-3 h-3 rounded-full ${colorMap[level]} flex-shrink-0`}></div>;
};

const AIAssistant: React.FC<AIAssistantProps> = ({ onGetAnalysis, analysis, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-brand-secondary p-3 rounded-full">
            <LightbulbIcon />
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-800">AI-Powered Insights</h3>
            <p className="text-sm text-gray-500">Get personalized analysis & tips.</p>
        </div>
      </div>

      {!isLoading && !analysis && (
        <div className="text-center py-6">
          <p className="text-gray-600 mb-4">Click below to analyze your current trend data and receive suggestions.</p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[150px] space-y-2">
          <Spinner />
          <p className="text-sm text-gray-600 animate-pulse">Analyzing your data...</p>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Overall Summary</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{analysis.summary}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Key Observations</h4>
            <ul className="space-y-2">
              {analysis.observations.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <TrafficLight level={item.riskLevel} />
                  <span className="text-gray-600">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-gray-700 mb-2">Food Recommendations</h4>
            <ul className="space-y-2">
              {analysis.foodRecommendations.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                    <div className="pt-1.5"><TrafficLight level="good" /></div>
                    <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button
        onClick={onGetAnalysis}
        disabled={isLoading}
        className="mt-6 w-full flex items-center justify-center bg-brand-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <SparklesIcon />
        <span className="ml-2">{isLoading ? 'Analyzing...' : 'Get AI Analysis'}</span>
      </button>
    </div>
  );
};

export default AIAssistant;
