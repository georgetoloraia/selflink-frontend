import { useQuery } from "@tanstack/react-query";
import apiClient from "./client.js";
import { queryKeys } from "./queryKeys.js";

export const fetchCurrentUser = async () => {
  const { data } = await apiClient.get("/api/v1/users/me");
  return data;
};

export const useCurrentUserQuery = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    enabled: options.enabled,
    retry: options.retry ?? 1
  });
};
