
import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import StockWrapper from '../ui/StocksWrapper';

const MotionSimpleGrid = motion(SimpleGrid);
export default function LoggedPage(): JSX.Element {

  

  return (
    <Box mt={10}>
      <MotionSimpleGrid
        initial={{ opacity: 0, y: 30 }} // Начальное состояние анимации
        animate={{ opacity: 1, y: 0 }} // Конечное состояние анимации
        transition={{ duration: 1.0 }} // Длительность анимации
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        columns={[1, 1, 1, 2]}
        spacing={2}
      >
        <StockWrapper />
      </MotionSimpleGrid>
    </Box>
  );
}
