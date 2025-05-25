"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type MenuItemPropsType = {
  link: string;
  name: string;
};

export const MenuItem = (props: MenuItemPropsType) => {
  const { link, name } = props;
  const pathname = usePathname();
  
  const isActiveRoute = (route: string) => {
    return pathname === route;
  };
  
  return (
    <Link
      href={link}
      className={
        isActiveRoute(link)
          ? "font-bold !text-orange-600"
          : "!text-gray-400 hover:text-orange-600"
      }
    >
      {name}
    </Link>
  );
};
