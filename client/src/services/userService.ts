import apiClient from "@/api/apiClient";

export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  password?: string;
}

const UserService = {
  createUser: async (user: User): Promise<any> => {
    const response = await apiClient.post<User, User>("/auth/register", user);
    return response;
  },
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },
  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
  updateUser: async (user: User): Promise<User> => {
    const response = await apiClient.put<User, User>(`/users/${user.id}`, user);
    return response.data;
  },
  deleteUser: async (id: number): Promise<User> => {
    const response = await apiClient.delete<User>(`/users/${id}`);
    return response.data;
  },
  login: async (
    email: string,
    password: string
  ): Promise<{ status: number; data: User }> => {
    const response = await apiClient.post<
      User,
      { email: string; password: string }
    >("/auth/login", {
      email,
      password,
    });
    return { status: response.status, data: response.data };
  },
};

export default UserService;
