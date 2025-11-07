import { Card, CardContent, CardMedia } from "@mui/material";

export default function NextEvents() {
    const events = [1, 2, 3, 4]

    return (
        <div className="flex flex-col gap-12 mx-auto mt-12">

            <h2 className="text-2xl" style={{
                color: "#242565"
            }}>
                Próximos eventos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {events.map((_, index) => (
                    <Card
                        key={index}
                        sx={{
                            maxWidth: 345,
                            borderRadius: 3,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                            },
                            cursor: "pointer",
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="190"
                            image="/mirante-hero.png"
                            alt="event img"
                            sx={{
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                        />
                        <CardContent className="flex flex-row gap-5 p-4">
                            <div className="text-center">
                                <h4 className="text-sm">Set</h4>
                                <h2 className="text-2xl font-bold">12</h2>
                            </div>

                            <div className="text-justify px-4">
                                <h3 className="text-xl font-bold">Show Sertanejo</h3>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
                                    explicabo itaque aut maxime.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>




        </div >
    )
}