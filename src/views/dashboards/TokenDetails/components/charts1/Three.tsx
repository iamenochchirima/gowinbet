import { LuCopy } from "react-icons/lu";
import { FaRedditAlien, FaTelegramPlane } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { MagicToken, TokenOverviewData } from "@/@types/tokens";
import { useApp } from "@/store/appStore";
import { apiGetTokenOverview } from "@/services/MagicTokensService";
import { FaXTwitter } from "react-icons/fa6";
import { chainConfig, formatNumber } from "./utils";
import { apiAddToWatchlist, apiRemoveFromWatchlist } from "@/services/WatchListServices";
import { toastError, toastSuccess } from "@/utils/notifications";

const Three = () => {
  const [tokenOverview, setTokenOverview] = useState<TokenOverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1H" | "30Min" | "1D">("30Min")
  const { watchListTokens, setWatchListTokens, selectedMagicToken, setSelectedMagicToken } = useApp();

  const isInWatchlist = (token: MagicToken) => {
    if (!watchListTokens.tokens) return false;
    return watchListTokens.tokens.some((t) => t.metadata.mintAddress === token.metadata.mintAddress);
  };

  const getData = useCallback(async (token: MagicToken) => {
    if (!token?.metadata?.mintAddress) {
      console.warn("No valid mintAddress, skipping request");
      return;
    }
    const processingKey = `overview_processing_${token.metadata.mintAddress}`;
    const isProcessing = localStorage.getItem(processingKey);

    if (isProcessing === "true") {
      return;
    }

    localStorage.setItem(processingKey, "true");
    setIsLoading(true);

    try {
      const response = await apiGetTokenOverview(token.metadata.mintAddress);
      if (response) {
        setTokenOverview(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      localStorage.removeItem(processingKey);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedMagicToken) {
      getData(selectedMagicToken);
    }
  }, [getData, selectedMagicToken]);

  const getDataPrivate = useCallback(async (token: MagicToken) => {
    if (!token?.metadata?.mintAddress) {
      console.warn("No valid mintAddress, skipping request");
      return;
    }
    const processingKey = `overview_processing_${token.metadata.mintAddress}`;
    const isProcessing = localStorage.getItem(processingKey);

    if (isProcessing === "true") {
      return;
    }

    localStorage.setItem(processingKey, "true");

    try {
      console.log(`Fetching overview for ${token.metadata.mintAddress}`);
      const response = await apiGetTokenOverview(token.metadata.mintAddress);
      if (response) {
        setTokenOverview(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      localStorage.removeItem(processingKey);
    }
  }, []);


  useEffect(() => {
    if (selectedMagicToken) {
      getDataPrivate(selectedMagicToken);

      const intervalId = setInterval(() => {
        getDataPrivate(selectedMagicToken);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [getDataPrivate, selectedMagicToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tokenOverview || !selectedMagicToken) {
    return <div>No data available</div>;
  }

  const { metadata } = selectedMagicToken;
  const { symbol, name, image, mintAddress, chainId } = metadata;
  const { price, marketCap, liquidity, holder, circulatingSupply, totalSupply, extensions, priceChange24hPercent } = tokenOverview;

  const chain = chainId && chainConfig[chainId] ? chainConfig[chainId] : { name: "Unknown Chain", icon: "/img/coins/default.png" };

  const performanceItems = [
    { value: `${tokenOverview.priceChange30mPercent?.toFixed(2)}%`, label: "30Min" },
    { value: `${tokenOverview.priceChange1hPercent?.toFixed(2)}%`, label: "1H" },
    { value: `${tokenOverview.priceChange24hPercent?.toFixed(2)}%`, label: "1D" },
  ];

  const socials = [
    { icon: <FaXTwitter />, label: "Twitter", url: extensions?.twitter },
    { icon: <FaTelegramPlane />, label: "Telegram", url: extensions?.telegram },
    { icon: <FaRedditAlien />, label: "Reddit", url: extensions?.medium },
  ].filter(social => social.url);

  const circulatingSupplyPercent = (circulatingSupply / totalSupply) * 100;

  const truncateAddress = (address: string) => {
    if (address.length < 6) return address;
    return `${address.slice(0, 15)}...${address.slice(-15)}`;
  };

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

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

  const getTimeframeData = () => {
    switch (selectedTimeframe) {
      case "1H":
        return {
          txns: tokenOverview.trade1h,
          buys: tokenOverview.buy1h,
          sells: tokenOverview.sell1h,
          volume: tokenOverview.v1hUSD,
          volumeBuys: tokenOverview.vBuy1hUSD,
          volumeSells: tokenOverview.vSell1hUSD,
          makers: tokenOverview.uniqueWallet1h,
          txnsChange: tokenOverview.trade1hChangePercent,
          buysChange: tokenOverview.buy1hChangePercent,
          sellsChange: tokenOverview.sell1hChangePercent,
          volumeChange: tokenOverview.v1hChangePercent,
          volumeBuysChange: tokenOverview.vBuy1hChangePercent,
          volumeSellsChange: tokenOverview.vSell1hChangePercent,
          makersChange: tokenOverview.uniqueWallet1hChangePercent,
        };
      case "30Min":
        return {
          txns: tokenOverview.trade30m,
          buys: tokenOverview.buy30m,
          sells: tokenOverview.sell30m,
          volume: tokenOverview.v30mUSD,
          volumeBuys: tokenOverview.vBuy30mUSD,
          volumeSells: tokenOverview.vSell30mUSD,
          makers: tokenOverview.uniqueWallet30m,
          txnsChange: tokenOverview.trade30mChangePercent,
          buysChange: tokenOverview.buy30mChangePercent,
          sellsChange: tokenOverview.sell30mChangePercent,
          volumeChange: tokenOverview.v30mChangePercent,
          volumeBuysChange: tokenOverview.vBuy30mChangePercent,
          volumeSellsChange: tokenOverview.vSell30mChangePercent,
          makersChange: tokenOverview.uniqueWallet30mChangePercent,
        };
      case "1D":
      default:
        return {
          txns: tokenOverview.trade24h,
          buys: tokenOverview.buy24h,
          sells: tokenOverview.sell24h,
          volume: tokenOverview.v24hUSD,
          volumeBuys: tokenOverview.vBuy24hUSD,
          volumeSells: tokenOverview.vSell24hUSD,
          makers: tokenOverview.uniqueWallet24h,
          txnsChange: tokenOverview.trade24hChangePercent,
          buysChange: tokenOverview.buy24hChangePercent,
          sellsChange: tokenOverview.sell24hChangePercent,
          volumeChange: tokenOverview.v24hChangePercent,
          volumeBuysChange: tokenOverview.vBuy24hChangePercent,
          volumeSellsChange: tokenOverview.vSell24hChangePercent,
          makersChange: tokenOverview.uniqueWallet24hChangePercent,
        };
    }
  };

  const timeframeData = getTimeframeData();

  const getNormalizedWidths = (changes: number[]) => {
    const absChanges = changes.map(change => Math.min(Math.abs(change), 50)); // Cap at 50%
    const isIncreases = changes.map(change => change >= 0);
    const baseWidths = isIncreases.map(isIncrease => isIncrease ? 50 : 40); // 50% for increase, 40% for decrease
    const scaleFactors = absChanges.map(change => 1 + (change / 100)); // Scale between 1x and 1.5x
    const rawWidths = baseWidths.map((base, i) => isIncreases[i] ? base * scaleFactors[i] : base / scaleFactors[i]);
    const totalRawWidth = rawWidths.reduce((sum, w) => sum + w, 0);
    // Normalize to 100% and cap individual widths at 75%
    const normalizedWidths = rawWidths.map(width => {
      const proportion = (width / totalRawWidth) * 100;
      return Math.min(proportion, 75); // Cap at 75%
    });
    // Adjust the smallest width to ensure sum is 100%
    const totalNormalized = normalizedWidths.reduce((sum, w) => sum + w, 0);
    if (totalNormalized < 100) {
      const smallestIndex = normalizedWidths.indexOf(Math.min(...normalizedWidths));
      normalizedWidths[smallestIndex] += 100 - totalNormalized;
    }
    return normalizedWidths.map((width, i) => ({
      width: `${width}%`,
      color: isIncreases[i] ? "#38D477" : "#E92550",
    }));
  };

  const txnsWidths = getNormalizedWidths([timeframeData.buysChange, timeframeData.sellsChange]);
  const volumeWidths = getNormalizedWidths([timeframeData.volumeBuysChange, timeframeData.volumeSellsChange]);
  const makersWidths = getNormalizedWidths([timeframeData.buysChange, timeframeData.sellsChange]);

  return (
    <div>
      <div className="bg-[#162C22] rounded-t-lg p-3 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img className="h-5" src={image || "/img/coins/default.png"} alt={symbol || "Token"} />
          <span className="dark:text-white">
            {name || "Unknown Token"} - {symbol || "N/A"}
          </span>
        </div>
        <div className="flex gap-1">
          <button className="bg-primary text-white text-xs py-2 px-1 rounded-lg">
            Invest Now
          </button>
          <button
            onClick={() =>
              isInWatchlist(selectedMagicToken)
                ? handleRemoveFromWatchlist(selectedMagicToken)
                : handleAddToWatchlist(selectedMagicToken)
            }
            disabled={loading}
            className="bg-gray-900 text-white py-2 px-1 text-xs rounded-lg">
            {isInWatchlist(selectedMagicToken) ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl text-white">{price.toFixed(5)}</span>
            <span> USD</span>
          </div>
          <button
            className={`text-white py-2 px-3 text-xs rounded-lg ${priceChange24hPercent >= 0 ? "bg-green-600" : "bg-[#E92550]"}`}
          >
            {priceChange24hPercent >= 0 ? "+" : ""}{formatNumber(priceChange24hPercent)}%
          </button>
        </div>

        <div className="py-3 flex gap-2 justify-between items-center">
          <button className="text-white font-bold flex items-center gap-1 bg-gray-700 p-1 rounded-lg">
            {chain.icon}
            <span>{chain.name}</span>
          </button>

          <button
            className="text-xs flex items-center gap-3 bg-gray-700 p-1 rounded-lg"
            onClick={() => handleCopyAddress(mintAddress)}
            title="Click to copy full address"
            aria-label={`Copy address ${mintAddress}`}
          >
            <span>{truncateAddress(mintAddress)}</span>
            <LuCopy />
          </button>
          {copiedAddress === mintAddress && (
            <span className="left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </div>

        <div className="flex justify-between bg-[#1B1D1F] p-2 border border-gray-600 rounded-lg">
          <div className="flex flex-col gap-3 items-center">
            <span className="text-xs text-gray-400">Market Cap</span>
            <span className="text-white">${formatNumber(marketCap)}</span>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <span className="text-xs text-gray-400">Liquidity</span>
            <span className="text-white">${formatNumber(liquidity)}</span>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <span className="text-xs text-gray-400">Holders</span>
            <span className="text-white">${formatNumber(holder)}</span>
          </div>
        </div>

        <div className="py-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Circulating Supply</span>
                <span className="text-white">{formatNumber(circulatingSupply)} {symbol}</span>
              </div>
              <div className="flex rounded-full bg-gray-700">
                <div
                  className="py-1.5 rounded-full bg-primary"
                  style={{ width: `${circulatingSupplyPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Total Supply</span>
                <span className="text-white">{formatNumber(totalSupply)} {symbol}</span>
              </div>
              <div className="flex rounded-full bg-gray-700">
                <div className="py-1.5 rounded-full w-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span>Performance</span>
          <div className="flex gap-1 py-2">
            {performanceItems.map((item, index) => (
              <button
                key={index}
                className={`flex text-xs py-2 w-full rounded-lg flex-col items-center ${selectedTimeframe === item.label ? "bg-[#38D477]" : "bg-[#162C22]"
                  }`}
                onClick={() => setSelectedTimeframe(item.label as "1H" | "30Min" | "1D")}
              >
                <span className={parseFloat(item.value) >= 0 ? "text-green-700" : "text-red-700"}>
                  {item.value}
                </span>
                <span className="text-white">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="text-xs flex flex-col gap-1">
            <div className="flex gap-1 w-full">
              <div className="flex w-1/4 flex-col gap-1">
                <span>{selectedTimeframe} TXNS</span>
                <span className="text-white font-bold">{formatNumber(timeframeData.txns)}</span>
              </div>
              <div className="w-3/4 flex gap-1">
                <div style={{ width: txnsWidths[0].width }}>
                  <div className="flex p-1 rounded-lg border border-gray-600 flex-col bg-[#162C22]">
                    <span>Buys</span>
                    <span className="text-[#38D477] text-sm font-bold">{formatNumber(timeframeData.buys)}</span>
                  </div>
                </div>
                <div style={{ width: txnsWidths[1].width }}>
                  <div className="flex p-1 text-end rounded-lg border border-gray-600 flex-col bg-[#162C22]">
                    <span>Sells</span>
                    <span className="text-red-700 text-sm font-bold">{formatNumber(timeframeData.sells)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-1 w-full">
              <div className="flex w-1/4 flex-col gap-1">
                <span>{selectedTimeframe} Vol</span>
                <span className="text-white font-bold">${formatNumber(timeframeData.volume / 1_000_000)}M</span>
              </div>
              <div className="w-3/4 flex gap-1">
                <div style={{ width: volumeWidths[0].width }}>
                  <div className="flex p-1 rounded-lg border border-gray-600 flex-col bg-[#162C22]">
                    <span>Buys</span>
                    <span className="text-[#38D477] text-sm font-bold">
                      ${formatNumber(timeframeData.volumeBuys / 1_000_000)}M
                    </span>
                  </div>
                </div>
                <div style={{ width: volumeWidths[1].width }}>
                  <div className="flex p-1 text-end rounded-lg border border-gray-600 flex-col bg-[#162C22]">
                    <span>Sells</span>
                    <span className="text-red-700 text-sm font-bold">
                      ${formatNumber(timeframeData.volumeSells / 1_000_000)}M
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-1 w-full">
              <div className="flex w-1/4 flex-col gap-1">
                <span>{selectedTimeframe} Makers</span>
                <span className="text-white font-bold">{formatNumber(timeframeData.makers)}</span>
              </div>
              <div className="w-3/4 flex gap-1">
                <div style={{ width: makersWidths[0].width }}>
                  <div className="flex p-1 rounded-lg border border-gray-600 flex-col bg-[#162C22]">
                    <span>Buys</span>
                    <span className="text-[#38D477] text-sm font-bold">{formatNumber(timeframeData.buys)}</span>
                  </div>
                </div>
                <div style={{ width: makersWidths[1].width }}>
                  <div className="flex p-1 text-end rounded-lg border border-gray-600 flex-col bg-[#162C22]">
                    <span>Sells</span>
                    <span className="text-red-700 text-sm font-bold">{formatNumber(timeframeData.sells)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-3 flex gap-2">
            <button className="bg-[#162C22] w-full text-gray-200 py-3 border border-gray-600 rounded-lg">
              MOVE DOWN
            </button>
            <button className="bg-[#162C22] w-full text-gray-200 p-3 border border-gray-600 rounded-lg">
              MOVE UP
            </button>
          </div>

          <div className="pt-3">
            <span>Socials</span>
            <div className="pt-3 flex justify-between gap-1">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url ? social.url : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 flex items-center gap-2 py-2 px-4 rounded-lg"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Three;