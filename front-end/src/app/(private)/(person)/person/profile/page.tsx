"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/ui/page-header";
import { GradientBanner } from "@/components/ui/gradient-banner";
import { ProfileSkeleton } from "@/components/company/profile-skeleton";
import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { useGetUserMe } from "@/domain/user/useCases/use-get-user-me";
import { ProfileFormData, profileSchema } from "./schema";
import { useEffect } from "react";
import { useUpdatePerson } from "@/domain/person/useCases/use-update-person";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdatePersonAvatar } from "@/domain/person/useCases/use-update-person-avatar";

export default function PersonPage() {
  const { data: userData, isLoading } = useGetUserMe();

  const queryClient = useQueryClient();
  const { mutateAsync: updatePersonMutation, isPending } = useUpdatePerson();

  const { control, handleSubmit, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        email: userData.email,
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
    try {
      const updatedUser = await updatePersonMutation({ name: data.name });
      console.log("Usuário atualizado:", updatedUser);

      // Atualiza cache do /user/me
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar os dados do usuário.");
    }
  };

  const { mutateAsync: updateAvatar, isPending: isUploading } = useUpdatePersonAvatar();

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 🔍 Verifica tamanho máximo (1MB)
    const MAX_SIZE_MB = 1;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      alert("A imagem deve ter no máximo 1MB.");
      event.target.value = ""; // limpa o input
      return;
    }

    try {
      await updateAvatar(file);
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      alert("Imagem atualizada com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar imagem:", err);
      alert("Erro ao enviar imagem.");
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
          <div className="mb-[3.5rem] flex items-center gap-[1.5rem]">
            <div className="relative w-[6.25rem] h-[6.25rem] rounded-full overflow-hidden flex-shrink-0 group">
              <Image
                src={userData.avatar_url || "/placeholder.png"}
                alt="Avatar"
                fill
                className="object-cover cursor-pointer group-hover:opacity-70 transition"
                onClick={() => document.getElementById("avatar-input")?.click()}
              />

              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
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
              Salvar
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
                label="Nome do usuário"
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
                disabled
                className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-normal [&_input]:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark [&_input]:cursor-not-allowed [&_input]:opacity-70"
                labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
