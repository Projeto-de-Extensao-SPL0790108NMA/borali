import { GradientBanner } from "@/components/ui/gradient-banner";
import { PageHeader } from "@/components/ui/page-header";
import Image from "next/image";

export default function PersonPage() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
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
              Person
            </h2>
            <p
              className="text-[1rem] leading-[1.5rem] font-normal text-black"
              style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
            >
              person@nomail.com
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
                Nome do usuário
              </label>
              <div
                className="h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center"
                style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
              >
                <span className="text-[1rem] leading-[1.5rem] font-normal text-black">
                  Anderson
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
                  anderson@nomail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[2.5rem]"></div>
      </div>
    </div>
  );
}
