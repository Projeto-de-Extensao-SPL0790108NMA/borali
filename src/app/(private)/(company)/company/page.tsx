"use client";

import Link from "next/link";
import { Event, EventStats } from "@/types/company";
import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";
import { StatsCard } from "@/components/company/stats-card";
import { EventCard } from "@/components/company/event-card";
import { buttonVariants } from "@/components/ui/button";

// Mock data - substituir por dados reais depois
const mockStats: EventStats = {
  totalEvents: 6,
  upcomingEvents: 3,
  pastEvents: 3,
};

const mockUpcomingEvents: Event[] = [
  {
    id: 1,
    title: "Apresentação musical Girls World Tour San Francisco",
    description: "",
    date: new Date(2025, 8, 14),
    address: "",
    image: "/placeholder.png",
  },
  {
    id: 2,
    title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    description: "",
    date: new Date(2025, 8, 20),
    address: "",
    image: "/placeholder.png",
  },
  {
    id: 3,
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    description: "",
    date: new Date(2025, 8, 22),
    address: "",
    image: "/placeholder.png",
  },
];

export default function CompanyPage() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />

        <div className="px-[2.5rem]">
          {/* Title */}
          <h2 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[2.5rem] font-poppins">
            Dashboard
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-[1.75rem] mb-[2.5rem]">
            <StatsCard label="Total de Eventos" value={mockStats.totalEvents} />
            <StatsCard
              label="Próximos Eventos"
              value={mockStats.upcomingEvents}
            />
            <StatsCard label="Eventos Passados" value={mockStats.pastEvents} />
          </div>

          {/* Quick Actions */}
          <div className="mb-[2.5rem]">
            <h3 className="text-[1.25rem] leading-[1.875rem] font-medium text-black mb-[1.5rem] font-poppins">
              Ações Rápidas
            </h3>
            <div className="flex gap-[1rem]">
              <Link
                href="/company/events/create"
                className={buttonVariants({
                  variant: "companyPrimary",
                  size: "companyDefault",
                })}
              >
                Criar Novo Evento
              </Link>
              <Link
                href="/company/events"
                className={buttonVariants({
                  variant: "companyOutline",
                  size: "companyDefault",
                })}
              >
                Ver Todos os Eventos
              </Link>
            </div>
          </div>

          {/* Próximos Eventos */}
          <div>
            <div className="flex items-center justify-between mb-[1.5rem]">
              <h3 className="text-[1.25rem] leading-[1.875rem] font-medium text-black font-poppins">
                Próximos Eventos
              </h3>
              <Link
                href="/company/events"
                className={buttonVariants({
                  variant: "companyLink",
                  size: "companyLinkSize",
                })}
              >
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-[1.75rem]">
              {mockUpcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  href={`/company/events/${event.id}/edit`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
