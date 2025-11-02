import axios from "axios";
import useAppStore from "../store/useAppStore.js";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1000 * 30
});

let refreshPromise = null;

const requestRefresh = async () => {
  const { refreshToken } = useAppStore.getState();
  if (!refreshToken) throw new Error("No refresh token available");
  const response = await axios.post(
    `${baseURL}/api/v1/auth/refresh`,
    { refreshToken },
    { withCredentials: true }
  );
  return response.data;
};

apiClient.interceptors.request.use((config) => {
  const headers = useAppStore.getState().getAuthorizationHeader();
  config.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...config.headers,
    ...headers
  };
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (!response) {
      return Promise.reject(error);
    }

    if (response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = requestRefresh().finally(() => {
            refreshPromise = null;
          });
        }
        const tokens = await refreshPromise;
        useAppStore.getState().setAuth(tokens);
        config.headers.Authorization = `Bearer ${tokens.token}`;
        return apiClient(config);
      } catch (refreshError) {
        useAppStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
