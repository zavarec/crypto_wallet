import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CoinType, DataStateType, FavoriteCoin } from '../../types/coinsListApiTypes';
import {
  addToFavorites,
  deleteFavoriteCoin,
  getCoins,

} from '../../services/apiCoinsMarket';

const url = import.meta.env.VITE_URL_API_COINRANKING as string;

export const getCoinsThunkAction = createAsyncThunk<DataStateType>(
  'coins/fetchCoins',
  async () => getCoins(),
);

export const addToFavoritesThunkAction = createAsyncThunk<Promise<FavoriteCoin['ticket_name']>, string>(
  'coins/addToFavorites',
  async (coinId) => addToFavorites(coinId),
);

export const deleteFavoriteCoinThunkAction = createAsyncThunk<Promise<CoinType['uuid']>, string>(
  'coins/deleteFavoriteCoin',
  async (coinId) => deleteFavoriteCoin(coinId),
);
