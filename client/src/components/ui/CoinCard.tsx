import React from 'react';

import { Card, IconButton, Image, Td, Text, Tr } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import type { CoinType } from '../../types/coinsListApiTypes';

type OneCoinCardPropsType = {
  coin: CoinType;
};


export default function CoinCard({ coin }: OneCoinCardPropsType): JSX.Element {
  return (
    <Tr key={coin.uuid} bg="gray.900" _hover={{ bg: 'gray.700' }}>
      <Td>
        <Image
          src={coin.iconUrl}
          alt={coin.name}
          boxSize="30px" // Можете настроить размер изображения
          objectFit="cover"
        />
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
