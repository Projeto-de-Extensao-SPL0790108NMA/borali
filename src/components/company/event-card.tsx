import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/company";
import { getMonthAbbreviation } from "@/helpers/monthUtils";

interface EventCardProps {
  event: Event;
  href: string;
  showDescription?: boolean;
}

export function EventCard({
  event,
  href,
  showDescription = false,
}: EventCardProps) {
  const eventDate = typeof event.date === "string" 
    ? new Date(event.date) 
    : event.date;
  
  const day = eventDate.getDate();
  const month = getMonthAbbreviation(eventDate.getMonth());

  return (
    <Link
      href={href}
      className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 rounded-[0.5rem] overflow-hidden"
    >
      {/* Event Image */}
      <div className="relative w-full h-[12.32rem] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Event Card */}
      <div className="bg-white p-[1.25rem] relative">
        {/* Date Badge */}
        <div className="absolute left-[1.25rem] top-[1.25rem] flex flex-col">
          <span className="text-[0.71rem] leading-[0.93rem] font-bold text-primary-blue-dark mb-[0.125rem] font-dm-sans">
            {month}
          </span>
          <span className="text-[1.78rem] leading-[2.31rem] font-bold text-black font-dm-sans">
            {day}
          </span>
        </div>

        {/* Event Title */}
        <h3
          className={`text-[1rem] leading-[1.5rem] font-bold text-black mb-[0.75rem] ml-[4.5rem] font-dm-sans ${
            !showDescription ? "line-clamp-2" : ""
          }`}
        >
          {event.title}
        </h3>

        {/* Event Description */}
        {showDescription && (
          <p className="text-[0.875rem] leading-[1.3125rem] font-normal text-[#6a6a6a] ml-[4.5rem] font-dm-sans">
            {event.description}
          </p>
        )}
      </div>
    </Link>
  );
}

