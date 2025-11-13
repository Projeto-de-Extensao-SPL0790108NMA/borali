import { useMutation } from "@tanstack/react-query";
import { favoriteEvent, unfavoriteEvent } from "../event-api";


export function useFavoriteEvent() {
    
  return useMutation({
    mutationFn: async ({eventId, currentState} : {eventId: string, currentState: boolean}) => {
        currentState ? await unfavoriteEvent(eventId) : await favoriteEvent(eventId)
    },
    onSuccess: (data) => {
      console.log("Favoritado:", data);

    },
    onError: (error) => {
      console.error("Erro ao favoritar evento:", error);
    },
  });
}