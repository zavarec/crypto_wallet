import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CoinVidget from '../ui/CoinVidget';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { getCoinsThunkAction } from '../../redux/thunkActions/marketThunkActions';

export default function CoinPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCoinsThunkAction());
  }, [dispatch]);
  // const coins = useAppSelector((state) => state.coins.data);
  // if (!coins) return <>Error</>;

  // const data = coins.coins;
  // console.log('->>', data);

  return <CoinVidget />;
}
