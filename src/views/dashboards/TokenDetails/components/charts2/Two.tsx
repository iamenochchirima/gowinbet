import { useApp } from "@/store/appStore";
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { SaveTokenAlertParams, TokenTrackingResponse } from "@/@types/tokens";
import { toastError } from "@/utils/notifications";
import { apiGetTokenTracking, apiRemoveTokenTracking, apiActivateTokenAlert, apiUpdateTokenAlert } from "@/services/MagicTokensService";
import { formatAmount } from '../../../../../utils/tokens';
import { MdShowChart } from "react-icons/md";

const Two = () => {
    const { selectedMagicToken } = useApp();
    const [tokenData, setTokenData] = useState<TokenTrackingResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetPrice, setTargetPrice] = useState("");
    const [stopLoss, setStopLoss] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [is2x, setIs2x] = useState(false);

    // const handleActivateClick = () => {
    //     setIsModalOpen(true);
    // };

    useEffect(() => {
        // set is 2x to true if target price is set to 2x the current price
        if (selectedMagicToken && targetPrice) {
            const currentPrice = selectedMagicToken.metadata.priceUsd;
            const targetPriceValue = parseFloat(targetPrice);
            setIs2x(currentPrice !== undefined && targetPriceValue >= currentPrice * 2);
        } else {
            setIs2x(false);
        }
    }, [tokenData, selectedMagicToken]);

    useEffect(() => {
        if (tokenData) {
            setTargetPrice(tokenData.targetPrice.toString());
            setStopLoss(tokenData.targetStopLoss.toString());
        }
    }, [tokenData]);

    const handleSave = async () => {
        if (!selectedMagicToken) {
            console.error("No token selected");
            return;
        }
        const saveArgs: SaveTokenAlertParams = {
            tokenAddress: selectedMagicToken?.metadata.mintAddress,
        };
        setIsSaving(true);
        try {
            const response = await apiActivateTokenAlert(saveArgs);
            console.log("Token alert saved successfully", response);
            setIsSaving(false);
            fetchTokenData();
            setIsModalOpen(false);
            setTargetPrice("");
            setStopLoss("");
        } catch (error) {
            setIsSaving(false);
            console.error("Error saving token alert", error);
        }
    };

    useEffect(() => {
        fetchTokenData();
    }, [selectedMagicToken]);

    const fetchTokenData = async () => {
        if (!selectedMagicToken) {
            console.error("No token selected");
            return;
        }
        try {
            setIsLoading(true);
            const response = await apiGetTokenTracking(selectedMagicToken.metadata.mintAddress);
            if (response) {
                setTokenData(response);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setTokenData(null);
            console.log("Error in getting signals tokens", error);
        }
    };

    const handleEditAlert = async () => {
        if (!tokenData) {
            console.error("No token data available to edit");
            return;
        }
        if (!targetPrice || !stopLoss) {
            toastError("Target price and stop loss must be set");
            return;
        }
        const saveArgs: SaveTokenAlertParams = {
            tokenAddress: tokenData.tokenAddress,
        };
        setIsSaving(true);
        try {
            await apiUpdateTokenAlert(tokenData.tokenAddress, saveArgs);
        } catch (error) {
            console.error("Error updating token alert", error);
        } finally {
            setIsSaving(false);
            fetchTokenData();
            setIsModalOpen(false);
            setTargetPrice("");
            setStopLoss("");
        }
    };

    const handleDeactivateAlert = async () => {
        if (!tokenData) {
            console.error("No token data available to deactivate");
            return;
        }
        try {
            await apiRemoveTokenTracking(tokenData.tokenAddress);
        } catch (error) {
            console.error("Error deactivating alert", error);
        } finally {
            fetchTokenData();
            setIsModalOpen(false);
            setTargetPrice("");
            setStopLoss("");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTargetPrice("");
        setStopLoss("");
    }

    const currentPrice = selectedMagicToken?.metadata.priceUsd ?? 0;
    const initialPrice = tokenData?.initialPrice ?? currentPrice;
    const targetPriceValue = tokenData?.targetPrice ?? currentPrice;
    const percentageChange = initialPrice !== 0
        ? ((currentPrice - initialPrice) / initialPrice * 100).toFixed(2)
        : "0.00";
    const isPositive = parseFloat(percentageChange) > 0;

    const progress = (() => {
        if (!tokenData || currentPrice === 0 || initialPrice === 0 || targetPriceValue === 0) {
            return 0;
        }
        const totalRange = Math.abs(targetPriceValue - initialPrice);
        const isTargetAboveInitial = targetPriceValue > initialPrice;

        if (isTargetAboveInitial) {
            if (currentPrice < initialPrice) return 0; // No progress if price is below initial
            const currentProgress = currentPrice - initialPrice;
            return Math.min((currentProgress / totalRange) * 100, 100);
        }
        else {
            if (currentPrice > initialPrice) return 0;
            const currentProgress = initialPrice - currentPrice;
            return Math.min((currentProgress / totalRange) * 100, 100);
        }
    })();


    return (
        <>
            <style>
                <style>
                    {`
                        @keyframes blinkGlow {
                            0% {
                                box-shadow: 0 0 5px rgba(255, 165, 0, 0.3), 0 0 10px rgba(255, 165, 0, 0.2);
                            }
                            50% {
                                box-shadow: 0 0 15px rgba(255, 165, 0, 0.7), 0 0 20px rgba(255, 165, 0, 0.5);
                            }
                            100% {
                                box-shadow: 0 0 5px rgba(255, 165, 0, 0.3), 0 0 10px rgba(255, 165, 0, 0.2);
                            }
                        }
                        .blink-alert {
                            animation: blinkGlow 0.5s ease-in-out infinite;
                        }
                    `}
                </style>
            </style>

            <div className="flex items-center justify-between">
                <span className="text-white">
                    {selectedMagicToken?.metadata.name || "Token Name"} Alert
                </span>
                {!isLoading && !tokenData && (
                    <button
                        className="bg-[#162C22] text-gray-200 py-2 rounded-lg px-4"
                        onClick={handleSave}
                        disabled={isSaving || isLoading}
                    >
                        {isSaving ? "Activating..." : "ACTIVATE"}
                    </button>
                )}
                {isLoading && (
                    <button className="bg-[#162C22] text-gray-200 py-2 rounded-lg px-4">
                        Loading...
                    </button>
                )}
                {tokenData && (
                    <>  <button
                        className="bg-[#162C22] text-gray-200 py-2 rounded-lg px-4"
                        onClick={() => {
                            setIsEdit(true)
                            setIsModalOpen(true);
                        }}
                    >
                        {isLoading ? "Loading..." : "Edit Alert"}
                    </button>

                        <button
                            className="bg-[#162C22] text-gray-200 py-2 rounded-lg px-4"
                            onClick={handleDeactivateAlert}
                        >
                            {isLoading ? "Loading..." : "Deactivate Alert"}
                        </button>
                    </>
                )}

                {!tokenData && <FaCircleInfo />}
            </div>

            {/*************************/}

            <div className="py-3 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-white text-lg font-bold">
                        {formatAmount(selectedMagicToken.metadata.priceUsd, selectedMagicToken)}
                    </span>
                    <span className="text-xs">02:45 pm 11/08</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <MdShowChart style={{ transform: isPositive ? 'rotate(0deg)' : 'rotate(90deg)' }} />
                        <span className={isPositive ? "text-green-500" : "text-red-500"}>
                            {isPositive ? "+" : ""}{percentageChange}%
                        </span>
                    </div>
                    <span className="text-end">Movement</span>
                </div>
            </div>

            {/*************************/}

            <div className="flex justify-between bg-[#1B1D1F] p-2 rounded-lg">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-xs text-primary">
                        {tokenData ? tokenData.initialPrice.toFixed(5) : "0.00"}
                    </span>
                    <span className="">Signal send at</span>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-xs text-primary">
                        {tokenData ? tokenData.targetPrice.toFixed(5) : "0.00"}
                    </span>
                    <span className="">Closed at</span>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-xs text-red-700">
                        {tokenData ? tokenData.targetStopLoss.toFixed(5) : "0.00"}
                    </span>
                    <span className="">Stop loss at</span>
                </div>
            </div>

            {/*************************/}

            <div className="py-3 flex flex-col gap-2">
                <span className="text-white">Profit reached</span>
                <div className="relative">
                    <div className="flex items-center bg-[#E33640] rounded-full h-3">
                        <div
                            className={`bg-primary relative h-full rounded-l-full`}
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 translate-x-1/2 z-10">
                                <div className="bg-white h-4 w-4 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*************************/}

            <div className="">
                <span className="text-white">Profit advisor</span>
                <div className="py-2 flex gap-2">
                    <button
                        className={`w-full text-gray-200 py-2 border border-gray-600 rounded-lg ${isPositive ? 'blink-alert bg-green-900' : 'bg-[#162C22]'}`}
                    >
                        BUY ALERT
                    </button>
                    <button className={` w-full text-gray-200 p-2 border border-gray-600 rounded-lg ${is2x ? 'blink-alert bg-green-900' : 'bg-[#162C22]'}`}>
                        X2
                    </button>
                </div>
            </div>

            {/*************************/}

            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1B1D1F] p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-white text-lg font-bold mb-4">Set Alert Parameters</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-white text-sm mb-1 block">Target Price</label>
                                <input
                                    type="number"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    className="w-full bg-[#162C22] text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter target price"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-white text-sm mb-1 block">Current Price</label>
                                <span className="text-green-300">
                                    {selectedMagicToken?.metadata.priceUsd?.toFixed(4) || "0.00"}
                                </span>
                            </div>
                            <div>
                                <label className="text-white text-sm mb-1 block">Stop Loss</label>
                                <input
                                    type="number"
                                    value={stopLoss}
                                    onChange={(e) => setStopLoss(e.target.value)}
                                    className="w-full bg-[#162C22] text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter stop loss price"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="bg-gray-600 text-white py-2 px-4 rounded-lg"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-primary text-white py-2 px-4 rounded-lg"
                                onClick={isEdit ? handleEditAlert : handleSave}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default Two;