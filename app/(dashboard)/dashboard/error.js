"use client";
import React from "react";

export default function Error({ error, retry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-red-500 capitalize p-4 text-xl">{error.message}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={retry}
      >
        Retry
      </button>
    </div>
  );
}
