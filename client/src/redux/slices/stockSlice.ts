import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { StocksUninitialStateType } from '../../types/stockType';
import { fetchStocksThunk } from '../thunkActions/stockThunkActions';

const initialState: StocksUninitialStateType = {
  stocks: [],
  selected: null,
  status: 'fetching',
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setSelectedStock: (state, action: PayloadAction<number>) => {
      const stock = state.stocks.find((el) => el.id === action.payload);
      if (stock) {
        state.selected = stock;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchStocksThunk.pending, (state, action) => {
      state.status = 'fetching';
    });

    builder.addCase(fetchStocksThunk.fulfilled, (state, action) => {
      state.status = 'idle';
      state.stocks = action.payload;
    });
    builder.addCase(fetchStocksThunk.rejected, (state, action) => {
      state.status = 'error';
    });
  },
});

export default stockSlice.reducer;
