import { useThemeStore } from '@/store/themeStore'
import React from 'react'
import { Link } from 'react-router-dom'

const Buttons = () => {
    const sideNavCollapse = useThemeStore(
        (state) => state.layout.sideNavCollapse,
    )
    const screenW = window.innerWidth
    const shouldHideButtons = screenW < 1578 && !sideNavCollapse

    return (
        <>
            <div 
                className='hidden items-center lg2:flex gap-2' 
                style={{ display: shouldHideButtons || screenW < 1210 ? 'none' : 'flex' }}
            >
                <Link to="#">
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl">
                        Top New Tokens
                    </button>
                </Link>
                <Link to="#">
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl">
                        Newly Listed on CMC
                    </button>
                </Link>
                <Link to="#">
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl">
                        Presales
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Buttons
