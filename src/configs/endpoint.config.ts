

export const apiPrefix = "/api";

const endpointConfig = {
  signIn: "/auth/login",
  me: "/auth/me",
  signOut: "/auth/logout",
  signUp: "/auth/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/auth/reset-password",
  generateOTP: "/auth/generate-otp",
  verifyOTP: "/auth/verify-otp",
  googleOauth: "/auth/google-login",

  getAiMagicTokens: "tokens/magic-tokens",
  getMagicRadar: "tokens/magic-radar",
  getTrendingTokens: "tokens/get-trending",
  getGainersLosers: "tokens/gainers-losers-risky",
  getGainers: "tokens/gainers",
  getLosers: "tokens/losers",
  getRiskyTokens: "tokens/risky",
  getTokenHolders: "tokens/token-holders",
  getMagicDip: "tokens/magic-dip",
  searchTokens: "tokens/search",
  searchToken : "tokens/search-token",
  getAiMagicToken: "/magic-tokens/:id",
  addToWatchList: "/watchlist/add",
  removeFromWatchList: "/watchlist/remove",
  getWatchList: "/watchlist/get-all",
  getWatchListById: "/watchlist/get-by-id",
  getTwitter: "/x/get-tweeter",
  getStats: "/tokens/get-stats",
  getPackages: "/plans-pricing",
  historicalPrice: "/tokens/get-token-historic",
  tokenOverview: "/tokens/token-overview",

  activateTokenAlert: "/signals/activate",
  getTokenTracking: "/signals/get",
  removeTokenTracking: "/signals/remove",
  updateTokenTracking: "/signals/update",

  getSearchHistory: "/tokens/get-search-history",
  clearSearchHistory: "/tokens/clear-search-history",
  removeSearchHistory: "/tokens/remove-search-history",
  getLatestTokens: "/tokens/latest",

  getNotificationsList: "/notifications/list",
};

export default endpointConfig;
