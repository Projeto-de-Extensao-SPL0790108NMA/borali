export function CommentsSkeleton() {
  return (
    <div className="space-y-[1rem] mb-[1.5rem]">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-[0.5rem]">
          <div className="flex items-center gap-[0.5rem]">
            <div className="h-[1rem] w-[6rem] bg-input-bg rounded animate-pulse" />
            <div className="h-[1rem] w-[4rem] bg-input-bg rounded animate-pulse" />
          </div>
          <div className="h-[1.3rem] w-full bg-input-bg rounded animate-pulse" />
          {index === 0 && (
            <div className="h-[1.3rem] w-[85%] bg-input-bg rounded animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
}

