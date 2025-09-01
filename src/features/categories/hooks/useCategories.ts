import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/service";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../types";

/**
 * Hook for categories operations
 */
export function useCategories() {
  const queryClient = useQueryClient();

  // Get all categories
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getCategories(),
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: (data: CreateCategoryRequest) =>
      categoriesService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: (data: UpdateCategoryRequest) =>
      categoriesService.updateCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => categoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    // Queries
    categories: categoriesQuery.data?.data || [],
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,
    error: categoriesQuery.error,

    // Mutations
    createCategory: createCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,

    updateCategory: updateCategoryMutation.mutate,
    isUpdating: updateCategoryMutation.isPending,

    deleteCategory: deleteCategoryMutation.mutate,
    isDeleting: deleteCategoryMutation.isPending,
  };
}

/**
 * Hook for a single category
 */
export function useCategory(id: string) {
  const categoryQuery = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesService.getCategoryById(id),
    enabled: !!id,
  });

  return {
    category: categoryQuery.data?.data,
    isLoading: categoryQuery.isLoading,
    isError: categoryQuery.isError,
    error: categoryQuery.error,
  };
}
