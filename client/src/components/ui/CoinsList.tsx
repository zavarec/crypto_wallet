import React, { useEffect } from 'react';
import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { getCoinsThunkAction } from '../../redux/thunkActions/marketThunkActions';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import CoinCard from './CoinCard';

export default function CoinsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.coins.data?.data);

  useEffect(() => {
    void dispatch(getCoinsThunkAction());
  }, [dispatch]);

  return (
    <Box borderRadius="xl" boxShadow="dark-lg" bg="gray.800" maxW="full" margin="auto" p={4}>
      <Table variant="simple" size="sm" colorScheme="whiteAlpha">
        <Thead>
          <Tr bg="gray.700">
            <Th>Монета</Th>
            <Th>Имя</Th>
            <Th>Символ</Th>
            <Th isNumeric>Цена</Th>
            <Th isNumeric>Рыночная капитализация</Th>
            <Th isNumeric>Объем (24ч)</Th>
            <Th>Избранное</Th>
          </Tr>
        </Thead>
        <Tbody color="yellow">{data?.coins.map((coin) => <CoinCard coin={coin} />)}</Tbody>
      </Table>
    </Box>
  );
}
