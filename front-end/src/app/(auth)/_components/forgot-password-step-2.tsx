"use client";

import { toast } from "sonner";
import { InputOTPForm } from "@/components/form/input-otp-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VerifyCodeFormData, verifyCodeSchema } from "../forgot-password/schema";
import { useVerifyCode } from "@/domain/auth/useCases/use-verify-code";
import { ErrorDTO } from "@/api/error-types";

interface ForgotPasswordStep2Props {
  email: string;
  onNext: (code: string) => void;
  onBack: () => void;
}

export function ForgotPasswordStep2({ email, onNext, onBack }: ForgotPasswordStep2Props) {
  const { control, handleSubmit } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutate: verifyCode, isPending } = useVerifyCode({
    onSuccess: () => {
      toast.success("Código verificado com sucesso!");
    },
    onError: (error: ErrorDTO) => {
      const errorMessage =
        error.errors && error.errors.length > 0
          ? error.errors[0].errorMessages[0]
          : "Código inválido. Verifique e tente novamente.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: VerifyCodeFormData) => {
    verifyCode(
      { email, code: data.code },
      {
        onSuccess: () => {
          onNext(data.code);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <InputOTPForm
          name="code"
          label="Código de verificação"
          control={control}
          isRequired
          hideErrorMessage
          length={6}
        />
        <p className="text-sm text-[#828282] text-center">
          Enviamos um código de 6 dígitos para <strong>{email}</strong>
        </p>
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isPending}
        isLoading={isPending}
        className="w-full h-14 rounded-lg bg-[#001e78] text-white font-bold text-xs uppercase hover:bg-[#001e78]/90"
      >
        Verificar
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

