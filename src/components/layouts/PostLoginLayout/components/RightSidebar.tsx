import { useState } from 'react'
import ReactECharts from 'echarts-for-react'

const matchPredictions = [
    {
        tournament: 'Football ( Half Time Total Goals)',
        icon: '/icons/football.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Under 1.5 Goals',
        odds: '1.52',
    },
    {
        tournament: 'Basketball',
        icon: '/icons/basketball.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Over 2.5 Cards',
        odds: '3.348',
    },
    {
        tournament: 'Football ( Win Team)',
        icon: '/icons/football.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Paris St. Germain',
        odds: '3.348',
    },
    {
        tournament: 'Football ( Full time)',
        icon: '/icons/football.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Over 6.5 Corners',
        odds: '3.348',
    },
    {
        tournament: 'Football ( Half Time Goal Team V1)',
        icon: '/icons/football.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Under 1.5 Goals',
        odds: '3.348',
    },
    {
        tournament: 'Football ( Win Team)',
        icon: '/icons/football.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Paris St. Germain',
        odds: '3.348',
    },
    {
        tournament: 'Football ( Win Team)',
        icon: '/icons/football.png',
        team1: 'Paris St. Germain',
        team2: 'FC Barcelona',
        prediction: 'Paris St. Germain',
        odds: '3.348',
    },
]

const RightSidebar = () => {
    const [selectedGoTab, setSelectedGoTab] = useState<'gopick' | 'gofun'>('gopick')

    return (
        <div className="w-[300px] bg-[#0d0d0d] border-l border-gray-800 overflow-y-auto custom-scrollbar p-3">
            <div className="bg-[#252525] rounded-xl border border-gray-700/30 px-2 py-4">
                <div className="flex items-center gap-0 bg-[#1a1a1a] rounded-lg p-1">
                    <button
                        onClick={() => setSelectedGoTab('gopick')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                            selectedGoTab === 'gopick'
                                ? 'bg-[#3a3a3a] text-white'
                                : 'bg-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        GoPick
                    </button>
                    <button
                        onClick={() => setSelectedGoTab('gofun')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                            selectedGoTab === 'gofun'
                                ? 'bg-[#3a3a3a] text-white'
                                : 'bg-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        GoFun
                    </button>
                </div>
                {/* Gauge Chart */}
                <div className="flex justify-center ">
                    <ReactECharts
                        option={{
                            backgroundColor: 'transparent',
                            series: [{
                                type: 'gauge',
                                startAngle: 180,
                                endAngle: 0,
                                center: ['50%', '70%'],
                                radius: '100%',
                                min: 0,
                                max: 100,
                                splitNumber: 4,
                                progress: {
                                    show: true,
                                    width: 14,
                                    roundCap: true,
                                    itemStyle: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 0,
                                            colorStops: [
                                                { offset: 0, color: '#EA4228' },
                                                { offset: 0.5, color: '#F5A623' },
                                                { offset: 1, color: '#7ED321' }
                                            ]
                                        }
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        width: 14,
                                        color: [[1, '#2a2a2a']]
                                    }
                                },
                                pointer: {
                                    show: false
                                },
                                axisTick: {
                                    show: true,
                                    distance: 0,
                                    length: 8,
                                    splitNumber: 5,
                                    lineStyle: {
                                        color: '#999',
                                        width: 2
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    distance: 0,
                                    length: 16,
                                    lineStyle: {
                                        color: '#aaa',
                                        width: 3
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    distance: 28,
                                    color: '#888',
                                    fontSize: 12,
                                    formatter: (value: number) => {
                                        if (value === 0 || value === 25 || value === 50 || value === 75 || value === 100) {
                                            return value.toString()
                                        }
                                        return ''
                                    }
                                },
                                detail: {
                                    formatter: '{value}%',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    offsetCenter: [0, '-30%']
                                },
                                title: {
                                    show: true,
                                    offsetCenter: [0, '-5%'],
                                    fontSize: 16,
                                    color: '#999'
                                },
                                data: [{
                                    value: 100,
                                    name: 'Ratio'
                                }]
                            }]
                        }}
                        style={{ height: '220px', width: '100%' }}
                        opts={{ renderer: 'svg' }}
                    />
                </div>

                <div className="space-y-3">
                    {matchPredictions.map((match, index) => (
                        <div
                            key={index}
                            className="bg-[#2E2D2D] rounded-lg px-2 py-2 hover:bg-[#202020] transition-colors cursor-pointer border border-gray-600"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <img src={match.icon} alt="" className="w-4 h-4" />
                                <div className="text-xs text-gray-200">{match.tournament}</div>
                            </div>
                            <div className="mb-3">
                                <div className="text-sm text-white font-medium mb-1">
                                    {match.team1} <span className="text-gray-500 text-xs">VS</span> {match.team2}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-[#252525] rounded-lg p-2">
                                <span className="text-sm text-white font-medium">{match.prediction}</span>
                                <span className="bg-white text-black px-3 py-1 rounded-md text-sm font-bold">
                                    {match.odds}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightSidebar
