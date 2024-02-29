import { Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import Footer from './ui/Footer';

export default function Root(): JSX.Element {
  return (
    <Container maxW="container.xl">
      <NavBar />
      <Outlet />
      <Footer />
    </Container>
  );
}
