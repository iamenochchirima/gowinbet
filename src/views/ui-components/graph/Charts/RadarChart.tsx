import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const data = [
    { subject: "Top 10", A: 90, fullMark: 100 },
    { subject: "Top 25", A: 70, fullMark: 100 },
    { subject: "Top 40", A: 60, fullMark: 100 },
    { subject: "Top 55", A: 80, fullMark: 100 },
    { subject: "Other", A: 55, fullMark: 100 },
];

const RadarChartComp = () => {
    return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    )
}

export default RadarChartComp