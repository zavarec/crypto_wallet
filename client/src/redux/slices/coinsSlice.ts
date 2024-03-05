import { createSlice } from '@reduxjs/toolkit';
import { addToFavoritesThunkAction, getCoinsThunkAction } from '../thunkActions/marketThunkActions';
import type { CoinsApiResponseType } from '../../types/coinsListApiTypes';

const initialState: {
  data: CoinsApiResponseType | null;
  status: 'succeeded' | 'loading' | 'failed';
} = {
  data: null,
  status: 'loading',
};

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
        state.data = [...state.data, action.payload];
      });
  },
});

export default coinsSlice.reducer;
