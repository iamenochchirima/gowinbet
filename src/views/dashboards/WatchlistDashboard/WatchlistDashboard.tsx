import Loading from '@/components/shared/Loading';
import WatchlistTokens from "./components/WatchlistTokens";
import TokensSection from "./components/TokensSection"; // Assuming this is MagicTokensTable
import { useEffect, useState } from "react";
import { useApp } from "@/store/appStore";
import { apiGetWatchlist } from '@/services/WatchListServices';
import { TokensPaginated } from '@/@types/tokens';

const WatchlistDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { watchListTokens, setWatchListTokens } = useApp();


  useEffect(() => {
    getWatchlistTokens(0); 
  }, []);

  const getWatchlistTokens = async (offset: number) => {
    setLoading(true);
    try {
      const response = await apiGetWatchlist(offset, watchListTokens.limit )
      console.log("Watchlist paginated response:", response);
      if (response && response.tokens) {
        setWatchListTokens(response); 
      }
    } catch (error) {
      console.log("Error in getting watchlist tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newOffset: number) => {
    getWatchlistTokens(newOffset); 
  };

  console.log("Watchlist tokens:", watchListTokens);

  return (
    <Loading loading={isLoading}>
      {watchListTokens.tokens?.length > 0 ? (
        <>
          <WatchlistTokens />
          <TokensSection
            paginatedTokens={watchListTokens}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl text-gray-500">No tokens in watchlist</p>
        </div>
      )}
    </Loading>
  );
};

export default WatchlistDashboard;