export type StockType = {
  id: number;
  name: string;
  img: string;
};

export type StockState = {
  status: 'fetching' | 'idle' | 'error';
  data: StockType[];
};
