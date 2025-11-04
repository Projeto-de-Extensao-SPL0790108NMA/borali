"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { InputForm } from "@/components/form/input-form";
import { InputPasswordForm } from "@/components/form/input-password-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../register/schema";
import { useRegister } from "@/domain/auth/useCases/use-register";
import { logService } from "@/helpers/log-service";

export function RegisterForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
    },
  });

  const { mutate: register, isPending } = useRegister({
    onSuccess: () => {
      logService("Usuário registrado com sucesso");
      router.push("/login");
    },
    onError: (error) => {
      logService("Erro ao registrar:", error);
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    register({
      name: data.nome,
      email: data.email,
      password: data.senha,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <InputForm
          name="nome"
          label="Seu nome"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="Johnson Doe"
          autoComplete="name"
        />

        <InputForm
          name="email"
          label="Email"
          type="email"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="johnsondoe@nomail.com"
          autoComplete="email"
        />

        <InputPasswordForm
          name="senha"
          label="Senha"
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
        CADASTRAR
      </Button>

      <div className="text-center text-xs leading-[18.53px]">
        <span className="text-[#212121]">Já possui uma conta? </span>
        <Link href="/login" className="text-[#212121] font-bold underline">
          LOGIN AQUI
        </Link>
      </div>
    </form>
  );
}
