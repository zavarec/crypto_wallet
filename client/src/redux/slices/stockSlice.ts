import { createSlice } from '@reduxjs/toolkit';
import type { StockState } from '../../types/stockType';
import { fetchStocksThunk } from '../thunkActions/stockThunkActions';

const initialState: StockState = {
  status: 'fetching',
  data: [],
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchStocksThunk.pending, (state, action) => {
      state.status = 'fetching';
    });

    builder.addCase(fetchStocksThunk.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data = action.payload;
    });
    builder.addCase(fetchStocksThunk.rejected, (state, action) => {
      state.status = 'error';
    });
  },
});

export default stockSlice.reducer;
