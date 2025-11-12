"use client";

import { useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { Event } from "@/types/company";
import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";
import { EventCard } from "@/components/company/event-card";
import { EventsSkeleton } from "@/components/company/events-skeleton";
import { Button } from "@/components/ui/button";
import { getEventsList } from "@/domain/event/event-api";
import { queryKeys } from "@/infra/queryKey/query-key";
import { EventListItemDTO } from "@/domain/event/event-types";
import { useGetUserMe } from "@/domain/user/useCases/use-get-user-me";

const EVENTS_PER_PAGE = 10;

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

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: userData, isLoading: isLoadingUser } = useGetUserMe();

  const queries = useQueries({
    queries: userData?.company?.id
      ? Array.from({ length: currentPage }, (_, i) => ({
          queryKey: queryKeys.event.list({
            companyId: userData.company.id,
            page: i + 1,
            per_page: EVENTS_PER_PAGE,
          }),
          queryFn: () =>
            getEventsList({
              companyId: userData.company.id,
              page: i + 1,
              per_page: EVENTS_PER_PAGE,
            }),
          enabled: !!userData?.company?.id,
        }))
      : [],
  });

  const isLoadingInitial = isLoadingUser || (queries[0]?.isLoading ?? true);
  const isLoadingMore = queries[queries.length - 1]?.isLoading ?? false;
  const error = queries.find((query) => query.error)?.error;
  const lastQuery = queries[queries.length - 1];
  const pagination = lastQuery?.data?.pagination;

  const events: Event[] = useMemo(() => {
    const allEvents: Event[] = [];
    queries.forEach((query) => {
      if (query.data?.events) {
        allEvents.push(...query.data.events.map(mapEventDTOToEvent));
      }
    });
    return allEvents;
  }, [queries]);

  const hasMorePages = pagination && currentPage < pagination.total_pages;

  const handleLoadMore = () => {
    if (hasMorePages && !isLoadingMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />
        <div className="px-[2.5rem]">
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

          {isLoadingInitial && events.length === 0 && <EventsSkeleton />}

          {error && events.length === 0 && (
            <div className="text-center py-[2.5rem]">
              <p className="text-[1rem] leading-[1.5rem] font-normal text-red-600 font-poppins">
                Erro ao carregar eventos. Tente novamente.
              </p>
            </div>
          )}

          {events.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-[1.75rem] mb-[2.5rem]">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    href={`/company/events/${event.id}/edit`}
                    showDescription
                  />
                ))}
              </div>

              {hasMorePages && (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="companyOutlineRounded"
                    className="px-[2.5rem] py-[1.25rem] text-[1.125rem] leading-[1.47rem] font-bold"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    isLoading={isLoadingMore}
                  >
                    {isLoadingMore ? "Carregando..." : "Ver mais"}
                  </Button>
                </div>
              )}
            </>
          )}

          {!isLoadingInitial && !error && events.length === 0 && (
            <div className="text-center py-[2.5rem]">
              <p className="text-[1rem] leading-[1.5rem] font-normal text-gray-600 font-poppins">
                Nenhum evento encontrado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
