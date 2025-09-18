import React from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { VerificationForm } from "./VerificationForm";
import { NewPasswordForm } from "./NewPasswordForm";
import { SuccessMessage } from "./SuccessMessage";

/**
 * Enum for authentication steps to avoid magic strings
 */
export enum AuthSteps {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  VERIFICATION = "VERIFICATION",
  NEW_PASSWORD = "NEW_PASSWORD",
  SUCCESS = "SUCCESS",
}

/**
 * Props for the CurrentAuthStep component
 */
interface CurrentAuthStepProps {
  step: AuthSteps;
  goToStep: (step: AuthSteps) => void;
}

/**
 * Mapping of auth steps to their respective components
 */
const AuthStepMapping: Record<
  AuthSteps,
  React.FC<{ goToStep: (s: AuthSteps) => void }>
> = {
  [AuthSteps.LOGIN]: ({ goToStep }) => (
    <LoginForm
      onRegisterClick={() => goToStep(AuthSteps.REGISTER)}
      onForgotPasswordClick={() => goToStep(AuthSteps.FORGOT_PASSWORD)}
    />
  ),
  [AuthSteps.REGISTER]: ({ goToStep }) => (
    <RegisterForm onLoginClick={() => goToStep(AuthSteps.LOGIN)} />
  ),
  [AuthSteps.FORGOT_PASSWORD]: ({ goToStep }) => (
    <ForgotPasswordForm
      onSubmit={() => goToStep(AuthSteps.VERIFICATION)}
      onBackToLogin={() => goToStep(AuthSteps.LOGIN)}
    />
  ),
  [AuthSteps.VERIFICATION]: ({ goToStep }) => (
    <VerificationForm
      onSubmit={() => goToStep(AuthSteps.NEW_PASSWORD)}
      onResendCode={() => console.log("Resend code")}
      email="usuario@exemplo.com"
    />
  ),
  [AuthSteps.NEW_PASSWORD]: ({ goToStep }) => (
    <NewPasswordForm onSubmit={() => goToStep(AuthSteps.SUCCESS)} />
  ),
  [AuthSteps.SUCCESS]: ({ goToStep }) => (
    <SuccessMessage
      title="Senha Alterada"
      message="Sua senha foi alterada com sucesso. Você já pode fazer login com sua nova senha."
      buttonText="Ir para Login"
      onContinue={() => goToStep(AuthSteps.LOGIN)}
    />
  ),
};

/**
 * Component that renders the current authentication step
 */
export function CurrentAuthStep({ step, goToStep }: CurrentAuthStepProps) {
  const StepComponent = AuthStepMapping[step];
  return <StepComponent goToStep={goToStep} />;
}
