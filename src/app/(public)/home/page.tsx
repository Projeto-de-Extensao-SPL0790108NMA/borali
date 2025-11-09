'use client'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NextEvents from '../components/next-events';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchEvents from '../components/search-events';



export default function HomePage() {

  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(false);

  const spotlight = { name: "SHOW SERTANEJO AO VIVO", desc: "Venha curtir um show ao vivo que acontecerá no Mirante Lúcia Almeida" }

  const handlePromoteEvent = () => {
    setIsRedirecting(true)
    router.push('/login')
  }

  return (
    <div className="flex flex flex-col">
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
        className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-black/60"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/mirante-hero.png')" }}
      >
        <div className="flex items-center justify-end h-full gap-10 me-72">

          <div className="text-right max-w-sm text-justify">
            <h2 className="text-4xl font-bold ">{spotlight.name}</h2>
            <p className="text-2xl font-light">
              {spotlight.desc}
            </p>
          </div>

          <ArrowForwardIosIcon sx={{ fontSize: 40 }} />

        </div>
      </section>

      <NextEvents />

      <section className="mt-6 mb-12">
        <div
          className="bg-[#EEE1FF] flex flex-row max-h-250 h-250 place-content-around"
        >
          <Image
            src={"/promote-people.png"}
            alt="Ilustração de pessoas promovendo evento"
            width={544}
            height={303}
            className="-translate-y-12"
          />

          <div className="w-full md:w-1/2 text-center md:text-left py-5 text-justify">
            <h2
              className="text-3xl sm:text-4xl text-black font-extrabold mb-3"
            >
              Promova seu evento
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>


            <Button
              variant="contained"
              onClick={handlePromoteEvent}
              sx={{
                backgroundColor: '#D20000',
                color: 'white',
                padding: '12px 50px',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1rem',
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