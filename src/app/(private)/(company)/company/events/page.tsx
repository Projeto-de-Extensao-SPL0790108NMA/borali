"use client";

import { Event } from "@/types/company";
import { PageHeader } from "@/components/ui/page-header";
import { GradientBanner } from "@/components/ui/gradient-banner";
import { EventCard } from "@/components/company/event-card";
import { Button } from "@/components/ui/button";

// Mock data - substituir por dados reais depois
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Apresentação musical Girls World Tour San Francisco",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/placeholder.png",
    date: new Date(2025, 8, 14),
    address: "",
  },
  {
    id: 2,
    title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/placeholder.png",
    date: new Date(2025, 8, 20),
    address: "",
  },
  {
    id: 3,
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/placeholder.png",
    date: new Date(2025, 8, 22),
    address: "",
  },
  {
    id: 4,
    title: "EXPOAGRO UNIVERSIDADE NILTON LINS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/placeholder.png",
    date: new Date(2025, 3, 25),
    address: "",
  },
  {
    id: 5,
    title: "EXPOAGRO 2025",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/placeholder.png",
    date: new Date(2025, 8, 28),
    address: "",
  },
  {
    id: 6,
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/placeholder.png",
    date: new Date(2025, 9, 18),
    address: "",
  },
];

export default function EventsPage() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
          {/* Title and Edit Button */}
          <div className="mb-[2.5rem] flex items-center justify-between">
            <h2 className="text-[1.5rem] leading-[2.25rem] font-medium text-black font-poppins">
              Seus Eventos
            </h2>
            <Button
              type="button"
              variant="companyPrimary"
              size="companySm"
              className="w-[5.8125rem]"
            >
              Editar
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-3 gap-[1.75rem] mb-[2.5rem]">
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                href={`/company/events/${event.id}/edit`}
                showDescription
              />
            ))}
          </div>

          {/* Ver mais Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="companyOutlineRounded"
              className="px-[2.5rem] py-[1.25rem] text-[1.125rem] leading-[1.47rem] font-bold"
            >
              Ver mais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
