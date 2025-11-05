import { dateUtils } from "@/helpers/dateUtils";

interface PageHeaderProps {
  greeting?: string;
  showDate?: boolean;
}

export function PageHeader({
  greeting = "Bem-vinda, Bemol",
  showDate = true,
}: PageHeaderProps) {
  return (
    <div className="mb-[2.75rem]">
      <h1 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[0.75rem] font-poppins">
        {greeting}
      </h1>
      {showDate && (
        <p className="text-[1rem] leading-[1.5rem] font-light text-black font-poppins">
          {dateUtils.formatDateToBrazilianShort()}
        </p>
      )}
    </div>
  );
}

