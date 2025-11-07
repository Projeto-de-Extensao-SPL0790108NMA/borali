import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NextEvents from '../components/next-events';


export default function HomePage() {

  const spotlight = { name: "SHOW SERTANEJO AO VIVO", desc: "Venha curtir um show ao vivo que acontecerá no Mirante Lúcia Almeida" }


  return (
    <div className="flex flex flex-col">

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

    </div>
  )
}