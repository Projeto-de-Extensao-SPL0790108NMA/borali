"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import { PageHeader } from "@/components/ui/page-header";
import { GradientBanner } from "@/components/ui/gradient-banner";
=======
import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
import { ProfileSkeleton } from "@/components/company/profile-skeleton";
import { InputForm } from "@/components/form/input-form";
import { TextareaForm } from "@/components/form/textarea-form";
import { Button } from "@/components/ui/button";
import { useGetUserMe } from "@/domain/user/useCases/use-get-user-me";
import { ProfileFormData, profileSchema } from "./schema";
import { useEffect } from "react";

export default function CompanyProfilePage() {
  const { data: userData, isLoading } = useGetUserMe();

  const { control, handleSubmit, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        email: userData.email,
        phone: userData.company.phone,
        address: userData.company.address,
        description: userData.company.description || "",
      });
    }
  }, [userData, reset]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!userData) {
    return (
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-[2.5rem]">
          <PageHeader />
          <GradientBanner />
          <div className="px-[2.5rem]">
            <div className="text-center py-[3.5rem]">
              <p className="text-[1rem] leading-[1.5rem] font-normal text-black font-poppins">
                Erro ao carregar dados do perfil
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
          <div className="mb-[3.5rem] flex items-center gap-[1.5rem]">
            <div className="relative w-[6.25rem] h-[6.25rem] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/placeholder.png"
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-[1.25rem] leading-[1.875rem] font-medium text-black mb-[0.375rem] font-poppins">
                {userData.name}
              </h2>
              <p className="text-[1rem] leading-[1.5rem] font-normal text-black font-poppins">
                {userData.email}
              </p>
            </div>

            <Button
              type="submit"
              form="profile-form"
              variant="companyPrimary"
              size="companySm"
              className="w-[5.8125rem] flex-shrink-0"
            >
              Editar
            </Button>
          </div>

          <form
            id="profile-form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-[2.5rem]"
          >
            <div className="flex flex-col gap-[1rem]">
              <InputForm
                name="name"
                label="Nome da Empresa"
                control={control}
                isRequired
                className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-normal [&_input]:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
              />
              <InputForm
                name="email"
                label="Email"
                control={control}
                type="email"
                isRequired
                className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-normal [&_input]:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
              />
              <div className="font-gabarito">
                <InputForm
                  name="phone"
                  label="Telefone"
                  control={control}
                  isRequired
                  className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.75rem] [&_input]:font-normal [&_input]:text-text-secondary [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[1rem]">
              <div className="font-gabarito">
                <InputForm
                  name="address"
                  label="Endereço"
                  control={control}
                  isRequired
                  className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.75rem] [&_input]:font-normal [&_input]:text-text-secondary [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
                />
              </div>
              <div className="font-gabarito">
                <TextareaForm
                  name="description"
                  label="Descrição"
                  control={control}
                  rows={3}
                  textareaClassName="font-gabarito"
                  className="[&_textarea]:min-h-[3.25rem] [&_textarea]:rounded-[0.5rem] [&_textarea]:bg-input-bg [&_textarea]:px-[1.25rem] [&_textarea]:py-[0.875rem] [&_textarea]:text-[1rem] [&_textarea]:leading-[1.75rem] [&_textarea]:font-normal [&_textarea]:text-text-secondary [&_textarea]:border-0 [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-primary-blue-dark [&_textarea]:resize-none"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
