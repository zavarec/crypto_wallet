import type { AxiosInstance } from 'axios';
import axiosInstance from './apiInstance';
import type { ApiKeyType } from '../types/apiKeyType';

class ApiKeyService {
  constructor(private readonly api: AxiosInstance) {}

  async saveApiKey(apiKey: ApiKeyType): Promise<void> {
    try {
      await this.api.post('apiKeys', apiKey);
    } catch (error) {
      throw new Error(`Failed to save API key - ${(error as Error).message}`);
    }
  }
}

export default new ApiKeyService(axiosInstance);
