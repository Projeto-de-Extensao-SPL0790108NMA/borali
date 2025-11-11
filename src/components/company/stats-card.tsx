interface StatsCardProps {
  label: string;
  value: number | string;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-[0.5rem] p-[1.5rem] border border-gray-200 shadow-sm">
      <p className="text-[0.875rem] leading-[1.3125rem] font-normal text-[#6a6a6a] mb-[0.5rem] font-poppins">
        {label}
      </p>
      <p className="text-[2rem] leading-[2.5rem] font-bold text-primary-blue-dark font-poppins">
        {value}
      </p>
    </div>
  );
}

