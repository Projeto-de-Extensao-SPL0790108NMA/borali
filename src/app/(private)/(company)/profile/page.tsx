"use client";

import Image from "next/image";
import { dateUtils } from "@/helpers/dateUtils";

export default function CompanyProfilePage() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        {/* Header */}
        <div className="mb-[2.75rem]">
          <h1
            className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[0.75rem]"
            style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
          >
            Bem-vinda, Bemol
          </h1>
          <p
            className="text-[1rem] leading-[1.5rem] font-light text-black"
            style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
          >
            {dateUtils.formatDateToBrazilianShort()}
          </p>
        </div>

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
            <h2
              className="text-[1.25rem] leading-[1.875rem] font-medium text-black mb-[0.375rem]"
              style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
            >
              Bemol
            </h2>
            <p
              className="text-[1rem] leading-[1.5rem] font-normal text-black"
              style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
            >
              bemol@nomail.com
            </p>
          </div>

          {/* Edit Button */}
          <button
            type="button"
            className="bg-primary-blue-dark rounded-[0.5rem] px-[1.5rem] py-[1rem] text-white text-[1rem] leading-[1.5rem] font-normal h-[2.75rem] w-[5.8125rem] flex items-center justify-center flex-shrink-0"
            style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
          >
            Editar
          </button>
        </div>

        {/* Form Fields - 2 Columns */}
        <div className="grid grid-cols-2 gap-[2.5rem]">
          {/* Left Column */}
          <div className="flex flex-col gap-[1rem]">
            {/* Nome da Empresa */}
            <div>
              <label
                className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                Nome da Empresa
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                <span className="text-[1rem] leading-[1.5rem] font-normal text-black">
                  BEMOL
                </span>
              </div>
            </div>

            {/* CNPJ */}
            <div>
              <label
                className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                CNPJ
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{
                  fontFamily: "var(--font-gabarito), Arial, sans-serif",
                }}
              >
                <span className="text-[1rem] leading-[1.75rem] font-normal text-text-secondary">
                  28.033.313/0001-65
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                Email
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                <span className="text-[1rem] leading-[1.5rem] font-normal text-black">
                  bemol@nomail.com
                </span>
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label
                className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                Telefone
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{
                  fontFamily: "var(--font-gabarito), Arial, sans-serif",
                }}
              >
                <span className="text-[1rem] leading-[1.75rem] font-normal text-text-secondary">
                  9232455532
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[1rem]">
            {/* Endereço */}
            <div>
              <label
                className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                Endereço
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{
                  fontFamily: "var(--font-gabarito), Arial, sans-serif",
                }}
              >
                <span className="text-[1rem] leading-[1.75rem] font-normal text-text-secondary">
                  Bemol Torquato Tapajós, Av. Torquato Tapajós,
                </span>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label
                className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                Descrição
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{
                  fontFamily: "var(--font-gabarito), Arial, sans-serif",
                }}
              >
                <span className="text-[1rem] leading-[1.75rem] font-normal text-text-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
