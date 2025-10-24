import { FaCircleInfo } from "react-icons/fa6";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { useThemeStore } from "@/store/themeStore";
import { FC, useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import "../../../assets/styles/components/magic-table.css";
import { AiOutlineLink } from "react-icons/ai";
import { GrSearch } from "react-icons/gr";
import { CiFilter } from "react-icons/ci";
import SelectMenuTable from "./SelectMenuTable";
import { MagicToken, TokensPaginated } from "@/@types/tokens"; // Adjust path
import { formatAmount } from "../../../utils/tokens";
import ProgressCircle from "./ProgressCircle";
import { toastError, toastSuccess } from "@/utils/notifications";
import { apiAddToWatchlist, apiRemoveFromWatchlist } from "@/services/WatchListServices";
import { useApp } from "@/store/appStore";
import { useNavigate } from "react-router-dom";

type Props = {
  paginatedTokens: TokensPaginated;
  onPageChange: (newOffset: number) => void;
};

const MagicTokensTable: FC<Props> = ({ paginatedTokens, onPageChange }) => {
  const { tokens, total, offset, limit, page, totalPages } = paginatedTokens;
  const sideNavCollapse = useThemeStore((state) => state.layout.sideNavCollapse);
  const [screenW, setScreenW] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const { watchListTokens, setWatchListTokens, setSelectedMagicToken } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenW(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldHideButtons = screenW < 1475 && !sideNavCollapse;

  const handleAddToWatchlist = async (token: MagicToken) => {
    setLoading(true);
    try {
      const res = await apiAddToWatchlist(token);
      if (res) {
        toastSuccess("Added to watchlist");
        setWatchListTokens({
          ...watchListTokens,
          tokens: [...watchListTokens.tokens, token]
        });
      }
    } catch (error) {
      toastError("Failed to add to watchlist");
      console.log("Failed to add to watchlist", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (token: MagicToken) => {
    setLoading(true);
    try {
      const res = await apiRemoveFromWatchlist(token.metadata.mintAddress);
      if (!res) {
        toastError("Failed to remove from watchlist");
        return;
      }
      
      const newWatchlist = watchListTokens.tokens.filter(
        (t) => t.metadata.mintAddress !== token.metadata.mintAddress
      );
      setWatchListTokens({ ...watchListTokens, tokens: newWatchlist });
      toastSuccess("Removed from watchlist");
    } catch (error) {
      toastError("Failed to remove from watchlist");
      console.log("Failed to remove from watchlist", error);
    } finally {
      setLoading(false);
    }
  };

  const isInWatchlist = (token: MagicToken) => {
    if (!watchListTokens.tokens) return false;
    return watchListTokens.tokens.some((t) => t.metadata.mintAddress === token.metadata.mintAddress);
  };

  const handleTokenClicked = (token: MagicToken) => {
    setSelectedMagicToken(token);
    navigate("/dashboards/token-details");
  };


  const handlePrevious = () => {
    if (offset > 0) {
      onPageChange(offset - limit);
    }
  };

  const handleNext = () => {
    if (offset + limit < total) {
      onPageChange(offset + limit);
    }
  };

  const handlePageClick = (pageNum: number) => {
    const newOffset = (pageNum - 1) * limit;
    onPageChange(newOffset);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, page - halfRange);
    let endPage = Math.min(totalPages, page + halfRange);

    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === page ? "bg-primary text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  
  return (
    <>
      <div className="flex mb-5 justify-between items-center">
        <div className="flex gap-3">
          <SelectMenuTable />
          <button className="bg-gray-800 border text-xs flex items-center gap-2 rounded-2xl border-gray-700 px-4 py-2 xs2:text-sm shadow-sm hover:bg-gray-700">
            <AiOutlineLink />
            <span>All Chain</span>
          </button>
          <button className="bg-gray-800 hidden border 2md:flex items-center gap-3 rounded-2xl border-gray-700 pl-4 pr-40 py-2 text-sm shadow-sm hover:bg-gray-700">
            <GrSearch size={17} />
            <span className="text-xs text-nowrap">Filter by name / symbol / Address</span>
          </button>
        </div>
        <button className="bg-gray-800 border text-xs flex items-center gap-2 rounded-2xl border-gray-700 px-4 py-2 xs2:text-sm shadow-sm hover:bg-gray-700">
          <CiFilter size={20} />
          <span>Filters</span>
        </button>
      </div>
      <button className="bg-gray-800 2md:hidden w-full border flex items-center gap-3 rounded-2xl border-gray-700 pl-4 py-2 text-sm shadow-sm hover:bg-gray-700">
        <GrSearch size={17} />
        <span className="text-xs text-nowrap">Filter by name / symbol / Address</span>
      </button>
      <table className="w-full">
        <thead className="py-3 px-6">
          <tr className="border-gray-700 items-center">
            <th className="px-1 text-left">
              <div className="py-4 px-2">#</div>
            </th>
            <th className="px-1 py-4 text-left">
              <div className="flex items-center gap-0.5 flex-nowrap">
                <span className="text-gray-200">Pair</span>
                <FaCircleInfo className="text-gray-500" />
                <RiExpandUpDownFill size={17} className="text-gray-500" />
              </div>
            </th>
            <th className="px-1 py-4 text-left">
              <div className="flex items-center gap-0.5">
                <span className="text-gray-200">Price</span>
                <FaCircleInfo className="text-gray-500" />
                <RiExpandUpDownFill size={17} className="text-gray-500" />
              </div>
            </th>
            <th className="px-1 py-4 text-left">
              <div className="flex items-center gap-0.5">
                <span className="text-gray-200">% 24</span>
                <FaCircleInfo className="text-gray-500" />
                <RiExpandUpDownFill size={17} className="text-gray-500" />
              </div>
            </th>
            {screenW > 620 && (
              <th className="px-1 py-4 text-left">
                <div className="flex items-center gap-0.5">
                  <span className="text-gray-200">PNL</span>
                  <FaCircleInfo className="text-gray-500" />
                  <RiExpandUpDownFill size={17} className="text-gray-500" />
                </div>
              </th>
            )}
            {!(shouldHideButtons || screenW < 1200) && (
              <th className="px-1 py-4 text-left">
                <div className="flex items-center gap-0.5">
                  <span className="text-gray-200">Magic Score</span>
                  <FaCircleInfo className="text-gray-500" />
                  <RiExpandUpDownFill size={17} className="text-gray-500" />
                </div>
              </th>
            )}
            {!(shouldHideButtons || screenW < 1200) && (
              <th className="px-1 py-4 text-left">
                <div className="flex items-center gap-0.5">
                  <span className="text-gray-200">Long/Short</span>
                  <FaCircleInfo className="text-gray-500" />
                  <RiExpandUpDownFill size={17} className="text-gray-500" />
                </div>
              </th>
            )}
            {screenW > 620 && (
              <th className="px-1 py-4 text-left">
                <div className="flex items-center gap-0.5">
                  <span className="text-gray-200">Created</span>
                  <FaCircleInfo className="text-gray-500" />
                  <RiExpandUpDownFill size={17} className="text-gray-500" />
                </div>
              </th>
            )}
            {!(shouldHideButtons || screenW < 1000) && (
              <>
                <th className="px-1 py-4 text-left">
                  <div className="flex items-center gap-0.5">
                    <span className="text-gray-200">Volume</span>
                    <FaCircleInfo className="text-gray-500" />
                    <RiExpandUpDownFill size={17} className="text-gray-500" />
                  </div>
                </th>
                <th className="px-1 py-4 text-left">
                  <div className="flex items-center gap-0.5">
                    <span className="text-gray-200">Holders</span>
                    <FaCircleInfo className="text-gray-500" />
                    <RiExpandUpDownFill size={17} className="text-gray-500" />
                  </div>
                </th>
                <th className="px-1 py-4 text-left">
                  <div className="flex items-center gap-0.5">
                    <span className="text-gray-200">Liquidity</span>
                    <FaCircleInfo className="text-gray-500" />
                    <RiExpandUpDownFill size={17} className="text-gray-500" />
                  </div>
                </th>
              </>
            )}
            {screenW > 620 && (
              <>
                <th className="px-1 py-4 text-left">
                  <div className="flex items-center gap-0.5">
                    <span className="text-gray-200">Market Cap</span>
                    <FaCircleInfo className="text-gray-500" />
                    <RiExpandUpDownFill size={17} className="text-gray-500" />
                  </div>
                </th>
                <th className="px-1 py-4 text-left">
                  <div className="flex items-center gap-0.5">
                    <span className="text-gray-200">DEX</span>
                    <FaCircleInfo className="text-gray-500" />
                    <RiExpandUpDownFill size={17} className="text-gray-500" />
                  </div>
                </th>
              </>
            )}
            <th className="px-1 py-4 text-left">
              <span className="text-gray-200">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens && tokens.length > 0 ? (
            tokens.map((item, index) => (
              <tr
                key={item.metadata.mintAddress}
                className="border border-gray-700 text-xs cursor-pointer"
              >
                <td onClick={() => handleTokenClicked(item)} className="px-1 py-3">
                  <div className="flex text-gray-200 items-center">
                    <span>#{item.rank || index + 1 + offset}</span>
                    <MdKeyboardDoubleArrowUp />
                  </div>
                </td>
                <td onClick={() => handleTokenClicked(item)} className="px-1 gap-1 py-3">
                  <div className="flex items-center gap-1">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={item.metadata.image}
                      alt="Pair image"
                    />
                    <div>
                      <span className="text-gray-200">{item.metadata.symbol}</span>/SOL
                    </div>
                  </div>
                </td>
                <td onClick={() => handleTokenClicked(item)} className="px-1 text-gray-200 py-3">
                  ${Number(item.metadata.priceUsd).toFixed(6)}
                </td>
                <td
                  className={`px-1 py-3 ${
                    item.priceChange?.h24?.toString(2)?.startsWith("-")
                      ? "text-red-500"
                      : "text-green-300"
                  }`}
                >
                  {item?.priceChange?.h24 ? item.priceChange.h24.toFixed(2) : "--"}
                </td>
                {screenW > 620 && (
                  <td
                    className={`px-1 py-3 ${
                      item.pnl?.startsWith("-") ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.pnl || "--"}
                  </td>
                )}
                {!(shouldHideButtons || screenW < 1200) && (
                  <td className="px-1 py-3">
                    <ProgressCircle width={30} height={30} value={item.magicScore} strokeWidth={15} />
                  </td>
                )}
                {!(shouldHideButtons || screenW < 1200) && (
                  <td className="px-1 py-3">
                    <img src="/img/others/chart2.png" alt="Chart icon" className="h-5 w-5" />
                  </td>
                )}
                {screenW > 620 && (
                  <td className="px-1 text-gray-200 py-3">
                    {item.metadata.creationDate
                      ? new Date(item.metadata.creationDate).toLocaleDateString()
                      : "--"}
                  </td>
                )}
                {!(shouldHideButtons || screenW < 1000) && (
                  <>
                    <td className="px-1 text-gray-200 py-3">
                      ${formatAmount(item.volume.h24, item)}
                    </td>
                    <td className="px-1 text-gray-200 py-3">
                      {item.holders ? item.holders : "--"}
                    </td>
                    <td className="px-1 text-gray-200 py-3">
                      {formatAmount(item.liquidity?.usd, item)}
                    </td>
                  </>
                )}
                {screenW > 620 && (
                  <>
                    <td className="px-1 text-gray-200 py-3">
                      ${formatAmount(item.metadata.marketCap, item)}
                    </td>
                    <td className="px-1 py-3">{item.metadata.dex || "--"}</td>
                  </>
                )}
                <td className="px-1 py-3">
                  <div className="flex items-center">
                    <img src="/img/others/chartIcon.png" alt="Chart icon" className="h-5 w-5" />
                    <button
                      onClick={() =>
                        isInWatchlist(item)
                          ? handleRemoveFromWatchlist(item)
                          : handleAddToWatchlist(item)
                      }
                      className="p-1"
                      disabled={loading}
                    >
                      <FaStar
                        size={18}
                        className={`${isInWatchlist(item) ? "text-primary" : "text-gray-200"}`}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={14} className="text-center py-4 text-gray-200">
                No tokens available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {total > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-200 text-sm">
            Showing {offset + 1} - {Math.min(offset + limit, total)} of {total} tokens
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className={`px-4 py-2 rounded ${
                offset === 0
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNext}
              disabled={offset + limit >= total}
              className={`px-4 py-2 rounded ${
                offset + limit >= total
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MagicTokensTable;