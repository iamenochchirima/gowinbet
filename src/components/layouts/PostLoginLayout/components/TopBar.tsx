import { Link } from "react-router-dom";
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';
import { useSessionUser } from '@/store/authStore';

const TopBar = () => {
    const { user } = useSessionUser((state) => state);

    return (
        <div className="w-full bg-[#0d0d0d]">
            <div
                className="px-3  py-2 hidden 2md:flex items-center justify-between  text-black "
            >
                <Link to="/">
                    <img className="h-8 w-[155px]" src="/logo.png" alt="Logo" />
                </Link>
                <div className="flex w-full justify-center">
                    <ul className="flex text-xs gap-5">
                        <li className="flex items-center gap-3">
                            <span className="rounded-full py-2 px-2.5 bg-gray-200 dark:bg-[#202020]">
                                🔥
                            </span>
                            <span className="text-gray-600 dark:text-fadedText">
                                Analysis done
                                <span className="text-black dark:text-white ml-1">
                                    2344
                                </span>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="rounded-full py-2 px-2.5 bg-gray-200 dark:bg-[#202020]">
                                🔥
                            </span>
                            <span className="text-gray-600 dark:text-fadedText">
                                Success Ratio
                                <span className="text-black dark:text-white ml-1">
                                    90%
                                </span>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="rounded-full py-2 px-2.5 bg-gray-200 dark:bg-[#202020]">
                                🔥
                            </span>
                            <span className="text-gray-600 dark:text-fadedText">
                                Players who benefited
                                <span className="text-black dark:text-white ml-1">
                                    7488
                                </span>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="rounded-full py-2 px-2.5 bg-gray-200 dark:bg-[#202020]">
                                🔥
                            </span>
                            <span className="text-gray-600 dark:text-fadedText">
                                Watchlists
                                <span className="text-black dark:text-white ml-1">
                                    47833
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-3">
                    {/* Search Icon */}
                    <button className="w-10 h-10 bg-[#2a2a2a] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors">
                        <HiOutlineSearch className="w-5 h-5 text-white" />
                    </button>

                    {/* Notification Icon */}
                    <button className="w-10 h-10 bg-[#2a2a2a] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors relative">
                        <HiOutlineBell className="w-5 h-5 text-white" />
                    </button>

                    {/* User Profile */}
                    <Link to="/profile" className="hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white font-semibold text-sm">
                                    {user?.firstname?.charAt(0).toUpperCase() || 'E'}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TopBar