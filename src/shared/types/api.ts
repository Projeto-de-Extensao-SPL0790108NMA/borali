/**
 * Standard API response format
 */
export interface ApiResponse<T> {
  /**
   * Response data
   */
  data: T | null;

  /**
   * Whether the request was successful
   */
  success: boolean;

  /**
   * HTTP status code
   */
  status: number;

  /**
   * Error message (if any)
   */
  error?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  /**
   * Current page
   */
  page: number;

  /**
   * Number of items per page
   */
  perPage: number;

  /**
   * Total number of items
   */
  total: number;

  /**
   * Total number of pages
   */
  totalPages: number;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  /**
   * Array of items
   */
  items: T[];

  /**
   * Pagination metadata
   */
  meta: PaginationMeta;
}
