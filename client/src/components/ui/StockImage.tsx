import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import type { StockType } from '../../types/stockType';
import { useAppSelector } from '../../hooks/useReduxHook';

type StockImageProps = {
  stock: StockType;
};

export default function StockImage({ stock }: StockImageProps): JSX.Element {
  const stockImages = useAppSelector((state) => state.stock.stocks);
  return (
    <Flex justify="space-between">
      <Text fontSize="2xl">{stock.name}</Text>
      <Image
        rounded="xl"
        height={150}
        width={150}
        objectFit="cover"
        src={`http://localhost:3001/img/${stock.img}`}
      />
    </Flex>
  );
}
