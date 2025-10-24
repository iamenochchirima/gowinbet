
import TwoV2 from "../charts1/TradeView/TwoV2";
import { default as TwoV0 } from "../charts1/Two";
import Five from "./Five";
import Four from "./Four";
import One from "./One";
import Three from "./Three";
import Two from "./Two";
const Charts2 = () => {
    return (
        <div className="">
            <div className=" flex flex-col gap-2">
                <div className="grid grid-cols-1 lg2:grid-cols-3 llg2:grid-cols-4 gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className=" border border-gray-700 rounded-lg p-2">
                        <TwoV0 />
                    </div>
                    <div className="border border-gray-700 rounded-lg p-2">
                        <Two />
                    </div>
                    <div className="border border-gray-700 rounded-lg p-2">
                        <Four />
                    </div>
                    <div className="bg-gray-800 rounded-lg border border-gray-700">
                        <Five />
                    </div>
                </div>
            </div>

        </div>
        // <div className="grid grid-cols-1 llg2:grid-cols-2 gap-2">
        //     <div className=" flex flex-col gap-2">
        //         <div className="flex flex-col sm:flex-row gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
        //             <div className="sm:w-1/2 border border-gray-700 rounded-lg p-2">
        //                 <TwoV0 />
        //             </div>
        //             <div className="sm:w-1/2 border border-gray-700 rounded-lg p-2">
        //                 <Two />
        //             </div>
        //         </div>
        //         <div className="flex flex-col sm:flex-row gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
        //             {/* <div className="sm:w-1/2 border border-gray-700 rounded-lg p-2">
        //                 <Three />
        //             </div> */}
        //             <div className="sm:w-1/2 border border-gray-700 rounded-lg p-2">
        //                 <Four />
        //             </div>
        //         </div>
        //     </div>
        //     <div className="bg-gray-800 rounded-lg border border-gray-700">
        //         <Five />
        //     </div>
        // </div>
    )
}

export default Charts2