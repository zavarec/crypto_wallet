import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import Footer from './ui/Footer';

export default function Root(): JSX.Element {
  return (
    <Container maxW="container.xl">
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
        <NavBar />
        <Outlet />
        <Footer />
      </Box>
    </Container>
  );
}
