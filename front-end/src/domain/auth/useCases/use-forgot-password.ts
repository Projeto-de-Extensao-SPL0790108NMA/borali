"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/api/api-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { forgotPassword } from "../auth-api";
import { ForgotPasswordPayload, ForgotPasswordDTO } from "../auth-types";
import { ErrorDTO } from "@/api/error-types";

export function useForgotPassword(
  options?: MutationOptions<ForgotPasswordDTO>
) {
  return useMutation<ForgotPasswordDTO, ErrorDTO, ForgotPasswordPayload>({
    mutationKey: queryKeys.auth.forgotPassword(),
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}



