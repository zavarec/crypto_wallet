import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import StockWrapper from '../ui/StocksWrapper';
import AddWalletModal from '../ui/AddWalletModal';

export default function LoggedPage(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mt={10}>
      <SimpleGrid
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        columns={[1, 1, 1, 2]}
        spacing={2}
      >
        <StockWrapper />
        <Button style={{ alignContent: 'center', width: '200px' }} onClick={onOpen}>
          Open Modal
        </Button>
        <AddWalletModal isOpen={isOpen} onClose={onClose} />
      </SimpleGrid>
    </Box>
  );
}
