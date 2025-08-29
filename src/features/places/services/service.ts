import { api } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types/api";
import {
  Place,
  PlaceFilters,
  CreatePlaceRequest,
  UpdatePlaceRequest,
} from "../types";

/**
 * Places service
 */
export const placesService = {
  /**
   * Get all places with optional filters
   */
  getPlaces: (filters?: PlaceFilters): Promise<ApiResponse<Place[]>> => {
    const params = new URLSearchParams();

    if (filters?.categoria) {
      params.append("categoria", filters.categoria);
    }

    if (filters?.search) {
      params.append("search", filters.search);
    }

    const queryString = params.toString();
    const url = queryString ? `/places?${queryString}` : "/places";

    return api.get<Place[]>(url);
  },

  /**
   * Get a place by ID
   */
  getPlaceById: (id: string): Promise<ApiResponse<Place>> =>
    api.get<Place>(`/places/${id}`),

  /**
   * Create a new place
   */
  createPlace: (data: CreatePlaceRequest): Promise<ApiResponse<Place>> =>
    api.post<Place>("/places", data),

  /**
   * Update an existing place
   */
  updatePlace: ({
    id,
    ...data
  }: UpdatePlaceRequest): Promise<ApiResponse<Place>> =>
    api.put<Place>(`/places/${id}`, data),

  /**
   * Delete a place
   */
  deletePlace: (id: string): Promise<ApiResponse<void>> =>
    api.delete<void>(`/places/${id}`),
};
