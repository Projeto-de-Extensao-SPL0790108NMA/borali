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
        <footer className="bg-[#0A075F] flex flex-col py-6 px-3 gap-5 text-white">

            <div className="flex flex-row place-content-around">

                <div className="flex flex-col max-w-md gap-3 leading-relaxed">
                    <Image
                        src={'/logo.png'}
                        height={36}
                        width={75}
                        alt="logo"
                    />
                    <p className="break-all">
                        Este projeto foi desenvolvido para a Uninorte com o objetivo de resolver questões cotidianas, visando otimizar processos e oferecer soluções práticas para o dia a dia.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold">
                        Crie seu Evento
                    </h3>
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-6">
                            {navLinks.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink asChild>

                                        <Link href={item.href} className="text-base hover:text-gray-300 transition-colors">
                                            {item.name}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold">
                        Borali
                    </h3>

                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col">
                            {borali.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink asChild>

                                        <Link href={item.href} className="text-base hover:text-gray-300 transition-colors">
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
                        <h3 className="text-2xl font-bold mb-2">
                            Fique por dentro dos Eventos
                        </h3>
                        <p className="text-md">
                            Junte-se à nossa lista de e-mails para ficar por dentro das novidades sobre eventos e shows
                        </p>
                    </div>
                    <form
                        className="bg-white py-3 flex flex-row gap-5 rounded-full place-content-center"
                        action="mailto:noreply@boralimanaus.com.br"
                        method="post"
                        encType="text/plain"
                    >
                        <input type="email"
                            placeholder="COLOQUE SEU EMAIL"
                            className="bg-transparent border-none outline-none focus:ring-0 text-gray-900 placeholder-gray-400" />

                        <button type="submit" className="bg-[#D20000] py-2 px-4 rounded-full">
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