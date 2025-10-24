// Four.tsx
import { apiGetTokenHistoricalPrice } from "@/services/MagicTokensService";
import { useApp } from "@/store/appStore";
import { useEffect, useState } from "react";
import { HistoricalPriceResponse } from "@/@types/tokens";
import VolumeChart from "./VolumeChart";
import { formatAmount, formatAmountWithoutToken } from '../../../../../utils/tokens';

const Four = () => {
  const { selectedMagicToken } = useApp();
  const [selectedRange, setSelectedRange] = useState<string>('24h');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HistoricalPriceResponse[]>([]);

  useEffect(() => {
    fetchPriceData();
  }, [selectedMagicToken, selectedRange]);

  const fetchPriceData = async () => {
    if (!selectedMagicToken) return;

    setLoading(true);
    try {
      const response = await apiGetTokenHistoricalPrice(
        selectedMagicToken.metadata.mintAddress,
        selectedRange
      );

      if (response && response.historicalData.length > 0) {
        setData(response.historicalData);
      }
    } catch (error) {
      console.error('Error fetching historical price data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="text-xs flex justify-between">
          <div className="flex flex-col">
            <span>Volume</span>
            <span className="text-white font-bold lg">
              ${formatAmountWithoutToken(selectedMagicToken.volume.h24)}
            </span>
            <span>
              {data.length > 0 ? new Date(data[0].time * 1000).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="">
            <ul className="flex gap-2 border border-gray-700 p-1 items-center rounded-lg">
              {['1d', '7d', '1m', '6m', '1y', 'All'].map((range) => (
                <li
                  key={range}
                  className={`cursor-pointer p-1 rounded ${selectedRange === range ? 'bg-primary text-black' : ''}`}
                  onClick={() => handleRangeChange(range)}
                >
                  {range}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <VolumeChart data={data} />
      </div>
    </>
  );
};

export default Four;