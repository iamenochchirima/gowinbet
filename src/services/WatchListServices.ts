import endpointConfig from "@/configs/endpoint.config";
import ApiService from "./ApiService";
import { AddToWatchResponse } from "@/@types/watchList";
import { MagicToken, TokensPaginated, WatchlistItem } from "@/@types/tokens";

export async function apiAddToWatchlist(data: MagicToken) {
  return ApiService.fetchDataWithAxios<AddToWatchResponse>({
    url: endpointConfig.addToWatchList,
    method: "post",
    data: {data},
  });
}


export async function apiRemoveFromWatchlist(address: string) {
  return ApiService.fetchDataWithAxios<AddToWatchResponse>({
    url: endpointConfig.removeFromWatchList,
    method: "delete",
    data: { tokenAddress: address },
  });
}

export async function apiGetWatchlist(offset : number, limit : number) {
  return ApiService.fetchDataWithAxios<TokensPaginated>({
    url: endpointConfig.getWatchList,
    method: "get",
    params: { offset, limit },
  });
}