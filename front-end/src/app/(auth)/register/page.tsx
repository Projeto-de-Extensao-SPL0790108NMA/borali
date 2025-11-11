"use client";

import { FormContainer } from "../_components/form-container";
import { RegisterForm } from "../_components/register-form";

export default function RegisterPage() {
  return (
    <FormContainer title="Crie sua conta" subtitle="VAMOS COMEÇAR">
      <RegisterForm />
    </FormContainer>
  );
}
