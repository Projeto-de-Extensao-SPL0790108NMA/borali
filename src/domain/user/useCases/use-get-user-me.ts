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




