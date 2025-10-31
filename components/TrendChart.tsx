
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { GlucoseData } from '../types';
import { GLUCOSE_LEVELS } from '../constants';

interface TrendChartProps {
  data: GlucoseData[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-sm text-gray-700">{`Time: ${label}`}</p>
        <p className="text-brand-primary">{`Glucose: ${payload[0].value} mg/dL`}</p>
      </div>
    );
  }
  return null;
};

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
        <p>No data to display. Please import your glucose readings.</p>
      </div>
    );
  }
  
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(time) => new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
            />
          <YAxis 
            domain={['dataMin - 10', 'dataMax + 10']}
            label={{ value: 'mg/dL', angle: -90, position: 'insideLeft', fill: '#6b7280', dy: 40 }} 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={GLUCOSE_LEVELS.HIGH} label={{ value: "High", position: "right", fill: '#ef4444', fontSize: 12 }} stroke="#ef4444" strokeDasharray="3 3" />
          <ReferenceLine y={GLUCOSE_LEVELS.LOW} label={{ value: "Low", position: "right", fill: '#f59e0b', fontSize: 12 }} stroke="#f59e0b" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0066ff"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#0066ff', stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
