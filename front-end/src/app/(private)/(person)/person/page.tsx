'use client'

import NextEvents from '@/components/ui/next-events';
import { SearchEvents } from '@/components/ui/search-events';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PersonHomePage() {

  const spotlight = { name: "SHOW SERTANEJO AO VIVO", desc: "Venha curtir um show ao vivo que acontecerá no Mirante Lúcia Almeida" }
  const [filters, setFilters] = useState<{ title?: string; date?: string }>({});

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleEventDetail = (id: string) => {
    setIsLoading(true);

    router.push(`/person/events/${id}`)
  }

  return (
    <div className='flex flex-col'>

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
        className="w-full h-screen bg-cover bg-center bg-no-repeat bg-black/60"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/mirante-hero.png')" }}
      >
        <div className="flex items-center justify-end h-full gap-10 me-72">

          <div className="text-right max-w-sm text-justify text-white">
            <h2 className="text-4xl font-bold ">{spotlight.name}</h2>
            <p className="text-2xl font-light">
              {spotlight.desc}
            </p>
          </div>

          <ArrowForwardIosIcon sx={{ fontSize: 40, color: 'white' }} />

        </div>
      </section>

      <SearchEvents onSearch={setFilters} />
      <div className='mx-auto'>
        <h2 className="text-2xl mb-6" style={{
          color: "#242565"
        }}>
          Próximos eventos
        </h2>


        <NextEvents filters={filters} onCardClick={handleEventDetail} />

      </div>


    </div>

  );
}
