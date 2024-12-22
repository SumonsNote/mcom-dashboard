import React from "react";

export default function Error({ error }) {
  return (
    <div>
      <div className="p-6 space-y-6 min-h-screen w-full">
        <div className="flex flex-col items-center justify-center">
          <span className="mt-4 text-lg font-semibold text-red-500">
            {error}
          </span>
        </div>
      </div>
    </div>
  );
}
