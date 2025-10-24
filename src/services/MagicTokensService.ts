import endpointConfig from "@/configs/endpoint.config";
import ApiService from "./ApiService";
import { token } from '../views/dashboards/MagicRadarDashboard/constants';
import {
  TokensPaginated,
  MagicToken,
  GainersLosersResponse,
  HistoricalPriceApiResponse,
  SearchResponse,
  HolderDistribution,
  TokenOverviewData,
  StatsResponse,
  SaveTokenAlertParams,
  TokenTrackingResponse,
  SearchHistory,
} from "@/@types/tokens";

export async function apiGetAiMagicTokens() {
  return ApiService.fetchDataWithAxios<MagicToken[]>({
    url: endpointConfig.getAiMagicTokens,
    method: "get",
  });
}

export async function apiGetMagicRadar(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getMagicRadar,
    method: "get",
    params: { offset, limit },
  });
}

export async function apiGetTrendingTokens(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getMagicRadar,
    method: "get",
    params: { offset, limit },
  });
}

export async function apiGetGainersLosersRisky() {
  return ApiService.fetchDataWithAxios<GainersLosersResponse>({
    url: endpointConfig.getGainersLosers,
    method: "get",
  });
}

export async function apiGetGainers(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getGainers,
    method: "get",
    params: { offset, limit },
  });
}

export async function apiGetLosers(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getLosers,
    method: "get",
    params: { offset, limit },
  });
}

export async function apiSearchTokens(q: string, limit: number) {
  return ApiService.fetchDataWithAxios<SearchResponse>({
    url: endpointConfig.searchToken,
    method: "get",
    params: { q, limit },
  });
}

export async function apiSearchOneToken(address: string) {
  return ApiService.fetchDataWithAxios<SearchResponse>({
    url: endpointConfig.searchToken,
    method: "get",
    params: { address },
  });
}
export async function apiGetSearchHistory() {
  return ApiService.fetchDataWithAxios<SearchHistory[]>({
    url: endpointConfig.getSearchHistory,
    method: "get",
  });
}

export async function apiClearSearchHistory() {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.clearSearchHistory,
    method: "delete",
  });
}

export async function apiRemoveSearchHistory(tokenAddress: string) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.removeSearchHistory,
    method: "delete",
    params: { tokenAddress },
  });
}

export async function apiGetRiskyTokens(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getRiskyTokens,
    method: "get",
    params: { offset, limit },
  });
}

export type GetTokenHoldersParams = {
  mintAddress: string;
  totalHolders: number;
  totalSupply: number;
  price: number;
};

export async function apiGetTokenHolders(params: GetTokenHoldersParams) {
  return ApiService.fetchDataWithAxios<HolderDistribution>({
    url: endpointConfig.getTokenHolders,
    method: "get",
    params,
  });
}

export async function apiGetTokenOverview(mintAddress: string) {
  return ApiService.fetchDataWithAxios<TokenOverviewData>({
    url: endpointConfig.tokenOverview,
    method: "get",
    params: { mintAddress },
  });
}

export async function apiGetStats() {
  return ApiService.fetchDataWithAxios<StatsResponse>({
    url: endpointConfig.getStats,
    method: "get",
  });
}

export async function apiGetMagicDip(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getMagicDip,
    method: "get",
    params: { offset, limit },
  });
}

export async function apiGetUsernameTwitter(username: string) {
  return ApiService.fetchDataWithAxios<any>({
    url: endpointConfig.getTwitter,
    method: "get",
    params: { username },
  });
}

export async function apiGetTokenHistoricalPrice(
  address: string,
  range: string
) {
  return ApiService.fetchDataWithAxios<HistoricalPriceApiResponse>({
    url: endpointConfig.historicalPrice,
    method: "get",
    params: { address, range },
  });
}

export async function apiActivateTokenAlert(params: SaveTokenAlertParams) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.activateTokenAlert,
    method: "post",
    data: params,
  });
}

export async function apiGetTokenTracking(tokenAddress: string) {
  return ApiService.fetchDataWithAxios<TokenTrackingResponse>({
    url: endpointConfig.getTokenTracking,
    method: "get",
    params: { tokenAddress },
  });
}

export async function apiRemoveTokenTracking(tokenAddress: string) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.removeTokenTracking,
    method: "delete",
    params: { tokenAddress },
  });
}

export async function apiUpdateTokenAlert(
  tokenAddress: string,
  params: SaveTokenAlertParams
) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.updateTokenTracking,
    method: "put",
    params: { tokenAddress },
    data: params,
  });
}

export async function apiGetLatestTokens(offset: number, limit: number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getLatestTokens,
    method: "get",
    params: { offset, limit },
  });
}