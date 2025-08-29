/**
 * Category model
 */
export interface Category {
  id: string;
  nome: string;
  descricao?: string;
  icone?: string;
}

/**
 * Category creation request
 */
export interface CreateCategoryRequest {
  nome: string;
  descricao?: string;
  icone?: string;
}

/**
 * Category update request
 */
export interface UpdateCategoryRequest {
  id: string;
  nome?: string;
  descricao?: string;
  icone?: string;
}
