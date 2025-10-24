const items = [
    { title: "MiM6LbKxY813H8KSDm...", percent: 2, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 3, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 3, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 1, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 2, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 3, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 1, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 1, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 6, color: "#F97316" },
    { title: "MiM6LbKxY813H8KSDm...", percent: 1, color: "#F97316" },
];

const Five = () => {
    return (
        <div className="pb-10">
            <h3 className="text-center py-10">
                Suspicious Wallet
            </h3>
            {/* <div className="grid grid-cols-1 sm1:grid-cols-3  h-full"> */}
            <div className="grid grid-cols-1   h-full">
                {/* <div className="col-span-2 p-2">
                    <div className="flex w-full h-full items-center flex-col">
                        <div className="relative w-full h-full overflow-hidden">
                            <img
                                className=" fade-edges w-full"
                                src="/img/others/design2.png"
                                alt="Design"
                            />
                        </div>
                    </div>
                </div> */}
                <div className="h-full w-full justify-center  flex items-center">
                    <ul className="flex flex-col gap-2">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="text-gray-200 border-b border-gray-700 pb-2 text-xs flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-4 w-2 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="font-bold">#{index + 1}</span>
                                    <span className="truncate max-w-[150px]">{item.title}</span>
                                </div>
                                <span className="font-bold">{item.percent}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Five