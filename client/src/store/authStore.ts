import { create } from "zustand";
import apiClient from "@/api/apiClient";
import UserService from "@/services/userService";

interface User {
  userId: number;
  posId: number;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const { data } = await apiClient.get<any>("/auth/check", {
        withCredentials: true,
      });
      set({ user: data, isAuthenticated: true });
    } catch (error: Error | any) {
      if (error.response && error.response.status === 401) {
        try {
          const { data } = await apiClient.post(
            "/auth/refresh-token",
            {},
            { withCredentials: true }
          );
          set({ user: data, isAuthenticated: true });
        } catch (refreshError) {
          console.error(
            "Erreur lors du rafraîchissement du token:",
            refreshError
          );
          set({ user: null, isAuthenticated: false });
        }
      } else {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        set({ user: null, isAuthenticated: false });
      }
    }
  },

  login: async (email, password) => {
    try {
      const response = await UserService.login(email, password);
      set({ user: response.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout", {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  },
}));
