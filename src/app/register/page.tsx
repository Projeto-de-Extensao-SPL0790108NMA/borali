'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { Box, Stack } from '@mui/material'
import Header from './components/Header'

export default function Register() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!nome || !email || !senha) {
            setError('Preencha todos os campos')
            return
        }

        try {
            const response = await axios.post('http://localhost:3333/user-create', {
                nome,
                email,
                senha,
            })

            alert('Usuário cadastrado com sucesso!')
            setNome('')
            setEmail('')
            setSenha('')
            router.push('/login')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao cadastrar usuário')
        }
    }

    return (
        <Box>
            <Header />
            <Box display={"flex"} justifyContent={"center"}>
                <Stack direction={'row'} sx={{ placeItems: "center", gap: "15em" }}>
                    <Image
                        src={"/arena.png"}
                        width={456}
                        height={675}
                        alt='arena'
                    />
                    <div className="signup-container" style={{ display: "flex", flexDirection: "column" }}>
                        <Image
                            src="/cadastre.png"
                            alt="Logo"
                            width={442}
                            height={154}
                        />
                        <form onSubmit={handleRegister} className="signup-form">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />

                            {error && <p className="error">{error}</p>}

                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </Stack>
            </Box>
        </Box>
    )
}