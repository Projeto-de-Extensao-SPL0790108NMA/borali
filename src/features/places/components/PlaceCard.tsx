import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { Place } from "../types";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link href={`/places/${place.id}`}>
      <Card className="w-full max-w-xs hover:shadow-lg transition-shadow duration-300 bg-background text-white">
        <div className="relative h-40 w-full">
          <Image
            src={place.imagem || "/placeholder.png"}
            alt={place.nome}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <h3 className="text-lg font-bold text-primary">{place.nome}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-gray-300 mb-2">{place.endereco}</p>
          <p className="text-sm line-clamp-2">{place.descricao}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {place.categoria.map((cat) => (
              <span
                key={cat}
                className="inline-block bg-primary/20 text-primary text-xs px-2 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
