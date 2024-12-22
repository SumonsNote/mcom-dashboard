"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackButton() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <button
      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-950 to-emerald-500 p-[2px] transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-teal-500/25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.back()}
      aria-label="Go back"
    >
      <div className="relative flex gap-4  w-20 items-center justify-center overflow-hidden rounded-lg bg-white transition-all duration-300 ease-in-out group-hover:bg-opacity-90 dark:bg-gray-900">
        <ArrowLeft
          className={`h-5 w-5 text-gray-500 transition-all duration-300 ease-in-out ${
            isHovered ? "-translate-x-6" : ""
          }`}
        />
        <span
          className={`absolute font-semibold text-gray-500 transition-all duration-300 ease-in-out ${
            isHovered ? "translate-x-1 opacity-100" : "translate-x-4 opacity-0"
          }`}
        >
          Back
        </span>
      </div>
    </button>
  );
}
