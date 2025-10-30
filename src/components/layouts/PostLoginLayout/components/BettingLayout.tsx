import { useState, useRef, useEffect } from 'react'
import LayoutBase from '@/components/template/LayoutBase'
import { LAYOUT_BLANK } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const sportCategories = [
    { id: 'trend', name: 'Trend', icon: '/icons/fire.png' },
    { id: 'football', name: 'Football', icon: '/icons/football.png' },
    { id: 'basketball', name: 'Basketball', icon: '/icons/basketball.png' },
    { id: 'tennis', name: 'Tennis', icon: '/icons/tennis_ball.png' },
    { id: 'americanFootball', name: 'American Football', icon: '/icons/american_football.png' },
    { id: 'hockey', name: 'Hockey', icon: '/icons/hockey_ball.png' },
    { id: 'baseball', name: 'Baseball', icon: '/icons/base_ball.png' },
    { id: 'esports', name: 'E-Sports', icon: '/icons/e_sports.png' },
    { id: 'mma', name: 'MMA', icon: '/icons/mma.png' },
]

const BettingLayout = ({ children }: CommonProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [selectedSport, setSelectedSport] = useState('trend')

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
        }
    }

    useEffect(() => {
        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
            setTimeout(checkScroll, 300)
        }
    }

    return (
        <LayoutBase type={LAYOUT_BLANK} className="flex h-full w-full bg-black text-white overflow-hidden">
            <LeftSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                         <div className="bg-[#0d0d0d] border-b border-gray-800 px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[#252525] rounded-xl p-2 flex items-center gap-2 relative">
                            {showLeftArrow && (
                                <button
                                    onClick={() => scroll('left')}
                                    className="flex-shrink-0 p-2 hover:bg-[#1a1a1a] rounded transition-colors"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            <div
                                ref={scrollContainerRef}
                                className="flex items-center gap-2 overflow-x-hidden flex-1"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {sportCategories.map((sport) => (
                                    <button
                                        key={sport.id}
                                        onClick={() => setSelectedSport(sport.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                                            selectedSport === sport.id
                                                ? 'bg-gradient-to-b from-[#EEB122] via-[#6B480E] to-[#1d0101] text-white shadow-lg'
                                                : 'hover:bg-[#1a1a1a] text-gray-400'
                                        }`}
                                    >
                                        <img src={sport.icon} alt={sport.name} className="w-5 h-5" />
                                        {sport.name}
                                    </button>
                                ))}
                            </div>

                            {showRightArrow && (
                                <button
                                    onClick={() => scroll('right')}
                                    className="flex-shrink-0 p-2 hover:bg-[#1a1a1a] rounded transition-colors"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <button className="p-2 hover:bg-[#252525] rounded transition-colors flex-shrink-0">
                            <img src="/icons/filter.png" alt="Filter" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-auto bg-black">
                    {children}
                </div>
            </div>
            <RightSidebar />
        </LayoutBase>
    )
}

export default BettingLayout
