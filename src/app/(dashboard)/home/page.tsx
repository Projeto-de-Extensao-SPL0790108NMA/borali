"use client";

import { usePlaces } from "@/features/places/hooks/usePlaces";
import { PlacesList } from "@/features/places/components/PlacesList";
import { CategoryList } from "@/features/categories/components/CategoryList";

export default function HomePage() {
  const { places, isLoading } = usePlaces();

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">
          DESCUBRA ALGO NOVO
        </h2>
        <PlacesList places={places} isLoading={isLoading} />
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">
          Descubra por Categoria
        </h2>
        <CategoryList />
      </section>
    </div>
  );
}
