import { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  LineData,
  SeriesMarker,
  Time,
  ColorType,
  LineStyle,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";

interface CryptoChartProps {
  historicalData: CandlestickData[];
  predictedData: LineData[];
}

const CryptoChart: React.FC<CryptoChartProps> = ({ historicalData, predictedData }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || historicalData.length === 0) return;

    // Clean and normalize the data
    const cleanedHistoricalData = historicalData.map(item => {
      // Ensure all values are positive and valid
      const open = Math.max(0.000001, item.open);
      const high = Math.max(open, Math.max(0.000001, item.high));
      const low = Math.min(open, Math.max(0.000001, item.low));
      const close = Math.max(0.000001, Math.min(high, Math.max(low, item.close)));
      
      return {
        time: item.time,
        open,
        high,
        low,
        close
      };
    });

    // Calculate reasonable price range
    const allValues = [
      ...cleanedHistoricalData.map(d => d.high),
      ...cleanedHistoricalData.map(d => d.low),
      ...(predictedData?.map(d => d.value) || [])
    ].filter(v => v !== undefined && v !== null && !isNaN(v)) as number[];

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const rangePadding = (maxValue - minValue) * 0.1; // 10% padding

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: "#292C2D" },
        textColor: "#FFFFFF",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.1)" },
        horzLines: { color: "rgba(255, 255, 255, 0.1)" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#292C2D",
        barSpacing: 15,
        minBarSpacing: 5,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      rightPriceScale: {
        borderColor: "#292C2D",
        scaleMargins: { top: 0.1, bottom: 0.1 },
        mode: 1, // Logarithmic scale
        entireTextOnly: true,
      },
      localization: {
        priceFormatter: (price: number) => `$${price.toFixed(6)}`,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26A69A",
      downColor: "#B82133",
      borderVisible: true,
      wickUpColor: "#26A69A",
      wickDownColor: "#B82133",
      borderUpColor: "#26A69A",
      borderDownColor: "#B82133",
      priceFormat: {
        type: "price",
        precision: 6,
        minMove: 0.000001,
      },
      wickVisible: true,
      lastValueVisible: true,
      priceLineVisible: true,
      priceLineWidth: 1,
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Add markers for the last data point
    const historicalDataWithMarker = cleanedHistoricalData.map((data, index) => {
      if (index === cleanedHistoricalData.length - 1) {
        return {
          ...data,
          markers: [
            {
              position: "inBar",
              color: "#FFFFFF",
              shape: "circle",
              text: "Current",
              size: 4,
            } as SeriesMarker<Time>,
          ],
        };
      }
      return data;
    });

    candlestickSeries.setData(historicalDataWithMarker);

    // Add line series for predictions if available
    if (predictedData && predictedData.length > 0) {
      const lineSeries = chart.addSeries(LineSeries, {
        color: "#FFA500",
        lineWidth: 2,
        lineStyle: LineStyle.Solid,
        lastValueVisible: true,
        priceLineVisible: true,
        priceLineColor: "rgba(255, 165, 0, 0.5)",
      });
      lineSeriesRef.current = lineSeries;

      const lastHistoricalPoint = cleanedHistoricalData[cleanedHistoricalData.length - 1];
      const connectingPoint = {
        time: lastHistoricalPoint.time,
        value: lastHistoricalPoint.close,
      };
      const alignedPredictedData = [connectingPoint, ...predictedData];
      lineSeries.setData(alignedPredictedData);
    }

    // Handle resizing
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    // Fit content after all data is loaded
    setTimeout(() => {
      chart.timeScale().fitContent();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [historicalData, predictedData]);

  return (
    <div className="relative bg-[#292C2D] p-4 rounded-lg">
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};

export default CryptoChart;