"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {useForm} from "react-hook-form";

type FormData = {
    nome: string;
    email: string;
    senha: string;
}
export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors},
        reset,
    } = useForm<FormData>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try{
            const response = await fetch("http://localhost:3333/user-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if(!response.ok){
                alert(result.erro || "Erro ao cadastrar usuário");
                return;
            }
            alert("Usuário cadastrado com sucesso!");
            reset();
        } catch (error) {
            console.error("Erro ao cadastrar", error);
            alert("Erro inesperado. Tente novamente");
        
        } finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <Link href="/" className="flex items-center">
        <Image
          src="/cadastre.png"
          alt="Logo"
          width={442}
          height={154}
        />
      </Link>
  
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            {...register("nome", {required: "Nome é obrigatório!"})}
          />
          {errors.nome && <p className="error">{errors.nome.message}</p>}
  
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {required: "E-mail é obrigatório",
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: "E-mail inválido",
                },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
  
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="password"
            {...register("senha", {
                required: "Senha é obrigatória",
                minLength: {
                    value: 6,
                    message: "Senha deve ter no mínimo 6 caracteres",
                },
            })}
          />
          {errors.senha && <p className="error">{errors.senha.message}</p>}
  
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Cadastrando...": "Cadastrar"}
          </button>
        </form>
      </div>
    );
}