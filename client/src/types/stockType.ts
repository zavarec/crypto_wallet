import type { ApiKeyType } from './apiKeyType';

export type StockType = {
  id: number;
  name: string;
  img: string;
};

export type StocksUninitialStateType = {
  status: 'fetching' | 'idle' | 'error';
  stocks: StockType[];
  selected: StockType | null;
  apis: ApiKeyType[] | null;
  apisLoading: boolean;
  editApi: ApiKeyType | null;

};
