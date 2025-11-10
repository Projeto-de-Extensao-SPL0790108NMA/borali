"use client"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function Header() {

    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/home" },
        { name: "Mapa", href: "/map" },
        { name: "Sobre", href: "/sobre" },
    ];

    const isHome = pathname === "/home";

    return (
        <div className={`flex place-content-around items-center w-full p-5 text-white transition-all duration-300
        ${isHome ? "fixed top-0 left-0 z-50 bg-transparent backdrop-blur-xs" : "bg-[#001E78] backdrop-blur-md shadow-lg"}
      `}>
            <Image
                src={'/logo.png'}
                height={36}
                width={75}
                alt="logo"
            />

            <div className="flex items-center space-x-8">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-6">
                        {navLinks.map((item) => (
                            <NavigationMenuItem key={item.name}>
                                <NavigationMenuLink asChild>

                                    <Link href={item.href} className="text-base hover:text-gray-300 transition-colors">
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
        </div>

    )
}