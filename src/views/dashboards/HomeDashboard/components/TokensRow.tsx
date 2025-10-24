import { useThemeStore } from "@/store/themeStore";
import { FC, useEffect, useState } from "react"
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi"; // Changed FiArrowUpLeft to FiArrowUpRight for consistency
import { MagicToken } from "@/@types/tokens";
import ProgressCircle from "../../common/ProgressCircle";
import { useApp } from "@/store/appStore";
import { useNavigate } from "react-router-dom";

type Props = {
    token: MagicToken
}
const TokensRow: FC<Props> = ({ token }) => {
    const sideNavCollapse = useThemeStore(
        (state) => state.layout.sideNavCollapse,
    )
    const [screenW, setScreenW] = useState(window.innerWidth);
    const [divWidth, setDivWidth] = useState("50%");
    const [shouldHideDiv, setShouldHideDiv] = useState(false);

    useEffect(() => {
        const handleResize = () => setScreenW(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenW < 1637 && !sideNavCollapse) {
            setDivWidth("40%");
            setShouldHideDiv(true);
        }
        if (screenW > 1637) {
            setDivWidth("50%");
            setShouldHideDiv(false);
        }
        if (screenW < 1020 && !sideNavCollapse) {
            setShouldHideDiv(false);
        }
    }, [sideNavCollapse, screenW]);

    const priceChange = token.priceChange?.h24 || 0;
    const isPositive = priceChange >= 0;

    const { setSelectedMagicToken } = useApp();
    const navigate = useNavigate();
    const handleTokenClicked = (token: MagicToken) => {
        setSelectedMagicToken(token);
        navigate("/dashboards/token-details");
    };

    return (
        <div
            onClick={() => handleTokenClicked(token)}
            className="flex cursor-pointer text-xs gap-3 items-center justify-between mt-1 border border-gray-700 bg-gray-800 hover:bg-gray-700 p-2.5 rounded-md">
            <div className="flex w-[60%] items-center space-x-2 min-w-0">
                <div className="font-medium px-2 py-1 rounded">#{token.rank}</div>
                <img src={token.metadata.image} alt={token.metadata.name} className="w-6 h-6 rounded-full" />
                <div className="dark:text-white flex min-w-0">
                    {!shouldHideDiv && <span className="hidden xs2:block truncate">{token.pair?.baseToken.name}/</span>}
                    <span className="text-gray-400 text-xs">{token.pair?.baseToken.symbol}</span>
                </div>
            </div>
            <div className="flex w-[40%] items-center gap-2">
                {!shouldHideDiv && (
                    <div className="flex items-center gap-1">
                        <ProgressCircle width={25} height={25} value={token.magicScore} strokeWidth={15} />
                        <img src="/img/others/chart2.png" alt="Chart icon" className="h-6 w-6" />
                    </div>
                )}
                <div className="flex items-center gap-1">
                    {isPositive ? (
                        <>
                            <FiArrowUpRight size={10} className="text-green-500" />
                            <span className="text-green-500">+{priceChange.toFixed(2)}%</span>
                        </>
                    ) : (
                        <>
                            <FiArrowDownRight size={10} className="text-red-500" />
                            <span className="text-red-500">{priceChange.toFixed(2)}%</span>
                        </>
                    )}
                    <div className="text-green-500">${token.metadata.priceUsd?.toFixed(5)}</div>
                </div>
            </div>
        </div>
    );
}

export default TokensRow