"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Button,
} from "@mui/material";
import { CardActions } from "@mui/material";
import Grid from '@mui/material/Grid';

interface Place {
    nome: string;
    endereco: string;
    categoria: string | string[];
    descricao: string;
}

export default function Home() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3333/places")
            .then((response) => {
                setPlaces(response.data.places);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar lugares:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ paddingY: 5 }}>

        </Container>
    );
}