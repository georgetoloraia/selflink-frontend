import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      setAuth: ({ token, refreshToken }) => set({ token, refreshToken }),
      clearAuth: () => set({ token: null, refreshToken: null, user: null }),
      setUser: (user) => set({ user }),
      getAuthorizationHeader: () => {
        const { token } = get();
        return token ? { Authorization: `Bearer ${token}` } : {};
      }
    }),
    {
      name: "selflink-store",
      partialize: ({ token, refreshToken, user }) => ({ token, refreshToken, user })
    }
  )
);

export default useAppStore;
