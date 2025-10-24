import { useRef, useEffect, useState } from "react";
import CryptoCard from "./CryptoCard";
import More from "./More";
import { MagicToken, TokensPaginated } from "@/@types/tokens";
import InfiniteScroller from "./InfiniteScroller";
import { useApp } from "@/store/appStore";
import { apiGetLatestTokens } from "@/services/MagicTokensService";
const Radar = () => {
  const [tokens, setTokens] = useState<TokensPaginated>({
    tokens: [],
    offset: 0,
    limit: 100,
    total: 0,
    page: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    getLatestTokens(0); 
  }, []);

   const getLatestTokens = async (offset: number) => {
      setLoading(true);
      try {
        const response = await apiGetLatestTokens(offset, tokens.limit )
        if (response && response.tokens) {
          setTokens(response); 
        }
      } catch (error) {
        console.log("Error in getting latest tokens:", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="relative">
      <div className="flex justify-between">
        <h3 className="dark:text-white text-xl">AI Magic Radar</h3>
        <More url="/dashboards/magic-radar" />
      </div>
      <div className="flex items-center relative">
        <InfiniteScroller direction="left" tokens={tokens.tokens} />
      </div>
    </div>
  );
};

export default Radar;