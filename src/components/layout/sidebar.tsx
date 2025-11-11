"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { UserRole } from "@/domain/auth/auth-types";
import { clearUserData } from "@/lib/storage/user-storage";
import { useUserRole } from "@/hooks/use-user-role";

interface SidebarItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  className?: string;
}

const COMPANY_MENU_ITEMS: SidebarItem[] = [
  { label: "Home", href: "/company" },
  { label: "Perfil", href: "/company/profile" },
  { label: "Eventos", href: "/company/events" },
  { label: "Cadastrar \neventos", href: "/company/events/create" },
];

const PERSON_MENU_ITEMS: SidebarItem[] = [
  { label: "Home", href: "/person" },
  { label: "Perfil", href: "/person/profile" },
  { label: "Preferências", href: "/person/favorites" },
];

const HOME_ROUTES = ["/company", "/person"] as const;

function isHomeRoute(href: string): boolean {
  return HOME_ROUTES.includes(href as (typeof HOME_ROUTES)[number]);
}

function isItemActive(
  item: SidebarItem,
  pathname: string,
  allItems: SidebarItem[]
): boolean {
  const isHome = isHomeRoute(item.href);

  if (isHome) {
    return pathname === item.href;
  }

  if (pathname === item.href) {
    return true;
  }

  if (
    pathname.startsWith("/person/events/") &&
    item.href === "/person/favorites"
  ) {
    return true;
  }

  const hasExactMatch = allItems.some(
    (otherItem) => otherItem.href !== item.href && pathname === otherItem.href
  );

  return !hasExactMatch && pathname.startsWith(`${item.href}/`);
}

function buildNavItemClasses(isFirst: boolean, isActive: boolean): string {
  const baseClasses =
    "text-[1rem] leading-[1.5rem] font-normal text-white hover:opacity-100 transition-opacity";
  const marginTop = isFirst ? "mt-0" : "mt-[2rem]";
  const opacity = isActive ? "opacity-100" : "opacity-[0.67]";

  return `${marginTop} ${opacity} ${baseClasses}`;
}

interface NavItemProps {
  item: SidebarItem;
  isActive: boolean;
  isFirst: boolean;
}

function NavItem({ item, isActive, isFirst }: NavItemProps) {
  const hasLineBreak = item.label.includes("\n");
  const className = buildNavItemClasses(isFirst, isActive);

  return (
    <Link href={item.href} className={className}>
      {hasLineBreak ? (
        <span className="block whitespace-pre-line">{item.label}</span>
      ) : (
        item.label
      )}
    </Link>
  );
}

export function Sidebar({ className }: SidebarProps): React.ReactNode {
  const pathname = usePathname();
  const router = useRouter();
  const { role, isLoading } = useUserRole();

  const menuItems = useMemo(() => {
    if (!role) {
      return [];
    }
    return role === UserRole.Company ? COMPANY_MENU_ITEMS : PERSON_MENU_ITEMS;
  }, [role]);

  const handleLogout = async (): Promise<void> => {
    await clearUserData();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <aside className={`bg-primary-blue ${className || ""}`}>
        <div className="h-full w-[9rem] animate-pulse" />
      </aside>
    );
  }

  return (
    <aside
      className={`flex h-full w-[9rem] flex-col bg-primary-blue rounded-tr-[3.5rem] font-poppins ${
        className || ""
      }`}
    >
      <nav className="flex flex-1 flex-col px-[1.4375rem] pt-[9.5rem]">
        {menuItems.map((item, index) => (
          <NavItem
            key={item.href}
            item={item}
            isActive={isItemActive(item, pathname, menuItems)}
            isFirst={index === 0}
          />
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="px-[1.4375rem] pb-[1.5rem] text-left text-[1rem] leading-[1.5rem] font-normal text-white opacity-100 hover:opacity-90 transition-opacity"
      >
        Sair
      </button>
    </aside>
  );
}
