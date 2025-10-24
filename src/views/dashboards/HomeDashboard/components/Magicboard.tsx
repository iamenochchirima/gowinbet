import More from "./More"
import Switch from "./Switcher"
import TokensRow from "./TokensRow"
import { useState } from "react";
import { apiGetGainersLosersRisky, apiGetTrendingTokens } from "@/services/MagicTokensService";
import { GainersLosersRisky, MagicToken, TokensPaginated } from "@/@types/tokens";
import useSWR from 'swr';
import MagicVestRealTime from "./MagicVestRealTime";

const TRENDING_TOKENS_KEY = 'magicboard_trending_tokens';
const GLR_TOKENS_KEY = 'magicboard_glr_tokens';

const Magicboard = () => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers' | 'risky'>('gainers');

  // Helper function to get data from localStorage
  const getCachedData = <T,>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  };

  // Helper function to cache data
  const cacheData = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // Fetch trending tokens with SWR
  const { data: trendingData } = useSWR(
    'trending-tokens',
    async () => {
      const response = await apiGetTrendingTokens(0, 50); // Using fixed offset/limit
      if (response) {
        const sortedTokens = response.tokens.sort((a, b) => a.rank - b.rank);
        const top30Tokens = sortedTokens.slice(0, 5);
        const result = {
          ...response,
          tokens: top30Tokens,
          offset: 0,
          limit: 50,
          page: 1,
        };
        cacheData(TRENDING_TOKENS_KEY, result);
        return result;
      }
      return null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
      fallbackData: getCachedData<TokensPaginated>(TRENDING_TOKENS_KEY),
    }
  );

  // Fetch gainers/losers/risky with SWR
  const { data: glrData } = useSWR(
    'gainers-losers-risky',
    async () => {
      const response = await apiGetGainersLosersRisky();
      if (response) {
        const sortedTokens = response.data.gainers.sort((a, b) => a.rank - b.rank);
        const top5Tokens = sortedTokens.slice(0, 5);
        const top5Losers = response.data.losers.sort((a, b) => a.rank - b.rank).slice(0, 5);
        const sortedRisky = response.data.risky.sort((a, b) => a.rank - b.rank);
        const top5Risky = sortedRisky.slice(0, 5);
        const result = {
          gainers: top5Tokens,
          losers: top5Losers,
          risky: top5Risky,
        };
        cacheData(GLR_TOKENS_KEY, result);
        return result;
      }
      return null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
      fallbackData: getCachedData<GainersLosersRisky>(GLR_TOKENS_KEY),
    }
  );

  // Use data directly from SWR or fallback to cached/default values
  const trending = trendingData || getCachedData<TokensPaginated>(TRENDING_TOKENS_KEY) || {
    tokens: [],
    total: 0,
    offset: 0,
    limit: 50,
    page: 1,
    totalPages: 0,
  };

  const glr = glrData || getCachedData<GainersLosersRisky>(GLR_TOKENS_KEY) || null;

  const getDisplayedTokens = () => {
    if (!glr) return [];
    switch (activeTab) {
      case 'gainers':
        return glr.gainers;
      case 'losers':
        return glr.losers;
      case 'risky':
        return glr.risky;
      default:
        return glr.gainers;
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-xl sm:text-2xl">Magicboard</h3>
        <Switch />
      </div>
      <div className="grid grid-cols-1 gap-3 mt-3 2md:grid-cols-2 llg:grid-cols-3">
        <div className=" p-3 bg-gray-800 border border-gray-700 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex gap-1  dark:dark:text-white  items-center">
              <img src="/img/others/fire.png" alt="Fire" className="h-3.5 " />
              <span>
                AI Trending
              </span>
            </div>
            <More url="/dashboards/trending" />
          </div>
          <div className="mt-2">
            {trending.tokens.map((token: MagicToken, index: number) => (
              <TokensRow key={index} token={token} />
            ))}
          </div>
        </div>
        <div className="p-3 bg-gray-800 border border-gray-700 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex text-xs gap-2 border border-gray-700 p-0.5 rounded-full items-center">
              <button
                className={`rounded-full p-2 ${activeTab === 'gainers' ? 'bg-gray-700' : 'bg-transparent'}`}
                onClick={() => setActiveTab('gainers')}
              >
                Daily gainers
              </button>
              <button
                className={`rounded-full p-2 ${activeTab === 'losers' ? 'bg-gray-700' : 'bg-transparent'}`}
                onClick={() => setActiveTab('losers')}
              >
                Daily losers
              </button>
              <button
                className={`rounded-full p-2 ${activeTab === 'risky' ? 'bg-gray-700' : 'bg-transparent'}`}
                onClick={() => setActiveTab('risky')}
              >
                Daily Risk Token
              </button>
            </div>
            <More url="/dashboards/gainers-losers" />
          </div>
          <div className="mt-2">
            {getDisplayedTokens().map((token: MagicToken, index: number) => (
              <TokensRow key={index} token={token} />
            ))}
          </div>
        </div>
        <MagicVestRealTime />
      </div>
    </div>
  )
}

export default Magicboard