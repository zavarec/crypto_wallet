import React, { useState } from 'react';
import { IconButton, Image, Td, Tr } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import type { CoinType } from '../../../types/coinsTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import {
  addToFavoritesThunkAction,
  deleteFavoriteCoinThunkAction,
} from '../../../redux/thunkActions/marketThunkActions';

type OneCoinCardPropsType = {
  coin: CoinType;
};

const MotionIconButton = motion(IconButton);

export default function CoinCard({ coin }: OneCoinCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.coins.data?.favorites);
  const isFavorite = data?.some((favorite) => favorite.uuid === coin.uuid);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationVariants = {
    rotate: { rotate: 360 },
    initial: { rotate: 0 },
  };
  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const onAddToFavorites = (id: string): void => {
    isFavorite
      ? dispatch(deleteFavoriteCoinThunkAction(id))
      : dispatch(addToFavoritesThunkAction(id));

    setIsAnimating(true);
  };
  const starColor = isFavorite ? 'gold' : 'gray.300';
  const navigate = useNavigate();
  const handleNavigate = () => {
    // Здесь указывается маршрут для перенаправления, например:
    navigate(`/marketdata/${coin.uuid}`);
  };

  return (
    <Tr
      key={coin.uuid}
      bg="gray.900"
      _hover={{ bg: 'gray.700' }}
      
    >
      <Td>
        <Image src={coin.iconUrl} alt={coin.name} boxSize="30px" objectFit="cover" onClick={() => navigate(coin.uuid)} />
      </Td>
      <Td onClick={() => navigate(coin.uuid)}>{coin.name}</Td>
      <Td>{coin.symbol}</Td>
      <Td isNumeric>${coin.price}</Td>
      <Td isNumeric>${coin.marketCap}</Td>
      <Td isNumeric>${coin['24hVolume']}</Td>
      <Td>
        <MotionIconButton
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          icon={<StarIcon color={starColor} />}
          onClick={() => onAddToFavorites(coin.uuid)}
          variants={animationVariants} // Варианты анимации
          animate={isAnimating ? 'rotate' : 'initial'} // Применяем анимацию
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onAnimationComplete={handleAnimationComplete}
        />
      </Td>
    </Tr>
  );
}
