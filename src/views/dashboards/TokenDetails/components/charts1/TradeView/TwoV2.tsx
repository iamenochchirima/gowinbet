import { useEffect, useState } from 'react';
import CryptoChart from './TradeViewChartV2';
import { useApp } from '@/store/appStore';
import { IoMdTime } from 'react-icons/io';
import { apiGetTokenHistoricalPrice } from '@/services/MagicTokensService';
import CustomSelect from '../CustomSelect';
import Loading from '../Loading';
import One from '../../charts2/One';
import Two from '../../charts2/Two';

const TwoV2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<string>('24h');
  const [priceInfo, setPriceInfo] = useState({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    change: 0,
    changePercent: 0,
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

      if (response && response.historicalData.length > 0) {
        const historicalItems = response.historicalData;
        const lastItem = historicalItems[historicalItems.length - 1];
        const firstItem = historicalItems[0];
        const close = lastItem.close || lastItem.price;
        const open = firstItem.open || firstItem.price;
        const change = close - open;
        const changePercent = (open !== 0 ? (change / open) * 100 : 0);

        setPriceInfo({
          open,
          high: Math.max(...historicalItems.map(i => i.high || i.price)),
          low: Math.min(...historicalItems.map(i => i.low || i.price)),
          close,
          change,
          changePercent,
        });
      }
    } catch (error) {
      console.error('Error fetching historical price data:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: '24h', label: '1D' },
    { value: '1w', label: '1W' },
    { value: '1m', label: '1M' },
    { value: '1y', label: '1Y' },
    { value: 'all', label: 'All' },
  ];

  const priceItems = [
    { symbol: 'O', value: priceInfo.open.toFixed(6) },
    { symbol: 'H', value: priceInfo.high.toFixed(6) },
    { symbol: 'L', value: priceInfo.low.toFixed(6) },
    {
      symbol: 'C',
      value: `${priceInfo.close.toFixed(6)} (${priceInfo.change.toFixed(6)} ${priceInfo.changePercent >= 0 ? '+' : ''
        }${priceInfo.changePercent.toFixed(2)}%)`,
      color: priceInfo.changePercent >= 0 ? 'text-green-500' : 'text-red-500',
    },
  ];

  const handleRangeChange = (value: string) => {
    setSelectedRange(value);
  };

  return (
    <div className="">
      <div className="flex justify-between gap-2 2xl:gap-0 flex-col 2xl:flex-row items-center">
        <ul className="flex gap-1 w-full justify-between text-xs ss:text-sm ss:px-20 2xl:px-0 2xl:justify-start">
          {priceItems.map((item, index) => (
            <li key={index} className="flex gap-1 2xl:text-[12px]">
              <span className="text-white font-bold">{item.symbol}</span>
              <span className={item.color || 'text-white'}>{item.value}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-3 2xl:flex gap-2 text-xs ss:text-sm ss:px-20 2xl:px-0 2xl:justify-end w-full">
          <CustomSelect
            options={options}
            defaultOption={{ value: '24h', label: '1D' }}
            bgColor="bg-[#292C2D]"
            borderColor="border-[#292C2D]"
            dropdownBgColor="bg-gray-700"
            position="left-0"
            icon={<IoMdTime size={15} className="text-primary" />}
            onChange={handleRangeChange}
          />
        </div>
      </div>
      <div className="py-5">
        {isLoading ? (
          <Loading />
        ) : (
          <CryptoChart />
        )}
      </div>
      {/* <div className="flex flex-col sm:flex-row gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
        <div className="sm:w-1/2 border border-gray-700 rounded-lg p-2">
          <One />
        </div>
        <div className="sm:w-1/2 border border-gray-700 rounded-lg p-2">
          <Two />
        </div>
      </div> */}
    </div>
  );
};

export default TwoV2;