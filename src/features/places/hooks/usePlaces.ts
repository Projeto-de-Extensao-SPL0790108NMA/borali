import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { placesService } from "../services/service";
import { CreatePlaceRequest, PlaceFilters, UpdatePlaceRequest } from "../types";

/**
 * Hook for places operations
 */
export function usePlaces(filters?: PlaceFilters) {
  const queryClient = useQueryClient();

  // Get all places
  const placesQuery = useQuery({
    queryKey: ["places", filters],
    queryFn: () => placesService.getPlaces(filters),
  });

  // Create place mutation
  const createPlaceMutation = useMutation({
    mutationFn: (data: CreatePlaceRequest) => placesService.createPlace(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });

  // Update place mutation
  const updatePlaceMutation = useMutation({
    mutationFn: (data: UpdatePlaceRequest) => placesService.updatePlace(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });

  // Delete place mutation
  const deletePlaceMutation = useMutation({
    mutationFn: (id: string) => placesService.deletePlace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });

  return {
    // Queries
    places: placesQuery.data?.data || [],
    isLoading: placesQuery.isLoading,
    isError: placesQuery.isError,
    error: placesQuery.error,

    // Mutations
    createPlace: createPlaceMutation.mutate,
    isCreating: createPlaceMutation.isPending,

    updatePlace: updatePlaceMutation.mutate,
    isUpdating: updatePlaceMutation.isPending,

    deletePlace: deletePlaceMutation.mutate,
    isDeleting: deletePlaceMutation.isPending,
  };
}

/**
 * Hook for a single place
 */
export function usePlace(id: string) {
  const placeQuery = useQuery({
    queryKey: ["place", id],
    queryFn: () => placesService.getPlaceById(id),
    enabled: !!id,
  });

  return {
    place: placeQuery.data?.data,
    isLoading: placeQuery.isLoading,
    isError: placeQuery.isError,
    error: placeQuery.error,
  };
}
