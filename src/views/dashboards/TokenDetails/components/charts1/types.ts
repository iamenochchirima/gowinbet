export interface HistoricalPricePoint {
  time: number;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface ChartDataPoint {
  time: number;
  value: number;
  type: 'historical' | 'predicted';
}