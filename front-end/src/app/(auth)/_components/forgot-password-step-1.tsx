"use client";

import Link from "next/link";
import { toast } from "sonner";
import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../forgot-password/schema";
import { useForgotPassword } from "@/domain/auth/useCases/use-forgot-password";
import { ErrorDTO } from "@/api/error-types";

interface ForgotPasswordStep1Props {
  onNext: (email: string) => void;
}

export function ForgotPasswordStep1({ onNext }: ForgotPasswordStep1Props) {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isPending } = useForgotPassword({
    onSuccess: () => {
      toast.success("Código de verificação enviado com sucesso!");
    },
    onError: (error: ErrorDTO) => {
      const errorMessage =
        error.errors && error.errors.length > 0
          ? error.errors[0].errorMessages[0]
          : "Erro ao enviar código de verificação. Tente novamente.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    forgotPassword(
      { email: data.email },
      {
        onSuccess: () => {
          onNext(data.email);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <InputForm
          name="email"
          label="Email"
          type="email"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="Digite o seu email"
          autoComplete="email"
        />
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isPending}
        isLoading={isPending}
        className="w-full h-14 rounded-lg bg-[#001e78] text-white font-bold text-xs uppercase hover:bg-[#001e78]/90"
      >
        Continuar
      </Button>

      <div className="text-center text-xs leading-[18.53px]">
        <span className="text-[#212121]">Lembrou sua senha? </span>
        <Link href="/login" className="text-[#212121] font-bold underline">
          VOLTAR AO LOGIN
        </Link>
      </div>
    </form>
  );
}

