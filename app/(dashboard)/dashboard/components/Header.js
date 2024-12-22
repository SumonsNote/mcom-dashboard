import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenu5Line } from "react-icons/ri";

export default function Header({ setIsCollapsed, isCollapsed }) {
  const { data: session, status } = useSession();

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center z-50  ">
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {!isCollapsed ? (
          <CgMenuMotion className="w-6 h-6" />
        ) : (
          <RiMenu5Line className="w-6 h-6" />
        )}
      </button>
      <div className="flex items-center gap-8 sm:pr-20">
        {session?.user?.id && (
          <div className="flex items-center gap-2">
            <User className="size-8 text-slate-200" />
            <span className="text-gray-200">{session?.user?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
