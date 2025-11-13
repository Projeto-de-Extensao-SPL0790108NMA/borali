"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/infra/queryKey/query-key";
import { getEventComments } from "../event-api";
import { EventCommentsDTO, EventCommentsPayload } from "../event-types";

export function useGetEventComments(payload: EventCommentsPayload) {
  return useQuery<EventCommentsDTO>({
    queryKey: queryKeys.event.comments({
      eventId: payload.eventId,
      page: payload.page,
      per_page: payload.per_page,
    }),
    queryFn: () => getEventComments(payload),
    enabled: !!payload.eventId,
  });
}




