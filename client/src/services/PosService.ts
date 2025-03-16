import apiClient from "@/api/apiClient";

export interface Pos {
  id: number;
  agent_id: number;
  device_name: string;
  location: string;
  created_at: string;
}

export const PosService = {
  getAllPos: async (): Promise<Pos[]> => {
    const response = await apiClient.get<Pos[]>("/pos");
    return response.data;
  },

  getPosById: async (id: number): Promise<Pos> => {
    const response = await apiClient.get<Pos>(`/pos/${id}`);
    return response.data;
  },

  createPos: async (pos: Pos): Promise<Pos> => {
    const response = await apiClient.post<Pos, Pos>("/pos", pos);
    return response.data;
  },

  updatePos: async (id: number, pos: Pos): Promise<Pos> => {
    const response = await apiClient.put<Pos, Pos>(`/pos/${id}`, pos);
    return response.data;
  },

  deletePos: async (id: number): Promise<Pos> => {
    const response = await apiClient.delete<Pos>(`/pos/${id}`);
    return response.data;
  },
};
