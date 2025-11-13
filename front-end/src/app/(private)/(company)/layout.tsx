"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const pathname = usePathname();
  const isHomePage = pathname === "/company";

  return (
    <div className="flex h-screen w-full font-poppins">
      <Sidebar />
      <main className={`flex-1 overflow-auto font-poppins relative z-0 ${!isHomePage ? "pt-16 md:pt-0" : ""}`}>
        {children}
      </main>
    </div>
  );
}
