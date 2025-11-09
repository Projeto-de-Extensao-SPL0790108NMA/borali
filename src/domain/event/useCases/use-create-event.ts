"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MutationOptions } from "@/api/api-types";
import { ErrorDTO } from "@/api/error-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { logService } from "@/helpers/log-service";
import { createEvent, uploadEventImage } from "../event-api";
import { CreateEventPayload, EventDTO } from "../event-types";

interface CreateEventWithImagePayload extends CreateEventPayload {
  image?: File;
}

interface UseCreateEventOptions extends MutationOptions<EventDTO> {}

export function useCreateEvent(options?: UseCreateEventOptions) {
  const router = useRouter();

  return useMutation<EventDTO, ErrorDTO, CreateEventWithImagePayload>({
    mutationKey: queryKeys.event.create(),
    mutationFn: async (
      payload: CreateEventWithImagePayload
    ): Promise<EventDTO> => {
      logService("Create event attempt", { title: payload.title });

      const { image, ...eventPayload } = payload;
      const createdEvent = await createEvent(eventPayload);

      if (image) {
        try {
          logService("Upload event image attempt", {
            eventId: createdEvent.id,
          });
          await uploadEventImage(createdEvent.id, image);
          logService("Event image uploaded successfully", {
            eventId: createdEvent.id,
          });
        } catch (error) {
          logService("Upload event image error", {
            error,
            eventId: createdEvent.id,
          });
          toast.warning(
            "Evento criado, mas houve um erro ao fazer upload da imagem."
          );
        }
      }

      return createdEvent;
    },
    onSuccess: (data: EventDTO) => {
      logService("Event created successfully", { eventId: data.id });
      toast.success("Evento criado com sucesso!");
      options?.onSuccess?.(data);
      router.push("/company/events");
    },
    onError: (error: ErrorDTO) => {
      logService("Create event error", { error });
      const errorMessage =
        error.errors?.[0]?.errorMessages?.[0] ||
        options?.errorMessage ||
        "Erro ao criar evento. Tente novamente.";
      toast.error(errorMessage);
      options?.onError?.(error);
    },
  });
}
