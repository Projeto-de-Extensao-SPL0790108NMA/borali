import { UserMeDTO } from "@/domain/user/user-types";
import { useMutation } from "@tanstack/react-query";
import { UpdateCompanyPayload } from "../company-types";
import { updateCompany } from "../company-api";

export function useUpdateCompany() {
  return useMutation<UserMeDTO, Error, UpdateCompanyPayload>({
    mutationFn: updateCompany,
  });
}
