"use client";

import { dateUtils } from "@/helpers/dateUtils";
import { useGetUserMe } from "@/domain/user/useCases/use-get-user-me";

interface PageHeaderProps {
  greeting?: string;
  showDate?: boolean;
}

export function PageHeader({ greeting, showDate = true }: PageHeaderProps) {
  const { data: userData } = useGetUserMe();

  const displayGreeting =
    greeting || (userData?.name ? `Bem-vinda, ${userData.name}` : "Bem-vinda");

  return (
    <div className="mb-[2.75rem]">
      <h1 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[0.75rem] font-poppins">
        {displayGreeting}
      </h1>
      {showDate && (
        <p className="text-[1rem] leading-[1.5rem] font-light text-black font-poppins">
          {dateUtils.formatDateToBrazilianShort()}
        </p>
      )}
    </div>
  );
}
