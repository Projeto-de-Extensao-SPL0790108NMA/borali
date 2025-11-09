import { CommentsSkeleton } from "./comments-skeleton";

export function EventDetailSkeleton() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-[2.5rem] py-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] mb-[2.5rem]">
          {/* Left Column - Event Information */}
          <div className="flex flex-col">
            {/* Event Title */}
            <div className="h-[3rem] w-[80%] bg-input-bg rounded mb-[1.5rem] animate-pulse" />

            {/* Date and Time */}
            <div className="mb-[1.5rem]">
              <div className="flex items-center gap-[0.5rem] mb-[0.5rem]">
                <div className="h-[1rem] w-[1rem] bg-input-bg rounded animate-pulse" />
                <div className="h-[1.5rem] w-[12rem] bg-input-bg rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-[0.5rem] mb-[0.25rem]">
                <div className="h-[1rem] w-[1rem] bg-input-bg rounded animate-pulse" />
                <div className="h-[1.5rem] w-[10rem] bg-input-bg rounded animate-pulse" />
              </div>
              <div className="h-[1.125rem] w-[20rem] bg-input-bg rounded animate-pulse" />
            </div>

            {/* Address */}
            <div className="flex items-center gap-[0.5rem] mb-[1.5rem]">
              <div className="h-[1rem] w-[1rem] bg-input-bg rounded animate-pulse" />
              <div className="h-[1.5rem] w-[15rem] bg-input-bg rounded animate-pulse" />
            </div>

            {/* Description */}
            <div>
              <div className="h-[2.25rem] w-[12rem] bg-input-bg rounded mb-[1rem] animate-pulse" />
              <div className="space-y-[0.5rem]">
                <div className="h-[1.3125rem] w-full bg-input-bg rounded animate-pulse" />
                <div className="h-[1.3125rem] w-[95%] bg-input-bg rounded animate-pulse" />
                <div className="h-[1.3125rem] w-[90%] bg-input-bg rounded animate-pulse" />
                <div className="h-[1.3125rem] w-[85%] bg-input-bg rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column - Event Images */}
          <div className="flex flex-col">
            {/* Image */}
            <div className="w-full h-[22.5625rem] bg-input-bg rounded-[1.1875rem] mb-[1.5rem] animate-pulse" />

            {/* Action Buttons */}
            <div className="flex items-center gap-[1rem] mb-[1.5rem]">
              <div className="h-[2.375rem] w-[8rem] bg-input-bg rounded animate-pulse" />
              <div className="h-[2.3125rem] w-[2.3125rem] bg-input-bg rounded animate-pulse" />
              <div className="ml-auto h-[2.3125rem] w-[2.3125rem] bg-input-bg rounded animate-pulse" />
            </div>

            {/* Comments Section */}
            <div className="border border-black rounded-[1.25rem] p-[1rem]">
              <CommentsSkeleton />

              {/* Comment Input */}
              <div className="h-[2.5rem] w-full bg-input-bg rounded-[2.5rem] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <div className="h-[3.25rem] w-[8rem] bg-input-bg rounded mb-[1.5rem] animate-pulse" />
          <div className="w-full h-[34.4375rem] bg-input-bg rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
