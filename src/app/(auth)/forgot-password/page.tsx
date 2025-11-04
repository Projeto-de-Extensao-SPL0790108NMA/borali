"use client";

import { useState } from "react";
import { FormContainer } from "../_components/form-container";
import { ForgotPasswordStep1 } from "../_components/forgot-password-step-1";
import { ForgotPasswordStep2 } from "../_components/forgot-password-step-2";
import { ForgotPasswordStep3 } from "../_components/forgot-password-step-3";
import { ForgotPasswordStep4 } from "../_components/forgot-password-step-4";

type Step = 1 | 2 | 3 | 4;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleStep1Next = (emailValue: string) => {
    setEmail(emailValue);
    setStep(2);
  };

  const handleStep2Next = (codeValue: string) => {
    setCode(codeValue);
    setStep(3);
  };

  const handleStep2Back = () => {
    setStep(1);
  };

  const handleStep3Next = () => {
    setStep(4);
  };

  const handleStep3Back = () => {
    setStep(2);
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormContainer title="Recuperar a Senha" subtitle="">
            <div className="space-y-6">
              <p className="text-[#828282] text-base leading-6 tracking-[0.15px]">
                Digite seu e-mail para o processo de verificação, enviaremos um código de 6 dígitos para seu e-mail.
              </p>
              <ForgotPasswordStep1 onNext={handleStep1Next} />
            </div>
          </FormContainer>
        );
      case 2:
        return (
          <FormContainer title="Recuperar a Senha" subtitle="">
            <ForgotPasswordStep2
              email={email}
              onNext={handleStep2Next}
              onBack={handleStep2Back}
            />
          </FormContainer>
        );
      case 3:
        return (
          <FormContainer title="Recuperar a Senha" subtitle="">
            <ForgotPasswordStep3
              email={email}
              code={code}
              onNext={handleStep3Next}
              onBack={handleStep3Back}
            />
          </FormContainer>
        );
      case 4:
        return (
          <FormContainer title="" subtitle="" hideLogo>
            <ForgotPasswordStep4 />
          </FormContainer>
        );
      default:
        return null;
    }
  };

  return getStepContent();
}

