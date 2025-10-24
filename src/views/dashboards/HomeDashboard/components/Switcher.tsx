import { useState } from "react";

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-white text-xs sm:text-sm">Today's trending tokens</span>
      <button
        onClick={handleToggle}
        className={`w-10 h-5 flex items-center  rounded-full p-1 ${
          isOn ? "bg-primary" : "bg-gray-600"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Switch;
