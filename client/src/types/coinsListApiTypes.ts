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

export type CoinsApiResponseType = {
  status: string;
  data: {
    stats: {
      total: number;
      totalCoins: number;
      totalMarkets: number;
      totalExchanges: number;
      totalMarketCap: string;
      total24hVolume: string;
    };
    coins: CoinType[];
    favorites: CoinType[];
  };
};
