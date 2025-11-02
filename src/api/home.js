import { useQuery } from "@tanstack/react-query";
import apiClient from "./client.js";
import { queryKeys } from "./queryKeys.js";

export const fetchHomeHighlights = async () => {
  const { data } = await apiClient.get("/api/v1/home/highlights");
  return data;
};

export const useHomeHighlightsQuery = () => {
  return useQuery({
    queryKey: queryKeys.homeHighlights(),
    queryFn: fetchHomeHighlights,
    staleTime: 1000 * 60 * 30
  });
};
