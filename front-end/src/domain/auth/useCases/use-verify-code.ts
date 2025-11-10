"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/api/api-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { verifyCode } from "../auth-api";
import { VerifyCodePayload, VerifyCodeDTO } from "../auth-types";
import { ErrorDTO } from "@/api/error-types";

export function useVerifyCode(
  options?: MutationOptions<VerifyCodeDTO>
) {
  return useMutation<VerifyCodeDTO, ErrorDTO, VerifyCodePayload>({
    mutationKey: queryKeys.auth.verifyCode(),
    mutationFn: verifyCode,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}



