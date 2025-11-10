"use client";

import { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

interface MarkerData {
    latitude: number;
    longitude: number;
    title?: string;
}

interface EventMapProps {
    markers: MarkerData[];
    height?: string;
}

export function EventsMap({ markers, height = "34.4375rem" }: EventMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ["marker"],
    });

    useEffect(() => {
        if (!isLoaded || !mapRef.current || markers.length === 0) return;


        const map = new google.maps.Map(mapRef.current, {
            center: { lat: markers[0].latitude, lng: markers[0].longitude },
            zoom: 12,
            mapId: "DEMO_MAP_ID",
        });


        markers.forEach((m) => {
            new google.maps.marker.AdvancedMarkerElement({
                map,
                position: { lat: m.latitude, lng: m.longitude },
                title: m.title,
            });
        });
    }, [isLoaded, markers]);

    if (!isLoaded) {
        return (
            <div
                className="flex items-center justify-center bg-gray-200 rounded-[1.25rem]"
                style={{ height }}
            >
                <p>Carregando mapa...</p>
            </div>
        );
    }

    return (
        <div
            ref={mapRef}
            className="rounded-[1.25rem] overflow-hidden"
            style={{ width: "100%", height: "34.4375rem" }}
        />

    );
}