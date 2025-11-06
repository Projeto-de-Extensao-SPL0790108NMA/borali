import { ExtendedErrorDTO } from "@/api/extended-error-dto";
import { logService } from "@/helpers/log-service";

export function handleApiError(error: ExtendedErrorDTO) {
  // Log error for debugging (only in development environment)
  logService("API Error:", error);

  const isNetworkError =
    error.message?.includes("Network") || !error.statusCode;

  if (error.errors && error.errors.length > 0) {
    const errorMessages = error.errors.flatMap((e) => e.errorMessages);

    if (errorMessages.length > 0) {
      // showErrorToast(errorMessages[0]);
      logService(errorMessages[0]);
      return;
    }
  }

  if (error.detail) {
    // showErrorToast(error.detail);
    logService(error.detail);
    return;
  }

  if (isNetworkError) {
    // showErrorToast(
    //   'Network error. Please check your connection and try again.',
    // );
    logService("Network error. Please check your connection and try again.");
    return;
  }

  if (error.statusCode >= 500) {
    // showErrorToast('Server error. Please try again later or contact support.');
    logService("Server error. Please try again later or contact support.");
    return;
  }

  // showErrorToast(
  //   'An unexpected error occurred. Please try again or contact support.',
  // );
  logService(
    "An unexpected error occurred. Please try again or contact support."
  );
}
