"use client";

import Image from "next/image";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Header } from "@/shared/components/layout/Header";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="w-full max-w-md">
            <Image
              src="/arena.png"
              width={456}
              height={675}
              alt="Arena da Amazônia"
              className="rounded-lg"
            />
          </div>

          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Image src="/entre.png" alt="entre" width={442} height={154} />
            </div>

            <Card className="border-none">
              <CardContent className="p-6">
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
