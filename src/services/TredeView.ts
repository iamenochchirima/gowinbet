
import { Configuration, HistoryParams, HistoryResponse, LatestBarParams, SymbolInfo } from '@/@types/tradeview';
import ApiService from './ApiService'; 
import { Bar } from '@/charting_library/datafeed-api';

const endpointConfig = {
  getSymbol: '/tradeview/symbols',
  getHistory: '/tradeview/history',
  getLatest: '/tradeview/latest',
  getConfig: '/tradeview/config'
};

export async function apiGetSymbol(symbol: string) {
  return ApiService.fetchDataWithAxios<SymbolInfo>({
    url: endpointConfig.getSymbol,
    method: 'get',
    params: { symbol }
  });
}

export async function apiGetHistory(params: HistoryParams) {
  return ApiService.fetchDataWithAxios<HistoryResponse>({
    url: endpointConfig.getHistory,
    method: 'get',
    params
  });
}

export async function apiGetLatest(params: LatestBarParams) {
  return ApiService.fetchDataWithAxios<Bar>({
    url: endpointConfig.getLatest,
    method: 'get',
    params
  });
}

export async function apiGetConfig() {
  return ApiService.fetchDataWithAxios<Configuration>({
    url: endpointConfig.getConfig,
    method: 'get'
  });
}