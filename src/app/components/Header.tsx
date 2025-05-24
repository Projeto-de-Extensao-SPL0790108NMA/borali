// src/components/Header.tsx
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center" style={{ backgroundColor: '#312D2C'}}>
      <Link href="/" className="flex items-center">
        <Image
          src="/borali-logo.jpg"
          alt="Logo"
          width={100}
          height={100}
        />
      </Link>
    </header>
  );
}
