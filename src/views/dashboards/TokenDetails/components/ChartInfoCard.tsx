import { FC } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ProgressCircle from "../../common/ProgressCircle";


type InfoCardProps = {
    color: string;
    gap: string;
    title: string;
    image: string;
    height: number;
    width: number;
    value: number | string;
    strokeWidth: number;
};

const ChartInfoCard: FC<InfoCardProps> = ({ color, gap, title, image, height, width, strokeWidth, value }) => {
    return (
        <div className={`p-2 text-white rounded-lg flex flex-col justify-between`} style={{ backgroundColor: color, gap, }}>
            <div className="flex items-center justify-between">
                <div className="flex  gap-2">
                    <img src="/img/others/circleIcon.png" alt="Icon" className="h-6" />
                    <span className="font-bold">{title}</span>
                </div>
                <IoIosInformationCircleOutline size={20} className="text-gray-300" />
            </div>
          <div className="flex justify-center py-4">
          <ProgressCircle width={width} height={height} value={value} strokeWidth={strokeWidth} />
          </div>
        </div>
    );
};

export default ChartInfoCard