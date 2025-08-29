"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Header } from "@/shared/components/layout/Header";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="w-full max-w-md">
            <Image
              src="/mirante-lucia-almeida.png"
              width={456}
              height={675}
              alt="Mirante Lucia Almeida"
              className="rounded-lg"
            />
          </div>

          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Image
                src="/cadastre.png"
                alt="Cadastre-se"
                width={442}
                height={154}
              />
            </div>

            <Card className="border-none">
              <CardContent>
                <RegisterForm />

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400">
                    Já tem uma conta?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Faça login
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
