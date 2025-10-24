import { SiInternetcomputer, SiSolana, SiNear, SiEthereum, SiBnbchain } from "react-icons/si";

export const formatNumber = (number: number): string => {
  if (typeof number !== "number" || isNaN(number)) return "0";

  const absNumber = Math.abs(number);

  if (absNumber >= 1_000_000_000) {
    const billions = number / 1_000_000_000;
    return `${billions.toFixed(1).replace(/\.0$/, "")}B`;
  } else if (absNumber >= 1_000_000) {
    const millions = number / 1_000_000;
    return `${millions.toFixed(1).replace(/\.0$/, "")}M`;
  } else if (absNumber >= 1_000) {
    const thousands = number / 1_000;
    return `${thousands.toFixed(4).replace(/\.0$/, "")}K`;
  } else {
    return number.toFixed(2);
  }
};

export const chainConfig: Record<string, { name: string; icon: React.ReactNode }> = {
  SOLANA: {
    name: "Solana",
    icon: <SiSolana className="h-5" />,
  },
  ETH: {
    name: "Ethereum",
    icon: <SiEthereum className="h-5" />,
  },
  BSC: {
    name: "BNB Chain",
    icon: <SiBnbchain className="h-5" />,
  },
  AVAX: {
    name: "Avalanche",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/avalanche.png"
  },
  FTM: {
    name: "Fantom",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/fantom.png"
  },
  MATIC: {
    name: "Polygon",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/polygon.png"
  },
  ICP: {
    name: "Internet Computer",
    icon: <SiInternetcomputer className="h-5" />,
  },
  ONE: {
    name: "Harmony",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/harmony.png"
  },
  NEAR: {
    name: "NEAR Protocol",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/near-protocol.png"
  },
  CELO: {
    name: "Celo",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/celo.png"
  },
  TRON: {
    name: "Tron",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/tron.png"
  },
  HARMONY: {
    name: "Harmony",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/harmony.png"
  },
  ALGO: {
    name: "Algorand",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/algorand.png"
  },
  LUNA: {
    name: "Terra Classic",
    icon: "https://raw.githubusercontent.com/Isaac-the-Man/crypto-icons-plus/main/icons/terra-luna.png"
  }
};
