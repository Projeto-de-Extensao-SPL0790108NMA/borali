"use client";

import { FormContainer } from "../../_components/form-container";
import { CompanyRegisterForm } from "./company-register-form";

export default function RegisterCompanyPage() {
  return (
    <FormContainer title="Crie sua conta" subtitle="VAMOS COMEÇAR">
      <CompanyRegisterForm />
    </FormContainer>
  );
}



