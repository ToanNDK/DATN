"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Home,
  ShoppingBag,
  Newspaper,
  Flame,
  Phone,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Shop: ShoppingBag,
  Blog: Newspaper,
  "Hot Deal": Flame,
  Contact: Phone,
};

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-1/3 items-center justify-center gap-5 text-sm font-semibold text-lightColor">
      {headerData?.map((item) => {
        const Icon = iconMap[item?.title] || Home;
        const isActive = pathname === item?.href;

        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`
              group relative flex items-center justify-center p-2 rounded-full transition-all duration-300
              ${isActive ? "bg-shop_light_green text-white" : "hover:bg-shop_light_green hover:text-white"}
            `}
          >
            {/* Icon */}
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

            {/* Tooltip text khi hover */}
            <span
              className={`
                absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-shop_light_green text-white text-xs font-medium
                py-1 px-3 rounded-full shadow-md opacity-0 scale-90 pointer-events-none
                group-hover:opacity-100 group-hover:scale-100 transition-all duration-300
              `}
            >
              {item?.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
