import { Place } from "../types";
import { PlaceCard } from "./PlaceCard";

interface PlacesListProps {
  places: Place[];
  isLoading?: boolean;
}

export function PlacesList({ places, isLoading }: PlacesListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!places || places.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">Nenhum lugar encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
}
