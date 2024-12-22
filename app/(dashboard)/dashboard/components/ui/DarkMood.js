// "use client";

// import { useEffect, useCallback, useState } from "react";
// import { AiFillSun, AiFillMoon } from "react-icons/ai";

// export default function DarkModeToggle({ isCollapsed }) {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const theme = localStorage.getItem("theme");
//     const prefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (theme === "dark" || (!theme && prefersDark)) {
//       document.documentElement.classList.add("dark");
//       setIsDark(true);
//     } else {
//       document.documentElement.classList.remove("dark");
//       setIsDark(false);
//     }
//   }, []);

//   const toggleTheme = useCallback(() => {
//     setIsDark((prevIsDark) => {
//       const newIsDark = !prevIsDark;
//       if (newIsDark) {
//         document.documentElement.classList.add("dark");
//         localStorage.setItem("theme", "dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//         localStorage.setItem("theme", "light");
//       }
//       return newIsDark;
//     });
//   }, []);

//   const handleKeyDown = useCallback(
//     (event) => {
//       if (event.key === "Enter" || event.key === " ") {
//         event.preventDefault();
//         toggleTheme();
//       }
//     },
//     [toggleTheme]
//   );

//   return (
//     <div className="flex items-center w-full">
//       <button
//         onClick={toggleTheme}
//         onKeyDown={handleKeyDown}
//         aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
//         className={`relative flex items-center justify-between gap-2 px-1 py-1 overflow-hidden transition duration-300 ease-in-out bg-blue-500 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-700 ${
//           isCollapsed ? "w-11" : "w-32"
//         }`}
//       >
//         <span className="sr-only">{isDark ? "Light" : "Dark"} mode</span>
//         <span
//           className={`p-1.5 rounded-full ${
//             isDark
//               ? "bg-gray-700 text-yellow-400"
//               : "bg-yellow-400 text-gray-900"
//           } ${isCollapsed ? (isDark ? "hidden" : "block") : "block"}`}
//         >
//           <AiFillSun className="w-6 h-6" aria-hidden="true" />
//         </span>
//         <span
//           className={`p-1.5 rounded-full ${
//             isDark ? "bg-blue-900 text-white" : "bg-gray-400 text-gray-700"
//           }`}
//         >
//           <AiFillMoon className="w-6 h-6" aria-hidden="true" />
//         </span>
//         {!isCollapsed && (
//           <span
//             className={`absolute w-9 h-9 transition-transform duration-300 ease-in-out transform rounded-full shadow-md ${
//               isDark
//                 ? "translate-x-[5.3rem] dark:bg-gray-900"
//                 : "translate-x-0 bg-white"
//             }`}
//             style={{ width: isCollapsed ? "1.5rem" : "2.25rem" }}
//           />
//         )}
//       </button>
//     </div>
//   );
// }
"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function DarkModeToggle({ isCollapsed }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prevIsDark) => {
      const newIsDark = !prevIsDark;
      if (newIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newIsDark;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleTheme();
      }
    },
    [toggleTheme]
  );

  return (
    <div className="flex items-center w-full">
      <button
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`relative button-main flex ${
          !isDark ? "after:bg-custom-light" : "after:bg-custom-dark"
        } items-center justify-between gap-2 h-12 px-2 py-2 overflow-hidden transition duration-300 ease-in-out  ${
          isCollapsed ? "w-11" : "w-32"
        }`}
      >
        <span className="sr-only">{isDark ? "Light" : "Dark"} mode</span>
        <span
          className={`button-light  transition duration-300 ease-in-out  ${
            isDark ? "invisible left-12" : "block left-2"
          }`}
          // style={{
          //   left: "10px",
          // }}
        >
          <SunMediumIcon
            className={`w-7 h-7 ${
              isDark ? "text-[#cfcfcfc2]" : "text-yellow-400"
            }`}
            aria-hidden="true"
          />
        </span>
        <span className={`button-dark ${!isDark ? "hidden" : "block right-2"}`}>
          <MoonIcon
            className={`w-7 h-7 ${
              !isDark ? "text-[#cfcfcfc2]" : "text-blue-400"
            }`}
            aria-hidden="true"
          />
        </span>
      </button>
    </div>
  );
}
