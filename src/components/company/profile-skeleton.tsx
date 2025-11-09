import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";

export function ProfileSkeleton() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
          <div className="mb-[3.5rem] flex items-center gap-[1.5rem]">
            <div className="w-[6.25rem] h-[6.25rem] rounded-full bg-input-bg animate-pulse flex-shrink-0" />

            <div className="flex-1 flex flex-col gap-[0.375rem]">
              <div className="h-[1.875rem] w-[12.5rem] bg-input-bg rounded animate-pulse" />
              <div className="h-[1.5rem] w-[15rem] bg-input-bg rounded animate-pulse" />
            </div>

            <div className="w-[5.8125rem] h-[2.75rem] bg-input-bg rounded animate-pulse flex-shrink-0" />
          </div>

          <div className="grid grid-cols-2 gap-[2.5rem]">
            <div className="flex flex-col gap-[1rem]">
              <div>
                <div className="h-[1.5rem] w-[8rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>

              <div>
                <div className="h-[1.5rem] w-[4rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>

              <div>
                <div className="h-[1.5rem] w-[5rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col gap-[1rem]">
              <div>
                <div className="h-[1.5rem] w-[6rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>

              <div>
                <div className="h-[1.5rem] w-[7rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
