import One from "./One";
import Three from "./Three";
import TwoV2 from "./TradeView/TwoV2";
import Two from "./Two";

const Charts1 = () => {

    return (
        <div className="py-5">
            <div className="llg2:grid llg2:grid-cols-5  gap-2 md:hidden">
                <div className="col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <One />
                </div>
                <div className="col-span-3 bg-gray-800 my-3 llg2:my-0 border border-gray-700 rounded-lg p-3">
                    <TwoV2 />
                </div>
                <div className="col-span-1 bg-gray-800 border border-gray-700 rounded-lg ">
                    <Three />
                </div>
            </div>
            <div className="llg2:hidden md:block hidden">
                <div className="grid grid-cols-2 gap-2">
                    <div className=" bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <One />
                    </div>
                    <div className=" bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <Three />
                    </div>
                </div>
                <div className=" mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 ">
                    <TwoV2 />
                </div>
            </div>
        </div>
    )
}

export default Charts1