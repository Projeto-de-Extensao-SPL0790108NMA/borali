import { api } from "@/api/api";
import { UpdateCompanyPayload } from "./company-types";
import { apiPaths } from "@/api/api-paths";
import { handleApiResponse } from "../utils/api-utils";
import { UserMeDTO } from "../user/user-types";

export async function updateCompany(
  payload: UpdateCompanyPayload
): Promise<UserMeDTO> {
  const body = {
    name: payload.name,
    email: payload.email,
    company: {
      phone: payload.phone,
      address: payload.address,
      description: payload.description || "",
    },
  };

  const response = await api.put(apiPaths.user.me, { json: body });
  const data = await handleApiResponse<UserMeDTO>(response);
  return data;
}
