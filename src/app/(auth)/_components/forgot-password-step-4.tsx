"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ForgotPasswordStep4() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-40 h-40 rounded-full bg-[#001e78]/10 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-[#001e78]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-[25px] leading-[52px] font-normal text-[#153060]">
          Sucesso
        </h2>
        <p className="text-base text-[#828282] leading-6 tracking-[0.15px]">
          Sua senha foi redefinida com sucesso
        </p>
      </div>

      <Link href="/login">
        <Button
          type="button"
          variant="default"
          className="w-full h-14 rounded-lg bg-[#001e78] text-white font-bold text-xs uppercase hover:bg-[#001e78]/90"
        >
          Continuar
        </Button>
      </Link>
    </div>
  );
}



