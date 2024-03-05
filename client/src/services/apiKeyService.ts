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

  public updateApi(api: ApiKeyType): Promise<ApiKeyType> {
    return this.api.put<ApiKeyType>(`/apikeys/${api.id}`, api).then((res) => res.data);
  }
}

export default new ApiKeyService(axiosInstance);
