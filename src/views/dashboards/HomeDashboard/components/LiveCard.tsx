import { FC } from "react"
import { LiveItem } from "../types"
import { FiArrowUpRight } from "react-icons/fi";

type LiveCardProps = {
    item: LiveItem
}
const LiveCard: FC<LiveCardProps> = ({ item }) => {
    return (
        <div className="flex  flex-col ss:min-w-[250px] min-w-[200px]  bg-gray-950 text-white rounded-lg shadow-md w-60"

        >
            <div className="flex-1 mb-">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-t-md" />
            </div>
            <div className="flex bg-gradient-to-br from-[#202b21] border-[#446d54] via-gray-950  border-b border-x rounded-b-lg to-gray-950 relative font-ProximaNovaNormal flex-col pt-5 pb-3 px-2">
                {/* <div className="absolute border-primary bg-gradient-to-br from-[#384639] to-gray-800 left-0 top-0 h-10 w-10 bg-blue-400">1</div> */}
                <h3 className="text-sm font-medium">{item.title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{item.subtitle}</span>
                    <FiArrowUpRight size={20} className="text-primary" />
                </div>
            </div>
        </div>
    )
}

export default LiveCard