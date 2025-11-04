"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/api/api-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { registerPerson } from "../auth-api";
import { RegisterPayload, RegisterDTO } from "../auth-types";
import { ErrorDTO } from "@/api/error-types";

export function useRegister(
  options?: MutationOptions<RegisterDTO>
) {
  return useMutation<RegisterDTO, ErrorDTO, RegisterPayload>({
    mutationKey: queryKeys.auth.register(),
    mutationFn: registerPerson,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}



