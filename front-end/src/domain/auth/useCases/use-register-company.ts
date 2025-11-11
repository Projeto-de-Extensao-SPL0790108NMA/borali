"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/api/api-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { registerCompany } from "../auth-api";
import { RegisterCompanyPayload, RegisterCompanyDTO } from "../auth-types";
import { ErrorDTO } from "@/api/error-types";

export function useRegisterCompany(
  options?: MutationOptions<RegisterCompanyDTO>
) {
  return useMutation<RegisterCompanyDTO, ErrorDTO, RegisterCompanyPayload>({
    mutationKey: queryKeys.auth.registerCompany(),
    mutationFn: registerCompany,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}



