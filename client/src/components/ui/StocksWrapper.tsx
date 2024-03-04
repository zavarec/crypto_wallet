import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { fetchStocksThunk } from '../../redux/thunkActions/stockThunkActions';
import StockItem from './StockItem';
import type { StockType } from '../../types/stockType';

export default function StocksWrapper(): JSX.Element {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.stock.stocks);

  useEffect(() => {
    void dispatch(fetchStocksThunk());
  }, []);

  // const stocksLoading = useAppSelector((state) => state.stock.status);

  // useEffect(() => {
  //   void dispatch(fetchStocksThunk(stockId));
  // }, [stockId]);

  // if (stocksLoading === 'fetching') {
  //   return (
  //     <VStack className="mt-5" gap={2} mt={3} p={4} spacing="2px" align="stretch">
  //       {Array(4)
  //         .fill(0)
  //         .map((_, i) => (
  //           <Skeleton key={i} height="50px" rounded="md" />
  //         ))}
  //     </VStack>
  //   );
  // }

  return (
    <Box mt={3} p={4} maxH="500px">
      <SimpleGrid columns={4} spacing={1} style={{ paddingLeft: '150px', paddingRight: '150px' }}>
        {stocks.map((stock) => (
          <StockItem key={stock.id} stock={stock} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
