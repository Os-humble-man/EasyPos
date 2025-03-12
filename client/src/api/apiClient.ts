import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const API_BASE_URL = "http://localhost:4040/api";

class ApiClient {
  private AxiosInstance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.AxiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.AxiosInstance.interceptors.request.use(
      (response) => response,
      (error) => {
        console.error("API Error: ", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.AxiosInstance.get(
      url,
      config
    );
    return { data: response.data, status: response.status };
  }

  async post<T, U>(
    url: string,
    body: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.AxiosInstance.post(
      url,
      body,
      config
    );
    return { data: response.data, status: response.status };
  }

  async put<T, U>(
    url: string,
    body: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.AxiosInstance.put(
      url,
      body,
      config
    );
    return { data: response.data, status: response.status };
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.AxiosInstance.delete(
      url,
      config
    );
    return { data: response.data, status: response.status };
  }
}

const apiClient = new ApiClient();
export default apiClient;
