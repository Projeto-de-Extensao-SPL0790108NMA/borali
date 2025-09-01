import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary py-8 px-6 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary text-xl font-bold mb-4">Borali</h3>
            <p className="text-white">
              Explore Manaus e descubra os melhores lugares para visitar.
            </p>
          </div>

          <div>
            <h3 className="text-primary text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="text-white hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-primary">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary text-xl font-bold mb-4">Contato</h3>
            <p className="text-white">contato@borali.com.br</p>
            <p className="text-white">Manaus, AM</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} Borali. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
