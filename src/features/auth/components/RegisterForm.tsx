import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { RegisterRequest } from "../types";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterRequest>({
    nome: "",
    idade: 0,
    telefone: "",
    cep: "",
    email: "",
    repetirSenha: "",
    senha: "",
  });

  const { register, isLoading, registerError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-10">
        <section className="space-y-2">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-white"
          >
            Nome
          </label>
          <Input
            id="nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Insira um nome"
          />
        </section>
        <section className="space-y-2">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-white"
          >
            Idade
          </label>
          <Input
            id="idade"
            name="idade"
            type="text"
            value={formData.idade}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="dd/mm/aaaa"
          />
        </section>
      </div>

      <div className="flex items-center gap-10">
        <section className="space-y-2">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-white"
          >
            Telefone
          </label>
          <Input
            id="telefone"
            name="telefone"
            type="text"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="55+"
          />
        </section>
        <section className="space-y-2">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-white"
          >
            CEP
          </label>
          <Input
            id="cep"
            name="cep"
            type="text"
            value={formData.cep}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="______-___"
          />
        </section>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
          placeholder="Insira um e-mail..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="senha" className="block text-sm font-medium text-white">
          Senha
        </label>
        <Input
          id="senha"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          required
          className="w-full"
          placeholder="Insira uma senha..."
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="repetirSenha"
          className="block text-sm font-medium text-white"
        >
          Repetir Senha
        </label>
        <Input
          id="repetirSenha"
          name="repetirSenha"
          type="password"
          value={formData.repetirSenha}
          onChange={handleChange}
          required
          className="w-full"
          placeholder="Repita sua senha..."
        />
      </div>

      {registerError && (
        <div className="text-red-500 text-sm">
          {"Erro ao cadastrar. Verifique os dados e tente novamente."}
        </div>
      )}

      <Button
        variant={"outline"}
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
