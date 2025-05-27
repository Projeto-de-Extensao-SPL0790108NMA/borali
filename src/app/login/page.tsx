'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from "next/image";


export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !senha) {
      setError('Preencha todos os campos')
      return
    }

    try {
      const response = await axios.post('http://localhost:3333/login', {
        email,
        senha,
      })

      localStorage.setItem('token', response.data.token)
      router.push('/home')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao fazer login')
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleLogin} className="signup-form">
        <Image
          src="/entre.png"
          alt="Logo"
          width={442}
          height={154}
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

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
