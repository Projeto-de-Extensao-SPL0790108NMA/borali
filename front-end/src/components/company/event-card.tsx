import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/company";
import { getMonthAbbreviation } from "@/helpers/monthUtils";
import { Card, CardContent, CardMedia } from "@mui/material";


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

  const imageSrc = event.image || "/placeholder.png";

  return (
    <Link
      href={href}
    > 
      <Card
            sx={{
                maxWidth: { xs: '100%', sm: 345 },
                width: '100%',
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                },
                cursor: "pointer",
                maxHeight: 334
            }}
        >
            <CardMedia
                component="img"
                height="190"
                image={imageSrc}
                alt={event.title}
                sx={{
                    minHeight: { xs: 150, sm: 194 },
                    maxHeight: { xs: 150, sm: 194 },
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    objectFit: "cover",
                }}
            />
            <CardContent className="flex flex-row gap-4 md:gap-6 p-3 md:p-4">
                <div className="text-center flex-shrink-0">
                    <h4 className="text-xs md:text-sm">{month}</h4>
                    <h2 className="text-xl md:text-2xl font-bold">{day}</h2>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-md md:text-xl font-bold mb-1">{event.title}</h3>
                    <p className="line-clamp-3 text-xs md:text-sm text-gray-600">
                        {event.description}
                    </p>
                </div>
            </CardContent>
        </Card>

    </Link>
  );
}

