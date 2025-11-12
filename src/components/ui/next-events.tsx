'use client'

import EventCard from "@/components/ui/event-card";
import { useEvents } from "@/hooks/use-events";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Filters = { title?: string; date?: string };

interface NextEventsProps {
    filters: Filters;
    onCardClick?: (eventId: string) => void;
}


export default function NextEvents({ filters, onCardClick }: NextEventsProps) {


    const router = useRouter();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useEvents(filters);
    const [isRedirecting, setIsRedirecting] = useState(false);

    if (!data) return <p>Carregando...</p>

    const events = data.pages.flatMap((page) => page.events)

    return (
        <div className="flex flex-col gap-12 mx-auto mb-12">

            <section>
                {isRedirecting || isLoading || isFetchingNextPage && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="flex flex-row gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.2s]"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                        </div>
                    </div>
                )}

                {events.length === 0 ? (
                    <p className="text-gray-600 text-center mt-10">
                        Nenhum evento encontrado.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {events.map(event => (
                            <EventCard
                                onClick={() => (onCardClick ? onCardClick(event.id) : console.log('sem evento'))}
                                key={event.id}
                                title={event.title}
                                description={event.description}
                                date={event.date}
                                imageUrl={event.cover_image.url}
                            />
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