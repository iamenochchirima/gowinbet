import React from 'react';
import { HistoricalPriceResponse } from '@/@types/tokens';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VolumeChartProps {
  data: HistoricalPriceResponse[];
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    time: item.time,
    volume: item.volume || 0,
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 0, left: -50, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2F30" />
          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            tick={{ fill: '#FFFFFF' }}
            axisLine={{ stroke: '#2C2F30' }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={false} // Hide Y-axis labels
            axisLine={{ stroke: '#2C2F30' }}
            tickFormatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#292C2D', borderColor: '#2C2F30' }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Bar dataKey="volume" fill="#00FF00" /> {/* Match screenshot green */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;