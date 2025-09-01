import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function Header() {
  const headerOptions = ["home", "score", "mapa", "sobre"];

  return (
    <header className="bg-secondary py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="text-primary text-2xl font-bold">BORALI</div>
      </Link>

      <nav className="flex gap-5">
        {headerOptions.map((item) => (
          <Link href={`/${item}`} key={item}>
            <span className="text-primary text-xl font-medium capitalize">
              {item}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button
            variant="outline"
            size="default"
            className="rounded-full px-6 py-4"
          >
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}
