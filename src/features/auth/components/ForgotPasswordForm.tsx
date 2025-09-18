import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

/**
 * Props for the ForgotPasswordForm component
 */
interface ForgotPasswordFormProps {
  /**
   * Callback function to handle form submission
   * Used to navigate to verification page
   */
  onSubmit?: () => void;

  /**
   * Callback function to navigate back to login
   */
  onBackToLogin?: () => void;
}

export function ForgotPasswordForm({
  onSubmit,
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Por favor, informe seu e-mail");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmit) onSubmit();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-start space-y-2">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Recuperar a Senha
        </p>
        <h1 className="text-xl font-semibold text-gray-800">
          Esqueceu sua senha?
        </h1>
        <p className="text-sm text-gray-500">
          Não se preocupe, enviaremos um código de verificação. Insira seu
          e-mail para prosseguir.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <Input
            id="forgot-password-email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="johnsondoe@nomail.com"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Enviando..." : "Continuar"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">Lembrou sua senha? </span>
        {onBackToLogin ? (
          <button
            onClick={onBackToLogin}
            className="text-blue-900 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            VOLTAR AO LOGIN
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="text-blue-900 font-semibold hover:underline"
          >
            VOLTAR AO LOGIN
          </Link>
        )}
      </div>
    </div>
  );
}
