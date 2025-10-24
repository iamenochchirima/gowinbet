import { ChartingLibraryWidgetOptions } from "@/charting_library/charting_library";

// src/types/tradingview.d.ts
interface TradingViewWidget {
    new (options: ChartingLibraryWidgetOptions): any;
  }
  
  interface Window {
    TradingView: {
      widget: TradingViewWidget;
    };
  }