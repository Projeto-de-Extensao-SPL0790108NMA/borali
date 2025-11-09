"use client";

import Link from "next/link";
import { Event } from "@/types/company";
import { PageHeader } from "@/components/ui/page-header";
import { GradientBanner } from "@/components/ui/gradient-banner";
import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { StatsCard } from "@/components/company/stats-card";
import { EventCard } from "@/components/company/event-card";
import { DashboardSkeleton } from "@/components/company/dashboard-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { getEventsList } from "@/domain/event/event-api";
import { queryKeys } from "@/infra/queryKey/query-key";
import { EventListItemDTO } from "@/domain/event/event-types";
import { useGetUserMe } from "@/domain/user/useCases/use-get-user-me";

const EVENTS_PER_PAGE = 100;

function mapEventDTOToEvent(eventDTO: EventListItemDTO): Event {
  return {
    id: eventDTO.id,
    title: eventDTO.title,
    description: eventDTO.description,
    date: eventDTO.date,
    address: "",
    image: eventDTO.cover_image?.url || "/placeholder.png",
  };
}

export default function CompanyPage() {
  const { data: userData, isLoading: isLoadingUser } = useGetUserMe();

  const companyId = userData?.company?.id;

  const firstPageQuery = useQueries({
    queries: companyId
      ? [
          {
            queryKey: queryKeys.event.list({
              companyId: companyId,
              page: 1,
              per_page: EVENTS_PER_PAGE,
            }),
            queryFn: () =>
              getEventsList({
                companyId: companyId,
                page: 1,
                per_page: EVENTS_PER_PAGE,
              }),
            enabled: true,
          },
        ]
      : [
          {
            queryKey: queryKeys.event.list({
              companyId: "",
              page: 1,
              per_page: EVENTS_PER_PAGE,
            }),
            queryFn: async () => ({
              events: [],
              pagination: {
                page: 1,
                per_page: EVENTS_PER_PAGE,
                total: 0,
                total_pages: 0,
              },
            }),
            enabled: false,
          },
        ],
  });

  const firstPageData = firstPageQuery[0]?.data;
  const totalPages = firstPageData?.pagination?.total_pages || 1;

  const allPagesQueries = useQueries({
    queries:
      companyId && totalPages > 0
        ? Array.from({ length: totalPages }, (_, i) => ({
            queryKey: queryKeys.event.list({
              companyId: companyId,
              page: i + 1,
              per_page: EVENTS_PER_PAGE,
            }),
            queryFn: () =>
              getEventsList({
                companyId: companyId,
                page: i + 1,
                per_page: EVENTS_PER_PAGE,
              }),
            enabled: true,
          }))
        : [
            {
              queryKey: queryKeys.event.list({
                companyId: "",
                page: 1,
                per_page: EVENTS_PER_PAGE,
              }),
              queryFn: async () => ({
                events: [],
                pagination: {
                  page: 1,
                  per_page: EVENTS_PER_PAGE,
                  total: 0,
                  total_pages: 0,
                },
              }),
              enabled: false,
            },
          ],
  });

  const allEvents: Event[] = useMemo(() => {
    const events: Event[] = [];
    allPagesQueries.forEach((query) => {
      const queryData = query.data;
      if (
        queryData &&
        "events" in queryData &&
        Array.isArray(queryData.events)
      ) {
        events.push(...queryData.events.map(mapEventDTOToEvent));
      }
    });
    return events;
  }, [allPagesQueries]);

  const stats = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const totalEvents =
      (firstPageData &&
        "pagination" in firstPageData &&
        firstPageData.pagination?.total) ||
      allEvents.length;
    const upcomingEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= now;
    }).length;
    const pastEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < now;
    }).length;

    return {
      totalEvents,
      upcomingEvents,
      pastEvents,
    };
  }, [allEvents, firstPageData]);

  const upcomingEvents: Event[] = useMemo(() => {
    const now = new Date();
    return allEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [allEvents]);

  const isLoadingEvents = allPagesQueries.some((query) => query.isLoading);
  const isLoading = isLoadingUser || isLoadingEvents;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

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
            <StatsCard label="Total de Eventos" value={stats.totalEvents} />
            <StatsCard label="Próximos Eventos" value={stats.upcomingEvents} />
            <StatsCard label="Eventos Passados" value={stats.pastEvents} />
          </div>

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

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-3 gap-[1.75rem]">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    href={`/company/events/${event.id}/edit`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-[2.5rem]">
                <p className="text-[1rem] leading-[1.5rem] font-normal text-gray-600 font-poppins">
                  Nenhum evento encontrado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
