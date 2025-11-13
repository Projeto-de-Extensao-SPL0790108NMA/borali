"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Mapa", href: "/map" },
    { name: "Sobre", href: "/sobre" },
  ];

  const isHome = pathname === "/home";

  return (
    <div
      className={`flex justify-between items-center w-full p-4 md:p-5 text-white transition-all duration-300 
        ${
          isHome
            ? "fixed top-0 left-0 z-50 bg-[#001E78] md:bg-transparent"
            : "bg-[#001E78] backdrop-blur-md shadow-lg z-50"
        }
      `}
    >
      <Image
        src={"/logo.png"}
        height={36}
        width={75}
        alt="logo"
        className="flex-shrink-0"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {navLinks.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="text-base hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href="/login"
          className="
                        px-5 py-1.5  
                        text-base 
                        border border-white 
                        rounded-full 
                        bg-transparent 
                        hover:bg-white 
                        hover:text-black 
                        transition-colors 
                        font-medium 
                        tracking-wide
                    "
        >
          Login
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white p-2"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#001E78] backdrop-blur-md shadow-lg md:hidden z-[9999]">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base hover:text-gray-300 transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                                px-5 py-2
                                text-base 
                                border border-white 
                                rounded-full 
                                bg-transparent 
                                hover:bg-white 
                                hover:text-black 
                                transition-colors 
                                font-medium 
                                tracking-wide
                                text-center
                                mt-2
                            "
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
