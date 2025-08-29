import { api } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types/api";
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types";

/**
 * Categories service
 */
export const categoriesService = {
  /**
   * Get all categories
   */
  getCategories: (): Promise<ApiResponse<Category[]>> =>
    api.get<Category[]>("/categories"),

  /**
   * Get a category by ID
   */
  getCategoryById: (id: string): Promise<ApiResponse<Category>> =>
    api.get<Category>(`/categories/${id}`),

  /**
   * Create a new category
   */
  createCategory: (
    data: CreateCategoryRequest
  ): Promise<ApiResponse<Category>> => api.post<Category>("/categories", data),

  /**
   * Update an existing category
   */
  updateCategory: ({
    id,
    ...data
  }: UpdateCategoryRequest): Promise<ApiResponse<Category>> =>
    api.put<Category>(`/categories/${id}`, data),

  /**
   * Delete a category
   */
  deleteCategory: (id: string): Promise<ApiResponse<void>> =>
    api.delete<void>(`/categories/${id}`),
};
