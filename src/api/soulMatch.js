import { useQuery } from "@tanstack/react-query";
import apiClient from "./client.js";
import { queryKeys } from "./queryKeys.js";

export const fetchSoulMatches = async (params = {}) => {
  const { data } = await apiClient.get("/api/v1/matches", { params });
  return data;
};

export const useSoulMatchesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.soulMatches(params),
    queryFn: () => fetchSoulMatches(params),
    staleTime: 1000 * 60 * 2
  });
};
