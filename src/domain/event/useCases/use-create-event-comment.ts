"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MutationOptions } from "@/api/api-types";
import { ErrorDTO } from "@/api/error-types";
import { queryKeys } from "@/infra/queryKey/query-key";
import { logService } from "@/helpers/log-service";
import { createEventComment } from "../event-api";
import {
  CreateEventCommentPayload,
  EventCommentDTO,
} from "../event-types";

interface UseCreateEventCommentOptions
  extends MutationOptions<EventCommentDTO> {}

export function useCreateEventComment(
  eventId: string,
  options?: UseCreateEventCommentOptions
) {
  const queryClient = useQueryClient();

  return useMutation<EventCommentDTO, ErrorDTO, CreateEventCommentPayload>({
    mutationKey: queryKeys.event.comments({ eventId }),
    mutationFn: async (
      payload: CreateEventCommentPayload
    ): Promise<EventCommentDTO> => {
      logService("Create event comment attempt", {
        eventId: payload.eventId,
      });

      return createEventComment(payload);
    },
    onSuccess: (data: EventCommentDTO) => {
      logService("Event comment created successfully", {
        commentId: data.id,
        eventId: data.event_id,
      });

      // Invalidate comments query to refetch the list
      queryClient.invalidateQueries({
        queryKey: queryKeys.event.commentsPrefix({ eventId }),
      });

      toast.success("Comentário criado com sucesso!");
      options?.onSuccess?.(data);
    },
    onError: (error: ErrorDTO) => {
      logService("Create event comment error", { error, eventId });
      const errorMessage =
        error.errors?.[0]?.errorMessages?.[0] ||
        options?.errorMessage ||
        "Erro ao criar comentário. Tente novamente.";
      toast.error(errorMessage);
      options?.onError?.(error);
    },
  });
}




