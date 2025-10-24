export type SaveTokenAlertParams = {
  tokenAddress: string;
};

export type TokenTrackingResponse = {
  userId: string;
  tokenAddress: string;
  addedAt: number;
  updatedAt: number;
  initialPrice: number;
  targetPrice: number;
  signalsSentCount: number;
  targetStopLoss: number;
  percentageChange: string;
};

export type CHAIN_ID =
  | "SOLANA"
  | "ETH"
  | "BSC"
  | "AVAX"
  | "FTM"
  | "MATIC"
  | "ICP"
  | "ONE"
  | "NEAR"
  | "CELO"
  | "TRON"
  | "HARMONY"
  | "ALGO"
  | "LUNA";

export type WatchlistItem = {
  tokenAddress: string;
  data: MagicToken;
  addedAt: number;
  notes?: string;
  alerts: {
    priceTarget?: number;
    volumeChange?: number;
  };
};

export type DetailedTweet = {
  id: string;
  user: {
    name: string;
    handle: string;
    profile_image_url: string;
  };
  text: string;
  retweet_count: number;
  likes_count: number;
  replies_count: number;
  quote_count: number;
  created_at: string;
  link: string;
};

export interface HolderDistribution {
  top1Percent: number | null;
  top3Percent: number | null;
  top10Percent: number | null;
  top15Percent: number | null;
  others: number | null;
  topHolders: HolderItem[];
}

export interface StatsResponse {
  scanned_tokens: number;
  risk_tokens_detected: number;
  signal_sent: number;
  watchlisted_tokens: number;
  supported_chains: number;
}

interface HolderItem {
  amount: string;
  decimals: number;
  mint: string;
  owner: string;
  token_account: string;
  ui_amount: number;
  percentOwned?: number;
  valueUSD?: number;
}

export interface SearchResponse {
  tokens: MagicToken[];
  total: number;
  limit: number;
  query: string;
}

export type SearchHistory = {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  searchTime : number;
  tokenLogo: string;
};


export type TokensPaginated = {
  tokens: MagicToken[];
  total: number;
  offset: number;
  limit: number;
  page: number;
  totalPages: number;
};

export type GainersLosersRisky = {
  gainers: MagicToken[];
  losers: MagicToken[];
  risky: MagicToken[];
};

export type GainersLosersResponse = {
  data: GainersLosersRisky;
  totalGainers: number;
  totalLosers: number;
  totalRisky: number;
  message?: string;
};

export interface HistoricalPriceResponse {
  time: number;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface HistoricalPriceApiResponse {
  tokenAddress: string;
  range: string;
  interval: string;
  historicalData: HistoricalPriceResponse[];
  predictedData: HistoricalPriceResponse[];
  totalHistorical: number;
  totalPredicted: number;
}

export type Metadata = {
  image?: string;
  name?: string;
  description?: string;
  symbol?: string;
  showName?: boolean;
  totalSupply: number;
  uri?: string;
  decimals?: number;
  dex?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  mintAddress: string;
  creationDate?: number;
  tokenDecimals: number;
  age?: number;
  chainId: CHAIN_ID;
  dexToolsPaid?: boolean;
  dexscreenerPaid?: boolean;

  marketCap?: number;
  priceUsd?: number;
  priceNative?: string;
};

export type MagicToken = {
  metadata: Metadata;
  rank: number;
  holders: number;
  change?: string;
  tweets: DetailedTweet[];

  pair?: {
    baseToken: {
      name: string;
      symbol: string;
      address: string;
    };
    quoteToken: {
      name: string;
      symbol: string;
      address: string;
    };
    pairAddress?: string;
    url?: string;
  };

  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };

  volume: {
    h24: number;
    h6?: number;
    h1?: number;
    m5?: number;
  };

  txns?: {
    h24: { buys: number; sells: number };
    h6?: { buys: number; sells: number };
    h1?: { buys: number; sells: number };
    m5?: { buys: number; sells: number };
  };

  priceChange?: {
    h24: number;
  };

  fdv?: number;
  pairCreatedAt?: number;

  pnl?: string;
  initialInsiders?: string[];
  initialInsidersScore?: number;
  currentInsiders?: string[];
  currentInsidersScore?: number;
  initialBuyers?: string[];
  initialBuyersScore?: number;
  currentBuyersScore?: number;
  twitterDate?: number;
  fakeTwitterFollowers?: number;
  devPercentage?: number;
  botVolume?: number;
  botPercentage?: number;
  analysis: AnalysisResult;
  magicScore: number;
};

export type AnalysisResult = {
  engagement_rating: number;
  sentiment_probability: number;
  volatility_probability: number;
  confidence: number;
  pump_probability: number;
  dump_probability: number;
};

interface Extensions {
  coingeckoId?: string;
  serumV3Usdc?: string;
  serumV3Usdt?: string;
  website?: string;
  telegram?: string | null;
  twitter?: string;
  description?: string;
  discord?: string;
  medium?: string;
}

