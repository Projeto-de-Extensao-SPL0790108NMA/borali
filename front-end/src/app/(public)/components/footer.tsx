import Image from "next/image"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export default function Footer() {
    const navLinks = [
        { name: "Adicione", href: "/login" },
    ];
    const borali = [
        { name: "Sobre", href: "/about" },
        { name: "Contato", href: "/contact" },
    ];


    return (
        <footer className="bg-[#0A075F] flex flex-col py-6 px-3 md:px-6 gap-5 text-white">

            <div className="flex flex-col md:flex-row place-content-around gap-8 md:gap-4">

                <div className="flex flex-col max-w-md gap-3 leading-relaxed">
                    <Image
                        src={'/logo.png'}
                        height={36}
                        width={75}
                        alt="logo"
                    />
                    <p className="text-sm md:text-base break-words">
                        Este projeto foi desenvolvido para a Uninorte com o objetivo de resolver questões cotidianas, visando otimizar processos e oferecer soluções práticas para o dia a dia.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-bold">
                        Crie seu Evento
                    </h3>
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col md:flex-row md:space-x-6 gap-2 md:gap-0">
                            {navLinks.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink asChild>

                                        <Link href={item.href} className="text-sm md:text-base hover:text-gray-300 transition-colors">
                                            {item.name}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-bold">
                        Borali
                    </h3>

                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col gap-2">
                            {borali.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink asChild>

                                        <Link href={item.href} className="text-sm md:text-base hover:text-gray-300 transition-colors">
                                            {item.name}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                </div>

                <div className="flex flex-col gap-3 max-w-md">
                    <div >
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                            Fique por dentro dos Eventos
                        </h3>
                        <p className="text-sm md:text-md">
                            Junte-se à nossa lista de e-mails para ficar por dentro das novidades sobre eventos e shows
                        </p>
                    </div>
                    <form
                        className="bg-white py-2 md:py-3 flex flex-col sm:flex-row gap-2 md:gap-5 rounded-full place-content-center px-2 md:px-0"
                        action="mailto:noreply@boralimanaus.com.br"
                        method="post"
                        encType="text/plain"
                    >
                        <input type="email"
                            placeholder="COLOQUE SEU EMAIL"
                            className="bg-transparent border-none outline-none focus:ring-0 text-gray-900 placeholder-gray-400 text-sm md:text-base flex-1 px-2 md:px-0" />

                        <button type="submit" className="bg-[#D20000] py-2 px-4 rounded-full text-sm md:text-base whitespace-nowrap">
                            INSCREVA-SE
                        </button>
                    </form>

                </div>

            </div>

            <hr className="w-1/2 mx-auto border-t border-black-400 opacity-40 my-6" />

            <div className="text-center text-sm text-bold">
                Copyright © 2025 Boralí
            </div>

        </footer>
    )
}