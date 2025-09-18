import { Button } from "@/shared/components/ui/Button";

/**
 * Props for the SuccessMessage component
 */
interface SuccessMessageProps {
  /**
   * Title to display in the success message
   */
  title?: string;

  /**
   * Message to display in the success message
   */
  message?: string;

  /**
   * Callback function to handle continue button click
   */
  onContinue?: () => void;

  /**
   * Text to display on the continue button
   */
  buttonText?: string;
}

export function SuccessMessage({
  title = "Sucesso",
  message = "Operação realizada com sucesso!",
  onContinue,
  buttonText = "Continuar",
}: SuccessMessageProps) {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center py-6">
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Success Message */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="text-gray-500">{message}</p>
      </div>

      {/* Continue Button */}
      <Button onClick={onContinue} variant="default" className="w-full mt-4">
        {buttonText}
      </Button>
    </div>
  );
}
