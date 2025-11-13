'use client'

import { EventCard } from "@/components/company/event-card";
import { Event } from "@/types/company";
import { useEvents } from "@/hooks/use-events";
import { useState } from "react";


type Filters = { title?: string; date?: string };

interface NextEventsProps {
    filters: Filters;
    onCardClick?: (eventId: string) => void;
}


export default function NextEvents({ filters, onCardClick }: NextEventsProps) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useEvents(filters);
    const [isRedirecting, setIsRedirecting] = useState(false);

    if (!data) return <p>Carregando...</p>

    const events = data.pages.flatMap((page) => page.events)

    // Map API events to Event type
    const mappedEvents: Event[] = events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        address: "",
        image: event.cover_image?.url || "/placeholder.png",
    }));

    return (
        <div className="flex flex-col gap-12 mx-auto mb-12 w-full">

            <section className="w-full">
                {isRedirecting || isLoading || isFetchingNextPage && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="flex flex-row gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.2s]"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                        </div>
                    </div>
                )}

                {mappedEvents.length === 0 ? (
                    <p className="text-gray-600 text-center mt-10">
                        Nenhum evento encontrado.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[1.75rem] w-full">
                        {mappedEvents.map(event => (
                            <div key={event.id} className="w-full">
                                <EventCard
                                    event={event}
                                    href={`/person/events/${event.id}`}
                                    showDescription={true}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {hasNextPage && (
                    <div className="flex justify-center mt-8">
                        <button
                            className="border rounded-full px-6 py-2 font-bold"
                            style={{
                                color: '#001E78',
                                borderColor: '#001E78'
                            }}
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? "Carregando..." : "Ver mais"}
                        </button>
                    </div>
                )}

            </section>

        </div >
    )
}