"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MutationOptions } from "@/api/api-types";
import { ErrorDTO } from "@/api/error-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { login as loginApi } from "../auth-api";
import { LoginPayload, LoginDTO, UserRole } from "../auth-types";
import { logService } from "@/helpers/log-service";
import { redirectByRole } from "@/lib/navigation/redirect-by-role";

interface UseLoginOptions extends MutationOptions<LoginDTO> {
  onSuccessRedirect?: string;
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter();

  return useMutation({
    mutationKey: queryKeys.auth.login(),
    mutationFn: async (payload: LoginPayload): Promise<LoginDTO> => {
      logService("Login attempt", { email: payload.email });
      return loginApi(payload);
    },
    onSuccess: async (data: LoginDTO) => {
      logService("Login successful", { data });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save login data");
      }

      const result = await response.json();
      const userRole = result.userRole as UserRole | null;

      options?.onSuccess?.(data);

      const redirectPath = redirectByRole(userRole);
      router.push(redirectPath);
    },
    onError: (error: ErrorDTO) => {
      logService("Login error", { error });
      const errorMessage =
        error.errors?.[0]?.errorMessages?.[0] ||
        options?.errorMessage ||
        "Erro ao fazer login. Verifique suas credenciais.";
      toast.error(errorMessage);
      options?.onError?.(error);
    },
  });
}
