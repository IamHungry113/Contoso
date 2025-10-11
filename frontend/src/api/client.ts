import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * APIClient
 * 封装 axios 的基础配置，统一错误处理和日志输出。
 */
class APIClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 8000,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('[API ERROR]', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T, R = unknown>(
    url: string,
    data?: R,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config);
    return response.data;
  }

  public async put<T, R = unknown>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }
}

// 统一导出实例
export const apiClient = new APIClient(import.meta.env.VITE_API_BASE_URL || '');
