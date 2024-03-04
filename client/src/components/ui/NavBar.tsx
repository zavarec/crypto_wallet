import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Flex, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { logOutThunk } from '../../redux/thunkActions/authThunkActions';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    void dispatch(logOutThunk());
  };

  const textStyle = {
    color: 'white',
    fontWeight: '900',
  };

  return (
    <Box
      bgColor="#1a202c"
      bgGradient={[
        'webkit-linear-gradient(to top, #dbe7fe 0%, #1a202c 20%)',
        'moz-linear-gradient(to top, #dbe7fe 0%, #1a202c 20%)',
        'linear-gradient(to top, #dbe7fe 0%, #1a202c 20%)',
      ]}
      rounded="lg"
      px={4}
      fontSize={20}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={6}>
          <Box style={textStyle}>Hi, {user.status === 'logged' ? user.name : 'guest'}</Box>
          <NavLink
            style={textStyle}
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
          {user.status === 'logged' && (
            <NavLink style={textStyle} to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
              Portfolio
            </NavLink>
          )}
          <NavLink style={textStyle} to="/marketdata" className={({ isActive }) => (isActive ? 'active' : '')}>
            MarketData
          </NavLink>
        </HStack>
        <HStack spacing={6}>
          {user.status === 'logged' && (
            <Link style={textStyle} onClick={logoutHandler} _hover={{ textDecoration: 'none' }}>
              Exit
            </Link>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
