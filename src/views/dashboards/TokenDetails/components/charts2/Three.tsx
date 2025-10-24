
const Three = () => {
    return (
        <>
            <div className="flex flex-col justify-between h-full gap-16">
                <div className="text-xs flex justify-between">
                    <div className="flex flex-col ">
                        <span >Total Value Locked (TVL)</span>
                        <span className="text-white font-bold lg">
                            $25.65M
                        </span>
                        <span>
                            17 jun 2024
                        </span>
                    </div>
                    <div className="">
                        <ul className="flex gap-2 border border-gray-700 p-1 items-center rounded-lg">
                            <li className="bg-primary text-black p-1 rounded">
                                1d
                            </li>
                            <li>
                                7d
                            </li>
                            <li>
                                1m
                            </li>
                            <li>
                                6m
                            </li>
                            <li>
                                1y
                            </li>
                            <li>
                                All
                            </li>
                        </ul>
                    </div>
                </div>
                <img src="/img/others/chart6.png" alt="Chart" />
            </div>
        </>
    )
}

export default Three