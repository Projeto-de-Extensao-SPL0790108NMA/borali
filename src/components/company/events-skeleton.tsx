export function EventsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-[1.75rem]">
      {Array.from({ length: 6 }).map((_, index) => (
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

            <div className="ml-[4.5rem] mb-[0.75rem]">
              <div className="h-[1.5rem] w-full bg-input-bg rounded animate-pulse mb-[0.375rem]" />
              <div className="h-[1.5rem] w-[80%] bg-input-bg rounded animate-pulse" />
            </div>

            <div className="ml-[4.5rem] space-y-[0.5rem]">
              <div className="h-[1.3125rem] w-full bg-input-bg rounded animate-pulse" />
              <div className="h-[1.3125rem] w-[90%] bg-input-bg rounded animate-pulse" />
              <div className="h-[1.3125rem] w-[75%] bg-input-bg rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

