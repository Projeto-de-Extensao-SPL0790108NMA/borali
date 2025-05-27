import { Card, CardContent, Typography, Box } from "@mui/material";

type PlaceCardProps = {
    nome: string;
    endereco: string;
    descricao: string;
};

export default function PlaceCard({ nome, endereco, descricao }: PlaceCardProps) {
    return (
        <Card sx={{ width: 200, backgroundColor: "#1c1c1c", color: "#fff", borderRadius: 2 }}>
            <Box
                component="img"
                src="/placeholder.png"
                alt={nome}
                sx={{ width: "100%", height: 100, objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">{nome}</Typography>
                <Typography variant="body2">{endereco}</Typography>
                <Typography variant="caption">{descricao || "Sem descrição"}</Typography>
            </CardContent>
        </Card>
    )
}