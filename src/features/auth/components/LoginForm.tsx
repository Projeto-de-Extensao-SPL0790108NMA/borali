import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { LoginRequest } from "../types";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });

  const { login, isLoading, loginError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-primary"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-primary bg-black text-primary rounded-full"
          placeholder="Insira um e-mail..."
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="senha"
          className="block text-sm font-medium text-primary"
        >
          Senha
        </label>
        <Input
          id="senha"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          required
          className="w-full border-primary bg-black text-primary rounded-full"
          placeholder="Insira uma senha..."
        />
      </div>

      {loginError && (
        <div className="text-red-500 text-sm">
          {"Erro ao fazer login. Verifique suas credenciais."}
        </div>
      )}

      <Button
        type="submit"
        variant="outline"
        disabled={isLoading}
        className="w-full rounded-full mt-12"
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
