import { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background image with shadow overlay */}
      <div className="absolute inset-0">
        <Image
          src="/auth-bg-image.jpg"
          className="absolute inset-0"
          alt="Logo"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {/* Dark overlay for shadow effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="w-full h-screen flex flex-col md:flex-row relative z-10">
        {/* Left side - Borali logo and text */}
        <div className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <Image
              alt="logo"
              src="/borali-logo.png"
              height={110}
              width={250}
              className="mb-6 md:mb-8 self-start"
            />
            <h2 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4">
              Cultura perto de você
            </h2>
            <p className="text-gray-200 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Lado direito com formulário */}
        <div className="w-full md:w-1/2 flex items-end justify-center px-6 pt-6 pb-0 md:overflow-y-auto">
          <div className="z-20 mx-4 w-full max-w-md rounded-2xl bg-white p-10 shadow-xl rounded-b-none md:max-h-[calc(100vh-24px)] md:overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
