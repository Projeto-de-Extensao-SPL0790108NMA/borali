import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyAvatar } from "../company-api";

export function useUpdateCompanyAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
