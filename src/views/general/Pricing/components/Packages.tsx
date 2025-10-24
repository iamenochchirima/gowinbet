import { useEffect, useState } from "react";
import Card from "./Card";
import { apiGetPlansPricing } from "@/services/GeneralServices";
import { PackagePricing } from "@/@types/types";

const Packages = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [packages, setPackages] = useState<PackagePricing[]>([]);

    const getPlans = async () => {
        try {
            setFetching(true)
            const resp = await apiGetPlansPricing();
            if (resp) {
                setPackages(resp);
                setFetching(false)
            } else {
                setPackages([]);
                setFetching(false)
            }
        } catch (errors: any) {
            setPackages([]);
            setFetching(false)
        }
    }

    useEffect(() => {
        getPlans();
    }, []);

    const getGridColumns = () => {
        if (packages.length === 1) {
            return "grid-cols-1 max-w-md"; 
        } else if (packages.length === 2) {
            return "grid-cols-1 md:grid-cols-2 max-w-3xl"; 
        } else {
            return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl";
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-center mb-6">
                <div className="flex gap-4 text-white items-center">
                    <span className="font-bold">Monthly</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            id="toggle"
                            checked={isYearly}
                            onChange={() => setIsYearly(!isYearly)}
                        />
                        <label
                            htmlFor="toggle"
                            className={`block h-7 w-14 cursor-pointer rounded-full transition-colors duration-300 ${isYearly ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                            <span className={`absolute h-5 w-5 bg-white rounded-full top-1 transition-all duration-300 ease-in-out ${isYearly ? 'left-8' : 'left-1'}`}></span>
                        </label>
                    </div>
                    <span className="font-bold">
                        Yearly 
                        <span className="text-primary font-normal border border-primary rounded-full py-0.5 px-2 ml-2">24% off</span>
                    </span>
                </div>
            </div>

            <div className={`grid ${getGridColumns()} gap-8 mx-auto`}>
                {packages.map((pkg: PackagePricing, index: number) => (
                    <Card key={index} pkg={pkg} isYearly={isYearly} />
                ))}
            </div>
        </div>
    );
};

export default Packages;