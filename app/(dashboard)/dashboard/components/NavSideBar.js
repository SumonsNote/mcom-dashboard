"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineApple } from "react-icons/ai";
import { FaAirbnb, FaDashcube, FaShopify, FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdCategory, MdOutlinePhoneIphone } from "react-icons/md";
import DarkMood from "./ui/DarkMood";

import { logout } from "@/app/actions";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";

export default function NavSideBar({ setIsCollapsed, isCollapsed, isSmall }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      icon: <FaDashcube className="w-6 h-6" />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/user",
      icon: <FaUser className="w-6 h-6" />,
      label: "Users",
    },
    {
      href: "/dashboard/category",
      icon: <MdCategory className="w-6 h-6" />,
      label: "Category",
    },
    {
      href: "/dashboard/brands",
      icon: <AiOutlineApple className="w-6 h-6" />,
      label: "Brands",
    },
    {
      href: "/dashboard/products",
      icon: <MdOutlinePhoneIphone className="w-6 h-6" />,
      label: "Products",
    },
    {
      href: "/dashboard/banners",
      icon: <FaAirbnb className="w-6 h-6" />,
      label: "Banners",
    },
    {
      href: "/dashboard/orders",
      icon: <FaShopify className="w-6 h-6" />,
      label: "Orders",
    },
    {
      href: "https://www.kabbomobileshop.com",
      icon: <ShoppingBasket className="w-6 h-6" />,
      label: "Shop",
    },
  ];

  const handleSignOut = async () => {
    const res = await logout();
    if (res.success) {
      router.refresh();
      router.push("/admin-login");
    }
  };

  return (
    <div
      className={`bg-gray-900 relative text-white ${
        isCollapsed ? "xl:w-20 w-16" : "xl:w-64 w-48"
      } min-w-[4rem] flex flex-col duration-300`}
      onClick={() => isSmall && setIsCollapsed(true)}
    >
      <div className="flex items-center h-36 justify-center cursor-pointer">
        <Image
          width={175}
          height={25}
          alt="logo"
          src="https://res.cloudinary.com/dwe6gs8sp/image/upload/v1734710404/ecom_xravvy.png"
        />
      </div>

      <nav className="max-h-[calc(100vh-6rem)] overflow-y-auto flex-1">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            target={label === "Shop" ? "_blank" : "_parent"}
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 dark:text-gray-500 ${
              (
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.includes(href)
              )
                ? "bg-gray-800 dark:bg-gray-950"
                : "hover:bg-gray-800 dark:hover:bg-gray-950"
            }`}
          >
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
            >
              {icon}
              {!isCollapsed && <span className="ml-4">{label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      <div className="space-y-4 p-2 h-32 bg-gray-900 w-full">
        <DarkMood isCollapsed={isCollapsed} />
        {session?.user?.id && (
          <button
            onClick={handleSignOut}
            className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-400 py-3 px-4 rounded-md transition duration-200 flex items-center overflow-hidden"
          >
            <IoLogOut className="w-6 h-6" />
            {!isCollapsed && <span className="ml-4">Logout</span>}
          </button>
        )}
      </div>
    </div>
  );
}
