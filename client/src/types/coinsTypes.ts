export type CoinType = {
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;

  // tier:number;
  // change:string;
  // rank:number;
  // sparkline:string[];
  // lowVolume:boolean;
  // coinrankingUrl:string;
  // contractAddresss:string;
};
export type FavoriteCoin = {
  ticket_name: string;
};

export type DataStateType = {
  coins: CoinType[];
  favorites: CoinType[];
};

export type CoinsStateType = {
  data: DataStateType | null;
  status: 'succeeded' | 'loading' | 'failed';
  balance: ApiResponseType | null;
};

// export type CoinsApiResponseType = {
//   status: string;
//   data: {
//     stats: {
//       total: number;
//       totalCoins: number;
//       totalMarkets: number;
//       totalExchanges: number;
//       totalMarketCap: string;
//       total24hVolume: string;
//     };
//     coins: CoinType[];
//     favorites: CoinType[];
//   };
// };

export type CoinInfo = {
  usdValue: string; // USD значение
  walletBalance: string; // Баланс кошелька
  cumRealisedPnl: string; // Совокупная реализованная прибыль/убыток
  coin: string; // Монета
};

export type AccountInfo = {
  totalEquity: string;
  accountIMRate: string;
  totalMarginBalance: string;
  totalInitialMargin: string;
  accountType: string;
  totalAvailableBalance: string;
  accountMMRate: string;
  totalPerpUPL: string;
  totalWalletBalance: string;
  accountLTV: string;
  totalMaintenanceMargin: string;
  coin: CoinInfo[];
};

export type ApiResponseType = {
  retCode: number;
  retMsg: string;
  result: {
    list: AccountInfo[];
  };
};
