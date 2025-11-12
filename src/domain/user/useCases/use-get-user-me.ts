"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/infra/queryKey/query-key";
import { getUserMe } from "../user-api";
import { UserMeDTO } from "../user-types";

export function useGetUserMe() {
  return useQuery<UserMeDTO>({
    queryKey: queryKeys.user.me(),
    queryFn: () => getUserMe(),
  });
}



<<<<<<< HEAD




=======
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
