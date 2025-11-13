import { UserMeDTO } from "@/domain/user/user-types";
import { useMutation } from "@tanstack/react-query";
import { UpdatePersonPayload } from "../person-types";
import { updatePerson } from "../person-api";

export function useUpdatePerson() {
  return useMutation<UserMeDTO, Error, UpdatePersonPayload>({
    mutationFn: updatePerson,
  });
}

