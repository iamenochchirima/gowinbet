// types.ts
export interface SymbolInfo {
    listed_exchange: string;
    exchange: string;
    name: string;
    ticker: string;
    description: string;
    type: string;
    session: string;
    minmov: number;
    pricescale: number;
    timezone: string;
    supported_resolutions: string[];
  }
  
  export interface HistoryResponse {
    s: string;
    t: number[];
    o: number[];
    h: number[];
    l: number[];
    c: number[];
    v: number[];
  }
  
  export interface LatestBarParams {
    symbol: string;
    resolution: string;
  }
  
  export interface HistoryParams {
    symbol: string;
    from: number;
    to: number;
    resolution: string;
  }
  
  export interface Configuration {
    supported_resolutions: string[];
    supports_marks?: boolean;
    supports_timescale_marks?: boolean;
  }