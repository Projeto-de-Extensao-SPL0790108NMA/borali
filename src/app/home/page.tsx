'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, CircularProgress, Container, Stack } from '@mui/material';
import Slider from 'react-slick';
import axios from 'axios';
import CategoryCards from './components/categoryCards';

type Place = {
    nome: string;
    endereco: string;
    categoria: string[];
    descricao: string;
};

export default function Home() {
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        axios.get<{ success: boolean; places: Place[] }>('http://localhost:3333/places')
            .then(response => {
                if (response.data.success) {
                    setPlaces(response.data.places);
                }
            })
            .catch(error => console.error('Erro ao buscar lugares:', error));
    }, []);

    return (
        <Container>
            <Stack flexDirection={"column"}>
                <Box>
                    <Typography fontSize={"36px"}>Descubra por Categoria</Typography>
                    <CategoryCards />
                </Box>
            </Stack>

        </Container>

    )

}
