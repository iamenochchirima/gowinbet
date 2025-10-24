import useThemeSchema from "@/utils/hooks/useThemeSchema"
import { Mode } from '../../../../@types/theme';
import { useThemeStore } from "@/store/themeStore";
import { Link } from "react-router-dom";
import useAppContext from "@/auth/useApp";

const items = [
    {
        icon: '🔥',
        text: 'Analysis done',
        number: "2344"
    },
    {
        icon: '🔥',
        text: 'Success Ratio',
        number: "90%"
    },
    {
        icon: '🔥',
        text: 'Players who benefited',
        number: "7488"
    },
    {
        icon: '🔥',
        text: 'Watchlists',
        number: "47833"
    },
]

const TopBar = () => {
    const { realtimeStats } = useAppContext();

    return (
        <div className="w-full">
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
                                    {realtimeStats?.analysis_done || "2344"}
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
                                    {realtimeStats?.success_ratio || "90%"}
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
                                    {realtimeStats?.players_benefited || "7488"}
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
                                    {realtimeStats?.watchlists || "47833"}
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopBar