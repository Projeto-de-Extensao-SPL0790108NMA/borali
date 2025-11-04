export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordDTO {
  data: boolean;
}

export interface VerifyCodePayload {
  email: string;
  code: string;
}

export interface VerifyCodeDTO {
  data: boolean;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

export interface ResetPasswordDTO {
  data: boolean;
}

export interface LoginDTO {
  data: {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterDTO {
  data: boolean;
}

export interface RegisterCompanyPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  description: string;
}

export interface RegisterCompanyDTO {
  data: boolean;
}

export enum PermissionType {
  Company = "company",
  User = "user",
}

export enum UserRole {
  Person = "PERSON",
  Company = "COMPANY",
}

export interface JwtTokenPayload {
  sub?: string;
  role?: UserRole;
  roles?: string[];
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}
