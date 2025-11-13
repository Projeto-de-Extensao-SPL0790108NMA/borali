'use client'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NextEvents from '../../../components/ui/next-events';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchEvents } from '@/components/ui/search-events';



export default function HomePage() {

  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [filters, setFilters] = useState<{ title?: string; date?: string }>({});

  const spotlight = { name: "SHOW SERTANEJO AO VIVO", desc: "Venha curtir um show ao vivo que acontecerá no Mirante Lúcia Almeida" }

  const handlePromoteEvent = () => {
    setIsRedirecting(true)
    router.push('/login')
  }

  const handleOnCardClick = () => {
    setIsRedirecting(true)
    router.push('/login')
  }

  return (
    <div className="flex flex-col">
      {isRedirecting && (
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
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/mirante-hero.png')" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 px-4 md:px-0 py-20 md:py-0 text-center">

          <div className="max-w-2xl text-white">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">{spotlight.name}</h2>
            <p className="text-lg md:text-2xl lg:text-3xl font-light">
              {spotlight.desc}
            </p>
          </div>

          <ArrowForwardIosIcon sx={{ fontSize: 40, color: 'white', display: { xs: 'none', md: 'block' } }} />

        </div>
      </section>


      <SearchEvents onSearch={setFilters} />
      <div className='mx-auto px-4 md:px-0 max-w-7xl'>
        <h2 className="text-xl md:text-2xl mb-4 md:mb-6" style={{
          color: "#242565"
        }}>
          Próximos eventos
        </h2>


        <NextEvents filters={filters} onCardClick={handleOnCardClick} />

      </div>

      <section className="mt-6 mb-12 px-4 md:px-0">
        <div
          className="bg-[#EEE1FF] flex flex-col md:flex-row items-center md:place-content-around py-8 md:py-0 min-h-[250px]"
        >
          <div className="hidden md:block">
            <Image
              src={"/promote-people.png"}
              alt="Ilustração de pessoas promovendo evento"
              width={544}
              height={303}
              className="-translate-y-12"
            />
          </div>
          <div className="block md:hidden mb-4">
            <Image
              src={"/promote-people.png"}
              alt="Ilustração de pessoas promovendo evento"
              width={300}
              height={167}
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0 py-5">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl text-black font-extrabold mb-3"
            >
              Promova seu evento
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>


            <Button
              variant="contained"
              onClick={handlePromoteEvent}
              sx={{
                backgroundColor: '#D20000',
                color: 'white',
                padding: { xs: '10px 30px', md: '12px 50px' },
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', md: '1rem' },
                '&:hover': {
                  backgroundColor: '#ff5252ff',
                },
              }}
            >
              Criar Evento
            </Button>

          </div>
        </div>
      </section>


    </div >
  )
}