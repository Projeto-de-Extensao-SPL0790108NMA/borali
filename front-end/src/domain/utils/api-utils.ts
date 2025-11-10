import { ErrorDTO } from "@/api/error-types";
import { ResponseDTO } from "@/api/api-types";
import { logService } from "@/helpers/log-service";
import type { KyResponse } from "ky";

export async function handleApiResponse<T>(
  response: Promise<KyResponse> | KyResponse
): Promise<T> {
  const res = response instanceof Promise ? await response : response;
  
  let jsonData: unknown;
  try {
    jsonData = await res.json();
  } catch {
    jsonData = null;
  }
  
  if (!res.ok) {
    const errorData: ErrorDTO = 
      jsonData && typeof jsonData === "object" && "statusCode" in jsonData
        ? (jsonData as ErrorDTO)
        : {
            statusCode: res.status,
            isSuccess: false,
            errors: [],
          };

    logService("API Error:", errorData);
    throw errorData;
  }

  const data = jsonData as ResponseDTO<T>;
  return data as T;
}

