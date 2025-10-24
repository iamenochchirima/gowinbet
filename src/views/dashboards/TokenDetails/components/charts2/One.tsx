import { BsThreeDotsVertical } from "react-icons/bs"

const One = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <span className="text-white">
                    Grayscale BTC holdings
                </span>
                <BsThreeDotsVertical />
            </div>
            <img src="/img/others/chart5.png" alt="Chart" />
        </>
    )
}

export default One