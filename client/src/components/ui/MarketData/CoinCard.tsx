import React from 'react';

import { Card, IconButton, Image, Td, Text, Tr } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import type { CoinType } from '../../../types/coinsListApiTypes';
import { useAppDispatch } from '../../../hooks/useReduxHook';
import { addToFavoritesThunkAction } from '../../../redux/thunkActions/marketThunkActions';

type OneCoinCardPropsType = {
  coin: CoinType;
};

export default function CoinCard({ coin }: OneCoinCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const onAddToFavorites = (id: string): void => {
    void dispatch(addToFavoritesThunkAction(id));
  };

  // const navigateToCoinPage = (id: string): void => {
  //   navigate(`/marketdata/${id}`);
  // };

  return (
    <Tr
      key={coin.uuid}
      bg="gray.900"
      _hover={{ bg: 'gray.700' }}
      as={Link}
      to={`/marketdata/${coin.uuid}`}
    >
      <Td>
        <Image src={coin.iconUrl} alt={coin.name} boxSize="30px" objectFit="cover" />
      </Td>
      <Td>{coin.name}</Td>
      <Td>{coin.symbol}</Td>
      <Td isNumeric>${coin.price}</Td>
      <Td isNumeric>${coin.marketCap}</Td>
      <Td isNumeric>${coin['24hVolume']}</Td>
      <Td>
        <IconButton
          aria-label="Add to favorites"
          icon={<StarIcon />}
          onClick={() => onAddToFavorites(coin.uuid)}
        />
      </Td>
    </Tr>
  );
}
