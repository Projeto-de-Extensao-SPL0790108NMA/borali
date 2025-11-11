"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MutationOptions } from "@/api/api-types";
import { ErrorDTO } from "@/api/error-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { logService } from "@/helpers/log-service";
import {
  updateEvent,
  uploadEventCoverImage,
  uploadEventImages,
} from "../event-api";
import { UpdateEventPayload, EventDTO } from "../event-types";

interface UpdateEventWithImagePayload extends UpdateEventPayload {
  image?: File;
  images?: File[];
}

interface UseUpdateEventOptions extends MutationOptions<EventDTO> {}

export function useUpdateEvent(
  eventId: string,
  options?: UseUpdateEventOptions
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<EventDTO, ErrorDTO, UpdateEventWithImagePayload>({
    mutationKey: queryKeys.event.update({ eventId }),
    mutationFn: async (
      payload: UpdateEventWithImagePayload
    ): Promise<EventDTO> => {
      logService("Update event attempt", { eventId, title: payload.title });

      const { image, images, ...eventPayload } = payload;
      const updatedEvent = await updateEvent(eventId, eventPayload);

      if (image) {
        try {
          logService("Upload event cover image attempt", { eventId });
          await uploadEventCoverImage(eventId, image);
          logService("Event cover image uploaded successfully", { eventId });
        } catch (error) {
          logService("Upload event cover image error", { error, eventId });
          toast.warning(
            "Evento atualizado, mas houve um erro ao fazer upload da imagem de capa."
          );
        }
      }

      if (images && images.length > 0) {
        try {
          logService("Upload event images attempt", {
            eventId,
            count: images.length,
          });
          await uploadEventImages(eventId, images);
          logService("Event images uploaded successfully", { eventId });
        } catch (error) {
          logService("Upload event images error", { error, eventId });
          toast.warning(
            "Evento atualizado, mas houve um erro ao fazer upload das imagens."
          );
        }
      }

      return updatedEvent;
    },
    onSuccess: (data: EventDTO) => {
      logService("Event updated successfully", { eventId: data.id });

      queryClient.invalidateQueries({
        queryKey: queryKeys.event.details({ eventId: data.id }),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.event.listPrefix() });

      toast.success("Evento atualizado com sucesso!");
      options?.onSuccess?.(data);
      router.push("/company/events");
    },
    onError: (error: ErrorDTO) => {
      logService("Update event error", { error, eventId });
      const errorMessage =
        error.errors?.[0]?.errorMessages?.[0] ||
        options?.errorMessage ||
        "Erro ao atualizar evento. Tente novamente.";
      toast.error(errorMessage);
      options?.onError?.(error);
    },
  });
}
