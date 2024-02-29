import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './apiInstance';
import type { StockType } from '../types/stockType';

class StockService {
  constructor(private readonly api: AxiosInstance) {}

  public getStocks(id: number): Promise<StockType[]> {
    return this.api.get<Promise<StockType[]>>(`/stock/${id}`).then(
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
