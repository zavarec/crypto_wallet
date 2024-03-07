import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import StockWrapper from '../ui/StocksWrapper';

export default function LoggedPage(): JSX.Element {
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
      </SimpleGrid>
    </Box>
  );
}
