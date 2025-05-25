import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/logo-white.png";
import Typo from "@/public/images/logo-text.png";
import { MenuItem } from "@/components/menu-item";
import LoginButton from "@/components/login-button";
import { HeaderMobileMenu } from "./header-mobile-menu";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center text-lg font-bold text-orange-600">
          <Link href="/" className="flex items-center">
            <Image height={90} src={Logo} alt="Ambyint Videos Logo" />
            <Image height={50} src={Typo} alt="Ambyint Videos Text" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <MenuItem link="/" name="Home" />
            <MenuItem link="/about-us" name="About Us" />
            <MenuItem link="/core-features" name="Core Features" />
            <MenuItem link="/contact-us" name="Contact Us" />
          </nav>
          <LoginButton />
        </div>

        <HeaderMobileMenu />
      </div>
    </header>
  );
};
