import { createSlice } from '@reduxjs/toolkit';
import {
  addToFavoritesThunkAction,
  deleteFavoriteCoinThunkAction,
  getCoinsThunkAction,
} from '../thunkActions/marketThunkActions';
import type { CoinsStateType } from '../../types/coinsListApiTypes';

const initialState: CoinsStateType = {
  data: null,
  status: 'loading',
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
        if (!state.data) return;

        const targetCoin = state.data.coins.find(
          (coin) => coin.uuid === action.payload.ticket_name,
        );
        if (targetCoin) {
          state.data.favorites.push(targetCoin);
        }
        // state.data = state.data.favorites.filter((coin) => coin.uuid !== action.payload);
      });
    // .addCase(deleteFavoriteCoinThunkAction.fulfilled, (state, action) => {
    //   if (!state.favorites) return;
    //   state.status = 'succeeded';
    //   state.favorites = state.favorites.filter((coin) => coin.uuid !== action.payload);
    // });
  },
});

export default coinsSlice.reducer;
