import { ErrorDTO } from "@/api/error-types";

export interface ResponseDTO<TData> {
  data: TData;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export interface MetaDataPageAPI {
  pageIndex: number;
  pageSize: number;
  count: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MetaDataPage<TData> {
  data: TData[];
  metaData: MetaDataPageAPI;
}

export interface ListResponseDTO<TData> extends MetaDataPageAPI {
  data: TData[];
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (data: ErrorDTO) => void;
  errorMessage?: string;
}
