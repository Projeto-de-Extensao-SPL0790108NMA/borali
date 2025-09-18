import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { RegisterRequest } from "../types";
import Link from "next/link";

/**
 * Props for the RegisterForm component
 */
interface RegisterFormProps {
  /**
   * Callback function to handle login button click
   * Used for form switching animation
   */
  onLoginClick?: () => void;
}

export function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterRequest>({
    nome: "",
    idade: 0,
    telefone: "",
    cep: "",
    email: "",
    repetirSenha: "",
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading, registerError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-6">
      <div className="text-start space-y-2">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Vamos começar
        </p>
        <h1 className="text-xl font-semibold text-gray-800">Crie sua conta</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 mb-1">Nome</p>
          <Input
            id="nome"
            name="nome"
            type="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            autoComplete="nome"
            placeholder="Johnson Doe"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <Input
            id="register-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="johnsondoe@nomail.com"
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 mb-1">Senha</p>
          <Input
            id="register-senha"
            name="senha"
            type={showPassword ? "text" : "password"}
            value={formData.senha}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="**************"
            icon={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            }
          />
        </div>

        {registerError && (
          <div className="text-red-500 text-sm">
            {"Erro ao fazer login. Verifique suas credenciais."}
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">Já possui uma conta? </span>
        {onLoginClick ? (
          <button
            onClick={onLoginClick}
            className="text-blue-900 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            LOGIN AQUI
          </button>
        ) : (
          <Link
            href="/login"
            className="text-blue-900 font-semibold hover:underline"
          >
            LOGIN AQUI
          </Link>
        )}
      </div>
    </div>
  );
}