export interface TokenOverviewData {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  extensions: Extensions;
  logoURI: string;
  liquidity: number;
  lastTradeUnixTime: number;
  lastTradeHumanTime: string;
  price: number;
  history30mPrice: number;
  priceChange30mPercent: number;
  history1hPrice: number;
  priceChange1hPercent: number;
  history2hPrice: number;
  priceChange2hPercent: number;
  history4hPrice: number;
  priceChange4hPercent: number;
  history6hPrice: number;
  priceChange6hPercent: number;
  history8hPrice: number;
  priceChange8hPercent: number;
  history12hPrice: number;
  priceChange12hPercent: number;
  history24hPrice: number;
  priceChange24hPercent: number;
  uniqueWallet30m: number;
  uniqueWalletHistory30m: number;
  uniqueWallet30mChangePercent: number;
  uniqueWallet1h: number;
  uniqueWalletHistory1h: number;
  uniqueWallet1hChangePercent: number;
  uniqueWallet2h: number;
  uniqueWalletHistory2h: number;
  uniqueWallet2hChangePercent: number;
  uniqueWallet4h: number;
  uniqueWalletHistory4h: number;
  uniqueWallet4hChangePercent: number;
  uniqueWallet8h: number;
  uniqueWalletHistory8h: number;
  uniqueWallet8hChangePercent: number;
  uniqueWallet24h: number;
  uniqueWalletHistory24h: number;
  uniqueWallet24hChangePercent: number;
  totalSupply: number;
  fdv: number;
  circulatingSupply: number;
  marketCap: number;
  holder: number;
  trade30m: number;
  tradeHistory30m: number;
  trade30mChangePercent: number;
  sell30m: number;
  sellHistory30m: number;
  sell30mChangePercent: number;
  buy30m: number;
  buyHistory30m: number;
  buy30mChangePercent: number;
  v30m: number;
  v30mUSD: number;
  vHistory30m: number;
  vHistory30mUSD: number;
  v30mChangePercent: number;
  vBuy30m: number;
  vBuy30mUSD: number;
  vBuyHistory30m: number;
  vBuyHistory30mUSD: number;
  vBuy30mChangePercent: number;
  vSell30m: number;
  vSell30mUSD: number;
  vSellHistory30m: number;
  vSellHistory30mUSD: number;
  vSell30mChangePercent: number;
  trade1h: number;
  tradeHistory1h: number;
  trade1hChangePercent: number;
  sell1h: number;
  sellHistory1h: number;
  sell1hChangePercent: number;
  buy1h: number;
  buyHistory1h: number;
  buy1hChangePercent: number;
  v1h: number;
  v1hUSD: number;
  vHistory1h: number;
  vHistory1hUSD: number;
  v1hChangePercent: number;
  vBuy1h: number;
  vBuy1hUSD: number;
  vBuyHistory1h: number;
  vBuyHistory1hUSD: number;
  vBuy1hChangePercent: number;
  vSell1h: number;
  vSell1hUSD: number;
  vSellHistory1h: number;
  vSellHistory1hUSD: number;
  vSell1hChangePercent: number;
  trade2h: number;
  tradeHistory2h: number;
  trade2hChangePercent: number;
  sell2h: number;
  sellHistory2h: number;
  sell2hChangePercent: number;
  buy2h: number;
  buyHistory2h: number;
  buy2hChangePercent: number;
  v2h: number;
  v2hUSD: number;
  vHistory2h: number;
  vHistory2hUSD: number;
  v2hChangePercent: number;
  vBuy2h: number;
  vBuy2hUSD: number;
  vBuyHistory2h: number;
  vBuyHistory2hUSD: number;
  vBuy2hChangePercent: number;
  vSell2h: number;
  vSell2hUSD: number;
  vSellHistory2h: number;
  vSellHistory2hUSD: number;
  vSell2hChangePercent: number;
  trade4h: number;
  tradeHistory4h: number;
  trade4hChangePercent: number;
  sell4h: number;
  sellHistory4h: number;
  sell4hChangePercent: number;
  buy4h: number;
  buyHistory4h: number;
  buy4hChangePercent: number;
  v4h: number;
  v4hUSD: number;
  vHistory4h: number;
  vHistory4hUSD: number;
  v4hChangePercent: number;
  vBuy4h: number;
  vBuy4hUSD: number;
  vBuyHistory4h: number;
  vBuyHistory4hUSD: number;
  vBuy4hChangePercent: number;
  vSell4h: number;
  vSell4hUSD: number;
  vSellHistory4h: number;
  vSellHistory4hUSD: number;
  vSell4hChangePercent: number;
  trade8h: number;
  tradeHistory8h: number;
  trade8hChangePercent: number;
  sell8h: number;
  sellHistory8h: number;
  sell8hChangePercent: number;
  buy8h: number;
  buyHistory8h: number;
  buy8hChangePercent: number;
  v8h: number;
  v8hUSD: number;
  vHistory8h: number;
  vHistory8hUSD: number;
  v8hChangePercent: number;
  vBuy8h: number;
  vBuy8hUSD: number;
  vBuyHistory8h: number;
  vBuyHistory8hUSD: number;
  vBuy8hChangePercent: number;
  vSell8h: number;
  vSell8hUSD: number;
  vSellHistory8h: number;
  vSellHistory8hUSD: number;
  vSell8hChangePercent: number;
  trade24h: number;
  tradeHistory24h: number;
  trade24hChangePercent: number;
  sell24h: number;
  sellHistory24h: number;
  sell24hChangePercent: number;
  buy24h: number;
  buyHistory24h: number;
  buy24hChangePercent: number;
  v24h: number;
  v24hUSD: number;
  vHistory24h: number;
  vHistory24hUSD: number;
  v24hChangePercent: number;
  vBuy24h: number;
  vBuy24hUSD: number;
  vBuyHistory24h: number;
  vBuyHistory24hUSD: number;
  vBuy24hChangePercent: number;
  vSell24h: number;
  vSell24hUSD: number;
  vSellHistory24h: number;
  vSellHistory24hUSD: number;
  vSell24hChangePercent: number;
  watch: null;
  numberMarkets: number;
}
