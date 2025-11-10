"use client";

import { FormContainer } from "../_components/form-container";
import { LoginForm } from "../_components/login-form";

export default function LoginPage() {
  return (
    <FormContainer title="Entre na sua conta" subtitle="BEM-VINDO DE VOLTA">
      <LoginForm />
    </FormContainer>
  );
}
