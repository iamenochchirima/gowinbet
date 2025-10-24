import { tokens } from "../constants"
import { GoArrowUpRight } from "react-icons/go";


const WatchlistTokens = () => {
    return (
        <div className=" text-white py-6">
            <h1 className="text-xl font-bold mb-4">My Watchlist</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {tokens.map((token, index) => (
                    <div
                        key={index}
                        className={` rounded-xl border border-gray-700 bg-gray-800`}
                    >
                        <div className="flex flex-col xs:flex-row p-4 justify-between items-center">
                            <div className="flex gap-1 items-center mb-2">
                                <span className="text-sm font-semibold">{token.name}</span>
                                <a
                                    href="#"
                                    className="text-sm hover:text-gray-200"
                                >
                                    <GoArrowUpRight size={12} />
                                </a>
                            </div>
                            <div className="">
                                <p className="">{token.price}</p>
                                <p
                                    className={`text-xs ${token.positive ? 'text-green-400' : 'text-red-400'
                                        }`}
                                >
                                    {token.change}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2  ">
                           <img src={token.positive ? "/img/others/greenChart.png" : "/img/others/redChart.png"} className="" alt="Chart" />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default WatchlistTokens