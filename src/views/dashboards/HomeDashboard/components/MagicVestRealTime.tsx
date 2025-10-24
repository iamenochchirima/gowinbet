import useAppContext from "@/auth/useApp";

const MagicVestRealTime = () => {
  const { realtimeStats } = useAppContext();

  return (
    <div className="p-3 bg-gray-800 border border-gray-700 rounded-2xl">
      <h3 className="dark:text-gray-300 text-lg font-bold mb-4">Magicvest Realtime <span className="text-gray-500">&#9432;</span></h3>
      {realtimeStats && <div className="grid bg- grid-cols-2 gap-4 text-center">
        <div className="bg-[#2E1A1F] border flex flex-col justify-between  border-gray-700  p-4 rounded-md">
          <p className=" text-xs ">Risk Tokens Detected</p>
          <h3 className="dark:text-white text-3xl pb-3 font-bold">{realtimeStats.risk_tokens_detected}</h3>
        </div>
        <div className="bg-[#2E1A1F] flex flex-col justify-between h-[130px] border border-gray-700 p-4 rounded-md">
          <p className="text-xs ">Tokens Scanned</p>
          <h3 className="dark:text-white text-3xl pb-3 font-bold">{realtimeStats.scanned_tokens}</h3>
        </div>
        <div className="h-[130px] bg-[#2E1A1F] flex flex-col justify-between border border-gray-700 p-4 rounded-md">
          <p className="text-xs ">AI Signal Send</p>
          <h3 className="dark:text-white text-3xl pb-3 font-bold">{realtimeStats.signal_sent}</h3>
        </div>
        <div className=" p-4 h-[130px] rounded-md flex items-center justify-center">
          <img src="/img/others/buychart1.png" alt="AI" className="object-cover" />
        </div>
      </div>}
    </div>
  )
}

export default MagicVestRealTime
