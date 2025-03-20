import { create } from "zustand";
import apiClient from "@/api/apiClient";
import UserService from "@/services/userService";
import { AxiosError } from "axios";

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
      const { data } = await apiClient.get<User>("/auth/check", {
        withCredentials: true,
      });
      set({ user: data, isAuthenticated: true });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            const { data } = await apiClient.post<User, {}>(
              "/auth/refresh-token",
              {}, // Corps de la requête vide
              { withCredentials: true }
            );
            set({ user: data, isAuthenticated: true });
          } catch (refreshError) {
            console.error("Erreur lors du rafraîchissement du token:", refreshError);
            set({ user: null, isAuthenticated: false });
          }
        } else {
          console.error(
            "Erreur lors de la vérification de l'authentification:",
            error.response.data
          );
          set({ user: null, isAuthenticated: false });
        }
      } else if (error instanceof Error) {
        console.error("Erreur inconnue:", error.message);
        set({ user: null, isAuthenticated: false });
      } else {
        console.error("Une erreur inconnue s'est produite:", error);
        set({ user: null, isAuthenticated: false });
      }
    }
  },

  login: async (email, password) => {
    try {
      const response = await UserService.login(email, password);

      set({
        user: {
          userId: response.user.userId,
          posId: response.user.posId,
          role: response.user.role,
        },
        isAuthenticated: true,
      });
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