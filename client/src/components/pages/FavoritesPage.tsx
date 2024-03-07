import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import CoinCard from '../ui/MarketData/CoinCard';
import { getCoinsThunkAction } from '../../redux/thunkActions/marketThunkActions';
import type { CoinType } from '../../types/coinsTypes';

export default function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.coins.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    void dispatch(getCoinsThunkAction());
  }, [dispatch]);

  // console.log(data?.favorites);
  const filteredCoins = data?.favorites
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, visibleCount) as CoinType[];

  const loadMoreCoins = (): void => {
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
        minH="700px"
      >
        <Input
          color="yellow"
          mb={4}
          placeholder="Search by coins"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Table variant="simple" size="sm" colorScheme="whiteAlpha">
          <Thead>
            <Tr bg="gray.700">
              <Th>Coin</Th>
              <Th>Name</Th>
              <Th>Symbol</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Market capitalization</Th>
              <Th isNumeric>Volume (24h)</Th>
              <Th>Favorites</Th>
            </Tr>
          </Thead>
          <Tbody color="yellow">
            {filteredCoins?.map((coin) => <CoinCard key={coin.uuid} coin={coin} />)}
          </Tbody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="center" mt={4} mb="4%">
        <Button onClick={loadMoreCoins}>Load more</Button>
      </Box>
    </Box>
  );
}
