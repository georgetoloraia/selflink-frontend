import { useMutation } from "@tanstack/react-query";
import apiClient from "./client.js";
import useAppStore from "../store/useAppStore.js";

const normalizeAuthResponse = (data) => ({
  token: data?.token ?? null,
  refreshToken: data?.refreshToken ?? null,
  user: data?.user ?? null,
  message: data?.message ?? ""
});

export const register = async (payload) => {
  const { data } = await apiClient.post("/api/v1/auth/register", payload);
  return normalizeAuthResponse(data);
};

export const login = async (payload) => {
  const { data } = await apiClient.post("/api/v1/auth/login", payload);
  return normalizeAuthResponse(data);
};

export const useRegisterMutation = () => {
  const setAuth = useAppStore((state) => state.setAuth);
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: register,
    onSuccess: (result) => {
      if (result.token) {
        setAuth({ token: result.token, refreshToken: result.refreshToken });
      }
      if (result.user) {
        setUser(result.user);
      }
    }
  });
};

export const useLoginMutation = () => {
  const setAuth = useAppStore((state) => state.setAuth);
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (result.token) {
        setAuth({ token: result.token, refreshToken: result.refreshToken });
      }
      if (result.user) {
        setUser(result.user);
      }
    }
  });
};
