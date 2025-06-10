import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-xl shadow-md p-4 w-60 h-96 animate-pulse bg-white"
        >
          <div className="h-32 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/4 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-full mt-auto"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
