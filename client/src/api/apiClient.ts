import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
  headers?: any;
  message?: string;
}

const API_BASE_URL = "https://easypos-production.up.railway.app/api";

class ApiClient {
  private AxiosInstance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.AxiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.AxiosInstance.interceptors.request.use(
      (config) => config,
      (error) => {
        console.error("API Request Error: ", error.message);
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponse
    this.AxiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(
          "API Response Error: ",
          error.response?.data || error.message
        );
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
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
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
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
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
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.AxiosInstance.delete(
      url,
      config
    );
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }
}

const apiClient = new ApiClient();
export default apiClient;
