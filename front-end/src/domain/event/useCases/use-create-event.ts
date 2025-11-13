"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MutationOptions } from "@/api/api-types";
import { ErrorDTO } from "@/api/error-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { logService } from "@/helpers/log-service";
<<<<<<< HEAD
import {
  createEvent,
  uploadEventCoverImage,
  uploadEventImages,
} from "../event-api";
=======
import { createEvent, uploadEventImage } from "../event-api";
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
import { CreateEventPayload, EventDTO } from "../event-types";

interface CreateEventWithImagePayload extends CreateEventPayload {
  image?: File;
<<<<<<< HEAD
  images?: File[];
=======
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
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

<<<<<<< HEAD
      const { image, images, ...eventPayload } = payload;
=======
      const { image, ...eventPayload } = payload;
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
      const createdEvent = await createEvent(eventPayload);

      if (image) {
        try {
<<<<<<< HEAD
          logService("Upload event cover image attempt", {
            eventId: createdEvent.id,
          });
          await uploadEventCoverImage(createdEvent.id, image);
          logService("Event cover image uploaded successfully", {
            eventId: createdEvent.id,
          });
        } catch (error) {
          logService("Upload event cover image error", {
=======
          logService("Upload event image attempt", {
            eventId: createdEvent.id,
          });
          await uploadEventImage(createdEvent.id, image);
          logService("Event image uploaded successfully", {
            eventId: createdEvent.id,
          });
        } catch (error) {
          logService("Upload event image error", {
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
            error,
            eventId: createdEvent.id,
          });
          toast.warning(
<<<<<<< HEAD
            "Evento criado, mas houve um erro ao fazer upload da imagem de capa."
          );
        }
      }

      if (images && images.length > 0) {
        try {
          logService("Upload event images attempt", {
            eventId: createdEvent.id,
            count: images.length,
          });
          await uploadEventImages(createdEvent.id, images);
          logService("Event images uploaded successfully", {
            eventId: createdEvent.id,
          });
        } catch (error) {
          logService("Upload event images error", {
            error,
            eventId: createdEvent.id,
          });
          toast.warning(
            "Evento criado, mas houve um erro ao fazer upload das imagens."
=======
            "Evento criado, mas houve um erro ao fazer upload da imagem."
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
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
