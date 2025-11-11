"use client";

import { toast } from "sonner";
import { InputPasswordForm } from "@/components/form/input-password-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordFormData, resetPasswordSchema } from "../forgot-password/schema";
import { useResetPassword } from "@/domain/auth/useCases/use-reset-password";
import { ErrorDTO } from "@/api/error-types";

interface ForgotPasswordStep3Props {
  email: string;
  code: string;
  onNext: () => void;
  onBack: () => void;
}

export function ForgotPasswordStep3({ email, code, onNext, onBack }: ForgotPasswordStep3Props) {
  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => {
      toast.success("Senha redefinida com sucesso!");
    },
    onError: (error: ErrorDTO) => {
      const errorMessage =
        error.errors && error.errors.length > 0
          ? error.errors[0].errorMessages[0]
          : "Erro ao redefinir senha. Tente novamente.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    resetPassword(
      {
        email,
        code,
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          onNext();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <InputPasswordForm
          name="password"
          label="Nova senha"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="***************"
          autoComplete="new-password"
        />

        <InputPasswordForm
          name="confirmPassword"
          label="Confirmar senha"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="***************"
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isPending}
        isLoading={isPending}
        className="w-full h-14 rounded-lg bg-[#001e78] text-white font-bold text-xs uppercase hover:bg-[#001e78]/90"
      >
        Redefinir senha
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="w-full text-sm text-[#424242] hover:underline"
      >
        Voltar
      </Button>
    </form>
  );
}

