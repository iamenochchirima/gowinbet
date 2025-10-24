import React from "react";

interface ProgressBarProps {
  value: number;
  maxValue: number; 
  sections: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, maxValue, sections }) => {
  const progress = Math.min((value / maxValue) * 100, 100);
  const sectionWidth = 100 / sections; 
  const activeSections = Math.ceil((progress / 100) * sections);
  const getSectionColor = (index: number): string => {
    if (index < activeSections) {
      if (progress < 50) return "bg-red-500"; 
      if (progress < 75) return "bg-yellow-500"; 
      return "bg-green-500";
    }
    return "bg-gray-300"; 
  };

  return (
    <div className="relative w-full h-5 rounded-full flex overflow-hidden">
      {Array.from({ length: sections }).map((_, index) => (
        <div
          key={index}
          className={`h-3 ${getSectionColor(index)} transition-all duration-300`}
          style={{ width: `${sectionWidth}%` }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
