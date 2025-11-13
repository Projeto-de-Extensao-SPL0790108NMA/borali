import { api } from "@/api/api";
import { UpdatePersonPayload } from "./person-types";
import { apiPaths } from "@/api/api-paths";
import { handleApiResponse } from "../utils/api-utils";
import { UserMeDTO } from "../user/user-types";

export async function updatePerson(
  payload: UpdatePersonPayload
): Promise<UserMeDTO> {
  const body = {
    name: payload.name,
  };

  const response = await api.put(apiPaths.user.me, { json: body });
  const data = await handleApiResponse<UserMeDTO>(response);
  return data;
}

export async function updatePersonAvatar(file: File): Promise<UserMeDTO> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(apiPaths.user.avatar, {
    body: formData,
  });

  const data = await handleApiResponse<UserMeDTO>(response);
  return data;
}

