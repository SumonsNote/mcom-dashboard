import React from "react";

export default function Loading() {
  return (
    <div className="p-6 space-y-6  min-h-screen w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        <span className="mt-4 text-lg font-semibold text-gray-500">
          Loading...
        </span>
      </div>
    </div>
  );
}
