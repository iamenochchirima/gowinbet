import { useEffect, useState } from "react";
import { useApp } from "@/store/appStore";
import { apiGetTokenHistoricalPrice } from "@/services/MagicTokensService";
import Loading from "./Loading";
import { IoMdTime } from "react-icons/io";
import CustomSelect from "./CustomSelect";
import { HistoricalPricePoint } from "./types";
import TwoLineChart from "./TwoLineCryptoChart";

const Two = () => {
    const [isLoading, setLoading] = useState(true);
    const [historicalData, setHistoricalData] = useState<HistoricalPricePoint[]>([]);
    const [predictedData, setPredictedData] = useState<HistoricalPricePoint[]>([]);
    const [selectedRange, setSelectedRange] = useState<string>("24h");
    const [priceInfo, setPriceInfo] = useState({
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        change: 0,
        changePercent: 0
    });
    const { selectedMagicToken } = useApp();

    useEffect(() => {
        fetchPriceData();
    }, [selectedRange, selectedMagicToken]);

    const fetchPriceData = async () => {
        if (!selectedMagicToken?.metadata?.mintAddress) return;

        setLoading(true);
        try {
            const response = await apiGetTokenHistoricalPrice(
                selectedMagicToken.metadata.mintAddress,
                selectedRange
            );

            if (response) {
                // Process historical data - no conversion needed now
                const historicalItems = response.historicalData || [];

                // Process predicted data - no conversion needed now
                const predictedItems = response.predictedData || [];

                if (historicalItems.length > 0) {
                    const lastItem = historicalItems[historicalItems.length - 1];
                    const firstItem = historicalItems[0];
                    const close = lastItem.close || lastItem.price;
                    const open = firstItem.open || firstItem.price;
                    const change = close - open;
                    const changePercent = (change / open) * 100;

                    setPriceInfo({
                        open,
                        high: Math.max(...historicalItems.map(i => i.high || i.price)),
                        low: Math.min(...historicalItems.map(i => i.low || i.price)),
                        close,
                        change,
                        changePercent
                    });
                }

                // Set data directly without conversion
                setHistoricalData(historicalItems.slice(-300));
                setPredictedData(predictedItems.slice(-300));
            }
        } catch (error) {
            console.log("Error in getting historical price data", error);
        } finally {
            setLoading(false);
        }
    };

    const options = [
        { value: "24h", label: "1D" },
        { value: "1w", label: "1W" },
        { value: "1m", label: "1M" },
        { value: "1y", label: "1Y" },
        { value: "all", label: "All" },
    ];

    const priceItems = [
        { symbol: "O", value: priceInfo.open.toFixed(6) },
        { symbol: "H", value: priceInfo.high.toFixed(6) },
        { symbol: "L", value: priceInfo.low.toFixed(6) },
        {
            symbol: "C",
            value: `${priceInfo.close.toFixed(6)} (${priceInfo.change.toFixed(6)} ${priceInfo.changePercent >= 0 ? '+' : ''}${priceInfo.changePercent.toFixed(2)}%)`,
            color: priceInfo.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
        },
    ];

    const handleRangeChange = (value: string) => {
        setSelectedRange(value);
    };

    return (
        <div className="">
            <span className="text-white">
                {selectedMagicToken?.metadata.name || "Token Name"} Holdings
            </span>
            <div className="">
                {isLoading ? (
                    <Loading />
                ) : (
                    // <CryptoChart
                    //     historicalData={historicalData}
                    //     predictedData={predictedData}
                    // />
                    <TwoLineChart
                        historicalData={historicalData}
                        predictedData={predictedData}
                    />
                )}
            </div>
            <div className=" text-white flex items-end justify-end px-2">
                <span className="flex items-center mr-4">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                    <span>{selectedMagicToken?.metadata.name} Price</span>
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>Holdings</span>
                </span>
            </div>
        </div>
    );
};

export default Two;