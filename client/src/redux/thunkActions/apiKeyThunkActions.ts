import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiKeyType } from '../../types/apiKeyType';
import ApiKeyService from '../../services/apiKeyService';
import apiKeyService from '../../services/apiKeyService';

export const fetchApisThunk = createAsyncThunk<ApiKeyType[], number>('apis/fetchApis', async (id) =>
  ApiKeyService.getApis(id),
);

export const saveApiKeyThunk = createAsyncThunk('apiKey/save', async (apiKey: ApiKeyType) => {
  try {
    await ApiKeyService.saveApiKey(apiKey);
    return apiKey;
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
});

export const updateApiThunk = createAsyncThunk<ApiKeyType, ApiKeyType>(
  'apis/updateApi',
  async (api) => ApiKeyService.updateApi(api),
);

export const fetchAllApisThunk = createAsyncThunk<ApiKeyType[]>('apis/fetchAllApis', async () =>
  apiKeyService.fetchApis(),
);
