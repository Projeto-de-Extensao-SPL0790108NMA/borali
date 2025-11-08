"use client";

import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { GradientBanner } from "@/components/ui/gradient-banner";
import { ProfileField } from "@/components/company/profile-field";
import { Button } from "@/components/ui/button";

export default function CompanyProfilePage() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
          {/* Profile Card */}
          <div className="mb-[3.5rem] flex items-center gap-[1.5rem]">
            {/* Avatar */}
            <div className="relative w-[6.25rem] h-[6.25rem] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/placeholder.png"
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>

            {/* Name and Email */}
            <div className="flex-1">
              <h2 className="text-[1.25rem] leading-[1.875rem] font-medium text-black mb-[0.375rem] font-poppins">
                Bemol
              </h2>
              <p className="text-[1rem] leading-[1.5rem] font-normal text-black font-poppins">
                bemol@nomail.com
              </p>
            </div>

            {/* Edit Button */}
            <Button
              type="button"
              variant="companyPrimary"
              size="companySm"
              className="w-[5.8125rem] flex-shrink-0"
            >
              Editar
            </Button>
          </div>

          {/* Form Fields - 2 Columns */}
          <div className="grid grid-cols-2 gap-[2.5rem]">
            {/* Left Column */}
            <div className="flex flex-col gap-[1rem]">
              <ProfileField label="Nome da Empresa" value="BEMOL" />
              <ProfileField
                label="CNPJ"
                value="28.033.313/0001-65"
                fontFamily="gabarito"
              />
              <ProfileField label="Email" value="bemol@nomail.com" />
              <ProfileField
                label="Telefone"
                value="9232455532"
                fontFamily="gabarito"
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[1rem]">
              <ProfileField
                label="Endereço"
                value="Bemol Torquato Tapajós, Av. Torquato Tapajós,"
                fontFamily="gabarito"
              />
              <ProfileField
                label="Descrição"
                value="Lorem ipsum dolor sit amet, consectetur adipiscing"
                fontFamily="gabarito"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
