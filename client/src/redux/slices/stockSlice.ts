import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { StocksUninitialStateType } from '../../types/stockType';
import { fetchStocksThunk } from '../thunkActions/stockThunkActions';
import type { ApiKeyType } from '../../types/apiKeyType';
import {
  fetchApisThunk,
  saveApiKeyThunk,
  updateApiThunk,
} from '../thunkActions/apiKeyThunkActions';

const initialState: StocksUninitialStateType = {
  stocks: [],
  selected: null,
  status: 'fetching',
  apis: null,
  apisLoading: false,
  editApi: null,
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

    setApi: (state, action: PayloadAction<ApiKeyType | null>) => {
      state.editApi = action.payload;
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

    builder.addCase(fetchApisThunk.fulfilled, (state, action) => {
      state.apis = action.payload;
      state.apisLoading = false;
    });

    builder.addCase(fetchApisThunk.pending, (state, action) => {
      state.apisLoading = true;
    });

    builder.addCase(saveApiKeyThunk.fulfilled, (state, action) => {
      if (!state.apis) return;
      state.apis = [...state.apis, action.payload];
    });

    builder.addCase(updateApiThunk.fulfilled, (state, action) => {
      if (!state.apis) return;
      state.apis = state.apis?.map((el) =>
        el.id === action.payload.id ? { ...el, name: action.payload.name } : el,
      );
      state.editApi = null;
    });
  },
});

export default stockSlice.reducer;
