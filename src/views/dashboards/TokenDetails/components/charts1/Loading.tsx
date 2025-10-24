import React from "react";


interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-[#1A2526] rounded-lg">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-[#26A69A] rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-300 text-sm">{message}</p>
    </div>
  );
};

export default Loading;