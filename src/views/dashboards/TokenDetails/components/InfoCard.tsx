import { useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

type InfoCardProps = {
  color: string;
  gap: string;
  title: string;
  value: string | number;
  section?: number;
};

const InfoCard: React.FC<InfoCardProps> = ({ color, gap, title, value, section }) => {
  const [dynamicGap, setDynamicGap] = useState<string>(gap);

  useEffect(() => {
    const updateGap = () => {
      setDynamicGap(window.innerWidth < 620 ? "50px" : gap);
    };
    updateGap();
    window.addEventListener("resize", updateGap);
    return () => window.removeEventListener("resize", updateGap);
  }, [gap]);

  const [screenW, setScreenW] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenW(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div
      className="p-2 text-white rounded-lg flex flex-col justify-between"
      style={{ backgroundColor: color, gap: dynamicGap, height: section === 2 && screenW < 1000 && screenW > 620 ? "100px" : "auto" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <img src="/img/others/circleIcon.png" alt="Icon" className="h-4" />
          <span className="font-bold text-xs">{title}</span>
        </div>
        <IoIosInformationCircleOutline size={20} className="text-gray-300" />
      </div>
      <h3 className="font-bold text-lg font-MartianMono">{value}</h3>
    </div>
  );
};

export default InfoCard;
