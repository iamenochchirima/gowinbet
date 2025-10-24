import { HolderDistribution, MagicToken } from "@/@types/tokens";
import { apiGetTokenHolders } from "@/services/MagicTokensService";
import { useApp } from "@/store/appStore";
import RadarChartComponent from "./Radar";
import { useCallback, useEffect, useState } from "react";
import { formatNumber } from "./utils";

export const transformHolderDistribution = (distribution: HolderDistribution) => {
    const map: { key: keyof HolderDistribution; title: string; color: string }[] = [
        { key: "top1Percent", title: "Top 1", color: "#41B06E" },
        { key: "top3Percent", title: "Top 3", color: "#F0B90B" },
        { key: "top10Percent", title: "Top 10", color: "#FA5607" },
        { key: "top15Percent", title: "Top 15", color: "#8338EC" },
        { key: "others", title: "Other", color: "#3ABEF9" },
    ];

    return map
        .map(({ key, title, color }) => {
            const percent = distribution[key];
            return percent !== null ? { title, percent, color } : null;
        })
        .filter(Boolean);
};

const icons = ["/img/others/crab.png", "/img/others/monkey.png", "/img/others/yellow_person.png"];

const One = () => {
    const { selectedMagicToken } = useApp();
    const [holdersData, setHoldersData] = useState<HolderDistribution | null>(null);
    const [loading, setLoading] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);

    const getData = useCallback(async (token: MagicToken) => {
        if (!token?.metadata?.mintAddress) {
            console.warn("No valid mintAddress, skipping request");
            return;
        }

        const requestId = token.metadata.mintAddress;
        
        // Check if there's already a request for this token
        if (currentRequestId === requestId && loading) {
            console.log(`Request for ${requestId} already in progress, skipping...`);
            return;
        }

        // Set the current request and loading state
        setCurrentRequestId(requestId);
        setLoading(true);

        try {
            const args = {
                mintAddress: token.metadata.mintAddress,
                totalHolders: token.holders,
                totalSupply: token.metadata.totalSupply,
                price: token.metadata.priceUsd ?? 0,
            };
            
            const response = await apiGetTokenHolders(args);
            
            // Only update state if this is still the current request
            if (currentRequestId === requestId || requestId === token.metadata.mintAddress) {
                setHoldersData(response || null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Only update state if this is still the current request
            if (currentRequestId === requestId || requestId === token.metadata.mintAddress) {
                setHoldersData(null);
            }
        } finally {
            // Only clear loading if this is still the current request
            if (currentRequestId === requestId || requestId === token.metadata.mintAddress) {
                setLoading(false);
                setCurrentRequestId(null);
            }
        }
    }, [currentRequestId, loading]);

    useEffect(() => {
        if (selectedMagicToken && selectedMagicToken.metadata?.mintAddress) {
            // Clear previous data when token changes
            if (currentRequestId !== selectedMagicToken.metadata.mintAddress) {
                setHoldersData(null);
            }
            getData(selectedMagicToken);
        }

        // Cleanup function to cancel any ongoing request when component unmounts
        // or when selectedMagicToken changes
        return () => {
            setCurrentRequestId(null);
            setLoading(false);
        };
    }, [selectedMagicToken?.metadata?.mintAddress]); // Only depend on the mintAddress to avoid unnecessary re-renders

    const truncateAddress = (address: string) => {
        if (address.length < 6) return address;
        return `${address.slice(0, 3)}...${address.slice(-3)}`;
    };

    const handleCopyAddress = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address);
            setCopiedAddress(address);
            setTimeout(() => setCopiedAddress(null), 2000);
        } catch (error) {
            console.error("Failed to copy address:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-400">Loading holders data...</div>
            </div>
        );
    }

    return (
        <>
            {holdersData && <RadarChartComponent
                data={{
                    top1Percent: holdersData?.top1Percent || 0,
                    top3Percent: holdersData?.top3Percent || 0,
                    top10Percent: holdersData?.top10Percent || 0,
                    top15Percent: holdersData?.top15Percent || 0,
                    others: holdersData?.others || 0,
                }}
            />}

            <ul className="flex flex-col gap-1">
                {holdersData && (
                    <>
                        {transformHolderDistribution(holdersData).map((item, index) => (
                            <li
                                key={index}
                                className="text-gray-200 border-b border-gray-600 pb-1 text-sm flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="px-1 py-3 rounded-md"
                                        style={{ backgroundColor: item?.color }}
                                    ></span>
                                    <span className="font-bold">{item?.title}</span>
                                </div>
                                <span className="font-bold">
                                    {typeof item?.percent === "number" ? item.percent.toFixed(2) : 0}%
                                </span>
                            </li>
                        ))}
                    </>
                )}
            </ul>
            <div className="bg-gray-800 rounded-lg text-gray-300 w-full max-w-4xl mx-auto">
                <div className="flex justify-between py-2 bg-[#1C1E20] text-xs my-2 px-2 rounded-lg">
                    <div className="flex-1 text-left">Address</div>
                    <div className="flex-1 text-center">Amt {selectedMagicToken?.metadata.name}</div>
                    <div className="flex-1 text-right">Balance USD$</div>
                </div>
                <div className="flex flex-col gap-1">
                    {holdersData?.topHolders.slice(0, 10).map((item, index) => (
                        <div
                            key={index}
                            className="flex text-xs justify-between rounded-lg items-center py-1 border border-gray-700"
                        >
                            <div className="flex-1 text-left flex items-center">
                                <button
                                    onClick={() => handleCopyAddress(item.owner)}
                                    className="bg-gray-700 px-2 py-1 rounded-md hover:bg-gray-600 transition-colors relative"
                                    title="Click to copy full address"
                                    aria-label={`Copy address ${item.owner}`}
                                >
                                    {truncateAddress(item.owner)}
                                    {copiedAddress === item.owner && (
                                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                                            Copied!
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="flex-1 text-center flex justify-center items-center gap-2">
                                {icons.map((icon, iconIndex) => (
                                    <img key={iconIndex} className="h-3" src={icon} alt="Icon" />
                                ))}
                                <span className="ml-4">{formatNumber(item.ui_amount)}</span>
                                <span className="ml-2 text-nowrap text-gray-400 bg-gray-700 px-2 py-1 rounded-md">
                                    {item.percentOwned?.toFixed(2)} %
                                </span>
                            </div>

                            {/* Balance */}
                            <div className="flex-1 text-right pr-2">
                                <span className="text-green-400">{formatNumber(item.valueUSD ?? 0)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default One;