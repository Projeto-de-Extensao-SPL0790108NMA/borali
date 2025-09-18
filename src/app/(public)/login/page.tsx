"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new auth/login route
    router.replace("/auth/login");
  }, [router]);

  return null; // This page will redirect, so no need to render anything
}
