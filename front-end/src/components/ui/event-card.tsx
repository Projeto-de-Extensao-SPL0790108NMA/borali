import { Card, CardContent, CardMedia } from "@mui/material";


type EventCardProps = {
    title: string
    description: string
    date: string
    imageUrl: string,
    onClick: () => void
}


export default function EventCard({ title, description, date, imageUrl, onClick }: EventCardProps) {
    const eventDate = new Date(date)
    const day = eventDate.getDate()
    const month = eventDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase()

    return (
        <Card
            onClick={onClick}
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
                image={imageUrl}
                alt={title}
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

                <div className="text-justify flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
                    <p className="line-clamp-3 text-xs md:text-sm text-gray-600">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}