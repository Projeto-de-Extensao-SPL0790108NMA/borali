"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/api/api-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { resetPassword } from "../auth-api";
import { ResetPasswordPayload, ResetPasswordDTO } from "../auth-types";
import { ErrorDTO } from "@/api/error-types";

export function useResetPassword(
  options?: MutationOptions<ResetPasswordDTO>
) {
  return useMutation<ResetPasswordDTO, ErrorDTO, ResetPasswordPayload>({
    mutationKey: queryKeys.auth.resetPassword(),
    mutationFn: resetPassword,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}



