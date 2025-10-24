import { FC } from "react"
import { CryptoToken } from "../types"
import { MagicToken } from "@/@types/tokens"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/store/appStore"

type CardProps = {
    token: MagicToken
}
const CryptoCard: FC<CardProps> = ({ token }) => {
    const { setSelectedMagicToken } = useApp();
    const navigate = useNavigate();
    const handleTokenClicked = (token: MagicToken) => {
        setSelectedMagicToken(token);
        navigate("/dashboards/token-details");
    };

    return (
        <div onClick={() => handleTokenClicked(token)} className="flex w-[80px] min-w-[80px] flex-col items-center  rounded-lg cursor-pointer ">
            <img
                src={token.metadata.image}
                alt={token.metadata.name}
                className="xs:w-16 xs:h-16 h-14 w-14 rounded-full mb-2"
            />
            <span className="font-medium ">{token.metadata.symbol}</span>
            <span className="text-primary text-xs">{(token.priceChange?.h24)?.toFixed(2)}%</span>
        </div>
    )
}

export default CryptoCard