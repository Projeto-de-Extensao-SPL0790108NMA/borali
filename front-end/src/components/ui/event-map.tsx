"use client";

interface Marker {
  latitude: number;
  longitude: number;
  title?: string;
}

interface EventMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  markers?: Marker[];
  className?: string;
  height?: string;
}

export function EventMap({
  latitude,
  longitude,
  address,
  markers,
  className = "",
  height = "34.4375rem",
}: EventMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const getMapUrl = (): string | null => {
    if (!apiKey) {
      return null;
    }

    if (markers && markers.length > 0) {
      const markersParam = markers
        .map((m) => `&markers=${m.latitude},${m.longitude}`)
        .join("");

      return `https://www.google.com/maps/embed/v1/view?key=${apiKey}${markersParam}&zoom=4`;
    }

    if (latitude && longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`;
    }

    // Fallback
    if (address) {
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        address
      )}&zoom=15`;
    }

    return null;
  };

  const mapUrl = getMapUrl();

  if (!apiKey) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-200 rounded-[1.25rem] ${className}`}
        style={{ height }}
      >
        <p className="text-[1rem] leading-[1.5rem] font-normal text-gray-600 font-poppins mb-[0.5rem]">
          Mapa não disponível
        </p>
        <p className="text-[0.75rem] leading-[1rem] font-normal text-gray-500 font-poppins text-center px-[1rem]">
          Configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no arquivo .env
        </p>
      </div>
    );
  }

  if (!mapUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 rounded-[1.25rem] ${className}`}
        style={{ height }}
      >
        <p className="text-[1rem] leading-[1.5rem] font-normal text-gray-600 font-poppins">
          Mapa não disponível - Localização não informada
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-[1.25rem] overflow-hidden bg-gray-200 ${className}`}
      style={{ height: className ? undefined : height }}
    >
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        title="Localização do evento"
      />
    </div>
  );
}
