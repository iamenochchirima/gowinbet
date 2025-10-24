import { FC } from "react"
import { GoArrowUpRight } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PackagePricing } from "@/@types/types";
import { useAuth } from "@/auth";

type Props = {
    pkg: PackagePricing
    isYearly: boolean
}

const Card: FC<Props> = ({ pkg, isYearly }) => {
    const { user} = useAuth()
    const priceInfo = isYearly ? pkg.price.yearly : pkg.price.monthly;
    const buttonText = pkg.name === "Enterprise" ? "Schedule a Call" : "Get Started";

    return (
        <div
            className={`p-6 rounded-2xl border shadow-lg bg-gray-800 ${pkg.name === "Professional" ? " border-primary bg-gradient-to-bl from-[#202b21] via-gray-800 to-gray-800" : "border-gray-700"
                }`}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className="mb-4 flex justify-between">
                        <div className=""><h3 className="text-xl font-bold ">{pkg.name}</h3></div>
                        {pkg.name === "Professional" && (<button className="text-xs rounded-full bg-primary text-black py-0.5 px-2">Bestseller</button>)}
                    </div>
                    <div className="mb-4">
                        <span className="text-4xl text-primary font-bold">{pkg.price.currency}{priceInfo.amount}</span>/
                        <span className="text-sm">{isYearly ? "year" : "month"}</span>
                        {isYearly && (
                            <span className="text-sm text-gray-400 ml-2">
                                ({pkg.price.currency}{pkg.price.yearly.yearly_monthly}/month)
                            </span>
                        )}
                    </div>
                    <p className="text-sm mb-4">{pkg.description}</p>
                    <div className={`h-[2px] bg-gradient-to-r w- from-gray-800 via-primary ${pkg.name === "Professional" ? "to-[#19241a]" : "to-gray-800"}  my-3`}></div>
                    <ul className="mb-6 space-y-2">
                        {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <IoCheckmarkCircleOutline size={20} className="text-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <a
                    href={priceInfo.link + '?prefilled_email=' + user.email}
                    className={`px-6 py-4 rounded-xl text-center ${pkg.name === "Professional"
                        ? "bg-primary text-black"
                        : " text-white border border-primary"
                        }`}
                >
                    <span>{buttonText}</span>
                    <GoArrowUpRight size={20} className="inline-block ml-2" />
                </a>
            </div>
        </div>
    )
}

export default Card