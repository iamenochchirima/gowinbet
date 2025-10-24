import Loading from '@/components/shared/Loading'
import TokensSection from '../WatchlistDashboard/components/TokensSection'
import { useEffect, useState } from 'react'
import { TokensPaginated } from '@/@types/tokens'
import {  apiGetMagicDip } from '@/services/MagicTokensService'


const MagicDipDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [paginatedTokens, setPaginatedTokens] = useState<TokensPaginated>({
    tokens: [],
    total: 0,
    offset: 0,
    limit: 50,
    page: 1,
    totalPages: 0,
  });

  useEffect(() => {
    if (paginatedTokens.tokens.length === 0) {
      getAiMagicdDip(paginatedTokens.offset);
    }
  }, []);

  const getAiMagicdDip = async (offset: number) => {
    setLoading(true);
    try {
      const response = await apiGetMagicDip(offset, paginatedTokens.limit);
      if (response) {
        setPaginatedTokens(response);
      }
    } catch (error) {
      console.log("Error in getting magic radar tokens", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newOffset: number) => {
    getAiMagicdDip(newOffset);
  };
  return (
    <Loading loading={isLoading}>
      {paginatedTokens.tokens.length > 0 ? (
        <>
          <TokensSection
            paginatedTokens={paginatedTokens}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl text-gray-500">No tokens in watchlist</p>
        </div>
      )}
    </Loading>
  )
}

export default MagicDipDashboard
