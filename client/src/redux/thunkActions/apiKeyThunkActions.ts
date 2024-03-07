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

export const updateApiThunk = createAsyncThunk<ApiKeyType, { id: number; api: ApiKeyType }>(
  'apis/updateApi',
  async ({ id, api }) => ApiKeyService.updateApi(id, api),
);

export const fetchAllApisThunk = createAsyncThunk<ApiKeyType[]>('apis/fetchAllApis', async () =>
  ApiKeyService.fetchApis(),
);

export const deleteApiKeyThunk = createAsyncThunk<number, number>('apis/deleteApiKey', async (id) =>
  ApiKeyService.deleteApiKey(id),
);

export const setPortfolioApiThunk = createAsyncThunk<ApiKeyType>('apis/setPotfolioApi', async () =>
  ApiKeyService.getFuckApi(),
);
