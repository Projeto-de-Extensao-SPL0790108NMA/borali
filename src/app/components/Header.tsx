// src/components/Header.tsx
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="bg-white shadow-md px-6 py-4 flex items-center"
      style={{
        display: "flex",
        backgroundColor: "#312D2C",
        flexDirection: "row",
        placeItems: "center",
        justifyContent: "space-between",
        padding: 5,
      }}
    >
      <Link href="/" className="flex items-center">
        <Image src="/borali-logo.jpg" alt="Logo" width={100} height={100} />
      </Link>
      <Box display={"flex"} flexDirection={"row"} gap={5}>
        <Link href="/home">
          <Typography sx={{ color: "#7FFF00", fontSize: "24px" }}>
            HOME
          </Typography>
        </Link>
        <Link href="/about">
          <Typography sx={{ color: "#7FFF00", fontSize: "24px" }}>
            SOBRE
          </Typography>
        </Link>
      </Box>
      <Image src={"/mask.png"} width={50} height={50} alt="pfp" />
    </header>
  );
}
