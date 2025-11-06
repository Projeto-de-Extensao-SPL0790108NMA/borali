import { api } from "@/api/api";
import { apiPaths } from "@/api/api-paths";
import { RegisterPayload, RegisterDTO, RegisterCompanyPayload, RegisterCompanyDTO, ForgotPasswordPayload, ForgotPasswordDTO, VerifyCodePayload, VerifyCodeDTO, ResetPasswordPayload, ResetPasswordDTO, LoginPayload, LoginDTO } from "./auth-types";
import { handleApiResponse } from "../utils/api-utils";

export async function login(
  payload: LoginPayload
): Promise<LoginDTO> {
  const response = await api.post(apiPaths.auth.login, {
    json: payload,
  });
  return handleApiResponse<LoginDTO>(response);
}

export async function registerPerson(
  payload: RegisterPayload
): Promise<RegisterDTO> {
  const response = await api.post(apiPaths.user.registerPerson, {
    json: payload,
  });
  return handleApiResponse<RegisterDTO>(response);
}

export async function registerCompany(
  payload: RegisterCompanyPayload
): Promise<RegisterCompanyDTO> {
  const response = await api.post(apiPaths.user.registerCompany, {
    json: payload,
  });
  return handleApiResponse<RegisterCompanyDTO>(response);
}

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordDTO> {
  const response = await api.post(apiPaths.auth.forgotPassword, {
    json: payload,
  });
  return handleApiResponse<ForgotPasswordDTO>(response);
}

export async function verifyCode(
  payload: VerifyCodePayload
): Promise<VerifyCodeDTO> {
  const response = await api.post(apiPaths.auth.verifyCode, {
    json: payload,
  });
  return handleApiResponse<VerifyCodeDTO>(response);
}

export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<ResetPasswordDTO> {
  const response = await api.post(apiPaths.auth.resetPassword, {
    json: payload,
  });
  return handleApiResponse<ResetPasswordDTO>(response);
}

