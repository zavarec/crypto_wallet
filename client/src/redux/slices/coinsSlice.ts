import { createSlice } from '@reduxjs/toolkit';
import {
  addToFavoritesThunkAction,
  deleteFavoriteCoinThunkAction,
  getCoinsThunkAction,
} from '../thunkActions/marketThunkActions';
import type { CoinsStateType } from '../../types/coinsTypes';
import { setPortfolioApiThunk } from '../thunkActions/apiKeyThunkActions';

const initialState: CoinsStateType = {
  data: null,
  status: 'loading',
  balance: null,
};

// data: all coins, favorites: favorite coins

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinsThunkAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCoinsThunkAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCoinsThunkAction.rejected, (state, action) => {
        state.status = 'failed';
        state.data = null; // Если вы хотите сохранить сообщение об ошибке
      })
      .addCase(addToFavoritesThunkAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!state.data?.coins) return;

        const targetCoin = state.data.coins.find(
          (coin) => coin.uuid === action.payload.ticket_name,
        );
        if (targetCoin) {
          state.data.favorites.push(targetCoin);
          state.data.coins = state.data.coins.filter(
            (coin) => coin.uuid !== action.payload.ticket_name,
          );
        }
        // state.data = state.data.favorites.filter((coin) => coin.uuid !== action.payload);
      })
      .addCase(deleteFavoriteCoinThunkAction.fulfilled, (state, action) => {
        if (!state.data?.favorites) return;
        state.status = 'succeeded';
        const targetCoin = state.data?.favorites.find(
          (coin) => coin.uuid === action.payload.ticket_name,
        );
        if (targetCoin) {
          state.data.coins.push(targetCoin);
          state.data?.coins.sort((a, b) => a.rank - b.rank);
          state.data.favorites = state.data.favorites.filter(
            (coin) => coin.uuid !== action.payload.ticket_name,
          );
        }
        state.data.favorites = state.data.favorites.filter((coin) => coin.uuid !== action.payload);
      })
      .addCase(setPortfolioApiThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setPortfolioApiThunk.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.status = 'succeeded';
      });
  },
});

export default coinsSlice.reducer;
