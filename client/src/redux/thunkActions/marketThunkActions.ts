import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CoinType, CoinsApiResponseType } from '../../types/coinsListApiTypes';
import { addToFavorites, getCoins, getFavoriteCoins } from '../../services/apiCoinsMarket';

const url = import.meta.env.VITE_URL_API_COINRANKING as string;

export const getCoinsThunkAction = createAsyncThunk<CoinsApiResponseType>(
  'coins/fetchCoins',
  async () => getCoins(),
);

export const addToFavoritesThunkAction = createAsyncThunk<Promise<CoinType['uuid']>, string>(
  'coins/addToFavorites',
  async (coinId) => addToFavorites(coinId),
);
