import Image from "next/image";
import Link from "next/link";
export default function Register() {
    return (
        <div className="signup-container">
        <form className="signup-form">
        <Link href="/" className="flex items-center">
        <Image
          src="/cadastre.png"
          alt="Logo"
          width={442}
          height={154}
        />
      </Link>
  
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            required
          />
  
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
  
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
  
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
}