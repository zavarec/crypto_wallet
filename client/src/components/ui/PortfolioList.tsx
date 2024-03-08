import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  VStack,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { setPortfolioApiThunk } from '../../redux/thunkActions/apiKeyThunkActions';
import type { ApiResponseType } from '../../types/coinsTypes';

const calculateTotalWorth = (assets: ApiResponseType): number =>
  assets?.result?.list.reduce((total, element) => {
    const assetValue = element.coin.reduce(
      (sum, asset) =>
        // Преобразуем строковое значение usdValue в число и добавляем к сумме
        sum + parseFloat(asset.usdValue || '0'),
      0,
    );
    return total + assetValue;
  }, 0);

export default function PortfolioList(): JSX.Element {
  const { balance, status } = useAppSelector((state) => state.coins);
  const dispatch = useAppDispatch();
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    void dispatch(setPortfolioApiThunk()).then((action) => {
      if (action.type.endsWith('fulfilled')) {
        console.log('Action fulfilled with data:', action.payload);
      } else if (action.type.endsWith('rejected')) {
        console.error('Action rejected with error:', error.status);
      }
    });
  }, [dispatch]);

  const totalWorth = calculateTotalWorth(balance) || 0;
  console.log(totalWorth);
  const visibleBalance = balance?.result?.list[0].coin.slice(0, visibleCount).flatMap((el) => el);

  const loadMoreCoins = (): void => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner color="yellow" size="xl" />
      </Box>
    );
  }
  return (
    <Container minH="100%" minW="500px" maxW="container.xl">
      <VStack spacing={8}>
        Total Worth можно вставить, когда у вас будут данные для этого
        <Box>
          {/* <Text color="yellow" fontSize="xl">
            Total Worth: 
          </Text> */}
          <Stat color="yellow" fontSize="xl">
            <StatLabel>Total Balance</StatLabel>
            <StatNumber>${totalWorth?.toFixed(2)}</StatNumber>
            <StatHelpText>8 March</StatHelpText>
          </Stat>
        </Box>
        <Box width="full" color="yellow" overflow="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>USD Value</Th>
                <Th>Wallet Balance</Th>
                <Th>Cumulative Realised PnL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {visibleBalance?.map((asset) => (
                <Tr key={asset.coin}>
                  <Td>{asset.coin}</Td>
                  <Td>${asset.usdValue}</Td>
                  <Td>{asset.walletBalance}</Td>
                  <Td color={asset.cumRealisedPnl >= 0 ? 'green' : 'red'}>
                    {asset.cumRealisedPnl}{' '}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box textAlign="center">
            {visibleCount < balance?.result?.list[0].coin.length && (
              <Button
                onClick={loadMoreCoins}
                isLoading={isLoadingMore}
                loadingText="Loading..."
                mt="4"
              >
                Load more
              </Button>
            )}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}

// import React, { useEffect } from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, VStack, Container, Badge } from '@chakra-ui/react';
// import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
// import { setPortfolioApiThunk } from '../../redux/thunkActions/apiKeyThunkActions';

// export default function PortfolioList(): JSX.Element {
//   const assets = useAppSelector((state) => state.coins.balance);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     void dispatch(setPortfolioApiThunk()).then((action) => {
//       if (action.type.endsWith('fulfilled')) {
//         console.log('Action fulfilled with data:', action.payload);
//       } else if (action.type.endsWith('rejected')) {
//         console.error('Action rejected with error:', action.error);
//       }
//     });
//   }, [dispatch]);

//   const formatCurrency = (value) =>
//     new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(value);

//   return (
//     <Container maxW="container.xl" py={4}>
//       <Box overflowX="auto">
//         <Table variant="striped" colorScheme="orange">
//           <Thead>
//             <Tr>
//               <Th>Name</Th>
//               <Th isNumeric>USD Value</Th>
//               <Th isNumeric>Wallet Balance</Th>
//               <Th isNumeric>Cumulative Realised PnL</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {assets?.result?.list.map((element) =>
//               element.coin.map((asset) => (
//                 <Tr key={asset.coin}>
//                   <Td>{asset.coin}</Td>
//                   <Td isNumeric>{formatCurrency(asset.usdValue)}</Td>
//                   <Td isNumeric>{asset.walletBalance}</Td>
//                   <Td isNumeric>
//                     <Badge
//                       colorScheme={asset.cumRealisedPnl >= 0 ? 'green' : 'red'}
//                     >
//                       {formatCurrency(asset.cumRealisedPnl)}
//                     </Badge>
//                   </Td>
//                 </Tr>
//               ))
//             )}
//           </Tbody>
//         </Table>
//       </Box>
//     </Container>
//   );
// }
