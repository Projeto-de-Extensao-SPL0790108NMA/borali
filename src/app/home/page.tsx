'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, CircularProgress, Container, Stack } from '@mui/material';
import Slider from 'react-slick';
import axios from 'axios';
import CategoryCards from './components/categoryCards';
import PlaceCard from './components/placeCard';
import Footer from './components/footer';
import Header from '../components/Header';

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
        <Box display={"flex"} flexDirection={"column"} gap={10} >
            <Header />
            <Container>
                <Stack flexDirection={"column"} gap={15}>
                    <Box display={'flex'} gap={5} flexDirection={"column"}>
                        <Typography fontSize={"36px"} sx={{ color: '#7FFF00' }}>DESCUBRA ALGO NOVO</Typography>
                        <Box sx={{ overflowX: "auto" }}>
                            <Stack direction="row" spacing={2}>
                                {places.map((place, index) => (
                                    <PlaceCard
                                        key={index}
                                        nome={place.nome}
                                        endereco={place.endereco}
                                        descricao={place.descricao}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Box>

                    <Box display={'flex'} gap={5} flexDirection={"column"}>
                        <Typography fontSize={"36px"} sx={{ color: '#7FFF00' }}>Descubra por Categoria</Typography>
                        <CategoryCards />
                    </Box>
                    <Footer />
                </Stack>

            </Container>
        </Box>

    )

}
