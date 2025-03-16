import apiClient from "@/api/apiClient";

export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  password?: string;
  posId?: number | null; // Ajouter posId si nécessaire
}

interface LoginResponse {
  user: User;
  accessToken: string;
  status: number; // Ajouter le statut de la réponse
}

const UserService = {
  createUser: async (user: User): Promise<User> => {
    try {
      const response = await apiClient.post<User, User>("/auth/register", user);
      return response.data;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>("/users");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },

  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user with ID ${id}:`, error);
      throw error;
    }
  },

  updateUser: async (user: User): Promise<User> => {
    try {
      const response = await apiClient.put<User, User>(`/user/${user.id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Failed to update user with ID ${user.id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/user/${id}`);
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error);
      throw error;
    }
  },

  login: async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse, { email: string; password: string }>(
        "/auth/login",
        { email, password }
      );
      return { ...response.data, status: response.status }; 
    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  },
};

export default UserService;