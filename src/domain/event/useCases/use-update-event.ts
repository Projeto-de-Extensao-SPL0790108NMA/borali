"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MutationOptions } from "@/api/api-types";
import { ErrorDTO } from "@/api/error-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { logService } from "@/helpers/log-service";
<<<<<<< HEAD
import {
  updateEvent,
  uploadEventCoverImage,
  uploadEventImages,
} from "../event-api";
=======
import { updateEvent, uploadEventImage } from "../event-api";
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
import { UpdateEventPayload, EventDTO } from "../event-types";

interface UpdateEventWithImagePayload extends UpdateEventPayload {
  image?: File;
<<<<<<< HEAD
  images?: File[];
=======
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
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

<<<<<<< HEAD
      const { image, images, ...eventPayload } = payload;
=======
      const { image, ...eventPayload } = payload;
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
      const updatedEvent = await updateEvent(eventId, eventPayload);

      if (image) {
        try {
<<<<<<< HEAD
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
=======
          logService("Upload event image attempt", { eventId });
          await uploadEventImage(eventId, image);
          logService("Event image uploaded successfully", { eventId });
        } catch (error) {
          logService("Upload event image error", { error, eventId });
          toast.warning(
            "Evento atualizado, mas houve um erro ao fazer upload da imagem."
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
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
