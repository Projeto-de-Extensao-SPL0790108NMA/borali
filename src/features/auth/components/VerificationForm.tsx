import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

/**
 * Props for the VerificationForm component
 */
interface VerificationFormProps {
  /**
   * Callback function to handle form submission
   * Used to navigate to next step
   */
  onSubmit?: () => void;

  /**
   * Callback function to handle resend code
   */
  onResendCode?: () => void;

  /**
   * Email address to display in the form
   */
  email?: string;
}

export function VerificationForm({
  onSubmit,
  onResendCode,
  email = "seu-email@exemplo.com",
}: VerificationFormProps) {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  // Countdown timer for resend code
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Update the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Clear error if any
    if (error) setError(null);

    // Auto-focus next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all digits are filled
    if (code.some((digit) => !digit)) {
      setError("Por favor, preencha todos os dígitos do código");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmit) onSubmit();
    }, 1000);
  };

  const handleResendCode = () => {
    if (timer > 0) return;

    if (onResendCode) onResendCode();
    setTimer(60);
  };

  return (
    <div className="space-y-6">
      <div className="text-start space-y-2">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Verificação
        </p>
        <h1 className="text-xl font-semibold text-gray-800">
          Digite o código de 4 dígitos que você recebeu
        </h1>
        <p className="text-sm text-gray-500">Enviamos o código para {email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {[0, 1, 2, 3].map((index) => {
            // Create a ref callback that properly sets the ref without returning anything
            const setInputRef = (el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            };

            return (
              <Input
                key={index}
                id={`verification-code-${index}`}
                ref={setInputRef}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-center text-2xl"
              />
            );
          })}
        </div>

        <div className="text-center text-sm text-gray-500">
          {timer > 0 ? (
            <span>Reenviar código em {timer}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-blue-900 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Reenviar código
            </button>
          )}
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Verificando..." : "Verificar"}
        </Button>
      </form>
    </div>
  );
}
