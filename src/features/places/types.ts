/**
 * Place model
 */
export interface Place {
  id: string;
  nome: string;
  endereco: string;
  categoria: string[];
  descricao: string;
  imagem?: string;
}

/**
 * Place filter options
 */
export interface PlaceFilters {
  categoria?: string;
  search?: string;
}

/**
 * Place creation request
 */
export interface CreatePlaceRequest {
  nome: string;
  endereco: string;
  categoria: string[];
  descricao: string;
  imagem?: string;
}

/**
 * Place update request
 */
export interface UpdatePlaceRequest {
  id: string;
  nome?: string;
  endereco?: string;
  categoria?: string[];
  descricao?: string;
  imagem?: string;
}
