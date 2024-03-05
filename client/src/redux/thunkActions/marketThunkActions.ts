import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CoinsApiResponseType } from '../../types/coinsListApiTypes';
import { addToFavorites, getCoins } from '../../services/apiCoinsMarket';

const url = import.meta.env.VITE_URL_API_COINRANKING as string;

export const getCoinsThunkAction = createAsyncThunk<CoinsApiResponseType>(
  'coins/fetchCoins',
  async () => getCoins(),
);

export const addToFavoritesThunkAction = createAsyncThunk<void, string>(
  'coins/addToFavorites',
  async (coinId) => addToFavorites(coinId),
);
