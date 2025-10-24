import { useRef, useState, useEffect } from "react";
import More from "./More";
import { useApp } from "@/store/appStore";
import { MagicToken } from "@/@types/tokens";
import InfiniteScroller from "./InfiniteScroller";

const MagicDip = () => {
    const { aimagictokens } = useApp()
    const [tokens, setTokens] = useState<MagicToken[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        if (aimagictokens.length > 0) {
            processTokens(aimagictokens);
        }
    }, [aimagictokens]);

    const processTokens = (tokens: MagicToken[]) => {
        const sortedTokens = tokens.sort(
            (a, b) => (a.priceChange?.h24 || 0 - (b.priceChange?.h24 || 0))
        );
        const top30Tokens = sortedTokens.slice(0, 30);
        setTokens(top30Tokens);
    }

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
        <div className="relative">
            <div className="flex justify-between">
                <h3 className=" dark:text-white text-lg xs:text-xl">AI Magic MagicDip</h3>
                <More url="/dashboards/magic-dip" />
            </div>
            <div className="flex items-center relative">
        <InfiniteScroller direction="right" tokens={tokens} />
      </div>
        </div>
    );
};

export default MagicDip;
