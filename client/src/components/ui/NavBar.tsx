import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { logOutThunk } from '../../redux/thunkActions/authThunkActions';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    void dispatch(logOutThunk());
  };
  return (
    <Box bg={useColorModeValue('green.500', 'green.900')} rounded="lg" px={4} fontSize={20}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={6}>
          <Box>Hi, {user.status === 'logged' ? user.name : 'guest'}</Box>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          {user.status === 'logged' && (
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
              Portfolio
            </NavLink>
          )}
          <NavLink to="/marketdata" className={({ isActive }) => (isActive ? 'active' : '')}>
            MarketData
          </NavLink>
        </HStack>
        <HStack spacing={6}>
          {user.status === 'logged' && <Button onClick={logoutHandler}>Выйти</Button>}
        </HStack>
      </Flex>
    </Box>
  );
}
