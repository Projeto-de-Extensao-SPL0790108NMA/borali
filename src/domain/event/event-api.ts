import { api } from "@/api/api";
import { apiPaths } from "@/api/api-paths";
import { ResponseDTO } from "@/api/api-types";
import { handleApiResponse } from "../utils/api-utils";
import {
  CreateEventPayload,
  UpdateEventPayload,
  EventDTO,
  EventDetailDTO,
  EventListDTO,
  EventListPayload,
} from "./event-types";

export async function createEvent(
  payload: CreateEventPayload
): Promise<EventDTO> {
  const response = await api.post(apiPaths.event.create, {
    json: payload,
  });
  const data = await handleApiResponse<ResponseDTO<EventDTO> | EventDTO>(
    response
  );

  if (data && typeof data === "object" && "data" in data) {
    return (data as ResponseDTO<EventDTO>).data;
  }

  return data as EventDTO;
}

export async function getEventsList(
  payload: EventListPayload
): Promise<EventListDTO> {
  const searchParams: Record<string, string> = {};

  if (payload.page !== undefined) {
    searchParams.page = payload.page.toString();
  }

  if (payload.per_page !== undefined) {
    searchParams.per_page = payload.per_page.toString();
  }

  const response = await api.get(
    apiPaths.event.listByCompany(payload.companyId),
    {
      searchParams,
    }
  );

  return handleApiResponse<EventListDTO>(response);
}

export async function getEventById(eventId: string): Promise<EventDetailDTO> {
  const response = await api.get(apiPaths.event.getById(eventId));
  const data = await handleApiResponse<
    ResponseDTO<EventDetailDTO> | EventDetailDTO
  >(response);

  if (data && typeof data === "object" && "data" in data) {
    return (data as ResponseDTO<EventDetailDTO>).data;
  }

  return data as EventDetailDTO;
}

export async function updateEvent(
  eventId: string,
  payload: UpdateEventPayload
): Promise<EventDTO> {
  const response = await api.put(apiPaths.event.update(eventId), {
    json: payload,
  });
  const data = await handleApiResponse<ResponseDTO<EventDTO> | EventDTO>(
    response
  );

  if (data && typeof data === "object" && "data" in data) {
    return (data as ResponseDTO<EventDTO>).data;
  }

  return data as EventDTO;
}

export async function uploadEventImage(
  eventId: string,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append("files", file);

  const response = await api.post(apiPaths.event.uploadImage(eventId), {
    body: formData,
  });

  await handleApiResponse<unknown>(response);
}
