import { Box, Grid, Typography, Stack, IconButton, Button } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Phone, Email, AccessTime } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: "#121212", color: "#fff", p: 4 }}>
            {/* Redes Sociais */}
            <Stack direction="row" justifyContent={"space-between"} gap={15}>
                <Box >
                    <Typography variant="h6" gutterBottom>Redes Sociais</Typography>
                    <Typography variant="body2" mb={2}>
                        Este projeto foi desenvolvido para a Uninorte com o objetivo de resolver questões cotidianas, visando otimizar processos e oferecer soluções práticas para o dia a dia.
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton color="success"><Facebook /></IconButton>
                        <IconButton color="success"><Twitter /></IconButton>
                        <IconButton color="success"><Instagram /></IconButton>
                        <IconButton color="success"><LinkedIn /></IconButton>
                    </Stack>
                </Box>

                {/* Navegação */}
                <Box >
                    <Typography variant="h6" gutterBottom>Navegação</Typography>
                    <Stack spacing={1}>
                        <Typography variant="body2">Home</Typography>
                        <Typography variant="body2">Score</Typography>
                        <Typography variant="body2">Mapa</Typography>
                        <Typography variant="body2">Sobre</Typography>
                    </Stack>
                </Box>

                {/* Endereço */}
                <Box >
                    <Typography variant="h6" gutterBottom>Endereço</Typography>
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOn color="success" />
                            <Typography variant="body2">Av. Djalma Batista, 377</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Phone color="success" />
                            <Typography variant="body2">(92) 99977-6069</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Email color="success" />
                            <Typography variant="body2">ouvidoria@uninorte.com.br</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AccessTime color="success" />
                            <Typography variant="body2">8:00 am - 22:00 pm</Typography>
                        </Stack>
                    </Stack>
                </Box>

                {/* Feedback */}
                <Box >
                    <Typography variant="h6" gutterBottom>Feedback</Typography>
                    <Typography variant="body2" mb={2}>
                        Adoraríamos saber sua opinião! Seu feedback é fundamental para nos ajudar a melhorar cada vez mais. Por favor, compartilhe suas sugestões, elogios ou qualquer ponto que você acha que podemos melhorar. A sua experiência importa muito para nós!
                    </Typography>
                    <Button variant="outlined" color="success">
                        Envie seu feedback
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}