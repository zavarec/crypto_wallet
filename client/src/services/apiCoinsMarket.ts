import type { CoinType, CoinsApiResponseType } from '../types/coinsListApiTypes';
import axiosInstance from './apiInstance';

const url = import.meta.env.VITE_URL_API_COINRANKING as string;
const apiKey = import.meta.env.VITE_API_KEY as string;

export const getCoins = async (): Promise<CoinsApiResponseType> => {
  const response = await axiosInstance.get<CoinsApiResponseType>(`/marketdata`);
  // console.log(response.data);
  return response.data;
};

export const addToFavorites = async (coinId: CoinType['uuid']): Promise<CoinType['uuid']> => {
  const reponse = await axiosInstance.post<CoinType['uuid']>(`/marketdata/${coinId}`);
  return reponse.data;
};

export const getFavoriteCoins = async (): Promise<CoinType[]> => {
  const response = await axiosInstance.get<CoinType[]>('/favorites');
  return response.data;
};

// export const getOneCoin = async (coinId: CoinType['uuid']): Promise<CoinType['uuid']> => {
//   const reponse = await axiosInstance.get<CoinType['uuid']>(`/marketdata/${coinId}`);
//   return reponse.data;
// }
