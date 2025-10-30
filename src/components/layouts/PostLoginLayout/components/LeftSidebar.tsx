import { HiStar, HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { useState } from 'react'
import { sidebarSections } from '@/data/sidebarData'
import type { League } from '@/data/sidebarData'

const sportIconMap: Record<string, string> = {
    star: '⭐',
    football: '⚽',
    basketball: '🏀',
    tennis: '🎾',
    'american-football': '🏈',
    hockey: '🏒',
    esports: '🎮',
    mma: '🥊'
}

const LeftSidebar = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        sidebarSections.reduce((acc, section) => ({
            ...acc,
            [section.id]: section.defaultOpen
        }), {})
    )

    return (
        <div className="w-[300px] bg-[#0d0d0d] flex flex-col border-r border-gray-800">
            {/* Download on App Store Banner - Fixed */}
            <div className="p-3 mb-2 flex-shrink-0">
                <div className="bg-gradient-to-r from-[#232B4A]  to-[#111113] rounded-xl p-2 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity shadow-xl relative overflow-hidden border border-gray-600">
                    {/* Apple Icon */}
                    <div className="relative z-10 flex-shrink-0">
                        <img src="/apple_icon.png" alt="Apple" className="w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 relative z-10">
                        <div className="text-[10px] text-gray-400 leading-tight">Download on the</div>
                        <div className="text-base font-semibold text-white leading-tight">App Store</div>
                    </div>

                    {/* Phone Image */}
                    <div className="relative z-10 flex-shrink-0">
                        <img src="/icons/phone_top.png" alt="Phone" className="h-6 w-auto object-contain" />
                    </div>

                    {/* Arrow */}
                    <div className="relative z-10 flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="mx-3 bg-[#252525] rounded-xl border border-gray-700/30 p-2">
                    {sidebarSections.map((section) => (
                        <div key={section.id} className="mb-2">
                            <button
                                onClick={() => setOpenSections(prev => ({
                                    ...prev,
                                    [section.id]: !prev[section.id]
                                }))}
                                className="w-full flex items-center justify-between py-2.5 px-3 bg-[#1a1a1a] hover:bg-[#202020] rounded-lg transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    {section.icon && section.icon === 'star' && (
                                        <HiStar className="w-4 h-4 text-gray-400" />
                                    )}
                                    {section.icon && section.icon !== 'star' && (
                                        <span className="text-base">{sportIconMap[section.icon]}</span>
                                    )}
                                    <span className="text-sm font-medium text-white">{section.title}</span>
                                    <span className="text-xs text-gray-500">{section.count}</span>
                                </div>
                                {openSections[section.id] ? (
                                    <HiChevronUp className="w-5 h-5 text-white" />
                                ) : (
                                    <HiChevronDown className="w-5 h-5 text-white" />
                                )}
                            </button>

                            {openSections[section.id] && (
                                <div className="mt-1 space-y-1">
                                    {section.items.map((item, idx) => {
                                        const isLeague = 'starred' in item
                                        const league = isLeague ? (item as League) : null

                                        return (
                                            <button
                                                key={idx}
                                                className="w-full flex items-center justify-between py-2 px-3 hover:bg-[#2a2a2a] rounded transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">{item.flag}</span>
                                                    <span className="text-sm text-gray-300">{item.name}</span>
                                                </div>
                                                {league?.starred && (
                                                    <span className="text-yellow-400">⭐</span>
                                                )}
                                            </button>
                                        )
                                    })}
                                    {section.items.length > 0 && (
                                        <button className="w-full text-xs text-gray-500 hover:text-white py-2 text-center">
                                            SHOW MORE +5
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
