"use client";

import { ReactNode } from "react";
import { Container } from "./_components/container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
