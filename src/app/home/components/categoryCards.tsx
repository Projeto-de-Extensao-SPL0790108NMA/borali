import { Box, Paper, Stack, Typography } from "@mui/material";

export default function CategoryCards() {

    return (
        <Box>
            <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} gap={5}>
                <Box display={"flex"} sx={{
                    bgcolor: "#222222",
                    padding: 5,
                    borderRadius: '25px',
                    minWidth: '310px',
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <img src={"/carteira.png"} />
                    <Typography>Preço acessivel</Typography>
                </Box>
                <Box display={"flex"} sx={{
                    bgcolor: "#222222",
                    padding: 5,
                    borderRadius: '25px',
                    minWidth: '310px',
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <img src={"/radical.png"} />
                    <Typography>Radical</Typography>
                </Box>
                <Box display={"flex"} sx={{
                    bgcolor: "#222222",
                    padding: 5,
                    borderRadius: '25px',
                    minWidth: '310px',
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <img src={"/familia.png"} />
                    <Typography>Familia</Typography>
                </Box>
            </Stack>
        </Box>
    )
} 