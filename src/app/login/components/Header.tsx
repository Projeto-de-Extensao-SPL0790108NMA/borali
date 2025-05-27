import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md px-6 py-4 flex items-center" style={{
            display: "flex",
            backgroundColor: '#312D2C',
            flexDirection: "row",
            placeItems: "center",
            justifyContent: "space-between",
            padding: 5
        }}>
            <Link href="/" className="flex items-center">
                <Image
                    src="/borali-logo.jpg"
                    alt="Logo"
                    width={100}
                    height={100}
                />
            </Link>
            <Box display={"flex"} flexDirection={"row"} gap={5}>
                <Link href="/about" >
                    <Typography sx={{ color: '#7FFF00', fontSize: "24px" }}>SOBRE</Typography>
                </Link>
            </Box>
            <Link href={"/register"}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: '15px',
                        borderColor: '#7FFF00',
                        color: 'white',
                        '&:hover': {
                            borderColor: '#7FFF00',
                            backgroundColor: 'rgba(127, 255, 0, 0.1)'
                        }
                    }}
                >
                    Register
                </Button>
            </Link>

        </header>
    );
}
