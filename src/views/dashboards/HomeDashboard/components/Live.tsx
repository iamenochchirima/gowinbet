import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { cards } from "../constants"
import LiveCard from "./LiveCard"
import { useEffect, useRef, useState } from "react";

const Live = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (scrollRef.current) {
                setCanScrollLeft(scrollRef.current.scrollLeft > 0);
            }
        };

        const refCurrent = scrollRef.current;
        if (refCurrent) {
            refCurrent.addEventListener("scroll", checkScroll);
        }

        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener("scroll", checkScroll);
            }
        };
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div className="relative py-3">
            <div className="mt-5 flex items-center relative">
                {canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-gray-300 p-1 rounded-full"
                    >
                        <MdKeyboardArrowLeft />
                    </button>
                )}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-hidden space-x-4 scrollbar-hide"
                    style={{
                        WebkitMask: "linear-gradient(90deg, transparent, white 0%, white 95%, transparent)",
                        mask: "linear-gradient(90deg, transparent, white 0%, white 95%, transparent)",
                    }}
                >
                    {cards.map((card, index) => (
                        <LiveCard key={index} item={card}/>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-gray-300 p-1 rounded-full"
                >
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </div>
    )
}

export default Live