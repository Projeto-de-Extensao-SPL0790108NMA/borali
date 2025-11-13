import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePersonAvatar } from "../person-api";

export function useUpdatePersonAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}

