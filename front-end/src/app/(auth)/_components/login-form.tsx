"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/input-form";
import { InputPasswordForm } from "@/components/form/input-password-form";
import { Button } from "@/components/ui/button";
import { LoginFormData, loginSchema } from "../login/schema";
import { useLogin } from "@/domain/auth/useCases/use-login";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-5">
        <InputForm
          name="email"
          label="Email"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="johnsondoe@nomail.com"
          autoComplete="email"
        />
        <div className="space-y-2">
          <InputPasswordForm
            name="password"
            label="Senha"
            control={control}
            isRequired
            hideErrorMessage
            placeholder="***************"
            autoComplete="current-password"
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#424242] hover:underline"
            >
              Esqueceu a Senha?
            </Link>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isPending}
        isLoading={isPending}
        className="w-full h-14 rounded-lg bg-[#001e78] text-white font-bold text-xs uppercase hover:bg-[#001e78]/90"
      >
        LOGIN
      </Button>

      <div className="text-center text-xs leading-[18.53px]">
        <div>
          <span className="text-[#212121]">Novo Usuário? </span>
          <Link href="/register" className="text-[#212121] font-bold underline">
            INSCREVA-SE AQUI
          </Link>
        </div>
        <div>
          <span className="text-[#212121]">É uma Empresa? </span>
          <Link
            href="/register/company"
            className="text-[#212121] font-bold underline"
          >
            INSCREVA-SE AQUI
          </Link>
        </div>
      </div>
    </form>
  );
}
