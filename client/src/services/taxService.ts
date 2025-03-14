import apiClient from "@/api/apiClient";

export interface Tax {
  id?: number;
  name: string;
  type?: string;
  amount: number;
}

const TaxService = {
  createUser: async (tax: Tax): Promise<any> => {
    const response = await apiClient.post<Tax, Tax>("/taxe", tax);
    return response;
  },
  getAllUsers: async (): Promise<Tax[]> => {
    const response = await apiClient.get<Tax[]>("/taxes");
    return response.data;
  },
  getUserById: async (id: number): Promise<Tax> => {
    const response = await apiClient.get<Tax>(`/taxe/${id}`);
    return response.data;
  },
  updateUser: async (tax: Tax): Promise<Tax> => {
    const response = await apiClient.put<Tax, Tax>(`/taxe`, tax);
    return response.data;
  },
  deleteUser: async (id: number): Promise<Tax> => {
    const response = await apiClient.delete<Tax>(`/taxe/${id}`);
    return response.data;
  },
};

export default TaxService;
