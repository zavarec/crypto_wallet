import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import StockPart from '../ui/StockPart';
import AddWalletModal from '../ui/AddWalletModal';

export default function LoggedPage(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mt={10}>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={2}>
        <StockPart />
        <Button onClick={onOpen}>Open Modal</Button>
        <AddWalletModal isOpen={isOpen} onClose={onClose} />
      </SimpleGrid>
    </Box>
  );
}
