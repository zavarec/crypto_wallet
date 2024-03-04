import { createAsyncThunk } from '@reduxjs/toolkit';
import type { StockType } from '../../types/stockType';
import stockService from '../../services/stockService';

export const fetchStocksThunk = createAsyncThunk<StockType[]>('stocks/fetchStocks', async () => {
  const stocks = await stockService.getStocks();
  return stocks;
});
