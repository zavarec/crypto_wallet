import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiKeyType } from '../../types/apiKeyType';
import ApiKeyService from '../../services/apiKeyService';

export const saveApiKeyThunk = createAsyncThunk('apiKey/save', async (apiKey: ApiKeyType) => {
  try {
    await ApiKeyService.saveApiKey(apiKey);
    return apiKey;
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
});
