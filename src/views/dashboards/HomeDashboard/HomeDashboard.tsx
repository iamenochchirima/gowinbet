import Loading from '@/components/shared/Loading';
import Radar from './components/Radar';
import Live from './components/Live';
import Magicboard from './components/Magicboard';
import MagicDip from './components/MagicDip';
import MagicTable from './components/MagicTable';
import { useEffect, useState, useMemo } from 'react';
import { apiGetMagicRadar } from '@/services/MagicTokensService';
import { TokensPaginated } from '@/@types/tokens';
import { useApp } from '@/store/appStore';
import useSWR from 'swr';

const MAGIC_RADAR_TOKENS_KEY = 'magic_radar_tokens';

const HomeDashboard = () => {
  const { setAimagictokens } = useApp((state) => state);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(50); // Limit is constant, so no need for state updates
  const [paginatedTokens, setPaginatedTokens] = useState<TokensPaginated>({
    tokens: [],
    total: 0,
    offset: 0,
    limit: 50,
    page: 1,
    totalPages: 0,
  });

  const getCachedData = <T,>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  };

  const cacheData = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const swrKey = `magic-radar-tokens-${offset}-${limit}`;

  const { data: radarData, error: radarError, isValidating } = useSWR(
    swrKey,
    async () => {
      const response = await apiGetMagicRadar(offset, limit);
      if (response) {
        cacheData(MAGIC_RADAR_TOKENS_KEY, response);
        setAimagictokens(response.tokens);
        return response;
      }
      return null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
      fallbackData: getCachedData<TokensPaginated>(MAGIC_RADAR_TOKENS_KEY),
    }
  );

  useEffect(() => {
    if (radarData && JSON.stringify(radarData) !== JSON.stringify(paginatedTokens)) {
      setPaginatedTokens(radarData);
    }
  }, [radarData, paginatedTokens]);

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset); 
  };


  const memoizedPaginatedTokens = useMemo(
    () => ({
      ...paginatedTokens,
      offset,
      limit,
      page: Math.floor(offset / limit) + 1,
      totalPages: paginatedTokens.total ? Math.ceil(paginatedTokens.total / limit) : 0,
    }),
    [paginatedTokens, offset, limit]
  );

  return (
    <Loading loading={!radarData && isValidating}>
      {memoizedPaginatedTokens.tokens && Array.isArray(memoizedPaginatedTokens.tokens) && memoizedPaginatedTokens.tokens.length > 0 ? (
        <div className="">
          <div className="flex flex-col gap-4 max-w-full overflow-x-hidden">
            <Radar />
            <Live />
            <Magicboard />
            <MagicDip />
            <MagicTable
              paginatedTokens={memoizedPaginatedTokens}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-200 py-8">
          No tokens available
        </div>
      )}
    </Loading>
  );
};

export default HomeDashboard;