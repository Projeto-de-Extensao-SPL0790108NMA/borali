import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";

export function DashboardSkeleton() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />

        <div className="px-[2.5rem]">
          <h2 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[2.5rem] font-poppins">
            Dashboard
          </h2>

          <div className="grid grid-cols-3 gap-[1.75rem] mb-[2.5rem]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col border border-gray-200 rounded-[0.5rem] p-[1.5rem] bg-white"
              >
                <div className="h-[1.5rem] w-[8rem] bg-input-bg rounded animate-pulse mb-[0.75rem]" />
                <div className="h-[2.25rem] w-[4rem] bg-input-bg rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="mb-[2.5rem]">
            <h3 className="text-[1.25rem] leading-[1.875rem] font-medium text-black mb-[1.5rem] font-poppins">
              Ações Rápidas
            </h3>
            <div className="flex gap-[1rem]">
              <div className="h-[2.75rem] w-[12rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              <div className="h-[2.75rem] w-[12rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-[1.5rem]">
              <h3 className="text-[1.25rem] leading-[1.875rem] font-medium text-black font-poppins">
                Próximos Eventos
              </h3>
              <div className="h-[1.3125rem] w-[5rem] bg-input-bg rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-3 gap-[1.75rem]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-gray-200 rounded-[0.5rem] overflow-hidden"
                >
                  <div className="w-full h-[12.32rem] bg-input-bg animate-pulse" />
                  <div className="bg-white p-[1.25rem] relative">
                    <div className="absolute left-[1.25rem] top-[1.25rem] flex flex-col gap-[0.125rem]">
                      <div className="h-[0.93rem] w-[2.5rem] bg-input-bg rounded animate-pulse" />
                      <div className="h-[2.31rem] w-[2rem] bg-input-bg rounded animate-pulse" />
                    </div>
                    <div className="ml-[4.5rem]">
                      <div className="h-[1.5rem] w-full bg-input-bg rounded animate-pulse mb-[0.375rem]" />
                      <div className="h-[1.5rem] w-[80%] bg-input-bg rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

