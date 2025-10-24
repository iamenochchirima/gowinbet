import {
  apiGetHistory,
  apiGetLatest,
  apiGetSymbol,
} from "@/services/TredeView";
import { getSelectedTokenFromStorage, transformResponseToBars } from "./utils";
import {
  Bar,
  LibrarySymbolInfo,
  SearchSymbolsCallback,
  HistoryCallback,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback,
} from "@/charting_library/datafeed-api";
import { IBasicDataFeed } from "@/charting_library/charting_library";

interface Configuration {
  supported_resolutions: ResolutionString[];
  supports_marks?: boolean;
  supports_timescale_marks?: boolean;
}

interface HistoryResponse {
  s: string;
  t: number[];
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
}

interface HistoryCallbackMeta {
  noData: boolean;
}

interface CacheItem {
  timestamp: number;
  data: HistoryResponse;
}

export default class Datafeed implements IBasicDataFeed {
  private baseUrl: string;
  private pollingIntervalId?: NodeJS.Timeout;
  private historyCache: Record<string, CacheItem> = {};
  private readonly CACHE_EXPIRY_MS = 5000; // 5 * 60 * 1000;
  private readonly CACHE_KEY = "tradingview_history_cache";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadCacheFromStorage();
  }

  private loadCacheFromStorage(): void {
    try {
      const savedCache = localStorage.getItem(this.CACHE_KEY);
      if (savedCache) {
        this.historyCache = JSON.parse(savedCache);
      }
    } catch (e) {
      console.warn("Failed to load cache from localStorage", e);
    }
  }

  private selectedToken = getSelectedTokenFromStorage();

  private saveCacheToStorage(): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.historyCache));
    } catch (e) {
      console.warn("Failed to save cache to localStorage", e);
    }
  }

  private isValidTimeRange(from: number, to: number): boolean {
    if (from <= 0 || to <= 0) return false;
    if (to <= from) return false;
    const maxRangeDays = 365 * 2; // 2 years max
    if (to - from > maxRangeDays * 24 * 60 * 60) return false;
    return true;
  }

  onReady(callback: (config: Configuration) => void): void {
    setTimeout(
      () =>
        callback({
          supported_resolutions: [
            "1",
            "5",
            "15",
            "60",
            "1D",
            "1W",
            "1M",
          ] as ResolutionString[],
          supports_marks: true,
          supports_timescale_marks: true,
        }),
      0
    );
  }

  resolveSymbol(
    symbolName: string,
    onResolve: (symbolInfo: LibrarySymbolInfo) => void,
    onError: (reason: string) => void,
    extension?: any
  ): void {
    const selectedToken = getSelectedTokenFromStorage();

    if (!selectedToken || !selectedToken.metadata?.mintAddress) {
      onError("Selected token is not valid or does not have a mint address");
      return;
    }

    try {
      const symbolInfo: LibrarySymbolInfo = {
        name: selectedToken.metadata.name || symbolName,
        ticker: selectedToken.metadata.symbol || symbolName,
        description:
          selectedToken.metadata.description || `${symbolName}`,
        type: "crypto",
        session: "24x7",
        minmov: 0.000001,
        pricescale: selectedToken.metadata.decimals
          ? Math.pow(10, selectedToken.metadata.decimals)
          : 1000000,
        timezone: "Etc/UTC",
        supported_resolutions: [
          "5",
          "15",
          "60",
          "1D",
          "1W",
          "1M",
        ] as ResolutionString[],
        exchange: selectedToken.metadata.dex || "Global",
        listed_exchange: selectedToken.metadata.dex || "Global",
        format: "price",
        has_intraday: true,
        intraday_multipliers: ["1", "5", "15", "60"],
        has_daily: true,
        has_weekly_and_monthly: true,
        volume_precision: 2,
        minmove2: 0,
        currency_code: selectedToken.metadata.priceNative ? "Native" : "USD",
      };

    setTimeout(() => {
      onResolve(symbolInfo);
    }, 0);
    } catch (err: any) {
      onError(typeof err === "string" ? err : err?.message || "Unknown error");
    }
  }
  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: (reason: string) => void
  ): void {
    if (!symbolInfo?.ticker) {
      onError("Invalid symbol: ticker is undefined");
      return;
    }

    if (!this.isValidTimeRange(periodParams.from, periodParams.to)) {
      console.warn(
        `Invalid time range: from=${periodParams.from}, to=${periodParams.to}`
      );
      onResult([], { noData: true });
      return;
    }

    const normalizeResolution = (res: ResolutionString): string => {
      const supportedResolutions = ["1", "5", "15", "60", "1D", "1W", "1M"];
      return supportedResolutions.includes(res) ? res : "1D";
    };

    const normalizedResolution = normalizeResolution(resolution);
    const cacheKey = `${symbolInfo.ticker}-${normalizedResolution}`;
    const now = Date.now();

    const validateBars = (bars: Bar[]): Bar[] => {
      return bars.filter((bar) => {
        const isValid =
          typeof bar.time === "number" &&
          !isNaN(bar.time) &&
          bar.time > 0 &&
          Number.isInteger(bar.time) &&
          typeof bar.open === "number" &&
          !isNaN(bar.open) &&
          bar.open >= 0 &&
          typeof bar.high === "number" &&
          !isNaN(bar.high) &&
          bar.high >= 0 &&
          typeof bar.low === "number" &&
          !isNaN(bar.low) &&
          bar.low >= 0 &&
          typeof bar.close === "number" &&
          !isNaN(bar.close) &&
          bar.close >= 0 &&
          (bar.volume === undefined ||
            (typeof bar.volume === "number" &&
              !isNaN(bar.volume) &&
              bar.volume >= 0));
        if (!isValid) {
          console.warn(
            `Invalid bar for ${symbolInfo.ticker} (resolution: ${normalizedResolution}):`,
            bar
          );
        }
        return isValid;
      });
    };

    if (
      this.historyCache[cacheKey] &&
      now - this.historyCache[cacheKey].timestamp < this.CACHE_EXPIRY_MS
    ) {
      const data = this.historyCache[cacheKey].data;
      const bars = validateBars(transformResponseToBars(data)).filter(
        (bar) =>
          bar.time >= periodParams.from * 1000 &&
          bar.time <= periodParams.to * 1000
      );
      onResult(bars, { noData: bars.length === 0 });
      return;
    }

    const expandedFrom = Math.max(
      periodParams.from - 7 * 24 * 60 * 60,
      Math.floor(Date.now() / 1000) - 365 * 2 * 24 * 60 * 60
    );
    const expandedTo = Math.min(
      periodParams.to + 7 * 24 * 60 * 60,
      Math.floor(Date.now() / 1000)
    );

    if (!this.selectedToken || !this.selectedToken.metadata?.mintAddress) {
      onError("Selected token is not valid or does not have a mint address");
      return;
    }

    apiGetHistory({
      symbol: this.selectedToken.metadata.mintAddress,
      from: expandedFrom,
      to: expandedTo,
      resolution: normalizedResolution,
    })
      .then((data: HistoryResponse) => {
        this.historyCache[cacheKey] = {
          timestamp: now,
          data,
        };
        this.saveCacheToStorage();
        const bars = validateBars(transformResponseToBars(data)).filter(
          (bar) =>
            bar.time >= periodParams.from * 1000 &&
            bar.time <= periodParams.to * 1000
        );
        onResult(bars, { noData: bars.length === 0 });
      })
      .catch((err) => {
        console.error(`Failed to fetch data for ${symbolInfo.ticker}:`, err);
        onError(
          typeof err === "string"
            ? err
            : err?.message || `Failed to fetch data for ${symbolInfo.ticker}`
        );
      });
  }

  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onRealtimeCallback: SubscribeBarsCallback,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ): void {
    const POLLING_INTERVAL_MS = 60000;

    const normalizeResolution = (res: ResolutionString): string => {
      const supportedResolutions = ["1", "5", "15", "60", "1D", "1W", "1M"];
      return supportedResolutions.includes(res) ? res : "1D";
    };

    const normalizedResolution = normalizeResolution(resolution);

    const validateBar = (bar: Bar): boolean => {
      const isValid =
        typeof bar.time === "number" &&
        !isNaN(bar.time) &&
        bar.time > 0 &&
        Number.isInteger(bar.time) &&
        bar.time >= Date.now() - 365 * 24 * 60 * 60 * 1000 &&
        typeof bar.open === "number" &&
        !isNaN(bar.open) &&
        bar.open >= 0 &&
        typeof bar.high === "number" &&
        !isNaN(bar.high) &&
        bar.high >= 0 &&
        typeof bar.low === "number" &&
        !isNaN(bar.low) &&
        bar.low >= 0 &&
        typeof bar.close === "number" &&
        !isNaN(bar.close) &&
        bar.close >= 0 &&
        (bar.volume === undefined ||
          (typeof bar.volume === "number" &&
            !isNaN(bar.volume) &&
            bar.volume >= 0));
      if (!isValid) {
        console.warn(
          `Invalid bar in subscribeBars for ${symbolInfo.ticker} (resolution: ${normalizedResolution}):`,
          bar
        );
      }
      return isValid;
    };

    const poll = () => {
      if (!symbolInfo.ticker) {
        console.error("Polling error: ticker is undefined");
        onResetCacheNeededCallback();
        return;
      }

      if (!this.selectedToken || !this.selectedToken.metadata?.mintAddress) {
        console.error(
          "Selected token is not valid or does not have a mint address"
        );
        return;
      }

      apiGetLatest({
        symbol: this.selectedToken.metadata.mintAddress,
        resolution: normalizedResolution,
      })
        .then((data: any) => {
          if (
            data &&
            typeof data.time === "number" &&
            !isNaN(data.time) &&
            typeof data.open === "number" &&
            !isNaN(data.open) &&
            typeof data.high === "number" &&
            !isNaN(data.high) &&
            typeof data.low === "number" &&
            !isNaN(data.low) &&
            typeof data.close === "number" &&
            !isNaN(data.close)
          ) {
            const bar: Bar = {
              time: data.time,
              open: data.open,
              high: data.high,
              low: data.low,
              close: data.close,
              volume:
                typeof data.volume === "number" && !isNaN(data.volume)
                  ? data.volume
                  : undefined,
            };
            if (validateBar(bar)) {
              onRealtimeCallback(bar);
            } else {
              console.error("Skipping invalid bar:", bar);
              onResetCacheNeededCallback();
            }
          } else {
            console.error("Invalid data from apiGetLatest:", data);
            onResetCacheNeededCallback();
          }
        })
        .catch((err) => {
          console.error(`Polling error for ${symbolInfo.ticker}:`, err);
          onResetCacheNeededCallback();
        });
    };

    poll();
    const intervalId = setInterval(poll, POLLING_INTERVAL_MS);
    this.pollingIntervalId = intervalId;
  }
  unsubscribeBars(subscriberUID: string): void {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);
      this.pollingIntervalId = undefined;
    }
  }

  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback
  ): void {
    apiGetSymbol(userInput)
      .then((data) => {
        const results = Array.isArray(data)
          ? data.map((item: any) => ({
              symbol: item.ticker,
              full_name: item.name,
              description: item.description,
              exchange: item.exchange || "Global",
              type: item.type || "crypto",
            }))
          : [];
        onResult(results);
      })
      .catch((err) => {
        console.error("Search error:", err.message);
        onResult([]);
      });
  }

  clearCache(): void {
    this.historyCache = {};
    localStorage.removeItem(this.CACHE_KEY);
  }
}
