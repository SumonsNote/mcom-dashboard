"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
export default function Modal({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.back({ scroll: "false" });
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);
  // Clone children to pass onDismiss prop

  return (
    <div
      ref={overlay}
      className="fixed z-50 h-screen w-screen top-0 left-0 bg-black/40 backdrop-blur-sm"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="flex justify-center items-center h-[92vh] overflow-y-scroll my-10"
      >
        <div
          className={cn(
            "backdrop-blur-xl shadow-md shadow-black/10 bg-white p-3 rounded-xl",
            className
          )}
        >
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
