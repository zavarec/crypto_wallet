import type { CoinType, DataStateType, FavoriteCoin } from '../types/coinsListApiTypes';
import axiosInstance from './apiInstance';

const url = import.meta.env.VITE_URL_API_COINRANKING as string;
const apiKey = import.meta.env.VITE_API_KEY as string;

export const getCoins = async (): Promise<DataStateType> => {
  const response = await axiosInstance.get<DataStateType>(`/marketdata`);
  // console.log(response.data);
  return response.data;
};

export const addToFavorites = async (
  coinId: FavoriteCoin['ticket_name'],
): Promise<FavoriteCoin['ticket_name']> => {
  const reponse = await axiosInstance.post<FavoriteCoin['ticket_name']>(`/marketdata/${coinId}`);
  console.log(reponse.data);
  return reponse.data;
};

export const getFavoriteCoins = async (): Promise<CoinType[]> => {
  const response = await axiosInstance.get<CoinType[]>('/favorites');
  return response.data;
};

export const deleteFavoriteCoin = async (coinId: CoinType['uuid']): Promise<CoinType['uuid']> => {
  const response = await axiosInstance.delete<CoinType['uuid']>(`/marketdata/${coinId}`);
  return response.data;
};


