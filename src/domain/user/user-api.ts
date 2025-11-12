import { api } from "@/api/api";
import { apiPaths } from "@/api/api-paths";
import { ResponseDTO } from "@/api/api-types";
import { handleApiResponse } from "../utils/api-utils";
import { UserMeDTO } from "./user-types";

export async function getUserMe(): Promise<UserMeDTO> {
  const response = await api.get(apiPaths.user.me);
  const data = await handleApiResponse<ResponseDTO<UserMeDTO> | UserMeDTO>(
    response
  );

  if (data && typeof data === "object" && "data" in data) {
    return (data as ResponseDTO<UserMeDTO>).data;
  }

  return data as UserMeDTO;
}
