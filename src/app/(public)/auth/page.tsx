"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if accessing the base auth route
  useEffect(() => {
    if (pathname === "/auth") {
      router.replace("/auth/login");
    }
  }, [pathname, router]);

  // This is just a placeholder page
  // The actual content is rendered in the layout component
  return null;
}
