"use client"

import { EventMarker, useEventMarkers } from "@/hooks/use-events-map";
import { EventsMap } from "./components/events-map";

export default function PublicMap() {

    const { data, isLoading, error } = useEventMarkers();

    const events: EventMarker[] = data || [];

    console.log(data)
    return (
        <section className="flex flex-col mt-5 mb-5 mx-auto w-full max-w-7xl px-4">

            <div className="flex flex-col md:flex-row w-full gap-4">
                <h2 className="text-2xl font-bold">
                    Mapa de Eventos
                </h2>

                <EventsMap
                    markers={events.map((ev) => ({
                        latitude: ev.latitude,
                        longitude: ev.longitude,
                        title: ev.title,
                    }))}
                />


            </div>
        </section>

    )
}