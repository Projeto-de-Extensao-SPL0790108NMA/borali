import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/places?categoria=${category.nome}`}>
      <Card className="bg-secondary hover:bg-secondary/80 transition-colors duration-300 p-5 rounded-2xl flex flex-col items-center">
        <div className="w-16 h-16 relative mb-3">
          {category.icone ? (
            <Image
              src={category.icone}
              alt={category.nome}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary text-2xl">
                {category.nome.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-0 text-center">
          <h3 className="text-white font-medium">{category.nome}</h3>
          {category.descricao && (
            <p className="text-gray-400 text-sm mt-1">{category.descricao}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
