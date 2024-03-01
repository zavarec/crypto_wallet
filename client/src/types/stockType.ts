export type StockType = {
  id: number;
  name: string;
  img: string;
};

export type StocksUninitialStateType = {
  status: 'fetching' | 'idle' | 'error';
  stocks: StockType[];
  selected: StockType | null;
};
