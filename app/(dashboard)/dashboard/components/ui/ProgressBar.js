import React from "react";

const ProgressBar = ({ value, label }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
      <div
        className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      >
        {label && (
          <span className="absolute left-1 flex justify-center items-center min-w-fit h-full text-xs font-medium text-black whitespace-nowrap overflow-hidden truncate">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
