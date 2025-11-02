import { useQuery } from "@tanstack/react-query";
import apiClient from "./client.js";
import { queryKeys } from "./queryKeys.js";

export const fetchCourses = async (params = {}) => {
  const { data } = await apiClient.get("/api/v1/courses", { params });
  return data;
};

export const useCoursesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.courses(params),
    queryFn: () => fetchCourses(params),
    staleTime: 1000 * 60 * 10
  });
};
