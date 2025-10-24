import endpointConfig from "@/configs/endpoint.config";
import ApiService from "./ApiService";
import { PackagePricing } from "@/@types/types";

export async function apiGetPlansPricing() {
  return ApiService.fetchDataWithAxios<PackagePricing[]>({
    url: endpointConfig.getPackages,
    method: "get",
  });
}