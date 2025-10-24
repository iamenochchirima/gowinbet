import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartDataPoint, HistoricalPricePoint } from './types';

interface TwoLineChartProps {
  historicalData: HistoricalPricePoint[];
  predictedData: HistoricalPricePoint[];
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Customize this as needed
};

const TwoLineChart: React.FC<TwoLineChartProps> = ({ historicalData, predictedData }) => {
  // Transform data for Recharts
  const transformedHistorical: ChartDataPoint[] = historicalData.map(item => ({
    time: item.time,
    value: item.close || item.price,
    type: 'historical'
  }));

  const transformedPredicted: ChartDataPoint[] = predictedData.map(item => ({
    time: item.time,
    value: item.close || item.price,
    type: 'predicted'
  }));

  const historicalHigh = Math.max(...historicalData.map(d => d.high || d.price));
  const historicalLow = Math.min(...historicalData.map(d => d.low || d.price));

  const predictedLow = predictedData.length > 0 
    ? Math.min(...predictedData.map(d => d.close || d.price))
    : historicalLow;

  return (
    <div className="relative bg-[#1a1b1b] p-4 rounded-lg h-[400px] flex flex-col">
      {/* Historical Chart */}
      <div className="flex-1 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedHistorical}
            margin={{ top: 2, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2C2F30" />
            <XAxis 
              dataKey="time" 
              tick={false}
              axisLine={{ stroke: '#2C2F30' }}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fill: '#FFFFFF' }}
              axisLine={{ stroke: '#2C2F30' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#292C2D', borderColor: '#2C2F30' }}
              labelFormatter={formatTime}
            />
            <Area
              type="monotone"
              dataKey="value"
              name="Historical Price"
              stroke="#26A69A"
              fill="#26A69A80"
              fillOpacity={0.1}
              connectNulls={true}
            />
            <ReferenceLine 
              y={historicalHigh} 
              label={{ value: `High: $${historicalHigh.toFixed(6)}`, position: 'top', fill: '#26A69A' }} 
              stroke="#26A69A" 
              strokeDasharray="3 3" 
            />
            <ReferenceLine 
              y={historicalLow} 
              label={{ value: `Low: $${historicalLow.toFixed(6)}`, position: 'bottom', fill: '#B82133' }} 
              stroke="#B82133" 
              strokeDasharray="3 3" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Predicted Chart */}
      {predictedData.length > 0 && (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={transformedPredicted}
              margin={{ top: 2, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2F30" />
              <XAxis 
                dataKey="time" 
                tick={false}
                axisLine={{ stroke: '#2C2F30' }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fill: '#FFFFFF' }}
                axisLine={{ stroke: '#2C2F30' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#292C2D', borderColor: '#2C2F30' }}
                labelFormatter={formatTime}
              />
              <Area
                type="monotone"
                dataKey="value"
                name="Predicted Price"
                stroke="#FFA500"
                fill="#FFA50080"
                fillOpacity={0.1}
                connectNulls={true}
              />
              <ReferenceLine 
                y={predictedLow} 
                label={{ value: `Low: $${predictedLow.toFixed(6)}`, position: 'bottom', fill: '#B82133' }} 
                stroke="#B82133" 
                strokeDasharray="3 3" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TwoLineChart;