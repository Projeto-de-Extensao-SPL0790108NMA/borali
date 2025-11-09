import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";

export function EditEventSkeleton() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
          <div className="h-[2.25rem] w-[10rem] bg-input-bg rounded mb-[2.5rem] animate-pulse" />

          <div className="grid grid-cols-2 gap-[2.5rem]">
            <div className="flex flex-col gap-[1rem]">
              <div>
                <div className="h-[1.5rem] w-[4rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>

              <div>
                <div className="h-[1.5rem] w-[7rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>

              <div>
                <div className="h-[1.5rem] w-[3.5rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col gap-[1rem]">
              <div>
                <div className="h-[1.5rem] w-[6rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[3.25rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>

              <div>
                <div className="h-[1.5rem] w-[8rem] bg-input-bg rounded mb-[0.75rem] animate-pulse" />
                <div className="h-[12.5rem] bg-input-bg rounded-[0.5rem] animate-pulse" />
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-center mt-[2rem]">
            <div className="h-[3.5rem] w-[23.75rem] bg-input-bg rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
