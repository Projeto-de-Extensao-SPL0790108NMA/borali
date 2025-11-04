"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { InputForm } from "@/components/form/input-form";
import { InputPasswordForm } from "@/components/form/input-password-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterCompanyFormData, registerCompanySchema } from "./schema";
import { useRegisterCompany } from "@/domain/auth/useCases/use-register-company";
import { logService } from "@/helpers/log-service";

export function CompanyRegisterForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<RegisterCompanyFormData>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      nomeEmpresa: "",
      email: "",
      telefone: "",
      endereco: "",
      descricao: "",
      nomeResponsavel: "",
      senha: "",
    },
  });

  const { mutate: registerCompany, isPending } = useRegisterCompany({
    onSuccess: () => {
      logService("Empresa registrada com sucesso");
      router.push("/login");
    },
    onError: (error) => {
      logService("Erro ao registrar empresa:", error);
    },
  });

  const onSubmit = async (data: RegisterCompanyFormData) => {
    registerCompany({
      name: data.nomeEmpresa,
      email: data.email,
      password: data.senha,
      phone: data.telefone,
      address: data.endereco,
      description: data.descricao || "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-3">
        <InputForm
          name="nomeEmpresa"
          label="Nome da Empresa"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="BEMOL"
          autoComplete="organization"
        />

        <InputForm
          name="email"
          label="Email"
          type="email"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="bemol@nomail.com"
          autoComplete="email"
        />

        <InputForm
          name="telefone"
          label="Telefone"
          type="tel"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="9232455532"
          autoComplete="tel"
        />

        <InputForm
          name="endereco"
          label="Endereço"
          control={control}
          isRequired
          hideErrorMessage
          placeholder="Bemol Torquato Tapajós, Av. Torquato Tapajós"
        />

        <InputForm
          name="descricao"
          label="Descrição"
          control={control}
          hideErrorMessage
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing"
        />

        <InputForm
          name="nomeResponsavel"
          label="Nome do responsavel"
          control={control}
          hideErrorMessage
          placeholder="Johnson Doe"
          autoComplete="name"
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
        CADASTRAR EMPRESA
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

