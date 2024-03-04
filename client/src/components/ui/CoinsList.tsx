import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { getCoinsThunkAction } from '../../redux/thunkActions/marketThunkActions';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import CoinCard from './CoinCard';

export default function CoinsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.coins.data?.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    void dispatch(getCoinsThunkAction());
  }, [dispatch]);

  const filteredCoins = data?.coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, visibleCount);
  const loadMoreCoins = () => {
    setVisibleCount((prevCount) => prevCount + 15); // Увеличиваем количество отображаемых монет на 15
  };
  return (
    <Box position="sticky" top={0} zIndex={1}>
      <Box
        mt="20%"
        borderRadius="xl"
        boxShadow="dark-lg"
        bg="gray.800"
        maxW="full"
        margin="auto"
        p={4}
      >
        <Input
          color="yellow"
          mb={4}
          placeholder="Поиск по монетам"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
          <Tbody color="yellow">
            {filteredCoins?.map((coin) => <CoinCard key={coin.uuid} coin={coin} />)}
          </Tbody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="center" mt={4} mb="4%">
        <Button onClick={loadMoreCoins}>Загрузить еще</Button>
      </Box>
    </Box>
  );
}
