import axios from 'axios';
import type { CoinsApiResponseType } from '../types/coinsListApiTypes';
import axiosInstance from './apiInstance';

const url = import.meta.env.VITE_URL_API_COINRANKING as string;
const apiKey = import.meta.env.VITE_API_KEY as string;

export const getCoins = async (): Promise<CoinsApiResponseType> => {
  const options = {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': apiKey,
    },
  };

  const response = await axiosInstance.get<CoinsApiResponseType>(`${url}/coins`, options);
  // console.log(response.data);
  return response.data
};
