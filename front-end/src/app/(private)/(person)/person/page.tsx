"use client";

import NextEvents from "@/components/ui/next-events";
import { SearchEvents } from "@/components/ui/search-events";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PersonHomePage() {
  const spotlight = {
    name: "SHOW SERTANEJO AO VIVO",
    desc: "Venha curtir um show ao vivo que acontecerá no Mirante Lúcia Almeida",
  };
  const [filters, setFilters] = useState<{ title?: string; date?: string }>({});

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleEventDetail = (id: string) => {
    setIsLoading(true);

    router.push(`/person/events/${id}`);
  };

  return (
    <div className="flex flex-col">
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.2s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          </div>
        </div>
      )}

      <section
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-black/60 flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/mirante-hero.png')",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 px-4 md:px-0 py-20 md:py-0 text-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              {spotlight.name}
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl font-light">
              {spotlight.desc}
            </p>
          </div>

          <ArrowForwardIosIcon
            sx={{
              fontSize: 40,
              color: "white",
              display: { xs: "none", md: "block" },
            }}
          />
        </div>
      </section>

      <div className="mb-6 md:mb-0">
        <SearchEvents onSearch={setFilters} />
      </div>
      <div className="mx-auto w-full px-4 md:px-0 md:max-w-7xl">
        <h2
          className="text-xl md:text-2xl mb-4 md:mb-6"
          style={{
            color: "#242565",
          }}
        >
          Próximos eventos
        </h2>

        <NextEvents filters={filters} onCardClick={handleEventDetail} />
      </div>
    </div>
  );
}
