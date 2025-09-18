"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new auth/register route
    router.replace("/auth/register");
  }, [router]);

  return null; // This page will redirect, so no need to render anything
}
