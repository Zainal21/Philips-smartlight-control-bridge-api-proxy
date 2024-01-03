import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as https from "https";

interface HttpRequestOptions {
  rejectUnauthorized?: boolean;
}

class HttpClient {
  private instance = axios.create();

  constructor(private baseUrl: string) {}

  private createRequestConfig(
    options?: HttpRequestOptions
  ): AxiosRequestConfig {
    return {
      baseURL: this.baseUrl,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
  }

  public async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    const config = this.createRequestConfig(options);

    try {
      const response = await this.instance.get<T, AxiosResponse<T>>(
        url,
        config
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data ?? error.message;
    }
  }

  public async post<T>(
    url: string,
    data: any,
    options?: HttpRequestOptions
  ): Promise<T> {
    const config = this.createRequestConfig(options);

    try {
      const response = await this.instance.post<T, AxiosResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data ?? error.message;
    }
  }

  public async put<T>(
    url: string,
    data: any,
    options?: HttpRequestOptions
  ): Promise<T> {
    const config = this.createRequestConfig(options);

    try {
      const response = await this.instance.put<T, AxiosResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data ?? error.message;
    }
  }
}

export default HttpClient;
