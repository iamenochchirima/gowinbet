import { FC, useState } from "react";
import SelectMenu from "./SelectMenu";
import MagicTokensTable from "../../common/MagicTokensTable";
import { MagicToken, TokensPaginated } from "@/@types/tokens";

const tables = [
  {
    title: "AI Magic Signals",
    key: "ai-magic-signals"
  },
  {
    title: "Ai Magic Dip",
    key: "buy-the-dips"
  },
  {
    title: "Safe Cryptos",
    key: "safe-cryptos"
  },
  {
    title: "Daily Gainers",
    key: "daily-gainers"
  },
  {
    title: "Presales",
    key: "presales"
  },
  {
    title: "Risk Tokens Detected",
    key: "risk-tokens-detected"
  },
  {
    title: "Best Week AI Signal",
    key: "best-week-ai-signal"
  }
];

const list2 = [
  {
    title: "AI Magic Signals",
    key: "ai-magic-signals"
  },
  {
    title: "Ai Magic Dip",
    key: "buy-the-dips"
  },
  {
    title: "Safe Cryptos",
    key: "safe-cryptos"
  }
];

type Props = {
  onPageChange: (newOffset: number) => void;
  paginatedTokens: TokensPaginated;
}


const MagicTable : FC<Props> = ({paginatedTokens, onPageChange}) => {

  const [activeTable, setActiveTable] = useState("ai-magic-signals");

  return (
    <div className="p-4 rounded-md text-xs">
      <div className="flex sm:flex-row flex-col gap-3 justify-between items-center pb-4">
        <div className="lg2:flex hidden text-sm gap-2 border border-gray-700 p-1 rounded-full items-center">
          {tables.map((table, index) => (
            <button key={index} className={`${activeTable === table.key ? "bg-gray-700 dark:text-white" : ""} rounded-full dark:hover:bg-gray-700  p-3`} onClick={() => setActiveTable(table.key)}
            >{table.title}</button>
          ))}
        </div>
        <div className="flex  sm:w-auto w-full justify-between lg2:hidden text-[10px] 0xs:text-xs xs1:text-sm gap-2 border border-gray-700 p-1 rounded-full items-center">
          {list2.map((table, index) => (
            <button key={index} className={`${activeTable === table.key ? "bg-gray-700 dark:text-white" : ""} rounded-full text-nowrap dark:hover:bg-gray-700  p-2`} onClick={() => setActiveTable(table.key)}
            >{table.title}</button>
          ))}
        </div>
        <SelectMenu />
      </div>
      <MagicTokensTable {...{onPageChange, paginatedTokens}}/>
    </div>
  );
};

export default MagicTable;
