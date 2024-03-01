import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './apiInstance';
import type { StockType } from '../types/stockType';

class StockService {
  constructor(private readonly api: AxiosInstance) {}

  public getStocks(): Promise<StockType[]> {
    console.log('----------------')
    return this.api.get<Promise<StockType[]>>('/stocks').then(
      (res) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(res.data);
          }, 1500);
        }),
    );
  }
}

export default new StockService(axiosInstance);
