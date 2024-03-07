import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import CoinVidget from '../ui/CoinVidget';
import { useAppDispatch } from '../../hooks/useReduxHook';
import { getCoinsThunkAction } from '../../redux/thunkActions/marketThunkActions';
import CoinInfoVidget from '../ui/CoinInfoVidget';

export default function CoinPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCoinsThunkAction());
  }, [dispatch]);

  return (
    <>
      <CoinInfoVidget />
      <CoinVidget />
    </>
  );
}
