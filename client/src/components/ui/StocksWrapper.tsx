import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { fetchStocksThunk } from '../../redux/thunkActions/stockThunkActions';
import StockItem from './StockItem';

export default function StocksWrapper(): JSX.Element {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.stock.stocks);
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    void dispatch(fetchStocksThunk());
  }, []);

  return (
    <Box mt={3} p={4} maxH="500px">
      <SimpleGrid columns={4} spacing={1} style={{ paddingLeft: '150px', paddingRight: '150px' }}>
        {stocks.map((stock) => (
          <StockItem key={stock.id} stock={stock} user={user}/>
        ))}
      </SimpleGrid>
    </Box>
  );
}
