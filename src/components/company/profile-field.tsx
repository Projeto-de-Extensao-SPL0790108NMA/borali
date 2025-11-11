interface ProfileFieldProps {
  label: string;
  value: string;
  fontFamily?: "poppins" | "gabarito";
}

export function ProfileField({
  label,
  value,
  fontFamily = "poppins",
}: ProfileFieldProps) {
  const fontClass = fontFamily === "poppins" ? "font-poppins" : "font-gabarito";
  const leadingClass = fontFamily === "gabarito" ? "leading-[1.75rem]" : "leading-[1.5rem]";
  const textColorClass = fontFamily === "gabarito" ? "text-text-secondary" : "text-black";

  return (
    <div>
      <label className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins">
        {label}
      </label>
      <div className={`h-[3.25rem] rounded-[0.5rem] bg-input-bg px-[1.25rem] flex items-center ${fontClass}`}>
        <span className={`text-[1rem] ${leadingClass} font-normal ${textColorClass}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

