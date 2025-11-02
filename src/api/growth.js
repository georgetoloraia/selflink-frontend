import { useQuery } from "@tanstack/react-query";
import apiClient from "./client.js";
import { queryKeys } from "./queryKeys.js";

export const fetchGrowthPath = async () => {
  const { data } = await apiClient.get("/api/v1/growth-path");
  return data;
};

export const useGrowthPathQuery = () => {
  return useQuery({
    queryKey: queryKeys.growthPath(),
    queryFn: fetchGrowthPath,
    staleTime: 1000 * 60 * 30
  });
};
