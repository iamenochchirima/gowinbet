import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
  } from 'recharts';
  
  type Props = {
    data: {
      top1Percent: number;
      top3Percent: number;
      top10Percent: number;
      top15Percent: number;
      others: number;
    };
  };
  
  const labelMap: Record<string, string> = {
    top1Percent: 'Top 1',
    top3Percent: 'Top 3',
    top10Percent: 'Top 10',
    top15Percent: 'Top 15',
    others: 'Other',
  }
  
  const colors: Record<string, string> = {
    'Top 1': '#AA00FF',
    'Top 3': '#FF5722',
    'Top 10': '#00FF94',
    'Top 15': '#FFC107',
    'Other': '#00BFFF',
  };
  
  const renderCustomTick = (props: any) => {
    const { payload, x, y, textAnchor } = props;
    const color = colors[payload.value] || '#fff';
  
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill={color}
        fontSize={12}
      >
        {payload.value}
      </text>
    );
  };
  
  export default function RadarChartComponent({ data }: Props) {
    const chartData = Object.entries(data).map(([key, value]) => ({
      subject: labelMap[key] || key,
      value,
      fullMark: 100,
    }));
  
    return (
      <div style={{ width: '100%', height: '300px' }} className="  bg-gray-800  rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="60%" data={chartData}>
            <PolarGrid stroke="#444" />
            <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#999' }} />
            <Radar
              name="Stats"
              dataKey="value"
              stroke="#00FF94"
              fill="#00FF94"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  