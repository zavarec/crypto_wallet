import { createAsyncThunk } from '@reduxjs/toolkit';
import type { StockType } from '../../types/stockType';
import stockService from '../../services/stockService';

export const fetchStocksThunk = createAsyncThunk<StockType[], number>(
  'stocks/fetchStocks',
  async (id) => stockService.getStocks(id),
);
