
import React, { useState, useCallback, useEffect } from 'react';
import { GlucoseData, AIAnalysis } from '../types';
import { MOCK_DATA_30_DAYS } from '../constants';
import DataImporter from './DataImporter';
import TrendChart from './TrendChart';
import AIAssistant from './AIAssistant';
import GeneratedImages from './GeneratedImages';
import { analyzeGlucoseData, generateProductVisionImage } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [glucoseData, setGlucoseData] = useState<GlucoseData[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data on mount
    handleDataImported();
  }, []);

  const handleDataImported = () => {
    setGlucoseData(MOCK_DATA_30_DAYS);
    setAiAnalysis(null); // Reset analysis when new data is loaded
  };

  const handleGetAnalysis = useCallback(async () => {
    const dataToAnalyze = timeRange === '7d' ? glucoseData.slice(-7) : glucoseData;
    if (dataToAnalyze.length === 0) {
      setError("No data available to analyze. Please import your glucose data first.");
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setAiAnalysis(null);
    try {
      const analysisResult = await analyzeGlucoseData(dataToAnalyze);
      setAiAnalysis(analysisResult);
    } catch (err) {
      setError("Failed to get analysis from AI. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [glucoseData, timeRange]);

  const handleGenerateVisionImage = useCallback(async () => {
    setIsGeneratingImage(true);
    setError(null);
    try {
      const image = await generateProductVisionImage();
      setGeneratedImage(image);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error(err);
    } finally {
      setIsGeneratingImage(false);
    }
  }, []);

  const displayedData = timeRange === '7d' ? glucoseData.slice(-7 * 24) : glucoseData;


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Blood Glucose Trends</h2>
              <p className="text-sm text-gray-500">Visualize your glucose levels over time.</p>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              {(['7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-brand-primary text-white shadow'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
          <TrendChart data={displayedData} />
        </div>

        <div className="space-y-6">
          <DataImporter onDataImport={handleDataImported} />
          <AIAssistant 
            onGetAnalysis={handleGetAnalysis} 
            analysis={aiAnalysis} 
            isLoading={isAnalyzing}
          />
        </div>
      </div>
      <GeneratedImages 
        onGenerateImage={handleGenerateVisionImage}
        image={generatedImage}
        isLoading={isGeneratingImage}
      />
      {error && (
        <div className="bg-red-100 border-l-4 border-danger-red text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;