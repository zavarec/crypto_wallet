import type { AxiosInstance } from 'axios';
import axiosInstance from './apiInstance';
import type { ApiKeyType } from '../types/apiKeyType';

class ApiKeyService {
  constructor(private readonly api: AxiosInstance) {}

  public getApis(id: number): Promise<ApiKeyType[]> {
    return this.api.get<Promise<ApiKeyType[]>>(`/apis/market/${id}`).then(
      (res) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(res.data);
          }, 1500);
        }),
    );
  }

  async saveApiKey(apiKey: ApiKeyType): Promise<void> {
    try {
      await this.api.post<ApiKeyType>('apiKeys', apiKey).then((res) => res.data);
    } catch (error) {
      throw new Error(`Failed to save API key - ${(error as Error).message}`);
    }
  }

  public updateApi(id: number, api: ApiKeyType): Promise<ApiKeyType> {
    return this.api.put<ApiKeyType>(`/apikeys/${id}`, api).then((res) => res.data);
  }

  public fetchApis(): Promise<ApiKeyType[]> {
    return this.api.get<ApiKeyType[]>('/apikeys/all').then((res) => res.data);
  }

  public deleteApiKey(id: number): Promise<number> {
    return this.api.delete<number>(`/apikeys/${id}`).then((res) => res.data);
  }

  public getFuckApi(): Promise<ApiKeyType> {
    return this.api.get<ApiKeyType>(`/balance`).then((res) => res.data);
  }


}

export default new ApiKeyService(axiosInstance);
